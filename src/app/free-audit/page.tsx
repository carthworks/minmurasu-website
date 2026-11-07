"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import {
  ProtectedEmail,
  ProtectedPhone,
  ProtectedWhatsApp,
} from "@/components/ui/ProtectedContact";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { trackLeadSubmission, trackEvent } from "@/lib/analytics";
import { ToastItem, type Toast } from "@/components/ui/Toast";
import { feedback } from "@/lib/vibe-feedback";
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Search,
  Bot,
  Gauge,
  TrendingUp,
  MessageSquare,
  Send,
  Sparkles,
  FileCheck2,
  Clock,
} from "lucide-react";

const auditPillars = [
  {
    icon: Search,
    title: "Technical & Local SEO Scorecard",
    desc: "Indexing gaps, Google Business Profile local ranking factors, keyword opportunities in Coimbatore, Chennai, Bengaluru & across India, and broken metadata.",
  },
  {
    icon: Bot,
    title: "AI Search & GEO Visibility Check",
    desc: "How ChatGPT, Google Gemini, and Perplexity currently perceive and cite your brand—plus missing JSON-LD schema markup.",
  },
  {
    icon: Gauge,
    title: "Website Speed & Conversion Friction",
    desc: "Core Web Vitals (mobile speed), landing page drop-off points, form friction, and trust/compliance gaps hurting your enquiry rate.",
  },
  {
    icon: TrendingUp,
    title: "Ad Spend & Tracking Integrity",
    desc: "Audit of GA4, Google Tag Manager, Google Ads & Meta Pixel conversion tracking to stop wasted media spend.",
  },
  {
    icon: MessageSquare,
    title: "Lead Response & WhatsApp Automation",
    desc: "Actionable blueprint to connect your website forms directly to instant WhatsApp alerts and your sales CRM.",
  },
];

const deliverables = [
  "Prioritized 15-Point Action Scorecard (High / Medium / Low impact)",
  "Competitor Search & AI Visibility Comparison",
  "Mobile Speed & Conversion Funnel Breakdown",
  "30-Minute Walkthrough Call with Founder Karthikeyan T",
];

