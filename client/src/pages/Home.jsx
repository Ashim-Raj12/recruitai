import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import TrustedCompanies from '../components/landing/TrustedCompanies';
import ProblemSection from '../components/landing/ProblemSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import InteractivePreview from '../components/landing/InteractivePreview';
import HowItWorks from '../components/landing/HowItWorks';
import AICopilotShowcase from '../components/landing/AICopilotShowcase';
import Statistics from '../components/landing/Statistics';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import BottomCTA from '../components/landing/BottomCTA';

const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <TrustedCompanies />
      <ProblemSection />
      <FeaturesSection />
      <InteractivePreview />
      <HowItWorks />
      <AICopilotShowcase />
      <Statistics />
      <Testimonials />
      <Pricing />
      <FAQ />
      <BottomCTA />
    </div>
  );
};

export default Home;
