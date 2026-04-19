import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { sendOTPEmail } from '@/lib/email';
import { ensureMigrations } from '@/lib/migrate';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  // Run migrations non-fatally
  try { await ensureMigrations(); } catch { /* continue */ }

  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    // Check if already verified
    try {
      const dbUser = await queryOne<{ email_verified: boolean }>(
        'SELECT COALESCE(email_verified, FALSE) AS email_verified FROM users WHERE id = $1',
        [user.sub]
      );
      if (dbUser?.email_verified) {
        return NextResponse.json({ success: false, error: 'E-posta zaten doğrulanmış' }, { status: 400 });
      }
    } catch { /* column may not exist yet, continue */ }

    // Clean up expired / unverified OTPs for this email first (resets rate limit for old attempts)
    try {
      await query(
        `DELETE FROM otp_sessions WHERE email = $1 AND verified = FALSE AND expires_at < NOW()`,
        [user.email]
      );
    } catch { /* tolerate */ }

    // Rate limiting: max 3 active (non-expired) OTPs per hour
    try {
      const recentCount = await queryOne<{ count: string }>(
        `SELECT COUNT(*) AS count FROM otp_sessions
         WHERE email = $1 AND created_at > NOW() - INTERVAL '1 hour' AND verified = FALSE AND expires_at > NOW()`,
        [user.email]
      );
      if (recentCount && parseInt(recentCount.count, 10) >= 3) {
        return NextResponse.json(
          { success: false, error: 'Çok fazla deneme. Lütfen birkaç dakika bekleyip tekrar deneyin.' },
          { status: 429 }
        );
      }
    } catch { /* tolerate */ }

    // Generate OTP
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));

    // Store OTP
    try {
      await query(
        `INSERT INTO otp_sessions (email, otp_code, expires_at)
         VALUES ($1, $2, NOW() + INTERVAL '10 minutes')`,
        [user.email, otpCode]
      );
    } catch (insertErr: any) {
      console.error('[verify-email/send] otp insert error:', insertErr?.message);
    }

    // Send email — get the real error back
    const result = await sendOTPEmail(user.email, otpCode);

    if (!result.ok) {
      // Clean up the OTP we just inserted
      await query(
        'DELETE FROM otp_sessions WHERE email = $1 AND otp_code = $2',
        [user.email, otpCode]
      ).catch(() => {});

      return NextResponse.json({
        success: false,
        error: result.error ?? 'E-posta gönderilemedi',
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Doğrulama kodu gönderildi' });
  } catch (err: any) {
    console.error('[verify-email/send] unexpected error:', err);
    return NextResponse.json({
      success: false,
      error: err?.message ?? 'Sunucu hatası oluştu',
    }, { status: 500 });
  }
}
