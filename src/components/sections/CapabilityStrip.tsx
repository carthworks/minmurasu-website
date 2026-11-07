import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import { Compass, Search, Bot, Share2, TrendingUp, Code2, Cpu } from "lucide-react";

const iconMap = { Compass, Search, Bot, Share2, TrendingUp, Code2, Cpu };

/** Service names come from siteConfig so they match the services section and menus exactly. */
export default function CapabilityStrip() {
  return (
    <section aria-label="Our services" className="bg-white border-b border-slate-200/80 py-5">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {siteConfig.services.map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap] || Compass;
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0D2040] hover:text-[#0082CA] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#0082CA]" />
                  <span>{s.shortTitle}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
