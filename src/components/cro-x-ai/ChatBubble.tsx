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
      className="flex justify-center w-full"
    >
      <div
        className={cn(
          'inline-block rounded-full px-4 py-2.5 sm:px-5 sm:py-3 text-[12px] sm:text-[13px] leading-snug max-w-[92%] text-center',
          msg.kind === 'success'
            ? 'bg-zinc-900/95 text-white/90 border border-emerald-700/40'
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
                className="underline underline-offset-2 font-bold text-cyan-400 hover:text-cyan-300 transition"
              >
                Giriş Yap →
              </Link>
            </>
          )}
        </span>
      </div>
    </motion.div>
  );
}
