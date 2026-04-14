'use client';

import { BentoGrid } from "@/components/ui/bento-grid";
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Users, 
  Target,
  Layout
} from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FeatureGrid() {
  const { t } = useLanguage();

  const icons = [
    <BarChart3 key="0" className="w-4 h-4 text-[var(--color-accent)]" />,
    <Target key="1" className="w-4 h-4 text-emerald-500" />,
    <Layout key="2" className="w-4 h-4 text-purple-500" />,
    <Zap key="3" className="w-4 h-4 text-amber-500" />,
    <TrendingUp key="4" className="w-4 h-4 text-blue-500" />,
    <Users key="5" className="w-4 h-4 text-sky-500" />,
  ];

  const colSpans = [2, 1, 1, 2, 1, 2];

  const items = t.featureGrid.items.map((item: any, index: number) => ({
    ...item,
    icon: icons[index],
    colSpan: colSpans[index],
    hasPersistentHover: index === 0,
  }));

  return (
    <section id="features" className="py-12 lg:py-24 bg-[var(--color-surface)] relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] font-[family-name:var(--font-clash-display)] mb-4">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.05}
              staggerFrom="first"
              containerClassName="justify-center"
            >
              {t.featureGrid.title}
            </VerticalCutReveal>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
            {t.featureGrid.description}
          </p>
        </div>
        
        <BentoGrid items={items} />
      </div>
    </section>
  );
}
