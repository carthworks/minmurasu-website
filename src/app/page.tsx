import Hero from "@/components/sections/Hero";
import CapabilityStrip from "@/components/sections/CapabilityStrip";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import GrowthSystem from "@/components/sections/GrowthSystem";
import IndustriesOverview from "@/components/sections/IndustriesOverview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import MeasurementSection from "@/components/sections/MeasurementSection";
import AISection from "@/components/sections/AISection";
import CaseStudies from "@/components/sections/CaseStudies";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <ProblemSection />
      <ServicesOverview />
      <GrowthSystem />
      <IndustriesOverview />
      <WhyChooseUs />
      <Process />
      <MeasurementSection />
      <AISection />
      <CaseStudies />
      <FAQ />
      <FinalCTA />
    </>
  );
}
