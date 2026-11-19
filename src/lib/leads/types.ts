import { z } from "zod";
import { contactFormSchema } from "@/lib/validation";

/** Every surface that can create a lead. Add new tools here (audit tool, AI strategy, etc.). */
export const LEAD_SOURCES = [
  "contact",
  "free-audit",
  "book",
  "roi-calculator",
  "for-developers",
  "validation-program",
  "buyer-panel",
  "crm",
] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

const shortText = z.string().trim().max(300);

/** Marketing attribution captured in the browser. Never contains PII. */
export const attributionSchema = z
  .object({
    utm_source: shortText.optional(),
    utm_medium: shortText.optional(),
    utm_campaign: shortText.optional(),
    utm_term: shortText.optional(),
    utm_content: shortText.optional(),
    gclid: shortText.optional(),
    gbraid: shortText.optional(),
    wbraid: shortText.optional(),
    fbclid: shortText.optional(),
    landing_page: shortText.optional(),
    referrer: shortText.optional(),
    first_seen_at: shortText.optional(),
    submitted_from: shortText.optional(),
  })
  .partial();
export type Attribution = z.infer<typeof attributionSchema>;

/** Structured, source-specific context (ROI inputs, booking slot, ...). Flat scalars only. */
export const leadMetaSchema = z
  .record(z.string().max(60), z.union([z.string().max(500), z.number(), z.boolean()]))
  .refine((m) => Object.keys(m).length <= 40, { message: "Too many meta fields." });
export type LeadMeta = z.infer<typeof leadMetaSchema>;

export const leadSubmissionSchema = contactFormSchema.extend({
  source: z.enum(LEAD_SOURCES).default("contact"),
  attribution: attributionSchema.optional(),
  meta: leadMetaSchema.optional(),
});
export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

/** The normalized lead record handed to storage, email and webhooks. */
export interface Lead {
  id: string;
  createdAt: string;
  source: LeadSource;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  website: string | null;
  service: string;
  budget: string | null;
  preferredContact: "phone" | "whatsapp" | "email";
  message: string;
  attribution: Attribution;
  meta: LeadMeta;
}

export function toLead(data: LeadSubmission, referer: string | null): Lead {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: data.source,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    company: data.company?.trim() || null,
    website: data.website?.trim() || null,
    service: data.service,
    budget: data.budget || null,
    preferredContact: data.preferredContact,
    message: data.message.trim(),
    attribution: {
      ...data.attribution,
      submitted_from: data.attribution?.submitted_from || referer || undefined,
    },
    meta: data.meta ?? {},
  };
}
