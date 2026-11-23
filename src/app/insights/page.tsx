import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { articles, formatDate, readingMinutes } from "@/content/insights";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Growth Insights & Strategic Articles",
  description:
    "Practical guides on Generative Engine Optimisation (GEO), Core Web Vitals, ad-to-CRM conversion tracking, local SEO for clinics, and distribution for developers.",
  alternates: { canonical: absoluteUrl("/insights") },
  openGraph: {
    title: "Growth Insights | MIN MURASU",
    description:
      "Practical guides on AI search, web performance, conversion tracking, local SEO and product distribution.",
    url: absoluteUrl("/insights"),
    siteName: siteConfig.name,
    locale: siteConfig.seo.locale,
    type: "website",
    images: [{ url: siteConfig.brand.ogImage, width: 1200, height: 630, alt: "Growth Insights | MIN MURASU" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: "Growth Insights | MIN MURASU",
    description:
      "Practical guides on AI search, web performance, conversion tracking, local SEO and product distribution.",
    images: [siteConfig.brand.ogImage],
  },
};

export default function InsightsPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Insights`,
    url: absoluteUrl("/insights"),
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: absoluteUrl(`/insights/${a.slug}`),
      datePublished: a.publishedAt,
      dateModified: a.updatedAt,
    })),
  };

  return (
    <div className="py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <Container>
        <SectionHeading
          eyebrow="Knowledge & Strategy"
          title="Practical Guides for Ambitious Business Leaders"
          description="Clear, technical, and actionable perspectives on digital growth, modern web engineering, and enterprise AI automation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {articles.map((art) => (
            <article
              key={art.slug}
              className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-[#0082CA]/50 hover:shadow-md transition-all flex flex-col overflow-hidden"
            >
              <Image
                src={art.cover.src}
                alt={art.cover.alt}
                width={1200}
                height={630}
                unoptimized
                className="w-full h-auto border-b border-slate-100"
              />
              <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#0082CA] bg-[#F0F8FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
                      <Tag className="w-3 h-3" />
                      <span>{art.category}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{readingMinutes(art)} min read</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#0D2040] mb-3 leading-snug">
                    <Link href={`/insights/${art.slug}`} className="after:absolute after:inset-0 group-hover:text-[#0082CA]">
                      {art.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-[#475569] leading-relaxed mb-6">{art.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <time dateTime={art.updatedAt} className="text-xs text-slate-400">
                    {formatDate(art.updatedAt)}
                  </time>
                  <span className="text-xs font-bold text-[#0082CA] group-hover:text-[#0D2040] inline-flex items-center gap-1 transition-colors">
                    <span>Read the guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
