import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import SharedBackgroundWrapper from '@/components/layout/SharedBackgroundWrapper';
import Footer from '@/components/layout/Footer';
import { queryOne } from '@/lib/db';
import { ensureMigrations } from '@/lib/migrate';

const CROXUltraSection = dynamic(() => import('@/components/sections/CROXUltraSection'), {
  loading: () => <div className="min-h-[60vh]" />,
});

const ServicesProcessStack = dynamic(() => import('@/components/sections/ServicesProcessStack'), {
  loading: () => <div className="min-h-screen" />,
});

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="min-h-[40vh]" />,
});

export default async function Home() {
  let isMiniEnabled = true;
  let isUltraEnabled = true;

  try {
    await ensureMigrations();
    const [mini, ultra] = await Promise.all([
      queryOne<{ value: string }>('SELECT value FROM app_settings WHERE key = $1', ['cro_mini_enabled']),
      queryOne<{ value: string }>('SELECT value FROM app_settings WHERE key = $1', ['cro_ultra_enabled']),
    ]);
    isMiniEnabled = (mini?.value ?? 'true') === 'true';
    isUltraEnabled = (ultra?.value ?? 'true') === 'true';
  } catch {
    // DB not ready yet — default to enabled
  }

  return (
    <>
      <HeroSection isMiniEnabled={isMiniEnabled} isUltraEnabled={isUltraEnabled} />
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
