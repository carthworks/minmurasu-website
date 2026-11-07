import React from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import {
  ProtectedEmail,
  ProtectedPhone,
  ProtectedWhatsApp,
} from "@/components/ui/ProtectedContact";
import { ArrowRight, MessageSquare, ShieldCheck, Mail, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#0D2040] text-white relative overflow-hidden murasu-accent-br">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0082CA]/15 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-semibold text-orange-200 mb-6">
          <ShieldCheck className="w-4 h-4 text-[#F58220]" />
          <span>Free &bull; No obligation &bull; Results in 1–2 business days</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
          Find out where you&apos;re losing customers — free.
        </h2>

        <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          Share your website or social page. We&apos;ll review how people find you, what happens when
          they visit, and how fast they get a reply — then send you clear, practical next steps.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button
            href={siteConfig.cta.audit.href}
            variant="orange"
            size="lg"
            className="w-full sm:w-auto font-bold text-base px-7 py-4 shadow-lg shadow-orange-950/40"
          >
            <span>Get My Free Digital Audit</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <ProtectedWhatsApp
            message={siteConfig.whatsapp.messages.audit}
            source="final_cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-emerald-600 text-white font-bold text-base hover:bg-emerald-500 transition-colors shadow-sm"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{siteConfig.cta.whatsapp.label}</span>
          </ProtectedWhatsApp>
        </div>

        <p className="text-base text-slate-300 mb-10">
          Rather talk first?{" "}
          <Link href={siteConfig.cta.primary.href} className="font-bold text-white underline underline-offset-4 hover:text-[#F58220]">
            Book a 30-minute call
          </Link>
        </p>

        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
            <ProtectedEmail variant="primary" className="hover:text-white" />
          </span>
          <span className="hidden sm:inline text-slate-600">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
            <ProtectedPhone variant="primary" className="hover:text-white" />
          </span>
          <span className="hidden sm:inline text-slate-600">&bull;</span>
          <span>{siteConfig.locations.coverageLine}</span>
        </div>
      </Container>
    </section>
  );
}

