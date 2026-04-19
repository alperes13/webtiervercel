const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'noreply@webtier.com.tr';

export async function sendOTPEmail(to: string, otpCode: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error('[email] RESEND_API_KEY is not set');
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Webtier <${FROM_EMAIL}>`,
        to: [to],
        subject: `Webtier Doğrulama Kodu: ${otpCode}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 40px 0;">
  <div style="max-width: 420px; margin: 0 auto; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
    <div style="background: #0f172a; padding: 24px; text-align: center;">
      <h1 style="color: #fff; font-size: 20px; margin: 0; font-weight: 700;">Webtier</h1>
    </div>
    <div style="padding: 32px 24px; text-align: center;">
      <p style="color: #334155; font-size: 15px; margin: 0 0 24px;">E-posta doğrulama kodunuz:</p>
      <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 0 0 24px;">
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f172a;">${otpCode}</span>
      </div>
      <p style="color: #94a3b8; font-size: 13px; margin: 0;">Bu kod 10 dakika içinde geçerliliğini yitirecektir.</p>
    </div>
    <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 11px; margin: 0;">Bu e-postayı siz talep etmediyseniz lütfen dikkate almayın.</p>
    </div>
  </div>
</body>
</html>`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[email] Resend API error:', err);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[email] send error:', err);
    return false;
  }
}
