import { getPlan, type Currency } from "@/content/pricing";

/**
 * Distribution Sprint offer. The price comes from src/content/pricing.ts so /pricing
 * and this page always agree; render it with <Price amounts={...} /> so it follows
 * the visitor's INR/USD choice.
 */
export const sprintOffer: {
  name: string;
  durationDays: number;
  price: Record<Currency, number>;
  priceNote: string;
  /** Shown struck through next to the price when set. */
  regularPrice: Record<Currency, number> | null;
  foundingSlots: number;
} = {
  name: "Distribution Sprint",
  durationDays: 14,
  price: getPlan("distribution-sprint").price,
  priceNote: "Founding price for the first 3 clients, in exchange for a public case study.",
  regularPrice: null,
  foundingSlots: 3,
};

export const productStages = [
  { value: "pre-revenue", label: "Shipped, no paying customers yet" },
  { value: "under-1k", label: "Under $1k MRR" },
  { value: "1k-5k", label: "$1k – $5k MRR" },
  { value: "5k-plus", label: "$5k+ MRR" },
] as const;
