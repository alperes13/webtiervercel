import { SignJWT, jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export interface JWTPayload {
  sub: string;
  email: string;
}

export async function signSession(payload: JWTPayload): Promise<{ token: string; expiresAt: number }> {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const token = await new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
  return { token, expiresAt };
}

export async function verifySession(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub) return null;
    // Support both old tokens (phone field) and new tokens (email field)
    const email =
      typeof payload.email === 'string'
        ? payload.email
        : typeof payload.phone === 'string'
          ? payload.phone
          : null;
    if (!email) return null;
    return { sub: payload.sub, email };
  } catch {
    return null;
  }
}

export async function getUserFromRequest(request: NextRequest | Request): Promise<JWTPayload | null> {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice('Bearer '.length).trim();
  if (!token) return null;
  return verifySession(token);
}
