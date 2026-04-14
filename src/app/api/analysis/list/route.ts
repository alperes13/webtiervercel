import { NextResponse, type NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const analyses = await query(
      `SELECT id, website_url, analysis_type, status, created_at, completed_at, results
       FROM analyses 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [user.sub]
    );

    return NextResponse.json({
      success: true,
      analyses: analyses || []
    });
  } catch (err: any) {
    console.error('[analysis-list] error:', err);
    return NextResponse.json({ 
      success: false, 
      error: 'Analizler listelenirken bir hata oluştu',
      details: err.message 
    }, { status: 500 });
  }
}
