export const siteConfig = {
  name: "MIN MURASU",
  founder: "Karthikeyan T",
  tagline: "Turn Digital Attention Into Business Growth",
  positioning: "DIGITAL GROWTH. REAL BUSINESS OUTCOMES.",
  description:
    "We bring marketing, technology, and automation together to help businesses attract the right customers, convert more enquiries, and make better growth decisions.",
  url: "https://www.minmurasu.com",
  emails: {
    primary: "hello@minmurasu.com",
    secondary: "minmurasu.digital@gmail.com",
  },
  phones: {
    primary: "+91 9486772206",
    secondary: "+91 9445277206",
    primaryRaw: "919486772206",
    secondaryRaw: "919445277206",
  },
  whatsapp: {
    number: "919486772206",
    defaultMessage: "Hello MIN MURASU, I would like to enquire about your digital growth & automation services.",
  },
  locations: {
    headquarters: "Coimbatore, Tamil Nadu, India",
    servedMarkets: ["Coimbatore", "Chennai", "Bengaluru", "Across India"],
  },
  socials: {
    linkedin: "https://linkedin.com/company/minmurasu",
    instagram: "https://instagram.com/minmurasu",
    facebook: "https://facebook.com/minmurasu",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Our Approach", href: "/approach" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      slug: "digital-strategy",
      title: "Digital Strategy & Consulting",
      shortDescription:
        "Audience research, positioning, channel planning, campaign roadmaps, and growth priorities.",
      icon: "Compass",
    },
    {
      slug: "seo-local-seo",
      title: "Search Engine Optimisation (SEO)",
      shortDescription:
        "Technical SEO, on-page optimisation, local SEO in Coimbatore & Chennai, AI search visibility, and keyword research.",
      icon: "Search",
    },
    {
      slug: "generative-engine-optimisation",
      title: "Generative Engine Optimisation (GEO)",
      shortDescription:
        "AI search visibility audits, content structured for AI answers, schema markup, and citations across ChatGPT, Gemini & Perplexity.",
      icon: "Bot",
    },
    {
      slug: "social-media-content",
      title: "Social Media & Content Marketing",
      shortDescription:
        "Content strategy, monthly calendars, creative direction, short-form video, and high-impact publishing.",
      icon: "Share2",
    },
    {
      slug: "google-meta-ads",
      title: "Google & Meta Ads",
      shortDescription:
        "Campaign strategy, audience targeting, conversion tracking, media spend optimisation, and clear ROI reporting.",
      icon: "TrendingUp",
    },
    {
      slug: "website-landing-pages",
      title: "Website & Landing Page Development",
      shortDescription:
        "Responsive business websites, landing pages, lead capture forms, and conversion-focused user journeys.",
      icon: "Code2",
    },
    {
      slug: "ai-business-automation",
      title: "AI & Business Automation",
      shortDescription:
        "Website chat assistants, lead qualification, WhatsApp workflows, CRM automation, and notifications.",
      icon: "Cpu",
    },
  ],
  industries: [
    {
      slug: "healthcare-clinics",
      title: "Healthcare Providers & Clinics",
      summary:
        "Appointment enquiry systems, local healthcare search visibility, and patient-friendly automated reminders.",
    },
    {
      slug: "real-estate",
      title: "Real Estate & Property Developers",
      summary:
        "High-intent lead generation, project landing pages, and instant WhatsApp enquiry qualification.",
    },
    {
      slug: "manufacturing-industrial",
      title: "Manufacturing & Industrial SMEs",
      summary:
        "B2B catalogue sites, search visibility for industrial products, and RFQ pipeline automation.",
    },
    {
      slug: "education-training",
      title: "Education & Training Businesses",
      summary:
        "Course enquiry funnels, student enrollment automation, and targeted paid campaigns.",
    },
    {
      slug: "retail-services",
      title: "Retail & Local Services",
      summary:
        "Local search domination, review management, and automated customer booking flows.",
    },
  ],
};

export function getWhatsAppUrl(customMessage?: string) {
  const msg = encodeURIComponent(customMessage || siteConfig.whatsapp.defaultMessage);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${msg}`;
}

