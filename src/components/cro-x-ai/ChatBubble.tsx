'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ChatMessage } from './types';

interface Props {
  msg: ChatMessage;
  loginHref?: string;
}

export default function ChatBubble({ msg, loginHref }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ type: 'spring', damping: 22, stiffness: 220 }}
      className={cn(
        'flex w-full',
        msg.kind === 'address' ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={cn(
          'inline-block rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 text-[12px] sm:text-[13px] leading-snug',
          msg.kind === 'address' ? 'max-w-[85%]' : 'max-w-[92%]',
          msg.kind === 'success'
            ? 'bg-zinc-900/95 text-white/90 border border-emerald-700/40'
            : msg.kind === 'address'
              ? 'bg-blue-900/40 text-white/90 border border-blue-500/30'
              : 'bg-zinc-900/95 text-white/90 border border-white/8',
        )}
      >
        <span>
          {msg.text}
          {msg.inlineLoginLink && loginHref && (
            <>
              {' '}
              <Link
                href={loginHref}
                className="underline underline-offset-2 font-bold text-[#1e3a5f] hover:text-[#2a4f7f] transition"
              >
                Giriş Yap
              </Link>
            </>
          )}
        </span>
      </div>
    </motion.div>
  );
}
