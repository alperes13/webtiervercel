import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';
import { hashPassword, isValidPassword } from '@/lib/password';
import { signSession } from '@/lib/auth';

export const runtime = 'nodejs';

interface Body {
  phone?: string;
  password?: string;
  otp_code?: string;
}

interface OtpRow {
  id: string;
  otp_code: string;
  attempts: number;
  max_attempts: number;
  expires_at: string;
  verified: boolean;
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

  const existing = await queryOne<{ id: string }>('SELECT id FROM users WHERE phone = $1', [normalized.phone]);
  if (existing) {
    return NextResponse.json({ success: false, error: 'Bu numara zaten kayıtlı' }, { status: 409 });
  }

  const otp = await queryOne<OtpRow>(
    `SELECT id, otp_code, attempts, max_attempts, expires_at, verified
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

  const inserted = await queryOne<{
    id: string;
    phone: string;
    phone_raw: string;
    email: string | null;
    mini_credits: number;
    ultra_credits: number;
    created_at: Date;
  }>(
    `INSERT INTO users (phone, phone_raw, password_hash, mini_credits, ultra_credits, last_login)
     VALUES ($1, $2, $3, 2, 0, CURRENT_TIMESTAMP)
     RETURNING id, phone, phone_raw, email, mini_credits, ultra_credits, created_at`,
    [normalized.phone, normalized.phoneRaw, passwordHash]
  );
  if (!inserted) {
    return NextResponse.json({ success: false, error: 'Kullanıcı oluşturulamadı' }, { status: 500 });
  }

  await query(
    `INSERT INTO credits (user_id, credit_type, amount, transaction_type, description, balance_after)
     VALUES ($1, 'mini', 2, 'signup_bonus', 'Kayıt bonusu: 2 mini kredi', 2)`,
    [inserted.id]
  );

  await query(
    `UPDATE otp_sessions SET verified = true, verified_at = CURRENT_TIMESTAMP WHERE id = $1`,
    [otp.id]
  );

  const { token, expiresAt } = await signSession({ sub: inserted.id, phone: inserted.phone });

  return NextResponse.json({
    success: true,
    session: {
      token,
      phone: inserted.phone,
      phoneRaw: inserted.phone_raw,
      email: inserted.email,
      createdAt: inserted.created_at.getTime(),
      expiresAt,
      analysisStatus: 'none' as const,
      credits: inserted.mini_credits + inserted.ultra_credits,
      miniCredits: inserted.mini_credits,
      ultraCredits: inserted.ultra_credits,
    },
  });
}
