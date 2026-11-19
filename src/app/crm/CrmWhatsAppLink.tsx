"use client";

import React from "react";
import { getWhatsAppUrl } from "@/lib/site-config";
import { trackWhatsAppClick } from "@/lib/analytics";
import { crmWhatsAppMessage } from "./crm-content";

/** WhatsApp deep link with the CRM-specific opener and click tracking. */
export default function CrmWhatsAppLink({
  location,
  className,
  children,
}: {
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={getWhatsAppUrl(crmWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(`crm-${location}`)}
      className={className}
    >
      {children}
    </a>
  );
}
