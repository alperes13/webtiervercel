import { NextResponse, type NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { firstName, lastName } = await request.json();

    await query(
      `UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3`,
      [firstName, lastName, user.sub]
    );

    return NextResponse.json({
      success: true,
      message: 'Profil güncellendi'
    });
  } catch (err: any) {
    console.error('[profile-update] error:', err);
    return NextResponse.json({ 
      success: false, 
      error: 'Profil güncellenirken bir hata oluştu',
      details: err.message 
    }, { status: 500 });
  }
}
