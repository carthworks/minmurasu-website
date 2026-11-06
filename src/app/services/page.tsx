import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { servicesData } from "@/content/services";
import {
  Compass,
  Search,
  Bot,
  Share2,
  TrendingUp,
  Code2,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Growth & Automation Services",
  description:
    "Explore MIN MURASU's specialized B2B services: Digital Strategy, Technical SEO, Generative Engine Optimisation (GEO), Paid Ads, Web Development, and AI Automation.",
};

const iconMap = {
  "digital-strategy": Compass,
  "seo-local-seo": Search,
  "generative-engine-optimisation": Bot,
  "social-media-content": Share2,
  "google-meta-ads": TrendingUp,
  "website-landing-pages": Code2,
  "ai-business-automation": Cpu,
};

export default function ServicesPage() {
  const serviceList = Object.values(servicesData);

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Integrated Service Suite"
          title="Digital Growth, Powered by Intelligent Technology"
          description="We combine marketing strategy, modern web engineering, and practical AI automation into synchronized systems that deliver measurable business growth."
        />

        <div className="space-y-12">
          {serviceList.map((service, index) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] || Compass;
            return (
              <div
                key={service.slug}
                id={service.slug}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs hover:border-[#0082CA]/50 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-4 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Service 0{index + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-[#0D2040] mt-1">
                      {service.title}
                    </h2>
                    <p className="text-xs font-medium text-[#0082CA] mt-1">
                      {service.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {service.heroDescription}
                  </p>
                  <div className="pt-2">
                    <Button
                      href={`/services/${service.slug}`}
                      variant="teal"
                      size="sm"
                      className="inline-flex items-center gap-1.5"
                    >
                      <span>Explore Inclusions &amp; Process</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-8 bg-slate-50/70 rounded-2xl p-6 sm:p-7 border border-slate-200/80 space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Core Deliverables:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.deliverables.slice(0, 4).map((d) => (
                        <div key={d} className="flex items-start gap-2 text-xs text-[#475569]">
                          <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-[#0D2040] block mb-1">
                        Business Problem Addressed:
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {service.problem}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-[#0D2040] block mb-1">
                        Best Suited For:
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {service.whoItsFor[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom consultation prompt */}
        <div className="mt-16 text-center bg-[#F0F8FF] p-8 sm:p-10 rounded-3xl border border-[#BAE6FD]">
          <h3 className="text-xl font-bold text-[#0D2040] mb-2">
            Not sure which capability your business needs first?
          </h3>
          <p className="text-sm text-[#475569] max-w-xl mx-auto mb-6">
            We will review your current website, traffic, and sales workflow during a free 30-minute discovery consultation.
          </p>
          <Button href="/contact" variant="teal" size="md">
            Book a Free Consultation
          </Button>
        </div>
      </Container>
    </div>
  );
}

