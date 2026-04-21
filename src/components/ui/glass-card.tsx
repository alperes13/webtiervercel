'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  accentColor?: string;
}

export default function GlassCard({
  icon,
  title,
  description,
  className,
  accentColor = '#06b6d4',
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className={cn(
        'group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300',
        'bg-white/[0.04] backdrop-blur-xl border border-white/[0.10]',
        'hover:border-white/20 hover:bg-white/[0.07]',
        'hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]',
        'ring-0 hover:ring-1 hover:ring-white/10',
        className
      )}
    >
      {/* Top image-like accent area */}
      <div
        className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}06 100%)`,
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${accentColor}25, transparent 65%)`,
          }}
        />
        {/* Icon */}
        <div
          className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg"
          style={{
            backgroundColor: `${accentColor}20`,
            color: accentColor,
            boxShadow: `0 8px 24px ${accentColor}20`,
          }}
        >
          {icon}
        </div>

        {/* Decorative blurred dot */}
        <div
          className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-30"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Bottom content area */}
      <div className="p-5 space-y-2">
        <h3 className="text-base font-bold text-white group-hover:text-white transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
      />
    </motion.div>
  );
}
