import { Resend } from 'resend';

/**
 * Email sending via Resend HTTP API.
 * Works on Vercel serverless (no TCP port restrictions).
 *
 * Required env var: RESEND_API_KEY
 * Optional:        FROM_EMAIL (defaults to onboarding@resend.dev for testing,
 *                  use a verified domain address in production)
 *
 * Free tier: 100 emails/day, 3000/month — no domain verification needed
 * to send to your own address during testing.
 */

function buildHtml(otpCode: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;padding:40px 0;margin:0;">
  <div style="max-width:420px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
    <div style="background:#0f172a;padding:24px;text-align:center;">
      <h1 style="color:#fff;font-size:20px;margin:0;font-weight:700;">Webtier</h1>
    </div>
    <div style="padding:32px 24px;text-align:center;">
      <p style="color:#334155;font-size:15px;margin:0 0 8px;font-weight:600;">E-posta Doğrulama Kodunuz</p>
      <p style="color:#64748b;font-size:13px;margin:0 0 24px;">Aşağıdaki kodu girerek e-posta adresinizi doğrulayın.</p>
      <div style="background:#f1f5f9;border-radius:8px;padding:20px 16px;margin:0 0 24px;border:1px dashed #cbd5e1;">
        <span style="font-size:36px;font-weight:800;letter-spacing:10px;color:#0f172a;font-family:monospace;">${otpCode}</span>
      </div>
      <p style="color:#94a3b8;font-size:12px;margin:0;">Bu kod <strong>10 dakika</strong> içinde geçerliliğini yitirecektir.</p>
    </div>
    <div style="background:#f8fafc;padding:16px 24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:11px;margin:0;">Bu e-postayı siz talep etmediyseniz lütfen dikkate almayın.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendOTPEmail(to: string, otpCode: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('[email] RESEND_API_KEY is not set');
    return false;
  }

  // Use verified domain address if set, otherwise Resend's test address
  const from = process.env.FROM_EMAIL
    ? `Webtier <${process.env.FROM_EMAIL}>`
    : 'Webtier <onboarding@resend.dev>';

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Webtier Doğrulama Kodu: ${otpCode}`,
      html: buildHtml(otpCode),
    });

    if (error) {
      console.error('[email] Resend error:', JSON.stringify(error));
      return false;
    }

    console.log('[email] OTP sent via Resend, id:', data?.id);
    return true;
  } catch (err: any) {
    console.error('[email] Resend exception:', err?.message ?? err);
    return false;
  }
}
