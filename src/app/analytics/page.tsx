import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { getAnalyticsPayload } from "@/lib/first-party-analytics";
import {
  ANALYTICS_COOKIE_NAME,
  isAnalyticsSecretConfigured,
  verifySessionToken,
} from "@/lib/analytics-auth";
import AnalyticsLogin from "@/components/analytics/AnalyticsLogin";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Hidden Analytics",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ANALYTICS_COOKIE_NAME)?.value;
  const isAuthed = await verifySessionToken(token);

  if (!isAuthed) {
    return <AnalyticsLogin configured={isAnalyticsSecretConfigured()} />;
  }

  const hdrs = await headers();
  const rawIp =
    (hdrs.get("x-forwarded-for") ?? hdrs.get("x-real-ip") ?? "127.0.0.1")
      .split(",")[0]
      .trim();

  const initialData = await getAnalyticsPayload(rawIp);
  return <AnalyticsDashboard initialData={initialData} />;
}
