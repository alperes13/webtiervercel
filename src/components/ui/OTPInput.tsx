'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { OTP_CONFIG } from '@/lib/constants';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export default function OTPInput({
  length = OTP_CONFIG.otpLength,
  onComplete,
  disabled,
  error,
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    if (value && index < length - 1) {
      focusInput(index + 1);
    }

    const code = newValues.join('');
    if (code.length === length && newValues.every((v) => v !== '')) {
      onComplete(code);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!paste) return;

    const newValues = [...values];
    paste.split('').forEach((char, i) => {
      newValues[i] = char;
    });
    setValues(newValues);

    const nextIndex = Math.min(paste.length, length - 1);
    focusInput(nextIndex);

    if (paste.length === length) {
      onComplete(paste);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          className={cn(
            'h-13 w-11 rounded-xl border bg-[var(--color-surface-card)] text-center text-lg font-semibold text-[var(--color-text)] transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)]',
            error
              ? 'border-[var(--color-error)] shake'
              : 'border-[var(--color-border)]',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
