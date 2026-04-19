import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

interface OTPRow {
  id: string;
  attempts: number;
  max_attempts: number;
  otp_code: string;
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as { code?: string };
    const code = (body.code ?? '').trim();

    if (!code || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ success: false, error: 'Geçerli bir 6 haneli kod girin' }, { status: 400 });
    }

    // Find the most recent non-expired, non-verified OTP for this email
    const otp = await queryOne<OTPRow>(
      `SELECT id, attempts, max_attempts, otp_code FROM otp_sessions
       WHERE email = $1 AND verified = FALSE AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [user.email]
    );

    if (!otp) {
      return NextResponse.json({ success: false, error: 'Doğrulama kodu bulunamadı veya süresi dolmuş. Lütfen yeni kod isteyin.' }, { status: 400 });
    }

    // Check attempts
    if (otp.attempts >= otp.max_attempts) {
      return NextResponse.json({ success: false, error: 'Maksimum deneme sayısına ulaşıldı. Lütfen yeni kod isteyin.' }, { status: 429 });
    }

    // Increment attempts
    await query('UPDATE otp_sessions SET attempts = attempts + 1 WHERE id = $1', [otp.id]);

    // Verify code
    if (otp.otp_code !== code) {
      const remaining = otp.max_attempts - otp.attempts - 1;
      return NextResponse.json({
        success: false,
        error: remaining > 0
          ? `Kod hatalı. ${remaining} deneme hakkınız kaldı.`
          : 'Kod hatalı. Deneme hakkınız bitti. Lütfen yeni kod isteyin.',
      }, { status: 400 });
    }

    // Mark OTP as verified
    await query(
      'UPDATE otp_sessions SET verified = TRUE, verified_at = NOW() WHERE id = $1',
      [otp.id]
    );

    // Update user's email_verified status
    await query('UPDATE users SET email_verified = TRUE WHERE id = $1', [user.sub]);

    return NextResponse.json({ success: true, message: 'E-posta başarıyla doğrulandı' });
  } catch (err: any) {
    console.error('[verify-email] verify error:', err);
    return NextResponse.json({ success: false, error: 'Sunucu hatası oluştu' }, { status: 500 });
  }
}
