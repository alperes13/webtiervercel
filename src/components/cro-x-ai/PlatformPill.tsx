'use client';

import { cn } from '@/lib/utils';
import type { PlatformDef } from './platforms';

interface Props {
  platform: PlatformDef;
  isActive: boolean;
  hasValue: boolean;
  onClick: () => void;
}

export default function PlatformPill({ platform, isActive, hasValue, onClick }: Props) {
  const filled = isActive || hasValue;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase',
        'transition-all duration-200 whitespace-nowrap',
        filled
          ? 'bg-blue-600 text-white border border-blue-500 shadow-[0_0_18px_rgba(37,99,235,0.45)]'
          : 'bg-transparent text-white/85 border border-rose-900/70 hover:border-rose-500/80 hover:text-white',
      )}
    >
      {platform.label}
    </button>
  );
}
