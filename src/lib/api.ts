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

export async function getAnalyses(token: string): Promise<{ success: boolean; analyses: import('@/types').AnalysisRecord[] }> {
  return getJson(ENDPOINTS.analysisList, token);
}

export async function sendVerificationEmail(token: string): Promise<{ success: boolean; message?: string; error?: string }> {
  return postJson(ENDPOINTS.verifyEmailSend, {}, token);
}

export async function verifyEmailOTP(token: string, code: string): Promise<{ success: boolean; message?: string; error?: string }> {
  return postJson(ENDPOINTS.verifyEmailVerify, { code }, token);
}

export async function forgotPassword(email: string): Promise<{ success: boolean }> {
  return postJson(ENDPOINTS.forgotPassword, { email });
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
  return postJson(ENDPOINTS.resetPassword, { token, newPassword });
}

export async function updateProfile(token: string, firstName: string, lastName: string): Promise<{ success: boolean }> {
  const res = await fetch('/api/auth/profile', {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ firstName, lastName }),
  });
  return res.json();
}

export async function getNotifications(token: string): Promise<{
  success: boolean;
  notifications: Array<{
    id: string;
    type: string;
    title: string;
    body: string;
    is_read: boolean;
    metadata: Record<string, unknown>;
    created_at: string;
  }>;
  unreadCount: number;
}> {
  return getJson(ENDPOINTS.notifications, token);
}

export async function markNotificationsRead(
  token: string,
  id?: string,
  all?: boolean
): Promise<{ success: boolean }> {
  const res = await fetch(ENDPOINTS.notifications, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(all ? { all: true } : { id }),
  });
  return res.json();
}
