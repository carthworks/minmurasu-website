import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Rocket, TrendingUp, Cpu, ArrowRight, Check } from "lucide-react";
import { formatPrice, getPlan } from "@/content/pricing";

const fromPrice = (id: string) => {
  const p = getPlan(id);
  return `From ${formatPrice(p.price.INR, "INR")}${p.kind === "monthly" ? " / month" : ""}`;
};

/**
 * Short pricing teaser for the homepage. Prices come from src/content/pricing.ts,
 * which also drives the five plans on /pricing.
 */
const models = [
  {
    icon: Rocket,
    name: "Website & Launch",
    price: fromPrice("digital-foundation"),
    billing: "One-time project",
    bestFor: "Launching or upgrading your website, tracking and Google listing.",
    points: ["Fixed milestones", "Typically 2–4 weeks"],
  },
  {
    icon: TrendingUp,
    name: "Monthly Growth",
    price: fromPrice("local-visibility"),
    billing: "Monthly plan",
    bestFor: "A steady flow of enquiries from Google, ads and social media.",
    points: ["15-day notice, no lock-in", "Best results over 3–6 months"],
    popular: true,
  },
  {
    icon: Cpu,
    name: "AI & WhatsApp Automation",
    price: fromPrice("scale-automation"),
    billing: "Monthly plan",
    bestFor: "Handling high enquiry volumes across WhatsApp, CRM and sales teams.",
    points: ["Scoped after a discovery call", "Multi-location ready"],
  },
];

export default function EngagementModels() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-100">
      <Container>
        <SectionHeading
          title="Ways to work with us"
          description="Published starting prices, confirmed for your business after the free audit. Your ad budget is always paid directly to Google or Meta — never marked up."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map(({ icon: Icon, name, price, billing, bestFor, points, popular }) => (
            <div
              key={name}
              className={`relative p-7 rounded-2xl bg-white flex flex-col ${
                popular ? "border-2 border-[#F58220] shadow-lg" : "border border-slate-200/90 shadow-xs"
              }`}
            >
              {popular && (
                <span className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-[#F58220] text-white text-xs font-bold">
                  Most popular
                </span>
              )}
              <Icon className="w-8 h-8 text-[#0082CA] mb-4" />
              <h3 className="text-xl font-extrabold text-[#0D2040]">{name}</h3>
              <div className="text-sm font-semibold text-[#0082CA]">{billing}</div>
              <div className="text-lg font-black text-[#0D2040] mt-1 mb-3">
                {price} <span className="text-xs font-semibold text-slate-500">+ GST</span>
              </div>
              <p className="text-[15px] text-[#334155] leading-relaxed mb-5">{bestFor}</p>
              <ul className="space-y-2 mt-auto">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-semibold text-[#0D2040]">
                    <Check className="w-4 h-4 text-emerald-600" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-base font-bold text-[#0082CA] hover:text-[#F58220]"
          >
            Compare plans and what&apos;s included <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
