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

  // Netgsm REST v2 OTP expects 10-digit phone (e.g. 5xxxxxxxxx)
  const cleanPhone = phone.replace('+90', '').replace(/\s/g, '');

  try {
    const rawMessage = `Webtier dogrulama kodunuz: ${code}. Bu kodu kimseyle paylasmayin.`;
    
    // Auth header: Basic base64(username:password)
    const auth = Buffer.from(`${usercode}:${password}`).toString('base64');

    const res = await fetch('https://api.netgsm.com.tr/sms/rest/v2/otp', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        msgheader: header,
        msg: rawMessage,
        no: cleanPhone
      })
    });

    const data = await res.json().catch(() => ({}));
    const text = typeof data === 'string' ? data : (data.code || JSON.stringify(data));
    
    // Netgsm REST v2 returns { code: "00", description: "success", ... }
    if (data.code === '00') {
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
