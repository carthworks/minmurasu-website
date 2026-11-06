import React from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Info, Sparkles, ArrowRight, Layers } from "lucide-react";

export default function CaseStudies() {
  return (
    <section className="py-20 lg:py-28 bg-[#F0F9FF]/30 border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Portfolio & Proof"
          title="Verified Case Studies & Solution Frameworks"
          description="We respect client confidentiality and refuse to invent fake testimonials, fabricated percentages, or placeholder logos."
        />

        {/* Honest Demonstration Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs max-w-4xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0E7490] flex items-center justify-center mx-auto">
            <Layers className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              <Info className="w-3.5 h-3.5 text-[#0E7490]" />
              <span>Zero Fabricated Proof Policy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#14243A]">
              Selected Client Work &amp; Live Demonstrations Are Being Prepared
            </h3>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
              We publish client case studies exclusively with explicit written approval and
              unmodified analytics snapshots. Contact our team to review walkthroughs of
              our digital growth architectures tailored to your sector.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-xs font-bold text-[#0082CA] uppercase tracking-wider mb-1">
                Healthcare
              </div>
              <div className="text-xs font-semibold text-[#0D2040] mb-1">
                Specialty Clinic Booking Flow
              </div>
              <div className="text-[11px] text-slate-500">
                SEO + Landing Page + WhatsApp Scheduling
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-xs font-bold text-[#0082CA] uppercase tracking-wider mb-1">
                Real Estate
              </div>
              <div className="text-xs font-semibold text-[#0D2040] mb-1">
                Commercial Project Lead Funnel
              </div>
              <div className="text-[11px] text-slate-500">
                Meta Ads + Verified Buyer Verification
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-xs font-bold text-[#0082CA] uppercase tracking-wider mb-1">
                Industrial B2B
              </div>
              <div className="text-xs font-semibold text-[#0D2040] mb-1">
                Machinery RFQ Automation
              </div>
              <div className="text-[11px] text-slate-500">
                Catalogue Re-architecture + CRM Ingestion
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              href="/contact"
              variant="orange"
              size="md"
              className="inline-flex items-center gap-2 font-bold shadow-md shadow-orange-950/20"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Request a Custom Solution Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

