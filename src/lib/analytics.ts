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
 * UTM Parameter Extraction
 * Stores initial attribution parameters into sessionStorage to attribute conversion
 */
export function captureUtmParameters(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const captured: Record<string, string> = {};

  utmKeys.forEach((key) => {
    const val = urlParams.get(key);
    if (val) {
      captured[key] = val;
      try {
        sessionStorage.setItem(key, val);
      } catch {
        // Ignore session storage errors
      }
    } else {
      try {
        const stored = sessionStorage.getItem(key);
        if (stored) captured[key] = stored;
      } catch {
        // Ignore session storage errors
      }
    }
  });

  return captured;
}
