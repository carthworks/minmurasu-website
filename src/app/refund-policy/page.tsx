import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ProtectedEmail, ProtectedPhone } from "@/components/ui/ProtectedContact";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | MIN MURASU",
  description:
    "Transparent service cancellation, retainer termination, and refund policy for MIN MURASU engagements.",
};

export default function RefundPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <Container className="max-w-4xl">
        <SectionHeading
          align="left"
          eyebrow="Commercial Transparency"
          title="Cancellation &amp; Refund Policy"
          description={`Last updated: November 2026. Official cancellation, retainer notice, and refund terms for ${siteConfig.name}.`}
        />

        <div className="prose prose-slate max-w-none text-sm text-[#475569] space-y-6 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">
              1. Transparent Engagement Model
            </h2>
            <p>
              At {siteConfig.name}, every project or monthly growth retainer is governed by a clear
              Statement of Work (SOW) with itemized deliverables, timelines, and commercial terms
              agreed upon before any invoice is issued. We do not use hidden fees, automatic dark-pattern
              renewals, or lock-in traps.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">
              2. Project-Based Engagements (Websites, Audits &amp; AI Setup)
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Before Work Commences:</strong> If a client cancels a project in writing prior
                to the kickoff discovery session or before any engineering/strategy work has commenced,
                100% of the initial deposit (less any actual payment gateway charges) is eligible for refund.
              </li>
              <li>
                <strong>Milestone-Based Billing:</strong> Fixed-scope projects are billed across clear
                milestones (e.g., Architecture &amp; Design Approval, Staging Build, Production Launch).
                Once a milestone deliverable has been reviewed and approved, payments for completed
                milestones are non-refundable.
              </li>
              <li>
                <strong>Mid-Project Cancellation:</strong> If a project is cancelled mid-milestone, we
                prorate work completed up to the cancellation date, hand over all completed code/assets
                paid for to date, and refund any unutilized advance balance within 7 business days.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">
              3. Monthly Retainers (SEO, GEO &amp; Performance Marketing Management)
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Simple Written Notice (Click-to-Cancel Equivalent):</strong> Monthly retainers
                may be cancelled at any time by sending a direct email to{" "}
                <ProtectedEmail
                  variant="primary"
                  className="text-[#0082CA] underline font-medium"
                />{" "}
                with at least <strong>15 calendar days&apos; notice</strong> prior to the next monthly
                billing cycle. No complex cancellation calls or retention hurdles are required.
              </li>
              <li>
                <strong>Current Billing Cycle:</strong> Retainer fees for an active billing month in
                which campaign management, SEO execution, or reporting work is already underway are
                non-refundable, and service delivery continues through the end of the paid period.
              </li>
              <li>
                <strong>Full Account Handover:</strong> Upon termination, clients retain 100% ownership
                and administrative access to their Google Ads, Meta Ads, Google Analytics (GA4), Search
                Console, domain, and website repositories.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">
              4. Third-Party Media Spend &amp; Software Subscriptions
            </h2>
            <p>
              Advertising budgets paid directly to third-party platforms (such as Google Ads, Meta Ads,
              LinkedIn Ads), domain registrars, cloud hosting providers, CRM licenses, and WhatsApp
              Business API conversation fees are governed by those respective platforms&apos; refund
              policies. {siteConfig.name} does not mark up media spend and cannot issue refunds for charges
              billed directly by third-party vendors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">
              5. Refund Processing Timelines
            </h2>
            <p>
              Approved refunds are processed within <strong>5 to 7 business days</strong> via the
              original payment method (NEFT/IMPS/RTGS bank transfer or UPI/payment gateway) and confirmed
              with a formal credit note.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">
              6. How to Request a Cancellation or Billing Review
            </h2>
            <div className="p-5 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] space-y-1.5 text-slate-700">
              <p className="font-bold text-[#0D2040]">Billing &amp; Client Support — {siteConfig.name}</p>
              <p>
                <strong>Founder &amp; Escalation Contact:</strong> Karthikeyan T
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <ProtectedEmail variant="primary" className="text-[#0082CA] underline" />{" "}
                /{" "}
                <ProtectedEmail variant="secondary" className="text-[#0082CA] underline" />
              </p>
              <p>
                <strong>Phone / WhatsApp:</strong> <ProtectedPhone variant="primary" />
              </p>
              <p>
                <strong>Response SLA:</strong> Within 24 business hours (Monday – Saturday, 9:30 AM – 6:30 PM IST).
              </p>
            </div>
            <p className="text-xs text-slate-500 pt-2">
              See also our{" "}
              <Link href="/terms" className="text-[#0082CA] underline">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-[#0082CA] underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

