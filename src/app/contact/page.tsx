"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import {
  ProtectedEmail,
  ProtectedPhone,
  ProtectedWhatsApp,
} from "@/components/ui/ProtectedContact";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { siteConfig } from "@/lib/site-config";
import { trackLeadSubmission } from "@/lib/analytics";
import { ToastItem, type Toast } from "@/components/ui/Toast";
import { feedback } from "@/lib/vibe-feedback";
import {
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function ContactPage() {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      const successMsg =
        result.message ||
        "Thank you! Your enquiry has been received. Our team will contact you within 24 business hours.";

      setServerStatus({
        type: "success",
        message: successMsg,
      });
      setToast({
        id: "contact-success",
        type: "success",
        message: "Enquiry received! Our team will reach out within 24 hours.",
      });
      feedback.playPop();
      feedback.triggerHaptic([15, 30, 15]);

      // Track confirmed lead generation in analytics without PII
      trackLeadSubmission(data.service);

      reset();
      router.push("/thank-you");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Please reach out via WhatsApp or phone.";
      setServerStatus({
        type: "error",
        message: errorMessage,
      });
      setToast({
        id: "contact-error",
        type: "error",
        message: errorMessage,
      });
      feedback.triggerHaptic(30);
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50/50 relative">
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 max-w-md">
          <ToastItem toast={toast} onDismiss={() => setToast(null)} />
        </div>
      )}
      <Container>
        <SectionHeading
          eyebrow="Initiate Conversation"
          title="Let’s Discuss Your Growth Objectives"
          description="Schedule a consultation, request an initial digital presence audit, or send us a direct project enquiry."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Executive Business Card & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md overflow-hidden space-y-6">
              {/* Top-left Orange & Bottom-right Navy diagonal accents from Business Card Front */}
              <div
                className="absolute top-0 left-0 w-16 h-11 bg-[#F58220] pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 right-0 w-24 h-8 bg-[#0D2040] pointer-events-none"
                aria-hidden="true"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              />

              {/* Founder Identity matching Business Card Front */}
              <div className="pt-2 border-b border-slate-100 pb-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#F58220] mb-1">
                  Executive Contact
                </div>
                <h2 className="text-2xl font-black text-[#0D2040] tracking-tight">
                  {siteConfig.founderDetails.name}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                  {siteConfig.founderDetails.role}
                </p>
              </div>

              {/* Signature P / M / W Badges from Business Card Front (Scraper-Protected) */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0D2040] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    P
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-semibold tracking-wider">
                      Phone &amp; WhatsApp
                    </span>
                    <div className="font-bold text-[#0D2040] flex flex-wrap items-center gap-1.5">
                      <ProtectedPhone variant="primary" className="hover:text-[#0082CA]" />
                      <span className="text-slate-300">|</span>
                      <ProtectedPhone variant="secondary" className="hover:text-[#0082CA]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0D2040] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    M
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-semibold tracking-wider">
                      Official Email
                    </span>
                    <div>
                      <ProtectedEmail
                        variant="primary"
                        className="font-bold text-[#0D2040] hover:text-[#0082CA] block"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0D2040] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    W
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-semibold tracking-wider">
                      Web &amp; Headquarters
                    </span>
                    <span className="font-bold text-[#0D2040] block">
                      www.minmurasu.digital
                    </span>
                    <span className="text-xs text-slate-500">
                      {siteConfig.locations.coverageLine}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp banner */}
              <ProtectedWhatsApp
                message={siteConfig.whatsapp.messages.consultation}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    {siteConfig.businessHours.responseTime}
                  </div>
                  <div className="text-sm font-bold text-emerald-950">
                    {siteConfig.cta.whatsapp.label}
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    {siteConfig.businessHours.days}: {siteConfig.businessHours.hours}
                  </div>
                </div>
              </ProtectedWhatsApp>
            </div>

            <div className="p-5 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0D2040]">
                <ShieldCheck className="w-4 h-4 text-[#0082CA]" />
                <span>Our Privacy &amp; Data Minimization Promise</span>
              </div>
              <p>
                We respect your business confidentiality. We never sell or share your contact
                information with third-party aggregators. Your details are used exclusively
                for scoping and responding to your enquiry.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Consultation Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0D2040] mb-2">
                Project Enquiry &amp; Audit Request
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mb-8">
                Fill out the form below. We will review your website and current setup before our call.
              </p>

              {serverStatus.message && (
                <div
                  role="status"
                  className={`p-4 rounded-xl mb-6 text-xs sm:text-sm flex items-start gap-2.5 ${
                    serverStatus.type === "success"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {serverStatus.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <span>{serverStatus.message}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                onFocus={handleFormFocus}
                className="space-y-5"
                noValidate
              >
                {/* Dual Honeypot fields (hidden from human view, trap automated spam bots) */}
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
                  <label htmlFor="company-fax-trap">Company Fax</label>
                  <input
                    id="company-fax-trap"
                    type="text"
                    {...register("companyFax")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <label htmlFor="secondary-role-trap">Secondary Role</label>
                  <input
                    id="secondary-role-trap"
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
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
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

                  {/* Business Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
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

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Company / Organization Name
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      {...register("company")}
                      placeholder="e.g. Murugesan Industrial Pumps"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Website */}
                  <div>
                    <label
                      htmlFor="contact-website"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Current Website (if any)
                    </label>
                    <input
                      id="contact-website"
                      type="url"
                      {...register("website")}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                  </div>

                  {/* Primary Service Interest */}
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Primary Service Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="contact-service"
                      {...register("service")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040] bg-white"
                    >
                      <option value="digital-strategy">Digital Strategy &amp; Growth Audit</option>
                      <option value="seo-local-seo">SEO &amp; Local Google Maps Visibility</option>
                      <option value="generative-engine-optimisation">Generative Engine Optimisation (GEO / AI Search)</option>
                      <option value="google-meta-ads">Google Ads &amp; Meta Performance Campaigns</option>
                      <option value="website-landing-pages">Website &amp; Landing Page Engineering</option>
                      <option value="ai-business-automation">AI Chatbot &amp; WhatsApp Workflow Automation</option>
                      <option value="comprehensive-retainer">Integrated Multi-Channel Growth System</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    Brief Project Details &amp; Objectives <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    aria-invalid={!!errors.message}
                    {...register("message")}
                    placeholder="Tell us what you want to achieve (e.g. increase appointment enquiries for our clinic, launch a B2B product catalogue, fix low-converting ad campaigns)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <fieldset>
                  <legend className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    Preferred Follow-Up Method
                  </legend>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="whatsapp"
                        {...register("preferredContact")}
                        className="text-[#0082CA] focus:ring-[#0082CA]"
                      />
                      <span>WhatsApp Message</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="phone"
                        {...register("preferredContact")}
                        className="text-[#0082CA] focus:ring-[#0082CA]"
                      />
                      <span>Phone Call</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="email"
                        {...register("preferredContact")}
                        className="text-[#0082CA] focus:ring-[#0082CA]"
                      />
                      <span>Email</span>
                    </label>
                  </div>
                </fieldset>

                {/* Explicit Opt-in Consent Checkbox (Unchecked by default per GDPR/DPDP compliance) */}
                <div className="pt-2">
                  <label
                    htmlFor="contact-consent"
                    className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer"
                  >
                    <input
                      id="contact-consent"
                      type="checkbox"
                      aria-invalid={!!errors.consent}
                      {...register("consent")}
                      className="mt-0.5 rounded text-[#0082CA] focus:ring-[#0082CA]"
                    />
                    <span>
                      I explicitly consent to be contacted by MIN MURASU regarding this enquiry in accordance with the{" "}
                      <Link href="/privacy-policy" className="text-[#0082CA] font-semibold underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="text-[#0082CA] font-semibold underline">
                        Terms &amp; Conditions
                      </Link>
                      . <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <Button
                    variant="orange"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full justify-center text-base font-bold shadow-md shadow-orange-950/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                        Submitting Enquiry...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Submit Project Enquiry
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

