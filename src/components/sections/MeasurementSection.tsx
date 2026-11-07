import React from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  BarChart4,
  CheckCircle,
  Eye,
  LineChart,
  ShieldCheck,
  Target,
} from "lucide-react";

const metrics = [
  {
    title: "Qualified Pipeline & Leads",
    desc: "Actual verified enquiries with valid phone numbers, emails, and project requirements—not raw form submissions or spam.",
    icon: Target,
  },
  {
    title: "Cost Per Acquisition (CPA)",
    desc: "Transparent calculation of ad spend divided by qualified leads, giving your financial team predictable unit economics.",
    icon: BarChart4,
  },
  {
    title: "Organic & AI Search Visibility",
    desc: "Keyword rankings on Google alongside brand presence and citations across generative AI engines (ChatGPT, Gemini, Perplexity).",
    icon: Eye,
  },
  {
    title: "Where You Lose Customers",
    desc: "Funnel diagnostics showing where prospects exit, form drop-offs, and page load speed impacts on user intent.",
    icon: LineChart,
  },
];

const toolLogos = [
  "Google Analytics 4 (GA4)",
  "Google Tag Manager",
  "Google Search Console",
  "Meta Ads Manager",
  "Looker Studio",
  "HubSpot & Zoho CRM Webhooks",
];

export default function MeasurementSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F0F8FF]/50 border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Data Transparency"
          title="Know What Is Working. Know What to Improve."
          description="Marketing without measurement is gambling. We connect tracking from the initial ad click to final CRM status."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0D2040] mb-1.5">
                    {m.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stack Integration Strip */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-[#0082CA]" />
            <span>Supported Measurement &amp; Data Stack:</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {toolLogos.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
              >
                <CheckCircle className="w-3.5 h-3.5 text-[#0082CA]" />
                {tool}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            * Note: Dashboards and tracking tools provide visibility, but accurate attribution relies on consistent
            sales qualification and disciplined data entry by your internal team. We assist in setting up both.
          </p>
        </div>
      </Container>
    </section>
  );
}

