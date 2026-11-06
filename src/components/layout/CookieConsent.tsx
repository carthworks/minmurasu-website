"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { ShieldCheck } from "lucide-react";

const STORAGE_KEY = "minmurasu_cookie_consent_v1";

interface ConsentRecord {
  status: "accepted" | "declined";
  timestamp: string;
}

export default function CookieConsent({
  gaId,
  gtmId,
}: {
  gaId?: string;
  gtmId?: string;
}) {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ConsentRecord;
        if (parsed.status === "accepted" || parsed.status === "declined") {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setConsent(parsed.status);
          return;
        }
      }
      setIsVisible(true);
    } catch {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleReopen = () => setIsVisible(true);
    window.addEventListener("open-cookie-preferences", handleReopen);
    return () =>
      window.removeEventListener("open-cookie-preferences", handleReopen);
  }, []);

  const saveDecision = (decision: "accepted" | "declined") => {
    const record: ConsentRecord = {
      status: decision,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // ignore storage errors in private mode
    }
    setConsent(decision);
    setIsVisible(false);
  };

  return (
    <>
      {/* Only load non-essential analytics scripts after explicit user opt-in */}
      {consent === "accepted" && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {consent === "accepted" && gtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

      {isVisible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie and privacy consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-5 text-xs text-[#475569]"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0D2040] mb-1">
                Cookie &amp; Privacy Preferences
              </h2>
              <p className="leading-relaxed">
                We use strictly necessary cookies to operate this site and optional,
                anonymized analytics cookies (GA4) to improve site performance. No analytics
                scripts run unless you opt in. Read our{" "}
                <Link
                  href="/privacy-policy#cookies"
                  className="text-[#0082CA] font-semibold underline"
                >
                  Cookie &amp; Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Equal visual prominence for Decline vs Accept (Anti-Dark Pattern Compliant) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => saveDecision("declined")}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-[#0D2040] bg-white text-[#0D2040] font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => saveDecision("accepted")}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-[#0D2040] bg-[#0D2040] text-white font-bold text-xs hover:bg-[#16305c] transition-colors cursor-pointer"
            >
              Accept Analytics
            </button>
          </div>
        </div>
      )}
    </>
  );
}

