import type { Metadata } from 'next';
import CorporateContent from './CorporateContent';

export const metadata: Metadata = {
  title: 'Kurumsal Web Tasarım',
  description: 'Lead üreten, güven veren kurumsal web sitesi tasarımı. Kurumsal siteniz sadece kartvizit olmasın, iş üretsin.',
};

export default function CorporatePage() {
  return <CorporateContent />;
}
