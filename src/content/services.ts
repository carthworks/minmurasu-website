export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  problem: string;
  whoItsFor: string[];
  deliverables: string[];
  process: { title: string; desc: string }[];
  clientRequirements: string[];
  measurement: string[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "digital-strategy": {
    slug: "digital-strategy",
    title: "Digital Strategy & Growth Consulting",
    subtitle: "Clarity on where to invest, what to communicate, and how to scale.",
    heroDescription:
      "A structured roadmap connecting your commercial targets to channel strategy, customer journey design, and conversion mechanics.",
    problem:
      "Companies often jump straight into spending on ads or random social posts without defining their offer positioning, customer journey, or target unit economics.",
    whoItsFor: [
      "Companies launching new products or entering new markets (e.g., Coimbatore to Bangalore/Chennai).",
      "Businesses with stagnant digital enquiries despite ongoing marketing spend.",
      "Leadership teams seeking an objective audit of their agency or internal efforts.",
    ],
    deliverables: [
      "Competitor and market landscape analysis",
      "Customer persona and high-intent journey mapping",
      "Channel prioritization matrix (SEO vs Ads vs Social vs Automation)",
      "90-day actionable execution roadmap",
      "Budget sizing and projected acquisition economics",
    ],
    process: [
      { title: "Stakeholder Discovery", desc: "Interviews to define commercial goals and margin realities." },
      { title: "Channel & Tech Audit", desc: "Deep inspection of current assets, tools, and traffic quality." },
      { title: "Strategy Synthesis", desc: "Drafting the strategic thesis and resource allocation." },
      { title: "Executive Presentation", desc: "Walking through the implementation blueprint and milestone markers." },
    ],
    clientRequirements: [
      "Access to historical sales and enquiry data",
      "Direct consultation with business owners or sales leaders",
      "Clarity on product margins and target sales geographies",
    ],
    measurement: [
      "Milestone completion against 90-day plan",
      "Blended customer acquisition cost (CAC) reduction",
      "Lead-to-opportunity conversion velocity",
    ],
    faqs: [
      {
        q: "How long does a digital strategy consulting engagement take?",
        a: "A typical strategy sprint spans 2 to 3 weeks, culminating in a thorough presentation and deliverable roadmap.",
      },
      {
        q: "Can you execute the strategy after completing it?",
        a: "Yes. Most clients transition seamlessly into our execution retainers for web engineering, SEO, and paid performance.",
      },
    ],
    relatedServices: ["seo-local-seo", "google-meta-ads", "website-landing-pages"],
  },

  "seo-local-seo": {
    slug: "seo-local-seo",
    title: "Search Engine Optimisation (SEO) & Local Visibility",
    subtitle: "Earn durable rankings for commercial queries that buyers actually search.",
    heroDescription:
      "Technical search optimisation, local search domination in Coimbatore & Chennai, and high-value B2B content architectures.",
    problem:
      "Generic blog posts generate irrelevant traffic that never converts, while competitors capture local Google Maps 'near me' and high-intent commercial searches.",
    whoItsFor: [
      "Multi-specialty clinics and diagnostic centers needing local patient enquiries.",
      "Manufacturers seeking industrial keyword visibility across India.",
      "Regional service providers expanding across Tamil Nadu and South India.",
    ],
    deliverables: [
      "Full technical SEO audit and Core Web Vitals remediation",
      "Commercial intent keyword research and content mapping",
      "Google Business Profile (GBP) optimization and local citation build",
      "High-authority on-page content structures",
      "Monthly Search Console and keyword rank tracking reports",
    ],
    process: [
      { title: "Technical Baseline", desc: "Fixing indexing errors, crawl issues, and slow page speeds." },
      { title: "Keyword Architecture", desc: "Isolating transactional searches with commercial intent." },
      { title: "Content Deployment", desc: "Optimizing key service pages and creating targeted resources." },
      { title: "Local Authority Building", desc: "Building citations and optimizing local map pack presence." },
    ],
    clientRequirements: [
      "Access to Google Search Console and Google Analytics",
      "Admin access to Google Business Profile",
      "Input from subject matter experts for technical content accuracy",
    ],
    measurement: [
      "Organic clicks on transactional queries",
      "Top 3 rankings for high-intent local map pack terms",
      "Verified phone calls and form submissions from organic search",
    ],
    faqs: [
      {
        q: "Do you guarantee #1 ranking on Google?",
        a: "No honest agency guarantees #1 rankings, as Google's algorithms change constantly. We guarantee disciplined execution of industry best practices that historically produce durable organic gains.",
      },
      {
        q: "How long until we see organic growth?",
        a: "Local map pack and technical fixes often show initial momentum in 30-60 days; competitive national B2B keywords typically require 3 to 6 months of steady authority building.",
      },
    ],
    relatedServices: ["generative-engine-optimisation", "website-landing-pages", "digital-strategy"],
  },

  "generative-engine-optimisation": {
    slug: "generative-engine-optimisation",
    title: "Generative Engine Optimisation (GEO) & AI Search",
    subtitle: "Position your brand as the cited answer inside ChatGPT, Gemini, and Perplexity.",
    heroDescription:
      "Structure your digital footprint so large language models and AI answer engines cite your services when buyers research solutions.",
    problem:
      "Buyers are increasingly asking AI assistants (Perplexity, ChatGPT Search, Google AI Overviews) for recommendations, bypassing standard search blue links entirely.",
    whoItsFor: [
      "B2B service firms and consultancies whose buyers do thorough research.",
      "Industrial manufacturers with specialized equipment specifications.",
      "Healthcare institutions needing authoritative digital medical citations.",
    ],
    deliverables: [
      "AI Visibility Audit across ChatGPT, Perplexity, Gemini, and Claude",
      "Structured data & JSON-LD schema implementation",
      "Entity and brand citation optimization across authoritative industry sources",
      "Information gain content formatting designed for AI parsing",
      "Quarterly AI citation tracking report",
    ],
    process: [
      { title: "Entity Baseline Audit", desc: "Testing current AI engine responses for your brand and category." },
      { title: "Schema Engineering", desc: "Embedding rich semantic structured data on all site pages." },
      { title: "Citation Alignment", desc: "Correcting inconsistent information across directories and digital sources." },
      { title: "Answer-Engine Content", desc: "Publishing authoritative, factual content formatted for citation." },
    ],
    clientRequirements: [
      "Verified corporate credentials and operational history",
      "Access to website CMS for schema and semantic HTML updates",
    ],
    measurement: [
      "Presence in AI Overviews for target industry questions",
      "Brand citation frequency in Perplexity and ChatGPT Search",
      "Referral traffic from AI search domains",
    ],
    faqs: [
      {
        q: "What is the difference between SEO and GEO?",
        a: "Traditional SEO focuses on ranking in Google search results pages. GEO optimizes your content structure, citations, and digital authority so generative AI models cite you as a trusted source in conversational answers.",
      },
    ],
    relatedServices: ["seo-local-seo", "website-landing-pages", "digital-strategy"],
  },

  "social-media-content": {
    slug: "social-media-content",
    title: "Social Media & Content Marketing",
    subtitle: "Build genuine market authority and executive credibility.",
    heroDescription:
      "Strategic content creation, monthly editorial calendars, short-form video direction, and LinkedIn thought leadership for B2B decision-makers.",
    problem:
      "Posting generic quote graphics and holiday wishes wastes budget and damages credibility with serious corporate decision-makers.",
    whoItsFor: [
      "Founders and executives looking to build personal and corporate authority on LinkedIn.",
      "Clinics and educational brands requiring engaging short-form video explanation.",
      "B2B enterprises wanting to showcase behind-the-scenes engineering and team capabilities.",
    ],
    deliverables: [
      "Content strategy & monthly editorial calendar",
      "High-value LinkedIn post copy and carousel carousels",
      "Short-form video scripts and creative direction",
      "Graphic design conforming strictly to brand guidelines",
      "Monthly engagement and audience growth report",
    ],
    process: [
      { title: "Content Pillar Design", desc: "Defining 3-4 core themes that matter to your prospective clients." },
      { title: "Monthly Production Batch", desc: "Scripting, designing, and approving content 2 weeks in advance." },
      { title: "Publishing & Distribution", desc: "Scheduled release with active comment management." },
      { title: "Performance Review", desc: "Analyzing which formats drive actual message inquiries." },
    ],
    clientRequirements: [
      "Designated point of contact for timely content review and approval",
      "Raw photo/video assets from your facility or team when needed",
    ],
    measurement: [
      "Engaged audience growth among target job titles and regions",
      "Direct message enquiries and website referral sessions",
      "Qualitative feedback from sales calls referencing published content",
    ],
    faqs: [
      {
        q: "Do you create Reels and YouTube Shorts?",
        a: "Yes. We script, format, and edit video content designed to educate and demonstrate value, rather than mindless entertainment trends.",
      },
    ],
    relatedServices: ["google-meta-ads", "digital-strategy"],
  },

  "google-meta-ads": {
    slug: "google-meta-ads",
    title: "Google Ads & Meta Performance Advertising",
    subtitle: "High-intent paid acquisition with complete media budget transparency.",
    heroDescription:
      "Precision search campaigns, remarketing funnels, and targeted paid social designed to capture buyers actively searching for solutions.",
    problem:
      "Unmanaged ad campaigns waste budget on negative keywords, spam clicks, and broad match traps without tracking down to actual closed revenue.",
    whoItsFor: [
      "Real estate developers seeking property enquiries for upcoming launches.",
      "Healthcare centers seeking patient consultations for specific clinical procedures.",
      "Training institutes with enrollment deadlines.",
    ],
    deliverables: [
      "Complete account architecture with tight ad-group themes",
      "High-intent keyword selection and negative keyword library",
      "Ad copy variations with continuous A/B testing",
      "Server-side conversion tracking setup (Meta CAPI & GA4)",
      "Weekly budget monitoring and monthly ROI dashboard",
    ],
    process: [
      { title: "Tracking Verification", desc: "Auditing pixels, server tracking, and conversion events." },
      { title: "Campaign Architecture", desc: "Structuring campaigns to prevent internal ad cannibalization." },
      { title: "Creative & Copy Launch", desc: "Writing compelling, compliant ad copy aligned with landing pages." },
      { title: "Daily Negative Scrubbing", desc: "Monitoring search terms to eliminate wasteful click spend." },
    ],
    clientRequirements: [
      "Ad account ownership and direct payment method configured",
      "Prompt sales team feedback on lead quality and conversion rate",
    ],
    measurement: [
      "Cost per qualified lead (CPL)",
      "Search impression share on high-converting keywords",
      "Return on Ad Spend (ROAS) and pipeline value",
    ],
    faqs: [
      {
        q: "Who pays Google and Meta for the ad spend?",
        a: "You pay the ad networks directly with your company credit card. We manage the campaigns for a transparent agency management fee.",
      },
    ],
    relatedServices: ["website-landing-pages", "ai-business-automation", "digital-strategy"],
  },

  "website-landing-pages": {
    slug: "website-landing-pages",
    title: "Website & High-Converting Landing Page Development",
    subtitle: "Fast, responsive web engineering designed for conversion and SEO.",
    heroDescription:
      "Modern Next.js and Tailwind web experiences engineered for mobile speed, accessible UX, friction-free forms, and seamless CRM integrations.",
    problem:
      "Slow, bloated template websites confuse visitors, fail Core Web Vitals, and leak potential enquiries due to cumbersome forms.",
    whoItsFor: [
      "Businesses whose current website looks outdated or performs poorly on mobile.",
      "Companies launching campaigns that require high-converting landing pages.",
      "Enterprises needing custom interactive calculators or quotation workflows.",
    ],
    deliverables: [
      "Custom responsive design (360px mobile to 4K desktop)",
      "High-performance Next.js and TypeScript implementation",
      "Accessible form design with client and server-side validation",
      "Automated spam filtering (honeypots & rate limiting)",
      "Full SEO metadata, structured data, and analytics hooks",
    ],
    process: [
      { title: "Wireframe & Journey", desc: "Mapping the fastest path from arrival to enquiry submission." },
      { title: "Visual Design", desc: "Modern, brand-aligned interface without generic template clutter." },
      { title: "Clean Engineering", desc: "Writing modular, type-safe Next.js code with high lighthouse scores." },
      { title: "QA & Launch", desc: "Testing cross-browser compatibility, forms, and tracking tags." },
    ],
    clientRequirements: [
      "Brand assets, photography, and company logos in high resolution",
      "Timely feedback on interactive staging previews",
      "Domain and DNS access for deployment",
    ],
    measurement: [
      "Google PageSpeed / Core Web Vitals scores (90+ mobile/desktop)",
      "Visitor-to-enquiry conversion rate",
      "Zero form submission dropouts or technical bugs",
    ],
    faqs: [
      {
        q: "Do you use WordPress templates?",
        a: "We build modern, clean codebases using Next.js, React, and Tailwind CSS. This guarantees top-tier performance, security, and immunity to plugin vulnerabilities.",
      },
    ],
    relatedServices: ["seo-local-seo", "google-meta-ads", "ai-business-automation"],
  },

  "ai-business-automation": {
    slug: "ai-business-automation",
    title: "AI & Business Workflow Automation",
    subtitle: "Speed up lead response, automate follow-ups, and eliminate repetitive admin.",
    heroDescription:
      "Website chat assistants, instant WhatsApp enquiry qualification, CRM synchronization, and team notifications that shorten response times.",
    problem:
      "Leads go cold when prospective clients have to wait hours for basic answers. Human staff waste time retyping data between email, WhatsApp, and spreadsheets.",
    whoItsFor: [
      "Clinics needing to answer FAQ inquiries and direct patients to appointment booking.",
      "Real estate teams receiving dozens of brochure requests needing quick qualification.",
      "Industrial businesses with specific RFQ inquiry triage requirements.",
    ],
    deliverables: [
      "Custom FAQ chatbot powered by your approved company knowledge",
      "WhatsApp Business API notification and qualification flows",
      "Webhook integrations connecting web forms directly into your CRM",
      "Automated email and SMS reminder sequences",
      "Internal notification triggers for high-value prospect alerts",
    ],
    process: [
      { title: "Process Mapping", desc: "Documenting where enquiries originate and where manual lag occurs." },
      { title: "Knowledge Base Curation", desc: "Writing approved answers to ensure AI accuracy and compliance." },
      { title: "Integration Testing", desc: "Connecting APIs and testing end-to-end webhook delivery." },
      { title: "Team Training", desc: "Ensuring your staff knows how to take over conversations smoothly." },
    ],
    clientRequirements: [
      "Approved FAQ document and operational guidelines",
      "Registered WhatsApp Business API account (if WhatsApp flows are selected)",
      "Access to your target CRM or database",
    ],
    measurement: [
      "Average time-to-first-response reduction (from hours to seconds)",
      "Lead qualification completion rate",
      "Hours of manual administrative data entry eliminated per month",
    ],
    faqs: [
      {
        q: "Can the AI hallucinate or give wrong pricing?",
        a: "We constrain the AI assistant strictly to approved documentation. For questions outside its verified facts or regarding custom pricing, it is programmed to hand over immediately to your human team.",
      },
    ],
    relatedServices: ["website-landing-pages", "google-meta-ads", "digital-strategy"],
  },
};

