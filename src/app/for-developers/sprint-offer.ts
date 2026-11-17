/**
 * Distribution Sprint offer, kept in one place so the test page can be re-priced
 * without touching the layout. These are draft values: confirm before outreach.
 */
export const sprintOffer = {
  name: "Distribution Sprint",
  durationDays: 14,
  price: "$990",
  priceNote: "Founding price for the first 3 clients, in exchange for a public case study.",
  regularPrice: "$1,900",
  foundingSlots: 3,
} as const;

export const productStages = [
  { value: "pre-revenue", label: "Shipped, no paying customers yet" },
  { value: "under-1k", label: "Under $1k MRR" },
  { value: "1k-5k", label: "$1k – $5k MRR" },
  { value: "5k-plus", label: "$5k+ MRR" },
] as const;
