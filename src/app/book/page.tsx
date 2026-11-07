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
import { trackLeadSubmission, trackConsultationClick } from "@/lib/analytics";
import { ToastItem, type Toast } from "@/components/ui/Toast";
import { feedback } from "@/lib/vibe-feedback";
import {
  CalendarCheck,
  Clock,
  Video,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Sparkles,
} from "lucide-react";

const agendaItems = [
  {
    minute: "Min 01 – 10",
    title: "Commercial Objectives & Bottleneck Diagnosis",
    desc: "We review your current enquiry volume, target customer profile, and where leads are dropping off.",
  },
  {
    minute: "Min 10 – 20",
    title: "Live Website, SEO & AI Search Walkthrough",
    desc: "We inspect your site speed, local Google rankings, and how AI engines (ChatGPT/Gemini) view your brand.",
  },
  {
    minute: "Min 20 – 30",
    title: "Actionable 90-Day Growth & Automation Plan",
    desc: "Clear recommendations on channels, website fixes, and WhatsApp/CRM automation—with transparent scope options.",
  },
];

const timeSlots = [
  "Morning (10:00 AM – 12:30 PM IST)",
  "Afternoon (2:00 PM – 4:30 PM IST)",
  "Evening (4:30 PM – 6:30 PM IST)",
];

const meetingModes = [
  { id: "google-meet", label: "Google Meet / Zoom Video", icon: Video },
  { id: "phone-call", label: "Direct Phone Call", icon: PhoneCall },
  { id: "whatsapp-call", label: "WhatsApp Call / Chat", icon: MessageSquare },
];

