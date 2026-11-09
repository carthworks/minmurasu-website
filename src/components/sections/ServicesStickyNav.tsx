"use client";

import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import {
  Compass,
  Search,
  Bot,
  Share2,
  TrendingUp,
  Code2,
  Cpu,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "digital-strategy": Compass,
  "seo-local-seo": Search,
  "generative-engine-optimisation": Bot,
  "social-media-content": Share2,
  "google-meta-ads": TrendingUp,
  "website-landing-pages": Code2,
  "ai-business-automation": Cpu,
};

const shortTitles: Record<string, string> = {
  "digital-strategy": "Strategy",
  "seo-local-seo": "SEO & Local Search",
  "generative-engine-optimisation": "GEO (AI Search)",
  "social-media-content": "Social & Content",
  "google-meta-ads": "Google & Meta Ads",
  "website-landing-pages": "Web & Landing Pages",
  "ai-business-automation": "AI Automation",
};

interface ServiceItem {
  slug: string;
  title: string;
}

export default function ServicesStickyNav({
  services,
}: {
  services: ServiceItem[];
}) {
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug || "");
  const [headerHeight, setHeaderHeight] = useState<number>(68);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Dynamically measure header height across screen resizes and scroll states
  useEffect(() => {
    const measureHeader = () => {
      const headerEl = document.querySelector("header");
      if (headerEl) {
        setHeaderHeight(headerEl.offsetHeight);
      }
    };

    measureHeader();
    window.addEventListener("resize", measureHeader);
    return () => window.removeEventListener("resize", measureHeader);
  }, []);

  // Monitor scroll to fix the bar and update active ScrollSpy tab
  useEffect(() => {
    const handleScroll = () => {
      // Determine if the bar should be fixed
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // When the container reaches the header, lock it into fixed position
        setIsFixed(rect.top <= headerHeight);
      }

      // ScrollSpy: identify which service card is currently in view
      const navTotalOffset = headerHeight + 60;
      let currentSlug = services[0]?.slug || "";

      for (const service of services) {
        const el = document.getElementById(service.slug);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navTotalOffset + 50) {
            currentSlug = service.slug;
          }
        }
      }

      setActiveSlug(currentSlug);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [services, headerHeight]);

  // Keep the active pill in view inside the horizontal scroll area on mobile
  useEffect(() => {
    if (!pillsRef.current || !activeSlug) return;
    const activeEl = pillsRef.current.querySelector<HTMLElement>(
      `[data-slug="${activeSlug}"]`
    );
    if (activeEl) {
      const container = pillsRef.current;
      const scrollLeftTarget =
        activeEl.offsetLeft -
        container.offsetWidth / 2 +
        activeEl.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeftTarget), behavior: "smooth" });
    }
  }, [activeSlug]);

  const handleJump = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (el) {
      const navBarHeight = 52;
      const targetTop =
        el.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        navBarHeight -
        16;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });

      setActiveSlug(slug);
      window.history.replaceState(null, "", `#${slug}`);
    }
  };

  return (
    <div ref={containerRef} className="relative my-8">
      {/* Invisible placeholder when fixed to prevent layout shift */}
      {isFixed && <div className="h-[52px] w-full" aria-hidden="true" />}

      {/* The Navigation Bar: docks smoothly as fixed under the header */}
      <div
        style={isFixed ? { top: `${headerHeight}px` } : undefined}
        className={`w-full transition-shadow duration-200 ${
          isFixed
            ? "fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-y border-slate-200/90 shadow-md py-2"
            : "relative bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-2xs py-2"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between gap-4">
            <div className="text-[11px] font-bold text-[#0D2040] uppercase tracking-wider hidden lg:flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0082CA] animate-pulse" />
              <span>Jump to Service:</span>
            </div>

            {/* Horizontal scrollable pills */}
            <div
              ref={pillsRef}
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full lg:w-auto scroll-smooth"
            >
              {services.map((service) => {
                const Icon = iconMap[service.slug] || Compass;
                const isActive = activeSlug === service.slug;
                const label = shortTitles[service.slug] || service.title;

                return (
                  <a
                    key={service.slug}
                    data-slug={service.slug}
                    href={`#${service.slug}`}
                    onClick={(e) => handleJump(e, service.slug)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[#0D2040] text-white shadow-xs scale-102 ring-2 ring-[#0082CA]/40"
                        : "bg-slate-100/90 text-[#334155] hover:bg-[#F0F8FF] hover:text-[#0082CA] hover:border-[#BAE6FD] border border-slate-200/60"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive ? "text-[#F58220]" : "text-slate-500"
                      }`}
                    />
                    <span>{label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
