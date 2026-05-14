export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { signAdminSession, makeAdminCookieOptions, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

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

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }

  const { password } = body;
  if (!password) {
    return NextResponse.json({ success: false, error: 'Şifre zorunludur.' }, { status: 400 });
  }

  // Admin şifresi .env.local dosyasındaki ADMIN_PASSWORD değişkeninden alınır
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { success: false, error: 'Admin şifresi yapılandırılmamış.' },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json({ success: false, error: 'Geçersiz şifre.' }, { status: 401 });
  }

  const token = await signAdminSession();
  const cookieOpts = makeAdminCookieOptions(token);

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, cookieOpts.value, {
    httpOnly: cookieOpts.httpOnly,
    secure: cookieOpts.secure,
    sameSite: cookieOpts.sameSite,
    path: cookieOpts.path,
    maxAge: cookieOpts.maxAge,
  });
  return response;
}
