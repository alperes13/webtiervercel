import HeroSection from '@/components/sections/HeroSection';
import TrustSignals from '@/components/sections/TrustSignals';
import References from '@/components/sections/References';
import ServicesOverview from '@/components/sections/ServicesOverview';
import Process from '@/components/sections/Process';
import EcommercePreview from '@/components/sections/EcommercePreview';
import CorporatePreview from '@/components/sections/CorporatePreview';
import Testimonials from '@/components/sections/Testimonials';
import WhyUs from '@/components/sections/WhyUs';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSignals />
      <References />
      <ServicesOverview />
      <Process />
      <div className="bg-black py-12 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />
        <EcommercePreview />
        <CorporatePreview />
      </div>
      <WhyUs />
      <Testimonials />
      
      <AuroraBackground className="h-auto py-24 bg-black">
        <div className="w-full max-w-7xl mx-auto space-y-24">
          <FAQ />
          <CTA />
        </div>
      </AuroraBackground>
    </>
  );
}
