'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ShimmerTextProps {
  text: string;
  className?: string;
  shimmerColor?: string;
  duration?: number;
}

export default function ShimmerText({
  text,
  className,
  shimmerColor = 'rgba(255,255,255,0.85)',
  duration = 2.5,
}: ShimmerTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      {/* Base text — visible white */}
      <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
        {text}
      </span>

      {/* Shimmer sweep overlay */}
      {isInView && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-clip-text text-transparent pointer-events-none select-none"
          style={{
            backgroundImage: `linear-gradient(
              105deg,
              transparent 20%,
              ${shimmerColor} 45%,
              white 50%,
              ${shimmerColor} 55%,
              transparent 80%
            )`,
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: ['200% center', '-100% center'],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: 'easeInOut',
          }}
        >
          {text}
        </motion.span>
      )}
    </span>
  );
}
