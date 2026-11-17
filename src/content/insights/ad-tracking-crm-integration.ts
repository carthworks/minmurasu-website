import type { Article } from "./types";

export const adTrackingCrm: Article = {
  slug: "ad-tracking-crm-integration",
  title: "Connecting Ads to CRM: The Missing Link in Indian SME Marketing",
  seoTitle: "Connect Google & Meta Ads to Your CRM (2026 Guide)",
  description:
    "Stop optimising ads for junk form fills. How to send CRM lead stages back to Google Ads and Meta, what changed with Google's Data Manager API in 2026, and DPDP consent basics.",
  excerpt:
    "Most campaigns stop at counting form fills. How to pass click IDs into your CRM and send qualified-lead and sale events back to Google Ads and Meta, updated for Google's 2026 API changes.",
  category: "Analytics & Automation",
  keywords: [
    "offline conversion tracking",
    "enhanced conversions for leads",
    "Meta Conversions API",
    "Google Ads CRM integration",
    "Data Manager API",
    "lead quality tracking",
    "DPDP consent marketing",
  ],
  publishedAt: "2026-11-18",
  updatedAt: "2026-11-18",
  cover: {
    src: "/images/insights/ad-tracking-crm-integration.svg",
    alt: "Illustration of ad clicks flowing into a CRM pipeline and conversion signals flowing back to ad platforms",
  },
  body: [
    {
      type: "p",
      text: "Here is a pattern we see in almost every SME ad account we audit: the campaign is “optimised for leads”, the cost per lead looks great, and the sales team says most of those leads are junk. Both sides are right. The ad platform is doing exactly what it was told: find more people who fill in the form. **Nobody told it which form fills turned into customers.**",
    },
    {
      type: "p",
      text: "Closing that loop, feeding real lead quality from your CRM back to Google Ads and Meta, is the single highest-leverage tracking fix for most lead-generation businesses.",
    },
    { type: "h2", id: "the-loop", text: "The loop: from click to closed deal and back" },
    {
      type: "image",
      src: "/images/insights/ads-crm-loop.svg",
      alt: "Diagram: ad click with click ID goes to the website form, into the CRM, and qualified stages are sent back to Google Ads and Meta",
      caption: "The click ID and contact details travel with the lead; stage changes in the CRM become conversion events the ad platforms can learn from.",
      width: 1200,
      height: 560,
    },
    {
      type: "ol",
      items: [
        "**Capture identifiers on the form.** Store `gclid`, `gbraid` and `wbraid` (Google) and `fbclid` or the `_fbc` / `_fbp` cookies (Meta), plus UTM parameters, in hidden fields.",
        "**Store them with the lead in the CRM.** Zoho, HubSpot, a Google Sheet or a custom database all work, as long as the identifiers stay attached to the lead record.",
        "**Define stages that mean something:** for example Qualified, Meeting held, Proposal, Won. Each one becomes a conversion action.",
        "**Send stage changes back** to Google Ads and Meta with the identifiers, hashed contact details, a timestamp and, where you can, a value.",
        "**Optimise bidding toward the deeper stage** once enough of those conversions are flowing.",
      ],
    },
    { type: "h2", id: "google-ads-2026", text: "Google Ads: what changed in 2026" },
    {
      type: "p",
      text: "Google's recommended setup is **enhanced conversions for leads**: you send hashed email or phone numbers from your CRM, and Google matches them to ad interactions. It is more durable than relying on click IDs alone, and it works across devices.",
    },
    {
      type: "callout",
      tone: "warning",
      title: "API change from 15 June 2026",
      text: "Google announced that from 15 June 2026 the Google Ads API no longer accepts new adopters of offline conversion imports, including enhanced conversions for leads. New integrations should use the Data Manager API instead. Existing users can keep running while they migrate. If an agency or developer is building this for you now, make sure they are not building on the old path.",
    },
    {
      type: "p",
      text: "You do not always need code. Google Ads' own Data Manager, scheduled uploads and native CRM connectors can handle it for many SMEs. A custom integration (we often use an n8n workflow triggered by CRM stage changes) makes sense when your CRM has no native connector or you need values and stages mapped precisely.",
    },
    { type: "h2", id: "meta", text: "Meta: Conversions API and conversion leads" },
    {
      type: "p",
      text: "On Meta, the server-side **Conversions API** lets you send the same CRM stages as events, matched by hashed email, phone and the `fbc` / `fbp` values. For instant-form lead ads, the **conversion leads** optimisation uses these CRM events to find people more likely to become qualified leads, not just people who fill in forms. Use the same event ID for browser and server events so Meta can de-duplicate them.",
    },
    {
      type: "image",
      src: "/images/services/google-meta-ads.jpg",
      alt: "Google and Meta ads performance dashboard",
      caption: "Optimising for qualified leads usually raises cost per lead and lowers cost per customer, which is the number that matters.",
      width: 1376,
      height: 768,
    },
    { type: "h2", id: "stage-mapping", text: "A simple stage mapping to start with" },
    {
      type: "table",
      head: ["CRM stage", "Send as", "Value"],
      rows: [
        ["New enquiry (form, call, WhatsApp)", "Lead (primary for now)", "—"],
        ["Qualified by sales", "Qualified lead", "Estimated deal value × close rate"],
        ["Meeting or site visit held", "Meeting", "Optional"],
        ["Won", "Purchase / Closed deal", "Actual deal value"],
      ],
      caption: "Start bidding on “Qualified lead” once you have a steady flow of them (Google and Meta both need volume to learn).",
    },
    { type: "h2", id: "consent", text: "Consent and India's DPDP rules" },
    {
      type: "p",
      text: "India's Digital Personal Data Protection Rules were notified in November 2025 with a phased rollout: consent-manager provisions from November 2026 and most obligations, including consent notices, security safeguards and breach reporting, from May 2027. For ad tracking that means:",
    },
    {
      type: "ul",
      items: [
        "Tell people clearly, at the form, that their details will be used to contact them and to measure advertising.",
        "Load analytics and ad tags only after consent, and respect a “no” everywhere, including in server-side uploads.",
        "Hash email and phone (SHA-256) before sending them to ad platforms, and send only what is needed.",
        "Keep a record of consent with the lead in the CRM.",
      ],
    },
    {
      type: "p",
      text: "This is a practical summary, not legal advice. If you handle large volumes of personal data, get a proper legal review.",
    },
    {
      type: "callout",
      tone: "takeaway",
      title: "Where to start this week",
      text: "Add hidden click-ID and UTM fields to every form, make sure they land in your CRM, and agree with sales on what “qualified” means. The upload can come next week; without those three, there is nothing to upload.",
    },
  ],
  faqs: [
    {
      q: "What is offline conversion tracking?",
      a: "It means sending events that happen after the website visit, such as a lead being qualified or a deal being won in your CRM, back to the ad platform so it can optimise toward those outcomes.",
    },
    {
      q: "Do I still use the Google Ads API for offline conversions?",
      a: "Since 15 June 2026, Google no longer accepts new adopters of offline conversion imports through the Google Ads API; new integrations should use the Data Manager API. Existing integrations can keep running while they migrate.",
    },
    {
      q: "What is the difference between Meta Pixel and Conversions API?",
      a: "The Pixel sends events from the visitor's browser; the Conversions API sends them from your server or CRM. Using both, with shared event IDs for de-duplication, gives the most complete and reliable signal.",
    },
    {
      q: "Does this work with Zoho CRM or a Google Sheet?",
      a: "Yes. Any system that keeps the click IDs and contact details attached to each lead can feed conversions back, through native connectors, scheduled uploads or an automation tool such as n8n.",
    },
  ],
  sources: [
    {
      label: "Google Ads Developer Blog: Changes to offline click conversion import support (May 2026)",
      url: "https://developers.google.com/ads/blog/posts/2026/05/changes-to-offline-click-conversion",
    },
    {
      label: "Google Ads Help: About enhanced conversions for leads",
      url: "https://support.google.com/google-ads/answer/15713840",
    },
    {
      label: "Meta for Developers: Conversions API",
      url: "https://developers.facebook.com/docs/marketing-api/conversions-api",
    },
    {
      label: "AZB & Partners: India's DPDP framework comes into effect (Nov 2025)",
      url: "https://www.azbpartners.com/bank/update-indias-digital-personal-data-protection-framework-comes-into-effect/",
    },
  ],
  cta: {
    title: "Paying for leads your sales team ignores?",
    text: "We'll trace how leads flow from your ads to your CRM and show where the signal breaks, free.",
    href: "/free-audit",
    label: "Get a free tracking audit",
  },
};
