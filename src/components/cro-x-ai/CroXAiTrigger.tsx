'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import CroXAiOverlay from './CroXAiOverlay';
import type { CroXModel } from './types';

interface Props {
  defaultModel?: CroXModel;
  placeholder?: string;
  className?: string;
}

export default function CroXAiTrigger({
  defaultModel = 'mini',
  placeholder = 'Dijital adresini gir: Instagram, Web site veya Tiktok',
  className = '',
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={cn('relative w-full max-w-2xl mx-auto', className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="CRO-X AI sohbeti aç"
          className={cn(
            'group w-full text-left rounded-lg overflow-hidden',
            'bg-white/80 backdrop-blur-lg md:backdrop-blur-2xl',
            'border border-black/8 hover:border-black/20',
            'shadow-sm hover:shadow-md transition-all',
          )}
        >
          <div className="flex items-center justify-between px-4 py-4 gap-3">
            <span className="text-[12px] sm:text-[13px] text-black/55 truncate">
              {placeholder}
            </span>
            <span className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-md bg-[#0F172A] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] group-hover:bg-black transition">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
          <div className="h-12 bg-black/[0.02] flex items-center px-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
              {defaultModel === 'ultra' ? 'CRO-X ULTRA' : 'CRO-X MINI'}
            </span>
          </div>
        </button>
      </div>
      <CroXAiOverlay open={open} onClose={() => setOpen(false)} defaultModel={defaultModel} />
    </>
  );
}
