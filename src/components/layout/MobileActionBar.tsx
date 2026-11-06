"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Layers, CalendarCheck } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { feedback } from "@/lib/vibe-feedback";

export default function MobileActionBar() {
  const handleTouch = () => {
    feedback.triggerHaptic(10);
  };

  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 py-2.5 bg-[#0D2040]/95 backdrop-blur-xl border-t border-slate-800 flex items-center justify-around shadow-2xl"
    >
      <a
        href={`tel:${siteConfig.phones.primaryRaw}`}
        onClick={handleTouch}
        className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white active:scale-90 transition-transform"
      >
        <Phone className="w-4 h-4 text-[#38BDF8]" />
        <span>Call Now</span>
      </a>

      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTouch}
        className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white active:scale-90 transition-transform"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <span>WhatsApp</span>
      </a>

      <Link
        href="/services"
        onClick={handleTouch}
        className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white active:scale-90 transition-transform"
      >
        <Layers className="w-4 h-4 text-[#38BDF8]" />
        <span>Services</span>
      </Link>

      <Link
        href="/contact"
        onClick={() => {
          feedback.playPop();
          feedback.triggerHaptic(15);
        }}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F58220] text-white text-xs font-bold active:scale-95 transition-transform shadow-md shadow-orange-950/40"
      >
        <CalendarCheck className="w-3.5 h-3.5" />
        <span>Book Audit</span>
      </Link>
    </nav>
  );
}
