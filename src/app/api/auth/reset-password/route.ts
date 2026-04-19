import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword, isValidPassword } from '@/lib/password';
import { ensureMigrations } from '@/lib/migrate';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    await ensureMigrations();

    const body = (await request.json().catch(() => ({}))) as { token?: string; newPassword?: string };
    const token = (body.token ?? '').trim();
    const newPassword = body.newPassword ?? '';

    if (!token) {
      return NextResponse.json({ success: false, error: 'Geçersiz token' }, { status: 400 });
    }

    if (!isValidPassword(newPassword)) {
      return NextResponse.json({ success: false, error: 'Şifre en az 6 karakter olmalıdır' }, { status: 400 });
    }

    // Find valid token
    const resetToken = await queryOne<{ id: string; user_id: string; used: boolean; expires_at: Date }>(
      `SELECT id, user_id, used, expires_at FROM password_reset_tokens
       WHERE token = $1 AND used = FALSE AND expires_at > NOW()`,
      [token]
    );

    if (!resetToken) {
      return NextResponse.json(
        { success: false, error: 'Bu link geçersiz veya süresi dolmuş. Lütfen yeni bir sıfırlama isteyin.' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword);

    // Update user password
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, resetToken.user_id]);

    // Mark token as used
    await query('UPDATE password_reset_tokens SET used = TRUE WHERE id = $1', [resetToken.id]);

    return NextResponse.json({ success: true, message: 'Şifreniz başarıyla güncellendi' });
  } catch (err: any) {
    console.error('[reset-password] unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Sunucu hatası' }, { status: 500 });
  }
}
