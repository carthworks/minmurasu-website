import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Free 30-Minute Growth Consultation",
  description:
    "Schedule a complimentary 30-minute Digital Growth, SEO, Web Engineering, and AI Automation consultation with MIN MURASU Founder Karthikeyan T.",
  alternates: {
    canonical: `${siteConfig.url}/book`,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    siteName: siteConfig.name,
    url: `${siteConfig.url}/book`,
    title: "Book a Free 30-Minute Growth Consultation | MIN MURASU",
    description:
      "Schedule a complimentary 30-minute Digital Growth, SEO, Web Engineering, and AI Automation consultation with MIN MURASU.",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: "Book a Free 30-Minute Growth Consultation | MIN MURASU",
    description:
      "Schedule a complimentary 30-minute Digital Growth, SEO, Web Engineering, and AI Automation consultation with MIN MURASU.",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

