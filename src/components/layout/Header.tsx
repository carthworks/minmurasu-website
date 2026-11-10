"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import {
  ProtectedEmail,
  ProtectedPhone,
  ProtectedWhatsApp,
} from "@/components/ui/ProtectedContact";
import {
  Menu,
  X,
  Phone,
  MessageSquare,
  Calculator,
  ChevronDown,
  ArrowRight,
  Search,
  Target,
  Laptop,
  Cpu,
  Sparkles,
  Share2,
  Building2,
  Factory,
  Stethoscope,
  GraduationCap,
  Store,
  Compass,
  FileText,
  Users,
} from "lucide-react";
import { feedback } from "@/lib/vibe-feedback";

/* ------------------------------------------------------------------ */
/* Sub-Menu Navigation Data                                           */
/* ------------------------------------------------------------------ */

interface SubMenuItem {
  href: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  badge?: string;
  iconColor?: string;
}

const serviceMenuItems: SubMenuItem[] = [
  {
    href: "/services/seo-local-seo",
    title: "SEO & Local Search",
    shortDesc: "Rank #1 on Google for commercial buyer searches",
    icon: Search,
    iconColor: "text-[#0082CA] bg-sky-50",
  },
  {
    href: "/services/google-meta-ads",
    title: "Google & Meta Ads",
    shortDesc: "High-intent paid acquisition with transparent CPL",
    icon: Target,
    iconColor: "text-[#F58220] bg-orange-50",
  },
  {
    href: "/services/website-landing-pages",
    title: "Next.js Web Engineering",
    shortDesc: "Sub-second, high-converting corporate web assets",
    icon: Laptop,
    iconColor: "text-blue-600 bg-blue-50",
  },
  {
    href: "/services/ai-business-automation",
    title: "AI & WhatsApp Automation",
    shortDesc: "Instant lead qualification and automated CRM follow-up",
    icon: Cpu,
    iconColor: "text-emerald-600 bg-emerald-50",
  },
  {
    href: "/services/generative-engine-optimisation",
    title: "AI Search & GEO",
    shortDesc: "Get cited inside ChatGPT, Perplexity & Gemini",
    icon: Sparkles,
    iconColor: "text-purple-600 bg-purple-50",
  },
  {
    href: "/services/digital-strategy",
    title: "Strategy & Consulting",
    shortDesc: "Targeted positioning, budget allocation & channel roadmaps",
    icon: Compass,
    iconColor: "text-amber-600 bg-amber-50",
  },
  {
    href: "/services/social-media-content",
    title: "Social Authority & Content",
    shortDesc: "B2B thought leadership & executive video reels",
    icon: Share2,
    iconColor: "text-rose-600 bg-rose-50",
  },
];

const industryMenuItems: SubMenuItem[] = [
  {
    href: "/industries/real-estate",
    title: "Real Estate & Builders",
    shortDesc: "High-intent buyer leads & contractor client acquisition",
    icon: Building2,
    badge: "4K Presenter Reel",
    iconColor: "text-[#F58220] bg-orange-50",
  },
  {
    href: "/industries/manufacturing-industrial",
    title: "Manufacturing & SMEs",
    shortDesc: "Domestic & global RFQ pipeline generation",
    icon: Factory,
    iconColor: "text-blue-600 bg-blue-50",
  },
  {
    href: "/industries/healthcare-clinics",
    title: "Healthcare & Clinics",
    shortDesc: "Ethical patient bookings & zero no-show workflows",
    icon: Stethoscope,
    iconColor: "text-emerald-600 bg-emerald-50",
  },
  {
    href: "/industries/education-training",
    title: "Education & Academies",
    shortDesc: "Student admission campaigns & automated nurture",
    icon: GraduationCap,
    iconColor: "text-purple-600 bg-purple-50",
  },
  {
    href: "/industries/retail-services",
    title: "Retail & Local Services",
    shortDesc: "Google Maps dominance & direct footfall generation",
    icon: Store,
    iconColor: "text-amber-600 bg-amber-50",
  },
];

