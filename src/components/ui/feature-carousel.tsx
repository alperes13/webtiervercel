'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureSlide {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface FeatureCarouselProps {
  slides: FeatureSlide[];
  accentColor?: string;
  autoPlayInterval?: number;
}

export default function FeatureCarousel({
  slides,
  accentColor = '#06b6d4',
  autoPlayInterval = 5000,
}: FeatureCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPaused, goNext, autoPlayInterval]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 280 : -280, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -280 : 280, opacity: 0 }),
  };

  const slide = slides[current];
  const slideNumber = String(current + 1).padStart(2, '0');

  return (
    <div
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Progress bar — top */}
      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mb-0">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accentColor }}
          key={current}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
        />
      </div>

      {/* Main card */}
      <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden min-h-[400px]">
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-56 h-56 blur-[80px] opacity-10 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: accentColor }}
        />

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Left — number, title, description, features */}
              <div className="space-y-5">
                {/* Slide number */}
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-5xl md:text-6xl font-black tabular-nums leading-none opacity-20 select-none"
                    style={{ color: accentColor }}
                  >
                    {slideNumber}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                    / {String(slides.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {slide.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  {slide.description}
                </p>
              </div>

              {/* Right — glassmorphism icon card + feature list */}
              <div className="space-y-4">
                {/* Icon card */}
                <div
                  className="relative w-full rounded-2xl p-6 flex items-center justify-center mb-2 overflow-hidden border border-white/8"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}12 0%, ${accentColor}04 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at 60% 40%, ${accentColor}40, transparent 60%)`,
                    }}
                  />
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      boxShadow: `0 12px 32px ${accentColor}25`,
                    }}
                  >
                    {slide.icon}
                  </div>
                </div>

                {/* Feature list */}
                {slide.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span className="text-sm text-zinc-300 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-5 px-1">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === current ? 'w-8' : 'w-1.5 bg-white/20 hover:bg-white/40'
              )}
              style={i === current ? { backgroundColor: accentColor } : undefined}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goNext}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
