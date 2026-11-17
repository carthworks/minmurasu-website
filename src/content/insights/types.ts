/**
 * Insight article model. Body text supports two inline marks:
 * **bold** and [link text](/path or https://url).
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone: "tip" | "warning" | "takeaway"; title: string; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      /** Intrinsic aspect, used to reserve space and avoid layout shift. */
      width: number;
      height: number;
    }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string };

export interface ArticleSource {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  /** H1 and card title. */
  title: string;
  /** <title> tag (the root template appends "| MIN MURASU"). Keep under ~60 chars. */
  seoTitle: string;
  /** Meta description. Keep under ~160 chars. */
  description: string;
  /** Card teaser on /insights. */
  excerpt: string;
  category: string;
  keywords: string[];
  /** ISO dates. */
  publishedAt: string;
  updatedAt: string;
  cover: { src: string; alt: string };
  body: ArticleBlock[];
  faqs: { q: string; a: string }[];
  sources: ArticleSource[];
  cta: { title: string; text: string; href: string; label: string };
}
