import tr from './tr';
import en from './en';
import type { Translations } from './tr';

export type Language = 'tr' | 'en';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export const translations: Record<Language, Translations> = { tr, en };

export type { Translations };
