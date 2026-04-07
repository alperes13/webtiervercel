'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, error, disabled }, ref) => {
    const [focused, setFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
      onChange(raw);
    };

    const formatDisplay = (raw: string): string => {
      if (raw.length <= 3) return raw;
      if (raw.length <= 6) return `${raw.slice(0, 3)} ${raw.slice(3)}`;
      if (raw.length <= 8) return `${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6)}`;
      return `${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6, 8)} ${raw.slice(8)}`;
    };

    return (
      <div className="w-full">
        <div
          className={cn(
            'flex items-center rounded-xl border bg-[var(--color-surface-card)] transition-all duration-200',
            focused && 'ring-2 ring-[var(--color-accent)]/50 border-[var(--color-accent)]',
            error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
          )}
        >
          <span className="pl-4 pr-2 text-sm font-medium text-[var(--color-text-muted)]">
            +90
          </span>
          <div className="h-6 w-px bg-[var(--color-border)]" />
          <input
            ref={ref}
            type="tel"
            inputMode="numeric"
            value={formatDisplay(value)}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="5XX XXX XX XX"
            disabled={disabled}
            className="w-full bg-transparent px-3 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            autoComplete="tel-national"
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
