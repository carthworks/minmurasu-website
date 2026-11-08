import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Interactive ROI & Growth Calculator",
  description:
    "Calculate your business growth potential, monthly lead volume, and recovered revenue using MIN MURASU's high-speed web engineering, SEO, and instant WhatsApp automation model.",
  alternates: {
    canonical: `${siteConfig.url}/roi-calculator`,
  },
  openGraph: {
    title: "Interactive ROI & Growth Calculator | MIN MURASU",
    description:
      "See the measurable impact of sub-second page speed, high-intent search, and instant WhatsApp lead response on your monthly enquiries and revenue.",
    url: `${siteConfig.url}/roi-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RoiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

