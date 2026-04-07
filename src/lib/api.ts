import { ENDPOINTS } from './constants';

async function fetchGet<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function sendOTP(phone: string, siteUrl: string) {
  return fetchGet(`${ENDPOINTS.sendOTP}?phone=${encodeURIComponent(phone)}&site=${encodeURIComponent(siteUrl)}`);
}

export async function verifyOTP(phone: string, code: string) {
  return fetchGet(`${ENDPOINTS.verifyOTP}?phone=${encodeURIComponent(phone)}&code=${encodeURIComponent(code)}`);
}

export async function sendOTPEmail(email: string, siteUrl: string) {
  return fetchGet(`${ENDPOINTS.sendOTPEmail}?email=${encodeURIComponent(email)}&site=${encodeURIComponent(siteUrl)}`);
}

export async function verifyOTPEmail(email: string, code: string) {
  return fetchGet(`${ENDPOINTS.verifyOTPEmail}?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`);
}

export async function getProfile(token: string) {
  return fetchGet(`${ENDPOINTS.getProfile}?token=${encodeURIComponent(token)}`);
}

export async function getAnalysis(token: string) {
  return fetchGet(`${ENDPOINTS.getAnalysis}?token=${encodeURIComponent(token)}`);
}
