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
import { productStages } from "./sprint-offer";

const SERVICE = "distribution-sprint";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0082CA] focus:ring-1 focus:ring-[#0082CA] outline-hidden text-[#0D2040] bg-white";
const labelClass = "block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

export default function SprintApplyForm() {
  const router = useRouter();
  const [stage, setStage] = useState<string>(productStages[0].value);
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
    defaultValues: {
      preferredContact: "email",
      service: SERVICE,
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
    setError(null);
    const stageLabel = productStages.find((s) => s.value === stage)?.label ?? stage;
    try {
      await submitLead(
        "for-developers",
        {
          ...data,
          message: `[DISTRIBUTION SPRINT APPLICATION] Stage: ${stageLabel} | Details: ${data.message}`,
        },
        { product_stage: stage }
      );
      trackEvent("audit_request", { service_category: SERVICE });
      trackLeadSubmission(SERVICE);
      reset();
      router.push("/thank-you");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please email us instead."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFormFocus}
      className="space-y-4 text-left"
      noValidate
    >
      {/* Dual honeypot fields */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="dev-fax-trap">Company Fax</label>
        <input id="dev-fax-trap" type="text" {...register("companyFax")} tabIndex={-1} autoComplete="off" />
        <label htmlFor="dev-role-trap">Secondary Role</label>
        <input id="dev-role-trap" type="text" {...register("secondaryRole")} tabIndex={-1} autoComplete="off" />
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
          <label htmlFor="dev-name" className={labelClass}>
            Your name <span className="text-red-500">*</span>
          </label>
          <input id="dev-name" type="text" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} className={inputClass} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="dev-email" className={labelClass}>
            Email <span className="text-red-500">*</span>
          </label>
          <input id="dev-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} className={inputClass} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="dev-product" className={labelClass}>
            Product name
          </label>
          <input id="dev-product" type="text" {...register("company")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="dev-url" className={labelClass}>
            Product URL
          </label>
          <input id="dev-url" type="url" placeholder="https://yourproduct.com" {...register("website")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="dev-stage" className={labelClass}>
            Where is it today? <span className="text-red-500">*</span>
          </label>
          <select id="dev-stage" value={stage} onChange={(e) => setStage(e.target.value)} className={inputClass}>
            {productStages.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dev-phone" className={labelClass}>
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input id="dev-phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} className={inputClass} />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="dev-message" className={labelClass}>
          What have you tried so far, and what happened? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="dev-message"
          rows={4}
          aria-invalid={!!errors.message}
          placeholder="e.g. Launched on Product Hunt, got 200 signups, 2 paid. Posted on Reddit twice. Nothing since."
          {...register("message")}
          className={inputClass}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <fieldset>
        <legend className={labelClass}>Best way to reach you</legend>
        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
          {(
            [
              ["email", "Email"],
              ["whatsapp", "WhatsApp"],
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
        <label htmlFor="dev-consent" className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input
            id="dev-consent"
            type="checkbox"
            aria-invalid={!!errors.consent}
            {...register("consent")}
            className="mt-0.5 rounded text-[#0082CA] focus:ring-[#0082CA]"
          />
          <span>
            I agree to be contacted by {siteConfig.name} about this application, per the{" "}
            <Link href="/privacy-policy" className="text-[#0082CA] font-semibold underline">
              Privacy Policy
            </Link>
            . <span className="text-red-500">*</span>
          </span>
        </label>
        <FieldError message={errors.consent?.message} />
      </div>

      <Button
        variant="orange"
        size="lg"
        type="submit"
        disabled={isSubmitting}
        className="w-full justify-center text-base font-bold"
      >
        <span className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          {isSubmitting ? "Sending..." : "Apply for a sprint slot"}
        </span>
      </Button>
      <p className="text-[11px] text-slate-500 text-center">
        No payment now. I reply within 2 business days with a yes, a no, or questions.
      </p>
    </form>
  );
}
