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
    `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  return NextResponse.json({ success: true, tasks: result.rows });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { id: userId } = await params;

  let body: {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    labels?: string[];
    image_url?: string;
    due_date?: string;
  };
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }

  if (!body.title?.trim()) {
    return NextResponse.json({ success: false, error: 'Başlık zorunludur.' }, { status: 400 });
  }

  const validPriorities = ['low', 'medium', 'high', 'critical'];
  const validStatuses = ['todo', 'in_progress', 'review', 'done', 'cancelled'];
  const priority = validPriorities.includes(body.priority || '') ? body.priority : 'medium';
  const status = validStatuses.includes(body.status || '') ? body.status : 'todo';

  await ensureMigrations();

  const userExists = await queryOne('SELECT id FROM users WHERE id = $1', [userId]);
  if (!userExists) {
    return NextResponse.json({ success: false, error: 'Kullanıcı bulunamadı.' }, { status: 404 });
  }

  const task = await queryOne(
    `INSERT INTO tasks (user_id, title, description, priority, status, labels, image_url, due_date, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      userId,
      body.title.trim(),
      body.description || null,
      priority,
      status,
      body.labels && body.labels.length > 0 ? body.labels : null,
      body.image_url || null,
      body.due_date || null,
      admin.email,
    ]
  );

  return NextResponse.json({ success: true, task }, { status: 201 });
}
