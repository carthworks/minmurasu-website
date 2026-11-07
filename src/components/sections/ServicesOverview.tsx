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
    <section
      id="services"
      className="py-20 lg:py-28 bg-gradient-to-b from-[#F0F8FF]/70 via-white to-[#F0F8FF]/40 border-b border-slate-100 relative overflow-hidden"
    >
      <Container>
        <SectionHeading
          title="What we do for you"
          description="Seven services that work together — so you're not juggling a designer, an ads person and a developer who never talk to each other."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Compass;
            // The last service (AI automation) is our specialty: a wide card on large screens,
            // which also avoids a lone card in the last row of the 3-column grid.
            const featured = index === siteConfig.services.length - 1;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`relative rounded-2xl p-7 border shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between group overflow-hidden ${
                  featured
                    ? "md:col-span-2 lg:col-span-3 bg-[#0D2040] border-[#0D2040] text-white lg:flex-row lg:items-center lg:gap-10"
                    : "bg-white border-slate-200/90 hover:border-[#0082CA]/50"
                }`}
              >
                {!featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0082CA] to-[#38BDF8] group-hover:from-[#F58220] group-hover:to-[#FB923C] transition-colors" />
                )}

                <div className={featured ? "lg:flex lg:items-center lg:gap-6 lg:flex-1" : ""}>
                  <div className="flex items-center justify-between mb-5 lg:mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        featured
                          ? "bg-[#F58220] text-white"
                          : "bg-[#F0F8FF] text-[#0082CA] border border-[#BAE6FD] group-hover:bg-[#0D2040] group-hover:text-white transition-colors"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {featured && (
                      <span className="lg:hidden text-xs font-bold uppercase tracking-wider text-[#F58220]">
                        Our specialty
                      </span>
                    )}
                  </div>

                  <div>
                    {featured && (
                      <span className="hidden lg:inline-block text-xs font-bold uppercase tracking-wider text-[#F58220] mb-1">
                        Our specialty
                      </span>
                    )}
                    <h3 className={`text-xl font-extrabold mb-2 ${featured ? "text-white" : "text-[#0D2040] group-hover:text-[#0082CA] transition-colors"}`}>
                      {service.title}
                    </h3>
                    <p className={`text-base font-semibold mb-2 ${featured ? "text-orange-200" : "text-[#0D2040]"}`}>
                      {service.outcome}
                    </p>
                    <p className={`text-[15px] leading-relaxed mb-5 ${featured ? "text-slate-300" : "text-[#334155]"}`}>
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors shrink-0 ${
                    featured ? "text-white group-hover:text-[#F58220]" : "text-[#0082CA] group-hover:text-[#F58220]"
                  }`}
                >
                  <span>See what&apos;s included</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footnote on media spend */}
        <div className="mt-10 p-4 rounded-xl bg-white/90 border border-slate-200/90 shadow-2xs text-sm text-[#334155] text-center max-w-2xl mx-auto">
          <strong className="text-[#0D2040]">No hidden costs:</strong> you pay Google and Meta directly for
          your ad budget, and any software or WhatsApp fees are passed on at cost — no markup.
        </div>
      </Container>
    </section>
  );
}

