'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn('relative z-10 space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              'overflow-hidden rounded-xl border transition-all duration-300',
              isOpen
                ? 'border-[var(--color-accent)] bg-[var(--color-surface-card)]'
                : 'border-[var(--color-border)] bg-transparent'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="relative z-20 flex w-full items-center justify-between px-6 py-5 text-left outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className={cn(
                "text-base font-semibold transition-colors duration-300 pr-8",
                isOpen ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"
              )}>
                {item.question}
              </span>
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                isOpen 
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 rotate-180" 
                  : "border-[var(--color-border)] bg-[var(--color-surface-light)]"
              )}>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-colors duration-300',
                    isOpen ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'
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
              <div className="overflow-hidden px-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
