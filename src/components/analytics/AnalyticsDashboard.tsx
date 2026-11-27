"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  Download,
  Eye,
  Filter,
  Globe,
  LogOut,
  Mail,
  MessageCircle,
  Monitor,
  MousePointerClick,
  Phone,
  RefreshCw,
  Search,
  Send,
  Share2,
  Shield,
  Smartphone,
  Tablet,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type {
  AnalyticsEvent,
  AnalyticsEventType,
  AnalyticsPayload,
} from "@/lib/first-party-analytics";

type RangeKey = "24h" | "7d" | "30d" | "90d" | "all";
type TrendMetric = "pageviews" | "visitors" | "leads";

const RANGE_OPTIONS: Array<{ key: RangeKey; label: string; ms: number | null }> =
  [
    { key: "24h", label: "24h", ms: 24 * 60 * 60 * 1000 },
    { key: "7d", label: "7 Days", ms: 7 * 24 * 60 * 60 * 1000 },
    { key: "30d", label: "30 Days", ms: 30 * 24 * 60 * 60 * 1000 },
    { key: "90d", label: "90 Days", ms: 90 * 24 * 60 * 60 * 1000 },
    { key: "all", label: "All Time", ms: null },
  ];

const LEAD_TYPES = new Set<AnalyticsEventType>([
  "whatsapp",
  "enquiry",
  "phone",
  "email",
  "cta",
  "social",
]);

