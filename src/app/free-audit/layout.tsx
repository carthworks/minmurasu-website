import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Free Digital Presence & SEO Audit",
  description:
    "Request a complimentary 5-point Digital Presence, SEO, AI Search (GEO), and Conversion Audit for your business from MIN MURASU.",
  alternates: {
    canonical: `${siteConfig.url}/free-audit`,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    siteName: siteConfig.name,
    url: `${siteConfig.url}/free-audit`,
    title: "Free Digital Presence & SEO Audit | MIN MURASU",
    description:
      "Request a complimentary 5-point Digital Presence, SEO, AI Search (GEO), and Conversion Audit for your business from MIN MURASU.",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: "Free Digital Presence & SEO Audit | MIN MURASU",
    description:
      "Request a complimentary 5-point Digital Presence, SEO, AI Search (GEO), and Conversion Audit for your business from MIN MURASU.",
  },
};

export default function FreeAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

