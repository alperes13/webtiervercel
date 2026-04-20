export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/admin-auth';
import { queryOne } from '@/lib/db';
import { ensureMigrations } from '@/lib/migrate';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { id: userId } = await params;

  let body: { type?: string; amount?: number };
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }

  if (!body.type || !['mini', 'ultra'].includes(body.type)) {
    return NextResponse.json({ success: false, error: 'Kredi tipi mini veya ultra olmalıdır.' }, { status: 400 });
  }
  const amount = parseInt(String(body.amount));
  if (isNaN(amount) || amount === 0) {
    return NextResponse.json({ success: false, error: 'Geçerli bir miktar giriniz.' }, { status: 400 });
  }

  await ensureMigrations();

  const col = body.type === 'mini' ? 'mini_credits' : 'ultra_credits';
  const user = await queryOne<{ id: string; mini_credits: number; ultra_credits: number }>(
    `UPDATE users SET ${col} = ${col} + $1 WHERE id = $2 RETURNING id, mini_credits, ultra_credits`,
    [amount, userId]
  );

  if (!user) {
    return NextResponse.json({ success: false, error: 'Kullanıcı bulunamadı.' }, { status: 404 });
  }

  const balanceAfter = body.type === 'mini' ? user.mini_credits : user.ultra_credits;

  await queryOne(
    `INSERT INTO credits (user_id, credit_type, amount, transaction_type, description, balance_after)
     VALUES ($1, $2, $3, 'admin_grant', $4, $5)`,
    [userId, body.type, amount, `Admin tarafından eklendi: ${admin.email}`, balanceAfter]
  );

  return NextResponse.json({
    success: true,
    credits: { mini: user.mini_credits, ultra: user.ultra_credits },
  });
}
