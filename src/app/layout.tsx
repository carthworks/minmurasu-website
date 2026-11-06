import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import CookieConsent from "@/components/layout/CookieConsent";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: "#0D2040",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "digital marketing Coimbatore",
    "AI automation agency India",
    "B2B growth agency",
    "SEO services Coimbatore",
    "Generative Engine Optimisation",
    "web development Coimbatore",
    "lead generation Tamil Nadu",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/MIN_MURASU_business_card_preview.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/MIN_MURASU_business_card_preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-[#475569]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#0D2040] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
        >
          Skip to main content
        </a>
        <OrganizationJsonLd />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
        <CookieConsent gaId={gaId} gtmId={gtmId} />
      </body>
    </html>
  );
}
