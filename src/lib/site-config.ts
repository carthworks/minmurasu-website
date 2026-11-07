/**
 * MIN MURASU — single source of truth for brand, contact, SEO and content data.
 *
 * Rules:
 *  - Write each fact ONCE here; components read it from here (never hard-code copy).
 *  - All existing keys from the previous version are kept, so current components keep working.
 *  - Items marked TODO need a real value before launch. Never add metrics, clients or
 *    testimonials here that are not verified (Zero Fabricated Proof Policy).
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  title: string;
  /** Short label for chips, menus and footers. */
  shortTitle: string;
  shortDescription: string;
  /** One-line client outcome — use on cards and in meta descriptions. */
  outcome: string;
  /** Main search phrase for the service landing page. */
  primaryKeyword: string;
  icon: string;
};

export type Industry = {
  slug: string;
  title: string;
  /** Short name used in buttons, e.g. "View Real Estate Playbook". */
  shortName: string;
  summary: string;
  icon: string;
};

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

export const siteConfig = {
  name: "MIN MURASU",
  legalName: "MIN MURASU", // TODO: replace with registered entity name once incorporated
  tamilName: "மின் முரசு",
  nameMeaning: "The Digital Drum — announcing your brand to the world.",
  founder: "Karthikeyan T",
  founderDetails: {
    name: "Karthikeyan T",
    role: "Founder | Digital Growth & AI Automation",
    linkedin: "", // TODO: founder's LinkedIn profile URL (adds trust + Person schema)
  },
  tagline: "Turn Digital Attention Into Business Growth",
  positioning: "DIGITAL GROWTH. REAL BUSINESS OUTCOMES.",
  description:
    "We bring marketing, technology, and automation together to help businesses attract the right customers, convert more enquiries, and make better growth decisions.",
  /** ~150 characters — for meta description and social previews. */
  shortDescription:
    "Digital marketing, websites and AI automation in one growth system — so more of your online attention turns into real enquiries and sales.",
  url: "https://www.minmurasu.digital", // Canonical. Vercel preview domain must 301-redirect here.

  brand: {
    colors: {
      navy: "#0D2040", // primary / theme-color
      orange: "#F58220", // accent, CTAs
      blue: "#0082CA", // secondary accent (logo swoosh)
      white: "#FFFFFF",
    },
    logo: "/images/MIN_MURASU_logo_only_transparent.png",
    ogImage: "/images/og-image.jpg",
  },

  /** Primary calls to action — reuse everywhere so wording stays consistent. */
  cta: {
    primary: { label: "Book a Free Consultation", href: "/book" },
    secondary: { label: "Explore Our Services", href: "/#services" },
    audit: { label: "Get a Free Digital Presence Audit", href: "/free-audit" },
    whatsapp: { label: "Chat on WhatsApp" }, // href: getWhatsAppUrl()
  },

  emails: {
    /** Public business email — shown on the site and used for lead notifications. */
    primary: "minmurasu.digital@gmail.com",
  },
  phones: {
    primary: "+91 9486772206", // kept for existing components
    secondary: "+91 9445277206",
    primaryRaw: "919486772206",
    secondaryRaw: "919445277206",
    /** Readable display format. */
    primaryDisplay: "+91 94867 72206",
    secondaryDisplay: "+91 94452 77206",
    /** E.164 format for tel: links and schema. */
    primaryE164: "+919486772206",
    secondaryE164: "+919445277206",
  },
  whatsapp: {
    number: "919486772206",
    defaultMessage:
      "Hello MIN MURASU, I would like to enquire about your digital growth & automation services.",
    /** Context-specific openers — tells you which page or button produced the lead. */
    messages: {
      consultation: "Hello MIN MURASU, I'd like to book a free consultation.",
      audit: "Hello MIN MURASU, I'd like a free digital presence audit for my business.",
      service: (serviceTitle: string) =>
        `Hello MIN MURASU, I'm interested in ${serviceTitle}. Can we discuss?`,
      industry: (industryName: string) =>
        `Hello MIN MURASU, I run a ${industryName} business and want more enquiries online.`,
    },
  },
  businessHours: {
    days: "Monday – Saturday",
    hours: "9:30 AM – 6:30 PM IST", // TODO: confirm
    responseTime: "We reply to enquiries within one business day.",
  },

  locations: {
    headquarters: "Coimbatore, Tamil Nadu, India", // kept for existing components
    servedMarkets: ["Coimbatore", "Chennai", "Bengaluru", "Across India"], // kept for existing components
    /** Structured address — needed for Google Business Profile and LocalBusiness schema. */
    headquartersAddress: {
      label: "Coimbatore HQ",
      streetAddress: "", // TODO
      city: "Coimbatore",
      region: "Tamil Nadu",
      postalCode: "", // TODO
      country: "India",
      countryCode: "IN",
      mapsUrl: "", // TODO: Google Business Profile link
    },
    primaryCities: ["Coimbatore", "Chennai", "Bengaluru"],
    coverage: {
      national: "Across India", // use this exact phrase site-wide (not "PAN-India")
      international: "Remote clients worldwide",
    },
    /** One line for hero, footer and meta — prevents wording drift. */
    coverageLine: "Coimbatore · Chennai · Bengaluru · Across India · Worldwide (remote)",
  },

  socials: {
    handle: "@minmurasu",
    // TODO: confirm each profile exists before launch; remove any that don't.
    linkedin: "https://www.linkedin.com/company/minmurasu",
    instagram: "https://www.instagram.com/minmurasu",
    youtube: "https://www.youtube.com/@minmurasu",
    facebook: "https://www.facebook.com/minmurasu",
  },

  seo: {
    defaultTitle: "MIN MURASU | Turn Digital Attention Into Business Growth",
    titleTemplate: "%s | MIN MURASU",
    locale: "en_IN",
    keywords: [
      "digital marketing agency Coimbatore",
      "digital marketing agency Chennai",
      "SEO services Coimbatore",
      "Generative Engine Optimisation",
      "Google Ads agency",
      "Meta Ads agency",
      "website development Coimbatore",
      "WhatsApp automation",
      "AI business automation",
    ],
    twitterHandle: "@minmurasu",
  },

  /** IDs come from environment variables — never hard-code them. */
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? process.env.NEXT_PUBLIC_GA_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Our Approach", href: "/approach" },
    { label: "Pricing", href: "/pricing" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "Book Consultation", href: "/book" },
    { label: "Pricing & Models", href: "/pricing" },
    { label: "Free Digital Audit", href: "/free-audit" },
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cancellation & Refund Policy", href: "/refund-policy" },
  ],

  services: [
    {
      slug: "digital-strategy",
      title: "Digital Strategy & Consulting",
      shortTitle: "Strategy",
      shortDescription:
        "Audience research, positioning, channel planning, campaign roadmaps and clear growth priorities.",
      outcome: "Know exactly where to spend your marketing budget, and why.",
      primaryKeyword: "digital marketing consultant",
      icon: "Compass",
    },
    {
      slug: "seo-local-seo",
      title: "Search Engine Optimisation (SEO)",
      shortTitle: "SEO",
      shortDescription:
        "Technical SEO, on-page optimisation, local SEO for Coimbatore and Chennai, keyword research and AI search visibility.",
      outcome: "Get found by customers already searching for what you offer.",
      primaryKeyword: "SEO services Coimbatore",
      icon: "Search",
    },
    {
      slug: "generative-engine-optimisation",
      title: "Generative Engine Optimisation (GEO)",
      shortTitle: "GEO",
      shortDescription:
        "AI search visibility audits, answer-ready content, schema markup and citations across ChatGPT, Gemini and Perplexity.",
      outcome: "Be the business AI assistants recommend.",
      primaryKeyword: "generative engine optimisation",
      icon: "Bot",
    },
    {
      slug: "social-media-content",
      title: "Social Media & Content Marketing",
      shortTitle: "Social & Content",
      shortDescription:
        "Content strategy, monthly calendars, creative direction and short-form video built for consistent publishing.",
      outcome: "Stay visible and trusted with content your audience actually watches.",
      primaryKeyword: "social media marketing agency",
      icon: "Share2",
    },
    {
      slug: "google-meta-ads",
      title: "Google & Meta Ads",
      shortTitle: "Google & Meta Ads",
      shortDescription:
        "Campaign strategy, audience targeting, conversion tracking, spend optimisation and clear ROI reporting.",
      outcome: "Spend on ads that bring enquiries — and see the numbers to prove it.",
      primaryKeyword: "Google Ads agency",
      icon: "TrendingUp",
    },
    {
      slug: "website-landing-pages",
      title: "Website & Landing Page Development",
      shortTitle: "Websites",
      shortDescription:
        "Fast, responsive business websites and landing pages with lead capture forms and conversion-focused journeys.",
      outcome: "Turn visitors into enquiries instead of bounces.",
      primaryKeyword: "website development Coimbatore",
      icon: "Code2",
    },
    {
      slug: "ai-business-automation",
      title: "AI & Business Automation",
      shortTitle: "AI Automation",
      shortDescription:
        "Website chat assistants, lead qualification, WhatsApp workflows, CRM automation and instant alerts.",
      outcome: "Answer every enquiry instantly and never lose a lead to slow follow-up.",
      primaryKeyword: "WhatsApp business automation",
      icon: "Cpu",
    },
  ] as Service[],

  industries: [
    {
      slug: "healthcare-clinics",
      title: "Healthcare Providers & Clinics",
      shortName: "Healthcare",
      summary:
        "Appointment enquiry systems, local healthcare search visibility and patient-friendly automated reminders.",
      icon: "Stethoscope",
    },
    {
      slug: "real-estate",
      title: "Real Estate & Property Developers",
      shortName: "Real Estate", // fixes "View Real Playbook" if the button used title.split(" ")[0]
      summary:
        "High-intent lead generation, project landing pages and instant WhatsApp enquiry qualification.",
      icon: "Building2",
    },
    {
      slug: "manufacturing-industrial",
      title: "Manufacturing & Industrial SMEs",
      shortName: "Manufacturing",
      summary:
        "B2B catalogue websites, search visibility for industrial products and RFQ pipeline automation.",
      icon: "Factory",
    },
    {
      slug: "education-training",
      title: "Education & Training Businesses",
      shortName: "Education",
      summary:
        "Course enquiry funnels, student enrolment automation and targeted paid campaigns.",
      icon: "GraduationCap",
    },
    {
      slug: "retail-services",
      // One name everywhere: the homepage section must also read from this field.
      title: "Retail & Local Services",
      shortName: "Retail",
      summary:
        "Stronger local search visibility, review management and automated customer booking flows.",
      icon: "Store",
    },
  ] as Industry[],
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getWhatsAppUrl(customMessage?: string) {
  const msg = encodeURIComponent(customMessage || siteConfig.whatsapp.defaultMessage);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${msg}`;
}

export function getTelUrl(which: "primary" | "secondary" = "primary") {
  return `tel:${which === "primary" ? siteConfig.phones.primaryE164 : siteConfig.phones.secondaryE164}`;
}

export function getMailtoUrl(subject?: string) {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.emails.primary}${q}`;
}

