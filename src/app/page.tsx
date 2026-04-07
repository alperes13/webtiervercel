import HeroSection from '@/components/sections/HeroSection';
import TrustSignals from '@/components/sections/TrustSignals';
import References from '@/components/sections/References';
import ServicesOverview from '@/components/sections/ServicesOverview';
import Process from '@/components/sections/Process';
import EcommercePreview from '@/components/sections/EcommercePreview';
import CorporatePreview from '@/components/sections/CorporatePreview';
import WhyUs from '@/components/sections/WhyUs';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSignals />
      <References />
      <ServicesOverview />
      <Process />
      <EcommercePreview />
      <CorporatePreview />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
