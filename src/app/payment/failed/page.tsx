'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { XCircle, RefreshCcw, AlertCircle, ShieldAlert } from 'lucide-react';

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <div className="max-w-md w-full text-center space-y-8 relative">
        {/* Decorative background glow */}
        <div className="absolute inset-0 -z-10 bg-red-500/10 blur-[100px] rounded-full" />
        
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
        >
          <XCircle className="h-10 w-10 text-red-400" />
        </motion.div>

        <div className="space-y-3">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight text-white uppercase font-[family-name:var(--font-heading)]"
          >
            Ödeme Başarısız
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 text-sm leading-relaxed"
          >
            Ödeme işleminiz sırasında bir hata oluştu. Hesabınızdan herhangi bir bakiye düşülmedi. Lütfen bağlantınızı veya kart bilgilerinizi kontrol edip tekrar deneyin.
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl space-y-4"
        >
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-left">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
            <p className="text-xs text-red-200/70">
              Sorun devam ederse bankanızla iletişime geçebilir veya farklı bir ödeme yöntemi deneyebilirsiniz.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4"
        >
          <Link href="/">
            <Button size="lg" className="w-full h-14 text-sm font-bold uppercase tracking-wider group bg-red-600 hover:bg-red-700">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Tekrar Dene
            </Button>
          </Link>
          <Link href="/">
            <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
              Ana Sayfaya Dön
            </button>
          </Link>
          <div className="pt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
            <ShieldAlert className="h-3 w-3" /> PayTR Güvenli Ödeme Bildirimi
          </div>
        </motion.div>
      </div>
    </main>
  );
}
