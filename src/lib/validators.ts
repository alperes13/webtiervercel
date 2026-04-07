import { OTP_CONFIG } from './constants';

export function isValidUrl(url: string): boolean {
  try {
    const urlStr = url.startsWith('http') ? url : `https://${url}`;
    new URL(urlStr);
    return true;
  } catch {
    return false;
  }
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '');
  return OTP_CONFIG.phoneFormat.test(cleaned);
}

export function isValidOTP(code: string): boolean {
  return /^\d{6}$/.test(code);
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
}

export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ** **`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function normalizeUrl(url: string): string {
  let normalized = url.trim();
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }
  return normalized;
}
