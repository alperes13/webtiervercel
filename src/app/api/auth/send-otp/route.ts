import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';
import { getUserPhoneVerifiedByPhone } from '@/lib/phone-verification';

export const runtime = 'nodejs';

const OTP_TTL_MINUTES = 5;
const NETGSM_OTP_URL = 'https://api.netgsm.com.tr/sms/send/otp';

type OtpPurpose = 'register' | 'reset' | 'verify';

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const NETGSM_ERROR_CODES: Record<string, string> = {
  '20': 'Mesaj metni ya da mesaj boyunu kontrol edin.',
  '30': 'Kullanici bilgisi, API yetkisi veya IP kisiti hatali.',
  '40': 'Gonderici basligi (header) hatali.',
  '41': 'Gonderici basligi (header) hatali.',
  '50': 'Telefon numarasi gecersiz.',
  '60': 'Hesapta OTP SMS paketi tanimli degil.',
  '70': 'Parametreleri kontrol edin.',
  '80': 'Dakikalik OTP gonderim limiti asildi.',
  '100': 'Netgsm sistem hatasi.',
};

type NetgsmResult =
  | { success: true; raw: string; jobId?: string }
  | { success: false; type: 'config' | 'provider' | 'network'; message: string; raw?: string; code?: string };

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function xmlTagValue(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}>\\s*([^<]+?)\\s*</${tag}>`, 'i'));
  return match?.[1]?.trim() ?? null;
}

function parseNetgsmResponse(raw: string): NetgsmResult {
  const code = xmlTagValue(raw, 'code');
  const jobId = xmlTagValue(raw, 'jobID');
  const compact = raw.trim();

  if (jobId && (!code || code === '0' || code === '00')) {
    return { success: true, raw, jobId };
  }

  if (code && NETGSM_ERROR_CODES[code]) {
    return { success: false, type: 'provider', message: NETGSM_ERROR_CODES[code], code, raw };
  }

  // Fallback for non-XML, numeric responses
  if (/^\d+$/.test(compact)) {
    if (NETGSM_ERROR_CODES[compact]) {
      return {
        success: false,
        type: 'provider',
        message: NETGSM_ERROR_CODES[compact],
        code: compact,
        raw,
      };
    }

    // Numeric but not an error code => treat as job id
    return { success: true, raw, jobId: compact };
  }

  return {
    success: false,
    type: 'provider',
    message: 'Netgsm yaniti anlasilamadi.',
    raw,
    code: code ?? undefined,
  };
}

async function sendNetgsmSMS(phoneRaw: string, code: string): Promise<NetgsmResult> {
  const usercode = process.env.NETGSM_USERCODE ?? process.env.NETGSM_USER;
  const password = process.env.NETGSM_PASSWORD ?? process.env.NETGSM_PASS;
  const header = process.env.NETGSM_HEADER ?? process.env.NETGSM_MSGHEADER;

  if (!usercode || !password || !header) {
    return {
      success: false,
      type: 'config',
      message:
        'NETGSM_USERCODE/NETGSM_USER, NETGSM_PASSWORD/NETGSM_PASS veya NETGSM_HEADER/NETGSM_MSGHEADER eksik.',
    };
  }

  try {
    const rawMessage = `Webtier dogrulama kodunuz: ${code}. Bu kodu kimseyle paylasmayin.`;
    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<mainbody>
  <header>
    <usercode>${xmlEscape(usercode)}</usercode>
    <password>${xmlEscape(password)}</password>
    <msgheader>${xmlEscape(header)}</msgheader>
  </header>
  <body>
    <msg>${xmlEscape(rawMessage)}</msg>
    <no>${xmlEscape(phoneRaw)}</no>
  </body>
</mainbody>`;

    const res = await fetch(NETGSM_OTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=UTF-8',
        Accept: 'application/xml, text/xml, */*',
      },
      body: xmlPayload,
    });

    const raw = await res.text();
    if (!res.ok) {
      return {
        success: false,
        type: 'provider',
        message: `Netgsm HTTP ${res.status}`,
        raw,
      };
    }

    return parseNetgsmResponse(raw);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Bilinmeyen ag hatasi';
    console.error('[otp] netgsm send failed', err);
    return { success: false, type: 'network', message };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { phone?: string; purpose?: OtpPurpose };
    const normalized = normalizePhone(body.phone ?? '');
    
    if (!normalized) {
      return NextResponse.json({ success: false, error: 'Geçersiz telefon numarası' }, { status: 400 });
    }

    let purpose: OtpPurpose = 'register';
    if (body.purpose === 'reset') purpose = 'reset';
    if (body.purpose === 'verify') purpose = 'verify';

    const existing = await queryOne<{ id: string }>('SELECT id FROM users WHERE phone = $1', [normalized.phone]);

    if (purpose === 'register' && existing) {
      return NextResponse.json({ success: false, error: 'Bu numara zaten kayıtlı. Lütfen giriş yapın.' }, { status: 409 });
    }
    if (purpose === 'reset' && !existing) {
      return NextResponse.json({ success: false, error: 'Bu numaraya ait kayıt bulunamadı.' }, { status: 404 });
    }
    if (purpose === 'verify' && !existing) {
      return NextResponse.json({ success: false, error: 'Bu numaraya ait hesap bulunamadı.' }, { status: 404 });
    }
    if (purpose === 'verify' && existing) {
      const alreadyVerified = await getUserPhoneVerifiedByPhone(normalized.phone);
      if (alreadyVerified) {
        return NextResponse.json({ success: false, error: 'Bu telefon numarası zaten doğrulandı.' }, { status: 409 });
      }
    }

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60_000);

    const session = await queryOne<{ id: string }>(
      `INSERT INTO otp_sessions (phone, otp_code, expires_at)
       VALUES ($1, $2, $3) RETURNING id`,
      [normalized.phone, code, expiresAt]
    );

    if (!session) {
      return NextResponse.json({ success: false, error: 'OTP oturumu oluşturulamadı (DB hatası)' }, { status: 500 });
    }

    const sms = await sendNetgsmSMS(normalized.phoneRaw, code);
    if (!sms.success) {
      console.error('[otp] sms provider error', {
        type: sms.type,
        code: sms.code ?? null,
        raw: sms.raw ?? null,
      });

      try {
        await query('DELETE FROM otp_sessions WHERE id = $1', [session.id]);
      } catch (cleanupError) {
        console.error('[otp] failed to cleanup unsent otp session:', cleanupError);
      }

      const status = sms.type === 'config' ? 500 : 502;
      const detail = sms.code ? `${sms.message} (kod: ${sms.code})` : sms.message;
      return NextResponse.json(
        {
          success: false,
          error: `SMS gonderilemedi: ${detail}`,
        },
        { status }
      );
    }

    return NextResponse.json({ 
      success: true, 
      sessionId: session.id, 
      expiresIn: OTP_TTL_MINUTES * 60,
      providerJobId: sms.jobId ?? null,
    });
  } catch (error: any) {
    console.error('[otp] critical route failure:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Sunucu hatası oluştu',
      code: error.code
    }, { status: 500 });
  }
}
