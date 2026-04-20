export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/admin-auth';
import { query, queryOne } from '@/lib/db';
import { ensureMigrations } from '@/lib/migrate';

const VALID_KEYS = ['maintenance_mode', 'cro_mini_enabled', 'cro_ultra_enabled'];

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  await ensureMigrations();

  const result = await query('SELECT key, value FROM app_settings ORDER BY key');
  const settings: Record<string, boolean> = {};
  for (const row of result.rows as { key: string; value: string }[]) {
    settings[row.key] = row.value === 'true';
  }

  return NextResponse.json({ success: true, settings });
}

export async function PATCH(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  let body: { key?: string; value?: boolean };
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }

  if (!body.key || !VALID_KEYS.includes(body.key)) {
    return NextResponse.json({ success: false, error: 'Geçersiz ayar anahtarı.' }, { status: 400 });
  }
  if (typeof body.value !== 'boolean') {
    return NextResponse.json({ success: false, error: 'Değer boolean olmalıdır.' }, { status: 400 });
  }

  await ensureMigrations();

  await queryOne(
    `INSERT INTO app_settings (key, value, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
    [body.key, body.value.toString()]
  );

  const response = NextResponse.json({ success: true });

  // For maintenance_mode, set the wt_maintenance cookie so proxy.ts can read it
  if (body.key === 'maintenance_mode') {
    response.cookies.set('wt_maintenance', body.value.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}
