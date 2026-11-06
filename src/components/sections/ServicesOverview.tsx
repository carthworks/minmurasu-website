import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import {
  Compass,
  Search,
  Bot,
  Share2,
  TrendingUp,
  Code2,
  Cpu,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  Compass,
  Search,
  Bot,
  Share2,
  TrendingUp,
  Code2,
  Cpu,
};

export default function ServicesOverview() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F0F9FF]/40 border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Our Capabilities"
          title="Engineered for Measurable Pipeline, Not Fluff."
          description="We do not offer disjointed tasks. We deploy integrated services that attract high-intent prospects, qualify enquiries, and support your revenue teams."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Compass;
            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#0082CA]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F0F8FF] text-[#0082CA] border border-[#BAE6FD] flex items-center justify-center mb-6 group-hover:bg-[#0082CA] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-400 mb-1">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#0D2040] mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-[#0082CA] hover:text-[#F58220] inline-flex items-center gap-1.5 transition-colors group-hover:underline"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Deliverable-based
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote on media spend */}
        <div className="mt-10 p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 text-center max-w-2xl mx-auto">
          <strong>Commercial transparency:</strong> Media advertising budget (Google &amp; Meta)
          is paid directly by the client to the advertising platforms. Third-party software
          and WhatsApp messaging tier fees are billed transparently at cost.
        </div>
      </Container>
    </section>
  );
}

