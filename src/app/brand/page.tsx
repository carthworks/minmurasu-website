"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo, { LogoMark } from "@/components/ui/Logo";
import { ProtectedWhatsApp } from "@/components/ui/ProtectedContact";
import { siteConfig } from "@/lib/site-config";
import { feedback } from "@/lib/vibe-feedback";
import {
  AlertTriangle,
  Award,
  Check,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Flame,
  Globe,
  MessageSquare,
  Palette,
  Type,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ColorItem {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  darkText?: boolean;
  border?: boolean;
}

const brandColors: ColorItem[] = [
  {
    name: "Deep Navy",
    role: "Primary Brand Foundation & Theme",
    hex: "#0D2040",
    rgb: "13, 32, 64",
    cmyk: "80, 50, 0, 75",
    darkText: false,
  },
  {
    name: "Electric Orange",
    role: "Primary Accent & High-Conversion CTAs",
    hex: "#F58220",
    rgb: "245, 130, 32",
    cmyk: "0, 47, 87, 4",
    darkText: false,
  },
  {
    name: "Process Blue",
    role: "Secondary Brand & Technical Links",
    hex: "#0082CA",
    rgb: "0, 130, 202",
    cmyk: "100, 36, 0, 21",
    darkText: false,
  },
  {
    name: "Pure White",
    role: "Canvas & Surface Elements",
    hex: "#FFFFFF",
    rgb: "255, 255, 255",
    cmyk: "0, 0, 0, 0",
    darkText: true,
    border: true,
  },
  {
    name: "Slate Gray",
    role: "Body Typography & Structural Lines",
    hex: "#475569",
    rgb: "71, 85, 105",
    cmyk: "32, 19, 0, 59",
    darkText: false,
  },
  {
    name: "WhatsApp Green",
    role: "Direct Communication & Real-Time Sync",
    hex: "#25D366",
    rgb: "37, 211, 102",
    cmyk: "82, 0, 52, 17",
    darkText: false,
  },
];

const boilerplates = [
  {
    label: "25-Word Micro Bio (Directories & Social)",
    text: "MIN MURASU (மின் முரசு) is a digital growth partner combining performance marketing, sub-second web engineering, and AI automation to generate qualified commercial business enquiries.",
  },
  {
    label: "50-Word Standard Bio (Podcasts, Articles & Press)",
    text: "MIN MURASU is a Coimbatore-based digital growth firm that installs end-to-end customer acquisition systems for commercial builders, healthcare clinics, and industrial SMEs. By combining targeted SEO, high-intent advertising, custom Next.js web applications, and automated WhatsApp workflows, MIN MURASU turns online attention into verified business revenue.",
  },
  {
    label: "100-Word Comprehensive Overview (Conferences & RFPs)",
    text: "Founded by Karthikeyan T, MIN MURASU (மின் முரசு — The Digital Drum) bridges classical communication authority with high-speed digital architecture. The firm operates on a strict Zero Fabricated Proof policy, delivering measurable commercial outcomes rather than vanity metrics. MIN MURASU specializes in multi-crore contractor lead generation, medical appointment automation, and industrial RFQ pipelines across Coimbatore, Chennai, Bengaluru, and international markets. Core competencies include Google Ads, Meta Ads, Next.js web development, Generative Engine Optimization (GEO), and intelligent WhatsApp CRM synchronization.",
  },
];

export default function BrandPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedBioIndex, setCopiedBioIndex] = useState<number | null>(null);

  const handleCopyColor = (hex: string) => {
    feedback.playPop();
    feedback.triggerHaptic(15);
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleCopyBio = (text: string, index: number) => {
    feedback.playPop();
    feedback.triggerHaptic(15);
    navigator.clipboard.writeText(text);
    setCopiedBioIndex(index);
    setTimeout(() => setCopiedBioIndex(null), 2500);
  };

  return (
    <div className="bg-white min-h-screen text-[#475569]">
      {/* Breadcrumbs matching image */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <Container>
          <div className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0082CA] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/about" className="hover:text-[#0082CA] transition-colors">
              Company
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0D2040] font-semibold">Brand Identity &amp; Assets</span>
          </div>
        </Container>
      </div>

      {/* Hero Header matching image */}
      <section className="bg-gradient-to-b from-[#F0F8FF] to-white pt-12 pb-16 border-b border-slate-100">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0082CA] bg-white border border-[#BAE6FD] px-3 py-1 rounded-full mb-3 inline-block shadow-xs">
              OFFICIAL BRAND ASSETS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight mb-3 leading-tight">
              MIN MURASU Brand Identity &amp; Media Assets
            </h1>
            <p className="text-lg text-[#0082CA] font-semibold mb-4">
              The Story, Visual Assets, Color System &amp; Editorial Guidelines
            </p>
            <p className="text-base text-[#475569] leading-relaxed mb-8">
              MIN MURASU (மின் முரசு) translates to &quot;The Digital Drum&quot; — inspired by the ancient Tamil Murasu used to announce declarations and news across entire kingdoms. Today, we announce brands to the digital world. Here you will find our official logos, color palette, typography, boilerplates, and media kit.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/icon.svg"
                download="MIN_MURASU_Logo.svg"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0082CA] hover:bg-[#006ca8] text-white font-bold text-sm shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Logo Kit</span>
              </a>
              <ProtectedWhatsApp
                message="Hi MIN MURASU team! 👋 I am requesting official brand guidelines / vector assets for press or partnership co-branding."
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-semibold hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Media Inquiry</span>
              </ProtectedWhatsApp>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Two-Column Content Layout matching screenshot */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Brand Philosophy & Non-Negotiables matching 'Common Roadblocks' style */}
              <div>
                <h2 className="text-xl font-bold text-[#0D2040] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Our Brand Tenets &amp; Non-Negotiables</span>
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs sm:text-sm text-[#475569]">
                    <strong className="text-[#0D2040] block mb-0.5">Zero Fabricated Proof:</strong>
                    We never publish fake testimonials, inflated revenue claims, or stock photography disguised as client case studies. Real businesses buy from real proof.
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs sm:text-sm text-[#475569]">
                    <strong className="text-[#0D2040] block mb-0.5">Speed is a Feature:</strong>
                    Every web application we engineer must achieve sub-second load times (&lt;0.8s) to respect buyer attention and earn top Google search scores.
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs sm:text-sm text-[#475569]">
                    <strong className="text-[#0D2040] block mb-0.5">Clarity Over Jargon:</strong>
                    We communicate commercial results (Cost per Lead, Pipeline Value, Inquiries Closed) rather than hiding behind vanity impressions and clicks.
                  </div>
                </div>
              </div>

              {/* The Name & Heritage */}
              <div>
                <h2 className="text-xl font-bold text-[#0D2040] mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#F58220]" />
                  <span>The Heritage of MIN MURASU (மின் முரசு)</span>
                </h2>
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0D2040] text-white flex items-center justify-center font-black text-sm">
                      மு
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0D2040]">
                        மின் (Min) + முரசு (Murasu)
                      </h3>
                      <span className="text-xs text-[#0082CA] font-semibold">
                        Classical Tamil Announcement Drum Re-imagined for the AI Era
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    In classical Tamil history, the <strong>Murasu</strong> was the ceremonial drum struck by kings to broadcast essential news, herald arrivals, and assemble communities across entire territories. <strong>Min</strong> represents electricity, modern technology, and the digital realm.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>MIN MURASU</strong> is the digital drum announcing your business to the world. We make sure your market hears you clearly, engages with authority, and converts into long-term commercial relationships.
                  </p>
                </div>
              </div>

              {/* Logo Suite & Visual Asset Guidelines */}
              <div>
                <h2 className="text-xl font-bold text-[#0D2040] mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#0082CA]" />
                  <span>The Official Logo Suite</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Logo on Dark Navy */}
                  <div className="p-6 rounded-2xl bg-[#0D2040] border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                        Primary Logo · Dark Canvas
                      </span>
                      <div className="py-4">
                        <Logo dark={true} variant="full" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                      <span>Default for dark hero sections &amp; headers</span>
                      <a
                        href="/icon.svg"
                        download="MIN_MURASU_Logo_Dark.svg"
                        className="text-sky-400 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        SVG
                      </a>
                    </div>
                  </div>

                  {/* Primary Logo on White Canvas */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                        Primary Logo · Light Canvas
                      </span>
                      <div className="py-4">
                        <Logo dark={false} variant="full" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Standard for letterheads &amp; documents</span>
                      <a
                        href="/icon.svg"
                        download="MIN_MURASU_Logo_Light.svg"
                        className="text-[#0082CA] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        SVG
                      </a>
                    </div>
                  </div>

                  {/* App Icon Mark */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-slate-200 shadow-sm flex items-center justify-center">
                      <LogoMark className="w-full h-full" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Favicon &amp; App Badge Mark
                      </span>
                      <h3 className="text-sm font-bold text-[#0D2040] mt-0.5">
                        Murasu Drum Vector Icon
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Used for browser tabs, social avatars, and mobile touch icons.
                      </p>
                      <a
                        href="/favicon.ico"
                        download="favicon.ico"
                        className="text-xs text-[#0082CA] font-bold hover:underline inline-flex items-center gap-1 mt-2"
                      >
                        <Download className="w-3 h-3" />
                        Download .ICO
                      </a>
                    </div>
                  </div>

                  {/* Clear Space & Sizing Rules */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Clear Space &amp; Minimum Scale
                      </span>
                      <h3 className="text-sm font-bold text-[#0D2040]">
                        X-Height Margin Rule
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Always maintain minimum clear space equal to the height of the &quot;M&quot; letter around the logo mark. Minimum digital width: <strong>140px</strong>; minimum print width: <strong>32mm</strong>.
                      </p>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold mt-3 block">
                      ✓ Do not alter angles, stretch, or swap gradients.
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Color Palette with 1-Click Copy */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0D2040] flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#F58220]" />
                    <span>Official Color Palette</span>
                  </h2>
                  <span className="text-xs text-slate-400">Click any card to copy HEX</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {brandColors.map((color) => {
                    const isCopied = copiedHex === color.hex;
                    return (
                      <button
                        key={color.name}
                        onClick={() => handleCopyColor(color.hex)}
                        className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden group cursor-pointer ${
                          color.border ? "border border-slate-200 shadow-xs" : "shadow-sm"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Copy ${color.name} HEX code ${color.hex}`}
                      >
                        <div className="flex items-center justify-between mb-8">
                          <span
                            className={`text-xs font-bold ${
                              color.darkText ? "text-[#0D2040]" : "text-white"
                            }`}
                          >
                            {color.name}
                          </span>
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform group-hover:scale-110 ${
                              color.darkText
                                ? "bg-slate-900/10 text-slate-800"
                                : "bg-white/20 text-white"
                            }`}
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </span>
                        </div>

                        <div>
                          <span
                            className={`font-mono text-sm font-black block tracking-tight ${
                              color.darkText ? "text-[#0D2040]" : "text-white"
                            }`}
                          >
                            {isCopied ? "COPIED!" : color.hex}
                          </span>
                          <span
                            className={`text-[10px] block mt-0.5 line-clamp-1 ${
                              color.darkText ? "text-slate-500" : "text-slate-300"
                            }`}
                          >
                            {color.role}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography Guidelines */}
              <div>
                <h2 className="text-xl font-bold text-[#0D2040] mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5 text-[#0082CA]" />
                  <span>Typography System</span>
                </h2>

                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Primary Display &amp; Body Typeface
                    </span>
                    <h3 className="text-2xl font-black text-[#0D2040]">
                      Manrope / Inter System
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      A modern, geometric sans-serif engineered for digital legibility, technical precision, and executive confidence.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-200">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="font-black text-lg text-[#0D2040] block mb-0.5">800 / 900</span>
                      <span className="text-[11px] text-slate-500">Black: Hero titles &amp; primary metrics</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="font-bold text-lg text-[#0D2040] block mb-0.5">600 / 700</span>
                      <span className="text-[11px] text-slate-500">Bold: Subheadings, cards &amp; buttons</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="font-medium text-lg text-[#0D2040] block mb-0.5">400 / 500</span>
                      <span className="text-[11px] text-slate-500">Regular: Paragraphs &amp; narrative body</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Boilerplates with Copy */}
              <div>
                <h2 className="text-xl font-bold text-[#0D2040] mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>Press Boilerplates &amp; Bios</span>
                </h2>

                <div className="space-y-4">
                  {boilerplates.map((bio, bIdx) => {
                    const isCopied = copiedBioIndex === bIdx;
                    return (
                      <div
                        key={bIdx}
                        className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0D2040]">
                            {bio.label}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyBio(bio.text, bIdx)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-500" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {bio.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column / Sticky Sidebar (4 cols) matching screenshot */}
            <div className="lg:col-span-4 space-y-6">
              {/* Box 1: Quick Brand Facts (light blue card) */}
              <div className="p-6 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] text-xs space-y-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0082CA] block">
                  BRAND AT A GLANCE
                </span>

                <div className="space-y-3 divide-y divide-[#BAE6FD]/60">
                  <div className="pt-2 first:pt-0">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Legal Entity Name
                    </span>
                    <span className="font-bold text-[#0D2040] text-sm mt-0.5 block">
                      {siteConfig.name}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Tamil Script Name
                    </span>
                    <span className="font-bold text-[#0D2040] text-sm mt-0.5 block">
                      {siteConfig.tamilName}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Founder &amp; Principal
                    </span>
                    <span className="font-bold text-[#0D2040] text-sm mt-0.5 block">
                      {siteConfig.founder}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Headquarters
                    </span>
                    <span className="font-bold text-[#0D2040] text-xs mt-0.5 block">
                      {siteConfig.locations.headquarters}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Markets Served
                    </span>
                    <span className="text-slate-700 text-xs mt-0.5 block leading-relaxed">
                      {siteConfig.locations.coverageLine}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Canonical Domain
                    </span>
                    <a
                      href={siteConfig.url}
                      className="font-mono font-bold text-[#0082CA] text-xs mt-0.5 block hover:underline"
                    >
                      www.minmurasu.digital
                    </a>
                  </div>
                </div>
              </div>

              {/* Box 2: Dark Blue Consultation Card matching screenshot */}
              <div className="p-6 rounded-2xl bg-[#0D2040] text-white shadow-xl space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                  PRESS &amp; PARTNERSHIP DESK
                </span>
                <h3 className="text-lg font-black text-white leading-snug">
                  Need High-Resolution Vector Assets or Media Inquiries?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For official EPS/AI files, speaker bookings, or joint brand partnerships, our executive office replies within one business day.
                </p>
                <div className="space-y-2 pt-2">
                  <ProtectedWhatsApp
                    message="Hi Karthikeyan! I am looking for official MIN MURASU brand assets and media materials."
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </ProtectedWhatsApp>
                  <Button
                    href="/contact"
                    variant="teal"
                    size="sm"
                    className="w-full justify-center text-xs font-bold"
                  >
                    Submit Media Request
                  </Button>
                </div>
              </div>

              {/* Box 3: Social & Verification Links */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Official Channels
                </span>
                <div className="space-y-2 text-slate-600">
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white hover:text-[#0082CA] transition-colors"
                  >
                    <span>LinkedIn Official</span>
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white hover:text-[#0082CA] transition-colors"
                  >
                    <span>Instagram Official</span>
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href={siteConfig.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white hover:text-[#0082CA] transition-colors"
                  >
                    <span>YouTube Channel</span>
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}