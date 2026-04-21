'use client';

import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

function FloatingPath({ pathIndex, totalPaths }: { pathIndex: number; totalPaths: number }) {
  const opacity = 0.15 + pathIndex * 0.04;
  const width = 36 + (totalPaths - pathIndex) * 18;

  const d = useMemo(() => {
    const yBase = 250 + pathIndex * 25;
    const amplitude = 50 + pathIndex * 15;
    return `M-${width} ${yBase} C${200 + pathIndex * 30} ${yBase - amplitude} ${600 - pathIndex * 20} ${yBase + amplitude} ${1200 + width} ${yBase}`;
  }, [pathIndex, width]);

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.6 + pathIndex * 0.15}
      strokeOpacity={opacity}
      initial={{ pathLength: 0 }}
      animate={{
        pathLength: [0, 1],
        opacity: [opacity * 0.4, opacity, opacity * 0.4],
        pathOffset: [0, 1],
      }}
      transition={{
        pathLength: { duration: 2.5, ease: 'easeInOut', delay: pathIndex * 0.1 },
        opacity: { duration: 4 + pathIndex * 0.5, repeat: Infinity, ease: 'easeInOut', delay: pathIndex * 0.1 },
        pathOffset: { duration: 14 + pathIndex * 2, repeat: Infinity, ease: 'linear' },
      }}
    />
  );
}

interface BackgroundPathsProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  children?: React.ReactNode;
  color?: string;
}

export default function BackgroundPaths({
  title,
  titleHighlight,
  subtitle,
  children,
  color = 'text-[#a78bfa]',
}: BackgroundPathsProps) {
  const pathCount = 8;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Animated SVG Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          style={{ minHeight: '100%' }}
        >
          <title>Background Decoration</title>
          {/* Top paths */}
          <g className={color}>
            {Array.from({ length: pathCount }).map((_, i) => (
              <FloatingPath key={`t-${i}`} pathIndex={i} totalPaths={pathCount} />
            ))}
          </g>
          {/* Mirrored bottom paths */}
          <g className={color} transform="scale(1,-1) translate(0,-600)">
            {Array.from({ length: pathCount }).map((_, i) => (
              <FloatingPath key={`b-${i}`} pathIndex={i} totalPaths={pathCount} />
            ))}
          </g>
        </svg>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950 pointer-events-none opacity-60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              {title}
            </span>
            {titleHighlight && (
              <>
                <br />
                <span className={color}>
                  {titleHighlight}
                </span>
              </>
            )}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
