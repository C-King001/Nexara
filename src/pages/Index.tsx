import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatItDoesSection from "@/components/WhatItDoesSection";
import ProofSection from "@/components/ProofSection";
import ProofStrip from "@/components/ProofStrip";
import ProblemSection from "@/components/ProblemSection";
import StorySection from "@/components/StorySection";
import LogoMarquee from "@/components/LogoMarquee";
import InsightSection from "@/components/InsightSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import SystemDiagram from "@/components/SystemDiagram";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhatItDoesSection />
      <ProofSection />
      <ProofStrip />
      <LogoMarquee />
      <ProblemSection />
      <StorySection />
      <InsightSection />
      <CaseStudiesSection />
      <CapabilitiesSection />
      <SystemDiagram />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
