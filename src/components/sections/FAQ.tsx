"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getFaqSchema } from "@/lib/site-config";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "Mostly small and growing businesses: clinics and healthcare providers, real estate developers, schools and training institutes, manufacturers, and local shops and services — in Coimbatore, Chennai, Bengaluru and across India.",
  },
  {
    question: "Do you work with businesses outside Coimbatore?",
    answer:
      "Yes. We're based in Coimbatore and happy to meet in person around Western Tamil Nadu, but most of our work happens online — so we work with clients anywhere in India and abroad over video calls and WhatsApp.",
  },
  {
    question: "Can you build our website and manage its marketing?",
    answer:
      "Yes — that's our main advantage. The same team builds your website and runs your marketing, so the site is fast, easy to find on Google, and set up to turn visitors into enquiries from day one.",
  },
  {
    question: "Is advertising media spend included in your agency fee?",
    answer:
      "No. You pay Google and Meta directly from your own card or account, so you always see exactly what was spent and the ad accounts stay yours. Our fee covers planning, creatives, running the campaigns and improving them.",
  },
  {
    question: "How soon can we expect to see measurable progress?",
    answer:
      "Ads on Google and Meta can bring enquiries within a few weeks of launch. Ranking on Google search and appearing in AI answers (SEO and GEO) usually takes 3 to 6 months. We'll give you realistic milestones for your business after the free audit.",
  },
  {
    question: "Do you provide monthly reporting and reviews?",
    answer:
      "Yes. You get a live dashboard you can check anytime, plus a monthly review call. We report the numbers that matter — how many enquiries came in, what each one cost, and which channels brought customers — not confusing charts.",
  },
  {
    question: "Can you connect website enquiries to our existing CRM?",
    answer:
      "Yes. Website forms and chats can flow straight into HubSpot, Zoho CRM, LeadSquared, Salesforce or a simple Google Sheet — no copy-pasting.",
  },
  {
    question: "Do you build AI chatbots and WhatsApp automation?",
    answer:
      "Yes. We set up assistants that answer common questions instantly, ask the right questions to qualify a lead, and alert your team on WhatsApp or email — while your staff stay in control. Everything follows WhatsApp's official business rules.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "Just your website (or social page) and a few minutes. Start with the free digital audit, or book a 30-minute call — we'll understand your goals, show you what we found, and suggest a plan. No obligation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqSchema = getFaqSchema(faqs);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <SectionHeading
          title="Questions people ask us"
          description="Straight answers about how we work, costs, and timelines."
        />

        <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left py-2 focus:outline-hidden focus-visible:text-[#0082CA] group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-[#0D2040] group-hover:text-[#0082CA] transition-colors pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0082CA]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pt-2 pb-3 text-base text-[#334155] leading-relaxed animate-in fade-in-50 duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

