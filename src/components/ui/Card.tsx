import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6',
        hover &&
          'transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/5',
        className
      )}
    >
      {children}
    </div>
  );
}
