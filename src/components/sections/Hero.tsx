import React from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedDrumLogo from "@/components/ui/AnimatedDrumLogo";
import { siteConfig } from "@/lib/site-config";
import { ProtectedWhatsApp } from "@/components/ui/ProtectedContact";
import {
  ArrowRight,
  MessageSquare,
  MapPin,
  KeyRound,
  Clock,
  Search,
  Megaphone,
  Bot,
} from "lucide-react";

const floatingChips = [
  { icon: Search, label: "Get found on Google & AI search", pos: "-top-5 left-4" },
  { icon: Megaphone, label: "Ads that bring enquiries", pos: "top-[42%] -right-4 xl:-right-10" },
  { icon: Bot, label: "Instant WhatsApp replies", pos: "-bottom-5 right-6" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F0F8FF] bg-[url('/images/hero-bg.jpg')] bg-cover bg-bottom bg-no-repeat pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100 murasu-accent-tl">
      {/* Soft wash keeps text crisp over the background image */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[480px]">
          {/* Left: promise + one clear next step */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-xs text-sm font-bold text-[#0D2040]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F58220]" />
              <span>{siteConfig.name}</span>
              <span className="text-slate-400 font-normal">·</span>
              <span lang="ta" className="font-semibold text-[#0082CA]">
                {siteConfig.tamilName}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0D2040] tracking-tight leading-[1.1]">
              Turn Digital Attention Into{" "}
              <span className="relative inline-block text-[#F58220]">
                Business Growth<span className="text-[#0D2040]">.</span>
                <span className="absolute -bottom-1.5 left-0 w-full h-1 bg-[#F58220] rounded-full" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#334155] leading-relaxed max-w-xl mx-auto lg:mx-0">
              We help businesses get found online, turn visitors into enquiries, and reply to
              every lead instantly — with marketing, websites and AI automation from one team.
            </p>

            {/* One primary action, one secondary */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button
                href={siteConfig.cta.audit.href}
                variant="orange"
                size="lg"
                className="w-full sm:w-auto shadow-md shadow-orange-950/20 group font-bold px-7 py-4 text-base"
              >
                <span>Get My Free Digital Audit</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                href={siteConfig.cta.primary.href}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white border-slate-300 hover:border-slate-400 font-semibold text-[#0D2040] px-6 py-4 text-base shadow-xs"
              >
                Book a 30-min Call
              </Button>
            </div>

            <p className="text-sm text-[#334155]">
              Prefer WhatsApp?{" "}
              <ProtectedWhatsApp
                message={siteConfig.whatsapp.messages.audit}
                source="hero"
                className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message us on {siteConfig.phones.primaryDisplay}</span>
              </ProtectedWhatsApp>
            </p>

            {/* Local trust line */}
            <ul className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm font-semibold text-[#0D2040]">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F58220]" />
                <span>Based in Coimbatore · Serving all of India</span>
              </li>
              <li className="flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#0082CA]" />
                <span>You own every account</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#0082CA]" />
                <span>Reply within one business day</span>
              </li>
            </ul>
          </div>

          {/* Right: the brand drum — "announcing your business to the world" */}
          <div className="lg:col-span-5 flex items-center justify-center relative select-none">
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-400/25 via-blue-500/15 to-orange-400/25 blur-3xl pointer-events-none -z-10" />
            <div className="relative w-full max-w-[240px] sm:max-w-md">
              <div className="rounded-[2rem] bg-white/80 border border-white shadow-xl shadow-slate-900/10 px-5 pt-5 pb-5 sm:px-12 sm:pt-10 sm:pb-12">
                <AnimatedDrumLogo className="w-full h-auto" twoSticks />
                <p className="mt-2 text-center text-sm font-semibold text-[#334155]">
                  {siteConfig.nameMeaning}
                </p>
              </div>
              {floatingChips.map(({ icon: Icon, label, pos }) => (
                <div
                  key={label}
                  className={`absolute ${pos} hidden sm:flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow-md px-3.5 py-2 text-xs font-bold text-[#0D2040]`}
                >
                  <Icon className="w-4 h-4 text-[#F58220]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
