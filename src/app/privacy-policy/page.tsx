import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | MIN MURASU",
  description: "Our policies regarding data privacy, enquiry handling, and compliance.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <Container className="max-w-4xl">
        <SectionHeading
          align="left"
          eyebrow="Legal &amp; Compliance"
          title="Privacy Policy"
          description={`Last updated: November 2026. Official privacy policy for ${siteConfig.name}.`}
        />

        <div className="prose prose-slate max-w-none text-sm text-[#475569] space-y-6 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">1. Overview</h2>
            <p>
              MIN MURASU (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), headquartered in Coimbatore, Tamil Nadu,
              is committed to protecting your privacy and managing business data responsibly. This Privacy Policy outlines
              how we collect, use, and protect information when you visit our website ({siteConfig.url}) or submit an enquiry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">2. Information We Collect</h2>
            <p>We collect only the information necessary to evaluate and respond to commercial project enquiries:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Information:</strong> Name, business email, telephone/WhatsApp number.</li>
              <li><strong>Company Details:</strong> Company name, existing website URL, and primary business sector.</li>
              <li><strong>Project Scope:</strong> Service interest, project objectives, and budget expectations.</li>
              <li><strong>Technical Data:</strong> Aggregated, non-personally identifiable analytics data via GA4 and Google Tag Manager (e.g. browser type, general geography, referring pages).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">3. How We Use Your Information</h2>
            <p>Your details are used exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reviewing your website and digital presence prior to scheduled consultations.</li>
              <li>Contacting you via WhatsApp, phone, or email to discuss scopes of work.</li>
              <li>Preparing service proposals and commercial engagement agreements.</li>
              <li>Preventing spam and ensuring website technical security.</li>
            </ul>
            <p><strong>We do not sell, rent, or trade your contact data to third-party aggregators or telemarketers.</strong></p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">4. Third-Party Integrations &amp; Analytics</h2>
            <p>
              Our website uses privacy-conscious analytics tools (Google Analytics 4) to monitor website health and performance.
              We do not transmit personally identifiable information (PII) such as your name, phone number, or email to analytics platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">5. Contact Us Regarding Your Data</h2>
            <p>
              If you wish to review, update, or request the deletion of any enquiry information submitted through our website,
              please contact us directly at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p><strong>Privacy Officer, MIN MURASU</strong></p>
              <p>Email: <a href={`mailto:${siteConfig.emails.primary}`} className="text-[#0E7490] underline">{siteConfig.emails.primary}</a></p>
              <p>Secondary: <a href={`mailto:${siteConfig.emails.secondary}`} className="text-[#0E7490] underline">{siteConfig.emails.secondary}</a></p>
              <p>Phone: {siteConfig.phones.primary}</p>
              <p>Coimbatore, Tamil Nadu, India</p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

