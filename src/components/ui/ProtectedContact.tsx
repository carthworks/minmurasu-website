"use client";

import React from "react";
import { feedback } from "@/lib/vibe-feedback";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { trackEvent, trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

/**
 * Contact links rendered as plain, crawlable anchors.
 *
 * Business email and phone are meant to be public: search engines, Google Business
 * Profile matching and visitors with JavaScript disabled all need to see them in the HTML.
 * All values come from siteConfig — never hard-code them here.
 *
 * Component names and props are unchanged from the previous obfuscated version,
 * so existing callers keep working.
 */

type Variant = "primary" | "secondary";

export function ProtectedEmail({
  className = "",
  children,
}: {
  /** Kept for compatibility; there is a single public email address. */
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  const addr = siteConfig.emails.primary;
  return (
    <a
      href={`mailto:${addr}`}
      onClick={() => {
        feedback.triggerHaptic(10);
        trackEvent("generate_lead", { channel: "email_click" });
      }}
      className={`inline-flex items-center text-left break-all ${className}`}
      title="Send us an email"
    >
      {children ?? addr}
    </a>
  );
}

export function ProtectedPhone({
  variant = "primary",
  className = "",
  children,
}: {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  const { phones } = siteConfig;
  const e164 = variant === "primary" ? phones.primaryE164 : phones.secondaryE164;
  const display = variant === "primary" ? phones.primaryDisplay : phones.secondaryDisplay;
  return (
    <a
      href={`tel:${e164}`}
      onClick={() => {
        feedback.triggerHaptic(10);
        trackPhoneClick(variant);
      }}
      className={`inline-flex items-center text-left ${className}`}
      title="Call us"
    >
      {children ?? display}
    </a>
  );
}

export function ProtectedWhatsApp({
  message,
  className = "",
  ariaLabel,
  title,
  source = "site",
  children,
}: {
  message?: string;
  className?: string;
  ariaLabel?: string;
  title?: string;
  /** Where the button sits — sent to analytics to see which placement converts. */
  source?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        feedback.triggerHaptic(10);
        trackWhatsAppClick(source);
      }}
      aria-label={ariaLabel}
      title={title}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
}
