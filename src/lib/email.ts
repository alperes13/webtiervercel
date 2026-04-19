import nodemailer from 'nodemailer';

/**
 * Email sending utility.
 *
 * Supports two providers — whichever env vars are set will be used:
 *
 * 1. SMTP (recommended):
 *    SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *    e.g. Gmail: host=smtp.gmail.com, port=465, user=you@gmail.com, pass=<App Password>
 *         Yandex: host=smtp.yandex.com, port=465
 *         Custom: any SMTP provider
 *
 * 2. Resend (alternative):
 *    RESEND_API_KEY
 *    Domain must be verified in Resend dashboard.
 *
 * FROM_EMAIL defaults to the SMTP_USER or noreply@webtier.com.tr
 */

const FROM_NAME = 'Webtier';
const FROM_EMAIL = process.env.FROM_EMAIL ?? process.env.SMTP_USER ?? 'noreply@webtier.com.tr';

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

async function sendViaSMTP(to: string, otpCode: string): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error('[email] SMTP env vars missing: SMTP_HOST, SMTP_USER, SMTP_PASS required');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject: `Webtier Doğrulama Kodu: ${otpCode}`,
      html: buildHtml(otpCode),
    });

    console.log(`[email] OTP sent via SMTP to ${to}`);
    return true;
  } catch (err: any) {
    console.error('[email] SMTP send error:', err?.message ?? err);
    return false;
  }
}

async function sendViaResend(to: string, otpCode: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[email] RESEND_API_KEY is not set');
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [to],
        subject: `Webtier Doğrulama Kodu: ${otpCode}`,
        html: buildHtml(otpCode),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('[email] Resend API error:', res.status, body);
      return false;
    }

    console.log(`[email] OTP sent via Resend to ${to}`);
    return true;
  } catch (err: any) {
    console.error('[email] Resend send error:', err?.message ?? err);
    return false;
  }
}

export async function sendOTPEmail(to: string, otpCode: string): Promise<boolean> {
  // Prefer SMTP if configured, fall back to Resend
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return sendViaSMTP(to, otpCode);
  }

  if (process.env.RESEND_API_KEY) {
    return sendViaResend(to, otpCode);
  }

  console.error(
    '[email] No email provider configured. ' +
    'Set SMTP_HOST + SMTP_USER + SMTP_PASS, or RESEND_API_KEY in your environment.'
  );
  return false;
}
