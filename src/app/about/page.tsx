import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import {
  MapPin,
  CheckCircle2,
  Cpu,
  Layers,
  LineChart,
  ShieldCheck,
  Building,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Our Story & Philosophy",
  description:
    "Learn about MIN MURASU, an engineering-driven digital growth and AI automation agency headquartered in Coimbatore, Tamil Nadu.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Defensible Truth",
    desc: "We report unmanipulated metrics. If a campaign or channel underperforms, we communicate the data honestly and refine the approach.",
  },
  {
    icon: Layers,
    title: "Systemic Integration",
    desc: "Marketing, website architecture, and sales automation cannot live in isolation. We connect all three into one coherent revenue engine.",
  },
  {
    icon: Cpu,
    title: "Practical Technology",
    desc: "We deploy automation that eliminates real operational friction and speeds up lead response—never AI as a superficial gimmick.",
  },
  {
    icon: LineChart,
    title: "Commercial Rigor",
    desc: "Our measure of success is not vanity impressions, likes, or empty traffic spikes. We optimize for verified enquiries and qualified pipeline.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Hero Section */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-6">
            <Logo variant="full" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight mb-4 leading-tight">
            The Digital Voice That Makes Your Brand Heard.
          </h1>
          <div className="w-20 h-1.5 bg-[#F58220] rounded-full mb-6" />
          <p className="text-lg text-[#0082CA] font-bold mb-4">
            DIGITAL GROWTH. REAL BUSINESS OUTCOMES.
          </p>
          <p className="text-base text-[#475569] leading-relaxed">
            Headquartered in Coimbatore, Tamil Nadu, and founded by <strong>Karthikeyan T</strong>,
            MIN MURASU takes its name from the historic Tamil announcement drum (&ldquo;Murasu&rdquo; / முரசு)
            fused with modern digital intelligence (&ldquo;Min&rdquo; / மின்). We cut through market noise with
            disciplined digital marketing, modern Next.js web systems, and practical AI automation.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 pb-20 border-b border-slate-200">
          <div className="lg:col-span-7 space-y-5 text-sm text-[#475569] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#0D2040]">
              Bridging the Gap Between Marketing &amp; Technical Execution
            </h2>
            <p>
              Traditional marketing agencies often lack the software engineering expertise required for modern web performance,
              server-side conversion tracking, and API automation. Software houses, conversely, rarely understand customer psychology,
              SEO copywriting, or paid acquisition dynamics.
            </p>
            <p>
              MIN MURASU unifies these disciplines under one roof. Our engineers and growth strategists work collaboratively
              to build fast, conversion-optimized Next.js web applications, target high-intent search queries, and automate CRM workflows.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#0082CA] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0D2040] block">Rooted in Coimbatore</strong>
                  <span className="text-xs text-slate-500">
                    Proudly serving local industrial SMEs, regional clinics, and growing businesses across South India.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Building className="w-5 h-5 text-[#0082CA] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0D2040] block">Serving Nationwide</strong>
                  <span className="text-xs text-slate-500">
                    Executing high-intent digital acquisition in Chennai, Bengaluru, and across India.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0D2040] rounded-3xl p-8 text-white space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Our Operating Manifesto</span>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>No fabricated statistics, false case studies, or vanity metrics.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>Client owns 100% of their ad accounts, domains, and data assets.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>Every campaign and web application is built for measurable conversion.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>Automation is deployed to support human sales, never to replace accountability.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <SectionHeading
            eyebrow="Operating Principles"
            title="The Values That Guide Every Client Engagement"
            description="Our standards dictate how we consult, engineer, and report."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0082CA] flex items-center justify-center mb-4 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#0D2040] mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#F0F8FF] border border-[#BAE6FD] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D2040] mb-3">
            Interested in Partnering With Us?
          </h2>
          <p className="text-sm text-[#475569] mb-6 max-w-xl mx-auto">
            Schedule a conversation with our leadership to explore how we can support your business goals.
          </p>
          <Button href="/contact" variant="teal" size="md">
            Schedule a Discovery Call
          </Button>
        </div>
      </Container>
    </div>
  );
}

