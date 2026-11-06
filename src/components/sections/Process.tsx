import React from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const stages = [
  {
    step: "Stage 01",
    title: "Discover",
    description:
      "We interview key stakeholders to understand your commercial goals, margin profile, ideal target customer, competitive landscape, and sales constraints.",
  },
  {
    step: "Stage 02",
    title: "Audit",
    description:
      "We audit your website performance, technical SEO, Generative AI visibility, current paid ad spend, tracking integrity, and response speeds.",
  },
  {
    step: "Stage 03",
    title: "Plan",
    description:
      "We build a pragmatic, phased roadmap defining explicit deliverables, budget allocations, technical integrations, and measurable success KPIs.",
  },
  {
    step: "Stage 04",
    title: "Execute",
    description:
      "Our team deploys campaigns, codes websites, sets up CRM webhooks, programs AI workflows, and tests lead capture end-to-end.",
  },
  {
    step: "Stage 05",
    title: "Report & Optimise",
    description:
      "Regular transparent review sessions analyzing cost per lead, channel attribution, conversion bottlenecks, and prioritizing iterative improvements.",
  },
];

export default function Process() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Structured Execution"
          title="Our 5-Stage Engagement Methodology"
          description="Clear milestones, defined deliverables, and transparent communication from Day One."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {stages.map((stg) => (
            <div
              key={stg.step}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#F58220] bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-md inline-block mb-4">
                  {stg.step}
                </span>
                <h3 className="text-lg font-bold text-[#0D2040] mb-3">
                  {stg.title}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {stg.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

