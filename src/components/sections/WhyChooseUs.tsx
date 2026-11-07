import React from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Layers,
  Cpu,
  BarChart,
  Scale,
  Users,
  LineChart,
} from "lucide-react";

const reasons = [
  {
    icon: Layers,
    title: "Marketing & Technology Under One Roof",
    description:
      "No finger-pointing between your marketing agency and web developers. We design the campaigns, code the web systems, and maintain the tracking.",
  },
  {
    icon: Cpu,
    title: "Practical Automation, Not AI Decoration",
    description:
      "We implement automation that saves real hours: CRM syncing, WhatsApp alerts, lead validation, and automated reporting—not trendy, unhelpful chatbots.",
  },
  {
    icon: BarChart,
    title: "Transparent, Auditable Tracking",
    description:
      "Full ownership of your GA4, Google Ads, and Meta accounts. You see the raw data, exact ad spend, and cost per qualified lead.",
  },
  {
    icon: Scale,
    title: "Solutions Sized to Your Stage",
    description:
      "Whether you are a regional clinic expanding appointments or an industrial SME needing global RFQs, our scope aligns with your budget and sales capacity.",
  },
  {
    icon: Users,
    title: "Direct Access to Specialists",
    description:
      "Communicate directly with the strategists and engineers executing your work—not layers of non-technical account coordinators.",
  },
  {
    icon: LineChart,
    title: "Evidence-Based Iteration",
    description:
      "We treat growth as an engineering discipline: analyze data, isolate bottlenecks, test hypotheses, and continuously improve conversion rates.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-100">
      <Container>
        <SectionHeading
          title="Why businesses choose us"
          description="No vanity metrics, no 10x promises — just honest work you can measure."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#F58220]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0D2040] mb-2.5">
                  {reason.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

