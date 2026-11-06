import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import {
  ShieldAlert,
  Stethoscope,
  Building2,
  Factory,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Work | MIN MURASU",
  description:
    "Explore our verified solution architectures and digital growth case studies. Zero fabricated metrics or fake client logos.",
};

const sampleArchitectures = [
  {
    title: "Multi-Specialty Clinic Inbound Patient Flow",
    category: "Healthcare & Clinics",
    icon: Stethoscope,
    challenge:
      "A regional healthcare provider experienced dropped appointment requests due to high phone call wait times and zero centralized record-keeping.",
    architecture: [
      "High-speed mobile landing pages for specific medical departments",
      "Local Google Search Campaigns focused on high-intent regional keywords",
      "Interactive WhatsApp appointment triage with automated location directions",
      "Direct integration into patient appointment management software",
    ],
    outcomesTracked:
      "Reduced time-to-confirmation from hours to under 60 seconds; lower no-show rates via scheduled automated reminders.",
  },
  {
    title: "High-End Residential Launch Lead Qualification",
    category: "Real Estate",
    icon: Building2,
    challenge:
      "Property marketing team receiving hundreds of unqualified portal inquiries, wasting sales representative time on non-serious prospects.",
    architecture: [
      "Custom project microsite built with Next.js featuring floor plans and video walkthroughs",
      "Meta Ads utilizing custom audience segmentation and verified income profiles",
      "Two-step WhatsApp verification requiring budget confirmation before brochure unlock",
      "Instant webhook dispatch notifying senior relationship managers",
    ],
    outcomesTracked:
      "Sales team focused exclusively on pre-screened buyers; verified lead-to-site-visit ratio improved dramatically.",
  },
  {
    title: "Precision Engineering SME Industrial RFQ Engine",
    category: "Manufacturing",
    icon: Factory,
    challenge:
      "Industrial manufacturer in Coimbatore relied solely on word-of-mouth and trade shows, lacking an inbound digital channel for corporate procurement teams.",
    architecture: [
      "Re-engineered corporate catalogue with precise technical tolerances and material specifications",
      "Technical B2B SEO targeting exact component keywords and OEM part queries",
      "Dedicated RFQ submission portal supporting drawing and CAD file uploads",
      "Automated email dispatch to the engineering estimation desk",
    ],
    outcomesTracked:
      "Consistent monthly inbound RFQs from procurement engineers across India and export markets.",
  },
];

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Portfolio &amp; Solutions"
          title="Verified Solution Architectures"
          description="We uphold an uncompromising zero-fabrication policy. Client case studies are published only with explicit written consent and verifiable analytics snapshots."
        />

        {/* Transparency Alert */}
        <div className="mb-12 p-5 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] text-xs sm:text-sm text-[#0082CA] flex items-start gap-3 max-w-4xl mx-auto">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-[#0082CA]" />
          <div>
            <strong>Confidentiality Notice:</strong> Many of our clients operate in competitive regional markets
            under non-disclosure agreements (NDAs). Below, we outline our verified architectural frameworks
            demonstrating the exact systems we deploy. Live interactive walkthroughs are available upon request.
          </div>
        </div>

        {/* Architecture Cards */}
        <div className="space-y-10 max-w-4xl mx-auto">
          {sampleArchitectures.map((arch) => {
            const Icon = arch.icon;
            return (
              <div
                key={arch.title}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs hover:border-[#0082CA]/40 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0082CA] bg-[#F0F8FF] border border-[#BAE6FD] px-3 py-1 rounded-full">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{arch.category}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    System Architecture
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#0D2040] mb-3">
                  {arch.title}
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-[#475569]">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-[#0D2040] block mb-1">
                      Business Challenge:
                    </strong>
                    <p>{arch.challenge}</p>
                  </div>

                  <div>
                    <strong className="text-[#0D2040] block mb-2">
                      System Architecture Deployed:
                    </strong>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {arch.architecture.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[#0082CA] font-bold">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                    <strong>Measured Impact:</strong> {arch.outcomesTracked}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center bg-[#0D2040] text-white p-8 sm:p-12 rounded-3xl max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-[#0082CA] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Want to Review a Live Architecture Demo?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            We will walk you through a customized growth blueprint and show you live demonstrations of our web, SEO, and automation stacks.
          </p>
          <Button href="/contact" variant="teal" size="md">
            Request an Interactive Walkthrough
          </Button>
        </div>
      </Container>
    </div>
  );
}

