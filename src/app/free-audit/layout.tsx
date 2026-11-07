import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Free Digital Presence & SEO Audit",
  description:
    "Request a complimentary 5-point Digital Presence, SEO, AI Search (GEO), and Conversion Audit for your business from MIN MURASU.",
  alternates: {
    canonical: `${siteConfig.url}/free-audit`,
  },
};

export default function FreeAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

