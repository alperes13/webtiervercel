'use client';

import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { OTP_CONFIG } from '@/lib/constants';
import {
  sendOTP as apiSendOTP,
  verifyOTP as apiVerifyOTP,
  sendOTPEmail as apiSendOTPEmail,
  verifyOTPEmail as apiVerifyOTPEmail,
} from '@/lib/api';
import type { OTPState } from '@/types';

const DEFAULT_OTP_STATE: OTPState = {
  attemptsLeft: OTP_CONFIG.maxAttempts,
  timeoutUntil: null,
  phone: '',
  contactType: 'phone',
};

export function useOTP() {
  const { value: otpState, setValue: setOtpState } = useLocalStorage<OTPState>(
    'webtier_otp_state',
    DEFAULT_OTP_STATE
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'idle' | 'phone' | 'otp' | 'success'>('idle');

  const isTimedOut = otpState.timeoutUntil !== null && Date.now() < otpState.timeoutUntil;

  const timeoutRemaining = isTimedOut
    ? Math.ceil(((otpState.timeoutUntil as number) - Date.now()) / 1000)
    : 0;

  const sendOTP = useCallback(
    async (contact: string, siteUrl: string, contactType: 'phone' | 'email' = 'phone') => {
      if (isTimedOut) {
        setError(`Çok fazla deneme yaptınız. ${Math.ceil(timeoutRemaining / 60)} dakika sonra tekrar deneyin.`);
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        if (contactType === 'phone') {
          await apiSendOTP(contact, siteUrl);
        } else {
          await apiSendOTPEmail(contact, siteUrl);
        }
        setOtpState((prev) => ({ ...prev, phone: contact, contactType }));
        setStep('otp');
        return true;
      } catch {
        setError('Doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isTimedOut, timeoutRemaining, setOtpState]
  );

  const verifyOTP = useCallback(
    async (code: string) => {
      setLoading(true);
      setError(null);

      try {
        let result;
        if (otpState.contactType === 'phone') {
          result = await apiVerifyOTP(otpState.phone, code);
        } else {
          result = await apiVerifyOTPEmail(otpState.phone, code);
        }
        setStep('success');
        setOtpState(DEFAULT_OTP_STATE);
        return result;
      } catch {
        const newAttempts = otpState.attemptsLeft - 1;

        if (newAttempts <= 0) {
          const timeoutUntil = Date.now() + OTP_CONFIG.timeoutDuration * 1000;
          setOtpState({
            ...otpState,
            attemptsLeft: 0,
            timeoutUntil,
          });
          setError('Deneme hakkınız doldu. 30 dakika sonra tekrar deneyin.');
        } else {
          setOtpState({
            ...otpState,
            attemptsLeft: newAttempts,
          });
          setError(`Yanlış kod. ${newAttempts} deneme hakkınız kaldı.`);
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [otpState, setOtpState]
  );

  const reset = useCallback(() => {
    setStep('idle');
    setError(null);
    setLoading(false);
  }, []);

  return {
    step,
    setStep,
    loading,
    error,
    isTimedOut,
    timeoutRemaining,
    attemptsLeft: otpState.attemptsLeft,
    sendOTP,
    verifyOTP,
    reset,
  };
}
