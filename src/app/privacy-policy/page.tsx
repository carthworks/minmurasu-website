import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ProtectedEmail, ProtectedPhone } from "@/components/ui/ProtectedContact";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
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
            <h2 className="text-lg font-bold text-[#0D2040]">1. Overview &amp; Data Controller</h2>
            <p>
              MIN MURASU (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), headquartered in Coimbatore, Tamil Nadu, India,
              is committed to protecting your privacy and managing business data responsibly in accordance with India&apos;s
              Digital Personal Data Protection Act, 2023 (DPDP Act) and international privacy standards (GDPR). This Privacy
              Policy outlines how we collect, use, store, and protect information when you visit our website ({siteConfig.url})
              or submit an enquiry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">2. Information We Collect &amp; Legal Basis</h2>
            <p>
              We practice strict data minimization and collect only the information necessary to evaluate and respond to
              commercial project enquiries (Legal basis: Explicit Consent &amp; Pre-contractual necessity):
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Information:</strong> Full name, business email address, and telephone/WhatsApp number.</li>
              <li><strong>Company Details:</strong> Company/organization name and existing website URL.</li>
              <li><strong>Project Scope:</strong> Selected service interest, project objectives, and preferred contact channel.</li>
              <li><strong>Technical &amp; Analytics Data (Opt-In Only):</strong> Aggregated, IP-anonymized telemetry via Google Analytics 4 (only loaded if you explicitly click &ldquo;Accept Analytics&rdquo; on our cookie consent banner).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">3. How We Use Your Information</h2>
            <p>Your details are used exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reviewing your website and digital presence prior to scheduled consultations.</li>
              <li>Contacting you via your preferred channel (WhatsApp, phone, or email) to discuss scopes of work.</li>
              <li>Preparing service proposals, audits, and commercial engagement agreements.</li>
              <li>Preventing automated spam and ensuring website technical security.</li>
            </ul>
            <p><strong>We never sell, rent, or trade your personal or business contact data to third-party data brokers, aggregators, or telemarketers.</strong></p>
          </section>

          <section id="cookies" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#0D2040]">4. Cookie Policy &amp; Active Disclosures</h2>
            <p>
              We do not execute non-essential tracking scripts without your prior opt-in consent. You may change or revoke
              your cookie preferences at any time using the &ldquo;Cookie Preferences&rdquo; link in our website footer.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl my-3">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[#0D2040]">
                    <th className="p-3 font-bold">Cookie / Key</th>
                    <th className="p-3 font-bold">Category</th>
                    <th className="p-3 font-bold">Provider</th>
                    <th className="p-3 font-bold">Purpose</th>
                    <th className="p-3 font-bold">Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-mono">minmurasu_cookie_consent_v1</td>
                    <td className="p-3">Strictly Necessary</td>
                    <td className="p-3">MIN MURASU</td>
                    <td className="p-3">Stores your explicit cookie opt-in/opt-out decision and timestamp.</td>
                    <td className="p-3">12 Months</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">_ga, _ga_*</td>
                    <td className="p-3">Analytics (Opt-In)</td>
                    <td className="p-3">Google Analytics 4</td>
                    <td className="p-3">Aggregated, anonymized page-view and conversion telemetry (no PII transmitted).</td>
                    <td className="p-3">Up to 14 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">5. Data Retention &amp; Sub-Processors</h2>
            <p>
              Enquiry records that do not result in a commercial engagement are retained for a maximum of <strong>12 months</strong> for
              follow-up reference and then permanently purged, or deleted immediately upon your request. Active client records are
              retained for the duration of the contract plus statutory tax/accounting retention periods under Indian law.
              Infrastructure sub-processors include cloud hosting (Vercel/AWS) and transactional email delivery (Resend/SMTP).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0D2040]">6. Your Privacy Rights &amp; Grievance Redressal</h2>
            <p>
              You have the right to request access to, correction of, export of, or complete erasure of your personal data,
              as well as the right to withdraw consent at any time. To exercise these rights, please contact our Data
              Protection &amp; Grievance Officer:
            </p>
            <div className="p-5 rounded-2xl bg-[#F0F8FF] border border-[#BAE6FD] text-slate-700 space-y-1">
              <p className="font-bold text-[#0D2040]">Data Protection &amp; Grievance Officer: Karthikeyan T (Founder)</p>
              <p><strong>Organization:</strong> {siteConfig.name}</p>
              <p><strong>Email:</strong> <ProtectedEmail variant="primary" className="text-[#0082CA] underline" /></p>
              <p><strong>Phone / WhatsApp:</strong> <ProtectedPhone variant="primary" /></p>
              <p><strong>Location:</strong> Coimbatore, Tamil Nadu, India</p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

