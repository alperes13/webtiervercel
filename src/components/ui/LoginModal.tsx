'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import PhoneInput from '@/components/ui/PhoneInput';
import OTPInput from '@/components/ui/OTPInput';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { isValidPhone } from '@/lib/validators';
import { loginUser, registerUser, resetPassword, sendOTP } from '@/lib/api';
import { MIN_PASSWORD_LENGTH } from '@/lib/password';

type Mode = 'login' | 'register' | 'reset';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: Mode;
}

export default function LoginModal({ open, onClose, initialMode = 'login' }: LoginModalProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) {
      setMode(initialMode);
      setPhone('');
      setPassword('');
      setOtpCode('');
      setOtpSent(false);
      setError('');
      setLoading(false);
    }
  }, [open, initialMode]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setOtpSent(false);
    setOtpCode('');
    setPassword('');
    setError('');
  };

  // ---------- LOGIN ----------
  const handleLogin = async () => {
    if (!isValidPhone(phone)) return setError(t.hero.errors.invalidPhone);
    if (password.length < MIN_PASSWORD_LENGTH) return setError(`Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalı`);
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(phone, password);
      login(res.session);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  // ---------- REGISTER ----------
  const handleSendRegisterOTP = async () => {
    if (!isValidPhone(phone)) return setError(t.hero.errors.invalidPhone);
    if (password.length < MIN_PASSWORD_LENGTH) return setError(`Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalı`);
    setError('');
    setLoading(true);
    try {
      await sendOTP(phone, 'register');
      setOtpSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Kod gönderilemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyRegister = async (code: string) => {
    setOtpCode(code);
    setError('');
    setLoading(true);
    try {
      const res = await registerUser(phone, password, code);
      login(res.session);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  // ---------- RESET ----------
  const handleSendResetOTP = async () => {
    if (!isValidPhone(phone)) return setError(t.hero.errors.invalidPhone);
    setError('');
    setLoading(true);
    try {
      await sendOTP(phone, 'reset');
      setOtpSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Kod gönderilemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async () => {
    if (!otpCode || !/^[0-9]{6}$/.test(otpCode)) return setError('6 haneli kodu girin');
    if (password.length < MIN_PASSWORD_LENGTH) return setError(`Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalı`);
    setError('');
    setLoading(true);
    try {
      await resetPassword(phone, otpCode, password);
      setMode('login');
      setOtpSent(false);
      setOtpCode('');
      setPassword('');
      setError('Şifreniz güncellendi. Giriş yapabilirsiniz.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sıfırlama başarısız');
    } finally {
      setLoading(false);
    }
  };

  // ---------- RENDER ----------
  const titles: Record<Mode, string> = {
    login: 'Giriş Yap',
    register: otpSent ? 'Doğrulama Kodu' : 'Hesap Oluştur',
    reset: otpSent ? 'Yeni Şifre Belirle' : 'Şifremi Unuttum',
  };

  return (
    <Modal open={open} onClose={onClose} title={titles[mode]}>
      {mode === 'login' && (
        <div className="space-y-4">
          <PhoneInput value={phone} onChange={setPhone} disabled={loading} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            disabled={loading}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
          />
          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
          <Button size="lg" className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
          <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
            <button onClick={() => switchMode('register')} className="hover:text-[var(--color-text)]">
              Hesap oluştur
            </button>
            <button onClick={() => switchMode('reset')} className="hover:text-[var(--color-text)]">
              Şifremi unuttum
            </button>
          </div>
        </div>
      )}

      {mode === 'register' && !otpSent && (
        <div className="space-y-4">
          <PhoneInput value={phone} onChange={setPhone} disabled={loading} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={`Şifre (en az ${MIN_PASSWORD_LENGTH} karakter)`}
            disabled={loading}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
          />
          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
          <Button size="lg" className="w-full" onClick={handleSendRegisterOTP} disabled={loading}>
            {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
          </Button>
          <p className="text-xs text-center text-[var(--color-text-muted)]">
            Zaten hesabın var mı?{' '}
            <button onClick={() => switchMode('login')} className="underline hover:text-[var(--color-text)]">
              Giriş yap
            </button>
          </p>
        </div>
      )}

      {mode === 'register' && otpSent && (
        <div className="space-y-4">
          <p className="text-center text-sm text-[var(--color-text-secondary)]">
            +90 {phone} numarasına gönderilen 6 haneli kodu girin
          </p>
          <OTPInput onComplete={handleVerifyRegister} disabled={loading} error={!!error} />
          {error && <p className="text-center text-sm text-[var(--color-error)]">{error}</p>}
          {loading && <p className="text-center text-sm text-[var(--color-text-muted)]">Doğrulanıyor...</p>}
        </div>
      )}

      {mode === 'reset' && !otpSent && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Kayıtlı telefon numaranıza doğrulama kodu göndereceğiz.
          </p>
          <PhoneInput value={phone} onChange={setPhone} disabled={loading} />
          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
          <Button size="lg" className="w-full" onClick={handleSendResetOTP} disabled={loading}>
            {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
          </Button>
          <p className="text-xs text-center text-[var(--color-text-muted)]">
            <button onClick={() => switchMode('login')} className="underline hover:text-[var(--color-text)]">
              Girişe dön
            </button>
          </p>
        </div>
      )}

      {mode === 'reset' && otpSent && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">+90 {phone} numarasına kod gönderildi</p>
          <OTPInput onComplete={setOtpCode} disabled={loading} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Yeni şifre"
            disabled={loading}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
          />
          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
          <Button size="lg" className="w-full" onClick={handleConfirmReset} disabled={loading}>
            {loading ? 'Kaydediliyor...' : 'Şifremi Güncelle'}
          </Button>
        </div>
      )}
    </Modal>
  );
}
