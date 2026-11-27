import type { NextRequest } from "next/server";

// ── Types ──────────────────────────────────────────────────────────────────
export type AnalyticsEventType =
  | "pageview"
  | "whatsapp"
  | "enquiry"
  | "phone"
  | "email"
  | "cta"
  | "social";

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  ts: number; // unix ms
  ip: string; // anonymised
  path: string;
  label?: string;
  detail?: string;
  referrer: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ua: string;
  device: "mobile" | "tablet" | "desktop" | "bot";
  browser: string;
  os: string;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  language?: string;
  screen?: string;
  visitorId?: string;
  sessionId?: string;
}

export interface AnalyticsPayload {
  events: AnalyticsEvent[];
  totalStored: number;
  ignoredIps: string[];
  currentIp: string;
  usingRedis: boolean;
}

const EVENTS_KEY = "mm:analytics:events";
const IGNORED_IPS_KEY = "mm:analytics:ignored_ips";
const MAX_STORED_EVENTS = 1000;

// ── IP helpers ─────────────────────────────────────────────────────────────
export function anonymiseIp(raw: string): string {
  if (!raw) return "unknown";
  const ip = raw.split(",")[0].trim();
  const v4 = ip.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}$/);
  if (v4) return `${v4[1]}.0`;
  if (ip.includes(":")) return ip.split(":").slice(0, 4).join(":") + "::";
  return "unknown";
}

export function extractRawIp(req: NextRequest | Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const real = req.headers.get("x-real-ip");
  const raw = forwarded ?? real ?? "127.0.0.1";
  return raw.split(",")[0].trim();
}

export function isLocalhostIp(rawIp: string): boolean {
  const ip = rawIp.trim().toLowerCase();
  return (
    !ip ||
    ip === "127.0.0.1" ||
    ip === "127.0.0.0" ||
    ip === "::1" ||
    ip === "::1::" ||
    ip === "::ffff:127.0.0.1" ||
    ip === "localhost" ||
    ip.startsWith("127.")
  );
}

// ── UA & Source parsing ────────────────────────────────────────────────────
export function detectDevice(
  ua: string
): "mobile" | "tablet" | "desktop" | "bot" {
  const u = ua.toLowerCase();
  if (/bot|crawl|spider|slurp|facebookexternalhit|linkedinbot|headless/.test(u))
    return "bot";
  if (/tablet|ipad|playbook|silk/.test(u)) return "tablet";
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(u))
    return "mobile";
  return "desktop";
}

export function detectBrowser(ua: string): string {
  if (!ua) return "Unknown";
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\/|opera/i.test(ua)) return "Opera";
  if (/samsungbrowser/i.test(ua)) return "Samsung";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/crios|chrome/i.test(ua) && !/edg\//i.test(ua)) return "Chrome";
  if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) return "Safari";
  return "Other";
}

export function detectOS(ua: string): string {
  if (!ua) return "Unknown";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/android/i.test(ua)) return "Android";
  if (/windows/i.test(ua)) return "Windows";
  if (/mac os x|macintosh/i.test(ua)) return "macOS";
  if (/cros/i.test(ua)) return "ChromeOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

export function extractSource(referrer: string, utmSource?: string): string {
  if (utmSource && utmSource.trim()) {
    return utmSource.trim().toLowerCase().slice(0, 64);
  }
  if (!referrer || !referrer.trim()) return "Direct";
  try {
    const url = new URL(referrer);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    if (
      !host ||
      host === "localhost" ||
      host === "minmurasu.digital" ||
      host.endsWith(".minmurasu.digital")
    ) {
      return "Direct";
    }
    return host;
  } catch {
    return "Direct";
  }
}

// ── Storage (Upstash Redis with global in-memory fallback) ─────────────────
const globalStore = globalThis as typeof globalThis & {
  __mmAnalyticsEvents?: AnalyticsEvent[];
  __mmAnalyticsIgnoredIps?: Set<string>;
};

function getMemEvents(): AnalyticsEvent[] {
  if (!globalStore.__mmAnalyticsEvents) {
    globalStore.__mmAnalyticsEvents = [];
  }
  return globalStore.__mmAnalyticsEvents;
}

