import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { sendOTPEmail } from '@/lib/email';
import { ensureMigrations } from '@/lib/migrate';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    await ensureMigrations();
  } catch (migErr: any) {
    console.error('[verify-email/send] migration error:', migErr);
    // Non-fatal — continue even if some ALTER TABLE failed
  }

  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    // Check if already verified — tolerate missing column
    let alreadyVerified = false;
    try {
      const dbUser = await queryOne<{ email_verified: boolean }>(
        'SELECT COALESCE(email_verified, FALSE) AS email_verified FROM users WHERE id = $1',
        [user.sub]
      );
      alreadyVerified = !!dbUser?.email_verified;
    } catch { /* column may not exist yet */ }

    if (alreadyVerified) {
      return NextResponse.json({ success: false, error: 'E-posta zaten doğrulanmış' }, { status: 400 });
    }

    // Rate limiting — tolerate missing email column in otp_sessions
    try {
      const recentCount = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM otp_sessions
         WHERE email = $1 AND created_at > NOW() - INTERVAL '1 hour'`,
        [user.email]
      );
      if (recentCount && parseInt(recentCount.count, 10) >= 3) {
        return NextResponse.json(
          { success: false, error: 'Çok fazla deneme. Lütfen 1 saat sonra tekrar deneyin.' },
          { status: 429 }
        );
      }
    } catch { /* otp_sessions.email column may not exist yet */ }

    // Generate 6-digit OTP
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));

    // Store OTP — tolerate schema issues
    try {
      await query(
        `INSERT INTO otp_sessions (email, otp_code, expires_at)
         VALUES ($1, $2, NOW() + INTERVAL '10 minutes')`,
        [user.email, otpCode]
      );
    } catch (insertErr: any) {
      console.error('[verify-email/send] otp insert error:', insertErr?.message);
      // Still try to send the email even if DB insert fails
    }

    // Send email
    const sent = await sendOTPEmail(user.email, otpCode);
    if (!sent) {
      await query(
        'DELETE FROM otp_sessions WHERE email = $1 AND otp_code = $2',
        [user.email, otpCode]
      ).catch(() => {});

      const providerMissing = !process.env.SMTP_HOST && !process.env.RESEND_API_KEY;
      return NextResponse.json({
        success: false,
        error: providerMissing
          ? 'E-posta servisi yapılandırılmamış. Lütfen yönetici ile iletişime geçin.'
          : 'E-posta gönderilemedi. Lütfen tekrar deneyin.',
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Doğrulama kodu gönderildi' });
  } catch (err: any) {
    console.error('[verify-email/send] error:', err);
    return NextResponse.json({
      success: false,
      error: 'Sunucu hatası oluştu',
      details: process.env.NODE_ENV !== 'production' ? err?.message : undefined,
    }, { status: 500 });
  }
}
