"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "What types of businesses do you work with?",
    a: "We work primarily with established SMEs, healthcare providers and clinics, real estate firms, educational institutions, and industrial manufacturers in Coimbatore, Chennai, Bengaluru, and across India who need a predictable digital acquisition system.",
  },
  {
    q: "Do you work with businesses outside Coimbatore?",
    a: "Yes. While our headquarters are in Coimbatore and we frequently meet regional clients in person across Western Tamil Nadu, Chennai, and Bengaluru, we manage digital growth and automation engagements remotely across India using modern collaboration and reporting tools.",
  },
  {
    q: "Can you build our website and manage its marketing?",
    a: "Yes. Having marketing and engineering under one roof is our core advantage. We engineer websites specifically designed for conversion, technical SEO speed, and analytics tracking, ensuring seamless alignment with your ad campaigns and automation.",
  },
  {
    q: "Is advertising media spend included in your agency fee?",
    a: "No. Advertising media spend (Google Ads, Meta Ads) is billed directly by the ad platforms to your company card or account. This ensures you maintain 100% financial transparency and complete ownership of your ad assets. Our fee covers strategy, creative production, campaign management, and optimization.",
  },
  {
    q: "How soon can we expect to see measurable progress?",
    a: "Timeline depends on channel and market maturity. Paid search and social campaigns can generate qualified enquiries within weeks of launch. Organic SEO and Generative Engine Optimisation (GEO) typically take 3 to 6 months to establish durable authority. We provide realistic milestones during the audit phase.",
  },
  {
    q: "Do you provide monthly reporting and reviews?",
    a: "Yes. Every client receives continuous dashboard access (Looker Studio / GA4) and a scheduled monthly performance review. We focus on business metrics: cost per qualified enquiry, channel efficiency, and pipeline velocity, rather than confusing vanity charts.",
  },
  {
    q: "Can you connect website enquiries to our existing CRM?",
    a: "Yes. We integrate form submissions and chat interactions with leading platforms such as HubSpot, Zoho CRM, LeadSquared, Salesforce, or custom webhooks and Google Sheets workflows.",
  },
  {
    q: "Do you build AI chatbots and WhatsApp automation?",
    a: "Yes. We design practical conversational assistants that answer verified company facts, pre-qualify prospects, and trigger instant WhatsApp or email alerts for your human sales team. We strictly adhere to Meta's WhatsApp Business API policies.",
  },
  {
    q: "What do you need from us to get started?",
    a: "We begin with a 30-minute discovery consultation to understand your commercial objectives, current customer acquisition challenges, and technical setup. Once scope is defined, we initiate a thorough digital audit before executing campaigns.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Clear Answers"
          title="Frequently Asked Questions"
          description="Transparent, straightforward expectations about our scope, commercial terms, and how we collaborate."
        />

        <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q} className="py-4">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left py-2 focus:outline-hidden focus-visible:text-[#0E7490] group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-[#14243A] group-hover:text-[#0E7490] transition-colors pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0E7490]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pt-2 pb-3 text-sm text-[#475569] leading-relaxed animate-in fade-in-50 duration-150">
                    {faq.a}
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

