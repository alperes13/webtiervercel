import type { PlatformKey } from './types';

const nonEmpty = (v: string) => v.trim().length > 0;

export interface PlatformDef {
  key: PlatformKey;
  label: string;
  inputLabel: string;
  bubblePrefix: string;
  validate: (v: string) => boolean;
}

export const PLATFORMS: PlatformDef[] = [
  {
    key: 'website',
    label: 'WEB SİTE',
    inputLabel: 'Web site:',
    bubblePrefix: 'Analiz edilecek web site adresi:',
    validate: nonEmpty,
  },
  {
    key: 'instagram',
    label: 'INSTAGRAM',
    inputLabel: 'Instagram :',
    bubblePrefix: 'Analiz edilecek Instagram profili',
    validate: nonEmpty,
  },
  {
    key: 'google_business',
    label: 'GOOGLE İŞLETMESİ',
    inputLabel: 'Google İşletme:',
    bubblePrefix: 'Analiz edilecek Google İşletme linki :',
    validate: nonEmpty,
  },
  {
    key: 'linkedin',
    label: 'LINKEDIN',
    inputLabel: 'LinkedIn:',
    bubblePrefix: 'Analiz edilecek LinkedIn profili veya şirket adresi :',
    validate: nonEmpty,
  },
  {
    key: 'facebook',
    label: 'FACEBOOK',
    inputLabel: 'Facebook:',
    bubblePrefix: 'Analiz edilecek Facebook adresi:',
    validate: nonEmpty,
  },
  {
    key: 'tiktok',
    label: 'TIKTOK',
    inputLabel: 'TikTok:',
    bubblePrefix: 'Analiz edilecek TikTok profili:',
    validate: nonEmpty,
  },
];

export function getPlatform(key: PlatformKey): PlatformDef {
  const found = PLATFORMS.find((p) => p.key === key);
  if (!found) throw new Error(`Unknown platform: ${key}`);
  return found;
}

export function formatBubble(key: PlatformKey, value: string): string {
  const p = getPlatform(key);
  return `${p.bubblePrefix} "${value}"`;
}
