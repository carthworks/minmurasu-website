import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { ProtectedWhatsApp } from "@/components/ui/ProtectedContact";
import {
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Play,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F0F8FF] bg-[url('/images/hero-bg.jpg')] bg-cover bg-bottom bg-no-repeat pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-100 murasu-accent-tl">
      {/* Soft gradient wash overlay to ensure crisp contrast on all viewports */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none lg:block hidden" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[500px]">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200 shadow-xs text-xs font-bold text-[#0D2040]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F58220] animate-pulse" />
              <span>{siteConfig.positioning}</span>
            </div>

            {/* Main Headline matching the mockup */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#0D2040] tracking-tight leading-[1.12]">
              Turn Digital Attention Into{" "}
              <span className="relative inline-block text-[#F58220]">
                Business Growth<span className="text-[#0D2040]">.</span>
                <span className="absolute -bottom-1.5 left-0 w-full h-1 bg-[#F58220] rounded-full" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {siteConfig.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Button
                href={siteConfig.cta.primary.href}
                variant="orange"
                size="lg"
                className="w-full sm:w-auto shadow-md shadow-orange-950/20 group font-bold px-6 py-3.5"
              >
                <span>{siteConfig.cta.primary.label}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                href={siteConfig.cta.secondary.href}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white border-slate-300 hover:border-slate-400 font-semibold text-[#0D2040] px-6 py-3.5 shadow-xs"
              >
                {siteConfig.cta.secondary.label}
              </Button>

              <Button
                href="#brand-video"
                variant="navy"
                size="lg"
                className="w-full sm:w-auto font-semibold px-5 py-3.5 shadow-xs"
              >
                <Play className="w-4 h-4 mr-2 fill-current text-[#F58220]" />
                <span>Watch Intro</span>
              </Button>

              <ProtectedWhatsApp
                message={siteConfig.whatsapp.messages.consultation}
                className="inline-flex items-center justify-center p-3.5 rounded-lg border border-emerald-300 bg-white text-emerald-600 hover:bg-emerald-50 transition-colors shadow-xs"
                title={siteConfig.cta.whatsapp.label}
                ariaLabel={siteConfig.cta.whatsapp.label}
              >
                <MessageSquare className="w-5 h-5 text-emerald-600" />
              </ProtectedWhatsApp>
            </div>

            {/* Trust points matching mockup */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0082CA]" />
                <span>Marketing &amp; Tech Unified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
                <span>Practical AI Automation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0082CA]" />
                <span>Your Data, Your Accounts</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity 3D Laptop with Growth Chart & Floating Badges with Mild Animation */}
          <div className="lg:col-span-6 flex items-center justify-center relative select-none">
            {/* Ambient Cyan & Orange Glow behind the glowing base ring */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-400/25 via-blue-500/20 to-orange-400/20 blur-3xl pointer-events-none animate-glow-mild -z-10" />

            {/* Floating Visual Container */}
            <div className="relative w-full max-w-lg lg:max-w-xl animate-float-mild transition-all duration-500 ease-out hover:scale-[1.02]">
              <Image
                src="/images/hero-laptop-3d.png"
                alt="MIN MURASU Digital Growth & AI Automation Platform"
                width={800}
                height={600}
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(13,32,64,0.18)]"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
