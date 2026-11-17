"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, MessageSquare, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { ProtectedWhatsApp } from "@/components/ui/ProtectedContact";
import { AD_FEE_ABOVE_CAP, formatPrice, plans, type Currency, type Plan } from "@/content/pricing";

const STORAGE_KEY = "mm-pricing-currency";

function readStored(): Currency | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "INR" || v === "USD" ? v : null;
  } catch {
    return null;
  }
}

function guessCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz === "Asia/Kolkata" || tz === "Asia/Calcutta" ? "INR" : "USD";
  } catch {
    return "INR";
  }
}

function PlanCard({ plan, currency }: { plan: Plan; currency: Currency }) {
  const f = plan.featured;
  return (
    <div
      className={`relative rounded-3xl p-7 sm:p-8 flex flex-col ${
        f
          ? "bg-[#0D2040] text-white border-2 border-[#F58220] shadow-2xl lg:-translate-y-2"
          : "bg-white text-[#0D2040] border border-slate-200/90 shadow-xs hover:border-[#0082CA]/50 transition-colors"
      }`}
    >
      {f && (
        <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F58220] text-white text-[11px] font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3 h-3" /> Most popular
        </span>
      )}

      <h3 className={`text-2xl font-black tracking-tight ${f ? "text-white" : "text-[#0D2040]"}`}>{plan.name}</h3>
      <p className={`mt-1 text-sm ${f ? "text-slate-300" : "text-[#475569]"}`}>{plan.tagline}</p>

      <div className="mt-6 mb-1 flex items-baseline gap-1.5 flex-wrap">
        {plan.from && (
          <span className={`text-sm font-semibold ${f ? "text-slate-300" : "text-slate-500"}`}>From</span>
        )}
        <span className={`text-4xl font-black tracking-tight ${f ? "text-white" : "text-[#0D2040]"}`}>
          {formatPrice(plan.price[currency], currency)}
        </span>
        <span className={`text-sm font-semibold ${f ? "text-slate-300" : "text-slate-500"}`}>
          {plan.kind === "monthly" ? "/ month" : "one-time"}
        </span>
      </div>
      <p className={`text-xs ${f ? "text-slate-400" : "text-slate-500"}`}>
        {currency === "INR" ? "+ 18% GST" : "Billed in USD"}
        {plan.adSpendCap &&
          ` · ads managed up to ${formatPrice(plan.adSpendCap[currency], currency)}/mo spend`}
      </p>

      <p
        className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold ${
          f ? "text-[#38BDF8]" : "text-[#0082CA]"
        }`}
      >
        <Clock className="w-3.5 h-3.5" /> {plan.timeline}
      </p>
      <p className={`mt-2 text-sm leading-relaxed ${f ? "text-slate-200" : "text-[#334155]"}`}>
        <span className="font-bold">Best for:</span> {plan.bestFor}
      </p>

      <ul className="mt-5 mb-7 space-y-2.5 text-sm">
        {plan.inclusions.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${f ? "text-[#F58220]" : "text-[#0082CA]"}`} />
            <span className={f ? "text-slate-200" : "text-[#475569]"}>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-2.5">
        <Button
          href={plan.cta.href}
          variant={f ? "orange" : "navy"}
          size="md"
          className="w-full justify-center font-bold"
        >
          <span>{plan.cta.label}</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
        <ProtectedWhatsApp
          message={plan.whatsappMsg}
          className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors ${
            f
              ? "bg-white/10 text-emerald-300 hover:bg-white/15"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Ask on WhatsApp</span>
        </ProtectedWhatsApp>
      </div>
    </div>
  );
}

export default function PricingPlans() {
  const [currency, setCurrency] = useState<Currency>("INR");

  useEffect(() => {
    // Pick a sensible default after hydration: a stored choice, else India time zone → INR.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser-only APIs
    setCurrency(readStored() ?? guessCurrency());
  }, []);

  const choose = (c: Currency) => {
    setCurrency(c);
    try {
      window.localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  };

  const monthly = plans.filter((p) => p.kind === "monthly");
  const projects = plans.filter((p) => p.kind === "project");

  return (
    <div className="max-w-6xl mx-auto">
      {/* Currency toggle */}
      <div className="flex flex-col items-center gap-2 mb-12">
        <div role="radiogroup" aria-label="Currency" className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200">
          {(
            [
              ["INR", "₹ INR · India"],
              ["USD", "$ USD · International"],
            ] as const
          ).map(([c, label]) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currency === c}
              onClick={() => choose(c)}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                currency === c ? "bg-[#0D2040] text-white shadow" : "text-slate-600 hover:text-[#0D2040]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          {currency === "INR"
            ? "Prices for businesses in India, excluding 18% GST."
            : "Prices for businesses outside India, invoiced in US dollars."}
        </p>
      </div>

      {/* Monthly plans */}
      <h2 className="text-center text-xl sm:text-2xl font-black text-[#0D2040] mb-2">Monthly growth plans</h2>
      <p className="text-center text-sm text-[#475569] mb-10">
        15-day notice to cancel. No lock-in. Your ad budget is paid directly to Google and Meta.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {monthly.map((p) => (
          <PlanCard key={p.id} plan={p} currency={currency} />
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-slate-500 max-w-3xl mx-auto">
        Ad spend above each plan&apos;s limit is managed at {AD_FEE_ABOVE_CAP} of the additional spend. Ad spend,
        WhatsApp API and software fees are paid to the vendor at cost.
      </p>

      {/* Projects */}
      <h2 className="mt-20 text-center text-xl sm:text-2xl font-black text-[#0D2040] mb-2">One-time projects</h2>
      <p className="text-center text-sm text-[#475569] mb-10">
        Fixed scope, milestone billing, and you own everything we build.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {projects.map((p) => (
          <PlanCard key={p.id} plan={p} currency={currency} />
        ))}
      </div>
    </div>
  );
}
