import React from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  AlertTriangle,
  Clock,
  EyeOff,
  GitFork,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

const problems = [
  {
    icon: EyeOff,
    title: "Traffic Without Enquiries",
    description:
      "Visitors land on your website or social profile, but leave without filling a form, picking up the phone, or initiating a conversation.",
  },
  {
    icon: Clock,
    title: "Slow Lead Response",
    description:
      "Enquiries sit in email inboxes or unmonitored WhatsApp accounts for hours or days before someone replies, losing the prospect to a faster competitor.",
  },
  {
    icon: HelpCircle,
    title: "Unclear Marketing Measurement",
    description:
      "Money is spent on boosts, campaigns, and posts without transparent attribution connecting spend to actual client acquisition.",
  },
  {
    icon: GitFork,
    title: "Disconnected Tools & Manual Repetition",
    description:
      "Website, ads, spreadsheet leads, and sales follow-ups exist in separate silos, creating redundant admin and lost follow-ups.",
  },
  {
    icon: AlertTriangle,
    title: "Agency Misalignment",
    description:
      "Traditional agencies focus on superficial impressions and vanity metrics rather than qualified pipelines and sales readiness.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="The Reality of Growth"
          title="Getting Attention Is Only the First Step."
          description="Most growing companies don't suffer from a lack of effort—they suffer from friction between marketing, website experience, and lead operations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="p-6 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#F59E0B] border border-amber-200/60 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0D2040] mb-2">
                    {prob.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {prob.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Solution Callout Card matching Brand Card */}
          <div className="p-6 rounded-xl border-2 border-[#F58220] bg-[#0D2040] text-white flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#F58220] text-white flex items-center justify-center mb-4 shadow-xs">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Our Systemic Approach
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We connect the pieces into one practical growth system: high-intent
                traffic, friction-free conversion paths, automated qualification,
                and transparent reporting.
              </p>
            </div>
            <div className="pt-4 text-xs font-bold text-[#F58220] uppercase tracking-wide">
              &bull; Complete Clarity &bull; Measurable ROI
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

