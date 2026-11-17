import React from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  IndianRupee,
  MessagesSquare,
  Search,
  Store,
  XCircle,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { CurrencyToggle, Price, TaxNote } from "@/components/ui/CurrencyToggle";
import { validationOffer } from "@/content/validation-program";
import ValidationForm from "./ValidationForm";

export const metadata: Metadata = {
  title: "Validation Launchpad: Test Your Startup Idea with Real Paying Customers",
  description:
    "A 4-week program for startups and SMEs: find your buyers' real pain points, test your solution in front of them, and find out what they will pay, before you build more.",
  alternates: { canonical: `${siteConfig.url}/validate` },
  openGraph: {
    title: "Find out if they'll pay before you build more.",
    description:
      "4 weeks. Real buyer interviews, a live demand test, and a pricing test, with a panel of Indian SMEs who actually buy.",
    url: `${siteConfig.url}/validate`,
    type: "website",
  },
};

const pains = [
  "Friends and family love the idea. Nobody has paid for it.",
  "You're guessing which customer has the problem worst.",
  "You've built for months and still don't know your price.",
  "Investors ask for traction and you have opinions, not evidence.",
];

const weeks = [
  {
    icon: Search,
    label: "Week 1",
    title: "Find the pain",
    items: [
      "Pick 2–3 customer segments to test, not 'everyone'",
      "8–12 problem interviews with real buyers from our SME panel",
      "A pain map: what hurts, how often, what they use today",
    ],
  },
  {
    icon: MessagesSquare,
    label: "Week 2",
    title: "Test the solution",
    items: [
      "A one-page offer written in your buyers' own words",
      "Solution walkthroughs with the segment that hurt most",
      "Objections logged, positioning sharpened",
    ],
  },
  {
    icon: ClipboardCheck,
    label: "Week 3",
    title: "Run a live demand test",
    items: [
      "Small, targeted Google / Meta / LinkedIn test (ad budget paid by you, from ₹10k)",
      "Visit → signup → demo request tracked end to end",
      "Message A/B test so you know which promise lands",
    ],
  },
  {
    icon: IndianRupee,
    label: "Week 4",
    title: "Test willingness to pay",
    items: [
      "Price shown to real prospects, not a survey of friends",
      "Ask for a pre-order, deposit, paid pilot, or letter of intent",
      "Evidence pack: what you learned, what buyers paid or promised",
    ],
  },
];

const evidence = [
  "Interview notes and a ranked pain map",
  "Demand test numbers: cost per signup, conversion by message",
  "Price points tested and how buyers responded",
  "Pre-orders, deposits, pilots or LOIs collected (if any)",
  "A clear call: build, change direction, or stop",
];

const goodFit = [
  "You have an idea, prototype or early product aimed at businesses or consumers",
  "You can give 4–5 hours a week to calls and reviews",
  "You want honest evidence, including a 'no'",
];

const notFit = [
  "You want guaranteed customers or guaranteed funding (nobody honest promises either)",
  "You've already found product-market fit. You need the Distribution Sprint instead",
  "You don't want to talk to customers yourself",
];

const panelPerks = [
  "Paid or perk-backed 30-minute feedback sessions",
  "Early, discounted access to tools built for your industry",
  "Only sessions relevant to your sector. Say no any time",
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Who are the buyers I'll talk to?",
    a: "Business owners and managers from our SME buyer panel: clinics, real estate, manufacturing, education and retail businesses, mostly in Tamil Nadu. For consumer products, we recruit through targeted ads instead.",
  },
  {
    q: "Will you help us raise investment?",
    a: "We don't arrange funding or introduce you to investors for a fee. What we do give you is the evidence investors ask for: real buyer conversations, demand numbers and price signals.",
  },
  {
    q: "What does the deposit question mean?",
    a: (
      <>
        It helps us gauge demand for the first cohort. If you&apos;re accepted, a refundable{" "}
        <Price amounts={validationOffer.deposit} /> deposit holds your slot and counts towards the program
        fee. Nothing is charged when you apply.
      </>
    ),
  },
  {
    q: "What if the answer is 'nobody will pay'?",
    a: "Then you found out in 4 weeks for a fraction of what another 6 months of building costs. The evidence pack shows why, and which segment or problem looked strongest instead.",
  },
];

export default function ValidatePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-[#0D2040] text-white">
        <Container className="max-w-4xl text-center">
          <span className="inline-block text-xs uppercase font-extrabold tracking-wider text-[#F58220] bg-white/5 border border-white/15 px-3 py-1 rounded-full mb-5">
            {validationOffer.name} · For startups &amp; SMEs
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-5">
            Find out if they&apos;ll pay
            <br className="hidden sm:block" /> before you build more.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            A {validationOffer.durationWeeks}-week program that puts your idea in front of real buyers. Find their
            real pain points, test your solution, and learn what they&apos;ll actually pay, with evidence you can show
            customers and investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="#apply" variant="orange" size="lg" className="inline-flex items-center gap-2 justify-center">
              Apply for the first cohort <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="#panel"
              variant="outline"
              size="lg"
              className="justify-center text-white! border-white/30! hover:bg-white/10!"
            >
              I run a business: join the buyer panel
            </Button>
          </div>
          <p className="mt-5 text-xs text-slate-400">
            {validationOffer.cohortSlots} slots in the first cohort · <Price amounts={validationOffer.price} /> ·
            Fixed scope
          </p>
        </Container>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="Building got easy. Knowing what to build didn't."
            description="Most early products don't fail because they're badly built. They fail because nobody checked whether buyers would pay before months went into building."
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

      {/* Program */}
      <section id="program" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24">
        <Container className="max-w-5xl">
          <SectionHeading
            eyebrow="The program"
            title={`${validationOffer.durationWeeks} weeks: pain, solution, demand, price`}
            description="Each week answers one question with evidence from real buyers. You stay in every conversation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {weeks.map(({ icon: Icon, label, title, items }) => (
              <div key={title} className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      {label}
                    </span>
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

          <div className="mt-8 rounded-3xl bg-[#0D2040] text-white p-6 sm:p-8">
            <h3 className="text-lg font-bold mb-4">You walk away with an evidence pack</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {evidence.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
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
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#0082CA]">First-cohort price</span>
          <CurrencyToggle className="mt-4" showNote={false} />
          <div className="mt-5 text-5xl font-black text-[#0D2040]">
            <Price amounts={validationOffer.price} />
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            <TaxNote />
          </p>
          <p className="mt-3 text-sm text-[#475569]">
            {validationOffer.durationWeeks} weeks, fixed scope. Ad test budget paid directly to the platforms.
          </p>
          <p className="mt-1 text-sm text-[#475569]">
            Refundable <Price amounts={validationOffer.deposit} /> deposit holds a slot once you&apos;re accepted.
          </p>
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
            eyebrow="Founders"
            title="Apply for the first cohort"
            description={`${validationOffer.cohortSlots} slots. We read every application and only accept ideas we think we can test well.`}
          />
          <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
            <ValidationForm mode="founder" />
          </div>
        </Container>
      </section>

      {/* Buyer panel */}
      <section id="panel" className="py-16 sm:py-24 scroll-mt-24">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Business owners"
            title="Join the buyer panel"
            description="Startups are building tools for businesses like yours. Tell them what's actually worth paying for."
          />
          <ul className="mb-8 space-y-2.5">
            {panelPerks.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-[#334155]">
                <Store className="w-4 h-4 text-[#0082CA] shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
            <ValidationForm mode="panel" />
          </div>
        </Container>
      </section>
    </div>
  );
}
