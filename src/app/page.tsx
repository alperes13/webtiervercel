import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import SharedBackgroundWrapper from '@/components/layout/SharedBackgroundWrapper';
import Footer from '@/components/layout/Footer';

const CROXUltraSection = dynamic(() => import('@/components/sections/CROXUltraSection'), {
  loading: () => <div className="min-h-[60vh]" />,
});

const ServicesProcessStack = dynamic(() => import('@/components/sections/ServicesProcessStack'), {
  loading: () => <div className="min-h-screen" />,
});

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="min-h-[40vh]" />,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <SharedBackgroundWrapper>
        <CROXUltraSection />
        <ServicesProcessStack />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
        <Footer />
      </SharedBackgroundWrapper>
    </>
  );
}
