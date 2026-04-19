'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/api';
import { ArrowLeft, KeyRound, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) setError('Geçersiz veya eksik token. Lütfen tekrar şifre sıfırlama isteyin.');
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
      setTimeout(() => router.push('/auth/login?reset=success'), 2500);
    } catch (e: any) {
      setError(e.message ?? 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-slate-900">Şifre Güncellendi</h1>
              <p className="text-sm text-slate-500">
                Şifreniz başarıyla güncellendi. Giriş sayfasına yönlendiriliyorsunuz...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors mb-4"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Giriş sayfasına dön
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    <KeyRound className="w-5 h-5 text-red-500" />
                  </div>
                  <h1 className="text-xl font-bold text-slate-900">Yeni Şifre Belirle</h1>
                </div>
                <p className="text-sm text-slate-500">En az 6 karakterden oluşan yeni bir şifre girin.</p>
              </div>

              {!token ? (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-4 text-center space-y-3">
                  <AlertCircle className="w-6 h-6 text-red-500 mx-auto" />
                  <p className="text-sm text-red-700 font-medium">Bu link geçersiz veya süresi dolmuş.</p>
                  <button
                    onClick={() => router.push('/auth/forgot-password')}
                    className="text-xs text-red-600 underline hover:text-red-800"
                  >
                    Yeni sıfırlama linki iste
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Yeni Şifre
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                        placeholder="En az 6 karakter"
                        autoFocus
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-zinc-200 bg-zinc-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Şifre Tekrar
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                      placeholder="Şifreyi tekrar girin"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 transition-all"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !newPassword || !confirmPassword}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors"
                  >
                    {loading ? 'Güncelleniyor...' : 'Şifremi Güncelle'}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    Link çalışmıyor mu?{' '}
                    <button
                      type="button"
                      onClick={() => router.push('/auth/forgot-password')}
                      className="text-red-500 hover:text-red-700 underline"
                    >
                      Yeni link iste
                    </button>
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
