import tr from './tr';
import en from './en';
import de from './de';
import fr from './fr';
import es from './es';
import type { Translations } from './tr';

export type Language = 'tr' | 'en' | 'de' | 'fr' | 'es';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export const translations: Record<Language, Translations> = { tr, en, de, fr, es };

export type { Translations };
