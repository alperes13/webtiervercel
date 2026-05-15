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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex justify-center w-full"
    >
      <div className="flex items-center gap-2 max-w-[90%]">
        <div
          className={cn(
            'inline-block rounded-full px-5 py-3 text-[12px] sm:text-[13px] leading-snug',
            msg.kind === 'success'
              ? 'bg-zinc-900/90 text-white/90 border border-emerald-700/40'
              : 'bg-zinc-900/90 text-white/90 border border-white/8',
          )}
        >
          {msg.text}
        </div>
        {msg.inlineLoginLink && loginHref && (
          <Link
            href={loginHref}
            className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/15 transition"
          >
            Giriş Yap →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
