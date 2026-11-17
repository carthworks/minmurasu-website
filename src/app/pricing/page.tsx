import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import PricingPlans from "@/components/sections/PricingPlans";
import { siteConfig, absoluteUrl } from "@/lib/site-config";
import { formatPrice, getPlan, plans } from "@/content/pricing";
import { ShieldCheck, ArrowRight, HelpCircle, FileText, Calculator, Check, Minus } from "lucide-react";

const startingMonthly = formatPrice(getPlan("local-visibility").price.INR, "INR");

export const metadata: Metadata = {
  title: "Pricing: Digital Marketing Plans in INR & USD",
  description: `Published prices for SEO, Google & Meta Ads, AI search and automation. Monthly plans from ${startingMonthly}/month, one-time website and developer sprint projects. No ad spend markup.`,
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
  openGraph: {
    title: "Pricing & Plans | MIN MURASU",
    description: `Five published plans in INR and USD. Monthly plans from ${startingMonthly}/month. No lock-in, no ad spend markup.`,
    url: `${siteConfig.url}/pricing`,
    type: "website",
  },
};

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

/** Columns follow the order of `plans`; true = included, false = not included, string = detail. */
const comparisonRows: { capability: string; cells: Record<string, string | boolean> }[] = [
  {
    capability: "Website & landing pages",
    cells: {
      "local-visibility": "Location page",
      "growth-engine": "1 page or CRO test / month",
      "scale-automation": "Custom pages & portals",
      "digital-foundation": "Full 5–8 page build",
      "distribution-sprint": "Landing page rewrite",
    },
  },
  {
    capability: "Technical & local SEO",
    cells: {
      "local-visibility": "1 location, monthly",
      "growth-engine": "Monthly",
      "scale-automation": "Multi-location",
      "digital-foundation": "Initial setup",
      "distribution-sprint": "Quick fixes",
    },
  },
  {
    capability: "AI search (GEO) content",
    cells: {
      "local-visibility": false,
      "growth-engine": "2 pages / month",
      "scale-automation": "Content + entity work",
      "digital-foundation": "Baseline schema",
      "distribution-sprint": false,
    },
  },
  {
    capability: "Paid ads management",
    cells: {
      "local-visibility": "Google Search",
      "growth-engine": "Google + Meta",
      "scale-automation": "All channels",
      "digital-foundation": "Tag setup only",
      "distribution-sprint": false,
    },
  },
  {
    capability: "Conversion tracking",
    cells: {
      "local-visibility": "Calls, WhatsApp, forms",
      "growth-engine": "+ CRM loop to ad platforms",
      "scale-automation": "+ server-side tracking",
      "digital-foundation": "GA4 + GTM",
      "distribution-sprint": "Visit → signup → paid",
    },
  },
  {
    capability: "WhatsApp & CRM automation",
    cells: {
      "local-visibility": false,
      "growth-engine": "Lead routing",
      "scale-automation": "AI assistant & flows",
      "digital-foundation": "Click-to-chat",
      "distribution-sprint": false,
    },
  },
  {
    capability: "Reporting & reviews",
    cells: {
      "local-visibility": "Monthly report",
      "growth-engine": "Dashboard + monthly call",
      "scale-automation": "Dashboard + fortnightly call",
      "digital-foundation": "Handover report",
      "distribution-sprint": "30-day playbook",
    },
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-4 h-4 text-emerald-600" aria-label="Included" />;
  if (value === false) return <Minus className="w-4 h-4 text-slate-300" aria-label="Not included" />;
  return <>{value}</>;
}

export default function PricingPage() {
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${siteConfig.name} plans`,
    url: absoluteUrl("/pricing"),
    itemListElement: plans.flatMap((p) =>
      (["INR", "USD"] as const).map((currency) => ({
        "@type": "Offer",
        name: p.name,
        description: p.tagline,
        price: p.price[currency],
        priceCurrency: currency,
        eligibleRegion: currency === "INR" ? { "@type": "Country", name: "India" } : undefined,
        ...(p.kind === "monthly"
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: p.price[currency],
                priceCurrency: currency,
                billingDuration: "P1M",
              },
            }
          : {}),
        seller: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      }))
    ),
  };

  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-[#F0F8FF]/60 via-white to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }} />
      <Container>
        {/* Hero Header */}
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="Published Prices. Clear Deliverables. Zero Hidden Markups."
          description="Five plans, priced in rupees for India and in dollars for international clients. Pick a monthly growth plan or a one-time project; the free audit confirms which one fits before you pay anything."
        />

        {/* Five plans with currency toggle */}
        <div className="mb-20">
          <PricingPlans />
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
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-[#0D2040]">Compare all five plans</h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              What each plan includes, side by side. Scroll sideways on small screens.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200/90 shadow-xs">
            <table className="w-full min-w-[860px] text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0D2040] text-white">
                  <th scope="col" className="p-4 font-bold">Capability</th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={`p-4 font-bold ${p.featured ? "text-[#F58220]" : ""}`}
                    >
                      {p.name}
                      <span className="block text-[11px] font-medium text-slate-400">
                        {p.kind === "monthly" ? "Monthly" : "One-time"}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonRows.map((row) => (
                  <tr key={row.capability} className="hover:bg-slate-50/80">
                    <th scope="row" className="p-4 font-bold text-[#0D2040]">
                      {row.capability}
                    </th>
                    {plans.map((p) => (
                      <td
                        key={p.id}
                        className={`p-4 ${
                          p.featured ? "font-semibold text-[#0082CA] bg-[#F0F8FF]/40" : "text-[#475569]"
                        }`}
                      >
                        <Cell value={row.cells[p.id] ?? false} />
                      </td>
                    ))}
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

        {/* Not sure which plan */}
        <div className="max-w-4xl mx-auto bg-[#0D2040] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F58220] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Not Sure Which Plan Fits?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Start With a Free Digital Presence Audit First.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            We inspect your current website, search rankings, and lead workflow, then recommend
            the plan that fits, so you only pay for capabilities that will actually move the
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
