import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { industriesData } from "@/content/industries";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

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
    title: `${industry.title} Digital Growth | ${siteConfig.name}`,
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

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <Container>
          <div className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0E7490]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/industries" className="hover:text-[#0E7490]">Industries</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#14243A] font-semibold">{ind.title}</span>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F0F9FF] to-white pt-12 pb-16 border-b border-slate-100">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E7490] bg-white border border-[#BAE6FD] px-3 py-1 rounded-full mb-3 inline-block">
              Sector Playbook
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#14243A] tracking-tight mb-3 leading-tight">
              {ind.title}
            </h1>
            <p className="text-lg text-[#0E7490] font-semibold mb-4">
              {ind.headline}
            </p>
            <p className="text-base text-[#475569] leading-relaxed mb-8">
              {ind.summary}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="teal" size="md">
                Schedule a Sector Strategy Call
              </Button>
              <a
                href={getWhatsAppUrl(`Hi MIN MURASU, I'm interested in digital growth strategies for ${ind.title}.`)}
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

      {/* Main Details */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {/* Typical Pain Points */}
              <div>
                <h2 className="text-xl font-bold text-[#14243A] mb-4 flex items-center gap-2">
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
                <h2 className="text-xl font-bold text-[#14243A] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#0E7490]" />
                  <span>The MIN MURASU Growth Architecture</span>
                </h2>
                <div className="space-y-4">
                  {ind.growthPlaybook.map((gp, idx) => (
                    <div
                      key={gp.title}
                      className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] text-[#0E7490] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#14243A] mb-1">
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
                <h2 className="text-xl font-bold text-[#14243A] mb-4">
                  What We Deliver for This Industry
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ind.keyDeliverables.map((d) => (
                    <div
                      key={d}
                      className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0E7490] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Metrics Box */}
              <div className="p-6 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0E7490] mb-3">
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
              <div className="p-6 rounded-2xl bg-[#14243A] text-white">
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
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

