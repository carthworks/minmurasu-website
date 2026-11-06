import React from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-[#F58220] mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F58220]" />
          <span>No Obligation &bull; Defensible Strategy &bull; Direct Consultation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
          Let’s Build a Smarter Growth Plan For Your Business.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tell us what you want to improve. We will review your digital presence, analyze
          your current customer acquisition bottlenecks, and suggest actionable next steps.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button
            href="/contact"
            variant="orange"
            size="lg"
            className="w-full sm:w-auto font-bold shadow-lg shadow-orange-950/40"
          >
            <span>Book a Free Consultation</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button
            href="/contact?type=audit"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800"
          >
            Request a Digital Presence Audit
          </Button>

          <ProtectedWhatsApp
            message="Hi MIN MURASU, I would like to request an initial digital audit for my company."
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </ProtectedWhatsApp>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
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
          <span>Coimbatore HQ &bull; Serving India</span>
        </div>
      </Container>
    </section>
  );
}

