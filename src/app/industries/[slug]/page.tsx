import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { industriesData } from "@/content/industries";
import { siteConfig } from "@/lib/site-config";
import { ProtectedWhatsApp } from "@/components/ui/ProtectedContact";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import BuildersReelPlayer from "@/components/ui/BuildersReelPlayer";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData[slug];
  if (!industry) return { title: "Industry Not Found" };

  return {
    title: `${industry.title} Digital Growth`,
    description: industry.summary,
    alternates: {
      canonical: `${siteConfig.url}/industries/${slug}`,
    },
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const ind = industriesData[slug];

  if (!ind) {
    notFound();
  }

  const heroImageSrc = slug.includes("retail")
    ? "/images/industries/retail-services.jpg"
    : `/images/industries/${slug}.jpg`;

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <Container>
          <div className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0082CA]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/industries" className="hover:text-[#0082CA]">Industries</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0D2040] font-semibold">{ind.title}</span>
          </div>
        </Container>
      </div>

      {/* High-Impact 2-Column Hero Section */}
      <section className="bg-gradient-to-b from-[#F0F8FF] via-white to-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Copy & Proper CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-bold text-[#0082CA] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#0082CA] animate-pulse" />
                <span>Sector Growth Architecture</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight mb-2 leading-tight">
                {ind.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#0082CA] font-bold">
                {ind.headline}
              </p>

              <p className="text-base text-[#475569] leading-relaxed">
                {ind.summary}
              </p>

              {/* Trust highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0" />
                  <span>Custom High-Speed Landing Page</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0" />
                  <span>Instant Automated WhatsApp Triage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0" />
                  <span>Full CRM &amp; Webhook Pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0" />
                  <span>Zero Fabricated Proof Policy</span>
                </div>
              </div>

              {/* Proper Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Button href="/contact" variant="teal" size="md">
                  <span>Schedule Sector Strategy Call</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>

                <ProtectedWhatsApp
                  message={siteConfig.whatsapp.messages.industry(ind.title)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Query</span>
                </ProtectedWhatsApp>

                <Button href="/free-audit" variant="secondary" size="md">
                  <span>Request Sector Audit</span>
                </Button>
              </div>
            </div>

            {/* Right Column: Hero Mockup Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#0082CA]/20 via-[#F58220]/15 to-transparent rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl group">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={heroImageSrc}
                      alt={`${ind.title} Digital System Hero Mockup`}
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
                      <span className="font-bold text-[#0D2040] truncate max-w-[200px]">{ind.title}</span>
                    </div>
                    <span className="font-mono text-[#0082CA] font-bold text-[11px] bg-[#F0F8FF] px-2.5 py-1 rounded-md border border-[#BAE6FD] shrink-0">
                      Sector Engine
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Details */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {/* Featured 4K Reel for Real Estate & Builders */}
              {slug === "real-estate" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D2040] via-[#0A1931] to-[#071326] text-white shadow-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#F58220] to-[#E1306C] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Featured 60s Instagram Reel</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                        Watch: How Builders &amp; Developers Win Qualified Buyer Enquiries Online
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Watch this 60-second presenter breakdown explaining how Min Murasu builds high-speed project landing pages, runs hyper-targeted Meta &amp; Google ad campaigns, and automates instant WhatsApp brochure qualification for builders in Coimbatore, Chennai, and Bengaluru.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-xs">
                        <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10">
                          ✓ Sub-second project landing pages
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10">
                          ✓ Automated WhatsApp brochure bots
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-5 flex justify-center">
                      <BuildersReelPlayer />
                    </div>
                  </div>
                </div>
              )}

              {/* Typical Pain Points */}
              <div>
                <h2 className="text-xl font-bold text-[#0D2040] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Common Commercial Roadblocks in This Sector</span>
                </h2>
                <div className="space-y-3">
                  {ind.industryProblems.map((prob) => (
                    <div
                      key={prob}
                      className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs sm:text-sm text-[#475569]"
                    >
                      {prob}
                    </div>
                  ))}
                </div>
              </div>

              {/* The Sector Playbook */}
              <div>
                <h2 className="text-xl font-bold text-[#0D2040] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#0082CA]" />
                  <span>The MIN MURASU Growth Architecture</span>
                </h2>
                <div className="space-y-4">
                  {ind.growthPlaybook.map((gp, idx) => (
                    <div
                      key={gp.title}
                      className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0D2040] mb-1">
                          {gp.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                          {gp.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h2 className="text-xl font-bold text-[#0D2040] mb-4">
                  What We Deliver for This Industry
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ind.keyDeliverables.map((d) => (
                    <div
                      key={d}
                      className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Metrics Box */}
              <div className="p-6 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0082CA] mb-3">
                  Key Metrics We Track:
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {ind.metricsTracked.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation Card */}
              <div className="p-6 rounded-2xl bg-[#0D2040] text-white">
                <div className="flex items-center gap-2 text-xs text-[#38BDF8] font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Free Consultation</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Request an Industry Audit
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Let’s analyze how competitors in your market are acquiring customers and how you can outperform them.
                </p>
                <Button href="/contact" variant="teal" size="sm" className="w-full justify-center">
                  Book a Consultation
                </Button>
              </div>

              {/* Direct Phone / Call Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0D2040] mb-1">
                  <PhoneCall className="w-4 h-4 text-[#0082CA]" />
                  <span>Direct Founder Access</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Discuss your commercial goals directly with Karthikeyan T.
                </p>
                <a
                  href={`tel:${siteConfig.phones.primaryE164}`}
                  className="text-xs font-bold text-[#0082CA] hover:underline"
                >
                  {siteConfig.phones.primaryDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Full-Width CTA Banner */}
          <div className="mt-16 text-center bg-[#0D2040] text-white p-8 sm:p-12 rounded-3xl">
            <div className="w-12 h-12 rounded-xl bg-[#0082CA] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Deploy This Growth Architecture for Your {ind.title}?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
              We build specialized high-converting landing pages, targeted Google &amp; Meta ad funnels, and automated WhatsApp triage bots tailored specifically to {ind.title}.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="teal" size="md">
                Schedule a Consultation
              </Button>
              <Button href="/free-audit" variant="secondary" size="md">
                Request Free Sector Audit
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