export default function BookConsultationPage() {
  const router = useRouter();
  const [selectedDayOffset, setSelectedDayOffset] = useState<string>("Tomorrow");
  const [selectedSlot, setSelectedSlot] = useState<string>(timeSlots[0]);
  const [selectedMode, setSelectedMode] = useState<string>("Google Meet / Zoom Video");
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
        message: `[30-MIN CONSULTATION BOOKING] Preferred Day: ${selectedDayOffset} | Time Slot: ${selectedSlot} | Format: ${selectedMode} | Notes: ${data.message}`,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Booking request failed. Please try again.");
      }

      feedback.playPop();
      feedback.triggerHaptic([15, 30, 15]);

      trackConsultationClick("book_page_submit");
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
        id: "book-error",
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
          {/* Left Column: Consultation Host & 30-Min Agenda */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2040] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
                <span>30-Minute Strategy Session &bull; Free</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-[#0D2040] tracking-tight leading-[1.15] mb-4">
                Book Your 1-on-1 Growth &amp; Automation Consultation.
              </h1>

              <div className="w-20 h-1.5 bg-[#F58220] rounded-full mb-5" />

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                Speak directly with our technical founder—not a junior sales script reader.
                We’ll evaluate your current digital presence and map out the fastest path to
                qualified enquiries.
              </p>
            </div>

            {/* Host Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0D2040] text-white font-black text-base flex items-center justify-center shrink-0">
                  KT
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0082CA]">
                    <UserCheck className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>Your Session Host</span>
                  </div>
                  <h2 className="text-lg font-black text-[#0D2040]">
                    {siteConfig.founderDetails.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {siteConfig.founderDetails.role}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#0D2040]">
                  <Clock className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>30 Minutes</span>
                </span>
                <span>&bull;</span>
                <span>English / தமிழ் (Tamil)</span>
                <span>&bull;</span>
                <span>{siteConfig.businessHours.days}</span>
              </div>
            </div>

            {/* 30-Minute Call Agenda */}
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0D2040]">
                What We’ll Cover in 30 Minutes:
              </h2>
              {agendaItems.map((item) => (
                <div
                  key={item.minute}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0D2040]">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#F58220] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                      {item.minute}
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* No-Pressure Promise */}
            <div className="p-5 rounded-2xl bg-[#0D2040] text-white space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#38BDF8] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
                <span>Zero High-Pressure Sales Pitch</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                If we aren’t the right fit for your stage or industry, we will tell you
                honestly and still leave you with practical recommendations you can execute
                internally.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Slot Picker & Booking Form */}
          <div className="lg:col-span-7">
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
                <h2 className="text-2xl font-black text-[#0D2040]">
                  Select Your Preferred Time &amp; Format
                </h2>
                <p className="text-xs sm:text-sm text-[#475569] mt-1">
                  Choose a convenient window below. We will confirm your calendar invite via WhatsApp and email immediately.
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
                className="space-y-5"
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
                  <label htmlFor="book-fax-trap">Company Fax</label>
                  <input
                    id="book-fax-trap"
                    type="text"
                    {...register("companyFax")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <label htmlFor="book-role-trap">Secondary Role</label>
                  <input
                    id="book-role-trap"
                    type="text"
                    {...register("secondaryRole")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Step 1: Preferred Day Pill Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    1. Preferred Day (Mon – Sat)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {["Today / ASAP", "Tomorrow", "In 2 Days", "This Weekend (Sat)"].map(
                      (day) => {
                        const active = selectedDayOffset === day;
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              feedback.triggerHaptic(10);
                              setSelectedDayOffset(day);
                            }}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              active
                                ? "bg-[#0D2040] text-white border-[#0D2040] shadow-xs"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0082CA]"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Step 2: Time Window Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    2. Preferred Time Window (IST)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {timeSlots.map((slot) => {
                      const active = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            feedback.triggerHaptic(10);
                            setSelectedSlot(slot);
                          }}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-left sm:text-center ${
                            active
                              ? "bg-[#F0F8FF] text-[#0082CA] border-2 border-[#0082CA]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0082CA]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Meeting Mode Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    3. Consultation Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {meetingModes.map((mode) => {
                      const Icon = mode.icon;
                      const active = selectedMode === mode.label;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => {
                            feedback.triggerHaptic(10);
                            setSelectedMode(mode.label);
                          }}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            active
                              ? "bg-[#0D2040] text-white border-[#0D2040]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0082CA]"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-[#F58220]" />
                          <span>{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label
                      htmlFor="book-name"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-name"
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

                  <div>
                    <label
                      htmlFor="book-phone"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-phone"
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
                  <div>
                    <label
                      htmlFor="book-email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Work Email (for Calendar Invite) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="book-email"
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

                  <div>
                    <label
                      htmlFor="book-website"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Company Website (if any)
                    </label>
                    <input
                      id="book-website"
                      type="url"
                      {...register("website")}
                      placeholder="https://yourcompany.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="book-company"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Company / Organization Name
                    </label>
                    <input
                      id="book-company"
                      type="text"
                      {...register("company")}
                      placeholder="e.g. Murugesan Industrial"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="book-service"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                    >
                      Primary Topic to Discuss <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="book-service"
                      {...register("service")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040] bg-white"
                    >
                      <option value="digital-strategy">Digital Strategy &amp; Full Growth System</option>
                      <option value="seo-local-seo">SEO &amp; Local Google Maps Visibility</option>
                      <option value="generative-engine-optimisation">Generative Engine Optimisation (GEO)</option>
                      <option value="google-meta-ads">Google Ads &amp; Meta Performance Campaigns</option>
                      <option value="website-landing-pages">Website &amp; Landing Page Development</option>
                      <option value="ai-business-automation">AI Chatbot &amp; WhatsApp Automation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="book-message"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                  >
                    What Would You Like to Achieve from This Call? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="book-message"
                    rows={3}
                    aria-invalid={!!errors.message}
                    {...register("message")}
                    placeholder="Briefly share your business goals, target market, or current marketing bottlenecks..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040]"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label
                    htmlFor="book-consent"
                    className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer"
                  >
                    <input
                      id="book-consent"
                      type="checkbox"
                      aria-invalid={!!errors.consent}
                      {...register("consent")}
                      className="mt-0.5 rounded text-[#0082CA] focus:ring-[#0082CA]"
                    />
                    <span>
                      I agree to receive calendar confirmation and consultation follow-up from{" "}
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

                {/* Submit Button */}
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
                        Confirming Your Slot...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4" />
                        Confirm 30-Minute Consultation
                      </span>
                    )}
                  </Button>
                </div>

                {/* Instant WhatsApp Booking Alternative */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0082CA]" />
                    <span>Confirmed within business hours</span>
                  </span>
                  <ProtectedWhatsApp
                    message={siteConfig.whatsapp.messages.consultation}
                    className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 underline underline-offset-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Or book directly via WhatsApp</span>
                  </ProtectedWhatsApp>
                </div>
              </form>
            </div>

            {/* Direct Contact Strip below form */}
            <div className="mt-4 px-4 py-3 rounded-2xl bg-white/80 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <span>Need an urgent same-day call?</span>
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

