// src/app/page.tsx
import Header from '../components/landing/Header/Header';
import Hero from '../components/landing/Hero/Hero';
import WhatIsSection from '../components/landing/WhatIs/WhatIsSection';
import BenefitsSection from '../components/landing/Benefits/BenefitsSection';
import HowItWorksSection from '../components/landing/HowItWorks/HowItWorksSection';
import ForWhomSection from '../components/landing/ForWhom/ForWhomSection';
import FeaturesSection from '../components/landing/Features/FeaturesSection';
import PricingSection from '../components/landing/Pricing/PricingSection';
import FounderSection from '../components/landing/Founder/FounderSection';
import FAQSection from '../components/landing/FAQ/FAQSection';
import LandingFooter from '../components/landing/Footer/LandingFooter';

export default function HomePage() {
  return (
    <>
      {/* Header tipo chip con menú + login */}
      <Header />

      <main>
        <Hero />
        <WhatIsSection />
        <BenefitsSection />
        <HowItWorksSection />
        <ForWhomSection />
        <FeaturesSection />
        <PricingSection />
        <FounderSection />
        <FAQSection />
        <LandingFooter />
      </main>
    </>
  );
}
