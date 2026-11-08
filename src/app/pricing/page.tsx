import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { ProtectedWhatsApp } from "@/components/ui/ProtectedContact";
import {
  CheckCircle2,
  ShieldCheck,
  Code2,
  TrendingUp,
  Cpu,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Sparkles,
  FileText,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Engagement Models",
  description:
    "Transparent engagement models, deliverable-based project scopes, and monthly digital growth retainers from MIN MURASU. Zero hidden fees or ad spend markups.",
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
};

const engagementTiers = [
  {
    badge: "One-Time Engineering & Setup",
    name: "Digital Foundation & Web Launch",
    subtitle: "Best for businesses launching or upgrading their website, tracking, and local search presence.",
    billingModel: "Milestone-Based Project Fee",
    timeline: "Typical Delivery: 2 – 4 Weeks",
    icon: Code2,
    featured: false,
    ctaLabel: "Request Foundation Proposal",
    ctaHref: "/contact",
    whatsappMsg:
      "Hello MIN MURASU, I would like a proposal for the Digital Foundation & Web Launch package.",
    inclusions: [
      "Custom Next.js responsive business website or high-converting landing pages",
      "Technical SEO foundation, sitemap, schema.org JSON-LD & Google Search Console setup",
      "Google Business Profile (Local SEO) optimization for Coimbatore / Chennai / regional markets",
      "GA4 & Google Tag Manager conversion tracking setup",
      "Anti-spam lead capture forms + direct WhatsApp enquiry button integration",
      "100% code, domain, and analytics ownership upon completion",
    ],
  },
  {
    badge: "Most Popular • Monthly Growth Engine",
    name: "Performance & SEO Growth Retainer",
    subtitle: "Best for clinics, real estate, education, and B2B companies seeking consistent monthly enquiries.",
    billingModel: "Monthly Retainer (15-Day Notice, No Lock-In Traps)",
    timeline: "Recommended Commitment: 3 – 6 Months",
    icon: TrendingUp,
    featured: true,
    ctaLabel: "Get a Custom Retainer Quote",
    ctaHref: "/contact",
    whatsappMsg:
      "Hello MIN MURASU, I would like a quote for the Monthly Performance & SEO Growth Retainer.",
    inclusions: [
      "Dedicated Digital Strategy roadmap & monthly campaign calendar",
      "Search Engine Optimisation (SEO) & Generative Engine Optimisation (GEO for ChatGPT/Gemini)",
      "Google Search Ads & Meta Ads campaign management, A/B testing & ROI optimization",
      "Landing page conversion rate optimization (CRO) & ongoing technical maintenance",
      "Social media content direction & high-impact brand publishing",
      "Live Looker Studio / GA4 reporting dashboard + monthly executive review call",
    ],
  },
  {
    badge: "End-to-End Architecture",
    name: "Custom AI & Revenue Automation",
    subtitle: "Best for organizations scaling high enquiry volumes across WhatsApp, CRM, and multi-location sales teams.",
    billingModel: "Custom Scope + Optional Support Retainer",
    timeline: "Scoped After Technical Discovery",
    icon: Cpu,
    featured: false,
    ctaLabel: "Scope Your AI Workflow",
    ctaHref: "/contact",
    whatsappMsg:
      "Hello MIN MURASU, I would like to discuss Custom AI & Revenue Automation for our business.",
    inclusions: [
      "Website AI chat assistant trained strictly on verified company facts",
      "Automated WhatsApp Business API enquiry qualification & brochure/appointment flows",
      "Two-way CRM webhook integration (Zoho, HubSpot, LeadSquared, Salesforce, or Google Sheets)",
      "Instant lead routing & SLA notifications for sales or clinic front-desk teams",
      "Custom B2B product/RFQ catalogue engineering & server-side tracking (Meta CAPI)",
      "Dedicated engineering support & team onboarding",
    ],
  },
];

