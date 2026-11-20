import type { Metadata } from "next";

// The contact page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contact Us | Digital Marketing Agency in Coimbatore",
  description:
    "Talk to MIN MURASU, a Coimbatore digital marketing agency, about SEO, Google & Meta Ads, websites, AI search and WhatsApp automation. Call, WhatsApp or send an enquiry.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
