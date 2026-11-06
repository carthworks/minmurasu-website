"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#0D2040] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" dark href="/" />

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed pt-2">
              The Digital Voice That Makes Your Brand Heard. We combine strategic
              marketing, modern web engineering, and practical AI automation to help
              businesses attract, convert, and retain valuable clients.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="text-slate-300 font-medium">
                <strong>Karthikeyan T</strong> &bull; Founder | Digital Growth &amp; AI Automation
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <span>
                  <strong>HQ:</strong> Coimbatore, Tamil Nadu, India.
                  <br />
                  <span className="text-slate-400">
                    Serving Coimbatore, Chennai, Bengaluru &amp; PAN-India.
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.services.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-slate-400 hover:text-white hover:underline transition-colors inline-flex items-center gap-1"
                  >
                    <span>{svc.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
              Industries
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.industries.map((ind) => (
                <li key={ind.slug}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="text-slate-400 hover:text-white hover:underline transition-colors"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/services"
                  className="text-xs text-[#38BDF8] hover:text-white font-medium inline-flex items-center gap-1"
                >
                  View All Capabilities <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
              Connect With Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.emails.primary}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="truncate">{siteConfig.emails.primary}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.emails.secondary}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{siteConfig.emails.secondary}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phones.primaryRaw}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>{siteConfig.phones.primary}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phones.secondaryRaw}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{siteConfig.phones.secondary}</span>
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors text-xs font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant WhatsApp Enquiry</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Cancellation &amp; Refund Policy
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
              className="hover:text-white transition-colors cursor-pointer underline decoration-slate-600 underline-offset-2"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

