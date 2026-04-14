'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { session, isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return (
      <div className="light-page min-h-screen">
        <main className="mx-auto max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--color-text-secondary)]">Yükleniyor...</p>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    return (
      <div className="light-page min-h-screen">
        <main className="mx-auto max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--color-text-secondary)]">Yönlendiriliyor...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="light-page min-h-screen">
      <main className="mx-auto max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">Müşteri Dashboard</h1>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Hesabınız: {session.email}
            </p>
            {session.oauthProvider === 'google' && (
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">Google hesabı ile giriş yapıldı</p>
            )}
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Krediler</h2>
            <div className="mt-4 flex gap-6">
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Mini Kredi</p>
                <p className="text-2xl font-bold text-[var(--color-text)]">{session.creditsMini}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Ultra Kredi</p>
                <p className="text-2xl font-bold text-[var(--color-text)]">{session.creditsUltra}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Analiz Başlat</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Mini veya Ultra analiz başlatmak için ana sayfaya gidin.
            </p>
            <div className="mt-5">
              <Button asChild>
                <Link href="/#hero">Ana Sayfaya Dön</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
