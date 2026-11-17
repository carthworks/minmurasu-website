import type { Article } from "./types";
import { plainText } from "@/components/insights/InlineText";
import { developerDistribution } from "./developer-distribution-sprint";
import { geoGuide } from "./generative-engine-optimisation-guide";
import { nextjsVsWordpress } from "./nextjs-vs-wordpress-b2b";
import { adTrackingCrm } from "./ad-tracking-crm-integration";
import { localSeoClinics } from "./local-seo-healthcare-tamil-nadu";

export type { Article, ArticleBlock } from "./types";

/** Display order on /insights. */
export const articles: Article[] = [
  developerDistribution,
  geoGuide,
  nextjsVsWordpress,
  adTrackingCrm,
  localSeoClinics,
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

/** Minutes to read at ~220 words per minute, counting body text, tables and FAQs. */
export function readingMinutes(article: Article) {
  const parts: string[] = [];
  for (const b of article.body) {
    if (b.type === "p" || b.type === "h2" || b.type === "h3") parts.push(b.text);
    else if (b.type === "ul" || b.type === "ol") parts.push(...b.items);
    else if (b.type === "callout") parts.push(b.title, b.text);
    else if (b.type === "table") parts.push(...b.head, ...b.rows.flat());
  }
  for (const f of article.faqs) parts.push(f.q, f.a);
  const words = plainText(parts.join(" ")).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
