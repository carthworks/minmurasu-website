import React from "react";
import Container from "@/components/ui/Container";
import {
  Compass,
  Search,
  TrendingUp,
  Code2,
  BarChart2,
  Cpu,
} from "lucide-react";

const capabilities = [
  { label: "Digital Strategy", icon: Compass },
  { label: "SEO & Content", icon: Search },
  { label: "Performance Marketing", icon: TrendingUp },
  { label: "Web Development", icon: Code2 },
  { label: "Analytics & CRO", icon: BarChart2 },
  { label: "AI Automation", icon: Cpu },
];

export default function CapabilityStrip() {
  return (
    <section className="bg-slate-50 border-b border-slate-200/80 py-7">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">
            Core Agency Disciplines:
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.label}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#14243A] hover:text-[#0E7490] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#0E7490]" />
                  <span>{cap.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

