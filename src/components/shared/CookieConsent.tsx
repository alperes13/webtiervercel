'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/Button';

import { useLanguage } from '@/contexts/LanguageContext';

export default function CookieConsent() {
  const { t } = useLanguage();
  const {
    value: consent,
    setValue: setConsent,
    isHydrated,
  } = useLocalStorage<'accepted' | null>('webtier_cookie_consent', null);

  if (!isHydrated || consent === 'accepted') {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/5 bg-[#020617]/95 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-white">
            {t.cookieConsent.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            {t.cookieConsent.description}{' '}
            <Link
              href="/gizlilik-politikasi"
              className="text-blue-400 transition-colors hover:text-blue-300 font-medium"
            >
              {t.cookieConsent.link}
            </Link>{' '}
            {t.cookieConsent.suffix}
          </p>
        </div>

        <Button
          size="sm"
          className="min-h-11 shrink-0 rounded-lg px-6 bg-blue-700 hover:bg-blue-800 text-white border-none transition-all active:scale-95"
          onClick={() => setConsent('accepted')}
        >
          {t.cookieConsent.button}
        </Button>
      </div>
    </div>
  );
}
