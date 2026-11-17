import type { Article } from "./types";

export const nextjsVsWordpress: Article = {
  slug: "nextjs-vs-wordpress-b2b",
  title: "Why Modern B2B Websites Should Be Engineered in Next.js Instead of Heavy Themes",
  seoTitle: "Next.js vs WordPress for B2B Websites (2026)",
  description:
    "How Core Web Vitals, security and lead tracking compare between Next.js and theme-heavy WordPress sites, when WordPress is still the right call, and how to migrate safely.",
  excerpt:
    "Core Web Vitals affect both rankings and conversions. How static rendering, image optimisation and a smaller attack surface protect your ad spend, and when WordPress is still the right choice.",
  category: "Web Engineering",
  keywords: [
    "Next.js vs WordPress",
    "B2B website development",
    "Core Web Vitals",
    "INP optimisation",
    "Next.js web development India",
    "headless WordPress",
    "website migration SEO",
  ],
  publishedAt: "2026-11-18",
  updatedAt: "2026-11-18",
  cover: {
    src: "/images/insights/nextjs-vs-wordpress-b2b.svg",
    alt: "Illustration comparing a heavy layered website with a lean, fast one",
  },
  body: [
    {
      type: "p",
      text: "For most B2B companies the website has one job: turn the traffic you already pay for (ads, SEO, referrals) into qualified enquiries. Every second of loading, every janky tap and every broken form quietly taxes that traffic. That is why the way a site is built matters more than how it looks in a mock-up.",
    },
    {
      type: "p",
      text: "This is not an anti-WordPress article. WordPress powers a large share of the web and is the right tool for many teams. But **theme-and-plugin builds** (a multipurpose theme, a page builder and 20–40 plugins) tend to struggle on exactly the things that decide B2B conversion: speed, stability and clean tracking.",
    },
    { type: "h2", id: "core-web-vitals", text: "Core Web Vitals in 2026: the numbers that matter" },
    {
      type: "table",
      head: ["Metric", "Measures", "Good", "Poor"],
      rows: [
        ["LCP (Largest Contentful Paint)", "Loading: when the main content appears", "≤ 2.5 s", "> 4.0 s"],
        ["INP (Interaction to Next Paint)", "Responsiveness to taps, clicks and typing", "≤ 200 ms", "> 500 ms"],
        ["CLS (Cumulative Layout Shift)", "Visual stability while loading", "≤ 0.1", "> 0.25"],
      ],
      caption: "Google assesses these at the 75th percentile of real-user visits. INP replaced FID in March 2024; the thresholds have not changed since.",
    },
    {
      type: "p",
      text: "Be wary of posts claiming a dramatic “2026 Core Web Vitals update”. Google's documented thresholds are the ones above, and Google says changes to them are announced in advance. What has changed is how many sites still fail INP, mostly because of heavy JavaScript.",
    },
    { type: "h2", id: "why-themes-struggle", text: "Why theme-heavy sites struggle" },
    {
      type: "ul",
      items: [
        "**JavaScript from every plugin.** Sliders, popups, chat widgets, analytics and builder runtimes all load on every page, whether used or not. That is the main cause of poor INP.",
        "**Render-blocking CSS.** Multipurpose themes ship styles for hundreds of layouts you will never use.",
        "**Database work on each request.** Without careful caching, every visit runs PHP and queries before the first byte is sent.",
        "**Plugin risk.** WordPress core is well maintained; most real-world WordPress compromises come through outdated or abandoned plugins and themes.",
      ],
    },
    { type: "h2", id: "what-nextjs-changes", text: "What Next.js changes" },
    {
      type: "image",
      src: "/images/insights/nextjs-request-path.svg",
      alt: "Diagram comparing a theme request path through PHP, plugins and database with a Next.js page served from a CDN",
      caption: "A pre-rendered page can be served straight from a CDN edge; a theme page often has to be assembled on each request.",
      width: 1200,
      height: 560,
    },
    {
      type: "ul",
      items: [
        "**Pre-rendered pages.** Marketing pages are generated at build time and served from a CDN close to the visitor, so the first byte arrives quickly.",
        "**Server Components.** Most of the page renders on the server and ships little or no JavaScript, which is what INP rewards.",
        "**Built-in image optimisation.** Images are resized, converted to modern formats and lazy-loaded automatically, which helps LCP and CLS.",
        "**Smaller attack surface.** No admin panel or plugin directory on the public site. Forms go to a validated API route with rate limiting.",
        "**Tracking you control.** Analytics and ad tags load once, after consent, from one place in the code, instead of from several plugins that each add their own.",
      ],
    },
    {
      type: "image",
      src: "/images/services/website-landing-pages.jpg",
      alt: "Website and landing page engineering workspace",
      caption: "Speed is a feature: for paid traffic, a faster landing page means a lower cost per enquiry.",
      width: 1376,
      height: 768,
    },
    { type: "h2", id: "when-wordpress-wins", text: "When WordPress is still the right call" },
    {
      type: "table",
      head: ["Situation", "Better fit"],
      rows: [
        ["Large editorial team publishing daily, needs familiar editor", "WordPress (or headless WordPress + Next.js)"],
        ["Lead-generation site, 10–40 pages, ads running", "Next.js"],
        ["Very small budget, no developer access", "WordPress with a lightweight theme"],
        ["Custom calculators, portals, integrations with CRM or WhatsApp", "Next.js"],
        ["Existing WordPress content you want to keep editing", "Headless WordPress feeding a Next.js front end"],
      ],
    },
    {
      type: "callout",
      tone: "tip",
      title: "The headless middle ground",
      text: "You can keep WordPress as the editing back end and render the public site with Next.js. Editors keep their workflow; visitors get the speed.",
    },
    { type: "h2", id: "migration-checklist", text: "Migration checklist: don't lose your rankings" },
    {
      type: "ol",
      items: [
        "Crawl the old site and export every URL that has traffic or backlinks.",
        "Keep URLs where you can; 301-redirect every one you change, one-to-one, never to the homepage.",
        "Carry over title tags, meta descriptions, headings and structured data.",
        "Regenerate the XML sitemap and submit it in Google Search Console.",
        "Re-create GA4 and ad conversion events before launch, and test them with real form submissions.",
        "Monitor Search Console coverage and Core Web Vitals reports for four to six weeks after launch.",
      ],
    },
    {
      type: "callout",
      tone: "takeaway",
      title: "Bottom line",
      text: "If the website exists to generate enquiries from paid and organic traffic, build it for speed, stability and clean tracking first. For most B2B lead-generation sites that means Next.js; for publishing-heavy teams, a headless setup gives you both.",
    },
  ],
  faqs: [
    {
      q: "Is Next.js better than WordPress for SEO?",
      a: "Neither is better by default. Next.js makes it easier to hit Core Web Vitals and control markup, while WordPress depends heavily on theme and plugin choices. Content quality and technical setup decide rankings.",
    },
    {
      q: "What is a good INP score?",
      a: "Google treats an Interaction to Next Paint of 200 milliseconds or less, at the 75th percentile of real visits, as good, and over 500 milliseconds as poor.",
    },
    {
      q: "Can I keep WordPress and still use Next.js?",
      a: "Yes. In a headless setup WordPress stores and edits content, and a Next.js front end fetches and renders it, so editors keep their workflow while visitors get a faster site.",
    },
    {
      q: "Will migrating to Next.js hurt my rankings?",
      a: "Not if you keep or 301-redirect every URL, carry over metadata and structured data, and submit the new sitemap. Rankings typically settle within a few weeks.",
    },
  ],
  sources: [
    { label: "web.dev: Web Vitals and thresholds", url: "https://web.dev/articles/vitals" },
    { label: "web.dev: Interaction to Next Paint (INP)", url: "https://web.dev/articles/inp" },
    {
      label: "Google Search Central: Understanding Core Web Vitals and Google search results",
      url: "https://developers.google.com/search/docs/appearance/core-web-vitals",
    },
    { label: "Next.js documentation", url: "https://nextjs.org/docs" },
  ],
  cta: {
    title: "Is your site costing you enquiries?",
    text: "We'll check your Core Web Vitals, tracking and lead forms in a free audit and tell you whether a rebuild is worth it.",
    href: "/free-audit",
    label: "Get a free website audit",
  },
};
