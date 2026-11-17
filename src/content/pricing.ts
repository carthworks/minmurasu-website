/**
 * Published plans and prices. Single source of truth for /pricing, the homepage
 * teaser and /for-developers.
 *
 * Pricing policy:
 * - INR prices are for clients in India and exclude 18% GST.
 * - USD prices are for clients outside India. They are set separately, not converted:
 *   roughly 1.5× the INR price at ~₹95.5/USD, rounded to a clean price point, which keeps
 *   them well below typical US/UK agency rates.
 * - Monthly plans include ad management up to the stated monthly ad spend; above that,
 *   management is 10% of the extra spend. Ad spend itself is always paid directly to
 *   Google/Meta.
 */

export type Currency = "INR" | "USD";

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  kind: "monthly" | "project";
  price: Record<Currency, number>;
  /** Show "From" before the price (scope can grow). */
  from?: boolean;
  timeline: string;
  featured?: boolean;
  /** Monthly ad spend covered by the management fee. */
  adSpendCap?: Record<Currency, number>;
  inclusions: string[];
  cta: { label: string; href: string };
  whatsappMsg: string;
}

export const AD_FEE_ABOVE_CAP = "10%";

export const plans: Plan[] = [
  {
    id: "local-visibility",
    name: "Local Visibility",
    tagline: "Get found on Google Maps and local search.",
    bestFor: "Single-location clinics, shops, coaching centres and service businesses.",
    kind: "monthly",
    price: { INR: 14999, USD: 249 },
    timeline: "Best results in 3–6 months",
    adSpendCap: { INR: 50000, USD: 700 },
    inclusions: [
      "Google Business Profile management, posts and photo updates",
      "Local SEO for one location: citations, location page, on-page fixes",
      "Review request workflow and response guidance",
      "Google Search Ads management (one campaign group)",
      "Call, WhatsApp and form tracking",
      "Monthly performance report",
    ],
    cta: { label: "Start Local Visibility", href: "/contact" },
    whatsappMsg: "Hello MIN MURASU, I'd like to start the Local Visibility plan.",
  },
  {
    id: "growth-engine",
    name: "Growth Engine",
    tagline: "A steady monthly flow of qualified enquiries.",
    bestFor: "Clinics, real estate, education and B2B companies ready to scale enquiries.",
    kind: "monthly",
    price: { INR: 39999, USD: 649 },
    timeline: "Recommended 3–6 month runway",
    featured: true,
    adSpendCap: { INR: 200000, USD: 2500 },
    inclusions: [
      "Everything in Local Visibility",
      "SEO and AI-search (GEO) content: 2 in-depth pages a month",
      "Google Ads and Meta Ads management with creative testing",
      "One new landing page or conversion test every month",
      "CRM conversion loop: qualified leads sent back to Google and Meta",
      "Live dashboard and monthly strategy call",
    ],
    cta: { label: "Start Growth Engine", href: "/contact" },
    whatsappMsg: "Hello MIN MURASU, I'd like to start the Growth Engine plan.",
  },
  {
    id: "scale-automation",
    name: "Scale & Automation",
    tagline: "Multi-location growth with AI and WhatsApp automation.",
    bestFor: "Multi-location brands and sales teams handling high enquiry volumes.",
    kind: "monthly",
    price: { INR: 89999, USD: 1490 },
    from: true,
    timeline: "Scoped after a technical discovery call",
    adSpendCap: { INR: 600000, USD: 7500 },
    inclusions: [
      "Everything in Growth Engine, across multiple locations",
      "WhatsApp Business API flows: qualification, brochures, appointments",
      "AI website assistant trained only on verified company facts",
      "Two-way CRM integration (Zoho, HubSpot, LeadSquared and others)",
      "Server-side tracking (Meta CAPI, Google Data Manager)",
      "Lead-routing SLAs and a fortnightly review call",
    ],
    cta: { label: "Scope Scale & Automation", href: "/contact" },
    whatsappMsg: "Hello MIN MURASU, I'd like to discuss the Scale & Automation plan.",
  },
  {
    id: "digital-foundation",
    name: "Digital Foundation",
    tagline: "A fast website with tracking and local SEO, built right once.",
    bestFor: "Businesses launching or rebuilding their website.",
    kind: "project",
    price: { INR: 39999, USD: 649 },
    from: true,
    timeline: "Delivered in 2–4 weeks",
    inclusions: [
      "Next.js website, 5–8 pages, designed for enquiries on mobile",
      "Technical SEO, schema markup and Search Console setup",
      "Google Business Profile setup and optimisation",
      "GA4 and Google Tag Manager conversion tracking",
      "Spam-protected forms and WhatsApp enquiry button",
      "100% ownership of code, domain and analytics",
    ],
    cta: { label: "Request a Foundation proposal", href: "/contact" },
    whatsappMsg: "Hello MIN MURASU, I'd like a proposal for the Digital Foundation project.",
  },
  {
    id: "distribution-sprint",
    name: "Distribution Sprint",
    tagline: "Take a shipped product to paying customers.",
    bestFor: "Developers and SaaS founders with a shipped product and stalled growth.",
    kind: "project",
    price: { INR: 49999, USD: 790 },
    timeline: "14 days, fixed scope",
    inclusions: [
      "Positioning and pricing review from your signup data",
      "Landing page rewrite that sells the outcome",
      "Analytics from visit to signup to paid",
      "One distribution channel launched with you",
      "30-day playbook to keep going alone",
      "Every asset left in your stack",
    ],
    cta: { label: "See the Distribution Sprint", href: "/for-developers" },
    whatsappMsg: "Hello MIN MURASU, I'd like to know more about the Distribution Sprint.",
  },
];

export function getPlan(id: string) {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export function formatPrice(amount: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
