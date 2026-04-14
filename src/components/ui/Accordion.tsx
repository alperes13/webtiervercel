'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Accordion({ items, className, variant = 'light' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dark = variant === 'dark';

  return (
    <div className={cn('relative z-10 space-y-1.5 sm:space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              'overflow-hidden rounded-xl border transition-all duration-300',
              isOpen
                ? dark
                  ? 'border-cyan-400/40 bg-white/5'
                  : 'border-[var(--color-accent)] bg-[var(--color-surface-card)]'
                : dark
                  ? 'border-white/10 bg-transparent'
                  : 'border-[var(--color-border)] bg-transparent'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="relative z-20 flex w-full items-center justify-between p-[7px] sm:px-6 sm:py-5 text-left outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className={cn(
                "text-[13.5px] sm:text-base leading-[unset] sm:leading-normal font-semibold transition-colors duration-300 pl-[7px] pr-8",
                isOpen
                  ? dark ? "text-cyan-400" : "text-[var(--color-accent)]"
                  : dark ? "text-white" : "text-[var(--color-text)]"
              )}>
                {item.question}
              </span>
              <div className={cn(
                "flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                isOpen
                  ? dark
                    ? "border-cyan-400/40 bg-cyan-400/10 rotate-180"
                    : "border-[var(--color-accent)] bg-[var(--color-accent)]/10 rotate-180"
                  : dark
                    ? "border-white/10 bg-white/5"
                    : "border-[var(--color-border)] bg-[var(--color-surface-light)]"
              )}>
                <ChevronDown
                  className={cn(
                    'h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-300',
                    isOpen
                      ? dark ? 'text-cyan-400' : 'text-[var(--color-accent)]'
                      : dark ? 'text-white/40' : 'text-[var(--color-text-muted)]'
                  )}
                />
              </div>
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-in-out',
                isOpen ? 'grid-rows-[1fr] opacity-100 py-5' : 'grid-rows-[0fr] opacity-0 py-0'
              )}
            >
              <div className={cn(
                "overflow-hidden px-6 text-sm leading-relaxed",
                dark ? "text-white/70" : "text-[var(--color-text-secondary)]"
              )}>
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
