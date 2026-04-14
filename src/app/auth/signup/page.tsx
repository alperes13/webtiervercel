'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { registerUser, redirectToGoogleOAuth } from '@/lib/api';
import { isValidEmail } from '@/lib/validators';
import { MIN_PASSWORD_LENGTH } from '@/lib/password';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return setError('Geçerli bir e-posta adresi girin');
    if (password.length < MIN_PASSWORD_LENGTH) return setError(`Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalı`);
    setError('');
    setLoading(true);
    try {
      const res = await registerUser(email, password);
      login(res.session);
      router.push('/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 shadow-xl">
          {/* Logo */}
          <div className="flex flex-col items-center gap-y-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-black.png"
                alt="Webtier"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">Hesap Oluştur</h1>
            <p className="text-center text-sm text-[var(--color-text-muted)]">
              Kayıt olun ve 1 ücretsiz mini kredi kazanın
            </p>
          </div>

          <form onSubmit={handleSignup} className="flex w-full flex-col gap-4">
            <Input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              required
            />
            <Input
              type="password"
              placeholder={`Şifre (en az ${MIN_PASSWORD_LENGTH} karakter)`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              required
            />

            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
            )}

            <Button type="submit" className="mt-1 w-full" disabled={loading}>
              {loading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
            </Button>

            <div className="relative flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-muted)]">veya</span>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-light)]"
              onClick={redirectToGoogleOAuth}
              disabled={loading}
            >
              <FcGoogle className="mr-2 size-5" />
              Google ile Kayıt Ol
            </Button>
          </form>

          <p className="text-sm text-[var(--color-text-muted)]">
            Zaten hesabın var mı?{' '}
            <Link href="/auth/login" className="font-medium text-[var(--color-accent)] hover:underline">
              Giriş yap
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
