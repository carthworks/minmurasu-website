import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import {
  ArrowRight,
  ArrowUpRight,
  FileCheck2,
  Gauge,
  SearchCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

const auditChecks = [
  { icon: SearchCheck, label: "On-Page & Meta Tags" },
  { icon: Gauge, label: "Speed & Core Web Vitals" },
  { icon: Smartphone, label: "Mobile & Indexability" },
  { icon: FileCheck2, label: "Prioritized Fix Checklist" },
];

export default function SeoAuditSpotlight() {
  return (
    <section
      aria-label="Instant SEO Audit Report Tool"
      className="py-12 lg:py-16 bg-white border-b border-slate-100"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D2040] via-[#122B54] to-[#0A1933] text-white p-7 sm:p-10 lg:p-12 shadow-xl shadow-slate-900/15 border border-slate-800">
          {/* Subtle ambient glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#0082CA]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[#F58220]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Pitch & checks */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-orange-200">
                <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Free Instant Tool &bull; Open SEO</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
                Check your website&apos;s SEO health in seconds —{" "}
                <span className="text-[#F58220]">free instant report.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                Paste your URL into our Open SEO analyzer to uncover broken tags, indexing blockers,
                speed bottlenecks, and quick wins — before you spend a rupee on ads.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {auditChecks.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-semibold text-slate-100"
                  >
                    <Icon className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Attractive action card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white text-[#0D2040] p-6 sm:p-7 shadow-lg border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0082CA]">
                    Instant SEO Audit
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    No signup needed
                  </span>
                </div>

                <p className="text-sm text-[#334155] leading-relaxed">
                  Get an instant technical &amp; on-page SEO scorecard for any page on your site.
                </p>

                <a
                  href={siteConfig.cta.seoAuditTool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white font-bold text-base px-6 py-3.5 shadow-md shadow-orange-950/20 transition-all hover:-translate-y-0.5 group"
                >
                  <span>{siteConfig.cta.seoAuditTool.label}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <Link
                    href={siteConfig.cta.audit.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0082CA] hover:text-[#F58220] transition-colors"
                  >
                    <span>Want a human strategist to review it too?</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