const commercialGuarantees = [
  {
    title: "0% Markup on Advertising Media Spend",
    desc: "You pay Google Ads and Meta Ads directly using your own company payment method. We never bundle or hide media spend inside our agency management fee.",
  },
  {
    title: "Third-Party Software Billed at Exact Cost",
    desc: "Domain renewals, cloud hosting, CRM licenses, and Meta WhatsApp API conversation charges are billed directly by the vendor at cost.",
  },
  {
    title: "100% Client Asset Ownership",
    desc: "From Day 1, your business owns your domain, website source code, Google Analytics, Google Ads, and Meta Business Manager accounts.",
  },
  {
    title: "Simple 15-Day Retainer Cancellation",
    desc: "No punitive annual lock-ins. Monthly retainers can be paused or cancelled with 15 calendar days' written notice prior to the next billing cycle.",
  },
];

const comparisonRows = [
  {
    capability: "Initial Digital Presence & Funnel Audit",
    foundation: "Included",
    retainer: "Included",
    customAi: "Included",
  },
  {
    capability: "Next.js Website / Landing Page Engineering",
    foundation: "Full Build",
    retainer: "Ongoing CRO & Landing Pages",
    customAi: "Custom Web Apps & Portals",
  },
  {
    capability: "Technical SEO, Local SEO & Schema Markup",
    foundation: "Initial Setup",
    retainer: "Continuous Monthly Execution",
    customAi: "Enterprise / Programmatic SEO",
  },
  {
    capability: "Generative Engine Optimisation (GEO / AI Search)",
    foundation: "Baseline Schema",
    retainer: "Active Citation & Content Optimization",
    customAi: "Full Entity & Knowledge Graph Setup",
  },
  {
    capability: "Google Ads & Meta Ads Campaign Management",
    foundation: " Pixel & Tag Setup",
    retainer: "Full Campaign Management",
    customAi: "Multi-Channel + Server-Side CAPI",
  },
  {
    capability: "WhatsApp & CRM Lead Automation",
    foundation: "Direct Click-to-Chat + Lead Forms",
    retainer: "Webhook Lead Routing",
    customAi: "Custom AI Chatbots & Multi-Step Flows",
  },
  {
    capability: "Reporting & Performance Reviews",
    foundation: "Launch Handover Report",
    retainer: "Live Dashboard + Monthly Review",
    customAi: "Custom Attribution & SLA Dashboards",
  },
];

