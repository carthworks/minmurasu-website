import { NextRequest, NextResponse } from "next/server";
import {
  anonymiseIp,
  detectBrowser,
  detectDevice,
  detectOS,
  extractRawIp,
  extractSource,
  isIpIgnored,
  recordEvent,
  type AnalyticsEventType,
} from "@/lib/first-party-analytics";
import {
  ANALYTICS_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/analytics-auth";

const ALLOWED_TYPES = new Set<AnalyticsEventType>([
  "pageview",
  "whatsapp",
  "enquiry",
  "phone",
  "email",
  "cta",
  "social",
]);

function cleanStr(val: unknown, maxLen: number): string | undefined {
  if (typeof val !== "string") return undefined;
  const trimmed = val.trim();
  return trimmed ? trimmed.slice(0, maxLen) : undefined;
}

function safeDecodeHeader(val: string | null): string | undefined {
  if (!val) return undefined;
  try {
    return decodeURIComponent(val).slice(0, 80);
  } catch {
    return val.slice(0, 80);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const path = cleanStr(body.path, 200) ?? "/";

    if (path.startsWith("/analytics") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true, skipped: "private" });
    }

    const host = (req.headers.get("host") ?? "").toLowerCase();
    if (
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1") ||
      host.startsWith("[::1]")
    ) {
      return NextResponse.json({ ok: true, skipped: "localhost" });
    }

    const sessionToken = req.cookies.get(ANALYTICS_COOKIE_NAME)?.value;
    if (sessionToken && (await verifySessionToken(sessionToken))) {
      return NextResponse.json({ ok: true, skipped: "owner" });
    }

    const rawIp = extractRawIp(req);
    if (await isIpIgnored(rawIp)) {
      return NextResponse.json({ ok: true, skipped: "ignored-ip" });
    }

    const ua = (req.headers.get("user-agent") ?? "").slice(0, 300);
    if (/bot|crawl|spider|slurp|headless/i.test(ua)) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }

    const rawType = cleanStr(body.type, 24) as AnalyticsEventType | undefined;
    const type: AnalyticsEventType =
      rawType && ALLOWED_TYPES.has(rawType) ? rawType : "pageview";

    const referrer = cleanStr(body.referrer, 300) ?? "";
    const utmSource = cleanStr(body.utmSource, 64);
    const utmMedium = cleanStr(body.utmMedium, 64);
    const utmCampaign = cleanStr(body.utmCampaign, 100);
    const acceptLang = req.headers.get("accept-language")?.split(",")[0]?.trim();

    await recordEvent({
      type,
      ts: Date.now(),
      ip: anonymiseIp(rawIp),
      path,
      label: cleanStr(body.label, 120),
      detail: cleanStr(body.detail, 240),
      referrer,
      source: extractSource(referrer, utmSource),
      utmSource,
      utmMedium,
      utmCampaign,
      ua,
      device: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOS(ua),
      country:
        req.headers.get("x-vercel-ip-country") ??
        req.headers.get("cf-ipcountry") ??
        undefined,
      region: safeDecodeHeader(req.headers.get("x-vercel-ip-country-region")),
      city: safeDecodeHeader(req.headers.get("x-vercel-ip-city")),
      timezone:
        cleanStr(body.timezone, 64) ??
        safeDecodeHeader(req.headers.get("x-vercel-ip-timezone")),
      language:
        cleanStr(body.language, 32) ??
        (acceptLang ? acceptLang.slice(0, 32) : undefined),
      screen: cleanStr(body.screen, 24),
      visitorId: cleanStr(body.visitorId, 64),
      sessionId: cleanStr(body.sessionId, 64),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
