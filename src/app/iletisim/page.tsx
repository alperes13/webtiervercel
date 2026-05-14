import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Webtier ile iletişime geçin. WhatsApp, email veya form ile bize ulaşabilirsiniz. Web sitenizin dönüşüm oranını artırmak için ilk adımı atın.',
  keywords: [
    'iletişim',
    'webtier iletişim',
    'web ajansı iletişim',
    'cro ajansı iletişim',
    'web tasarım iletişim',
    'teklif al',
  ],
  openGraph: {
    title: 'İletişim | Webtier',
    description: 'Webtier ile iletişime geçin. WhatsApp, email veya form ile bize ulaşabilirsiniz.',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
