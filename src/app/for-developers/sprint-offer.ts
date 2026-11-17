/**
 * Distribution Sprint offer, kept in one place so the test page can be re-priced
 * without touching the layout. These are draft values: confirm before outreach.
 */
export const sprintOffer: {
  name: string;
  durationDays: number;
  price: string;
  priceNote: string;
  /** Shown struck through next to the price when set. */
  regularPrice: string | null;
  foundingSlots: number;
} = {
  name: "Distribution Sprint",
  durationDays: 14,
  price: "₹49,999",
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
