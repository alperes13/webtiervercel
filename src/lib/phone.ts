export function normalizePhone(raw: string): { phone: string; phoneRaw: string } | null {
  const digits = raw.replace(/\D/g, '');
  let tenDigit: string | null = null;

  if (digits.length === 10 && digits.startsWith('5')) {
    tenDigit = digits;
  } else if (digits.length === 11 && digits.startsWith('05')) {
    tenDigit = digits.slice(1);
  } else if (digits.length === 12 && digits.startsWith('90')) {
    tenDigit = digits.slice(2);
  } else if (digits.length === 13 && digits.startsWith('905')) {
    tenDigit = digits.slice(2);
  }

  if (!tenDigit || !/^5\d{9}$/.test(tenDigit)) return null;
  return { phone: `+90${tenDigit}`, phoneRaw: tenDigit };
}
