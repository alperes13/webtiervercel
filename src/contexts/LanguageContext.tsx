'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { translations, LANGUAGES, type Language, type Translations } from '@/lib/i18n';

interface LanguageContextValue {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'webtier_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('tr');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const value: LanguageContextValue = {
    language,
    t: translations[language],
    setLanguage,
    languages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
