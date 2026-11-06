import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { servicesData } from "@/content/services";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  BarChart2,
  ChevronRight,
  ArrowRight,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | ${siteConfig.name}`,
    description: service.heroDescription,
    alternates: {
      canonical: `${siteConfig.url}/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <div>
      <ServiceJsonLd
        name={service.title}
        description={service.heroDescription}
        slug={service.slug}
      />
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <Container>
          <div className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0082CA]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/services" className="hover:text-[#0082CA]">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0D2040] font-semibold">{service.title}</span>
          </div>
        </Container>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F0F8FF] to-white pt-12 pb-16 border-b border-slate-100">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0082CA] bg-white border border-[#BAE6FD] px-3 py-1 rounded-full mb-3 inline-block">
              MIN MURASU Service Detail
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-[#0082CA] font-medium mb-4">
              {service.subtitle}
            </p>
            <p className="text-base text-[#475569] leading-relaxed mb-8">
              {service.heroDescription}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="teal" size="md">
                Book a Consultation for This Service
              </Button>
              <a
                href={getWhatsAppUrl(`Hi MIN MURASU, I'm interested in learning more about your ${service.title} service.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-semibold hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Main Column */}
            <div className="lg:col-span-8 space-y-16">
              {/* Problem Section */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>The Business Challenge Addressed</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0D2040] mb-4">
                  Why This Capability Matters
                </h2>
                <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-sm text-[#475569] leading-relaxed">
                  {service.problem}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0082CA] mb-2">
                  <FileText className="w-4 h-4 text-[#0082CA]" />
                  <span>Tangible Deliverables</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0D2040] mb-6">
                  What You Receive
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#0082CA] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Process */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <Clock className="w-4 h-4 text-[#0082CA]" />
                  <span>Step-by-Step Delivery</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0D2040] mb-6">
                  Our Execution Process
                </h2>
                <div className="space-y-4">
                  {service.process.map((step, idx) => (
                    <div
                      key={step.title}
                      className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0D2040] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurement */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                  <BarChart2 className="w-4 h-4 text-emerald-600" />
                  <span>Accountability</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0D2040] mb-4">
                  How Success Is Measured
                </h2>
                <div className="p-6 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-2.5">
                  {service.measurement.map((m) => (
                    <div key={m} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <HelpCircle className="w-4 h-4 text-[#0082CA]" />
                  <span>Service FAQs</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0D2040] mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50"
                    >
                      <h3 className="text-sm font-bold text-[#0D2040] mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Who It's For Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Suitable Profiles:
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {service.whoItsFor.map((w) => (
                    <li key={w} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA] shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Client Provides */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Required Client Inputs:
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {service.clientRequirements.map((cr) => (
                    <li key={cr} className="flex items-start gap-2">
                      <span className="text-[#0082CA] font-bold">&bull;</span>
                      <span>{cr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Commercial Clarity Box */}
              <div className="p-6 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0082CA] mb-2">
                  Pricing &amp; Scope Policy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Scopes and retainers are customized following discovery based on your sales targets and technical complexity. No unverified packages or hidden charges.
                </p>
                <Button href="/contact" variant="teal" size="sm" className="w-full justify-center">
                  Request Scope &amp; Proposal
                </Button>
              </div>

              {/* Related Services */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Complementary Services:
                </h3>
                <div className="space-y-2">
                  {service.relatedServices.map((relSlug) => {
                    const rel = servicesData[relSlug];
                    if (!rel) return null;
                    return (
                      <Link
                        key={relSlug}
                        href={`/services/${relSlug}`}
                        className="block p-3 rounded-lg border border-slate-100 hover:border-[#0082CA]/40 hover:bg-slate-50 transition-colors text-xs font-medium text-[#0D2040]"
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{rel.title}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

