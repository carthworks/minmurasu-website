"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowRight, Lock } from "lucide-react";
import { contactFormSchema } from "@/lib/validation";
import { trackEvent, trackLeadSubmission } from "@/lib/analytics";
import { submitLead } from "@/lib/leads/client";
import { crmPlans, teamSizes } from "./crm-content";

const SERVICE = "white-label-crm";

/** Short demo form: reuses the site's contact rules, then maps onto the shared lead payload. */
const crmFormSchema = z.object({
  name: contactFormSchema.shape.name,
  email: contactFormSchema.shape.email,
  phone: contactFormSchema.shape.phone,
  company: z.string().trim().min(2, "Please enter your agency name.").max(100),
  teamSize: z.string().min(1, "Please pick your team size."),
  plan: z.string().optional(),
  consent: contactFormSchema.shape.consent,
  companyFax: contactFormSchema.shape.companyFax,
  secondaryRole: contactFormSchema.shape.secondaryRole,
  formLoadedAt: z.number().optional(),
});

type CrmFormData = z.infer<typeof crmFormSchema>;

const inputClass =
  "w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm text-[#0D2040] bg-white outline-hidden focus:border-[#0082CA] focus:ring-2 focus:ring-[#0082CA]/20 transition";
const labelClass = "block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-600 text-xs mt-1">{message}</p>;
}

export default function CrmLeadForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [hasFocused, setHasFocused] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CrmFormData>({
    resolver: zodResolver(crmFormSchema),
    defaultValues: { teamSize: "", plan: "", formLoadedAt: 0 },
  });

  const handleFormFocus = () => {
    if (!hasFocused) {
      setHasFocused(true);
      setValue("formLoadedAt", Date.now());
    }
  };

  const onSubmit = async (data: CrmFormData) => {
    setError(null);
    const planLabel = crmPlans.find((p) => p.id === data.plan)?.name ?? "Not sure yet";
    try {
      await submitLead(
        "crm",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: SERVICE,
          preferredContact: "whatsapp",
          consent: data.consent,
          companyFax: data.companyFax,
          secondaryRole: data.secondaryRole,
          formLoadedAt: data.formLoadedAt,
          message: `[CRM DEMO REQUEST] Agency: ${data.company} | Team size: ${data.teamSize} | Plan interest: ${planLabel}`,
        },
        { team_size: data.teamSize, plan_interest: data.plan || "unsure" }
      );
      trackEvent("audit_request", { service_category: SERVICE });
      trackLeadSubmission(SERVICE);
      reset();
      router.push("/thank-you");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please message us on WhatsApp instead."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} className="space-y-4 text-left" noValidate>
      {/* Honeypots — must stay empty */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="crm-fax-trap">Company Fax</label>
        <input id="crm-fax-trap" type="text" {...register("companyFax")} tabIndex={-1} autoComplete="off" />
        <label htmlFor="crm-role-trap">Secondary Role</label>
        <input id="crm-role-trap" type="text" {...register("secondaryRole")} tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="crm-name" className={labelClass}>Your name</label>
          <input id="crm-name" type="text" autoComplete="name" placeholder="Priya Raman" aria-invalid={!!errors.name} {...register("name")} className={inputClass} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="crm-company" className={labelClass}>Agency name</label>
          <input id="crm-company" type="text" autoComplete="organization" placeholder="Bright Pixel Media" aria-invalid={!!errors.company} {...register("company")} className={inputClass} />
          <FieldError message={errors.company?.message} />
        </div>
        <div>
          <label htmlFor="crm-email" className={labelClass}>Work email</label>
          <input id="crm-email" type="email" autoComplete="email" placeholder="you@youragency.in" aria-invalid={!!errors.email} {...register("email")} className={inputClass} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="crm-phone" className={labelClass}>WhatsApp number</label>
          <input id="crm-phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" aria-invalid={!!errors.phone} {...register("phone")} className={inputClass} />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <label htmlFor="crm-team" className={labelClass}>Team size</label>
          <select id="crm-team" aria-invalid={!!errors.teamSize} {...register("teamSize")} className={inputClass}>
            <option value="" disabled>Select…</option>
            {teamSizes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <FieldError message={errors.teamSize?.message} />
        </div>
        <div>
          <label htmlFor="crm-plan" className={labelClass}>Plan of interest</label>
          <select id="crm-plan" {...register("plan")} className={inputClass}>
            <option value="">Not sure yet</option>
            {crmPlans.map((p) => (
              <option key={p.id} value={p.id}>{p.name} · {p.price}/mo</option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed cursor-pointer">
        <input type="checkbox" {...register("consent")} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#F58220]" />
        <span>I agree to be contacted by MIN MURASU about a CRM demo by email, phone or WhatsApp.</span>
      </label>
      <FieldError message={errors.consent?.message} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#F58220] px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#E06F12] hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
      >
        {isSubmitting ? "Booking…" : "Book my 20-minute demo"}
        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
        <Lock className="w-3 h-3" /> No spam. We reply within one business day.
      </p>
    </form>
  );
}
