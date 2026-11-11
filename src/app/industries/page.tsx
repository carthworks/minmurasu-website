import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import IndustriesStickyNav from "@/components/sections/IndustriesStickyNav";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { industriesData } from "@/content/industries";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  GraduationCap,
  Stethoscope,
  Store,
  MessageSquare,
} from "lucide-react";
import { ProtectedWhatsApp } from "@/components/ui/ProtectedContact";

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
  "retail-local-services": Store,
};

const canonicalSlugs = [
  "healthcare-clinics",
  "real-estate",
  "manufacturing-industrial",
  "education-training",
  "retail-services",
];

const getIndustryImage = (slug: string) => {
  if (slug.includes("retail")) {
    return "/images/industries/retail-services.jpg";
  }
  return `/images/industries/${slug}.jpg`;
};

export default function IndustriesPage() {
  const industries = canonicalSlugs
    .map((slug) => industriesData[slug])
    .filter(Boolean);

  return (
    <div>
      {/* High-Impact Hero Section */}
      <section className="bg-gradient-to-b from-[#F0F8FF] via-white to-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-bold text-[#0082CA] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#0082CA] animate-pulse" />
                <span>Sector-Specific Digital Systems</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight leading-tight">
                Engineered for Your Industry&apos;s Commercial Reality
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                Generic digital marketing burns budget on casual browsers. We build specialized patient acquisition funnels, verified property buyer landing pages, industrial RFQ pipelines, and local footfall engines customized for high-value transactions.
              </p>

              {/* Value Props / Trust Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0" />
                  <span>5 Dedicated Vertical Playbooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0" />
                  <span>Instant WhatsApp Lead Qualification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0" />
                  <span>Sub-second Mobile Landing Pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0" />
                  <span>Zero Fabricated Proof Policy</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button href="/contact" variant="teal" size="md">
                  <span>Schedule Industry Strategy Call</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button href="/free-audit" variant="secondary" size="md">
                  <span>Request Competitor Audit</span>
                </Button>
                <ProtectedWhatsApp
                  message="Hello Min Murasu team, I would like to explore the digital growth playbook for my industry."
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Query</span>
                </ProtectedWhatsApp>
              </div>
            </div>

            {/* Visual Hero Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#0082CA]/20 via-[#F58220]/15 to-transparent rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl group">
                  <div className="relative w-full aspect-video">
                    <Image
                      src="/images/industries/industries-hero.jpg"
                      alt="Min Murasu Multi-Industry Digital Growth Dashboard"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-[#0D2040]">Active Sector Architectures</span>
                    </div>
                    <span className="font-mono text-[#0082CA] font-bold text-[11px] bg-[#F0F8FF] px-2.5 py-1 rounded-md border border-[#BAE6FD]">
                      5 Verticals
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Verticals Section */}
      <div className="py-12 sm:py-20">
        <Container>
          {/* Sleek Fixed Industries Jump Bar */}
          <IndustriesStickyNav industries={industries} />

          <div className="space-y-12">
            {industries.map((ind) => {
              const Icon = iconMap[ind.slug as keyof typeof iconMap] || Building2;
              return (
                <div
                  key={ind.slug}
                  id={ind.slug}
                  className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs hover:border-[#0082CA]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-44 md:scroll-mt-48"
                >
                  <div className="lg:col-span-5 space-y-4">
                    {/* Sector Preview Image */}
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="relative block w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-900 shadow-inner group/img cursor-pointer"
                      title={`Open ${ind.title} Playbook`}
                    >
                      <Image
                        src={getIndustryImage(ind.slug)}
                        alt={`${ind.title} Playbook Preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20 group-hover/img:bg-[#0082CA] transition-colors">
                        <span>View Sector</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </Link>

                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#0D2040]">
                          {ind.title}
                        </h2>
                        <p className="text-xs font-semibold text-[#0082CA] mt-0.5">
                          {ind.headline}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[#475569] leading-relaxed">
                      {ind.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-2.5">
                      <Button
                        href={`/industries/${ind.slug}`}
                        variant="teal"
                        size="sm"
                        className="inline-flex items-center gap-1.5"
                      >
                        <span>Explore Sector Playbook</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        href="/contact"
                        variant="secondary"
                        size="sm"
                      >
                        Book Strategy Call
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
                            <div className="text-xs font-bold text-[#0D2040] mb-0.5">
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
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA] shrink-0" />
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
    </div>
  );
}
