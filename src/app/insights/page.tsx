import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Growth Insights & Strategic Articles | MIN MURASU",
  description:
    "Practical perspectives on Generative Engine Optimisation (GEO), technical SEO, conversion rate engineering, and B2B automation.",
};

const articles = [
  {
    title: "How to Prepare Your Brand for Generative Engine Optimisation (GEO)",
    slug: "generative-engine-optimisation-guide",
    excerpt:
      "Why standard keyword stuffing fails with large language models, and how to structure your website schema and citations so ChatGPT, Perplexity, and Gemini cite your brand.",
    date: "November 2026",
    readTime: "6 min read",
    category: "AI & Search",
  },
  {
    title: "Why Modern B2B Websites Must Be Engineered in Next.js Instead of Bloated Themes",
    slug: "nextjs-vs-wordpress-b2b",
    excerpt:
      "Core Web Vitals directly impact conversion rates. Exploring how sub-second load speeds, server-side rendering, and zero-vulnerability codebases protect your media ad spend.",
    date: "October 2026",
    readTime: "5 min read",
    category: "Web Engineering",
  },
  {
    title: "Connecting Ads to CRM: The Missing Link in Indian SME Marketing",
    slug: "ad-tracking-crm-integration",
    excerpt:
      "Most agencies stop at 'click count'. Here is how to configure Meta CAPI, Google Tag Manager, and Zoho/HubSpot webhooks to track true cost per closed deal.",
    date: "September 2026",
    readTime: "7 min read",
    category: "Analytics & Automation",
  },
  {
    title: "Local SEO for Coimbatore & Chennai Clinics: A Medical Practice Playbook",
    slug: "local-seo-healthcare-tamil-nadu",
    excerpt:
      "How multi-specialty healthcare providers can rank in the Google 3-Pack, manage patient reviews ethically, and eliminate booking no-shows.",
    date: "August 2026",
    readTime: "8 min read",
    category: "Healthcare Growth",
  },
];

export default function InsightsPage() {
  return (
    <div className="py-16 sm:py-24">
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
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:border-[#0E7490]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0E7490] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
                    <Tag className="w-3 h-3" />
                    <span>{art.category}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#14243A] mb-3 leading-snug">
                  {art.title}
                </h2>

                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">{art.date}</span>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#0E7490] hover:text-[#14243A] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Discuss Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}

