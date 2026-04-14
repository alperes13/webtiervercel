import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';
import { signSession } from '@/lib/auth';
import { markUserPhoneVerified } from '@/lib/phone-verification';

export const runtime = 'nodejs';

interface Body {
  phone?: string;
  otp_code?: string;
  code?: string;
}

interface OtpRow {
  id: string;
  otp_code: string;
  attempts: number;
  max_attempts: number;
  expires_at: Date;
  verified: boolean;
}

interface UserRow {
  id: string;
  phone: string;
  phone_raw: string;
  email: string | null;
  mini_credits: number;
  ultra_credits: number;
  created_at: Date;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;
  const normalized = normalizePhone(body.phone ?? '');
  const code = (body.otp_code ?? body.code ?? '').trim();

  if (!normalized || !/^[0-9]{6}$/.test(code)) {
    return NextResponse.json({ success: false, error: 'Geçersiz istek' }, { status: 400 });
  }

  const otp = await queryOne<OtpRow>(
    `SELECT id, otp_code, attempts, max_attempts, expires_at, verified
     FROM otp_sessions
     WHERE phone = $1 AND verified = false AND expires_at > NOW()
     ORDER BY created_at DESC
     LIMIT 1`,
    [normalized.phone]
  );

  if (!otp) {
    return NextResponse.json({ success: false, error: 'OTP süresi doldu veya bulunamadı' }, { status: 400 });
  }

  if (otp.attempts >= otp.max_attempts) {
    return NextResponse.json({ success: false, error: 'Deneme hakkı doldu' }, { status: 429 });
  }

  if (otp.otp_code !== code) {
    await query('UPDATE otp_sessions SET attempts = attempts + 1 WHERE id = $1', [otp.id]);
    return NextResponse.json({ success: false, error: 'Yanlış kod' }, { status: 400 });
  }

  await query('UPDATE otp_sessions SET verified = true, verified_at = NOW() WHERE id = $1', [otp.id]);

  await markUserPhoneVerified(normalized.phone);

  const user = await queryOne<UserRow>(
    `UPDATE users
     SET last_login = NOW()
     WHERE phone = $1
     RETURNING id, phone, phone_raw, email, mini_credits, ultra_credits, created_at`,
    [normalized.phone]
  );

  if (!user) {
    return NextResponse.json({ success: false, error: 'Kullanıcı bulunamadı' }, { status: 404 });
  }

  const { token, expiresAt } = await signSession({ sub: user.id, phone: user.phone });

  return NextResponse.json({
    success: true,
    session: {
      token,
      phone: user.phone,
      phoneRaw: user.phone_raw,
      phoneVerified: true,
      email: user.email,
      createdAt: user.created_at.getTime(),
      expiresAt,
      analysisStatus: 'none' as const,
      credits: user.mini_credits + user.ultra_credits,
      creditsMini: user.mini_credits,
      creditsUltra: user.ultra_credits,
      miniCredits: user.mini_credits,
      ultraCredits: user.ultra_credits,
    },
  });
}
