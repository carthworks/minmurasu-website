import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Brand Identity, Logos & Media Kit | MIN MURASU",
  description:
    "Official brand assets, logos, color codes, typography, boilerplates, and media guidelines for MIN MURASU (மின் முரசு) — The Digital Drum.",
  alternates: {
    canonical: `${siteConfig.url}/brand`,
  },
  openGraph: {
    title: "Brand Identity, Logos & Media Kit | MIN MURASU",
    description:
      "Official brand assets, logos, color codes, typography, and press boilerplates for MIN MURASU.",
    url: `${siteConfig.url}/brand`,
  },
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

