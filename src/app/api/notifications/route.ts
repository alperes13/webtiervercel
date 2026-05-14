import { NextResponse, type NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { ensureMigrations } from '@/lib/migrate';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await ensureMigrations();

    const result = await query(
      `SELECT id, type, title, body, is_read, metadata, created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [user.sub]
    );

    const unreadCount = (result.rows as { is_read: boolean }[]).filter(n => !n.is_read).length;

    return NextResponse.json({
      success: true,
      notifications: result.rows,
      unreadCount,
    });
  } catch (err: unknown) {
    console.error('[notifications] GET error:', err);
    return NextResponse.json({ success: false, error: 'Bildirimler yüklenemedi' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await ensureMigrations();

    let body: { id?: string; all?: boolean } = {};
    try { body = await request.json(); } catch { /* empty body = mark all */ body = { all: true }; }

    if (body.all) {
      // Mark all as read
      await query(
        `UPDATE notifications SET is_read = TRUE WHERE user_id = $1 AND is_read = FALSE`,
        [user.sub]
      );
    } else if (body.id) {
      // Mark single notification as read
      await query(
        `UPDATE notifications SET is_read = TRUE WHERE id = $1 AND user_id = $2`,
        [body.id, user.sub]
      );
    } else {
      return NextResponse.json({ success: false, error: 'id veya all parametresi gerekli' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('[notifications] PATCH error:', err);
    return NextResponse.json({ success: false, error: 'Bildirim güncellenemedi' }, { status: 500 });
  }
}
