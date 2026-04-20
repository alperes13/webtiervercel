export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/admin-auth';
import { queryOne } from '@/lib/db';
import { ensureMigrations } from '@/lib/migrate';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ docId: string }> }
) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { docId } = await params;
  await ensureMigrations();

  const deleted = await queryOne('DELETE FROM user_documents WHERE id = $1 RETURNING id', [docId]);
  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Döküman bulunamadı.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
