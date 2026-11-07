import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Free 30-Minute Growth Consultation",
  description:
    "Schedule a complimentary 30-minute Digital Growth, SEO, Web Engineering, and AI Automation consultation with MIN MURASU Founder Karthikeyan T.",
  alternates: {
    canonical: `${siteConfig.url}/book`,
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

