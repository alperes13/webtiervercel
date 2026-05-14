"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function StickyCard({
  step,
  index,
  total,
  isTop,
  onClick
}: {
  step: { id: string; title: string; description: string };
  index: number;
  total: number;
  isTop: boolean;
  onClick: () => void;
}) {
  const { t } = useLanguage();
  const HEADER_OFFSET = 120; // Increased to make titles fully readable

  return (
    <motion.div
      onClick={isTop ? undefined : onClick}
      initial={false}
      animate={{
        top: `${index * HEADER_OFFSET}px`,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
        duration: 0.45,
      }}
      className={`absolute left-0 w-full max-w-full transform-gpu ${isTop ? 'cursor-default' : 'cursor-pointer'}`}
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.div
        animate={{
          scale: isTop ? 1 : 1 - (total - index) * 0.015,
          opacity: isTop ? 1 : 0.65 + (index / total) * 0.35,
        }}
        className={`rounded-lg border border-white/10 ${isTop ? 'bg-black/95' : 'bg-black/90 md:bg-black/80'} p-6 md:p-10 shadow-2xl backdrop-blur-md md:backdrop-blur-xl transform-gpu min-h-[460px] md:min-h-[480px] flex flex-col justify-start relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-500 pointer-events-none" />

        <div className="flex items-start justify-between mb-8 relative z-10">
          <div className="space-y-1">
            {!isTop && (
              <div className="flex items-center space-x-2 text-cyan-400/70 mb-2">
                <MousePointer2 className="w-3 h-3 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest font-mono">{t.workflow.exploreLabel}</span>
              </div>
            )}
            <h3 className={`text-lg md:text-2xl font-extrabold font-[family-name:var(--font-heading)] leading-tight transition-colors ${isTop ? 'text-white' : 'text-white/60'}`}>
              {step.title}
            </h3>
          </div>
        </div>

        <div className={`transition-all duration-500 ease-in-out ${isTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible h-0 overflow-hidden text-clip'}`}>
          <p className="text-zinc-400 text-sm md:text-lg leading-relaxed relative z-10 max-w-2xl mt-4">
            {step.description}
          </p>


        </div>

        {!isTop && (
          <div className="absolute inset-0 bg-transparent z-20" />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ServicesProcessStack() {
  const { t } = useLanguage();

  const [stackIds, setStackIds] = useState(['p6', 'p5', 'p4', 'p3', 'p2', 'p1']);
  
  const stack = stackIds.map(id => t.workflow.steps.find(s => s.id === id)!);

  const bringToFront = (id: string) => {
    setStackIds((prev) => {
      const cardIdx = prev.indexOf(id);
      if (cardIdx === -1 || cardIdx === prev.length - 1) return prev;
      const newStack = [...prev];
      const [removedId] = newStack.splice(cardIdx, 1);
      newStack.push(removedId);
      return newStack;
    });
  };

  return (
    <section
      id="workflow"
      className="relative w-full max-w-full overflow-x-clip bg-transparent pt-0 lg:pt-16 pb-10 lg:pb-16"
    >

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20">

          <div className="pt-0 lg:pt-16">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight"
                >
                  <span className="text-red-500">{t.workflow.highlight}</span> <br />
                  {t.workflow.title}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
                    {t.workflow.subtitle1}
                  </p>
                  <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl">
                    {t.workflow.subtitle2}
                  </p>
                </motion.div>
              </div>

              <div className="flex items-center space-x-2 text-cyan-400/60 text-sm font-medium">
                <MousePointer2 className="w-4 h-4 animate-bounce" />
                <span>{t.workflow.exploreHint}</span>
              </div>

              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
            </div>
          </div>

          <div className="relative mt-0 lg:mt-16 h-[1000px] md:h-[1100px] lg:h-[1100px] overflow-x-hidden md:overflow-visible max-w-full">
            <div className="lg:sticky lg:top-32 w-full h-full max-w-full">
              <div className="relative w-full h-full max-w-full overflow-hidden">
                <AnimatePresence>
                  {stack.map((step, index) => (
                    <StickyCard
                      key={step.id}
                      step={step}
                      index={index}
                      total={stack.length}
                      isTop={index === stack.length - 1}
                      onClick={() => bringToFront(step.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
