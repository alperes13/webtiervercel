import { SignJWT, jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'webtier_admin_session';
const ADMIN_TTL = 60 * 60 * 8; // 8 hours

export interface AdminJWTPayload {
  sub: string;
  email: string;
  role: 'admin';
}

function getAdminSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error('ADMIN_JWT_SECRET is not set');
  return new TextEncoder().encode(secret + ':admin');
}

export async function signAdminSession(payload: { sub: string; email: string }): Promise<string> {
  return new SignJWT({ email: payload.email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_TTL}s`)
    .sign(getAdminSecret());
}

export async function verifyAdminSession(token: string): Promise<AdminJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAdminSecret());
    if (payload.role !== 'admin' || !payload.sub || typeof payload.email !== 'string') return null;
    return { sub: payload.sub as string, email: payload.email, role: 'admin' };
  } catch {
    return null;
  }
}

export async function getAdminFromRequest(request: NextRequest | Request): Promise<AdminJWTPayload | null> {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const match = cookieHeader.match(new RegExp(`${ADMIN_COOKIE_NAME}=([^;]+)`));
  if (match?.[1]) {
    return verifyAdminSession(decodeURIComponent(match[1]));
  }
  return null;
}

export function makeAdminCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/adminpanel',
    maxAge: ADMIN_TTL,
  };
}
