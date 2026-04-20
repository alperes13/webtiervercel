export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/admin-auth';
import { query, queryOne } from '@/lib/db';
import { ensureMigrations } from '@/lib/migrate';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { id: userId } = await params;
  await ensureMigrations();

  const result = await query(
    `SELECT * FROM user_documents WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  return NextResponse.json({ success: true, documents: result.rows });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { id: userId } = await params;

  let body: { type?: string; name?: string; url?: string; file_extension?: string };
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }

  if (!body.type || !['file', 'link'].includes(body.type)) {
    return NextResponse.json({ success: false, error: 'Tür file veya link olmalıdır.' }, { status: 400 });
  }
  if (!body.name?.trim()) {
    return NextResponse.json({ success: false, error: 'İsim zorunludur.' }, { status: 400 });
  }
  if (!body.url?.trim()) {
    return NextResponse.json({ success: false, error: 'URL zorunludur.' }, { status: 400 });
  }

  await ensureMigrations();

  const userExists = await queryOne('SELECT id FROM users WHERE id = $1', [userId]);
  if (!userExists) {
    return NextResponse.json({ success: false, error: 'Kullanıcı bulunamadı.' }, { status: 404 });
  }

  const doc = await queryOne(
    `INSERT INTO user_documents (user_id, type, name, url, file_extension, added_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      userId,
      body.type,
      body.name.trim(),
      body.url.trim(),
      body.file_extension || null,
      admin.email,
    ]
  );

  return NextResponse.json({ success: true, document: doc }, { status: 201 });
}