function friendlyPageName(path: string): string {
  if (path === "/" || !path) return "Homepage";
  const map: Record<string, string> = {
    "/contact": "Contact & Consultation",
    "/about": "About Us",
    "/services": "Services",
    "/industries": "Industries",
    "/work": "Work & Case Studies",
    "/blog": "Blog",
    "/pricing": "Pricing",
  };
  if (map[path]) return map[path];
  const seg = path
    .replace(/^\//, "")
    .split("/")
    .map((s) =>
      s
        .split("-")
        .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
        .join(" ")
    )
    .join(" · ");
  return seg || path;
}

function eventBadgeStyle(type: AnalyticsEventType): {
  label: string;
  classes: string;
} {
  switch (type) {
    case "whatsapp":
      return {
        label: "WhatsApp",
        classes: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      };
    case "enquiry":
      return {
        label: "Enquiry Sent",
        classes: "bg-rose-50 text-rose-700 border border-rose-200",
      };
    case "phone":
      return {
        label: "Phone Call",
        classes: "bg-sky-50 text-sky-700 border border-sky-200",
      };
    case "email":
      return {
        label: "Email",
        classes: "bg-amber-50 text-amber-700 border border-amber-200",
      };
    case "cta":
      return {
        label: "Contact CTA",
        classes: "bg-orange-50 text-orange-700 border border-orange-200",
      };
    case "social":
      return {
        label: "Social",
        classes: "bg-purple-50 text-purple-700 border border-purple-200",
      };
    default:
      return {
        label: "Pageview",
        classes: "bg-slate-100 text-slate-700 border border-slate-200",
      };
  }
}

function formatEventTime(ts: number): string {
  return new Date(ts).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDayKey(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDayLabel(dayKey: string): string {
  const [y, m, d] = dayKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

function tally(items: string[]): Array<{ label: string; count: number }> {
  const map = new Map<string, number>();
  for (const item of items) {
    map.set(item, (map.get(item) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export default function AnalyticsDashboard({
  initialData,
}: {
  initialData: AnalyticsPayload;
}) {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsPayload>(initialData);
  const [range, setRange] = useState<RangeKey>("30d");
  const [trendMetric, setTrendMetric] = useState<TrendMetric>("pageviews");
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState<"all" | AnalyticsEventType>(
    "all"
  );
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);
  const [customIp, setCustomIp] = useState("");
  const [ignoringBrowser, setIgnoringBrowser] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIgnoringBrowser(
        window.localStorage.getItem("mm_ignore_analytics") === "1"
      );
    } catch {
      // ignore
    }
  }, []);

  function toggleIgnoreBrowser() {
    try {
      const next = !ignoringBrowser;
      if (next) {
        window.localStorage.setItem("mm_ignore_analytics", "1");
      } else {
        window.localStorage.removeItem("mm_ignore_analytics");
      }
      setIgnoringBrowser(next);
    } catch {
      // ignore
    }
  }

  async function refreshData() {
    setBusy("refresh");
    try {
      const res = await fetch("/api/analytics/manage", { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (res.ok) {
        setData((await res.json()) as AnalyticsPayload);
      }
    } finally {
      setBusy(null);
    }
  }

  async function manageAction(
    action: "exclude_ip" | "remove_ip" | "reset",
    ip?: string
  ) {
    if (
      action === "reset" &&
      !window.confirm(
        "Reset all recorded analytics events? This cannot be undone."
      )
    ) {
      return;
    }
    setBusy(action);
    try {
      const res = await fetch("/api/analytics/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ip }),
      });
      if (res.ok) {
        setData((await res.json()) as AnalyticsPayload);
        if (action === "exclude_ip") setCustomIp("");
      }
    } finally {
      setBusy(null);
    }
  }

  async function handleSignOut() {
    setBusy("logout");
    await fetch("/api/analytics/auth", { method: "DELETE" }).catch(() => {});
    router.refresh();
  }

  // Filter events by selected time range
  const rangeEvents = useMemo(() => {
    const opt = RANGE_OPTIONS.find((o) => o.key === range);
    if (!opt || opt.ms === null) return data.events;
    const cutoff = Date.now() - opt.ms;
    return data.events.filter((e) => e.ts >= cutoff);
  }, [data.events, range]);

  const pageviews = useMemo(
    () => rangeEvents.filter((e) => e.type === "pageview"),
    [rangeEvents]
  );

  const leadEvents = useMemo(
    () => rangeEvents.filter((e) => LEAD_TYPES.has(e.type)),
    [rangeEvents]
  );

  // Core KPIs
  const kpis = useMemo(() => {
    const visitorSet = new Set<string>();
    const sessionPageCounts = new Map<string, number>();

    for (const ev of rangeEvents) {
      const vid = ev.visitorId || ev.ip;
      visitorSet.add(vid);
      const sid = ev.sessionId || `${vid}:${formatDayKey(ev.ts)}`;
      if (ev.type === "pageview") {
        sessionPageCounts.set(sid, (sessionPageCounts.get(sid) ?? 0) + 1);
      } else if (!sessionPageCounts.has(sid)) {
        sessionPageCounts.set(sid, 0);
      }
    }

    const totalPageviews = pageviews.length;
    const uniqueVisitors = visitorSet.size;
    const sessions = sessionPageCounts.size;
    const leadActions = leadEvents.length;
    const convRate =
      uniqueVisitors > 0 ? Math.round((leadActions / uniqueVisitors) * 100) : 0;
    const pagesPerSession =
      sessions > 0 ? Number((totalPageviews / sessions).toFixed(1)) : 0;
    const singlePageSessions = Array.from(sessionPageCounts.values()).filter(
      (c) => c === 1
    ).length;
    const bounceRate =
      sessions > 0 ? Math.round((singlePageSessions / sessions) * 100) : 0;

    return {
      totalPageviews,
      uniqueVisitors,
      sessions,
      leadActions,
      convRate,
      pagesPerSession,
      bounceRate,
    };
  }, [rangeEvents, pageviews, leadEvents]);

  // Daily trend buckets
  const trendBuckets = useMemo(() => {
    const days =
      range === "24h"
        ? 1
        : range === "7d"
          ? 7
          : range === "90d"
            ? 30
            : 30;
    const keys: string[] = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      keys.push(formatDayKey(d.getTime()));
    }

    const bucketMap = new Map<
      string,
      { pageviews: number; visitors: Set<string>; leads: number }
    >();
    for (const k of keys) {
      bucketMap.set(k, { pageviews: 0, visitors: new Set(), leads: 0 });
    }

    for (const ev of rangeEvents) {
      const k = formatDayKey(ev.ts);
      const b = bucketMap.get(k);
      if (!b) continue;
      if (ev.type === "pageview") b.pageviews += 1;
      if (LEAD_TYPES.has(ev.type)) b.leads += 1;
      b.visitors.add(ev.visitorId || ev.ip);
    }

    return keys.map((k) => {
      const b = bucketMap.get(k)!;
      const value =
        trendMetric === "pageviews"
          ? b.pageviews
          : trendMetric === "visitors"
            ? b.visitors.size
            : b.leads;
      return { key: k, label: formatDayLabel(k), value };
    });
  }, [rangeEvents, range, trendMetric]);

  const maxTrendValue = Math.max(1, ...trendBuckets.map((b) => b.value));

  // Lead action counts
  const leadCounts = useMemo(() => {
    const counts = {
      whatsapp: 0,
      enquiry: 0,
      phone: 0,
      email: 0,
      cta: 0,
      social: 0,
    };
    for (const ev of leadEvents) {
      if (ev.type in counts) {
        counts[ev.type as keyof typeof counts] += 1;
      }
    }
    return counts;
  }, [leadEvents]);

  // Top pages
  const topPages = useMemo(() => {
    const map = new Map<string, { views: number; visitors: Set<string> }>();
    for (const ev of pageviews) {
      const entry = map.get(ev.path) ?? { views: 0, visitors: new Set() };
      entry.views += 1;
      entry.visitors.add(ev.visitorId || ev.ip);
      map.set(ev.path, entry);
    }
    const total = Math.max(1, pageviews.length);
    return Array.from(map.entries())
      .map(([path, v]) => ({
        path,
        name: friendlyPageName(path),
        views: v.views,
        visitors: v.visitors.size,
        share: Math.round((v.views / total) * 100),
      }))
      .sort((a, b) => b.views - a.views);
  }, [pageviews]);

  // Breakdowns (from pageviews, falling back to all rangeEvents if no pageviews)
  const breakdownBase = pageviews.length > 0 ? pageviews : rangeEvents;
  const sources = useMemo(
    () => tally(breakdownBase.map((e) => e.source || "Direct")),
    [breakdownBase]
  );
  const devices = useMemo(
    () =>
      tally(
        breakdownBase.map((e) => {
          const d = e.device || "desktop";
          return d[0].toUpperCase() + d.slice(1);
        })
      ),
    [breakdownBase]
  );
  const browsers = useMemo(
    () => tally(breakdownBase.map((e) => e.browser || "Unknown")),
    [breakdownBase]
  );
  const operatingSystems = useMemo(
    () => tally(breakdownBase.map((e) => e.os || "Unknown")),
    [breakdownBase]
  );
  const locations = useMemo(
    () =>
      tally(
        breakdownBase.map((e) => {
          if (e.city && e.country) return `${e.city}, ${e.country}`;
          if (e.country) return e.country;
          if (e.timezone) return e.timezone;
          return "Unknown";
        })
      ),
    [breakdownBase]
  );

  // Recent Activity table filtering + pagination
  const filteredActivity = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rangeEvents.filter((ev) => {
      if (eventFilter !== "all" && ev.type !== eventFilter) return false;
      if (!q) return true;
      return [
        ev.type,
        ev.label,
        ev.detail,
        ev.path,
        ev.source,
        ev.referrer,
        ev.device,
        ev.browser,
        ev.os,
        ev.city,
        ev.country,
        ev.ip,
      ]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q));
    });
  }, [rangeEvents, eventFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredActivity.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedActivity = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredActivity.slice(start, start + pageSize);
  }, [filteredActivity, currentPage, pageSize]);

  const rangeStart =
    filteredActivity.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, filteredActivity.length);

  function exportCsv() {
    const headers = [
      "timestamp",
      "event",
      "lead_from",
      "path",
      "detail",
      "source",
      "utm_campaign",
      "device",
      "browser",
      "os",
      "city",
      "country",
      "ip",
    ];
    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = filteredActivity.map((e: AnalyticsEvent) =>
      [
        new Date(e.ts).toISOString(),
        e.type,
        e.label ?? "",
        e.path,
        e.detail ?? "",
        e.source,
        e.utmCampaign ?? "",
        e.device,
        e.browser,
        e.os,
        e.city ?? "",
        e.country ?? "",
        e.ip,
      ]
        .map(esc)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `minmurasu-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function DeviceIcon({ label }: { label: string }) {
    const lower = label.toLowerCase();
    if (lower === "mobile") return <Smartphone className="w-3.5 h-3.5 text-slate-500" />;
    if (lower === "tablet") return <Tablet className="w-3.5 h-3.5 text-slate-500" />;
    return <Monitor className="w-3.5 h-3.5 text-slate-500" />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header Card */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D2040] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  <Shield className="w-3 h-3" />
                  Hidden Analytics
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      data.usingRedis ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  Storage:{" "}
                  <strong className="text-slate-800">
                    {data.usingRedis ? "Upstash Redis" : "In-Memory"}
                  </strong>
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#0D2040]">
                MIN MURASU Web Analytics
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                First-party traffic, page performance, and agency lead conversions
                (no cookies, no third-party trackers).
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              {/* Time Range Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                  {RANGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setRange(opt.key);
                        setPage(1);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        range === opt.key
                          ? "bg-[#0D2040] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={refreshData}
                  disabled={busy === "refresh"}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${busy === "refresh" ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={exportCsv}
                  disabled={filteredActivity.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 text-xs font-medium text-rose-700 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Traffic Filters Bar */}
        <section className="rounded-2xl border border-slate-200/80 bg-white px-5 py-3.5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                Traffic Filters:
              </span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                localhost / 127.0.0.1 excluded
              </span>
              <button
                type="button"
                onClick={toggleIgnoreBrowser}
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                  ignoringBrowser
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {ignoringBrowser
                  ? "This browser excluded ✓"
                  : "Exclude this browser"}
              </button>
              <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-[11px] text-slate-600 font-mono">
                Your IP: {data.currentIp}
              </span>
              <button
                type="button"
                onClick={() => manageAction("exclude_ip", data.currentIp)}
                disabled={busy === "exclude_ip"}
                className="rounded-lg bg-[#0D2040] hover:bg-[#16305E] px-2.5 py-1 text-[11px] font-semibold text-white transition-colors"
              >
                Exclude My Current IP
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (customIp.trim()) manageAction("exclude_ip", customIp.trim());
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                value={customIp}
                onChange={(e) => setCustomIp(e.target.value)}
                placeholder="Exclude another IP..."
                className="w-40 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 placeholder-slate-400 focus:border-[#0D2040] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={!customIp.trim() || busy === "exclude_ip"}
                className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors"
              >
                + Exclude IP
              </button>
            </form>
          </div>

          {data.ignoredIps.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2.5 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 mr-1">
                Excluded IPs:
              </span>
              {data.ignoredIps.map((ip) => (
                <span
                  key={ip}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-700"
                >
                  {ip}
                  <button
                    type="button"
                    onClick={() => manageAction("remove_ip", ip)}
                    className="text-slate-400 hover:text-rose-600"
                    aria-label={`Remove ${ip}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Persistence Tip Banner (when Redis is unset) */}
        {!data.usingRedis && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-3 text-xs text-amber-900">
            <strong>Persistence tip:</strong> This deployment is currently using
            temporary in-memory storage. Add{" "}
            <code className="font-mono font-semibold">
              UPSTASH_REDIS_REST_URL
            </code>{" "}
            and{" "}
            <code className="font-mono font-semibold">
              UPSTASH_REDIS_REST_TOKEN
            </code>{" "}
            in Vercel Environment Variables to persist analytics history across
            deployments.
          </div>
        )}

        {/* 6 KPI Cards */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[
            {
              label: "Pageviews",
              value: kpis.totalPageviews.toLocaleString(),
              sub: "Total pages viewed",
              icon: Eye,
              subClass: "text-slate-500",
            },
            {
              label: "Unique Visitors",
              value: kpis.uniqueVisitors.toLocaleString(),
              sub: "Distinct browsers",
              icon: Users,
              subClass: "text-slate-500",
            },
            {
              label: "Sessions",
              value: kpis.sessions.toLocaleString(),
              sub: "Active site visits",
              icon: Activity,
              subClass: "text-slate-500",
            },
            {
              label: "Lead Actions",
              value: kpis.leadActions.toLocaleString(),
              sub: `${kpis.convRate}% visitor conv. rate`,
              icon: MousePointerClick,
              subClass: "text-emerald-600 font-medium",
            },
            {
              label: "Pages / Session",
              value: String(kpis.pagesPerSession),
              sub: "Avg. browsing depth",
              icon: TrendingUp,
              subClass: "text-slate-500",
            },
            {
              label: "Bounce Rate",
              value: `${kpis.bounceRate}%`,
              sub: "Single-page sessions",
              icon: BarChart3,
              subClass: "text-slate-500",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-medium">{card.label}</span>
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-2xl font-bold text-[#0D2040] tabular-nums">
                  {card.value}
                </div>
                <div className={`text-[11px] mt-1 ${card.subClass}`}>
                  {card.sub}
                </div>
              </div>
            );
          })}
        </section>

        {/* Traffic Trend + Agency Lead Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Traffic Trend Chart */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-sm font-bold text-[#0D2040]">
                  Traffic Trend
                </h2>
                <p className="text-xs text-slate-500">
                  Daily activity over selected range
                </p>
              </div>
              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-0.5 text-xs">
                {(
                  [
                    { key: "pageviews", label: "Pageviews" },
                    { key: "visitors", label: "Visitors" },
                    { key: "leads", label: "Leads" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setTrendMetric(tab.key)}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      trendMetric === tab.key
                        ? "bg-[#F58220] text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-52 flex items-end gap-1 pt-4 border-b border-dashed border-slate-200">
              {trendBuckets.map((b) => {
                const pct = b.value > 0 ? Math.max(8, (b.value / maxTrendValue) * 100) : 0;
                return (
                  <div
                    key={b.key}
                    className="flex-1 h-full flex flex-col justify-end group relative"
                    title={`${b.label}: ${b.value} ${trendMetric}`}
                  >
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        b.value > 0
                          ? "bg-[#F58220] group-hover:bg-[#0D2040]"
                          : "bg-slate-100 h-[2px]"
                      }`}
                      style={b.value > 0 ? { height: `${pct}%` } : undefined}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-2">
              <span>{trendBuckets[0]?.label}</span>
              <span>
                {trendBuckets[Math.floor(trendBuckets.length / 2)]?.label}
              </span>
              <span>{trendBuckets[trendBuckets.length - 1]?.label}</span>
            </div>
          </div>

          {/* Agency Lead Actions */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <h2 className="text-sm font-bold text-[#0D2040]">
              Agency Lead Actions
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Tracked clicks &amp; form submissions
            </p>
            <div className="space-y-2.5">
              {[
                {
                  label: "WhatsApp Clicks",
                  count: leadCounts.whatsapp,
                  icon: MessageCircle,
                  badge: "bg-emerald-50 text-emerald-600",
                },
                {
                  label: "Contact Form Enquiries",
                  count: leadCounts.enquiry,
                  icon: Send,
                  badge: "bg-rose-50 text-rose-600",
                },
                {
                  label: "Phone Call Clicks",
                  count: leadCounts.phone,
                  icon: Phone,
                  badge: "bg-sky-50 text-sky-600",
                },
                {
                  label: "Email Clicks",
                  count: leadCounts.email,
                  icon: Mail,
                  badge: "bg-amber-50 text-amber-600",
                },
                {
                  label: "Book / Contact CTA Clicks",
                  count: leadCounts.cta,
                  icon: MousePointerClick,
                  badge: "bg-orange-50 text-orange-600",
                },
                {
                  label: "Social & External Clicks",
                  count: leadCounts.social,
                  icon: Share2,
                  badge: "bg-purple-50 text-purple-600",
                },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${row.badge}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-medium text-slate-700">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#0D2040] tabular-nums">
                      {row.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top Pages + Traffic Sources */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-sm font-bold text-[#0D2040]">Top Pages</h2>
              <span className="text-[11px] text-slate-400">
                By total pageviews
              </span>
            </div>
            {topPages.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">
                No pageviews recorded in this range yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="pb-2 font-semibold">Page</th>
                      <th className="pb-2 font-semibold text-right">Views</th>
                      <th className="pb-2 font-semibold text-right">Visitors</th>
                      <th className="pb-2 font-semibold text-right w-32">
                        Share
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topPages.slice(0, 8).map((p) => (
                      <tr key={p.path}>
                        <td className="py-2.5 pr-3">
                          <div className="font-semibold text-slate-800">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {p.path}
                          </div>
                        </td>
                        <td className="py-2.5 text-right font-semibold text-[#0D2040] tabular-nums">
                          {p.views}
                        </td>
                        <td className="py-2.5 text-right text-slate-500 tabular-nums">
                          {p.visitors}
                        </td>
                        <td className="py-2.5 pl-4">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#F58220]"
                                style={{ width: `${Math.max(6, p.share)}%` }}
                              />
                            </div>
                            <span className="text-[11px] text-slate-500 tabular-nums w-8 text-right">
                              {p.share}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-sm font-bold text-[#0D2040]">
                Traffic Sources
              </h2>
              <span className="text-[11px] text-slate-400">Referrers / UTM</span>
            </div>
            {sources.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {sources.slice(0, 8).map((s) => {
                  const pct = Math.round(
                    (s.count / Math.max(1, breakdownBase.length)) * 100
                  );
                  return (
                    <div key={s.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 truncate">
                          {s.label}
                        </span>
                        <span className="text-slate-500 tabular-nums">
                          <strong className="text-[#0D2040]">{s.count}</strong>{" "}
                          ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#0D2040]"
                          style={{ width: `${Math.max(6, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 4-Column Row: Devices, Browsers, OS, Locations */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Devices",
              subtitle: "",
              items: devices,
              barClass: "bg-[#F58220]",
              isDevice: true,
            },
            {
              title: "Browsers",
              subtitle: "",
              items: browsers,
              barClass: "bg-[#0D2040]",
              isDevice: false,
            },
            {
              title: "Operating Systems",
              subtitle: "",
              items: operatingSystems,
              barClass: "bg-[#0D2040]",
              isDevice: false,
            },
            {
              title: "Locations",
              subtitle: "Via Vercel Geo",
              items: locations,
              barClass: "bg-[#0082CA]",
              isDevice: false,
            },
          ].map((col) => (
            <div
              key={col.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
            >
              <div className="flex items-baseline justify-between mb-3.5">
                <h2 className="text-sm font-bold text-[#0D2040]">
                  {col.title}
                </h2>
                {col.subtitle && (
                  <span className="text-[10px] text-slate-400">
                    {col.subtitle}
                  </span>
                )}
              </div>
              {col.items.length === 0 ? (
                <p className="text-xs text-slate-400">No data yet</p>
              ) : (
                <div className="space-y-2.5">
                  {col.items.slice(0, 5).map((item) => {
                    const pct = Math.round(
                      (item.count / Math.max(1, breakdownBase.length)) * 100
                    );
                    return (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 truncate">
                            {col.isDevice ? (
                              <DeviceIcon label={item.label} />
                            ) : col.title === "Locations" ? (
                              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            ) : null}
                            <span className="truncate">{item.label}</span>
                          </span>
                          <span className="text-[11px] text-slate-500 tabular-nums shrink-0 ml-2">
                            <strong className="text-[#0D2040]">
                              {item.count}
                            </strong>{" "}
                            ({pct}%)
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${col.barClass}`}
                            style={{ width: `${Math.max(6, pct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Recent Activity Table */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#0D2040]">
                Recent Activity
              </h2>
              <p className="text-xs text-slate-500">
                {filteredActivity.length} matching events ({data.totalStored}{" "}
                total stored, excluding localhost &amp; ignored IPs)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search path, source, device, city..."
                  className="w-56 rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:border-[#0D2040] focus:bg-white focus:outline-none"
                />
              </div>

              <select
                value={eventFilter}
                onChange={(e) => {
                  setEventFilter(
                    e.target.value as "all" | AnalyticsEventType
                  );
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-[#0D2040] focus:outline-none"
              >
                <option value="all">All Events</option>
                <option value="pageview">Pageviews</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="enquiry">Enquiry Sent</option>
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
                <option value="cta">Contact CTA</option>
                <option value="social">Social</option>
              </select>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-[#0D2040] focus:outline-none"
              >
                {[15, 25, 50].map((size) => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => manageAction("reset")}
                disabled={busy === "reset" || data.totalStored === 0}
                className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 px-2.5 py-1.5 text-xs font-medium text-rose-700 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset Data
              </button>
            </div>
          </div>

          {filteredActivity.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">
              No matching events yet.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="py-2.5 px-2 font-semibold">Event</th>
                      <th className="py-2.5 px-2 font-semibold">Lead From</th>
                      <th className="py-2.5 px-2 font-semibold">
                        Page / Detail
                      </th>
                      <th className="py-2.5 px-2 font-semibold">Source</th>
                      <th className="py-2.5 px-2 font-semibold">Device</th>
                      <th className="py-2.5 px-2 font-semibold text-right">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedActivity.map((ev) => {
                      const badge = eventBadgeStyle(ev.type);
                      const deviceMeta = [
                        ev.device
                          ? ev.device[0].toUpperCase() + ev.device.slice(1)
                          : "Desktop",
                        ev.browser,
                        ev.city || ev.country || ev.os,
                      ]
                        .filter(Boolean)
                        .join(" · ");
                      return (
                        <tr
                          key={ev.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-2.5 px-2 whitespace-nowrap">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badge.classes}`}
                            >
                              {badge.label}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 font-medium text-slate-800 whitespace-nowrap">
                            {ev.label || "—"}
                          </td>
                          <td
                            className="py-2.5 px-2 text-slate-600 max-w-xs truncate"
                            title={`${ev.path}${ev.detail ? ` — ${ev.detail}` : ""}`}
                          >
                            <span className="font-mono text-slate-700">
                              {ev.path}
                            </span>
                            {ev.detail && (
                              <span className="text-slate-400">
                                {" "}
                                — {ev.detail}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-2 text-slate-600 whitespace-nowrap">
                            {ev.source || "Direct"}
                          </td>
                          <td
                            className="py-2.5 px-2 text-slate-500 whitespace-nowrap"
                            title={`IP: ${ev.ip}${ev.timezone ? ` · ${ev.timezone}` : ""}`}
                          >
                            {deviceMeta}
                          </td>
                          <td className="py-2.5 px-2 text-right text-slate-500 whitespace-nowrap tabular-nums">
                            {formatEventTime(ev.ts)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
                <span>
                  Showing{" "}
                  <strong className="text-slate-800">
                    {rangeStart}–{rangeEnd}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-slate-800">
                    {filteredActivity.length}
                  </strong>{" "}
                  events
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPage(1)}
                    disabled={currentPage <= 1}
                    className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-2.5 py-1 transition-colors"
                  >
                    First
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-2.5 py-1 transition-colors"
                  >
                    ‹ Prev
                  </button>
                  <span className="px-2 font-medium text-slate-700 tabular-nums">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage >= totalPages}
                    className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-2.5 py-1 transition-colors"
                  >
                    Next ›
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage(totalPages)}
                    disabled={currentPage >= totalPages}
                    className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 px-2.5 py-1 transition-colors"
                  >
                    Last
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
