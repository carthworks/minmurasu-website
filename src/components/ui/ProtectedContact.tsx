"use client";

import React from "react";
import {
  siteConfig,
  getMailtoUrl,
  getTelUrl,
  getWhatsAppUrl,
} from "@/lib/site-config";
import { feedback } from "@/lib/vibe-feedback";

export function ProtectedEmail({
  variant = "primary",
  className = "",
  children,
}: {
  variant?: "primary" | "secondary";
  className?: string;
  children?: React.ReactNode;
}) {
  const email =
    variant === "secondary" && "secondary" in siteConfig.emails
      ? (siteConfig.emails as { primary: string; secondary?: string }).secondary ||
        siteConfig.emails.primary
      : siteConfig.emails.primary;

  return (
    <a
      href={variant === "primary" ? getMailtoUrl() : `mailto:${email}`}
      onClick={() => feedback.triggerHaptic(10)}
      className={`inline-flex items-center text-left ${className}`}
    >
      {children ?? email}
    </a>
  );
}

export function ProtectedPhone({
  variant = "primary",
  className = "",
  children,
}: {
  variant?: "primary" | "secondary";
  className?: string;
  children?: React.ReactNode;
}) {
  const display =
    variant === "secondary"
      ? siteConfig.phones.secondaryDisplay
      : siteConfig.phones.primaryDisplay;

  return (
    <a
      href={getTelUrl(variant)}
      onClick={() => feedback.triggerHaptic(10)}
      className={`inline-flex items-center text-left ${className}`}
    >
      {children ?? display}
    </a>
  );
}

export function ProtectedWhatsApp({
  message = siteConfig.whatsapp.defaultMessage,
  className = "",
  ariaLabel,
  title,
  children,
}: {
  message?: string;
  className?: string;
  ariaLabel?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={title}
      onClick={() => feedback.triggerHaptic(10)}
      className={className}
    >
      {children}
    </a>
  );
}

