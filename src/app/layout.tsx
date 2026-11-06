import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import CookieConsent from "@/components/layout/CookieConsent";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    <html lang="en" className="h-full">
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
