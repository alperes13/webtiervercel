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

export async function sendOTP(
  phone: string,
  purpose: 'register' | 'reset' | 'verify' = 'register'
): Promise<{ success: boolean; sessionId?: string; expiresIn?: number }> {
  return postJson(ENDPOINTS.sendOTP, { phone, purpose });
}

export async function registerUser(
  phone: string,
  password: string
): Promise<{ success: boolean; session: UserSession }> {
  return postJson(ENDPOINTS.register, { phone, password });
}

export async function loginUser(
  phone: string,
  password: string
): Promise<{ success: boolean; session: UserSession }> {
  return postJson(ENDPOINTS.login, { phone, password });
}

export async function resetPassword(
  phone: string,
  otpCode: string,
  password: string
): Promise<{ success: boolean }> {
  return postJson(ENDPOINTS.resetPassword, { phone, otp_code: otpCode, password });
}

export async function verifyOTP(phone: string, code: string): Promise<{ success: boolean; session: UserSession }> {
  return postJson(ENDPOINTS.verifyOTP, { phone, otp_code: code });
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
