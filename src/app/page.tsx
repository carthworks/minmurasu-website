import Hero from "@/components/sections/Hero";
import CapabilityStrip from "@/components/sections/CapabilityStrip";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import SeoAuditSpotlight from "@/components/sections/SeoAuditSpotlight";
import BrandVideoSection from "@/components/sections/BrandVideoSection";
import IndustriesOverview from "@/components/sections/IndustriesOverview";
import Process from "@/components/sections/Process";
import FounderProof from "@/components/sections/FounderProof";
import EngagementModels from "@/components/sections/EngagementModels";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage — kept to one clear story:
 * promise → problem → what we do → see it → your industry → how it works →
 * who we are → how to work with us → questions → next step.
 *
 * Deeper material (5-stage growth architecture, measurement stack, automation
 * workflow) lives on /approach so the homepage stays short and scannable.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <ProblemSection />
      <SeoAuditSpotlight />
      <ServicesOverview />
      <BrandVideoSection />
      <IndustriesOverview />
      <Process />
      <FounderProof />
      <EngagementModels />
      <FAQ />
      <FinalCTA />
    </>
  );
}
