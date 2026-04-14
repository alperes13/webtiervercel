"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const plans = [
  {
    name: "Starter",
    description: "Küçük işletmeler ve yeni başlayanlar için ideal CRO başlangıç paketi.",
    buttonText: "Teklif Al",
    buttonVariant: "outline" as const,
    includes: [
      "Temel CRO Analizi",
      "Ayda 1 A/B Testi",
      "Isı Haritası Takibi",
      "Haftalık Raporlama",
    ],
  },
  {
    name: "Professional",
    description: "Büyüyen işletmeler için gelişmiş optimizasyon özellikleri.",
    buttonText: "Teklif Al",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Starter Paketindeki Her Şey",
      "Ayda 3 A/B Testi",
      "Kullanıcı Kayıt Analizi",
      "Dönüşüm Hunisi Optimizasyonu",
      "Öncelikli Destek",
    ],
  },
  {
    name: "Enterprise",
    description: "Büyük ölçekli operasyonlar için tam kapsamlı CRO çözümü.",
    buttonText: "Teklif Al",
    buttonVariant: "outline" as const,
    includes: [
      "Professional Paketindeki Her Şey",
      "Sınırsız A/B Testi",
      "Özel Strateji Danışmanlığı",
      "7/24 Teknik Destek",
      "Özel Entegrasyonlar",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-[var(--color-surface-card)] border border-[var(--color-border)] p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-white" : "text-[var(--color-text-secondary)]"
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-[var(--color-accent)]/50 border-[var(--color-accent)] bg-gradient-to-t from-[var(--color-accent)] to-[var(--color-accent-secondary)]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Aylık</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-white" : "text-[var(--color-text-secondary)]"
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-[var(--color-accent)]/50 border-[var(--color-accent)] bg-gradient-to-t from-[var(--color-accent)] to-[var(--color-accent-secondary)]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Yıllık</span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const [activeIntent, setActiveIntent] = useState("0");

  return (
    <div className="py-24 mx-auto relative bg-[var(--color-surface)] overflow-x-hidden" ref={pricingRef}>
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] "
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp
          density={420}
          direction="bottom"
          speed={0.55}
          opacity={0.7}
          size={1.8}
          color="var(--color-accent)"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      <article className="text-center mb-16 pt-12 max-w-3xl mx-auto space-y-4 relative z-50 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] font-[family-name:var(--font-clash-display)] tracking-tight">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center "
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Size En Uygun Planı Seçin
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-[var(--color-text-secondary)] text-lg"
        >
          Şeffaf fiyatlandırma, maksimum dönüşüm. İşletmenizin ölçeğine göre optimize edilmiş paketler.
        </TimelineContent>

        <TimelineContent as="div" animationNum={1} timelineRef={pricingRef} customVariants={revealVariants}>
          <PricingSwitch onSwitch={setActiveIntent} />
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-3 max-w-6xl gap-6 py-6 mx-auto px-4 relative z-50">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex h-full"
          >
            <Card
              className={`relative text-[var(--color-text)] border-[var(--color-border)] flex flex-col w-full h-full overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]/50 ${plan.popular
                  ? "bg-gradient-to-b from-white to-[var(--color-surface-card)] shadow-[0px_-13px_60px_-30px_var(--color-accent)]/20 z-20 border-[var(--color-accent)]/30"
                  : "bg-[var(--color-surface-card)] z-10"
                }`}
            >
              <CardHeader className="text-left pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-clash-display)]">{plan.name}</h3>
                  {plan.popular && (
                    <span className="bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-[var(--color-accent)]/30">
                      Popüler
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
                    Teklif Al
                  </span>
                  <span className="text-[var(--color-text-secondary)] text-sm">
                    {activeIntent === "1" ? "yıllık planlama için" : "paket detayları için"}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <Button
                  variant={plan.buttonVariant === "default" ? "default" : "outline"}
                  className={cn(
                    "w-full h-12 text-lg font-semibold rounded-xl transition-all duration-300",
                    plan.popular
                      ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-secondary)] text-white shadow-lg shadow-[var(--color-accent)]/20"
                      : "border-[var(--color-border)] hover:bg-[var(--color-surface-card-hover)] text-[var(--color-text)]"
                  )}
                >
                  {plan.buttonText}
                </Button>

                <div className="space-y-4 pt-6 mt-6 border-t border-[var(--color-border)] flex-1">
                  <ul className="space-y-3">
                    {plan.includes.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-[var(--color-accent)] shrink-0" />
                        <span className="text-sm text-[var(--color-text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
