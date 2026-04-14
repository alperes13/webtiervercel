import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';

export const runtime = 'nodejs';

const OTP_TTL_MINUTES = 5;

type OtpPurpose = 'register' | 'reset';

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendNetgsmSMS(phone: string, code: string): Promise<boolean> {
  const usercode = process.env.NETGSM_USERCODE;
  const password = process.env.NETGSM_PASSWORD;
  const header = process.env.NETGSM_HEADER;

  if (!usercode || !password || !header) {
    console.log(`[otp] DEV STUB (NETGSM) — phone=${phone} code=${code}`);
    return true;
  }

  // Netgsm expects phone without +90 (e.g. 5xxxxxxxxx)
  const cleanPhone = phone.replace('+90', '').replace(/\s/g, '');

  try {
    const params = new URLSearchParams({
      usercode,
      password,
      gsm: cleanPhone,
      message: `Webtier dogrulama kodunuz: ${code}. Bu kodu kimseyle paylasmayin.`,
      msgheader: header,
      dil: 'TR',
    });

    const res = await fetch(`https://api.netgsm.com.tr/sms/send/get/?${params.toString()}`);
    const text = await res.text();

    // Netgsm returns "00" or "01 32132" for success (00 means job started)
    return text.startsWith('00') || text.startsWith('01');
  } catch (err) {
    console.error('[otp] netgsm send failed', err);
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

  const sent = await sendNetgsmSMS(normalized.phone, code);
  if (!sent) {
    return NextResponse.json({ success: false, error: 'OTP gönderilemedi' }, { status: 502 });
  }

  return NextResponse.json({ success: true, sessionId: session?.id, expiresIn: OTP_TTL_MINUTES * 60 });
}
