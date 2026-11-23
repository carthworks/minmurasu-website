import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// The contact page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contact Us | Digital Marketing Agency in Coimbatore",
  description:
    "Talk to MIN MURASU, a Coimbatore digital marketing agency, about SEO, Google & Meta Ads, websites, AI search and WhatsApp automation. Call, WhatsApp or send an enquiry.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    siteName: siteConfig.name,
    url: `${siteConfig.url}/contact`,
    title: "Contact Us | MIN MURASU",
    description:
      "Talk to MIN MURASU about SEO, Google & Meta Ads, websites, AI search and WhatsApp automation. Call, WhatsApp or send an enquiry.",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: "Contact Us | MIN MURASU",
    description:
      "Talk to MIN MURASU about SEO, Google & Meta Ads, websites, AI search and WhatsApp automation.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