/** Button label for industry cards, e.g. "View Real Estate Playbook". */
export function getPlaybookLabel(industry: Industry) {
  return `View ${industry.shortName} Playbook`;
}

/** Absolute URL for a path on the canonical domain (for canonical, OG and sitemap). */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

/** Social profile URLs that are filled in — for footer icons and schema sameAs. */
export function getSocialLinks() {
  return [
    siteConfig.socials.linkedin,
    siteConfig.socials.instagram,
    siteConfig.socials.youtube,
    siteConfig.socials.facebook,
  ].filter(Boolean);
}

/**
 * Organization + ProfessionalService JSON-LD.
 * Render in the root layout:
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }} />
 */
export function getOrganizationSchema() {
  const a = siteConfig.locations.headquartersAddress;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    alternateName: siteConfig.tamilName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.brand.logo),
    image: absoluteUrl(siteConfig.brand.ogImage),
    email: siteConfig.emails.primary,
    telephone: siteConfig.phones.primaryE164,
    founder: {
      "@type": "Person",
      name: siteConfig.founderDetails.name,
      jobTitle: siteConfig.founderDetails.role,
    },
    address: {
      "@type": "PostalAddress",
      ...(a.streetAddress && { streetAddress: a.streetAddress }),
      addressLocality: a.city,
      addressRegion: a.region,
      ...(a.postalCode && { postalCode: a.postalCode }),
      addressCountry: a.countryCode,
    },
    areaServed: [
      ...siteConfig.locations.primaryCities.map((name) => ({ "@type": "City", name })),
      { "@type": "Country", name: "India" },
    ],
    sameAs: getSocialLinks(),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: absoluteUrl("/contact"),
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital growth services",
      itemListElement: siteConfig.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.shortDescription, url: absoluteUrl(`/services/${s.slug}`) },
      })),
    },
  };
}

/** FAQPage JSON-LD — pass the same Q&A array the FAQ component renders. */
export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
