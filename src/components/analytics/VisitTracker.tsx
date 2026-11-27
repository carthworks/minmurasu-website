"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getOrCreateStorageId(storage: Storage, key: string): string | undefined {
  try {
    let id = storage.getItem(key);
    if (!id) {
      id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      storage.setItem(key, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

function isLocalhost(): boolean {
  const host = window.location.hostname;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host === "0.0.0.0"
  );
}

function isBrowserIgnored(): boolean {
  try {
    return window.localStorage.getItem("mm_ignore_analytics") === "1";
  } catch {
    return false;
  }
}

function sendAnalyticsEvent(payload: Record<string, unknown>) {
  const searchParams = new URLSearchParams(window.location.search);
  const timezone = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return undefined;
    }
  })();

  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      referrer: document.referrer ?? "",
      utmSource: searchParams.get("utm_source") ?? undefined,
      utmMedium: searchParams.get("utm_medium") ?? undefined,
      utmCampaign: searchParams.get("utm_campaign") ?? undefined,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || undefined,
      timezone,
      visitorId: getOrCreateStorageId(window.localStorage, "mm_vid"),
      sessionId: getOrCreateStorageId(window.sessionStorage, "mm_sid"),
      ...payload,
    }),
    keepalive: true,
  }).catch(() => {});
}

export default function VisitTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  // Pageview tracking
  useEffect(() => {
    if (!pathname || pathname.startsWith("/analytics")) return;
    if (isLocalhost() || isBrowserIgnored()) return;
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    sendAnalyticsEvent({
      type: "pageview",
      path: pathname,
    });
  }, [pathname]);

  // Delegated lead-action click tracking
  useEffect(() => {
    if (!pathname || pathname.startsWith("/analytics")) return;
    if (isLocalhost() || isBrowserIgnored()) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = (anchor.getAttribute("href") ?? "").trim();
      if (!href) return;

      const text = (anchor.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
      const locationTag = anchor.closest("header")
        ? "Header"
        : anchor.closest("footer")
          ? "Footer"
          : pathname === "/"
            ? "Homepage"
            : pathname.replace(/^\//, "");

      const lower = href.toLowerCase();

      if (lower.includes("wa.me") || lower.includes("whatsapp.com")) {
        sendAnalyticsEvent({
          type: "whatsapp",
          path: pathname,
          label: `WhatsApp - ${locationTag}`,
          detail: text || "WhatsApp enquiry",
        });
      } else if (lower.startsWith("tel:")) {
        sendAnalyticsEvent({
          type: "phone",
          path: pathname,
          label: `Phone - ${locationTag}`,
          detail: href.replace(/^tel:/i, ""),
        });
      } else if (lower.startsWith("mailto:")) {
        sendAnalyticsEvent({
          type: "email",
          path: pathname,
          label: `Email - ${locationTag}`,
          detail: href.replace(/^mailto:/i, ""),
        });
      } else if (
        lower.includes("instagram.com") ||
        lower.includes("facebook.com") ||
        lower.includes("linkedin.com") ||
        lower.includes("youtube.com") ||
        lower.includes("youtu.be") ||
        lower.includes("x.com") ||
        lower.includes("twitter.com")
      ) {
        sendAnalyticsEvent({
          type: "social",
          path: pathname,
          label: `Social - ${locationTag}`,
          detail: text || href,
        });
      } else if (
        (lower === "/contact" ||
          lower.startsWith("/contact?") ||
          lower.startsWith("/contact#") ||
          lower === "#contact") &&
        pathname !== "/contact"
      ) {
        sendAnalyticsEvent({
          type: "cta",
          path: pathname,
          label: `Contact CTA - ${locationTag}`,
          detail: text || "Contact",
        });
      }
    }

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
