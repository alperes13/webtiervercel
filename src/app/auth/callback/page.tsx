'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { UserSession } from '@/types';

function AuthCallbackInner() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get('token');
    const email = params.get('email');
    const expiresAt = Number(params.get('expiresAt'));
    const createdAt = Number(params.get('createdAt') ?? Date.now());
    const creditsMini = Number(params.get('creditsMini') ?? 0);
    const creditsUltra = Number(params.get('creditsUltra') ?? 0);
    const oauthProvider = params.get('oauthProvider') ?? undefined;

    if (!token || !email || !expiresAt) {
      router.replace('/auth/login?error=oauth_failed');
      return;
    }

    const session: UserSession = {
      token,
      email,
      createdAt,
      expiresAt,
      analysisStatus: 'none',
      creditsMini,
      creditsUltra,
      emailVerified: true,
      ...(oauthProvider ? { oauthProvider } : {}),
    };

    login(session);
    // Use replace so the token URL is not kept in browser history
    router.replace('/dashboard');
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
        <p className="text-sm text-[var(--color-text-muted)]">Giriş yapılıyor...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
