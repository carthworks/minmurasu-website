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
    title: "Visitors, but no enquiries",
    description:
      "People find your website or Instagram, look around, and leave without calling, messaging or filling a form.",
  },
  {
    icon: Clock,
    title: "Slow replies lose customers",
    description:
      "Enquiries wait hours or days in an inbox or WhatsApp. By the time you reply, they have already called a competitor.",
  },
  {
    icon: HelpCircle,
    title: "No idea what's working",
    description:
      "You spend on boosts, ads and posts, but can't tell which of them actually brought in paying customers.",
  },
  {
    icon: GitFork,
    title: "Leads scattered everywhere",
    description:
      "Website forms, ads, spreadsheets and WhatsApp all live in different places, so follow-ups get missed.",
  },
  {
    icon: AlertTriangle,
    title: "Reports full of likes, not sales",
    description:
      "Many agencies report reach and impressions. You need to know how many real enquiries and customers you got.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          title="Getting attention is only the first step."
          description="Most businesses aren't short of effort. They lose customers in the gaps between marketing, the website, and follow-up. Sound familiar?"
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
                  <h3 className="text-lg font-bold text-[#0D2040] mb-2">
                    {prob.title}
                  </h3>
                  <p className="text-[15px] text-[#334155] leading-relaxed">
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
              <h3 className="text-lg font-bold text-white mb-2">
                How we fix it
              </h3>
              <p className="text-[15px] text-slate-200 leading-relaxed">
                We connect everything into one simple system: the right visitors,
                a website that turns them into enquiries, instant replies, and a
                monthly report in plain numbers.
              </p>
            </div>
            <div className="pt-4 text-sm font-bold text-[#F58220] uppercase tracking-wide">
              More enquiries &bull; Faster replies &bull; Clear numbers
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