const companyMenuItems: SubMenuItem[] = [
  {
    href: "/about",
    title: "About MIN MURASU",
    shortDesc: "Our philosophy, standards & zero-slop policy",
    icon: Users,
    iconColor: "text-[#0082CA] bg-sky-50",
  },
  {
    href: "/brand",
    title: "Brand Assets & Identity",
    shortDesc: "Official logos, color codes, guidelines & media kit",
    icon: Sparkles,
    iconColor: "text-[#F58220] bg-orange-50",
  },
  {
    href: "/insights",
    title: "Insights & Guides",
    shortDesc: "Real marketing breakdowns, data & frameworks",
    icon: FileText,
    iconColor: "text-emerald-600 bg-emerald-50",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({
    services: false,
    industries: false,
    about: false,
  });

  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset active menu on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mouse enter with instant open & clearing any close timer
  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(menuName);
  };

  // Mouse leave with graceful 180ms buffer to prevent flickering
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (key: string) => {
    feedback.playPop();
    setMobileExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80"
          : "bg-white border-b border-slate-100"
      }`}
    >
      {/* Top micro bar for direct contact channels */}
      <div className="bg-[#0D2040] text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <Container className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              {siteConfig.locations.coverageLine}
            </span>
            <span className="text-slate-600 hidden xl:inline">•</span>
            <Link
              href="/roi-calculator"
              className="hidden xl:inline-flex items-center gap-1.5 text-sky-300 hover:text-white transition-colors text-xs font-semibold"
            >
              <Calculator className="w-3.5 h-3.5 text-[#F58220]" />
              <span>ROI Calculator</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#06B6D4]" />
              <ProtectedPhone
                variant="primary"
                className="hover:text-white transition-colors"
              />
            </span>
            <ProtectedWhatsApp
              message={siteConfig.whatsapp.messages.consultation}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteConfig.cta.whatsapp.label}</span>
            </ProtectedWhatsApp>
            <ProtectedEmail
              variant="primary"
              className="hover:text-white transition-colors"
            />
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <div className="py-3 sm:py-3.5">
        <Container className="flex items-center justify-between">
          {/* Authentic Murasu Drum Logo */}
          <Logo variant="header" href="/" />

          {/* Desktop Nav with Rich Sub-Menus */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {/* 1. Services with Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  pathname.startsWith("/services") || activeDropdown === "services"
                    ? "text-[#0082CA] bg-slate-50 font-bold"
                    : "text-[#334155] hover:text-[#0082CA] hover:bg-slate-50/80"
                }`}
                aria-expanded={activeDropdown === "services"}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180 text-[#0082CA]" : ""
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel for Services */}
              {activeDropdown === "services" && (
                <div
                  className="absolute top-full -left-20 w-[640px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-md p-5 shadow-2xl shadow-slate-900/10">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Our Core Capabilities
                      </span>
                      <Link
                        href="/services"
                        className="text-xs font-bold text-[#0082CA] hover:text-[#006ca8] flex items-center gap-1"
                      >
                        <span>View All Services</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {serviceMenuItems.map((item) => {
                        const IconComp = item.icon;
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`p-2.5 rounded-xl transition-all flex items-start gap-3 group/item ${
                              isCurrent
                                ? "bg-[#F0F8FF] border border-[#BAE6FD]"
                                : "hover:bg-slate-50 border border-transparent hover:border-slate-100"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                item.iconColor || "text-[#0082CA] bg-sky-50"
                              }`}
                            >
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-[#0D2040] group-hover/item:text-[#0082CA] transition-colors block">
                                {item.title}
                              </span>
                              <span className="text-[11px] text-slate-500 line-clamp-1 block mt-0.5">
                                {item.shortDesc}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Bottom Feature Pill in Dropdown */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 -mx-5 -mb-5 p-3.5 px-5 rounded-b-2xl text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calculator className="w-4 h-4 text-[#F58220]" />
                        <span>Curious about cost &amp; pipeline returns?</span>
                      </div>
                      <Link
                        href="/roi-calculator"
                        className="font-bold text-[#F58220] hover:text-[#d96c11] flex items-center gap-1"
                      >
                        <span>Try Growth ROI Calculator</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Industries with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("industries")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/industries"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  pathname.startsWith("/industries") || activeDropdown === "industries"
                    ? "text-[#0082CA] bg-slate-50 font-bold"
                    : "text-[#334155] hover:text-[#0082CA] hover:bg-slate-50/80"
                }`}
                aria-expanded={activeDropdown === "industries"}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    activeDropdown === "industries" ? "rotate-180 text-[#0082CA]" : ""
                  }`}
                />
              </Link>

              {/* Dropdown Panel for Industries */}
              {activeDropdown === "industries" && (
                <div
                  className="absolute top-full -left-10 w-[520px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-md p-5 shadow-2xl shadow-slate-900/10">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Tailored Sector Playbooks
                      </span>
                      <Link
                        href="/industries"
                        className="text-xs font-bold text-[#0082CA] hover:text-[#006ca8] flex items-center gap-1"
                      >
                        <span>All Playbooks</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {industryMenuItems.map((item) => {
                        const IconComp = item.icon;
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`p-2.5 rounded-xl transition-all flex items-center justify-between group/item ${
                              isCurrent
                                ? "bg-[#F0F8FF] border border-[#BAE6FD]"
                                : "hover:bg-slate-50 border border-transparent hover:border-slate-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                  item.iconColor || "text-[#0082CA] bg-sky-50"
                                }`}
                              >
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-[#0D2040] group-hover/item:text-[#0082CA] transition-colors block">
                                  {item.title}
                                </span>
                                <span className="text-[11px] text-slate-500 block">
                                  {item.shortDesc}
                                </span>
                              </div>
                            </div>

                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F58220] to-[#E1306C] text-white">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Direct Link: Our Approach */}
            <Link
              href="/approach"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                pathname === "/approach"
                  ? "text-[#0082CA] bg-slate-50 font-bold"
                  : "text-[#334155] hover:text-[#0082CA] hover:bg-slate-50/80"
              }`}
            >
              Our Approach
            </Link>

            {/* 4. Direct Link: Pricing */}
            <Link
              href="/pricing"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                pathname === "/pricing"
                  ? "text-[#0082CA] bg-slate-50 font-bold"
                  : "text-[#334155] hover:text-[#0082CA] hover:bg-slate-50/80"
              }`}
            >
              Pricing
            </Link>

            {/* 5. Direct Link: Work */}
            <Link
              href="/work"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                pathname === "/work"
                  ? "text-[#0082CA] bg-slate-50 font-bold"
                  : "text-[#334155] hover:text-[#0082CA] hover:bg-slate-50/80"
              }`}
            >
              Work
            </Link>

            {/* 6. Company with Submenu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/about"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  pathname === "/about" || pathname === "/insights" || activeDropdown === "company"
                    ? "text-[#0082CA] bg-slate-50 font-bold"
                    : "text-[#334155] hover:text-[#0082CA] hover:bg-slate-50/80"
                }`}
                aria-expanded={activeDropdown === "company"}
                aria-haspopup="true"
              >
                <span>About</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    activeDropdown === "company" ? "rotate-180 text-[#0082CA]" : ""
                  }`}
                />
              </Link>

              {/* Dropdown Panel for Company */}
              {activeDropdown === "company" && (
                <div
                  className="absolute top-full -left-10 w-[300px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-md p-3 shadow-2xl shadow-slate-900/10 space-y-1">
                    {companyMenuItems.map((item) => {
                      const IconComp = item.icon;
                      const isCurrent = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`p-2.5 rounded-xl transition-all flex items-start gap-3 group/item ${
                            isCurrent
                              ? "bg-[#F0F8FF] border border-[#BAE6FD]"
                              : "hover:bg-slate-50 border border-transparent hover:border-slate-100"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              item.iconColor || "text-[#0082CA] bg-sky-50"
                            }`}
                          >
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#0D2040] group-hover/item:text-[#0082CA] transition-colors block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              {item.shortDesc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 7. Direct Link: Contact */}
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                pathname === "/contact"
                  ? "text-[#0082CA] bg-slate-50 font-bold"
                  : "text-[#334155] hover:text-[#0082CA] hover:bg-slate-50/80"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/roi-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0D2040] hover:text-[#0082CA] hover:bg-slate-50 border border-slate-200 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-[#F58220]" />
              <span className="hidden xl:inline">ROI Calculator</span>
              <span className="xl:hidden">ROI</span>
            </Link>

            <Button
              href={siteConfig.cta.audit.href}
              variant="orange"
              size="sm"
              className="shadow-xs font-bold whitespace-nowrap"
            >
              Free Audit
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-[#0D2040] hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#0082CA]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </Container>
      </div>

      {/* Mobile Drawer Menu with Accordion Sub-Menus */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {/* Mobile: Services Accordion */}
            <div className="border-b border-slate-100 pb-1">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("services")}
                className="w-full flex items-center justify-between text-base font-bold py-2.5 px-3 rounded-lg text-[#0D2040] hover:bg-slate-50 transition-colors"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileExpanded.services ? "rotate-180 text-[#0082CA]" : ""
                  }`}
                />
              </button>

              {mobileExpanded.services && (
                <div className="pl-4 pr-2 py-1.5 space-y-1 bg-slate-50/70 rounded-xl mb-2">
                  <Link
                    href="/services"
                    className="block text-xs font-bold text-[#0082CA] py-1.5 px-2.5 rounded-md hover:bg-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Services Overview →
                  </Link>
                  {serviceMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-xs py-1.5 px-2.5 rounded-md text-slate-700 hover:text-[#0082CA] hover:bg-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: Industries Accordion */}
            <div className="border-b border-slate-100 pb-1">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("industries")}
                className="w-full flex items-center justify-between text-base font-bold py-2.5 px-3 rounded-lg text-[#0D2040] hover:bg-slate-50 transition-colors"
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileExpanded.industries ? "rotate-180 text-[#0082CA]" : ""
                  }`}
                />
              </button>

              {mobileExpanded.industries && (
                <div className="pl-4 pr-2 py-1.5 space-y-1 bg-slate-50/70 rounded-xl mb-2">
                  <Link
                    href="/industries"
                    className="block text-xs font-bold text-[#0082CA] py-1.5 px-2.5 rounded-md hover:bg-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Industry Playbooks →
                  </Link>
                  {industryMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-md text-slate-700 hover:text-[#0082CA] hover:bg-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-[#F58220]">
                          Reel
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: Direct Links */}
            <Link
              href="/approach"
              className="text-base font-medium py-2.5 px-3 rounded-lg text-[#0D2040] hover:bg-slate-50 hover:text-[#0082CA] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Approach
            </Link>

            <Link
              href="/pricing"
              className="text-base font-medium py-2.5 px-3 rounded-lg text-[#0D2040] hover:bg-slate-50 hover:text-[#0082CA] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              href="/work"
              className="text-base font-medium py-2.5 px-3 rounded-lg text-[#0D2040] hover:bg-slate-50 hover:text-[#0082CA] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </Link>

            {/* Mobile: About Accordion */}
            <div className="border-b border-slate-100 pb-1">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("about")}
                className="w-full flex items-center justify-between text-base font-bold py-2.5 px-3 rounded-lg text-[#0D2040] hover:bg-slate-50 transition-colors"
              >
                <span>About</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileExpanded.about ? "rotate-180 text-[#0082CA]" : ""
                  }`}
                />
              </button>

              {mobileExpanded.about && (
                <div className="pl-4 pr-2 py-1.5 space-y-1 bg-slate-50/70 rounded-xl mb-2">
                  <Link
                    href="/about"
                    className="block text-xs py-1.5 px-2.5 rounded-md text-slate-700 hover:text-[#0082CA] hover:bg-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About MIN MURASU
                  </Link>
                  <Link
                    href="/brand"
                    className="block text-xs py-1.5 px-2.5 rounded-md text-slate-700 hover:text-[#0082CA] hover:bg-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Brand Identity &amp; Assets
                  </Link>
                  <Link
                    href="/insights"
                    className="block text-xs py-1.5 px-2.5 rounded-md text-slate-700 hover:text-[#0082CA] hover:bg-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Insights &amp; Guides
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="text-base font-medium py-2.5 px-3 rounded-lg text-[#0D2040] hover:bg-slate-50 hover:text-[#0082CA] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile ROI Calculator Button */}
            <div className="pt-2">
              <Link
                href="/roi-calculator"
                className="text-sm font-bold py-2.5 px-3.5 rounded-xl text-[#0082CA] bg-[#F0F8FF] border border-[#BAE6FD] hover:bg-[#E0F2FE] transition-colors flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#F58220]" />
                  <span>Growth ROI Calculator</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#0082CA] text-white rounded">
                  Interactive
                </span>
              </Link>
            </div>

            {/* Action buttons in mobile drawer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <Button
                href={siteConfig.cta.audit.href}
                variant="orange"
                size="md"
                className="w-full justify-center shadow-xs"
              >
                Free Digital Presence Audit
              </Button>
              <ProtectedWhatsApp
                message={siteConfig.whatsapp.messages.consultation}
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors w-full"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{siteConfig.cta.whatsapp.label}</span>
              </ProtectedWhatsApp>
              <div className="text-xs text-center text-slate-500 pt-1 flex items-center justify-center gap-2">
                <ProtectedPhone variant="primary" />
                <span>&bull;</span>
                <ProtectedEmail variant="primary" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
