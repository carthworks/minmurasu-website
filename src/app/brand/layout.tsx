import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Brand Identity, Logos & Media Kit",
  description:
    "Official brand assets, logos, color codes, typography, boilerplates, and media guidelines for MIN MURASU (மின் முரசு) — The Digital Drum.",
  alternates: {
    canonical: `${siteConfig.url}/brand`,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    siteName: siteConfig.name,
    title: "Brand Identity, Logos & Media Kit | MIN MURASU",
    description:
      "Official brand assets, logos, color codes, typography, and press boilerplates for MIN MURASU.",
    url: `${siteConfig.url}/brand`,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: "Brand Identity, Logos & Media Kit | MIN MURASU",
    description:
      "Official brand assets, logos, color codes, typography, and press boilerplates for MIN MURASU.",
  },
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

