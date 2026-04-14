import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';
import { hashPassword, isValidPassword } from '@/lib/password';

export const runtime = 'nodejs';

interface Body {
  phone?: string;
  otp_code?: string;
  password?: string;
}

interface OtpRow {
  id: string;
  otp_code: string;
  attempts: number;
  max_attempts: number;
  expires_at: Date;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;
  const normalized = normalizePhone(body.phone ?? '');
  if (!normalized) {
    return NextResponse.json({ success: false, error: 'Geçersiz telefon numarası' }, { status: 400 });
  }
  if (!body.otp_code || !/^[0-9]{6}$/.test(body.otp_code)) {
    return NextResponse.json({ success: false, error: 'Geçersiz doğrulama kodu' }, { status: 400 });
  }
  if (!isValidPassword(body.password ?? '')) {
    return NextResponse.json({ success: false, error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
  }

  const user = await queryOne<{ id: string }>('SELECT id FROM users WHERE phone = $1', [normalized.phone]);
  if (!user) {
    return NextResponse.json({ success: false, error: 'Kullanıcı bulunamadı' }, { status: 404 });
  }

  const otp = await queryOne<OtpRow>(
    `SELECT id, otp_code, attempts, max_attempts, expires_at
     FROM otp_sessions
     WHERE phone = $1 AND verified = false
     ORDER BY created_at DESC LIMIT 1`,
    [normalized.phone]
  );
  if (!otp) {
    return NextResponse.json({ success: false, error: 'Önce doğrulama kodu isteyin' }, { status: 400 });
  }
  if (new Date(otp.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ success: false, error: 'Doğrulama kodu süresi doldu' }, { status: 400 });
  }
  if (otp.attempts >= otp.max_attempts) {
    return NextResponse.json({ success: false, error: 'Deneme hakkı doldu' }, { status: 429 });
  }
  if (otp.otp_code !== body.otp_code) {
    await query('UPDATE otp_sessions SET attempts = attempts + 1 WHERE id = $1', [otp.id]);
    return NextResponse.json({ success: false, error: 'Kod yanlış' }, { status: 400 });
  }

  const passwordHash = await hashPassword(body.password as string);
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, user.id]);
  await query('UPDATE otp_sessions SET verified = true, verified_at = NOW() WHERE id = $1', [otp.id]);

  return NextResponse.json({ success: true });
}
