import { NextResponse, type NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

interface Body {
  website_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  tiktok_url?: string;
  additional_notes?: string;
}

function isValidUrl(v: string): boolean {
  try {
    const u = new URL(v);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as Body;
  if (!body.website_url || !isValidUrl(body.website_url)) {
    return NextResponse.json({ success: false, error: 'Geçerli bir website_url gerekli' }, { status: 400 });
  }

  const analysis = await queryOne<{ id: string; status: string }>(
    `INSERT INTO analyses (user_id, analysis_type, website_url, instagram_url, linkedin_url, tiktok_url, additional_notes, status)
     VALUES ($1, 'ultra', $2, $3, $4, $5, $6, 'pending') RETURNING id, status`,
    [
      user.sub,
      body.website_url,
      body.instagram_url ?? null,
      body.linkedin_url ?? null,
      body.tiktok_url ?? null,
      body.additional_notes ?? null,
    ]
  );

  if (!analysis) {
    return NextResponse.json({ success: false, error: 'Analiz oluşturulamadı' }, { status: 500 });
  }

  const deducted = await queryOne<{ deduct_credit: boolean }>(
    `SELECT deduct_credit($1, 'ultra', $2, 'Ultra analiz') AS deduct_credit`,
    [user.sub, analysis.id]
  );

  if (!deducted?.deduct_credit) {
    await query("UPDATE analyses SET status = 'failed' WHERE id = $1", [analysis.id]);
    return NextResponse.json({ success: false, error: 'Yetersiz ultra kredi' }, { status: 402 });
  }

  return NextResponse.json({
    success: true,
    message: 'Ultra analiz talebi oluşturuldu',
    analysis: { id: analysis.id, type: 'ultra', status: 'pending' },
    note: 'Analiziniz incelemeye alındı. Onaylanırsa işleme alınacak, reddedilirse krediniz iade edilecektir.',
  });
}
