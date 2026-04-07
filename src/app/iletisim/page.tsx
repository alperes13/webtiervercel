import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Webtier ile iletişime geçin. WhatsApp, email veya form ile bize ulaşabilirsiniz.',
};

export default function ContactPage() {
  return <ContactContent />;
}
