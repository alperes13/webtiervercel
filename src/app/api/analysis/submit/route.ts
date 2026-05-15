import { NextResponse, type NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

type AnalysisType = 'mini' | 'ultra';

type PlatformKey =
  | 'website'
  | 'instagram'
  | 'google_business'
  | 'linkedin'
  | 'facebook'
  | 'tiktok';

interface Body {
  type?: AnalysisType;
  addresses?: Partial<Record<PlatformKey, string>>;
}

function normalize(v: string | undefined): string | null {
  if (typeof v !== 'string') return null;
  const trimmed = v.trim();
  if (!trimmed || trimmed.toLowerCase() === 'empty') return null;
  return trimmed;
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  if (body.type !== 'mini' && body.type !== 'ultra') {
    return NextResponse.json(
      { success: false, error: 'type alanı "mini" veya "ultra" olmalı' },
      { status: 400 },
    );
  }

  const addresses = body.addresses ?? {};
  const website = normalize(addresses.website);
  const instagram = normalize(addresses.instagram);
  const googleBusiness = normalize(addresses.google_business);
  const linkedin = normalize(addresses.linkedin);
  const facebook = normalize(addresses.facebook);
  const tiktok = normalize(addresses.tiktok);

  const filledCount = [website, instagram, googleBusiness, linkedin, facebook, tiktok].filter(
    (v) => v !== null,
  ).length;
  if (filledCount === 0) {
    return NextResponse.json(
      { success: false, error: 'En az bir dijital adres girilmelidir.' },
      { status: 400 },
    );
  }

  // schema requires website_url NOT NULL — until migration adds google_business_url/facebook_url
  // and relaxes website_url, we put a sentinel "empty" when website is missing so the row still
  // captures the analysis. Other platforms persist as NULL or, for the two not-yet-in-schema ones,
  // inside additional_notes JSON.
  const websiteForDb = website ?? 'empty';
  const extras: Record<string, string> = {};
  if (googleBusiness) extras.google_business = googleBusiness;
  if (facebook) extras.facebook = facebook;
  const additionalNotes = Object.keys(extras).length > 0 ? JSON.stringify(extras) : null;

  const analysis = await queryOne<{ id: string; status: string }>(
    `INSERT INTO analyses
       (user_id, analysis_type, website_url, instagram_url, linkedin_url, tiktok_url, additional_notes, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
     RETURNING id, status`,
    [user.sub, body.type, websiteForDb, instagram, linkedin, tiktok, additionalNotes],
  );

  if (!analysis) {
    return NextResponse.json(
      { success: false, error: 'Analiz oluşturulamadı' },
      { status: 500 },
    );
  }

  const description = body.type === 'ultra' ? 'Ultra analiz' : 'Mini analiz';
  const deducted = await queryOne<{ deduct_credit: boolean }>(
    `SELECT deduct_credit($1, $2, $3, $4) AS deduct_credit`,
    [user.sub, body.type, analysis.id, description],
  );

  if (!deducted?.deduct_credit) {
    await query("UPDATE analyses SET status = 'failed' WHERE id = $1", [analysis.id]);
    return NextResponse.json(
      {
        success: false,
        error: body.type === 'ultra' ? 'Yetersiz Ultra kredi' : 'Yetersiz Mini kredi',
      },
      { status: 402 },
    );
  }

  // Pending notification — best-effort, do not fail the request if this errors.
  try {
    const labelForUrl =
      website || instagram || googleBusiness || linkedin || facebook || tiktok || '';
    const title =
      body.type === 'ultra'
        ? 'Ultra analiziniz hazırlanıyor'
        : 'Mini analiziniz hazırlanıyor';
    const noteBody = labelForUrl
      ? `${labelForUrl} adresine ait ${body.type.toUpperCase()} analiziniz alındı, server yoğunluğuna göre 0-2 saat içinde tamamlanır.`
      : `${body.type.toUpperCase()} analiziniz alındı, server yoğunluğuna göre 0-2 saat içinde tamamlanır.`;
    await query(
      `INSERT INTO notifications (user_id, type, title, body, metadata)
       VALUES ($1, 'analysis_pending', $2, $3, $4::jsonb)`,
      [
        user.sub,
        title,
        noteBody,
        JSON.stringify({
          analysis_id: analysis.id,
          analysis_type: body.type,
          addresses: {
            website,
            instagram,
            google_business: googleBusiness,
            linkedin,
            facebook,
            tiktok,
          },
        }),
      ],
    );
  } catch {
    // ignore notification failure
  }

  return NextResponse.json({
    success: true,
    message:
      body.type === 'ultra'
        ? 'Ultra analiz talebi oluşturuldu'
        : 'Mini analiz talebi oluşturuldu',
    analysis: { id: analysis.id, type: body.type, status: 'pending' },
  });
}
