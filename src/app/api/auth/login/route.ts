import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';
import { verifyPassword } from '@/lib/password';
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
  password_hash: string | null;
  mini_credits: number;
  ultra_credits: number;
  created_at: Date;
  is_active: boolean;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;
  const normalized = normalizePhone(body.phone ?? '');
  const password = body.password ?? '';

  if (!normalized || !password) {
    return NextResponse.json({ success: false, error: 'Telefon ve şifre gerekli' }, { status: 400 });
  }

  const user = await queryOne<UserRow>(
    `SELECT id, phone, phone_raw, email, password_hash, mini_credits, ultra_credits, created_at, is_active
     FROM users WHERE phone = $1`,
    [normalized.phone]
  );

  if (!user || !user.is_active) {
    return NextResponse.json({ success: false, error: 'Telefon veya şifre hatalı' }, { status: 401 });
  }
  if (!user.password_hash) {
    return NextResponse.json({ success: false, error: 'Bu hesap için şifre belirlenmemiş. Lütfen şifre sıfırlama yapın.' }, { status: 409 });
  }

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ success: false, error: 'Telefon veya şifre hatalı' }, { status: 401 });
  }

  await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

  const { token, expiresAt } = await signSession({ sub: user.id, phone: user.phone });

  return NextResponse.json({
    success: true,
    session: {
      token,
      phone: user.phone,
      phoneRaw: user.phone_raw,
      email: user.email,
      createdAt: user.created_at.getTime(),
      expiresAt,
      analysisStatus: 'none' as const,
      credits: user.mini_credits + user.ultra_credits,
      miniCredits: user.mini_credits,
      ultraCredits: user.ultra_credits,
    },
  });
}
