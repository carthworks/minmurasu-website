import React from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Search,
  Target,
  Send,
  Cpu,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "Digital Marketing",
    icon: Search,
    title: "Organic & AI Discovery",
    summary:
      "Targeted SEO, Generative AI Engine presence (ChatGPT, Perplexity, Gemini), and strategic content marketing driving relevant decision-makers.",
  },
  {
    number: "02",
    phase: "Lead Generation",
    icon: Target,
    title: "High-Intent Advertising",
    summary:
      "Precision Google Search and Meta Ads campaigns designed to reach buyers actively looking for your products or medical services.",
  },
  {
    number: "03",
    phase: "Conversion & Sales",
    icon: Send,
    title: "High-Speed Web Experience",
    summary:
      "Modern Next.js web architecture, frictionless appointment forms, and one-click WhatsApp routes that turn traffic into sales conversations.",
  },
  {
    number: "04",
    phase: "AI Automation",
    icon: Cpu,
    title: "Automated Qualification",
    summary:
      "Intelligent chatbot responses, automated WhatsApp follow-ups, and CRM synchronization that ensure no enquiry goes cold.",
  },
  {
    number: "05",
    phase: "Business Growth",
    icon: TrendingUp,
    title: "Measurable Revenue Pipeline",
    summary:
      "Transparent reporting via GA4 and Looker Studio tracking true cost-per-lead, pipeline status, and continuous campaign ROI.",
  },
];

export default function GrowthSystem() {
  return (
    <section id="approach" className="py-20 lg:py-28 bg-[#0D2040] text-white relative overflow-hidden">
      {/* Background flowing wave contours from business card */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M-100 350 C 400 200, 800 500, 1540 250" stroke="#0082CA" strokeWidth="3" />
        <path d="M-100 380 C 400 230, 800 530, 1540 280" stroke="#0082CA" strokeWidth="3" />
        <path d="M-100 410 C 400 260, 800 560, 1540 310" stroke="#0082CA" strokeWidth="3" />
        <path d="M-100 440 C 400 290, 800 590, 1540 340" stroke="#0082CA" strokeWidth="3" />
      </svg>

      <Container className="relative z-10">
        <SectionHeading
          dark
          eyebrow="The 5-Stage Architecture"
          title="DIGITAL GROWTH. REAL BUSINESS OUTCOMES."
          description="Marketing, technology, and operations working in unison. A disciplined pipeline from initial search query to closed business."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between relative hover:border-[#F58220]/50 hover:bg-slate-800 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#F58220] bg-orange-950/60 border border-orange-500/30 px-2 py-0.5 rounded">
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-[#0082CA] group-hover:text-[#F58220] transition-colors" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] mb-1">
                    {step.phase}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.summary}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-500">
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Realistic disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 max-w-3xl mx-auto text-center text-xs text-slate-400">
          <span className="text-slate-300 font-medium">Important note:</span>{" "}
          Automation and marketing enhance your pipeline, but they do not replace a solid business offer,
          ethical service delivery, or prompt human sales engagement. We build the infrastructure; your team
          delivers the excellence.
        </div>
      </Container>
    </section>
  );
}
