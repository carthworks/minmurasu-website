/**
 * MIN MURASU Central Analytics & Conversion Tracking Utility
 * Strict Privacy: Never send PII (names, emails, phone numbers) to analytics platforms.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "generate_lead"
  | "book_consultation_click"
  | "whatsapp_click"
  | "click_to_call"
  | "service_view"
  | "audit_request";

export function trackEvent(
  eventName: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  // Google Analytics 4 (gtag)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Google Tag Manager dataLayer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event Tracked]: ${eventName}`, params);
  }
}

// Track confirmed successful lead generation
export function trackLeadSubmission(service: string) {
  trackEvent("generate_lead", {
    service_category: service,
    value: 1,
  });
}

// Track WhatsApp interaction click
export function trackWhatsAppClick(sourceLocation: string) {
  trackEvent("whatsapp_click", {
    source_placement: sourceLocation,
  });
}

// Track Phone call click
export function trackPhoneClick(phoneNumber: string) {
  trackEvent("click_to_call", {
    destination_phone: phoneNumber,
  });
}

// Track Consultation CTA click
export function trackConsultationClick(ctaLabel: string) {
  trackEvent("book_consultation_click", {
    cta_label: ctaLabel,
  });
}

// Track Service detail view
export function trackServiceView(serviceSlug: string) {
  trackEvent("service_view", {
    service_slug: serviceSlug,
  });
}

/**
 * Marketing attribution (UTM tags, ad click IDs, landing page, external referrer).
 * Captured once per browser session on first page view and attached to every lead.
 * Stored in sessionStorage only and never contains PII.
 */
const ATTRIBUTION_KEY = "mm_attribution";
const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

function readStoredAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Call on every client navigation; only the first touch of the session is kept,
 *  except that a later visit carrying new campaign params replaces it. */
export function captureAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const stored = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const val = params.get(key);
    if (val) fresh[key] = val.slice(0, 300);
  }

  if (Object.keys(stored).length > 0 && Object.keys(fresh).length === 0) return stored;

  const next: Record<string, string> = {
    ...fresh,
    landing_page: (window.location.pathname + window.location.search).slice(0, 300),
    first_seen_at: new Date().toISOString(),
  };
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.host !== window.location.host) next.referrer = ref.origin + ref.pathname;
  } catch {
    // Ignore malformed referrers
  }
  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
  } catch {
    // Ignore session storage errors
  }
  return next;
}

/** Attribution to send with a lead: stored first touch plus the page the form was on. */
export function getLeadAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const stored = readStoredAttribution();
  const base = Object.keys(stored).length ? stored : captureAttribution();
  return { ...base, submitted_from: window.location.pathname.slice(0, 300) };
}
