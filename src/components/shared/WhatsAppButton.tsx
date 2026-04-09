'use client';

import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';

export default function WhatsAppButton() {
  const { t } = useLanguage();
  return (
    <motion.a
      href={getWhatsAppUrl(SITE_CONFIG.whatsapp, SITE_CONFIG.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110 sm:bottom-6 sm:right-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      aria-label={t.common.whatsappAria}
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
}
