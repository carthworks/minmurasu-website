import type { CaseStudy } from "./types";
import { sampleTemplate } from "./_template";

export type { CaseStudy, CaseStudyMetric, CaseStudyProof, CaseStudyRanking } from "./types";

/** Display order on /case-studies. Add real case studies above the template. */
const allCaseStudies: CaseStudy[] = [sampleTemplate];

const isProduction = process.env.NODE_ENV === "production";

/** A case study may go live only with consent on file and at least one dated proof image. */
function isPublishable(c: CaseStudy) {
  return c.status === "published" && c.consent.written && Boolean(c.consent.date) && c.proof.length > 0;
}

/** Live case studies: listed on the index, in the sitemap, indexable. */
export const publishedCaseStudies: CaseStudy[] = allCaseStudies.filter(isPublishable);

/**
 * Case studies that get a route. In development, drafts are included so the layout
 * can be previewed; they render with a draft banner and noindex.
 */
export const routableCaseStudies: CaseStudy[] = isProduction
  ? publishedCaseStudies
  : allCaseStudies;

export function getCaseStudy(slug: string) {
  return routableCaseStudies.find((c) => c.slug === slug);
}

export function isLive(c: CaseStudy) {
  return isPublishable(c);
}

/** Display name: the client's name if they agreed to be named, otherwise the descriptor. */
export function clientLabel(c: CaseStudy) {
  return c.client.name ?? c.client.descriptor;
}

function formatMonth(iso: string) {
  return new Date(`${iso}-01T00:00:00Z`).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatPeriod(period: CaseStudy["period"]) {
  return `${formatMonth(period.start)} – ${period.end ? formatMonth(period.end) : "ongoing"}`;
}

export function formatDay(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
