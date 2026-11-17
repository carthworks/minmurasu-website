import AttributionCapture from "@/components/layout/AttributionCapture";
import CookieConsent from "@/components/layout/CookieConsent";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileActionBar from "@/components/layout/MobileActionBar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import DrumPageLoader from "@/components/ui/DrumPageLoader";
import { siteConfig } from "@/lib/site-config";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: siteConfig.brand.colors.navy,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.shortDescription,
  alternates: {
    canonical: "/",
  },
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.url,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.shortDescription,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.brand.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.shortDescription,
    images: [siteConfig.brand.ogImage],
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
  // Fallbacks keep tracking working when the env vars are missing on the host.
  const gaId = siteConfig.analytics.gaId || "G-8WV1Z3BFDY";
  const gtmId = siteConfig.analytics.gtmId || "GTM-NKVF5CCQ";

  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLMs.txt" />
      </head>
      <body
        className="min-h-full flex flex-col bg-white text-[#475569] antialiased"
        suppressHydrationWarning
      >
        <DrumPageLoader />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#0D2040] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
        >
          Skip to main content
        </a>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
        <WhatsAppFloat />
        <Suspense fallback={null}>
          <AttributionCapture />
        </Suspense>
        {/* GA4 and GTM load only inside CookieConsent, after opt-in. */}
        <CookieConsent gaId={gaId} gtmId={gtmId} />
      </body>
    </html>
  );
}