function getMemIgnoredIps(): Set<string> {
  if (!globalStore.__mmAnalyticsIgnoredIps) {
    globalStore.__mmAnalyticsIgnoredIps = new Set<string>();
  }
  return globalStore.__mmAnalyticsIgnoredIps;
}

async function getRedis() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();
  if (!url || !token) return null;
  const { Redis } = await import("@upstash/redis");
  return new Redis({ url, token });
}

function getEnvIgnoredIps(): string[] {
  return (process.env.ANALYTICS_IGNORE_IPS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function getIgnoredIps(): Promise<string[]> {
  const envIps = getEnvIgnoredIps();
  const redis = await getRedis();
  if (redis) {
    const stored = (await redis.smembers(IGNORED_IPS_KEY)) as string[];
    return Array.from(new Set([...envIps, ...stored]));
  }
  return Array.from(new Set([...envIps, ...Array.from(getMemIgnoredIps())]));
}

export async function isIpIgnored(rawIp: string): Promise<boolean> {
  if (isLocalhostIp(rawIp)) return true;
  const rawLower = rawIp.trim().toLowerCase();
  const anonLower = anonymiseIp(rawIp).toLowerCase();
  const list = await getIgnoredIps();
  for (const entry of list) {
    const e = entry.trim().toLowerCase();
    if (!e) continue;
    if (
      rawLower === e ||
      anonLower === e ||
      anonymiseIp(e).toLowerCase() === anonLower
    ) {
      return true;
    }
  }
  return false;
}

export async function addIgnoredIp(rawIp: string): Promise<string[]> {
  const clean = rawIp.trim();
  if (!clean) return getIgnoredIps();
  const redis = await getRedis();
  if (redis) {
    await redis.sadd(IGNORED_IPS_KEY, clean);
  } else {
    getMemIgnoredIps().add(clean);
  }
  return getIgnoredIps();
}

export async function removeIgnoredIp(rawIp: string): Promise<string[]> {
  const clean = rawIp.trim();
  const redis = await getRedis();
  if (redis) {
    await redis.srem(IGNORED_IPS_KEY, clean);
  } else {
    getMemIgnoredIps().delete(clean);
  }
  return getIgnoredIps();
}

export async function recordEvent(
  input: Omit<AnalyticsEvent, "id">
): Promise<void> {
  const event: AnalyticsEvent = {
    ...input,
    id: `${input.ts.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
  };
  const redis = await getRedis();
  if (redis) {
    await Promise.all([
      redis.lpush(EVENTS_KEY, JSON.stringify(event)),
      redis.ltrim(EVENTS_KEY, 0, MAX_STORED_EVENTS - 1),
    ]);
  } else {
    const store = getMemEvents();
    store.unshift(event);
    if (store.length > MAX_STORED_EVENTS) store.pop();
  }
}

export async function resetAnalyticsData(): Promise<void> {
  const redis = await getRedis();
  if (redis) {
    await redis.del(EVENTS_KEY);
  } else {
    globalStore.__mmAnalyticsEvents = [];
  }
}

export async function getAnalyticsPayload(
  currentRawIp: string
): Promise<AnalyticsPayload> {
  const redis = await getRedis();
  const ignoredIps = await getIgnoredIps();
  const ignoredSet = new Set(
    ignoredIps.flatMap((ip) => [
      ip.trim().toLowerCase(),
      anonymiseIp(ip).toLowerCase(),
    ])
  );

  let rawEvents: AnalyticsEvent[] = [];
  if (redis) {
    const rows = (await redis.lrange(
      EVENTS_KEY,
      0,
      MAX_STORED_EVENTS - 1
    )) as unknown[];
    rawEvents = rows
      .map((r) => {
        try {
          return (typeof r === "string" ? JSON.parse(r) : r) as AnalyticsEvent;
        } catch {
          return null;
        }
      })
      .filter((e): e is AnalyticsEvent => Boolean(e && e.ts));
  } else {
    rawEvents = [...getMemEvents()];
  }

  const filtered = rawEvents.filter((ev) => {
    const ip = (ev.ip ?? "").trim().toLowerCase();
    if (isLocalhostIp(ip)) return false;
    if (ignoredSet.has(ip)) return false;
    return true;
  });

  return {
    events: filtered,
    totalStored: rawEvents.length,
    ignoredIps,
    currentIp: currentRawIp,
    usingRedis: Boolean(redis),
  };
}
