import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { query, queryOne } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email';
import { ensureMigrations } from '@/lib/migrate';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    await ensureMigrations();

    const body = (await request.json().catch(() => ({}))) as { email?: string };
    const email = (body.email ?? '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Return success even for invalid email to avoid enumeration
      return NextResponse.json({ success: true });
    }

    // Rate limit: max 3 tokens per hour for same email
    try {
      const recentCount = await queryOne<{ count: string }>(
        `SELECT COUNT(*) AS count FROM password_reset_tokens prt
         JOIN users u ON u.id = prt.user_id
         WHERE LOWER(u.email) = $1 AND prt.created_at > NOW() - INTERVAL '1 hour'`,
        [email]
      );
      if (recentCount && parseInt(recentCount.count, 10) >= 3) {
        // Silently return success (don't leak rate limit info)
        return NextResponse.json({ success: true });
      }
    } catch { /* tolerate */ }

    // Find user
    const user = await queryOne<{ id: string; email: string }>(
      'SELECT id, email FROM users WHERE LOWER(email) = $1',
      [email]
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.' },
        { status: 404 }
      );
    }

    // Generate secure token
    const token = randomBytes(32).toString('hex');

    // Store token (1 hour expiry)
    await query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '1 hour')`,
      [user.id, token]
    );

    // Build reset URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtier.com.tr';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

    // Send email
    const result = await sendPasswordResetEmail(user.email, resetUrl);
    if (!result.ok) {
      console.error('[forgot-password] email send failed:', result.error);
      await query('DELETE FROM password_reset_tokens WHERE token = $1', [token]).catch(() => {});
      return NextResponse.json({ success: false, error: 'E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[forgot-password] unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Sunucu hatası' }, { status: 500 });
  }
}
