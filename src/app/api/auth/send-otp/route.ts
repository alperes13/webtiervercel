import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';

export const runtime = 'nodejs';

const OTP_TTL_MINUTES = 5;

type OtpPurpose = 'register' | 'reset';

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendNetgsmSMS(phone: string, code: string): Promise<{ success: boolean; response?: string }> {
  const usercode = process.env.NETGSM_USERCODE;
  const password = process.env.NETGSM_PASSWORD;
  const header = process.env.NETGSM_HEADER;

  if (!usercode || !password || !header) {
    console.log(`[otp] DEV STUB (NETGSM) — phone=${phone} code=${code}`);
    return { success: true };
  }

  // Netgsm expects phone with 90 (e.g. 905xxxxxxxxx) or 10 digits. Using 12-digit format for better compatibility.
  const cleanPhone = phone.replace('+', '').replace(/\s/g, '');

  try {
    const rawMessage = `Webtier dogrulama kodunuz: ${code}. Bu kodu kimseyle paylasmayin.`;
    
    // According to documentation for HTTP GET (/sms/send/get/):
    // Required: usercode, password, msgheader, msg, no, type
    const params = new URLSearchParams({
      usercode,
      password,
      no: cleanPhone,    // Documentation says 'no'
      msg: rawMessage,   // Documentation says 'msg'
      msgheader: header,
      dil: 'TR',
      type: '1:n'
    });

    const url = `https://api.netgsm.com.tr/sms/send/get/?${params.toString()}`;
    const res = await fetch(url);
    const text = await res.text();
    
    // Netgsm returns "00" or "01 32132" for success
    if (text.startsWith('00') || text.startsWith('01')) {
      return { success: true };
    }
    
    return { success: false, response: text };
  } catch (err: any) {
    console.error('[otp] netgsm send failed', err);
    return { success: false, response: err.message };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { phone?: string; purpose?: OtpPurpose };
    const normalized = normalizePhone(body.phone ?? '');
    
    if (!normalized) {
      return NextResponse.json({ success: false, error: 'Geçersiz telefon numarası' }, { status: 400 });
    }

    const purpose: OtpPurpose = body.purpose === 'reset' ? 'reset' : 'register';
    
    const existing = await queryOne<{ id: string }>('SELECT id FROM users WHERE phone = $1', [normalized.phone]);

    if (purpose === 'register' && existing) {
      return NextResponse.json({ success: false, error: 'Bu numara zaten kayıtlı. Lütfen giriş yapın.' }, { status: 409 });
    }
    if (purpose === 'reset' && !existing) {
      return NextResponse.json({ success: false, error: 'Bu numaraya ait kayıt bulunamadı.' }, { status: 404 });
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

    const { success, response } = await sendNetgsmSMS(normalized.phone, code);
    if (!success) {
      return NextResponse.json({ 
        success: false, 
        error: `SMS gönderilemedi (Netgsm Yanıtı: ${response})` 
      }, { status: 502 });
    }

    return NextResponse.json({ 
      success: true, 
      sessionId: session.id, 
      expiresIn: OTP_TTL_MINUTES * 60 
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
