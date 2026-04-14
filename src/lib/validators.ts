export function isValidUrl(url: string): boolean {
  try {
    const urlStr = url.startsWith('http') ? url : `https://${url}`;
    new URL(urlStr);
    return true;
  } catch {
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function maskEmail(email: string): string {
  const atIdx = email.indexOf('@');
  if (atIdx <= 0) return email;
  const local = email.slice(0, atIdx);
  const domain = email.slice(atIdx);
  if (local.length <= 2) return `${local}${domain}`;
  return `${local[0]}${'*'.repeat(Math.min(local.length - 2, 4))}${local[local.length - 1]}${domain}`;
}

export function normalizeUrl(url: string): string {
  let normalized = url.trim();
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }
  return normalized;
}
