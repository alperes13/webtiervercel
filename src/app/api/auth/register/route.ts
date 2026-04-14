import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';
import { hashPassword, isValidPassword } from '@/lib/password';
import { signSession } from '@/lib/auth';

export const runtime = 'nodejs';

interface Body {
  phone?: string;
  password?: string;
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
  if (!normalized) {
    return NextResponse.json({ success: false, error: 'Geçersiz telefon numarası' }, { status: 400 });
  }

  if (!isValidPassword(body.password ?? '')) {
    return NextResponse.json({ success: false, error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
  }

  const existing = await queryOne<{ id: string }>('SELECT id FROM users WHERE phone = $1', [normalized.phone]);
  if (existing) {
    return NextResponse.json({ success: false, error: 'Bu numara zaten kayıtlı' }, { status: 409 });
  }

  const passwordHash = await hashPassword(body.password as string);

  const inserted = await queryOne<UserRow>(
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

  const { token, expiresAt } = await signSession({ sub: inserted.id, phone: inserted.phone });

  return NextResponse.json({
    success: true,
    session: {
      token,
      phone: inserted.phone,
      phoneRaw: inserted.phone_raw,
      phoneVerified: false,
      email: inserted.email,
      createdAt: inserted.created_at.getTime(),
      expiresAt,
      analysisStatus: 'none' as const,
      credits: inserted.mini_credits + inserted.ultra_credits,
      creditsMini: inserted.mini_credits,
      creditsUltra: inserted.ultra_credits,
      miniCredits: inserted.mini_credits,
      ultraCredits: inserted.ultra_credits,
    },
  });
}
