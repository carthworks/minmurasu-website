import type { CaseStudy } from "./types";

/**
 * TEMPLATE: copy this file to `<slug>.ts`, replace every value with real, dated data,
 * set status to "published" once consent is on file, and add it to the list in ./index.ts.
 *
 * Everything below is SAMPLE DATA so the layout can be previewed in development at
 * /case-studies/sample-template. Drafts are never served in production.
 *
 * Checklist before publishing:
 *  [ ] Written consent from the client (email or signed form), date recorded below
 *  [ ] Baseline captured on day 0 (Search Console, rank tracker, GBP insights, lead count)
 *  [ ] Every metric names its source; every screenshot shows its date range
 *  [ ] Rankings measured from the stated location with the stated tool
 *  [ ] Healthcare: no patient testimonials, no outcome promises (NMC 2026 guidelines)
 *  [ ] Screenshots cropped to hide other clients' data, emails and revenue the client hasn't approved
 */
export const sampleTemplate: CaseStudy = {
  slug: "sample-template",
  status: "draft",
  consent: { written: false },

  client: {
    name: undefined, // e.g. "Sri Example Clinic", or leave undefined to anonymise
    descriptor: "Multi-specialty clinic (sample)",
    city: "Coimbatore",
    industry: "Healthcare",
  },

  title: "Sample: Clinic in Coimbatore grows organic enquiries in 6 months",
  seoTitle: "Sample Case Study: Clinic SEO in Coimbatore",
  description:
    "SAMPLE DATA. How a Coimbatore clinic moved from page 3 to the Google Maps 3-pack and grew monthly enquiries from search.",
  excerpt:
    "SAMPLE DATA. Local SEO, Google Business Profile clean-up and WhatsApp booking for a multi-specialty clinic.",
  services: ["seo-local-seo", "ai-business-automation"],

  period: { start: "2027-03", end: "2027-08" },
  publishedAt: "2027-09-01",
  updatedAt: "2027-09-01",

  challenge:
    "The clinic ranked on page 3 for its main treatments, its Google Business Profile had the wrong category, and enquiries from the website were answered hours later.",
  work: [
    "Fixed the Google Business Profile: primary category, services, hours and real photos.",
    "Rebuilt treatment and doctor pages with clear answers, pricing ranges and **MedicalClinic** schema.",
    "Set up an honest review-request flow at reception (QR code, no incentives).",
    "Connected website and WhatsApp enquiries to the CRM with an instant reply.",
  ],
  metrics: [
    { label: "Organic clicks / month", before: "140", after: "610", change: "+336%", source: "Google Search Console" },
    { label: "Keywords in top 3", before: "0", after: "9", source: "SE Ranking" },
    { label: "Search enquiries / month", before: "12", after: "41", change: "+29", source: "Clinic CRM" },
  ],

  rankings: [
    { keyword: "dermatologist in coimbatore", before: 34, after: 3 },
    { keyword: "skin clinic rs puram", before: 21, after: 1 },
    { keyword: "laser hair removal coimbatore", before: null, after: 6 },
    { keyword: "acne treatment coimbatore", before: 48, after: 4 },
    { keyword: "best physiotherapy near gandhipuram", before: 27, after: 2 },
  ],
  rankingMeta: {
    tool: "SE Ranking",
    location: "Coimbatore, Tamil Nadu",
    baselineDate: "2027-03-01",
    currentDate: "2027-08-31",
  },

  proof: [
    {
      src: "/images/case-studies/proof-placeholder.svg",
      alt: "Placeholder for a dated Google Search Console performance screenshot",
      caption: "Google Search Console, Performance report, 1 Mar – 31 Aug 2027 (replace with the real screenshot).",
      width: 1200,
      height: 600,
    },
  ],

  testimonial: undefined, // healthcare: keep this to the clinic owner/manager, never patients

  cta: {
    title: "Want a baseline like this for your business?",
    text: "Our free audit records where you stand today, so progress can be measured honestly.",
    href: "/free-audit",
    label: "Get your free audit",
  },
};
