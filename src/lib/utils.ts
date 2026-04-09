import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const msg = message || 'Merhaba, web siteniz hakkında bilgi almak istiyorum.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
