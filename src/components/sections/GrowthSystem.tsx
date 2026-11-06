import React from "react";
import Container from "@/components/ui/Container";
import {
  Search,
  Target,
  Send,
  Cpu,
  TrendingUp,
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
      "Precision Google Search and Meta Ads campaigns designed to reach buyers actively looking for your products or services.",
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
    <section
      id="approach"
      className="py-20 lg:py-28 bg-[#0A1931] text-white relative overflow-hidden scroll-mt-24"
    >
      {/* Top-left and bottom-right orange diagonal corner accents matching business card */}
      <div
        className="hidden sm:block absolute top-0 left-0 w-24 h-16 bg-[#F58220] pointer-events-none z-10"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        aria-hidden="true"
      />
      <div
        className="hidden sm:block absolute bottom-0 right-0 w-28 h-18 bg-[#F58220] pointer-events-none z-10"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />

      {/* Left & Right Concentric Cyan Wave Contours from Business Card Back */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Left sweeping arc bundle */}
        <path d="M-80 420 C 260 440, 460 260, 520 60" stroke="#0082CA" strokeWidth="1.5" />
        <path d="M-80 445 C 280 465, 485 280, 545 60" stroke="#0082CA" strokeWidth="1.5" />
        <path d="M-80 470 C 300 490, 510 300, 570 60" stroke="#0082CA" strokeWidth="1.5" />
        <path d="M-80 495 C 320 515, 535 320, 595 60" stroke="#0082CA" strokeWidth="1.5" />
        <path d="M-80 520 C 340 540, 560 340, 620 60" stroke="#0082CA" strokeWidth="1.5" />

        {/* Right sweeping arc bundle */}
        <path d="M900 640 C 960 400, 1180 250, 1520 270" stroke="#0082CA" strokeWidth="1.5" />
        <path d="M925 640 C 985 420, 1200 275, 1520 295" stroke="#0082CA" strokeWidth="1.5" />
        <path d="M950 640 C 1010 440, 1220 300, 1520 320" stroke="#0082CA" strokeWidth="1.5" />
        <path d="M975 640 C 1035 460, 1240 325, 1520 345" stroke="#0082CA" strokeWidth="1.5" />
        <path d="M1000 640 C 1060 480, 1260 350, 1520 370" stroke="#0082CA" strokeWidth="1.5" />
      </svg>

      <Container className="relative z-20">
        {/* Header styled after Business Card Back */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-widest text-[#38BDF8] mb-4">
            The 5-Stage Growth Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide text-white uppercase">
            DIGITAL GROWTH. REAL BUSINESS OUTCOMES.
          </h2>
          {/* Signature orange underline rule from business card */}
          <div className="w-48 sm:w-72 h-1 bg-[#F58220] mx-auto mt-4 mb-5 rounded-full" />
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Marketing, technology, and operations working in unison—a disciplined
            pipeline from initial search query to closed revenue.
          </p>
        </div>

        {/* 5-Stage Business Card Pillars with vertical dividers on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 lg:divide-x divide-slate-700/70 bg-[#0D2040]/90 backdrop-blur-xs border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-7 lg:p-6 xl:p-8 flex flex-col justify-between hover:bg-white/[0.03] transition-colors group text-center lg:text-center"
              >
                <div>
                  {/* Large Orange Number 01 - 05 matching card */}
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F58220] tracking-tight mb-3">
                    {step.number}
                  </div>

                  {/* Primary Stage Label */}
                  <h3 className="text-lg font-bold text-white leading-snug mb-3">
                    {step.phase}
                  </h3>

                  <div className="w-8 h-0.5 bg-[#0082CA]/60 mx-auto mb-4 group-hover:w-14 group-hover:bg-[#F58220] transition-all" />

                  {/* Subtitle & Description */}
                  <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#38BDF8] mb-2">
                    <Icon className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>{step.title}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Signature MIN MURASU Footer Lockup from Business Card Back */}
        <div className="mt-14 text-center">
          <div className="flex items-center justify-center gap-6 max-w-xl mx-auto mb-2">
            <div className="h-px flex-1 bg-slate-600/80" />
            <span className="text-xl sm:text-2xl font-black tracking-[0.14em] text-white uppercase">
              MIN MURASU
            </span>
            <div className="h-px flex-1 bg-slate-600/80" />
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
            Turn Digital Attention Into Business Growth
          </p>
        </div>

        {/* Realistic operational note */}
        <div className="mt-10 p-4 rounded-xl bg-slate-900/60 border border-slate-800 max-w-3xl mx-auto text-center text-xs text-slate-400">
          <span className="text-slate-200 font-semibold">Operational commitment:</span>{" "}
          Automation and marketing accelerate your pipeline, while your team delivers the core service excellence. We build and maintain the growth engine; you close with confidence.
        </div>
      </Container>
    </section>
  );
}

