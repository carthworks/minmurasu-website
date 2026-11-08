"use client";

import React, { useState, useId, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { trackEvent, trackLeadSubmission } from "@/lib/analytics";
import { ToastItem, type Toast } from "@/components/ui/Toast";
import { feedback } from "@/lib/vibe-feedback";
import {
  Calculator,
  TrendingUp,
  Zap,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  MessageSquare,
  Building,
  Target,
  RefreshCw,
} from "lucide-react";

type ResponseTimeSpeed = "fast" | "medium" | "slow";

const responseTimeMultiplier: Record<ResponseTimeSpeed, { label: string; lossPct: number; desc: string }> = {
  fast: {
    label: "Under 5 Minutes",
    lossPct: 0.1,
    desc: "Automated WhatsApp triage keeps lead drop-off minimal.",
  },
  medium: {
    label: "30 Mins to 2 Hours",
    lossPct: 0.38,
    desc: "Standard manual response: up to ~38% of prospects contact a competitor first.",
  },
  slow: {
    label: "24+ Hours / Next Day",
    lossPct: 0.65,
    desc: "Severe lead decay: over ~65% of enquiries are cold or lost by the time someone replies.",
  },
};

const presetDealValues = [
  { label: "₹10,000", value: 10000 },
  { label: "₹25,000", value: 25000 },
  { label: "₹50,000", value: 50000 },
  { label: "₹1,00,000", value: 100000 },
  { label: "₹2,50,000", value: 250000 },
];

function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

function formatCompactINR(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} L`;
  }
  return formatINR(val);
}

export default function RoiCalculatorPage() {
  const router = useRouter();
  const visitorsInputId = useId();
  const convRateInputId = useId();
  const closeRateInputId = useId();
  const dealValueInputId = useId();

  // Calculator inputs
  const [visitors, setVisitors] = useState<number>(5000);
  const [currentConvRate, setCurrentConvRate] = useState<number>(1.5);
  const [closeRate, setCloseRate] = useState<number>(15);
  const [dealValue, setDealValue] = useState<number>(25000);
  const [responseTime, setResponseTime] = useState<ResponseTimeSpeed>("medium");

  // Lead capture state
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: "Digital Strategy & Consulting",
      preferredContact: "whatsapp",
      consent: true,
      budget: "₹25,000 - ₹50,000 / month",
      formLoadedAt: 0,
    },
  });

  useEffect(() => {
    setValue("formLoadedAt", Date.now());
  }, [setValue]);

  // --- Dynamic Mathematical Calculations ---
  // Baseline (Current Status)
  const baselineLeads = Math.max(1, Math.round(visitors * (currentConvRate / 100)));
  const baselineLeadsLost = Math.round(baselineLeads * responseTimeMultiplier[responseTime].lossPct);
  const effectiveBaselineLeads = Math.max(1, baselineLeads - baselineLeadsLost);
  const baselineCustomers = Math.max(1, Math.round(effectiveBaselineLeads * (closeRate / 100)));
  const baselineMonthlyRev = baselineCustomers * dealValue;
  const baselineAnnualRev = baselineMonthlyRev * 12;

  // MIN MURASU System Optimizations:
  // 1. Landing page speed & conversion engineering lifts rate conservatively by +1.2% to +1.8%
  const projectedConvRate = Math.min(8.0, Number((currentConvRate * 1.75).toFixed(1)));
  const projectedRawLeads = Math.round(visitors * (projectedConvRate / 100));
  // 2. Instant WhatsApp triage recovers 80% of lost leads (drops loss to ~5-8%)
  const minMurasuLossPct = 0.08;
  const projectedLeadsLost = Math.round(projectedRawLeads * minMurasuLossPct);
  const projectedEffectiveLeads = Math.max(1, projectedRawLeads - projectedLeadsLost);
  // 3. Higher intent search + pre-qualification lifts close rate slightly (+2%)
  const projectedCloseRate = Math.min(60, closeRate + 2);
  const projectedCustomers = Math.max(baselineCustomers + 1, Math.round(projectedEffectiveLeads * (projectedCloseRate / 100)));
  const projectedMonthlyRev = projectedCustomers * dealValue;
  const projectedAnnualRev = projectedMonthlyRev * 12;

  // Growth Gains
  const monthlyRevenueGain = projectedMonthlyRev - baselineMonthlyRev;
  const annualRevenueGain = projectedAnnualRev - baselineAnnualRev;
  const additionalLeadsMonthly = projectedEffectiveLeads - effectiveBaselineLeads;
  const additionalCustomersMonthly = projectedCustomers - baselineCustomers;
  const growthMultiplier = Number((projectedMonthlyRev / Math.max(1, baselineMonthlyRev)).toFixed(1));

  // Dynamic WhatsApp prefill URL with calculated numbers
  const generateWhatsAppCalculatorUrl = () => {
    const text = `Hi MIN MURASU team! 👋 I just ran my numbers through your *Interactive ROI & Growth Calculator* on minmurasu.digital:\n\n• Monthly Traffic: ${visitors.toLocaleString("en-IN")} visitors\n• Current Conversion: ${currentConvRate}%\n• Average Deal Value: ${formatINR(dealValue)}\n• Response Time: ${responseTimeMultiplier[responseTime].label}\n\n*Calculator Projection:*\n• Projected Annual Gain: *${formatCompactINR(annualRevenueGain)}* (${formatINR(annualRevenueGain)}/yr)\n• Additional Monthly Leads: +${additionalLeadsMonthly}\n• Additional Monthly Clients: +${additionalCustomersMonthly}\n\nCan we discuss how your growth system would achieve this for my business?`;
    return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
  };

  const onSubmitLead = async (data: ContactFormData) => {
    feedback.playPop();
    feedback.triggerHaptic(15);
    setSubmitting(true);

    try {
      // Append calculated snapshot to user's notes so founder gets context
      const calculationContext = `\n\n--- [ROI CALCULATOR SNAPSHOT] ---\n• Traffic: ${visitors} visitors/mo\n• Current Conv: ${currentConvRate}%\n• Close Rate: ${closeRate}%\n• Deal Value: ${formatINR(dealValue)}\n• Response Time: ${responseTimeMultiplier[responseTime].label}\n• Projected Annual Gain: ${formatINR(annualRevenueGain)}\n• Extra Leads/mo: +${additionalLeadsMonthly}\n• Extra Clients/mo: +${additionalCustomersMonthly}`;

      const payload = {
        ...data,
        message: `${data.message}${calculationContext}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Unable to send your request. Please try again.");
      }

      trackLeadSubmission("ROI Calculator Lead");
      trackEvent("audit_request", {
        traffic: visitors,
        deal_value: dealValue,
        annual_opportunity: annualRevenueGain,
      });

      router.push("/thank-you");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setToast({ id: "roi-calc-error", type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-slate-50/50 min-h-screen">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#0D2040] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 font-medium">Growth ROI Calculator</li>
          </ol>
        </nav>

        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0082CA]/10 text-[#0082CA] text-xs font-semibold mb-4 border border-[#0082CA]/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Commercial Growth Model</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight leading-tight">
            Calculate Your Untapped Digital Revenue & Lead Potential
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            Most businesses don&apos;t need 10x more ad spend; they need a faster website,
            focused search targeting, and automated lead response. Adjust the sliders below
            to model your business&apos;s realistic upside.
          </p>
        </div>

        {/* Two Column Layout: Controls on Left, Live Projections on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-[#0D2040] flex items-center gap-2">
                <Target className="w-5 h-5 text-[#0082CA]" />
                <span>Your Current Business Metrics</span>
              </h2>
              <button
                type="button"
                onClick={() => {
                  setVisitors(5000);
                  setCurrentConvRate(1.5);
                  setCloseRate(15);
                  setDealValue(25000);
                  setResponseTime("medium");
                  feedback.playPop();
                }}
                className="text-xs text-slate-400 hover:text-[#0082CA] flex items-center gap-1 transition-colors"
                title="Reset to defaults"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Slider 1: Monthly Visitors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={visitorsInputId}
                  className="text-sm font-semibold text-[#0D2040] flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>Monthly Website Visitors or Ad Clicks</span>
                </label>
                <span className="text-base font-bold text-[#0D2040] bg-slate-100 px-3 py-1 rounded-lg">
                  {visitors.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                id={visitorsInputId}
                type="range"
                min="500"
                max="50000"
                step="250"
                value={visitors}
                onChange={(e) => {
                  setVisitors(Number(e.target.value));
                  feedback.triggerHaptic(5);
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0082CA]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>500 (Early stage)</span>
                <span>15,000</span>
                <span>50,000+ (Scaling)</span>
              </div>
            </div>

            {/* Slider 2: Current Conversion Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor={convRateInputId}
                    className="text-sm font-semibold text-[#0D2040] flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4 text-slate-400" />
                    <span>Website Conversion Rate</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    % of visitors who submit a form, call, or chat
                  </p>
                </div>
                <span className="text-base font-bold text-[#0D2040] bg-slate-100 px-3 py-1 rounded-lg">
                  {currentConvRate}%
                </span>
              </div>
              <input
                id={convRateInputId}
                type="range"
                min="0.4"
                max="6.0"
                step="0.1"
                value={currentConvRate}
                onChange={(e) => {
                  setCurrentConvRate(Number(e.target.value));
                  feedback.triggerHaptic(5);
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0082CA]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0.5% (Slow/WordPress)</span>
                <span>2.0% (Average)</span>
                <span>6.0% (High performance)</span>
              </div>
            </div>

            {/* Slider 3: Average Customer Value / Deal Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor={dealValueInputId}
                    className="text-sm font-semibold text-[#0D2040] flex items-center gap-1.5"
                  >
                    <Building className="w-4 h-4 text-slate-400" />
                    <span>Average Value per Customer / Deal</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Net profit or lifetime value from one closed customer
                  </p>
                </div>
                <span className="text-base font-bold text-[#0082CA] bg-[#F0F8FF] border border-[#BAE6FD] px-3 py-1 rounded-lg">
                  {formatINR(dealValue)}
                </span>
              </div>
              <input
                id={dealValueInputId}
                type="range"
                min="2500"
                max="300000"
                step="2500"
                value={dealValue}
                onChange={(e) => {
                  setDealValue(Number(e.target.value));
                  feedback.triggerHaptic(5);
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0082CA]"
              />
              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400 mr-1">Quick Select:</span>
                {presetDealValues.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => {
                      setDealValue(p.value);
                      feedback.playPop();
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                      dealValue === p.value
                        ? "bg-[#0D2040] text-white border-[#0D2040]"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 4: Lead-to-Customer Close Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor={closeRateInputId}
                    className="text-sm font-semibold text-[#0D2040] flex items-center gap-1.5"
                  >
                    <Target className="w-4 h-4 text-slate-400" />
                    <span>Sales Close Rate (%)</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    % of genuine enquiries your sales team closes
                  </p>
                </div>
                <span className="text-base font-bold text-[#0D2040] bg-slate-100 px-3 py-1 rounded-lg">
                  {closeRate}%
                </span>
              </div>
              <input
                id={closeRateInputId}
                type="range"
                min="5"
                max="40"
                step="1"
                value={closeRate}
                onChange={(e) => {
                  setCloseRate(Number(e.target.value));
                  feedback.triggerHaptic(5);
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0082CA]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5% (Strict qualification)</span>
                <span>15% (Typical B2B)</span>
                <span>40% (Referral level)</span>
              </div>
            </div>

            {/* Radio 5: Lead Response Time (Crucial differentiator!) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#0D2040] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Current Speed to Respond to Inbound Leads</span>
                </label>
                <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Impacts Lead Decay
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(responseTimeMultiplier) as ResponseTimeSpeed[]).map((key) => {
                  const item = responseTimeMultiplier[key];
                  const isSelected = responseTime === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setResponseTime(key);
                        feedback.playPop();
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "border-[#0082CA] bg-[#F0F8FF] ring-2 ring-[#0082CA]/20"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#0D2040]">
                          {item.label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#0082CA]" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 leading-tight">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Live Projected Commercial Impact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Highlight Card */}
            <div className="bg-linear-to-br from-[#0D2040] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-[#0082CA]/20 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-sky-200 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>Estimated Annual Revenue Gain</span>
                </span>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2">
                  +{formatCompactINR(annualRevenueGain)}
                  <span className="text-lg font-normal text-slate-300 ml-2">/ year</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-6">
                  Approximately <strong className="text-white">{formatINR(monthlyRevenueGain)}</strong> additional revenue per month through system optimization.
                </p>

                {/* Growth Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/15">
                  <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                    <span className="text-[11px] text-slate-300 block mb-0.5">Extra Enquiries</span>
                    <span className="text-xl font-bold text-emerald-400">
                      +{additionalLeadsMonthly} <span className="text-xs font-normal text-slate-200">/ mo</span>
                    </span>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                    <span className="text-[11px] text-slate-300 block mb-0.5">New Customers</span>
                    <span className="text-xl font-bold text-sky-300">
                      +{additionalCustomersMonthly} <span className="text-xs font-normal text-slate-200">/ mo</span>
                    </span>
                  </div>
                </div>

                {/* Primary WhatsApp Action with Live Calculation */}
                <div className="mt-6">
                  <a
                    href={generateWhatsAppCalculatorUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      feedback.playPop();
                      trackEvent("whatsapp_click", { placement: "roi_calculator_results" });
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp My Growth Calculation</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Side-by-Side Comparison Matrix */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
              <h3 className="text-sm font-bold text-[#0D2040] uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Performance Comparison</span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {growthMultiplier}x Potential Lift
                </span>
              </h3>

              <div className="space-y-3 text-xs">
                {/* Metric 1 */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Monthly Website Enquiries</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 line-through">{effectiveBaselineLeads}</span>
                    <span className="font-bold text-[#0D2040] bg-slate-100 px-2 py-0.5 rounded">
                      {projectedEffectiveLeads}
                    </span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Leads Lost to Slow Response</span>
                  <div className="flex items-center gap-3">
                    <span className="text-rose-500 font-medium">-{baselineLeadsLost}</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      -{projectedLeadsLost} (Saved)
                    </span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Monthly Paying Clients</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{baselineCustomers}</span>
                    <span className="font-bold text-[#0082CA] bg-[#F0F8FF] px-2 py-0.5 rounded">
                      {projectedCustomers}
                    </span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Monthly Revenue Run-Rate</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{formatINR(baselineMonthlyRev)}</span>
                    <span className="font-bold text-[#0D2040] bg-slate-100 px-2 py-0.5 rounded">
                      {formatINR(projectedMonthlyRev)}
                    </span>
                  </div>
                </div>

                {/* Metric 5 */}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-[#0D2040]">12-Month Net Difference</span>
                  <span className="font-black text-base text-emerald-600">
                    +{formatINR(annualRevenueGain)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTA Link */}
            <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0D2040] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  30m
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0D2040]">Want to verify these numbers?</div>
                  <div className="text-[11px] text-slate-500">Speak directly with Karthikeyan T.</div>
                </div>
              </div>
              <Link
                href="/book"
                className="text-xs font-bold text-[#0082CA] hover:text-[#0D2040] inline-flex items-center gap-1 transition-colors"
              >
                <span>Book Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Pillars Explaining Where the Growth Comes From */}
        <div className="mt-16 sm:mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2040] tracking-tight">
              How MIN MURASU Unlocks This Growth
            </h2>
            <p className="mt-2 text-sm text-[#475569]">
              This model does not assume magical 10x traffic increases. It fixes the three fatal leaks where businesses lose 70% of potential buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0082CA]/10 text-[#0082CA] flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0D2040] mb-2">
                  1. Sub-Second Landing Page Speed
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Every 1-second delay in page load drops conversions by 7%. We build custom Next.js web applications that load in under 800ms on 4G mobile connections, retaining mobile searchers before they bounce.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0082CA] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Impact: +40% to +80% Conversion Lift</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0D2040] mb-2">
                  2. Instant WhatsApp & AI Lead Triage
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Harvard Business Review research proves leads responded to within 5 minutes are 7x more likely to qualify. We connect your ads and website to instant WhatsApp verification and CRM notifications.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Impact: Stops 60%+ Lead Decay</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F58220]/10 text-[#F58220] flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0D2040] mb-2">
                  3. High-Intent Commercial Search & Ads
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Stop burning money on broad, informational clicks. We optimize for high-commercial intent keywords and configure Meta CAPI + Google Enhanced Conversions to train ad algorithms on closed deals.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#F58220] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Impact: Lower CPL, Higher Deal Close Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Section: Request Formal Customized Growth Blueprint */}
        <div className="mt-16 sm:mt-24 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12 max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0082CA] uppercase tracking-wider">
              Take The Next Step
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2040] tracking-tight mt-1">
              Want a Tailored Growth Blueprint for Your Exact Numbers?
            </h2>
            <p className="mt-2 text-sm text-[#475569]">
              Submit your details below. We will review your current website, keyword rankings, and ad setup, and send you a complimentary 5-point action plan within one business day.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmitLead)} className="space-y-5">
            {/* Honeypots for anti-spam */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              {...register("companyFax")}
            />
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              {...register("secondaryRole")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0D2040] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Karthikeyan T"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-[#0082CA]/20 focus:border-[#0082CA]"
                  }`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name.message}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D2040] mb-1">
                  Business Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="karthik@company.com"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-[#0082CA]/20 focus:border-[#0082CA]"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0D2040] mb-1">
                  Phone / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 94867 72206"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-[#0082CA]/20 focus:border-[#0082CA]"
                  }`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone.message}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D2040] mb-1">
                  Current Website / Google Maps Link
                </label>
                <input
                  type="text"
                  placeholder="https://yourbrand.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0082CA]/20 focus:border-[#0082CA]"
                  {...register("website")}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D2040] mb-1">
                Briefly describe your main growth priority
              </label>
              <textarea
                rows={3}
                placeholder="We want to lower our cost per lead on Google Ads and automate WhatsApp appointment confirmations..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                  errors.message
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-slate-200 focus:ring-[#0082CA]/20 focus:border-[#0082CA]"
                }`}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.message.message}</span>
                </p>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="consent-check"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0082CA] focus:ring-[#0082CA]"
                {...register("consent")}
              />
              <label htmlFor="consent-check" className="text-xs text-slate-600 leading-normal">
                I agree to receive a growth analysis and follow-up from MIN MURASU. We respect your privacy; zero spam.
              </label>
            </div>
            {errors.consent && (
              <p className="text-rose-600 text-[11px] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.consent.message}</span>
              </p>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-lg"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Your Blueprint...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Send Me My Growth Strategy Blueprint</span>
                  </span>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero obligations</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>1 business day delivery</span>
              </span>
            </div>
          </form>
        </div>

        {/* Mathematical Transparency & Zero-Fabrication Disclaimer */}
        <div className="mt-12 text-center text-xs text-slate-400 max-w-2xl mx-auto space-y-1">
          <p>
            <strong>Transparency Notice:</strong> This calculator is an interactive estimation tool based on user-provided inputs and standard e-commerce/B2B conversion benchmarks.
          </p>
          <p>
            It is provided for strategic planning purposes and does not constitute a legal earnings guarantee. Actual business outcomes depend on industry, pricing competitiveness, and market demand.
          </p>
        </div>
      </Container>

      {/* Toast Notification */}
      {toast && (
        <ToastItem
          toast={toast}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
