"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { ProtectedWhatsApp } from "@/components/ui/ProtectedContact";
import { siteConfig } from "@/lib/site-config";

/** Desktop/tablet floating WhatsApp button. Phones use MobileActionBar instead. */
export default function WhatsAppFloat() {
  return (
    <ProtectedWhatsApp
      message={siteConfig.whatsapp.defaultMessage}
      source="floating_button"
      ariaLabel={siteConfig.cta.whatsapp.label}
      title={siteConfig.cta.whatsapp.label}
      className="hidden md:flex fixed bottom-6 right-6 z-30 items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-950/30 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all"
    >
      <MessageSquare className="w-5 h-5" />
      <span>Chat on WhatsApp</span>
    </ProtectedWhatsApp>
  );
}
