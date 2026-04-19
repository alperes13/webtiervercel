import { NextResponse, type NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import { query, queryOne } from '@/lib/db';
import { signSession } from '@/lib/auth';

export const runtime = 'nodejs';

interface UserRow {
  id: string;
  email: string;
  mini_credits: number;
  ultra_credits: number;
  created_at: Date;
  is_new: boolean;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? request.nextUrl.origin;

  if (error || !code) {
    return NextResponse.redirect(new URL('/auth/login?error=oauth_cancelled', baseUrl));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error('[google-oauth] GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set');
    return NextResponse.redirect(new URL('/auth/login?error=oauth_config', baseUrl));
  }

  // Exchange authorization code for tokens
  let idToken: string;
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${baseUrl}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      console.error('[google-oauth] token exchange failed', await tokenRes.text());
      return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', baseUrl));
    }

    const tokenData = (await tokenRes.json()) as { id_token?: string; error?: string };
    if (!tokenData.id_token) {
      console.error('[google-oauth] no id_token in response', tokenData);
      return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', baseUrl));
    }
    idToken = tokenData.id_token;
  } catch (err) {
    console.error('[google-oauth] token exchange error', err);
    return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', baseUrl));
  }

  // Decode id_token to get user info (token came directly from Google over HTTPS)
  let googleId: string;
  let email: string;
  try {
    const claims = decodeJwt(idToken);
    googleId = claims.sub as string;
    email = ((claims.email as string) ?? '').toLowerCase();
    if (!googleId || !email) throw new Error('missing sub or email');
  } catch (err) {
    console.error('[google-oauth] id_token decode error', err);
    return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', baseUrl));
  }

  // Upsert user: try to match by google_id first, then by email (link existing account)
  let user: UserRow | null = null;
  let isNew = false;

  try {
    // Check if user already exists with this google_id
    const existingByGoogle = await queryOne<{ id: string; email: string; mini_credits: number; ultra_credits: number; created_at: Date }>(
      'SELECT id, email, mini_credits, ultra_credits, created_at FROM users WHERE google_id = $1',
      [googleId]
    );

    if (existingByGoogle) {
      await query('UPDATE users SET last_login = NOW(), email_verified = TRUE WHERE id = $1', [existingByGoogle.id]);
      user = { ...existingByGoogle, is_new: false };
    } else {
      // Check if email already exists (existing email/password user)
      const existingByEmail = await queryOne<{ id: string; email: string; mini_credits: number; ultra_credits: number; created_at: Date }>(
        'SELECT id, email, mini_credits, ultra_credits, created_at FROM users WHERE LOWER(email) = $1',
        [email]
      );

      if (existingByEmail) {
        // Link Google account to existing user
        await query(
          'UPDATE users SET google_id = $1, oauth_provider = $2, email_verified = TRUE, last_login = NOW() WHERE id = $3',
          [googleId, 'google', existingByEmail.id]
        );
        user = { ...existingByEmail, is_new: false };
      } else {
        // Create new user
        const inserted = await queryOne<{ id: string; email: string; mini_credits: number; ultra_credits: number; created_at: Date }>(
          `INSERT INTO users (email, google_id, oauth_provider, mini_credits, ultra_credits, last_login, email_verified)
           VALUES ($1, $2, 'google', 1, 0, NOW(), TRUE)
           RETURNING id, email, mini_credits, ultra_credits, created_at`,
          [email, googleId]
        );

        if (!inserted) {
          return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', baseUrl));
        }

        // Log signup bonus credit
        await query(
          `INSERT INTO credits (user_id, credit_type, amount, transaction_type, description, balance_after)
           VALUES ($1, 'mini', 1, 'signup_bonus', 'Google OAuth kayıt bonusu: 1 mini kredi', 1)`,
          [inserted.id]
        );

        user = { ...inserted, is_new: true };
        isNew = true;
      }
    }
  } catch (err) {
    console.error('[google-oauth] db upsert error', err);
    return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', baseUrl));
  }

  const { token, expiresAt } = await signSession({ sub: user.id, email: user.email });

  // Redirect to client-side callback page that will store the session in localStorage
  const callbackParams = new URLSearchParams({
    token,
    email: user.email,
    expiresAt: String(expiresAt),
    createdAt: String(user.created_at.getTime()),
    creditsMini: String(user.mini_credits),
    creditsUltra: String(user.ultra_credits),
    oauthProvider: 'google',
    emailVerified: 'true',
    ...(isNew ? { isNew: '1' } : {}),
  });

  return NextResponse.redirect(new URL(`/auth/callback?${callbackParams.toString()}`, baseUrl));
}
