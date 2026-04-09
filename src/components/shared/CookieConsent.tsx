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
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-[var(--color-border-light)] bg-[var(--color-surface)]/96 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[var(--color-text)]">
            {t.cookieConsent.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {t.cookieConsent.description}{' '}
            <Link
              href="/gizlilik-politikasi"
              className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
            >
              {t.cookieConsent.link}
            </Link>{' '}
            {t.cookieConsent.suffix}
          </p>
        </div>

        <Button
          size="sm"
          className="min-h-11 shrink-0 rounded-xl px-5"
          onClick={() => setConsent('accepted')}
        >
          {t.cookieConsent.button}
        </Button>
      </div>
    </div>
  );
}
