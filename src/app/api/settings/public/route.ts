export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { ensureMigrations } from '@/lib/migrate';

export async function GET() {
  await ensureMigrations();

  const mini = await queryOne<{ value: string }>(
    'SELECT value FROM app_settings WHERE key = $1',
    ['cro_mini_enabled']
  );
  const ultra = await queryOne<{ value: string }>(
    'SELECT value FROM app_settings WHERE key = $1',
    ['cro_ultra_enabled']
  );

  return NextResponse.json({
    success: true,
    cro_mini_enabled: (mini?.value ?? 'true') === 'true',
    cro_ultra_enabled: (ultra?.value ?? 'true') === 'true',
  });
}
