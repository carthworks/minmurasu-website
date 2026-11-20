import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import {
  clientLabel,
  formatPeriod,
  isLive,
  publishedCaseStudies,
  routableCaseStudies,
} from "@/content/case-studies";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

const hasLive = publishedCaseStudies.length > 0;

export const metadata: Metadata = {
  title: "SEO & Digital Marketing Case Studies | Coimbatore",
  description:
    "Dated, verifiable results from MIN MURASU clients: Search Console data, keyword rankings, and the enquiries they produced. Published only with written client consent.",
  alternates: { canonical: absoluteUrl("/case-studies") },
  // An empty results page is thin content; keep it out of the index until the first case study is live.
  robots: hasLive ? { index: true, follow: true } : { index: false, follow: true },
  openGraph: {
    title: "Case Studies | MIN MURASU",
    description: "Dated, verifiable SEO and digital marketing results, published with client consent.",
    url: absoluteUrl("/case-studies"),
    type: "website",
  },
};

const proofStandards = [
  { title: "Dated before & after", text: "Every result shows when the baseline was taken and when it was measured again." },
  { title: "Source on every number", text: "Search Console, Google Business Profile, rank tracker or the client's CRM, named beside the figure." },
  { title: "Business outcomes first", text: "Enquiries, calls and bookings matter more than a ranking position, so we lead with them." },
  { title: "Written consent", text: "Nothing is published without the client's written approval. Anonymised clients are described, never renamed." },
];

export default function CaseStudiesPage() {
  // Production: only live case studies. Development: drafts too, flagged, so the layout can be previewed.
  const items = routableCaseStudies;

  const jsonLd = hasLive
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${siteConfig.name} Case Studies`,
        url: absoluteUrl("/case-studies"),
        hasPart: publishedCaseStudies.map((c) => ({
          "@type": "Article",
          headline: c.title,
          url: absoluteUrl(`/case-studies/${c.slug}`),
          datePublished: c.publishedAt,
          dateModified: c.updatedAt,
        })),
      }
    : null;

  return (
    <div className="py-16 sm:py-24">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <Container>
        <SectionHeading
          eyebrow="Proof, done honestly"
          title="Client results you can check"
          description="Each case study shows the starting point, what we did, and dated numbers from the tools that measured them."
        />

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {items.map((c) => {
              const draft = !isLive(c);
              const headline = c.metrics[0];
              return (
                <article
                  key={c.slug}
                  className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-[#0082CA]/50 hover:shadow-md transition-all flex flex-col p-7 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
                    <span className="font-semibold text-[#0082CA] bg-[#F0F8FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
                      {c.client.industry}
                    </span>
                    {draft && (
                      <span className="font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        Draft · dev only
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-[#0D2040] mb-3 leading-snug">
                    <Link href={`/case-studies/${c.slug}`} className="after:absolute after:inset-0 group-hover:text-[#0082CA]">
                      {c.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-[#475569] leading-relaxed mb-5">{c.excerpt}</p>

                  {headline && (
                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{headline.label}</p>
                      <p className="mt-1 text-2xl font-black text-[#0D2040]">
                        {headline.before} <span className="text-slate-400 font-normal">→</span> {headline.after}
                        {headline.change && <span className="ml-2 text-base font-bold text-emerald-600">{headline.change}</span>}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      {clientLabel(c)}, {c.client.city}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                      {formatPeriod(c.period)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center rounded-3xl border border-dashed border-slate-300 bg-[#F0F8FF]/50 p-10">
            <h2 className="text-xl font-extrabold text-[#0D2040]">Our first case studies are being measured</h2>
            <p className="mt-2 text-[15px] text-[#475569] leading-relaxed">
              We only publish results with a dated baseline and the client&apos;s written consent, so this page fills up
              as engagements reach their review dates. Until then, we&apos;re happy to walk you through our method and
              our own site&apos;s data on a call.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/free-audit" variant="orange" className="inline-flex items-center gap-2">
                Get a free audit <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/book" variant="outline">
                Book a call
              </Button>
            </div>
          </div>
        )}

        {/* How we prove results */}
        <section aria-labelledby="standards" className="mt-16 max-w-5xl mx-auto">
          <h2 id="standards" className="flex items-center gap-2 text-lg font-black text-[#0D2040] mb-5">
            <ShieldCheck className="w-5 h-5 text-[#0082CA]" aria-hidden="true" />
            How we report results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {proofStandards.map((s) => (
              <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-[#0D2040] mb-1">{s.title}</p>
                <p className="text-sm text-[#475569] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
