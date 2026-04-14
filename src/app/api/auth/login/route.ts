import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { signSession } from '@/lib/auth';
import { isValidEmail } from '@/lib/validators';

export const runtime = 'nodejs';

interface Body {
  email?: string;
  password?: string;
}

interface UserRow {
  id: string;
  email: string;
  password_hash: string | null;
  mini_credits: number;
  ultra_credits: number;
  created_at: Date;
  is_active: boolean;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;
  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';

  if (!isValidEmail(email) || !password) {
    return NextResponse.json({ success: false, error: 'E-posta ve şifre gerekli' }, { status: 400 });
  }

  const user = await queryOne<UserRow>(
    `SELECT id, email, password_hash, mini_credits, ultra_credits, created_at, is_active
     FROM users WHERE LOWER(email) = $1`,
    [email]
  );

  if (!user || !user.is_active) {
    return NextResponse.json({ success: false, error: 'E-posta veya şifre hatalı' }, { status: 401 });
  }

  if (!user.password_hash) {
    return NextResponse.json(
      { success: false, error: 'Bu hesap Google ile oluşturulmuş. Lütfen Google ile giriş yapın.' },
      { status: 409 }
    );
  }

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ success: false, error: 'E-posta veya şifre hatalı' }, { status: 401 });
  }

  await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

  const { token, expiresAt } = await signSession({ sub: user.id, email: user.email });

  return NextResponse.json({
    success: true,
    session: {
      token,
      email: user.email,
      createdAt: user.created_at.getTime(),
      expiresAt,
      analysisStatus: 'none' as const,
      creditsMini: user.mini_credits,
      creditsUltra: user.ultra_credits,
    },
  });
}
