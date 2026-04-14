'use client';

import Link from 'next/link';
import { useState } from 'react';
import LoginModal from '@/components/ui/LoginModal';
import OTPInput from '@/components/ui/OTPInput';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { sendOTP, verifyOTP } from '@/lib/api';

export default function DashboardPage() {
  const { session, isAuthenticated, isHydrated, login } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSendVerificationOTP = async () => {
    if (!session) return;
    setError('');
    setStatus('');
    setLoading(true);
    try {
      await sendOTP(session.phoneRaw, 'verify');
      setOtpSent(true);
      setStatus('Doğrulama kodu gönderildi.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Doğrulama kodu gönderilemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!session) return;
    setError('');
    setStatus('');
    setLoading(true);
    try {
      const res = await verifyOTP(session.phoneRaw, code);
      login(res.session);
      setStatus('Telefon numaranız doğrulandı. Artık analiz başlatabilirsiniz.');
      setOtpSent(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Doğrulama başarısız');
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--color-text-secondary)]">Yükleniyor...</p>
      </main>
    );
  }

  if (!isAuthenticated || !session) {
    return (
      <>
        <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">Müşteri Dashboard</h1>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              Dashboarda erişmek için giriş yapmanız gerekiyor.
            </p>
            <div className="mt-6">
              <Button onClick={() => setLoginOpen(true)}>Giriş Yap</Button>
            </div>
          </div>
        </main>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} initialMode="login" />
      </>
    );
  }

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">Müşteri Dashboard</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Hesabınız: {session.phone}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Telefon doğrulama durumu:{' '}
            <span className={session.phoneVerified ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}>
              {session.phoneVerified ? 'Doğrulandı' : 'Doğrulanmadı'}
            </span>
          </p>
        </div>

        {!session.phoneVerified && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Telefon Doğrulama</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Analiz başlatmadan önce telefon numaranızı OTP ile doğrulamanız gerekiyor.
            </p>

            {!otpSent && (
              <div className="mt-5">
                <Button onClick={handleSendVerificationOTP} disabled={loading}>
                  {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
                </Button>
              </div>
            )}

            {otpSent && (
              <div className="mt-5 space-y-4">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Telefonunuza gelen 6 haneli kodu girin.
                </p>
                <OTPInput onComplete={handleVerify} disabled={loading} error={!!error} />
                <Button variant="outline" onClick={handleSendVerificationOTP} disabled={loading}>
                  {loading ? 'Gönderiliyor...' : 'Kodu Tekrar Gönder'}
                </Button>
              </div>
            )}

            {status && <p className="mt-4 text-sm text-[var(--color-success)]">{status}</p>}
            {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}
          </div>
        )}

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Analiz Başlat</h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Doğrulama tamamlandıktan sonra ana sayfadan Mini veya Ultra analiz başlatabilirsiniz.
          </p>
          <div className="mt-5">
            <Button asChild>
              <Link href="/#hero">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
