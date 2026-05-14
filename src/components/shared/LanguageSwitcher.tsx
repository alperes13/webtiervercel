'use client';

import { useRef, useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'nav' | 'dashboard';
}

export default function LanguageSwitcher({ className, variant = 'nav' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, languages } = useLanguage();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLang = languages.find(l => l.code === language) ?? languages[0];

  const isDashboard = variant === 'dashboard';

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(v => !v)}
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-bold transition-all uppercase",
          isDashboard 
            ? "border-slate-200 bg-white text-slate-600 hover:bg-slate-50" 
            : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-light)] hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text)]"
        )}
        aria-label="Select Language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{currentLang.code}</span>
        <ChevronDown className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute right-0 top-full mt-2 w-32 rounded-xl border shadow-xl overflow-hidden z-[100]",
          isDashboard
            ? "border-slate-200 bg-white"
            : "border-[var(--color-border)] bg-[var(--color-surface)]"
        )}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
              className={cn(
                'flex w-full items-center gap-2.5 px-3 py-2 text-xs font-bold transition-colors uppercase',
                language === lang.code
                  ? 'text-cyan-500 bg-cyan-500/5'
                  : isDashboard ? 'text-slate-600 hover:bg-slate-50' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-light)]'
              )}
            >
              <span>{lang.flag}</span>
              <span>{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
