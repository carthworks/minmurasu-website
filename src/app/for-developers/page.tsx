import React from "react";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Code2, LineChart, Megaphone, Target, XCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import SprintApplyForm from "./SprintApplyForm";
import { sprintOffer } from "./sprint-offer";
import { CurrencyToggle, Price, TaxNote } from "@/components/ui/CurrencyToggle";

export const metadata: Metadata = {
  title: "Distribution Sprint for Developers: Get Your Product to Paying Customers",
  description:
    "A fixed-price, 14-day sprint for developers who shipped a product but can't get paying customers: positioning, a landing page that converts, real analytics, and one distribution channel launched.",
  alternates: {
    canonical: `${siteConfig.url}/for-developers`,
  },
  openGraph: {
    title: "You shipped it. Now let's get it paid for.",
    description:
      "A 14-day, fixed-price distribution sprint for developers with a shipped product and no growth.",
    url: `${siteConfig.url}/for-developers`,
    siteName: siteConfig.name,
    locale: siteConfig.seo.locale,
    type: "website",
    images: [{ url: siteConfig.brand.ogImage, width: 1200, height: 630, alt: "Distribution Sprint for Developers | MIN MURASU" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: "You shipped it. Now let's get it paid for.",
    description:
      "A 14-day, fixed-price distribution sprint for developers with a shipped product and no growth.",
    images: [siteConfig.brand.ogImage],
  },
};

const pains = [
  "You shipped. A launch post got some upvotes. Then signups flatlined.",
  "Your landing page explains how it works, not why anyone should pay.",
  "You don't know which channel to try, so you keep building features instead.",
  "Analytics is either missing or tells you nothing you can act on.",
];

const sprintWeeks = [
  {
    icon: Target,
    label: "Days 1–3",
    title: "Positioning & pricing",
    items: [
      "Interview review: who actually signed up and who paid",
      "One-sentence positioning and a sharper ideal customer",
      "Pricing page sanity check",
    ],
  },
  {
    icon: Code2,
    label: "Days 4–7",
    title: "Landing page that converts",
    items: [
      "Rewritten hero, proof and CTA, shipped to your repo or CMS",
      "Signup and checkout friction removed",
      "Technical SEO and AI-search basics fixed",
    ],
  },
  {
    icon: LineChart,
    label: "Days 6–8",
    title: "Analytics you can act on",
    items: [
      "Events from visit → signup → activation → paid",
      "Consent-aware GA4 / PostHog setup",
      "A one-page weekly dashboard",
    ],
  },
  {
    icon: Megaphone,
    label: "Days 9–14",
    title: "One channel, launched",
    items: [
      "Pick one: SEO content, a community launch, or targeted cold outreach",
      "First assets written and shipped with you",
      "A 30-day playbook so you can keep going alone",
    ],
  },
];

const goodFit = [
  "You've shipped a working product (SaaS, dev tool, app, or API)",
  "You have under $5k MRR and growth has stalled",
  "You can give 3–4 hours a week for calls and approvals",
  "You want to learn the distribution work, not just outsource it",
];

const notFit = [
  "You haven't shipped yet (build first, then talk to me)",
  "You want guaranteed revenue numbers (nobody honest can promise that)",
  "You want ads run on a monthly retainer",
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Why a fixed-price sprint instead of a retainer?",
    a: "Most developer products don't need months of agency work. They need clear positioning, a page that converts, and one channel that works. Two weeks is enough to find out whether yours does.",
  },
  {
    q: "Will you touch my code?",
    a: "Only if you want me to. I can open pull requests for landing page and analytics changes, or hand you the copy and event spec to ship yourself.",
  },
  {
    q: "What does the founding price involve?",
    a: (
      <>
        The first {sprintOffer.foundingSlots} clients pay <Price amounts={sprintOffer.price} />
        {sprintOffer.regularPrice && (
          <>
            {" "}instead of <Price amounts={sprintOffer.regularPrice} />
          </>
        )}
        . In return, I write up what we did and what happened as a public case study (numbers shared only with
        your approval).
      </>
    ),
  },
  {
    q: "What if it doesn't work?",
    a: "You keep every asset: positioning, page, tracking, and playbook. And you'll know which channel not to spend the next six months on, which is worth something too.",
  },
];

export default function ForDevelopersPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-[#0D2040] text-white">
        <Container className="max-w-4xl text-center">
          <span className="inline-block text-xs uppercase font-extrabold tracking-wider text-[#F58220] bg-white/5 border border-white/15 px-3 py-1 rounded-full mb-5">
            For developers who already shipped
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-5">
            Building is the easy part now.
            <br className="hidden sm:block" /> Let&apos;s get your product in front of paying customers.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            A {sprintOffer.durationDays}-day, fixed-price {sprintOffer.name}, run by a developer who
            has been stuck in the same loop. Positioning, a landing page that converts, analytics
            you can trust, and one distribution channel launched.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="#apply" variant="orange" size="lg" className="inline-flex items-center gap-2 justify-center">
              Apply for a founding slot <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="#sprint" variant="outline" size="lg" className="justify-center text-white! border-white/30! hover:bg-white/10!">
              See what&apos;s included
            </Button>
          </div>
          <p className="mt-5 text-xs text-slate-400">
            {sprintOffer.foundingSlots} founding slots at <Price amounts={sprintOffer.price} /> · No retainer · You
            keep everything
          </p>
        </Container>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="The product works. Nobody's paying."
            description="AI made shipping fast and cheap. That also means every niche now has ten products, and the one people find wins, not the best-built one."
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pains.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-5 text-sm text-[#334155]">
                <XCircle className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Sprint */}
      <section id="sprint" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24">
        <Container className="max-w-5xl">
          <SectionHeading
            eyebrow={`The ${sprintOffer.name}`}
            title={`${sprintOffer.durationDays} days, four outcomes`}
            description="Scoped like a sprint, not an agency engagement. You get working assets in your stack, not a slide deck."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sprintWeeks.map(({ icon: Icon, label, title, items }) => (
              <div key={title} className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">{label}</span>
                    <h3 className="text-lg font-bold text-[#0D2040]">{title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[#0082CA] shrink-0 mt-0.5" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Fit */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <SectionHeading eyebrow="Fit check" title="Who this is for (and who it isn't)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-7">
              <h3 className="font-bold text-[#0D2040] mb-4">Good fit</h3>
              <ul className="space-y-2.5">
                {goodFit.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm text-[#334155]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <h3 className="font-bold text-[#0D2040] mb-4">Not a fit</h3>
              <ul className="space-y-2.5">
                {notFit.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm text-[#334155]">
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Price */}
      <section className="py-16 sm:py-20 bg-[#F0F8FF]">
        <Container className="max-w-xl text-center">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#0082CA]">Founding price</span>
          <CurrencyToggle className="mt-4" showNote={false} />
          <div className="mt-5 flex items-baseline justify-center gap-3">
            <span className="text-5xl font-black text-[#0D2040]">
              <Price amounts={sprintOffer.price} />
            </span>
            {sprintOffer.regularPrice && (
              <span className="text-lg text-slate-400 line-through">
                <Price amounts={sprintOffer.regularPrice} />
              </span>
            )}
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            <TaxNote />
          </p>
          <p className="mt-3 text-sm text-[#475569]">{sprintOffer.priceNote}</p>
          <p className="mt-1 text-sm text-[#475569]">One-time. No retainer. You own every asset.</p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Straight answers" />
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-slate-200 p-5 open:bg-slate-50">
                <summary className="cursor-pointer list-none font-bold text-[#0D2040] flex justify-between gap-4">
                  {q}
                  <span className="text-[#0082CA] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#475569] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Apply */}
      <section id="apply" className="py-16 sm:py-24 bg-slate-50 scroll-mt-24">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Apply"
            title="Tell me about your product"
            description="Five minutes. I read every application myself and only take products I think I can actually help."
          />
          <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
            <SprintApplyForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
