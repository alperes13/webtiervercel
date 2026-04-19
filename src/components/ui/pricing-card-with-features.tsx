"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, ArrowUpRight } from "lucide-react";

export const Box = ({ 
  title = "CRO-X ULTRA", 
  subtitle = "Tam kapsamlı analiz paketi", 
  price = "249.00 TL",
  priceNote = "",
  features = [],
  ctaText = "Hemen Al",
  creditText = "2 Kredi Hakkı.",
  showTotalLabel = true,
  priceClassName = "",
  href,
  onCtaClick
}: {
  title?: string;
  subtitle?: string;
  price?: string;
  priceNote?: string;
  features?: string[];
  ctaText?: string;
  creditText?: string;
  showTotalLabel?: boolean;
  priceClassName?: string;
  href?: string;
  onCtaClick?: () => void;
}) => {
  return (
    <div className="pricing-box-wrapper flex justify-center w-full">
      <Card className="pricing-box-card w-full max-w-[464px] rounded-[32px] border border-white/10 bg-zinc-900/50 backdrop-blur-xl text-white p-6 sm:p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />
        
        {/* Header */}
        <div className="pricing-box-header relative z-10">
          <h2 className="pricing-box-header-title text-2xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            {subtitle}
          </p>
        </div>

        {/* Features - Optional if provided */}
        {features.length > 0 && (
          <CardContent className="pricing-box-content rounded-2xl border border-white/5 bg-white/[0.02] p-5 flex flex-col gap-4 relative z-10">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 text-zinc-300">
                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="text-sm leading-tight">{feature}</span>
              </div>
            ))}
          </CardContent>
        )}

        {/* Footer */}
        <div className="pricing-box-footer flex items-center justify-between mt-auto pt-4 border-t border-white/5 relative z-10">
          <div className="flex flex-col">
            {creditText && <span className="text-[10px] text-zinc-400 font-bold mb-1 opacity-70">{creditText}</span>}
            {showTotalLabel && <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Toplam Ücret</span>}
            <span className={cn(
              "text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400",
              priceClassName
            )}>
              {price}
            </span>
            {priceNote && (
              <span className="text-[10px] text-zinc-500 mt-1 font-medium">{priceNote}</span>
            )}
          </div>

          <Button
            asChild={!!href}
            onClick={onCtaClick}
            className={cn(
              "group/cta flex items-center justify-center gap-4 px-6 h-14 rounded-2xl text-sm sm:text-base font-bold text-black transition-all duration-300 w-fit",
              "bg-gradient-to-r from-white to-zinc-200 hover:from-white hover:to-white shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)] border-none"
            )}
          >
            {href ? (
              <Link href={href}>
                <span className="tracking-tight">{ctaText}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 shadow-lg shrink-0">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </Link>
            ) : (
              <>
                <span className="tracking-tight">{ctaText}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 shadow-lg shrink-0">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};
