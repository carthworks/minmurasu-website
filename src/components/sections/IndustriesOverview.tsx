"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig, getPlaybookLabel } from "@/lib/site-config";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  GraduationCap,
  Stethoscope,
  Store,
} from "lucide-react";
import Link from "next/link";

const iconMap = {
  Stethoscope,
  Building2,
  Factory,
  GraduationCap,
  Store,
};

const industryDetails: Record<
  string,
  { painPoint: string; solutions: string[] }
> = {
  "healthcare-clinics": {
    painPoint: "Missed appointment enquiries, no-shows, and patients choosing the clinic that ranks higher on Google Maps.",
    solutions: [
      "Show up when patients search for your specialty nearby",
      "Instant WhatsApp replies and automatic appointment reminders",
      "A reassuring website that shows your doctors and makes booking easy",
    ],
  },
  "real-estate": {
    painPoint: "Portal leads that never pick up the phone, and serious buyers lost to slow follow-up.",
    solutions: [
      "A fast, dedicated page for every project",
      "Google and Meta ads aimed at people actively looking to buy",
      "Brochure sent on WhatsApp instantly, and serious buyers flagged for your sales team",
    ],
  },
  "manufacturing-industrial": {
    painPoint: "Business depends on word-of-mouth and trade shows; buyers searching online can't find you.",
    solutions: [
      "A modern online product catalogue that buyers can search",
      "Quote requests sent straight to the right person in your sales team",
      "Rank for the exact products and parts buyers search for",
    ],
  },
  "education-training": {
    painPoint: "Expensive leads during admission season, and student enquiries that never get a follow-up.",
    solutions: [
      "Clear course and admission pages that answer parents' and students' questions",
      "Google ads for people searching for your courses",
      "Automatic WhatsApp and email follow-ups until they enrol",
    ],
  },
  "retail-services": {
    painPoint: "Competitors show up first on Google Maps, and reviews go unanswered.",
    solutions: [
      "A strong Google Business Profile and a simple way to collect reviews",
      "Pages that win 'near me' searches for each location",
      "Online booking and a WhatsApp line that answers instantly",
    ],
  },
};

export default function IndustriesOverview() {
  const [active, setActive] = useState(0);
  const industries = siteConfig.industries;
  const ind = industries[active];
  const Icon = iconMap[ind.icon as keyof typeof iconMap] || Store;
  const detail = industryDetails[ind.slug];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          title="Built for your industry"
          description="Pick your industry to see the problems we solve and how."
        />

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Industries"
          className="flex gap-2 overflow-x-auto pb-2 mb-8 justify-start md:justify-center -mx-4 px-4 md:mx-0 md:px-0"
        >
          {industries.map((item, i) => {
            const TabIcon = iconMap[item.icon as keyof typeof iconMap] || Store;
            const selected = i === active;
            return (
              <button
                key={item.slug}
                role="tab"
                id={`ind-tab-${item.slug}`}
                aria-selected={selected}
                aria-controls="ind-panel"
                onClick={() => setActive(i)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-colors cursor-pointer ${
                  selected
                    ? "bg-[#0D2040] border-[#0D2040] text-white shadow-md"
                    : "bg-white border-slate-300 text-[#0D2040] hover:border-[#0082CA]"
                }`}
              >
                <TabIcon className={`w-4 h-4 ${selected ? "text-[#F58220]" : "text-[#0082CA]"}`} />
                <span>{item.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          id="ind-panel"
          role="tabpanel"
          aria-labelledby={`ind-tab-${ind.slug}`}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl bg-orange-50/80 border border-orange-200/80 p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#0D2040] text-white flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0D2040]">{ind.title}</h3>
            </div>
            <div className="text-sm font-bold uppercase tracking-wider text-[#C2410C] mb-2">
              The problem
            </div>
            <p className="text-lg text-[#0D2040] leading-relaxed">{detail?.painPoint}</p>
          </div>

          <div className="rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-[#0082CA] mb-4">
                How we help
              </div>
              <ul className="space-y-3.5 mb-6">
                {detail?.solutions.map((sol) => (
                  <li key={sol} className="flex items-start gap-2.5 text-base text-[#0D2040]">
                    <CheckCircle2 className="w-5 h-5 text-[#0082CA] shrink-0 mt-0.5" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/industries/${ind.slug}`}
              className="text-sm font-bold text-[#0082CA] hover:text-[#F58220] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>{getPlaybookLabel(ind)}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
