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
  const search = searchParams.get('q') || '';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')));
  const offset = (page - 1) * limit;

  const params: unknown[] = [];
  let where = '';

  if (search) {
    where = `WHERE (email ILIKE $1 OR first_name ILIKE $1 OR last_name ILIKE $1)`;
    params.push(`%${search}%`);
  }

  const countResult = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM users ${where}`,
    params
  );
  const total = parseInt(countResult?.count || '0');

  const searchIdx = params.length + 1;
  params.push(limit, offset);

  const usersResult = await query<{
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    mini_credits: number;
    ultra_credits: number;
    is_active: boolean;
    email_verified: boolean;
    created_at: string;
    last_login: string | null;
  }>(
    `SELECT id, email, first_name, last_name, mini_credits, ultra_credits, is_active, email_verified, created_at, last_login
     FROM users
     ${where}
     ORDER BY created_at DESC
     LIMIT $${searchIdx} OFFSET $${searchIdx + 1}`,
    params
  );

  return NextResponse.json({ success: true, users: usersResult.rows, total, page, limit });
}
