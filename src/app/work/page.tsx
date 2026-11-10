import WorkStickyNav from "@/components/sections/WorkStickyNav";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  Cpu,
  Crop,
  ExternalLink,
  Factory,
  Globe,
  Layers,
  Palette,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  Terminal,
  TrendingUp,
  Video,
  Wrench,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Work, Web Products & Solution Blueprints",
  description:
    "Explore MIN MURASU's proprietary web and digital marketing products, production client platforms, and verified growth system blueprints.",
};

/* ------------------------------------------------------------------ */
/* 1. Proprietary Web & Digital Marketing Products (In-House Suite)   */
/* ------------------------------------------------------------------ */
const carthworksProducts = [
  {
    title: "ExtractTheme Studio",
    tagline: "Automated CSS, Tailwind Token & WCAG Contrast Extractor",
    category: "Web Design Systems & Frontend",
    liveUrl: "https://carthworks.vercel.app/",
    image: "/images/work/extract-theme-studio.jpg",
    icon: Palette,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    description:
      "A developer and designer studio that analyzes live websites and design systems to extract CSS custom properties, Tailwind palettes, typography scales, and WCAG 2.1 color contrast accessibility matrices.",
    marketingImpact:
      "Cuts landing page build time by 70%, ensures strict brand consistency across paid marketing funnels, and guarantees WCAG AAA accessibility scores to maximize ad landing page quality ratings.",
    features: [
      "One-click CSS variable & Tailwind token extraction",
      "Automated WCAG AAA color contrast compliance audit",
      "Typography scale & responsive font pairing analysis",
      "Exportable HTML styleguides and JSON design system tokens",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "CSS AST Parser", "Web APIs"],
  },
  {
    title: "TrustLens",
    tagline: "Real-Time Website Trust & Conversion Risk Inspector",
    category: "Web Trust & CRO Analytics",
    liveUrl: "https://carthworks.vercel.app/",
    image: "/images/work/trust-lens.jpg",
    icon: ShieldAlert,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    description:
      "A diagnostic intelligence engine that audits websites for SSL certificate health, HTTP security headers, mandatory consumer legal compliance (GDPR, Privacy, Terms, Refund), and conversion leak friction.",
    marketingImpact:
      "Uncovers the exact trust friction causing ad clicks to bounce before purchase or lead submission. Strengthens Google & Meta Ad account approval and landing page trust scores.",
    features: [
      "Instant SSL & HTTP security headers evaluation (CSP, HSTS)",
      "Consumer trust badge & checkout friction detection",
      "Mandatory legal compliance check (Privacy, Terms & Refund policies)",
      "Actionable conversion risk remediation report",
    ],
    tech: ["Next.js", "Node.js", "Headless Chromium", "Security Scanner", "Tailwind CSS"],
  },
  {
    title: "Gantto Project Timeline",
    tagline: "Interactive Campaign Roadmap & Web Launch Manager",
    category: "Campaign Sprints & Web Operations",
    liveUrl: "https://carthworks.vercel.app/",
    image: "/images/work/gantto.jpg",
    icon: Layers,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description:
      "A premium, privacy-first fullscreen Gantt chart and campaign roadmap builder (available as both Web App and Chrome Extension) with natural language task breakdown and critical path analysis.",
    marketingImpact:
      "Keeps multi-channel digital marketing launches, website redesign sprints, and SEO milestone campaigns perfectly on schedule without bloated SaaS subscription overhead.",
    features: [
      "Natural language NLP task & milestone generation",
      "Critical path analysis to prevent marketing launch delays",
      "100% offline-first local data privacy and instant JSON export",
      "Interactive drag-and-drop timeline visualization",
    ],
    tech: ["React", "TypeScript", "Chrome MV3", "Tailwind CSS", "Canvas API"],
  },
  {
    title: "TelePrompt Pro",
    tagline: "Cadence-Coached Studio Teleprompter for Video Marketing",
    category: "Video Marketing & Content Production",
    liveUrl: "https://carthworks.vercel.app/",
    image: "/images/work/teleprompt-pro.jpg",
    icon: Video,
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    description:
      "An in-browser studio teleprompter designed for founders, creators, and marketing presenters to record high-converting video sales letters (VSLs), Instagram Reels, YouTube Shorts, and corporate webinars.",
    marketingImpact:
      "Eliminates camera hesitation, cuts video production from hours to minutes, and coaches presenters on optimal speech cadence to maximize social media viewer retention.",
    features: [
      "Customizable Words-Per-Minute (WPM) speed presets",
      "Real-time speech cadence audio pacing indicators",
      "Dual-axis mirroring for professional teleprompter glass",
      "100% offline-first client-side data privacy",
    ],
    tech: ["Next.js", "Web Audio API", "HTML5 Canvas", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Screenshotify",
    tagline: "Offline-First Visual Asset & Social Content Studio",
    category: "Marketing Collateral & Visual QA",
    liveUrl: "https://carthworks.vercel.app/",
    image: "/images/work/screenshotify.jpg",
    icon: Crop,
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    description:
      "A fast visual annotation, blurring, and cropping utility engineered for digital marketers, content creators, and QA engineers to produce polished social media proof and website audit decks.",
    marketingImpact:
      "Accelerates social media asset production, protects sensitive client data with instant vector blurring, and delivers pixel-perfect visual proof for client audits.",
    features: [
      "Instant sensitive client data redaction & smart blur",
      "Vector spotlights, highlighters, and directional arrows",
      "High-resolution export tailored for social media & slide decks",
      "Zero-server transmission ensuring complete data privacy",
    ],
    tech: ["TypeScript", "Chrome Extension MV3", "Canvas API", "Tailwind CSS"],
  },
];

/* ------------------------------------------------------------------ */
/* 2. Production Web Platforms & E-Commerce Builds (With Live URLs)    */
/* ------------------------------------------------------------------ */
const clientPlatforms = [
  {
    title: "Structura Constructions",
    liveUrl: "https://structura-constructions.vercel.app/",
    category: "Commercial & Residential Construction",
    image: "/images/work/structura-constructions.jpg",
    icon: Building2,
    headline: "Turnkey Construction & Civil Engineering Portal",
    description:
      "High-converting architectural planning and construction company web platform with interactive project galleries, floor plan specs, and automated quote enquiry forms.",
    highlights: [
      "Mobile-first portfolio showcase with high-res project photography",
      "Cost-estimator & structural enquiry qualification forms",
      "Local SEO architecture for turnkey commercial contracts",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
  },
  {
    title: "HelioFlow Solar & Renewable Systems",
    liveUrl: "https://helios-inky-nine.vercel.app/",
    category: "Clean Energy & Solar Tech",
    image: "/images/work/helios-solar.jpg",
    icon: Zap,
    headline: "Intelligent Solar Spring & Clean Energy Platform",
    description:
      "High-efficiency clean-tech product platform showcasing solar springs, agricultural renewable power systems, and interactive energy savings calculators.",
    highlights: [
      "Interactive solar yield & energy cost-savings calculator",
      "Detailed technical spec sheets and OEM equipment catalog",
      "Instant lead capture for B2B industrial & agricultural buyers",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Lakshmi Stores UK & Europe",
    liveUrl: "https://www.lakshmistores.com/",
    category: "Global E-Commerce & Retail Superstore",
    image: "/images/work/lakshmi-stores.jpg",
    icon: ShoppingBag,
    headline: "Premier Indian Grocery E-Commerce Platform",
    description:
      "Leading South Asian ethnic grocery superstore serving the UK and Europe with 5,000+ authentic FMCG products, fresh produce, cold-chain logistics, and multi-currency checkout.",
    highlights: [
      "High-speed catalog search handling thousands of SKUs and categories",
      "Conversion-optimized cart checkout with postal code address lookup",
      "Repeat subscription delivery and automated WhatsApp order tracking",
    ],
    tech: ["E-Commerce Engine", "Next.js", "Tailwind CSS", "Global CDN", "Payment APIs"],
  },
  {
    title: "HIRENCH HR Solutions",
    liveUrl: "https://hirench.vercel.app/",
    category: "Executive Search & Recruitment",
    image: "/images/work/hirench-hr.svg",
    icon: Briefcase,
    headline: "Talent Acquisition & Workforce Solutions Portal",
    description:
      "Modern HR consulting and tech staffing platform connecting high-growth enterprises with specialized engineering talent, executive leadership, and contract staffing services.",
    highlights: [
      "Interactive candidate resume portal with automated skill matching",
      "Employer hiring request intake & salary benchmarking calculator",
      "Rapid candidate pipeline routing directly to account recruiters",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
  },
  {
    title: "HackLab 3.0 Innovation Hub",
    liveUrl: "https://hacklab30.netlify.app/",
    category: "AI & Hardware Innovation Lab",
    image: "/images/work/hacklab30.jpg",
    icon: Cpu,
    headline: "R&D Prototyping & Tech Ecosystem Showcase",
    description:
      "Advanced tech hub and maker platform showcasing open-source hardware, AI agent experiments, IoT prototypes, and technical masterclasses for modern engineers and builders.",
    highlights: [
      "Interactive project showcase with live code sandboxes and schematics",
      "Developer community registration and event RSVP funnels",
      "High-speed static generation deployed globally on Netlify edge CDN",
    ],
    tech: ["Next.js / HTML5", "Tailwind CSS", "Netlify Edge", "TypeScript"],
  },
  {
    title: "Royal Albatross Global Export Portal",
    liveUrl: "https://royalalbatrossexports.in/",
    category: "B2B International Trade & Export Portal",
    image: "/images/work/royal-albatross.jpg",
    icon: Globe,
    headline: "High-Performance International Trade & RFQ Engine",
    description:
      "A high-speed corporate export portal engineered for international procurement, featuring multi-currency product specifications, export certification showcases, and instant WhatsApp inquiry routing.",
    highlights: [
      "Sub-second mobile catalog load times for international buyers",
      "Automated RFQ pipeline routing inquiries straight to export desks",
      "Structured schema metadata targeting global B2B procurement searches",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API"],
  },
  {
    title: "Fit Bite D2C Fresh Food E-Commerce",
    liveUrl: "https://fit-bite-cart.vercel.app/",
    category: "D2C E-Commerce & Wellness Brand",
    image: "/images/work/fit-bite.jpg",
    icon: Store,
    headline: "Frictionless Direct-to-Consumer Digital Store",
    description:
      "A conversion-focused fresh food and healthy habit digital storefront engineered with single-click cart flows, mobile-first ordering, and repeat subscription loops.",
    highlights: [
      "Frictionless checkout reducing mobile cart abandonment",
      "Localized regional SEO and Google Shopping feed optimization",
      "Direct WhatsApp order assistance for customer retention",
    ],
    tech: ["React", "Next.js", "Tailwind CSS", "Payment Gateway API"],
  },
];

/* ------------------------------------------------------------------ */
/* 3. Industry Solution Blueprints                                     */
/* ------------------------------------------------------------------ */
const sampleArchitectures = [
  {
    title: "Multi-Specialty Clinic Inbound Patient Flow",
    category: "Healthcare & Clinics",
    icon: Stethoscope,
    challenge:
      "Clinics commonly lose appointment requests to long phone wait times and scattered record-keeping.",
    architecture: [
      "High-speed mobile landing pages for specific medical departments",
      "Local Google Search Campaigns focused on high-intent regional keywords",
      "Interactive WhatsApp appointment triage with automated location directions",
      "Direct integration into patient appointment management software",
    ],
    outcomesTracked:
      "Time from enquiry to confirmed appointment, no-show rate, and bookings by source (search, ads, WhatsApp).",
  },
  {
    title: "High-End Residential Launch Lead Qualification",
    category: "Real Estate",
    icon: Building2,
    challenge:
      "Property sales teams often spend most of their time on unqualified portal enquiries instead of serious buyers.",
    architecture: [
      "Custom project microsite built with Next.js featuring floor plans and video walkthroughs",
      "Meta and Google Ads with focused audience segmentation",
      "Two-step WhatsApp verification requiring budget confirmation before brochure unlock",
      "Instant webhook dispatch notifying senior relationship managers",
    ],
    outcomesTracked:
      "Cost per qualified lead, lead-to-site-visit ratio, and response time to each new enquiry.",
  },
  {
    title: "Precision Engineering SME Industrial RFQ Engine",
    category: "Manufacturing",
    icon: Factory,
    challenge:
      "Many industrial manufacturers rely only on word-of-mouth and trade shows, with no inbound digital channel for procurement teams.",
    architecture: [
      "Re-engineered corporate catalogue with precise technical tolerances and material specifications",
      "Technical B2B SEO targeting exact component keywords and OEM part queries",
      "Dedicated RFQ submission portal supporting drawing and CAD file uploads",
      "Automated email dispatch to the engineering estimation desk",
    ],
    outcomesTracked:
      "Monthly inbound RFQs, RFQ source (search, referral, direct), and quote turnaround time.",
  },
];

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Portfolio & Growth Systems"
          title="Proprietary Web Products, Platforms & Blueprints"
          description="We build what we sell. Explore our in-house web & marketing software products, live client web platforms, and proven industry growth blueprints."
        />

        {/* In-House Engineering Lab Banner */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-[#0D2040] via-[#102a54] to-[#0D2040] text-white border border-slate-700/60 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0082CA]/20 border border-[#0082CA]/40 text-xs font-bold text-[#38BDF8]">
                <Terminal className="w-3.5 h-3.5" />
                <span>MIN MURASU Engineering Lab</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Software Tools Built to Power Real-World Marketing
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Founded by Karthikeyan T (Senior AI Engineer &amp; SaaS Architect), our engineering lab develops internal software to eliminate bottlenecks in web design, conversion trust, video pacing, and campaign timelines.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://carthworks.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0082CA] hover:bg-[#0070b0] text-white text-xs font-bold transition-all shadow-sm shrink-0"
              >
                <span>Visit Engineering Lab</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Button
                href="/contact"
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Request Walkthrough
              </Button>
            </div>
          </div>
        </div>

        {/* Sleek Fixed Work Jump Bar */}
        <WorkStickyNav />

        {/* ------------------------------------------------------------ */}
        {/* SECTION 1: In-House Web & Marketing Products                 */}
        {/* ------------------------------------------------------------ */}
        <section id="carthworks-products" className="scroll-mt-44 md:scroll-mt-48 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0082CA] mb-1">
                <Wrench className="w-4 h-4" />
                <span>Proprietary Software Suite</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0D2040]">
                Web &amp; Digital Marketing Products
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                In-house tools developed to optimize website performance, conversion trust, and marketing assets.
              </p>
            </div>
            <a
              href="https://carthworks.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0082CA] hover:underline shrink-0"
            >
              <span>Explore Engineering Lab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {carthworksProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.title}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-[#0082CA]/50 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual UI Preview Image - Clickable to Live Tool */}
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full h-52 sm:h-64 rounded-2xl overflow-hidden mb-5 border border-slate-200/80 bg-slate-900 shadow-inner group/img cursor-pointer"
                      title={`Launch ${product.title} live`}
                    >
                      <Image
                        src={product.image}
                        alt={`${product.title} Preview Mockup`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20 group-hover/img:bg-[#0082CA] transition-colors">
                        <span>View Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </a>

                    {/* Header: Icon, Category & Title with external link */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span
                            className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${product.badgeColor}`}
                          >
                            {product.category}
                          </span>
                          <h3 className="text-xl font-bold text-[#0D2040] mt-1">
                            {product.title}
                          </h3>
                        </div>
                      </div>

                      <a
                        href={product.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-[#F0F8FF] border border-slate-200 hover:border-[#BAE6FD] text-slate-500 hover:text-[#0082CA] flex items-center justify-center transition-colors shrink-0"
                        title="View Live Tool"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#0082CA] mb-2">
                      {product.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Growth & Digital Marketing Impact */}
                    <div className="p-3.5 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] mb-4">
                      <div className="text-[11px] font-bold text-[#0D2040] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#F58220]" />
                        <span>Marketing &amp; Growth Impact</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-normal">
                        {product.marketingImpact}
                      </p>
                    </div>

                    {/* Key Capabilities */}
                    <div className="space-y-1.5 mb-5">
                      <span className="text-[11px] font-bold text-[#0D2040] uppercase tracking-wider block mb-2">
                        Key Capabilities:
                      </span>
                      {product.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Tech Stack & Action */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {product.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        href="/contact"
                        variant="secondary"
                        size="sm"
                        className="text-xs py-1.5 px-3"
                      >
                        Request Demo
                      </Button>
                      <a
                        href={product.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0082CA] hover:bg-[#0070b0] text-white text-xs font-bold transition-all shadow-xs shrink-0"
                      >
                        <span>View Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* SECTION 2: Production Web Platforms & E-Commerce Builds       */}
        {/* ------------------------------------------------------------ */}
        <section id="web-platforms" className="scroll-mt-44 md:scroll-mt-48 mb-20">
          <div className="mb-8 pb-4 border-b border-slate-200">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0082CA] mb-1">
              <Globe className="w-4 h-4" />
              <span>Web Engineering Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D2040]">
              Production Web Platforms &amp; Stores
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Live commercial web applications, portals, and e-commerce stores engineered for business growth. Click &quot;View Live&quot; to inspect any platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.title}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-[#0082CA]/50 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual UI Preview Image - Clickable to Live Site */}
                    <a
                      href={platform.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 border border-slate-200/80 bg-slate-900 shadow-inner group/img cursor-pointer"
                      title={`Visit ${platform.title} live`}
                    >
                      <Image
                        src={platform.image}
                        alt={`${platform.title} Web Preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20 group-hover/img:bg-[#0082CA] transition-colors">
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </a>

                    <div className="w-10 h-10 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0082CA] bg-[#F0F8FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {platform.category}
                    </span>

                    <h3 className="text-lg font-bold text-[#0D2040] mb-1">
                      {platform.title}
                    </h3>

                    <p className="text-xs font-semibold text-[#0082CA] mb-3">
                      {platform.headline}
                    </p>

                    <p className="text-xs text-[#475569] leading-relaxed mb-4">
                      {platform.description}
                    </p>

                    <div className="space-y-1.5 mb-5">
                      <span className="text-[10px] font-bold text-[#0D2040] uppercase tracking-wider block">
                        Architecture Highlights:
                      </span>
                      {platform.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer with prominent 'View Live' button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {platform.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={platform.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0082CA] hover:bg-[#0070b0] text-white text-xs font-bold transition-all shadow-xs shrink-0"
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* SECTION 3: Industry Growth Blueprints                         */}
        {/* ------------------------------------------------------------ */}
        <section id="growth-blueprints" className="scroll-mt-44 md:scroll-mt-48 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0082CA] mb-1">
                <Compass className="w-4 h-4" />
                <span>Sector Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0D2040]">
                Industry Growth Blueprints
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                System blueprints showing how we solve common acquisition and lead-handling roadblocks.
              </p>
            </div>
          </div>

          {/* Transparency Alert */}
          <div className="mb-10 p-5 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] text-xs sm:text-sm text-[#0082CA] flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-[#0082CA]" />
            <div>
              <strong>Honest note:</strong> The architectures below are solution blueprints — typical industry roadblocks and the verified systems we build to solve them. Under our Zero Fabricated Proof Policy, client case studies are published only with written authorization and genuine analytics. Live walkthroughs are available on request.
            </div>
          </div>

          {/* Architecture Cards */}
          <div className="space-y-8">
            {sampleArchitectures.map((arch) => {
              const Icon = arch.icon;
              return (
                <div
                  key={arch.title}
                  className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs hover:border-[#0082CA]/40 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0082CA] bg-[#F0F8FF] border border-[#BAE6FD] px-3 py-1 rounded-full">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{arch.category}</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Growth Blueprint
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2040] mb-3">
                    {arch.title}
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-[#475569]">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <strong className="text-[#0D2040] block mb-1">
                        Typical Roadblock:
                      </strong>
                      <p>{arch.challenge}</p>
                    </div>

                    <div>
                      <strong className="text-[#0D2040] block mb-2">
                        System Blueprint:
                      </strong>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {arch.architecture.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[#0082CA] font-bold">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-xs text-[#0D2040] font-medium">
                      <strong>What we measure:</strong> {arch.outcomesTracked}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* FINAL CTA: Live Demo & Walkthrough Request                    */}
        {/* ------------------------------------------------------------ */}
        <div className="mt-16 text-center bg-[#0D2040] text-white p-8 sm:p-12 rounded-3xl">
          <div className="w-12 h-12 rounded-xl bg-[#0082CA] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Want to See a Live Product or Blueprint Demo?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            We will walk you through live demonstrations of our web tools, SEO data stacks, and custom automated growth funnels tailored to your business model.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="teal" size="md">
              Request an Interactive Walkthrough
            </Button>
            <a
              href="https://carthworks.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-colors"
            >
              <span>Explore Engineering Lab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
