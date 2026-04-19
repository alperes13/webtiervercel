'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/lib/api';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('E-posta adresinizi girin'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Geçerli bir e-posta adresi girin'); return; }

    setLoading(true);
    setError('');
    try {
      await forgotPassword(email.trim().toLowerCase());
      setSent(true);
    } catch (e: any) {
      setError(e.message ?? 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
          {sent ? (
            /* Success state */
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-slate-900">E-posta Gönderildi</h1>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{email}</span> adresine şifre sıfırlama linki gönderdik.
                Gelen kutunuzu (ve spam klasörünüzü) kontrol edin.
              </p>
              <p className="text-xs text-slate-400">Link 1 saat içinde geçerliliğini yitirecektir.</p>
              <button
                onClick={() => router.push('/auth/login')}
                className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold transition-colors"
              >
                Giriş Sayfasına Dön
              </button>
            </div>
          ) : (
            /* Form state */
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
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">Şifremi Unuttum</h1>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  E-posta adresinizi girin, şifre sıfırlama linki gönderelim.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="ornek@email.com"
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 transition-all"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                    <p className="text-xs text-red-600 font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors"
                >
                  {loading ? 'Gönderiliyor...' : 'Sıfırlama Linki Gönder'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
