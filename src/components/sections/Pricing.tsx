import PricingSection from "@/components/ui/pricing-section";

export default function Pricing() {
  return (
    <section id="pricing" className="relative">
      {/* Decorative Gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />
      
      <PricingSection />
      
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />
    </section>
  );
}
