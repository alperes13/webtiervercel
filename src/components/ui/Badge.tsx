import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  [key: string]: unknown;
}

const variantStyles: Record<string, string> = {
  default: 'bg-[var(--color-surface-light)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
  accent: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20',
  success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
  warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  secondary: 'bg-white/10 text-white/70 border-white/20',
  destructive: 'bg-red-500/10 text-red-400 border-red-500/20',
  outline: 'text-foreground border-white/20 bg-transparent',
};

export function Badge({ children, variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        variantStyles[variant] ?? variantStyles.default,
        className
      )}
      {...(props as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {children}
    </span>
  );
}

export default Badge;
