import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth System | Predictable Construction & B2B Growth Engine | MIN MURASU",
  description:
    "Interactive client demonstration of the 6-Step Construction Growth Engine. Systematic client acquisition architecture for commercial builders, EPC, and infrastructure firms.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GrowthSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

