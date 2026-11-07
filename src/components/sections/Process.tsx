import React from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { ClipboardCheck, Map, Rocket, LineChart, ArrowRight } from "lucide-react";

/**
 * One simple "how it works" sequence. Replaces the three separate step sections
 * (growth architecture, engagement methodology, automation workflow) on the homepage.
 */
const steps = [
  {
    icon: ClipboardCheck,
    title: "Free audit",
    time: "In 1–2 business days",
    description:
      "We review your website, Google listing, ads and how fast enquiries get a reply — and show you where customers are slipping away.",
  },
  {
    icon: Map,
    title: "A clear plan",
    time: "Right after the audit",
    description:
      "What to fix first, what it will cost, and what to expect by when. Monthly plans need only 15 days' notice to stop — no lock-in.",
  },
  {
    icon: Rocket,
    title: "Build and launch",
    time: "Typically 2–4 weeks",
    description:
      "We build the website or landing pages, launch the campaigns, and set up instant WhatsApp replies and lead tracking.",
  },
  {
    icon: LineChart,
    title: "Measure and improve",
    time: "Every month",
    description:
      "A monthly review in plain numbers — enquiries, cost per enquiry, and new customers — and what we'll improve next.",
  },
];

export default function Process() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-100">
      <Container>
        <SectionHeading
          title="How it works"
          description="Four simple steps from first conversation to measurable results."
        />

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-full bg-[#0D2040] text-white flex items-center justify-center text-lg font-black">
                    {i + 1}
                  </div>
                  <Icon className="w-6 h-6 text-[#F58220]" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0D2040] mb-1">{step.title}</h3>
                <div className="text-sm font-semibold text-[#0082CA] mb-3">{step.time}</div>
                <p className="text-[15px] text-[#334155] leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="hidden lg:block absolute top-1/2 -right-5 w-4 h-4 text-slate-400 -translate-y-1/2"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 text-center">
          <Button
            href={siteConfig.cta.audit.href}
            variant="orange"
            size="lg"
            className="font-bold shadow-md shadow-orange-950/20"
          >
            Start with step 1 — it&apos;s free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
