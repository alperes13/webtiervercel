import { NextResponse, type NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

interface Body {
  website_url?: string;
  instagram_url?: string;
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
    `INSERT INTO analyses (user_id, analysis_type, website_url, instagram_url, status)
     VALUES ($1, 'mini', $2, $3, 'pending') RETURNING id, status`,
    [user.sub, body.website_url, body.instagram_url ?? null]
  );

  if (!analysis) {
    return NextResponse.json({ success: false, error: 'Analiz oluşturulamadı' }, { status: 500 });
  }

  const deducted = await queryOne<{ deduct_credit: boolean }>(
    `SELECT deduct_credit($1, 'mini', $2, 'Mini analiz') AS deduct_credit`,
    [user.sub, analysis.id]
  );

  if (!deducted?.deduct_credit) {
    await query("UPDATE analyses SET status = 'failed' WHERE id = $1", [analysis.id]);
    return NextResponse.json({ success: false, error: 'Yetersiz mini kredi' }, { status: 402 });
  }

  return NextResponse.json({
    success: true,
    analysis: { id: analysis.id, type: 'mini', status: 'pending' },
  });
}
