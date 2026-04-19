'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, CheckCircle, RefreshCw, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sendVerificationEmail, verifyEmailOTP } from '@/lib/api';

interface EmailVerificationModalProps {
  open: boolean;
  email: string;
  token: string;
  onVerified: () => void;
  onClose: () => void;
}

export default function EmailVerificationModal({
  open,
  email,
  token,
  onVerified,
  onClose,
}: EmailVerificationModalProps) {
  const { t } = useLanguage();
  const tv = t.emailVerification;

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [autoSent, setAutoSent] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-send on first open
  useEffect(() => {
    if (open && !autoSent) {
      setAutoSent(true);
      handleSend();
    }
    if (!open) {
      setDigits(['', '', '', '', '', '']);
      setError('');
      setSuccess(false);
      setAutoSent(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Focus first input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRefs.current[0]?.focus(), 300);
    }
  }, [open]);

  const handleSend = async () => {
    setSending(true);
    setError('');
    try {
      await sendVerificationEmail(token);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  const handleInput = (idx: number, val: string) => {
    const char = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    setError('');

    if (char && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }

    // Auto-submit when all filled
    if (char && idx === 5) {
      const code = next.join('');
      if (code.length === 6) handleVerify(code);
    }
    if (!char && idx === 5) {
      const code = next.join('');
      if (code.length === 6) handleVerify(code);
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === 'Enter') {
      const code = digits.join('');
      if (code.length === 6) handleVerify(code);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array.from({ length: 6 }, (_, i) => pasted[i] ?? '');
    setDigits(next);
    setError('');
    if (pasted.length === 6) {
      inputRefs.current[5]?.focus();
      handleVerify(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    if (verifying || code.length !== 6) return;
    setVerifying(true);
    setError('');
    try {
      await verifyEmailOTP(token, code);
      setSuccess(true);
      setTimeout(() => {
        onVerified();
        onClose();
      }, 1500);
    } catch (e: any) {
      setError(e.message ?? tv.errorInvalidCode);
      setDigits(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } finally {
      setVerifying(false);
    }
  };

  const code = digits.join('');
  const isFilled = code.length === 6;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-sm pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                style={{
                  background: 'linear-gradient(145deg, #0f172a 0%, #1a0a1e 50%, #0f172a 100%)',
                }}
              >
                {/* Glow top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-600/20 blur-[60px] rounded-full pointer-events-none" />
                {/* Glow bottom */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-500/10 blur-[40px] rounded-full pointer-events-none" />

                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative z-10 px-8 pt-10 pb-8 flex flex-col items-center text-center">

                  {/* Icon */}
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div
                        key="success-icon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="mb-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/30"
                      >
                        <CheckCircle className="w-7 h-7 text-green-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-icon"
                        className="mb-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30"
                      >
                        <Zap className="w-7 h-7 text-red-400" fill="currentColor" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Title */}
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.p
                        key="success-title"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-bold text-green-400 mb-2"
                      >
                        {tv.successMessage}
                      </motion.p>
                    ) : (
                      <motion.div key="default-title">
                        <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                          {tv.title}
                        </h2>
                        <p className="text-sm text-white/50 mb-1">{tv.subtitle}</p>
                        <p className="text-sm font-semibold text-white/80 mb-6">{email}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* OTP Inputs */}
                  {!success && (
                    <>
                      <div className="flex gap-3 mb-4" onPaste={handlePaste}>
                        {digits.map((d, i) => (
                          <input
                            key={i}
                            ref={(el) => { inputRefs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={d}
                            onChange={(e) => handleInput(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            disabled={verifying}
                            className={[
                              'w-11 h-13 text-center text-xl font-bold rounded-xl outline-none transition-all duration-150',
                              'bg-white/5 border text-white caret-red-400',
                              error
                                ? 'border-red-500/70 bg-red-500/10'
                                : d
                                ? 'border-red-500/60 bg-red-500/10 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                                : 'border-white/10 focus:border-red-500/50 focus:bg-white/8',
                              verifying && 'opacity-50 cursor-not-allowed',
                            ].join(' ')}
                          />
                        ))}
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-red-400 font-medium mb-3"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Verify Button */}
                      <button
                        onClick={() => handleVerify(code)}
                        disabled={!isFilled || verifying}
                        className={[
                          'w-full py-3 rounded-xl font-bold text-sm transition-all duration-200',
                          isFilled && !verifying
                            ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25 hover:shadow-red-500/40 hover:-translate-y-0.5'
                            : 'bg-white/5 text-white/30 cursor-not-allowed',
                        ].join(' ')}
                      >
                        {verifying ? (
                          <span className="flex items-center justify-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            {tv.verifying}
                          </span>
                        ) : tv.verifyButton}
                      </button>

                      {/* Resend */}
                      <div className="mt-4 flex items-center gap-1.5 text-xs text-white/40">
                        <span>{tv.didntGetCode}</span>
                        <button
                          onClick={handleSend}
                          disabled={sending}
                          className="text-white/60 hover:text-red-400 transition-colors font-semibold disabled:opacity-50"
                        >
                          {sending ? (
                            <span className="flex items-center gap-1">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              {tv.resending}
                            </span>
                          ) : tv.resend}
                        </button>
                      </div>
                    </>
                  )}

                  {/* Terms */}
                  {!success && (
                    <p className="mt-5 text-[10px] text-white/25 leading-relaxed">
                      {tv.terms}{' '}
                      <a href="/satis-sozlesmesi" className="underline hover:text-white/50 transition-colors">{tv.termsLink}</a>
                      {' '}{tv.and}{' '}
                      <a href="/gizlilik-politikasi" className="underline hover:text-white/50 transition-colors">{tv.privacyLink}</a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
