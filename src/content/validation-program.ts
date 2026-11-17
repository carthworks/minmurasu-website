import type { Currency } from "@/content/pricing";

/**
 * Validation Launchpad: smoke-test offer for startups and SMEs.
 *
 * This page tests demand before the program exists in full. It is deliberately kept
 * out of src/content/pricing.ts (and so out of /pricing) until the go/kill criteria
 * below are met. Change the price here and the page follows.
 *
 * Go/kill criteria (30 days of traffic):
 * - ≥ 5 qualified founder applications
 * - ≥ 2 applicants who say yes to the refundable deposit, and then actually pay it
 * - ≥ 15 SMEs who join the buyer panel
 */
export const validationOffer: {
  name: string;
  durationWeeks: number;
  price: Record<Currency, number>;
  deposit: Record<Currency, number>;
  cohortSlots: number;
} = {
  name: "Validation Launchpad",
  durationWeeks: 4,
  price: { INR: 24999, USD: 390 },
  deposit: { INR: 5000, USD: 80 },
  cohortSlots: 5,
};

export const ventureStages = [
  { value: "idea", label: "Idea only, nothing built" },
  { value: "prototype", label: "Prototype or MVP, no users yet" },
  { value: "early-users", label: "Some users, nobody paying" },
  { value: "early-revenue", label: "A few paying customers" },
] as const;

export const depositAnswers = [
  { value: "yes", label: "Yes, I'd pay it to hold a slot" },
  { value: "maybe", label: "Maybe, after a call" },
  { value: "no", label: "No, not right now" },
] as const;

export const panelSectors = [
  { value: "healthcare", label: "Healthcare / clinics" },
  { value: "real-estate", label: "Real estate / construction" },
  { value: "manufacturing", label: "Manufacturing / industrial" },
  { value: "education", label: "Education / training" },
  { value: "retail-services", label: "Retail / local services" },
  { value: "other", label: "Other" },
] as const;
