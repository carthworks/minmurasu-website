import type { ContactFormData } from "@/lib/validation";
import { getLeadAttribution } from "@/lib/analytics";
import type { LeadMeta, LeadSource } from "./types";

export interface SubmitLeadResult {
  success: true;
  leadId?: string;
  message: string;
}

/** Browser helper: posts a lead with its source, structured meta and attribution. Throws on failure. */
export async function submitLead(
  source: LeadSource,
  data: ContactFormData,
  meta?: LeadMeta
): Promise<SubmitLeadResult> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, source, meta, attribution: getLeadAttribution() }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || "Submission failed. Please try again.");
  }
  return result as SubmitLeadResult;
}
