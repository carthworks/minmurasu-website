import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions | MIN MURASU",
  description: "Terms of service and commercial guidelines for MIN MURASU.",
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <Container className="max-w-4xl">
        <SectionHeading
          align="left"
          eyebrow="Commercial Terms"
          title="Terms &amp; Conditions"
          description={`Last updated: November 2026. Standard terms for ${siteConfig.name}.`}
        />

        <div className="prose prose-slate max-w-none text-sm text-[#475569] space-y-6 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">1. Acceptance of Terms</h2>
            <p>
              By accessing the website ({siteConfig.url}) or requesting services from MIN MURASU, you agree
              to be bound by these Terms and Conditions. Formal agency engagements are governed by individual
              Statements of Work (SOW) executed between MIN MURASU and the client organization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">2. Scope &amp; Commercial Transparency</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Direct Ad Spend:</strong> Advertising media spend (paid to Google, Meta, etc.) is the direct
                responsibility of the client and is paid directly to the ad platforms. Agency management fees cover campaign strategy,
                creative development, and ongoing optimisation only.
              </li>
              <li>
                <strong>Third-Party Platform Fees:</strong> WhatsApp Business API conversation charges, third-party CRM
                subscriptions, and domain/hosting charges are billed at cost directly by the respective platform vendors.
              </li>
              <li>
                <strong>No Exaggerated Guarantees:</strong> While MIN MURASU deploys verified engineering and marketing best practices,
                we do not guarantee specific Google rankings, lead quantities, or revenue totals, as third-party search algorithms,
                market competition, and client sales follow-up determine ultimate commercial conversion.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">3. Intellectual Property &amp; Asset Ownership</h2>
            <p>
              Upon receipt of full payment for agreed deliverables, clients own all custom code, graphic assets, and campaign
              structures created explicitly for their engagement. Clients always maintain 100% administrative ownership of their
              domain names, ad accounts, and analytics properties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#14243A]">4. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising from these terms
              or agency engagements are subject to the exclusive jurisdiction of the competent courts in Coimbatore, Tamil Nadu, India.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

