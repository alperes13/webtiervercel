export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/admin-auth';
import { query, queryOne } from '@/lib/db';
import { ensureMigrations } from '@/lib/migrate';

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  await ensureMigrations();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const search = searchParams.get('search') || '';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')));
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const params: unknown[] = [];
  let idx = 1;

  if (status) { conditions.push(`a.status = $${idx++}`); params.push(status); }
  if (type) { conditions.push(`a.analysis_type = $${idx++}`); params.push(type); }
  if (search) {
    conditions.push(`(u.email ILIKE $${idx} OR a.website_url ILIKE $${idx})`);
    params.push(`%${search}%`);
    idx++;
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const countResult = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM analyses a JOIN users u ON a.user_id = u.id ${where}`,
    params
  );
  const total = parseInt(countResult?.count || '0');

  params.push(limit, offset);
  const result = await query<{
    id: string;
    user_id: string;
    user_email: string;
    user_first_name: string | null;
    user_last_name: string | null;
    analysis_type: string;
    status: string;
    website_url: string;
    instagram_url: string | null;
    linkedin_url: string | null;
    tiktok_url: string | null;
    additional_notes: string | null;
    created_at: string;
    updated_at: string;
  }>(
    `SELECT
      a.id, a.user_id, u.email as user_email, u.first_name as user_first_name, u.last_name as user_last_name,
      a.analysis_type, a.status, a.website_url, a.instagram_url, a.linkedin_url, a.tiktok_url,
      a.additional_notes, a.created_at, a.updated_at
     FROM analyses a
     JOIN users u ON a.user_id = u.id
     ${where}
     ORDER BY a.created_at DESC
     LIMIT $${idx} OFFSET $${idx + 1}`,
    params
  );

  return NextResponse.json({ success: true, analyses: result.rows, total, page, limit });
}

export async function PATCH(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  let body: { id?: string; status?: string };
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }

  const validStatuses = ['pending', 'processing', 'completed', 'failed', 'rejected'];
  if (!body.id || !body.status || !validStatuses.includes(body.status)) {
    return NextResponse.json({ success: false, error: 'Geçersiz id veya status.' }, { status: 400 });
  }

  await ensureMigrations();

  const updated = await queryOne<{ id: string }>(
    `UPDATE analyses SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id`,
    [body.status, body.id]
  );

  if (!updated) {
    return NextResponse.json({ success: false, error: 'Analiz bulunamadı.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
