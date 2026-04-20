import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { signSession } from '@/lib/auth';
import { isValidEmail } from '@/lib/validators';
import { ensureMigrations } from '@/lib/migrate';

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
  email_verified: boolean;
  first_name: string | null;
  last_name: string | null;
}

export async function POST(request: Request) {
  try {
    await ensureMigrations();

    const body = (await request.json().catch(() => ({}))) as Body;
    const email = (body.email ?? '').trim().toLowerCase();
    const password = body.password ?? '';

    if (!isValidEmail(email) || !password) {
      return NextResponse.json({ success: false, error: 'E-posta ve şifre gerekli' }, { status: 400 });
    }

    const user = await queryOne<UserRow>(
      `SELECT id, email, password_hash, mini_credits, ultra_credits, created_at, is_active,
              COALESCE(email_verified, FALSE) AS email_verified,
              first_name, last_name
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
        emailVerified: user.email_verified,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (err: any) {
    console.error('[auth] login error:', err);
    return NextResponse.json({
      success: false,
      error: 'Giriş sırasında sunucu hatası oluştu',
      details: err.message,
      code: err.code,
    }, { status: 500 });
  }
}
