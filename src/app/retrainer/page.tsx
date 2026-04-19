 'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, RefreshCw, TrendingUp, ArrowRight, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/utils';

export default function RetrainerPage() {
  const handleWhatsApp = () => {
    window.open(getWhatsAppUrl('Webtier Retrainer hakkında bilgi almak istiyorum.'), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#a78bfa]/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#a78bfa]/10 blur-[80px] rounded-full opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#a78bfa]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>CRO-X Uygulama Hizmeti</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
            >
              Webtier <span className="text-[#a78bfa]">Retrainer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              CRO-X AI analiz sonuclarini dijital varliklariniza uyguluyoruz.
              Abonelik bazli aylik optimizasyon hizmeti ile donusum oranlarinizi surekli artirin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button size="lg" className="bg-[#a78bfa] hover:bg-[#9061f9] text-white px-8 rounded-full h-12 text-base font-bold" onClick={handleWhatsApp}>
                Hemen Basvur
                <Rocket className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white px-8 rounded-full h-12 text-base font-medium" onClick={handleWhatsApp}>
                Detayli Bilgi Al
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="w-6 h-6 text-[#a78bfa]" />,
                title: "CRO-X Uygulama",
                description: "CRO-X AI raporundaki tum onerileri web sitenize, e-ticaret altyapiniza ve dijital varliklariniza profesyonel ekibimizle uyguluyoruz."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-[#a78bfa]" />,
                title: "Aylik Optimizasyon",
                description: "Her ay duzenli olarak performans takibi yapar, yeni iyilestirme firsatlarini tespit eder ve dijital varliklariniza uygulariz."
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-[#a78bfa]" />,
                title: "Surekli Buyume",
                description: "Abonelik suresi boyunca dijital varliklariniz surekli guncellenir, donusum oranlariniz aydan aya artar."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#a78bfa]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#a78bfa]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Sonuclariniz, <br />
                <span className="text-[#a78bfa]">Bizim Eylemimiz.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                CRO-X AI analiz sonuclarinizi alir, gerekli tum teknik ve tasarim guncellemelerini yapar,
                aylik abonelik ile surekli optimizasyon saglariz. Siz isletmenize odaklanin,
                dijital donusumu biz yonetelim.
              </p>
              <div className="space-y-4 py-6">
                {[
                  "CRO-X raporundaki tum aksiyonlarin uygulanmasi",
                  "Web sitesi ve dijital varliklarda teknik guncellemeler",
                  "Aylik performans raporu ve yeni optimizasyonlar",
                  "Abonelik bazli esnek calisma modeli"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#a78bfa]/20 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-[#a78bfa]" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-[#a78bfa]/20 blur-[80px] rounded-full group-hover:bg-[#a78bfa]/30 transition-all" />
              <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-4 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 active:bg-red-500 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  <span className="ml-2 text-xs text-zinc-600 font-mono">retrainer-engine-v2</span>
                </div>
                <div className="p-4 space-y-4 font-mono text-xs md:text-sm">
                  <div className="flex gap-4">
                    <span className="text-[#a78bfa]">01</span>
                    <span className="text-zinc-500">INIT: CRO-X raporu aliniyor...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#a78bfa]">02</span>
                    <span className="text-zinc-500">APPLY: Dijital varliklara guncellemeler uygulaniyor...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#a78bfa]">03</span>
                    <span className="text-emerald-500">DONE: Aylik optimizasyon tamamlandi.</span>
                  </div>
                  <div className="h-24 md:h-32 bg-white/5 rounded-xl border border-white/5 p-4 flex items-end">
                    <div className="flex-1 flex gap-1 items-end h-full">
                       {[40, 55, 60, 70, 72, 78, 82, 88, 90, 93, 95].map((h, i) => (
                         <motion.div
                           key={i}
                           initial={{ height: 0 }}
                           whileInView={{ height: `${h}%` }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1, duration: 0.8 }}
                           className="flex-1 bg-gradient-to-t from-[#a78bfa] to-[#9061f9] rounded-sm opacity-50"
                         />
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 relative overflow-hidden text-center space-y-8">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#a78bfa]/5 blur-[80px] rounded-full" />

            <h2 className="text-3xl md:text-6xl font-bold tracking-tight">
              Donusumu <span className="text-[#a78bfa]">Hayata Gecirin</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto">
              Webtier Retrainer ile CRO-X AI sonuclarinizi dijital varliklariniza uygulatin.
              Aylik abonelik ile surekli buyume saglayin.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 px-10 rounded-full h-14 text-base font-bold w-full md:w-auto" onClick={handleWhatsApp}>
                Ucretsiz Gorus Talep Et
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/5 px-10 rounded-full h-14 text-base font-medium w-full md:w-auto" onClick={handleWhatsApp}>
                 Satis Ekibiyle Gorusun
                 <MessageCircle className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
