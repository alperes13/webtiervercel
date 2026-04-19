import { ENDPOINTS } from './constants';
import type { UserSession } from '@/types';

async function postJson<T>(url: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string } & Record<string, unknown>;
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data as T;
}

async function getJson<T>(url: string, token?: string): Promise<T> {
  const res = await fetch(url, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string } & Record<string, unknown>;
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data as T;
}

export async function registerUser(
  email: string,
  password: string
): Promise<{ success: boolean; session: UserSession }> {
  return postJson(ENDPOINTS.register, { email, password });
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; session: UserSession }> {
  return postJson(ENDPOINTS.login, { email, password });
}

export function redirectToGoogleOAuth(): void {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
    return;
  }
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${window.location.origin}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function getCreditsBalance(token: string): Promise<{ success: boolean; credits: { mini: number; ultra: number; total: number } }> {
  return getJson(ENDPOINTS.creditsBalance, token);
}

export async function createMiniAnalysis(
  token: string,
  payload: { website_url: string; instagram_url?: string }
) {
  return postJson(ENDPOINTS.analysisMini, payload, token);
}

export async function createUltraAnalysis(
  token: string,
  payload: {
    website_url: string;
    instagram_url?: string;
    linkedin_url?: string;
    tiktok_url?: string;
    additional_notes?: string;
  }
) {
  return postJson(ENDPOINTS.analysisUltra, payload, token);
}

export async function createPayment(
  token: string,
  creditAmount: number
): Promise<{ success: boolean; payment: { id: string; merchant_oid: string; token: string; amount: number; credit_amount: number }; iframe_url: string }> {
  return postJson(ENDPOINTS.paymentCreate, { credit_amount: creditAmount }, token);
}

export async function getAnalyses(token: string): Promise<{ success: boolean; analyses: any[] }> {
  return getJson(ENDPOINTS.analysisList, token);
}

export async function sendVerificationEmail(token: string): Promise<{ success: boolean; message?: string; error?: string }> {
  return postJson(ENDPOINTS.verifyEmailSend, {}, token);
}

export async function verifyEmailOTP(token: string, code: string): Promise<{ success: boolean; message?: string; error?: string }> {
  return postJson(ENDPOINTS.verifyEmailVerify, { code }, token);
}
