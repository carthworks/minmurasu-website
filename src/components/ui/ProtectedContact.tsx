"use client";

import React, { useSyncExternalStore } from "react";
import { feedback } from "@/lib/vibe-feedback";

const emptySubscribe = () => () => {};

function useIsHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Decodes char codes at runtime on the client so static HTML scrapers
 * cannot regex-harvest email addresses or phone numbers from page source.
 */
const EMAIL_PARTS = {
  primary: {
    // "hello" + "@" + "minmurasu.com"
    u: [104, 101, 108, 108, 111],
    d: [109, 105, 110, 109, 117, 114, 97, 115, 117, 46, 99, 111, 109],
  },
  secondary: {
    // "minmurasu.digital" + "@" + "gmail.com"
    u: [109, 105, 110, 109, 117, 114, 97, 115, 117, 46, 100, 105, 103, 105, 116, 97, 108],
    d: [103, 109, 97, 105, 108, 46, 99, 111, 109],
  },
} as const;

const PHONE_PARTS = {
  primary: {
    // "+91 9486772206" / "919486772206"
    display: [43, 57, 49, 32, 57, 52, 56, 54, 55, 55, 50, 50, 48, 54],
    raw: [57, 49, 57, 52, 56, 54, 55, 55, 50, 50, 48, 54],
  },
  secondary: {
    // "+91 9445277206" / "919445277206"
    display: [43, 57, 49, 32, 57, 52, 52, 53, 50, 55, 55, 50, 48, 54],
    raw: [57, 49, 57, 52, 52, 53, 50, 55, 55, 50, 48, 54],
  },
} as const;

function decodeChars(codes: readonly number[]): string {
  return String.fromCharCode(...codes);
}

export function ProtectedEmail({
  variant = "primary",
  className = "",
  children,
}: {
  variant?: "primary" | "secondary";
  className?: string;
  children?: React.ReactNode;
}) {
  const isHydrated = useIsHydrated();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    feedback.triggerHaptic(10);
    const parts = EMAIL_PARTS[variant];
    const addr = `${decodeChars(parts.u)}@${decodeChars(parts.d)}`;
    window.location.href = `mailto:${addr}`;
  };

  if (!isHydrated) {
    return (
      <span
        className={` select-none ${className}`}
        aria-label="Protected business email address"
      >
        {children ?? "[Email Protected]"}
      </span>
    );
  }

  const parts = EMAIL_PARTS[variant];
  const user = decodeChars(parts.u);
  const domain = decodeChars(parts.d);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center text-left cursor-pointer ${className}`}
      title="Click to send email"
    >
      {children ?? (
        <span>
          <span>{user}</span>
          <span aria-hidden="true">&#64;</span>
          <span>{domain}</span>
        </span>
      )}
    </button>
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
  const isHydrated = useIsHydrated();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    feedback.triggerHaptic(10);
    const raw = decodeChars(PHONE_PARTS[variant].raw);
    window.location.href = `tel:+${raw}`;
  };

  if (!isHydrated) {
    return (
      <span
        className={`select-none ${className}`}
        aria-label="Protected business phone number"
      >
        {children ?? "[Phone Protected]"}
      </span>
    );
  }

  const display = decodeChars(PHONE_PARTS[variant].display);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center text-left cursor-pointer ${className}`}
      title="Click to call"
    >
      {children ?? <span>{display}</span>}
    </button>
  );
}

export function ProtectedWhatsApp({
  message = "Hello MIN MURASU, I would like to enquire about your digital growth & automation services.",
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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    feedback.triggerHaptic(10);
    const raw = decodeChars(PHONE_PARTS.primary.raw);
    const url = `https://wa.me/${raw}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

