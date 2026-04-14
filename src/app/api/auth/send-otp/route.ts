import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';

export const runtime = 'nodejs';

const OTP_TTL_MINUTES = 5;

type OtpPurpose = 'register' | 'reset';

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendWhatsAppOTP(phone: string, code: string): Promise<boolean> {
  const url = process.env.WHATSAPP_API_URL;
  const token = process.env.WHATSAPP_API_TOKEN;
  if (!url || !token) {
    console.log(`[otp] DEV STUB — phone=${phone} code=${code}`);
    return true;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone,
        message: `Webtier doğrulama kodunuz: ${code}\n\nBu kodu kimseyle paylaşmayın.`,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('[otp] whatsapp send failed', err);
    return false;
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { phone?: string; purpose?: OtpPurpose };
  const normalized = normalizePhone(body.phone ?? '');
  if (!normalized) {
    return NextResponse.json({ success: false, error: 'Geçersiz telefon numarası' }, { status: 400 });
  }

  const purpose: OtpPurpose = body.purpose === 'reset' ? 'reset' : 'register';
  const existing = await queryOne<{ id: string }>('SELECT id FROM users WHERE phone = $1', [normalized.phone]);

  if (purpose === 'register' && existing) {
    return NextResponse.json({ success: false, error: 'Bu numara zaten kayıtlı. Lütfen giriş yapın.' }, { status: 409 });
  }
  if (purpose === 'reset' && !existing) {
    return NextResponse.json({ success: false, error: 'Bu numaraya ait kayıt bulunamadı.' }, { status: 404 });
  }

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60_000);

  const session = await queryOne<{ id: string }>(
    `INSERT INTO otp_sessions (phone, otp_code, expires_at)
     VALUES ($1, $2, $3) RETURNING id`,
    [normalized.phone, code, expiresAt]
  );

  const sent = await sendWhatsAppOTP(normalized.phone, code);
  if (!sent) {
    return NextResponse.json({ success: false, error: 'OTP gönderilemedi' }, { status: 502 });
  }

  return NextResponse.json({ success: true, sessionId: session?.id, expiresIn: OTP_TTL_MINUTES * 60 });
}
