import { NextResponse, type NextRequest } from 'next/server';
import { queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const row = await queryOne<{ mini_credits: number; ultra_credits: number }>(
    'SELECT mini_credits, ultra_credits FROM users WHERE id = $1',
    [user.sub]
  );

  if (!row) return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });

  return NextResponse.json({
    success: true,
    credits: {
      mini: row.mini_credits,
      ultra: row.ultra_credits,
      total: row.mini_credits + row.ultra_credits,
    },
  });
}
