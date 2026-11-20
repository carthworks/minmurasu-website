/**
 * Case study model for /case-studies. Text fields support the same inline marks as
 * insights: **bold** and [link text](/path or https://url).
 *
 * Proof rules (enforced by getPublishedCaseStudies in ./index.ts):
 * - Nothing is published without written client consent (consent.written + consent.date).
 * - Every number must come from a dated source (Search Console, GBP, CRM, rank tracker).
 * - If the client won't be named, set client.name to undefined and describe them honestly
 *   ("A multi-specialty clinic in Coimbatore"). Never invent a brand name.
 * - Healthcare: no patient testimonials or outcome promises (NMC guidelines, Oct 2026).
 */

export interface CaseStudyMetric {
  /** e.g. "Organic clicks / month", "Keywords in top 3", "Enquiries / month". */
  label: string;
  before: string;
  after: string;
  /** Optional short change label, e.g. "+212%" or "+38 calls". */
  change?: string;
  /** Where the number comes from, e.g. "Google Search Console". */
  source: string;
}

export interface CaseStudyRanking {
  keyword: string;
  /** Position at the start. null = not in the top 100. */
  before: number | null;
  after: number | null;
}

export interface CaseStudyProof {
  /** Screenshot under /public, e.g. /images/case-studies/<slug>/gsc.png. */
  src: string;
  alt: string;
  /** Must name the tool and the date range shown, e.g. "Search Console, Mar–Aug 2027". */
  caption: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  /** Drafts never appear in production builds, the sitemap or the index page. */
  status: "draft" | "published";
  /** Internal record. Not rendered, but required before publishing. */
  consent: { written: boolean; date?: string; contact?: string };

  client: {
    /** Leave undefined if the client asked not to be named. */
    name?: string;
    /** Always shown, e.g. "Multi-specialty clinic". */
    descriptor: string;
    city: string;
    industry: string;
    website?: string;
    logo?: { src: string; alt: string };
  };

  /** H1 and card title, e.g. "Clinic in Coimbatore: 3x organic enquiries in 6 months". */
  title: string;
  /** <title> tag (the root template appends "| MIN MURASU"). Keep under ~60 chars. */
  seoTitle: string;
  /** Meta description. Keep under ~160 chars. */
  description: string;
  /** Card teaser on /case-studies. */
  excerpt: string;
  /** Service slugs from src/content/services.ts. */
  services: string[];

  /** Engagement window as ISO months, e.g. "2027-03". end undefined = ongoing. */
  period: { start: string; end?: string };
  publishedAt: string;
  updatedAt: string;

  /** One or two sentences: where the client started and what was wrong. */
  challenge: string;
  /** 3–5 bullets: what we actually did. */
  work: string[];
  /** Up to 3 headline numbers. Lead with business outcomes (enquiries, calls), not only rankings. */
  metrics: CaseStudyMetric[];

  /** 5–10 target keywords. Leave empty if rankings are not the point of the story. */
  rankings: CaseStudyRanking[];
  rankingMeta?: {
    /** e.g. "SE Ranking", "Semrush", "Google Search Console (avg. position)". */
    tool: string;
    /** Where the search was simulated from, e.g. "Coimbatore, Tamil Nadu". */
    location: string;
    /** ISO dates of the two measurements. */
    baselineDate: string;
    currentDate: string;
  };

  /** Dated screenshots. At least one is required to publish. */
  proof: CaseStudyProof[];

  testimonial?: { quote: string; name: string; role: string };

  cta: { title: string; text: string; href: string; label: string };
}
