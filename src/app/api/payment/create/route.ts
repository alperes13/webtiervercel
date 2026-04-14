import { NextResponse, type NextRequest } from 'next/server';
import { queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import {
  createPayTRToken,
  generateMerchantOid,
  iframeUrl,
  ultraCreditsToKurus,
} from '@/lib/paytr';

export const runtime = 'nodejs';

const PRICE_PER_ULTRA_TL = 500;
const ALLOWED_AMOUNTS = new Set([1, 5, 10, 20]);

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { credit_amount?: number };
  const creditAmount = Number(body.credit_amount);
  if (!ALLOWED_AMOUNTS.has(creditAmount)) {
    return NextResponse.json({ success: false, error: 'Geçersiz kredi miktarı' }, { status: 400 });
  }

  const userRow = await queryOne<{ email: string | null; phone_raw: string; phone: string }>(
    'SELECT email, phone_raw, phone FROM users WHERE id = $1',
    [user.sub]
  );
  if (!userRow) return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });

  const merchantOid = generateMerchantOid();
  const amountKurus = ultraCreditsToKurus(creditAmount);
  const amountTL = creditAmount * PRICE_PER_ULTRA_TL;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? new URL(request.url).origin;
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0].trim();
  const userIp = forwardedFor || '85.34.78.112';

  const payment = await queryOne<{ id: string }>(
    `INSERT INTO payments (user_id, amount, currency, credit_type, credit_amount, merchant_oid, payment_status)
     VALUES ($1, $2, 'TRY', 'ultra', $3, $4, 'pending') RETURNING id`,
    [user.sub, amountTL, creditAmount, merchantOid]
  );

  if (!payment) {
    return NextResponse.json({ success: false, error: 'Ödeme kaydı oluşturulamadı' }, { status: 500 });
  }

  try {
    const { token } = await createPayTRToken({
      merchantOid,
      email: userRow.email || `${userRow.phone_raw}@webtier.local`,
      amountKurus,
      userName: `Webtier User ${userRow.phone_raw.slice(-4)}`,
      userAddress: 'N/A',
      userPhone: userRow.phone,
      userIp,
      basket: [{ name: `${creditAmount} Ultra Kredi`, price: amountTL, qty: 1 }],
      okUrl: `${baseUrl}/payment/success?credits=${creditAmount}`,
      failUrl: `${baseUrl}/payment/failed`,
      testMode: process.env.NODE_ENV !== 'production',
    });

    await queryOne(
      'UPDATE payments SET payment_token = $1 WHERE id = $2 RETURNING id',
      [token, payment.id]
    );

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        merchant_oid: merchantOid,
        token,
        amount: amountTL,
        credit_amount: creditAmount,
      },
      iframe_url: iframeUrl(token),
    });
  } catch (err) {
    console.error('[payment/create] PayTR error', err);
    return NextResponse.json({ success: false, error: 'Ödeme başlatılamadı' }, { status: 502 });
  }
}