export default function FreeAuditPage() {
  const router = useRouter();
  const [serverStatus, setServerStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });
  const [toast, setToast] = useState<Toast | null>(null);
  const [hasFocused, setHasFocused] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      preferredContact: "whatsapp",
      service: "digital-strategy",
      formLoadedAt: 0,
    },
  });

  const handleFormFocus = () => {
    if (!hasFocused) {
      setHasFocused(true);
      setValue("formLoadedAt", Date.now());
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setServerStatus({ type: null, message: null });
    try {
      const payload: ContactFormData = {
        ...data,
        message: `[FREE DIGITAL PRESENCE AUDIT REQUEST] Website: ${
          data.website || "Not provided"
        } | Focus Area: ${data.service} | Details: ${data.message}`,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      feedback.playPop();
      feedback.triggerHaptic([15, 30, 15]);

      trackEvent("audit_request", {
        service_category: data.service,
      });
      trackLeadSubmission(data.service);

      reset();
      router.push("/thank-you");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please reach out via WhatsApp or phone.";
      setServerStatus({
        type: "error",
        message: errorMessage,
      });
      setToast({
        id: "audit-error",
        type: "error",
        message: errorMessage,
      });
      feedback.triggerHaptic(30);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#F0F8FF] via-white to-slate-50/60 py-12 sm:py-20 relative">
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 max-w-md">
          <ToastItem toast={toast} onDismiss={() => setToast(null)} />
        </div>
      )}

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Value Proposition & What's Included in the Audit */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2040] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Complimentary &bull; No Obligation &bull; 100% Custom</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0D2040] tracking-tight leading-[1.15] mb-4">
                Get a Free Digital Presence &amp; Growth Audit for Your Business.
              </h1>

              <div className="w-24 h-1.5 bg-[#F58220] rounded-full mb-5" />

              <p className="text-base text-[#475569] leading-relaxed">
                Stop guessing why website traffic isn’t turning into qualified enquiries.
                Our engineering and growth team will manually inspect your website, SEO, AI
                search presence, and conversion funnel—and send you a clear roadmap.
              </p>
            </div>

            {/* 5 Audit Pillars */}
            <div className="space-y-3.5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0D2040]">
                What Our 5-Point Audit Covers:
              </h2>
              {auditPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0D2040]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#475569] leading-relaxed mt-0.5">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tangible Deliverables Box */}
            <div className="p-6 rounded-2xl bg-[#0D2040] text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                <FileCheck2 className="w-4 h-4 text-[#F58220]" />
                <span>What You Receive Within 48 Business Hours</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <span>Reviewed personally by {siteConfig.founderDetails.name}</span>
                <span>Zero automated PDF fluff</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Audit Request Form */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#0D2040]/10 shadow-xl overflow-hidden">
              {/* Brand corner accents */}
              <div
                className="absolute top-0 left-0 w-16 h-11 bg-[#F58220] pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 right-0 w-24 h-8 bg-[#0D2040] pointer-events-none"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                aria-hidden="true"
              />

              <div className="mb-6 pt-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0082CA] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>Takes 60 Seconds &bull; Delivered in 1–2 Business Days</span>
                </div>
                <h2 className="text-2xl font-black text-[#0D2040]">
                  Request Your Free Digital Audit
                </h2>
                <p className="text-xs sm:text-sm text-[#475569] mt-1">
                  Enter your website and growth goals below. We’ll prepare your custom audit before our call.
                </p>
              </div>

              {serverStatus.message && (
                <div
                  role="status"
                  className="p-4 rounded-xl mb-6 text-xs sm:text-sm flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-800"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span>{serverStatus.message}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                onFocus={handleFormFocus}
                className="space-y-4"
                noValidate
              >
                {/* Dual Honeypot fields */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="audit-fax-trap">Company Fax</label>
                  <input
                    id="audit-fax-trap"
                    type="text"
                    {...register("companyFax")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <label htmlFor="audit-role-trap">Secondary Role</label>
                  <input
                    id="audit-role-trap"
                    type="text"
                    {...register("secondaryRole")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="audit-name"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="audit-name"
                      type="text"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                      placeholder="e.g. Anand Murugesan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label
                      htmlFor="audit-phone"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="audit-phone"
                      type="tel"
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor="audit-email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="audit-email"
                      type="email"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                      placeholder="anand@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="audit-company"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Company / Clinic / Brand Name
                    </label>
                    <input
                      id="audit-company"
                      type="text"
                      {...register("company")}
                      placeholder="e.g. Murugesan Industrial"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Website URL */}
                  <div>
                    <label
                      htmlFor="audit-website"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Website URL (or Social Link)
                    </label>
                    <input
                      id="audit-website"
                      type="url"
                      {...register("website")}
                      placeholder="https://yourcompany.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                  </div>

                  {/* Primary Audit Focus */}
                  <div>
                    <label
                      htmlFor="audit-service"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Primary Priority <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="audit-service"
                      {...register("service")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040] bg-white"
                    >
                      <option value="digital-strategy">Complete 360° Digital Presence Audit</option>
                      <option value="seo-local-seo">SEO &amp; Google Maps Local Ranking Audit</option>
                      <option value="generative-engine-optimisation">AI Search (GEO) Visibility Audit</option>
                      <option value="google-meta-ads">Google Ads &amp; Meta Ads ROI Audit</option>
                      <option value="website-landing-pages">Website Speed &amp; Conversion Audit</option>
                      <option value="ai-business-automation">WhatsApp &amp; Lead Automation Audit</option>
                    </select>
                  </div>
                </div>

                {/* Biggest Challenge */}
                <div>
                  <label
                    htmlFor="audit-message"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    What Is Your #1 Growth Goal Right Now? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="audit-message"
                    rows={3}
                    aria-invalid={!!errors.message}
                    {...register("message")}
                    placeholder="e.g. We want more qualified B2B enquiries from Google, our current ads are too expensive, or we need a faster website with WhatsApp automation..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Preferred Delivery Method */}
                <fieldset>
                  <legend className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    Where Should We Send Your Audit Summary?
                  </legend>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="whatsapp"
                        {...register("preferredContact")}
                        className="text-[#0082CA] focus:ring-[#0082CA]"
                      />
                      <span>WhatsApp + Call</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="email"
                        {...register("preferredContact")}
                        className="text-[#0082CA] focus:ring-[#0082CA]"
                      />
                      <span>Work Email</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="phone"
                        {...register("preferredContact")}
                        className="text-[#0082CA] focus:ring-[#0082CA]"
                      />
                      <span>Direct Phone Call</span>
                    </label>
                  </div>
                </fieldset>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label
                    htmlFor="audit-consent"
                    className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer"
                  >
                    <input
                      id="audit-consent"
                      type="checkbox"
                      aria-invalid={!!errors.consent}
                      {...register("consent")}
                      className="mt-0.5 rounded text-[#0082CA] focus:ring-[#0082CA]"
                    />
                    <span>
                      I consent to receive my custom digital audit and follow-up consultation from{" "}
                      {siteConfig.name} per the{" "}
                      <Link href="/privacy-policy" className="text-[#0082CA] font-semibold underline">
                        Privacy Policy
                      </Link>
                      . <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>
                  )}
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <Button
                    variant="orange"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full justify-center text-base font-bold shadow-lg shadow-orange-950/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                        Submitting Audit Request...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Get My Free Digital Presence Audit
                      </span>
                    )}
                  </Button>
                </div>

                {/* Instant WhatsApp Alternative */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0082CA]" />
                    <span>100% Confidential &bull; No Spam</span>
                  </span>
                  <ProtectedWhatsApp
                    message={siteConfig.whatsapp.messages.audit}
                    className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 underline underline-offset-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Or request via WhatsApp</span>
                  </ProtectedWhatsApp>
                </div>
              </form>
            </div>

            {/* Direct Contact Strip below form */}
            <div className="mt-4 px-4 py-3 rounded-2xl bg-white/80 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <span>Prefer to speak directly?</span>
              <div className="flex items-center gap-3 font-bold text-[#0D2040]">
                <ProtectedPhone variant="primary" className="hover:text-[#0082CA]" />
                <span className="text-slate-300">|</span>
                <ProtectedEmail variant="primary" className="hover:text-[#0082CA]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

