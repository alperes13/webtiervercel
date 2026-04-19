import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { sendOTPEmail } from '@/lib/email';
import { ensureMigrations } from '@/lib/migrate';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    await ensureMigrations();

    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    // Check if already verified
    const dbUser = await queryOne<{ email_verified: boolean }>(
      'SELECT email_verified FROM users WHERE id = $1',
      [user.sub]
    );
    if (dbUser?.email_verified) {
      return NextResponse.json({ success: false, error: 'E-posta zaten doğrulanmış' }, { status: 400 });
    }

    // Rate limiting: max 3 OTPs per hour per email
    const recentCount = await queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM otp_sessions
       WHERE email = $1 AND created_at > NOW() - INTERVAL '1 hour'`,
      [user.email]
    );
    if (recentCount && parseInt(recentCount.count, 10) >= 3) {
      return NextResponse.json({ success: false, error: 'Çok fazla deneme. Lütfen 1 saat sonra tekrar deneyin.' }, { status: 429 });
    }

    // Generate 6-digit OTP
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));

    // Store OTP in database (expires in 10 minutes)
    await query(
      `INSERT INTO otp_sessions (email, otp_code, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '10 minutes')`,
      [user.email, otpCode]
    );

    // Send email
    const sent = await sendOTPEmail(user.email, otpCode);
    if (!sent) {
      return NextResponse.json({ success: false, error: 'E-posta gönderilemedi. Lütfen tekrar deneyin.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Doğrulama kodu gönderildi' });
  } catch (err: any) {
    console.error('[verify-email] send error:', err);
    return NextResponse.json({ success: false, error: 'Sunucu hatası oluştu' }, { status: 500 });
  }
}
