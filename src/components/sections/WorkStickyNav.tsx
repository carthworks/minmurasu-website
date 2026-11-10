"use client";

import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import { Wrench, Globe, Compass } from "lucide-react";

interface WorkNavSection {
  id: string;
  label: string;
  count: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: WorkNavSection[] = [
  {
    id: "carthworks-products",
    label: "Proprietary Web Tools",
    count: "5 Products",
    icon: Wrench,
  },
  {
    id: "web-platforms",
    label: "Web Platforms & Stores",
    count: "7 Builds",
    icon: Globe,
  },
  {
    id: "growth-blueprints",
    label: "Solution Blueprints",
    count: "3 Sectors",
    icon: Compass,
  },
];

export default function WorkStickyNav() {
  const [activeId, setActiveId] = useState<string>("carthworks-products");
  const [headerHeight, setHeaderHeight] = useState<number>(68);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Measure header height dynamically
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

  // Monitor scroll position for sticky state & scrollspy active tab
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsFixed(rect.top <= headerHeight);
      }

      const navTotalOffset = headerHeight + 60;
      let currentId = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navTotalOffset + 50) {
            currentId = section.id;
          }
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
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

      setActiveId(id);
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div ref={containerRef} className="relative my-8">
      {/* Spacer to prevent layout jumps when fixed */}
      {isFixed && <div className="h-[52px] w-full" aria-hidden="true" />}

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
            <div className="text-[11px] font-bold text-[#0D2040] uppercase tracking-wider hidden md:flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0082CA] animate-pulse" />
              <span>Jump to Section:</span>
            </div>

            <div
              ref={pillsRef}
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full md:w-auto scroll-smooth"
            >
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeId === section.id;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleJump(e, section.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
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
                    <span>{section.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {section.count}
                    </span>
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

