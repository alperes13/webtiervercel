import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword, isValidPassword } from '@/lib/password';
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
  mini_credits: number;
  ultra_credits: number;
  created_at: Date;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Body;
    const email = (body.email ?? '').trim().toLowerCase();

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Geçerli bir e-posta adresi girin' }, { status: 400 });
    }

    if (!isValidPassword(body.password ?? '')) {
      return NextResponse.json({ success: false, error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
    }

    const existing = await queryOne<{ id: string }>('SELECT id FROM users WHERE LOWER(email) = $1', [email]);
    if (existing) {
      return NextResponse.json({ success: false, error: 'Bu e-posta adresi zaten kayıtlı' }, { status: 409 });
    }

    const passwordHash = await hashPassword(body.password as string);

    const inserted = await queryOne<UserRow>(
      `INSERT INTO users (email, password_hash, mini_credits, ultra_credits, last_login, email_verified)
       VALUES ($1, $2, 1, 0, CURRENT_TIMESTAMP, FALSE)
       RETURNING id, email, mini_credits, ultra_credits, created_at`,
      [email, passwordHash]
    );

    if (!inserted) {
      return NextResponse.json({ success: false, error: 'Kullanıcı oluşturulamadı' }, { status: 500 });
    }

    await query(
      `INSERT INTO credits (user_id, credit_type, amount, transaction_type, description, balance_after)
       VALUES ($1, 'mini', 1, 'signup_bonus', 'Kayıt bonusu: 1 mini kredi', 1)`,
      [inserted.id]
    );

    const { token, expiresAt } = await signSession({ sub: inserted.id, email: inserted.email });

    return NextResponse.json({
      success: true,
      session: {
        token,
        email: inserted.email,
        createdAt: inserted.created_at.getTime(),
        expiresAt,
        analysisStatus: 'none' as const,
        creditsMini: inserted.mini_credits,
        creditsUltra: inserted.ultra_credits,
        emailVerified: false,
      },
    });
  } catch (err: any) {
    console.error('[auth] register error:', err);
    return NextResponse.json({ 
      success: false, 
      error: 'Kayıt sırasında sunucu hatası oluştu',
      details: err.message,
      code: err.code 
    }, { status: 500 });
  }
}
