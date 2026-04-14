'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const credits = searchParams.get('credits');
  const creditAmount = credits ? Number(credits) : null;

  return (
    <div className="max-w-md w-full text-center space-y-8 relative">
      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10 bg-emerald-500/10 blur-[100px] rounded-full" />
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="mx-auto w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
      </motion.div>

      <div className="space-y-3">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold tracking-tight text-white uppercase font-[family-name:var(--font-heading)]"
        >
          Ödeme Başarılı
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 text-sm leading-relaxed"
        >
          {creditAmount
            ? `${creditAmount} Ultra kredi hesabınıza tanımlandı. Derinlemesine analiz raporunuzu hemen başlatabilirsiniz.`
            : 'Ödemeniz başarıyla alındı. Kredileriniz sistem tarafından hesabınıza aktarılıyor.'}
        </motion.p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl space-y-4"
      >
        <div className="flex items-center justify-between text-xs font-bold tracking-widest text-zinc-500 uppercase">
          <span>Sipariş Özeti</span>
          <span className="text-emerald-400">Tamamlandı</span>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">Bakiye Yükleme</p>
              <p className="text-[10px] text-zinc-500">ULTRA ANALİZ KREDİSİ</p>
            </div>
          </div>
          <p className="text-sm font-bold text-white">+{creditAmount || '--'}</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-4"
      >
        <Link href="/">
          <Button size="lg" className="w-full h-14 text-sm font-bold uppercase tracking-wider group transition-all">
            Hemen Analize Başla
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
          <ShieldCheck className="h-3 w-3" /> PayTR Güvenli Ödeme Sistemi
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <Suspense fallback={<div className="text-white">Yükleniyor...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
