import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import GrowthSystem from "@/components/sections/GrowthSystem";
import Process from "@/components/sections/Process";
import AISection from "@/components/sections/AISection";
import MeasurementSection from "@/components/sections/MeasurementSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FinalCTA from "@/components/sections/FinalCTA";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Approach | 5-Stage Digital Growth & AI Automation Architecture",
  description:
    "Explore MIN MURASU's disciplined 5-stage digital growth methodology combining SEO, GEO, high-speed web engineering, and AI enquiry automation.",
  alternates: {
    canonical: "/approach",
  },
};

export default function ApproachPage() {
  return (
    <div>
      {/* Dedicated Approach Page Header */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#F0F8FF] via-white to-white border-b border-slate-100">
        <Container className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BAE6FD] shadow-2xs text-xs font-extrabold uppercase tracking-wider text-[#0D2040] mb-5">
            <Layers className="w-3.5 h-3.5 text-[#F58220]" />
            <span>Our Operating Methodology</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight mb-4 leading-tight">
            How We Turn Digital Attention Into Measurable Business Growth.
          </h1>

          <div className="w-24 h-1.5 bg-[#F58220] mx-auto rounded-full mb-6" />

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8">
            Disconnected campaigns waste budget. We engineer an end-to-end growth
            system where search visibility, paid acquisition, conversion-ready Next.js
            websites, and WhatsApp/CRM automation work as one unified pipeline.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#0D2040] mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA]" />
              <span>01. Digital Marketing</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA]" />
              <span>02. Lead Generation</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA]" />
              <span>03. Conversion &amp; Sales</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA]" />
              <span>04. AI Automation</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA]" />
              <span>05. Business Growth</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="orange" size="md">
              <span>Request a Growth Architecture Audit</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/services" variant="outline" size="md">
              Explore Individual Services
            </Button>
          </div>
        </Container>
      </section>

      {/* 1. The 5-Stage Growth Architecture (Business Card Back Visual) */}
      <GrowthSystem />

      {/* 2. The 5-Stage Engagement Delivery Process */}
      <Process />

      {/* 3. Practical AI & Enquiry Workflow Automation */}
      <AISection />

      {/* 4. Transparent Measurement & Attribution Stack */}
      <MeasurementSection />

      {/* 5. Why Work With MIN MURASU */}
      <WhyChooseUs />

      {/* 6. Final Call to Action */}
      <FinalCTA />
    </div>
  );
}

