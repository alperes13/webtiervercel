"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';


export default function RuixenStats() {
  const { t } = useLanguage();
  
  return (
    <section className="ruixen-stats-container w-full max-w-7xl mx-auto px-4 py-8 lg:py-24 space-y-10">
      
      {/* 1. TOP: 12 Problems Section */}
      <div className="space-y-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="ruixen-stats-leak-title text-3xl lg:text-5xl font-black text-white font-[family-name:var(--font-heading)]">
            Hangi <span className="text-red-500">Sızıntı</span> Sizi Zarara Uğratıyor?
          </h3>
          <p className="text-white text-lg font-medium opacity-90">
            İşletmelerin %92'si aşağıdaki 12 temel sorundan en az 5 tanesini paylaşıyor. 
            Sizin sitenizdeki engel hangisi?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(t.croxUltra.problems ?? []).map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-red-500/5 hover:border-red-500/20 transition-all group"
            >
              <AlertCircle className="w-5 h-5 text-red-500/50 group-hover:text-red-500 transition-colors shrink-0" />
              <span className="text-zinc-400 text-sm font-semibold group-hover:text-white transition-colors">
                {problem}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* 2. BOTTOM: Why CRO-X */}
      <div className="flex flex-col items-center text-center gap-10">
        


        <div className="space-y-6 max-w-5xl mx-auto">
          <h3 className="ruixen-stats-why-title text-4xl lg:text-7xl font-black text-white leading-tight font-[family-name:var(--font-heading)]">
            <span className="text-cyan-400">CRO-X Ultra</span>
          </h3>
          <p className="text-zinc-400 text-xl lg:text-2xl leading-relaxed w-full">
            Yukarıdaki tüm sızıntıları gerçek zamanlı verilerle kapatıyoruz. 
            Sadece analiz etmiyor, dönüşüm oranlarınızı katlayacak bir yol haritası sunuyoruz.
          </p>
        </div>
      </div>
    </section>
  );
}
