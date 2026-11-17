"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { siteConfig } from "@/lib/site-config";
import { trackEvent, trackLeadSubmission } from "@/lib/analytics";
import { submitLead } from "@/lib/leads/client";
import { formatPrice } from "@/content/pricing";
import { useCurrency } from "@/lib/currency";
import {
  depositAnswers,
  panelSectors,
  validationOffer,
  ventureStages,
} from "@/content/validation-program";

type Mode = "founder" | "panel";

const COPY: Record<
  Mode,
  {
    source: "validation-program" | "buyer-panel";
    service: string;
    tag: string;
    companyLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    footnote: string;
  }
> = {
  founder: {
    source: "validation-program",
    service: "validation-launchpad",
    tag: "VALIDATION LAUNCHPAD APPLICATION",
    companyLabel: "Startup / business name",
    messageLabel: "What problem do you solve, and for whom?",
    messagePlaceholder:
      "e.g. Clinics in Tier-2 cities lose 30% of appointments to no-shows. We built a WhatsApp reminder tool. 3 clinics use it free.",
    submit: "Apply for the next cohort",
    footnote: "No payment now. We reply within 2 business days.",
  },
  panel: {
    source: "buyer-panel",
    service: "buyer-panel",
    tag: "BUYER PANEL SIGNUP",
    companyLabel: "Business name",
    messageLabel: "What's one problem in your business you'd pay to have solved?",
    messagePlaceholder: "e.g. Following up on enquiries that come in after office hours.",
    submit: "Join the buyer panel",
    footnote: "Free to join. You choose which sessions to take.",
  },
};

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040] bg-white";
const labelClass = "block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

export default function ValidationForm({ mode }: { mode: Mode }) {
  const copy = COPY[mode];
  const id = (name: string) => `${mode}-${name}`;
  const router = useRouter();
  const currency = useCurrency();
  const [stage, setStage] = useState<string>(ventureStages[0].value);
  const [deposit, setDeposit] = useState<string>(depositAnswers[0].value);
  const [sector, setSector] = useState<string>(panelSectors[0].value);
  const [error, setError] = useState<string | null>(null);
  const [hasFocused, setHasFocused] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { preferredContact: "whatsapp", service: copy.service, formLoadedAt: 0 },
  });

  const handleFormFocus = () => {
    if (!hasFocused) {
      setHasFocused(true);
      setValue("formLoadedAt", Date.now());
    }
  };

  const depositLabel = formatPrice(validationOffer.deposit[currency], currency);

  const onSubmit = async (data: ContactFormData) => {
    setError(null);
    const label = <T extends { value: string; label: string }>(list: readonly T[], v: string) =>
      list.find((x) => x.value === v)?.label ?? v;

    const summary =
      mode === "founder"
        ? `Stage: ${label(ventureStages, stage)} | Deposit (${depositLabel}): ${label(depositAnswers, deposit)}`
        : `Sector: ${label(panelSectors, sector)}`;
    const meta: Record<string, string> =
      mode === "founder"
        ? { venture_stage: stage, deposit_intent: deposit, currency }
        : { sector };

    try {
      await submitLead(copy.source, { ...data, message: `[${copy.tag}] ${summary} | ${data.message}` }, meta);
      trackEvent("audit_request", {
        service_category: copy.service,
        ...(mode === "founder" ? { deposit_intent: deposit } : {}),
      });
      trackLeadSubmission(copy.service);
      reset();
      router.push("/thank-you");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please email us instead.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} className="space-y-4 text-left" noValidate>
      {/* Dual honeypot fields */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor={id("fax-trap")}>Company Fax</label>
        <input id={id("fax-trap")} type="text" {...register("companyFax")} tabIndex={-1} autoComplete="off" />
        <label htmlFor={id("role-trap")}>Secondary Role</label>
        <input id={id("role-trap")} type="text" {...register("secondaryRole")} tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" {...register("service")} />

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Your name <span className="text-red-500">*</span>
          </label>
          <input id={id("name")} type="text" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} className={inputClass} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelClass}>
            Email <span className="text-red-500">*</span>
          </label>
          <input id={id("email")} type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} className={inputClass} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor={id("company")} className={labelClass}>
            {copy.companyLabel}
          </label>
          <input id={id("company")} type="text" autoComplete="organization" {...register("company")} className={inputClass} />
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelClass}>
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input id={id("phone")} type="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} className={inputClass} />
          <FieldError message={errors.phone?.message} />
        </div>

        {mode === "founder" ? (
          <>
            <div>
              <label htmlFor={id("stage")} className={labelClass}>
                Where are you today? <span className="text-red-500">*</span>
              </label>
              <select id={id("stage")} value={stage} onChange={(e) => setStage(e.target.value)} className={inputClass}>
                {ventureStages.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={id("url")} className={labelClass}>
                Website or demo link
              </label>
              <input id={id("url")} type="url" placeholder="https://" {...register("website")} className={inputClass} />
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label htmlFor={id("sector")} className={labelClass}>
              Your industry <span className="text-red-500">*</span>
            </label>
            <select id={id("sector")} value={sector} onChange={(e) => setSector(e.target.value)} className={inputClass}>
              {panelSectors.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label htmlFor={id("message")} className={labelClass}>
          {copy.messageLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          id={id("message")}
          rows={4}
          aria-invalid={!!errors.message}
          placeholder={copy.messagePlaceholder}
          {...register("message")}
          className={inputClass}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {mode === "founder" && (
        <fieldset>
          <legend className={labelClass}>
            Would you pay a refundable {depositLabel} deposit to hold a cohort slot?{" "}
            <span className="text-red-500">*</span>
          </legend>
          <div className="flex flex-col gap-2 text-sm text-slate-700">
            {depositAnswers.map((d) => (
              <label key={d.value} className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={id("deposit")}
                  value={d.value}
                  checked={deposit === d.value}
                  onChange={() => setDeposit(d.value)}
                  className="text-[#0082CA] focus:ring-[#0082CA]"
                />
                <span>{d.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className={labelClass}>Best way to reach you</legend>
        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
          {(
            [
              ["whatsapp", "WhatsApp"],
              ["email", "Email"],
              ["phone", "Phone call"],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="inline-flex items-center gap-2 cursor-pointer">
              <input type="radio" value={value} {...register("preferredContact")} className="text-[#0082CA] focus:ring-[#0082CA]" />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="pt-1">
        <label htmlFor={id("consent")} className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input
            id={id("consent")}
            type="checkbox"
            aria-invalid={!!errors.consent}
            {...register("consent")}
            className="mt-0.5 rounded text-[#0082CA] focus:ring-[#0082CA]"
          />
          <span>
            I agree to be contacted by {siteConfig.name} about this, per the{" "}
            <Link href="/privacy-policy" className="text-[#0082CA] font-semibold underline">
              Privacy Policy
            </Link>
            . <span className="text-red-500">*</span>
          </span>
        </label>
        <FieldError message={errors.consent?.message} />
      </div>

      <Button variant="orange" size="lg" type="submit" disabled={isSubmitting} className="w-full justify-center text-base font-bold">
        <span className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          {isSubmitting ? "Sending..." : copy.submit}
        </span>
      </Button>
      <p className="text-[11px] text-slate-500 text-center">{copy.footnote}</p>
    </form>
  );
}
