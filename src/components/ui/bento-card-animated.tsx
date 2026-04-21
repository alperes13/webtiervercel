'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface AnimatedBentoCardProps {
  tabs: BentoTab[];
  accentColor?: string;
}

export default function AnimatedBentoCard({
  tabs,
  accentColor = '#a78bfa',
}: AnimatedBentoCardProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tab Headers */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border',
              activeTab === index
                ? 'bg-white/[0.08] border-white/15 text-white'
                : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
            )}
          >
            <span
              className="transition-colors duration-300"
              style={{ color: activeTab === index ? accentColor : undefined }}
            >
              {tab.icon}
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Card Content */}
      <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden min-h-[340px]">
        {/* Background glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-15 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left - Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    {tabs[activeTab].icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{tabs[activeTab].title}</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {tabs[activeTab].description}
                </p>
              </div>

              {/* Right - Features */}
              <div className="space-y-2.5">
                {tabs[activeTab].features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span className="text-sm text-zinc-300 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar */}
        <div className="h-1 w-full bg-white/5 mt-auto">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: '0%' }}
            animate={{ width: `${((activeTab + 1) / tabs.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}
