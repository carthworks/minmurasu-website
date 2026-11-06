import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { industriesData } from "@/content/industries";
import {
  Stethoscope,
  Building2,
  Factory,
  GraduationCap,
  Store,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industry Growth Solutions",
  description:
    "Tailored digital marketing, web engineering, and AI automation for Healthcare, Real Estate, Manufacturing, Education, and Retail sectors.",
};

const iconMap = {
  "healthcare-clinics": Stethoscope,
  "real-estate": Building2,
  "manufacturing-industrial": Factory,
  "education-training": GraduationCap,
  "retail-services": Store,
};

export default function IndustriesPage() {
  const industries = Object.values(industriesData);

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Target Verticals"
          title="Engineered for Your Industry's Commercial Reality"
          description="We avoid one-size-fits-all digital marketing. Each sector requires distinct positioning, compliance considerations, and conversion paths."
        />

        <div className="space-y-12">
          {industries.map((ind) => {
            const Icon = iconMap[ind.slug as keyof typeof iconMap] || Building2;
            return (
              <div
                key={ind.slug}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs hover:border-[#0E7490]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0E7490] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#14243A]">
                      {ind.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#0E7490] mt-1">
                      {ind.headline}
                    </p>
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {ind.summary}
                  </p>
                  <div className="pt-2">
                    <Button
                      href={`/industries/${ind.slug}`}
                      variant="teal"
                      size="sm"
                      className="inline-flex items-center gap-1.5"
                    >
                      <span>Explore Sector Playbook</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-50/70 rounded-2xl p-6 sm:p-7 border border-slate-200/80 space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                      Proven Growth Playbook:
                    </h3>
                    <div className="space-y-3">
                      {ind.growthPlaybook.map((play) => (
                        <div key={play.title} className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                          <div className="text-xs font-bold text-[#14243A] mb-0.5">
                            {play.title}
                          </div>
                          <div className="text-xs text-[#475569]">
                            {play.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Key Deliverables Included:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475569]">
                      {ind.keyDeliverables.map((kd) => (
                        <div key={kd} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7490] shrink-0" />
                          <span>{kd}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

