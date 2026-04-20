export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/admin-auth';
import { queryOne } from '@/lib/db';
import { ensureMigrations } from '@/lib/migrate';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { taskId } = await params;

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

  await ensureMigrations();

  const validPriorities = ['low', 'medium', 'high', 'critical'];
  const validStatuses = ['todo', 'in_progress', 'review', 'done', 'cancelled'];

  const sets: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (body.title !== undefined) { sets.push(`title = $${idx++}`); values.push(body.title.trim()); }
  if (body.description !== undefined) { sets.push(`description = $${idx++}`); values.push(body.description || null); }
  if (body.priority !== undefined && validPriorities.includes(body.priority)) {
    sets.push(`priority = $${idx++}`); values.push(body.priority);
  }
  if (body.status !== undefined && validStatuses.includes(body.status)) {
    sets.push(`status = $${idx++}`); values.push(body.status);
  }
  if (body.labels !== undefined) { sets.push(`labels = $${idx++}`); values.push(body.labels.length > 0 ? body.labels : null); }
  if (body.image_url !== undefined) { sets.push(`image_url = $${idx++}`); values.push(body.image_url || null); }
  if (body.due_date !== undefined) { sets.push(`due_date = $${idx++}`); values.push(body.due_date || null); }

  if (sets.length === 0) {
    return NextResponse.json({ success: false, error: 'Güncellenecek alan bulunamadı.' }, { status: 400 });
  }

  sets.push(`updated_at = NOW()`);
  values.push(taskId);

  const updated = await queryOne(
    `UPDATE tasks SET ${sets.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );

  if (!updated) {
    return NextResponse.json({ success: false, error: 'Task bulunamadı.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, task: updated });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { taskId } = await params;
  await ensureMigrations();

  const deleted = await queryOne('DELETE FROM tasks WHERE id = $1 RETURNING id', [taskId]);
  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Task bulunamadı.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
