import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { servicesData } from "@/content/services";
import ServicesStickyNav from "@/components/sections/ServicesStickyNav";
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

const canonicalOrder = [
  "digital-strategy",
  "seo-local-seo",
  "generative-engine-optimisation",
  "social-media-content",
  "google-meta-ads",
  "website-landing-pages",
  "ai-business-automation",
];

export default function ServicesPage() {
  const serviceList = canonicalOrder
    .map((slug) => servicesData[slug])
    .filter(Boolean);

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Integrated Service Suite"
          title="Digital Growth, Powered by Intelligent Technology"
          description="We combine marketing strategy, modern web engineering, and practical AI automation into synchronized systems that deliver measurable business growth."
        />

        {/* Sleek Fixed Services Jump Bar */}
        <ServicesStickyNav services={serviceList} />

        <div className="space-y-12">
          {serviceList.map((service, index) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] || Compass;
            return (
              <div
                key={service.slug}
                id={service.slug}
                className="relative overflow-hidden group bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs hover:border-[#0082CA]/50 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-44 md:scroll-mt-48"
              >
                {/* Ambient Card Background Graphic Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
                  <Image
                    src={`/images/services/${service.slug}.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="object-cover object-right-top opacity-15 sm:opacity-20 group-hover:opacity-30 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/75" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80" />
                </div>

                {/* Left Column: Visual Architecture Banner & Identity */}
                <div className="relative z-10 lg:col-span-5 space-y-4">
                  {/* Dedicated Service Architecture Visual Preview */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="relative block w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-sm group/img cursor-pointer"
                    title={`Open ${service.title} Details`}
                  >
                    <Image
                      src={`/images/services/${service.slug}.jpg`}
                      alt={`${service.title} Architecture Preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-[#0D2040]/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0082CA] animate-pulse" />
                      <span>Service 0{index + 1} Architecture</span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/65 text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20 group-hover/img:bg-[#0082CA] transition-colors">
                      <span>View Capability</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-11 h-11 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center shrink-0 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Service 0{index + 1}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0D2040] leading-snug">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-[#0082CA]">
                    {service.subtitle}
                  </p>
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

                {/* Right Column: Inclusions, Problem & Fit */}
                <div className="relative z-10 lg:col-span-7 bg-white/85 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-slate-200/90 space-y-6 shadow-xs">
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

