import type { Metadata } from 'next';
import CorporateContent from './CorporateContent';

export const metadata: Metadata = {
  title: 'Kurumsal Web Tasarım',
  description: 'Lead üreten, güven veren kurumsal web sitesi tasarımı. Kurumsal siteniz sadece kartvizit olmasın, iş üretsin.',
  keywords: [
    'kurumsal web tasarım',
    'kurumsal web sitesi',
    'lead üreten web sitesi',
    'b2b web tasarım',
    'profesyonel web tasarım',
    'şirket web sitesi',
    'dönüşüm odaklı tasarım',
  ],
  openGraph: {
    title: 'Kurumsal Web Tasarım | Webtier',
    description: 'Lead üreten, güven veren kurumsal web sitesi tasarımı. Kurumsal siteniz sadece kartvizit olmasın, iş üretsin.',
    type: 'website',
  },
};

export default function CorporatePage() {
  return <CorporateContent />;
}
