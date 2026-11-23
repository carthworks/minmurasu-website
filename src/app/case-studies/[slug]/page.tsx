import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowDown, ArrowRight, ArrowUp, CalendarDays, ChevronRight, MapPin, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InlineText from "@/components/insights/InlineText";
import {
  clientLabel,
  formatDay,
  formatPeriod,
  getCaseStudy,
  isLive,
  routableCaseStudies,
  type CaseStudyRanking,
} from "@/content/case-studies";
import { servicesData } from "@/content/services";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return routableCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return { title: "Case Study Not Found" };

  const url = absoluteUrl(`/case-studies/${c.slug}`);
  return {
    title: c.seoTitle,
    description: c.description,
    alternates: { canonical: url },
    robots: isLive(c) ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "article",
      locale: siteConfig.seo.locale,
      url,
      title: c.title,
      description: c.description,
      publishedTime: c.publishedAt,
      modifiedTime: c.updatedAt,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.brand.ogImage, width: 1200, height: 630, alt: c.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.seo.twitterHandle,
      creator: siteConfig.seo.twitterHandle,
      title: c.title,
      description: c.description,
      images: [siteConfig.brand.ogImage],
    },
  };
}

function position(p: number | null) {
  return p === null ? "Not in top 100" : `#${p}`;
}

