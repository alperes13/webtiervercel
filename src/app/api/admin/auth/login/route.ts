export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { signAdminSession, makeAdminCookieOptions, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';
import { ensureMigrations } from '@/lib/migrate';

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Çok fazla başarısız deneme. 15 dakika sonra tekrar deneyin.' },
      { status: 429 }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'E-posta ve şifre zorunludur.' }, { status: 400 });
  }

  await ensureMigrations();

  const user = await queryOne<{
    id: string;
    email: string;
    password_hash: string;
    is_admin: boolean;
    is_active: boolean;
  }>(
    'SELECT id, email, password_hash, is_admin, is_active FROM users WHERE email = $1',
    [email.toLowerCase().trim()]
  );

  if (!user || !user.is_admin || !user.is_active) {
    return NextResponse.json({ success: false, error: 'Geçersiz kimlik bilgileri.' }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ success: false, error: 'Geçersiz kimlik bilgileri.' }, { status: 401 });
  }

  const token = await signAdminSession({ sub: user.id, email: user.email });
  const cookieOpts = makeAdminCookieOptions(token);

  const response = NextResponse.json({ success: true, admin: { email: user.email, id: user.id } });
  response.cookies.set(ADMIN_COOKIE_NAME, cookieOpts.value, {
    httpOnly: cookieOpts.httpOnly,
    secure: cookieOpts.secure,
    sameSite: cookieOpts.sameSite,
    path: cookieOpts.path,
    maxAge: cookieOpts.maxAge,
  });
  return response;
}
