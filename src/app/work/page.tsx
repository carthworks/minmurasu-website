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
  title: "Solution Blueprints & Work",
  description:
    "Solution blueprints showing exactly how MIN MURASU builds growth systems for clinics, real estate and manufacturers. No fabricated metrics or fake client logos.",
};

const sampleArchitectures = [
  {
    title: "Multi-Specialty Clinic Inbound Patient Flow",
    category: "Healthcare & Clinics",
    icon: Stethoscope,
    challenge:
      "Clinics commonly lose appointment requests to long phone wait times and scattered record-keeping.",
    architecture: [
      "High-speed mobile landing pages for specific medical departments",
      "Local Google Search Campaigns focused on high-intent regional keywords",
      "Interactive WhatsApp appointment triage with automated location directions",
      "Direct integration into patient appointment management software",
    ],
    outcomesTracked:
      "Time from enquiry to confirmed appointment, no-show rate, and bookings by source (search, ads, WhatsApp).",
  },
  {
    title: "High-End Residential Launch Lead Qualification",
    category: "Real Estate",
    icon: Building2,
    challenge:
      "Property sales teams often spend most of their time on unqualified portal enquiries instead of serious buyers.",
    architecture: [
      "Custom project microsite built with Next.js featuring floor plans and video walkthroughs",
      "Meta and Google Ads with focused audience segmentation",
      "Two-step WhatsApp verification requiring budget confirmation before brochure unlock",
      "Instant webhook dispatch notifying senior relationship managers",
    ],
    outcomesTracked:
      "Cost per qualified lead, lead-to-site-visit ratio, and response time to each new enquiry.",
  },
  {
    title: "Precision Engineering SME Industrial RFQ Engine",
    category: "Manufacturing",
    icon: Factory,
    challenge:
      "Many industrial manufacturers rely only on word-of-mouth and trade shows, with no inbound digital channel for procurement teams.",
    architecture: [
      "Re-engineered corporate catalogue with precise technical tolerances and material specifications",
      "Technical B2B SEO targeting exact component keywords and OEM part queries",
      "Dedicated RFQ submission portal supporting drawing and CAD file uploads",
      "Automated email dispatch to the engineering estimation desk",
    ],
    outcomesTracked:
      "Monthly inbound RFQs, RFQ source (search, referral, direct), and quote turnaround time.",
  },
];

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Solution Blueprints"
          title="How We Build Growth Systems"
          description="These are the blueprints we deploy for common industry challenges. Client case studies will be published only with written consent and real analytics data."
        />

        {/* Transparency Alert */}
        <div className="mb-12 p-5 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] text-xs sm:text-sm text-[#0082CA] flex items-start gap-3 max-w-4xl mx-auto">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-[#0082CA]" />
          <div>
            <strong>Honest note:</strong> The examples below are solution blueprints — typical challenges and the
            systems we build to solve them — not client results. Under our Zero Fabricated Proof Policy, we will
            publish real case studies only with client approval and genuine analytics. Live walkthroughs are available on request.
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
                      Typical Challenge:
                    </strong>
                    <p>{arch.challenge}</p>
                  </div>

                  <div>
                    <strong className="text-[#0D2040] block mb-2">
                      Blueprint:
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

                  <div className="p-3.5 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-xs text-[#0D2040] font-medium">
                    <strong>What we measure:</strong> {arch.outcomesTracked}
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
            Want to See a Live Blueprint Demo?
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