function RankChange({ r }: { r: CaseStudyRanking }) {
  if (r.after === null) return <span className="text-slate-400">–</span>;
  const before = r.before ?? 101;
  const diff = before - r.after;
  if (diff === 0) return <span className="text-slate-500">No change</span>;
  const up = diff > 0;
  const Icon = up ? ArrowUp : ArrowDown;
  return (
    <span className={`inline-flex items-center gap-1 font-bold ${up ? "text-emerald-600" : "text-red-600"}`}>
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {r.before === null ? "New" : Math.abs(diff)}
    </span>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const url = absoluteUrl(`/case-studies/${c.slug}`);
  const live = isLive(c);
  const label = clientLabel(c);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.title,
      description: c.description,
      datePublished: c.publishedAt,
      dateModified: c.updatedAt,
      author: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.brand.logo) },
      },
      about: c.client.name ? { "@type": "Organization", name: c.client.name, url: c.client.website } : undefined,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: absoluteUrl("/case-studies") },
        { "@type": "ListItem", position: 3, name: c.title, item: url },
      ],
    },
  ];

  return (
    <article>
      {live && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}

      {!live && (
        <div role="status" className="bg-amber-50 border-b border-amber-200 py-2.5 text-sm text-amber-800">
          <Container className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
            Draft preview with sample data. Only visible in development; never served in production.
          </Container>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <Container>
          <ol className="flex items-center gap-1.5 min-w-0">
            <li><Link href="/" className="hover:text-[#0082CA]">Home</Link></li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-400" /></li>
            <li><Link href="/case-studies" className="hover:text-[#0082CA]">Case Studies</Link></li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-400" /></li>
            <li className="truncate text-[#0D2040] font-semibold" aria-current="page">{c.client.industry}</li>
          </ol>
        </Container>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-b from-[#F0F8FF] to-white pt-10 sm:pt-14 pb-10">
        <Container className="max-w-4xl">
          <div className="flex items-center gap-4 mb-5">
            {c.client.logo && (
              <Image
                src={c.client.logo.src}
                alt={c.client.logo.alt}
                width={56}
                height={56}
                className="w-14 h-14 rounded-xl border border-slate-200 bg-white object-contain p-1.5"
              />
            )}
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0082CA] bg-white border border-[#BAE6FD] px-3 py-1 rounded-full">
              {c.client.industry} case study
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#0D2040] mb-5">
            {c.title}
          </h1>
          <p className="text-lg text-[#475569] leading-relaxed mb-6">{c.description}</p>
          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <div className="inline-flex items-center gap-1.5">
              <dt className="sr-only">Client</dt>
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <dd className="font-semibold text-[#0D2040]">{label}, {c.client.city}</dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <dt className="sr-only">Engagement period</dt>
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              <dd>{formatPeriod(c.period)}</dd>
            </div>
            <div className="inline-flex flex-wrap items-center gap-1.5">
              <dt className="sr-only">Services</dt>
              {c.services.map((s) => (
                <dd key={s}>
                  <Link
                    href={`/services/${s}`}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-[#0D2040] hover:border-[#0082CA] hover:text-[#0082CA]"
                  >
                    {servicesData[s]?.title ?? s}
                  </Link>
                </dd>
              ))}
            </div>
          </dl>
        </Container>
      </header>

      <Container className="max-w-4xl pb-16">
        {/* Headline metrics */}
        {c.metrics.length > 0 && (
          <section aria-label="Results" className="grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-2 mb-12">
            {c.metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{m.label}</p>
                <p className="mt-2 text-3xl font-black text-[#0D2040]">{m.after}</p>
                <p className="mt-1 text-sm text-slate-500">
                  from {m.before}
                  {m.change && <span className="ml-1.5 font-bold text-emerald-600">{m.change}</span>}
                </p>
                <p className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400">Source: {m.source}</p>
              </div>
            ))}
          </section>
        )}

        <div className="max-w-3xl space-y-10">
          <section aria-labelledby="challenge">
            <h2 id="challenge" className="text-2xl font-black tracking-tight text-[#0D2040] mb-3">The starting point</h2>
            <p className="text-[17px] leading-8 text-[#334155]"><InlineText text={c.challenge} /></p>
          </section>

          <section aria-labelledby="work">
            <h2 id="work" className="text-2xl font-black tracking-tight text-[#0D2040] mb-3">What we did</h2>
            <ul className="space-y-2.5 pl-6 list-disc marker:text-[#0082CA] text-[17px] leading-8 text-[#334155]">
              {c.work.map((w) => (
                <li key={w} className="pl-1"><InlineText text={w} /></li>
              ))}
            </ul>
          </section>

          {/* Proof screenshots */}
          {c.proof.length > 0 && (
            <section aria-labelledby="proof">
              <h2 id="proof" className="text-2xl font-black tracking-tight text-[#0D2040] mb-4">The data</h2>
              <div className="space-y-6">
                {c.proof.map((p) => (
                  <figure key={p.src}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="(max-width: 768px) 100vw, 768px"
                      unoptimized={p.src.endsWith(".svg")}
                      className="w-full h-auto rounded-2xl border border-slate-200 bg-white"
                    />
                    <figcaption className="mt-2.5 text-center text-sm text-slate-500">{p.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Rankings */}
          {c.rankings.length > 0 && (
            <section aria-labelledby="rankings">
              <h2 id="rankings" className="text-2xl font-black tracking-tight text-[#0D2040] mb-4">Keyword rankings</h2>
              <figure>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-[#0D2040] text-white">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Keyword</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Before</th>
                        <th scope="col" className="px-4 py-3 font-semibold">After</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {c.rankings.map((r) => (
                        <tr key={r.keyword} className="even:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-[#0D2040]">{r.keyword}</td>
                          <td className="px-4 py-3 text-[#475569]">{position(r.before)}</td>
                          <td className="px-4 py-3 font-bold text-[#0D2040]">{position(r.after)}</td>
                          <td className="px-4 py-3"><RankChange r={r} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {c.rankingMeta && (
                  <figcaption className="mt-2.5 text-sm text-slate-500">
                    Measured with {c.rankingMeta.tool} from {c.rankingMeta.location} on{" "}
                    {formatDay(c.rankingMeta.baselineDate)} and {formatDay(c.rankingMeta.currentDate)}. Rankings vary by
                    location and device.
                  </figcaption>
                )}
              </figure>
            </section>
          )}

          {c.testimonial && (
            <figure className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
              <Quote className="w-7 h-7 text-[#F58220] mb-3" aria-hidden="true" />
              <blockquote className="text-lg leading-8 text-[#0D2040] font-medium">{c.testimonial.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-slate-500">
                <span className="font-bold text-[#0D2040]">{c.testimonial.name}</span>, {c.testimonial.role}
              </figcaption>
            </figure>
          )}

          <section className="rounded-3xl bg-[#0D2040] p-7 sm:p-10 text-center text-white">
            <h2 className="text-2xl font-black mb-2">{c.cta.title}</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">{c.cta.text}</p>
            <Button href={c.cta.href} variant="orange" size="lg" className="inline-flex items-center gap-2">
              {c.cta.label} <ArrowRight className="w-4 h-4" />
            </Button>
          </section>

          <p className="text-xs text-slate-400">
            Published {formatDay(c.publishedAt)}
            {c.updatedAt !== c.publishedAt && <>, updated {formatDay(c.updatedAt)}</>}. Results are specific to this
            client and period and are not a guarantee of future rankings.
          </p>
        </div>
      </Container>
    </article>
  );
}
