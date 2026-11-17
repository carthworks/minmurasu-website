import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  ExternalLink,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InlineText from "@/components/insights/InlineText";
import { articles, formatDate, getArticle, readingMinutes, type ArticleBlock } from "@/content/insights";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article Not Found" };

  const url = absoluteUrl(`/insights/${article.slug}`);
  return {
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: siteConfig.founderDetails.name, url: absoluteUrl("/about") }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [siteConfig.founderDetails.name],
      section: article.category,
      tags: article.keywords,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

const calloutStyles = {
  tip: { icon: Lightbulb, box: "bg-[#F0F8FF] border-[#BAE6FD]", icon_cls: "text-[#0082CA]" },
  warning: { icon: AlertTriangle, box: "bg-amber-50 border-amber-200", icon_cls: "text-amber-600" },
  takeaway: { icon: Sparkles, box: "bg-orange-50 border-orange-200", icon_cls: "text-[#F58220]" },
} as const;

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[17px] leading-8 text-[#334155]">
          <InlineText text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2 id={block.id} className="scroll-mt-28 pt-6 text-2xl sm:text-3xl font-black tracking-tight text-[#0D2040]">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 text-xl font-bold text-[#0D2040]">{block.text}</h3>;
    case "ul":
    case "ol": {
      const List = block.type === "ul" ? "ul" : "ol";
      return (
        <List
          className={`space-y-2.5 pl-6 text-[17px] leading-8 text-[#334155] ${
            block.type === "ul" ? "list-disc marker:text-[#0082CA]" : "list-decimal marker:font-bold marker:text-[#0082CA]"
          }`}
        >
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <InlineText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "callout": {
      const s = calloutStyles[block.tone];
      const Icon = s.icon;
      return (
        <aside className={`rounded-2xl border p-5 sm:p-6 ${s.box}`}>
          <p className="flex items-center gap-2 font-bold text-[#0D2040] mb-1.5">
            <Icon className={`w-5 h-5 ${s.icon_cls}`} aria-hidden="true" />
            {block.title}
          </p>
          <p className="text-[15px] leading-7 text-[#334155]">
            <InlineText text={block.text} />
          </p>
        </aside>
      );
    }
    case "image":
      return (
        <figure className="my-2">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(max-width: 768px) 100vw, 768px"
            unoptimized={block.src.endsWith(".svg")}
            className="w-full h-auto rounded-2xl border border-slate-200 bg-white"
          />
          {block.caption && (
            <figcaption className="mt-2.5 text-center text-sm text-slate-500">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "table":
      return (
        <figure className="my-2">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-[#0D2040] text-white">
                <tr>
                  {block.head.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {block.rows.map((row) => (
                  <tr key={row.join("|")} className="even:bg-slate-50">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-4 py-3 text-[#334155] ${i === 0 ? "font-semibold text-[#0D2040]" : ""}`}>
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-2.5 text-sm text-slate-500">{block.caption}</figcaption>}
        </figure>
      );
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = absoluteUrl(`/insights/${article.slug}`);
  const minutes = readingMinutes(article);
  const toc = article.body.filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2");
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      image: [absoluteUrl(`/insights/${article.slug}/opengraph-image`)],
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: {
        "@type": "Person",
        name: siteConfig.founderDetails.name,
        jobTitle: siteConfig.founderDetails.role,
        url: absoluteUrl("/about"),
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.brand.logo) },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: article.category,
      keywords: article.keywords.join(", "),
      wordCount: minutes * 220,
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Insights", item: absoluteUrl("/insights") },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <Container>
          <ol className="flex items-center gap-1.5 min-w-0">
            <li><Link href="/" className="hover:text-[#0082CA]">Home</Link></li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-400" /></li>
            <li><Link href="/insights" className="hover:text-[#0082CA]">Insights</Link></li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-400" /></li>
            <li className="truncate text-[#0D2040] font-semibold" aria-current="page">{article.category}</li>
          </ol>
        </Container>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-b from-[#F0F8FF] to-white pt-10 sm:pt-14 pb-8">
        <Container className="max-w-4xl">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0082CA] bg-white border border-[#BAE6FD] px-3 py-1 rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#0D2040] mb-5">
            {article.title}
          </h1>
          <p className="text-lg text-[#475569] leading-relaxed mb-6">{article.description}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="font-semibold text-[#0D2040]">
              By <Link href="/about" className="hover:text-[#0082CA]">{siteConfig.founderDetails.name}</Link>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              <time dateTime={article.updatedAt}>Updated {formatDate(article.updatedAt)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {minutes} min read
            </span>
          </div>
        </Container>
      </header>

      <Container className="max-w-4xl">
        <Image
          src={article.cover.src}
          alt={article.cover.alt}
          width={1200}
          height={630}
          priority
          unoptimized
          className="w-full h-auto rounded-3xl border border-slate-200 shadow-sm"
        />
      </Container>

      <Container className="max-w-3xl py-10 sm:py-14">
        {/* Table of contents */}
        {toc.length > 0 && (
          <nav aria-label="In this article" className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">In this article</p>
            <ol className="space-y-2 text-sm">
              {toc.map((h, i) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-[#0D2040] hover:text-[#0082CA] font-medium">
                    <span className="text-[#0082CA] font-mono mr-2">{String(i + 1).padStart(2, "0")}</span>
                    {h.text}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-[#0D2040] hover:text-[#0082CA] font-medium">
                  <span className="text-[#0082CA] font-mono mr-2">{String(toc.length + 1).padStart(2, "0")}</span>
                  Frequently asked questions
                </a>
              </li>
            </ol>
          </nav>
        )}

        <div className="space-y-6">
          {article.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* FAQ */}
        <section aria-labelledby="faq" className="mt-14">
          <h2 id="faq" className="scroll-mt-28 text-2xl sm:text-3xl font-black tracking-tight text-[#0D2040] mb-5">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {article.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 p-5 open:bg-slate-50">
                <summary className="cursor-pointer list-none font-bold text-[#0D2040] flex justify-between gap-4">
                  {f.q}
                  <span className="text-[#0082CA] text-xl leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-7 text-[#475569]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl bg-[#0D2040] p-7 sm:p-10 text-center text-white">
          <h2 className="text-2xl font-black mb-2">{article.cta.title}</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-6">{article.cta.text}</p>
          <Button href={article.cta.href} variant="orange" size="lg" className="inline-flex items-center gap-2">
            {article.cta.label} <ArrowRight className="w-4 h-4" />
          </Button>
        </section>

        {/* Sources */}
        {article.sources.length > 0 && (
          <section aria-labelledby="sources" className="mt-12 border-t border-slate-200 pt-8">
            <h2 id="sources" className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Sources and further reading
            </h2>
            <ul className="space-y-2 text-sm">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1.5 text-[#0082CA] hover:text-[#0D2040]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>

      {/* Related */}
      <section className="bg-slate-50 border-t border-slate-200 py-14">
        <Container className="max-w-5xl">
          <h2 className="text-xl font-black text-[#0D2040] mb-6">Keep reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/insights/${r.slug}`}
                className="group rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-[#0082CA]/50 hover:shadow-md transition-all"
              >
                <Image
                  src={r.cover.src}
                  alt=""
                  width={1200}
                  height={630}
                  unoptimized
                  className="w-full h-auto border-b border-slate-100"
                />
                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0082CA]">{r.category}</span>
                  <h3 className="mt-1 font-bold text-[#0D2040] leading-snug group-hover:text-[#0082CA]">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
