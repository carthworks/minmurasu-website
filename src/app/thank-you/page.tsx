import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import {
  ProtectedEmail,
  ProtectedPhone,
  ProtectedWhatsApp,
} from "@/components/ui/ProtectedContact";
import {
  CheckCircle2,
  Clock,
  FileSearch,
  CalendarCheck,
  MessageSquare,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Enquiry Received",
  description:
    "Thank you for contacting MIN MURASU. Your enquiry has been received and our team will respond within one business day.",
  robots: {
    index: false,
    follow: false,
  },
};

const nextSteps = [
  {
    step: "01",
    icon: FileSearch,
    title: "Initial Digital & Website Review",
    description:
      "Before reaching out, our growth and engineering specialists inspect your website, search presence, and stated objectives.",
  },
  {
    step: "02",
    icon: Clock,
    title: "Direct Response Within 1 Business Day",
    description:
      "We will contact you via your preferred channel (WhatsApp, phone, or email) during business hours (Mon–Sat, 9:30 AM – 6:30 PM IST).",
  },
  {
    step: "03",
    icon: CalendarCheck,
    title: "30-Minute Discovery & Action Plan",
    description:
      "We align on your commercial goals, walk through high-impact opportunities, and outline a clear, no-obligation roadmap.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-[#F0F8FF] via-white to-white">
      <Container className="max-w-4xl">
        {/* Main Confirmation Card */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg overflow-hidden text-center">
          {/* Brand diagonal corner accents */}
          <div
            className="absolute top-0 left-0 w-20 h-14 bg-[#F58220] pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 w-28 h-10 bg-[#0D2040] pointer-events-none"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            aria-hidden="true"
          />

          {/* Checkmark Emblem */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
            <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F8FF] border border-[#BAE6FD] text-xs font-extrabold uppercase tracking-wider text-[#0082CA] mb-3">
            <span>Enquiry Confirmed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight mb-4">
            Thank You! We’ve Received Your Request.
          </h1>

          <div className="w-24 h-1.5 bg-[#F58220] mx-auto rounded-full mb-5" />

          <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed mb-8">
            Your details have been securely logged with <strong>{siteConfig.name}</strong>.{" "}
            {siteConfig.businessHours.responseTime}
          </p>

          {/* What Happens Next Grid */}
          <div className="text-left bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0D2040] mb-5 text-center sm:text-left">
              What Happens Next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextSteps.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="bg-white p-5 rounded-xl border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#F0F8FF] border border-[#BAE6FD] text-[#0082CA] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-extrabold text-[#F58220]">
                          STEP {item.step}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#0D2040] mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Need Immediate Assistance? */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <ProtectedWhatsApp
              message="Hello MIN MURASU, I just submitted an enquiry on your website and would like to connect directly."
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp Now</span>
            </ProtectedWhatsApp>

            <Button
              href="/services"
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>

            <Link
              href="/"
              className="text-xs font-bold text-[#0082CA] hover:text-[#0D2040] underline underline-offset-4 px-3 py-2"
            >
              Return to Homepage
            </Link>
          </div>

          {/* Direct Contact Footer inside Card */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0082CA]" />
              <ProtectedPhone
                variant="primary"
                className="font-semibold text-[#0D2040] hover:text-[#0082CA]"
              />
            </span>
            <span className="hidden sm:inline text-slate-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0082CA]" />
              <ProtectedEmail
                variant="primary"
                className="font-semibold text-[#0D2040] hover:text-[#0082CA]"
              />
            </span>
            <span className="hidden sm:inline text-slate-300">&bull;</span>
            <span>
              {siteConfig.businessHours.days}: {siteConfig.businessHours.hours}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}