export default function PricingPage() {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-[#F0F8FF]/60 via-white to-white">
      <Container>
        {/* Hero Header */}
        <SectionHeading
          eyebrow="Transparent Commercial Models"
          title="Deliverable-Based Pricing. Zero Hidden Markups."
          description="Every business has a different starting point, market competition, and sales capacity. We structure engagements around clear deliverables and measurable outcomes—never vague packages."
        />

        {/* 3 Core Engagement Models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 items-stretch">
          {engagementTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  tier.featured
                    ? "bg-[#0D2040] text-white border-2 border-[#F58220] shadow-2xl lg:-translate-y-2"
                    : "bg-white text-[#0D2040] border border-slate-200/90 shadow-xs hover:border-[#0082CA]/50"
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                        tier.featured
                          ? "bg-[#F58220] text-white"
                          : "bg-[#F0F8FF] text-[#0082CA] border border-[#BAE6FD]"
                      }`}
                    >
                      {tier.featured && <Sparkles className="w-3 h-3" />}
                      <span>{tier.badge}</span>
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        tier.featured
                          ? "bg-white/10 text-[#F58220]"
                          : "bg-[#F0F8FF] text-[#0082CA] border border-[#BAE6FD]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Tier Title & Subtitle */}
                  <h2
                    className={`text-2xl font-black tracking-tight mb-2 ${
                      tier.featured ? "text-white" : "text-[#0D2040]"
                    }`}
                  >
                    {tier.name}
                  </h2>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                      tier.featured ? "text-slate-300" : "text-[#475569]"
                    }`}
                  >
                    {tier.subtitle}
                  </p>

                  {/* Billing & Timeline Pill */}
                  <div
                    className={`p-4 rounded-2xl mb-6 border ${
                      tier.featured
                        ? "bg-slate-800/80 border-slate-700 text-slate-200"
                        : "bg-slate-50 border-slate-200/80 text-slate-700"
                    }`}
                  >
                    <div className="text-[11px] uppercase font-bold tracking-wider text-[#F58220] mb-0.5">
                      Commercial Structure
                    </div>
                    <div
                      className={`text-sm font-extrabold ${
                        tier.featured ? "text-white" : "text-[#0D2040]"
                      }`}
                    >
                      {tier.billingModel}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        tier.featured ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {tier.timeline}
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-8">
                    <div
                      className={`text-xs font-extrabold uppercase tracking-wider ${
                        tier.featured ? "text-[#38BDF8]" : "text-[#0D2040]"
                      }`}
                    >
                      What’s Included:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm">
                      {tier.inclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              tier.featured ? "text-[#F58220]" : "text-[#0082CA]"
                            }`}
                          />
                          <span
                            className={
                              tier.featured ? "text-slate-200" : "text-[#475569]"
                            }
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200/20">
                  <Button
                    href={tier.ctaHref}
                    variant={tier.featured ? "orange" : "navy"}
                    size="md"
                    className="w-full justify-center font-bold"
                  >
                    <span>{tier.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>

                  <ProtectedWhatsApp
                    message={tier.whatsappMsg}
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors ${
                      tier.featured
                        ? "bg-white/10 text-emerald-300 hover:bg-white/15"
                        : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask About This Model on WhatsApp</span>
                  </ProtectedWhatsApp>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive ROI Calculator Callout Banner */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative rounded-3xl p-8 sm:p-10 bg-linear-to-r from-[#0D2040] via-[#1E3A8A] to-[#0082CA] text-white shadow-xl overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#F58220]/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-sky-200">
                  <Calculator className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>Unsure About Expected Returns?</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Model Your Lead Volume &amp; Revenue Upside in 60 Seconds
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Input your monthly website visitors, current conversion rate, and average deal value into our interactive calculator to see how much pipeline revenue sub-second speed and instant WhatsApp response can unlock for your business.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <Button
                  href="/roi-calculator"
                  variant="orange"
                  size="lg"
                  className="w-full md:w-auto justify-center font-bold shadow-lg"
                >
                  <span>Launch ROI Calculator</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Capability Comparison Matrix */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-[#0D2040]">
              Side-by-Side Engagement Comparison
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              How deliverables scale across our three engagement models.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200/90 shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0D2040] text-white">
                  <th className="p-4 sm:p-5 font-bold">Capability / Deliverable</th>
                  <th className="p-4 sm:p-5 font-bold">1. Digital Foundation</th>
                  <th className="p-4 sm:p-5 font-bold text-[#F58220]">
                    2. Growth Retainer
                  </th>
                  <th className="p-4 sm:p-5 font-bold">3. Custom AI &amp; Automation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonRows.map((row) => (
                  <tr key={row.capability} className="hover:bg-slate-50/80">
                    <td className="p-4 sm:p-5 font-bold text-[#0D2040]">
                      {row.capability}
                    </td>
                    <td className="p-4 sm:p-5 text-[#475569]">{row.foundation}</td>
                    <td className="p-4 sm:p-5 font-semibold text-[#0082CA] bg-[#F0F8FF]/40">
                      {row.retainer}
                    </td>
                    <td className="p-4 sm:p-5 text-[#475569]">{row.customAi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Commercial Transparency Guarantees */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F8FF] border border-[#BAE6FD] text-xs font-extrabold uppercase tracking-wider text-[#0082CA] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F58220]" />
              <span>Commercial Integrity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2040]">
              Our 4 Unbreakable Billing Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commercialGuarantees.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0D2040] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Read our full{" "}
            <Link
              href="/refund-policy"
              className="text-[#0082CA] font-bold underline underline-offset-2"
            >
              Cancellation &amp; Refund Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="text-[#0082CA] font-bold underline underline-offset-2"
            >
              Terms &amp; Conditions
            </Link>
            .
          </div>
        </div>

        {/* Why We Don't Publish Fixed ₹9,999 "Menu Prices" */}
        <div className="max-w-4xl mx-auto bg-[#0D2040] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F58220] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Not Sure Where to Start?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Start With a Free Digital Presence Audit First.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Before quoting a single rupee, we inspect your current website, search rankings,
            and lead workflow so you only pay for capabilities that will actually move the
            needle for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/free-audit" variant="orange" size="lg" className="w-full sm:w-auto font-bold">
              <span>Get a Free Digital Presence Audit</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800"
            >
              Book a 30-Min Discovery Call
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

