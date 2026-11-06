"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-config";
import {
  ProtectedEmail,
  ProtectedPhone,
  ProtectedWhatsApp,
} from "@/components/ui/ProtectedContact";
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
    <footer className="bg-[#0D2040] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
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

            {/* Social Media Links (@minmurasu everywhere) */}
            <div className="pt-3 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/70 text-[11px] font-mono text-[#38BDF8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F58220]" />
                <span>Follow {siteConfig.socials.handle} everywhere</span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* LinkedIn */}
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MIN MURASU on LinkedIn (@minmurasu)"
                  title="LinkedIn — @minmurasu"
                  className="w-9 h-9 rounded-lg bg-slate-800/70 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0082CA] hover:border-[#38BDF8] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MIN MURASU on Instagram (@minmurasu)"
                  title="Instagram — @minmurasu"
                  className="w-9 h-9 rounded-lg bg-slate-800/70 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F58220] hover:border-[#F58220] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MIN MURASU on YouTube (@minmurasu)"
                  title="YouTube — @minmurasu"
                  className="w-9 h-9 rounded-lg bg-slate-800/70 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-500 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MIN MURASU on Facebook (@minmurasu)"
                  title="Facebook — @minmurasu"
                  className="w-9 h-9 rounded-lg bg-slate-800/70 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                  </svg>
                </a>
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
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <ProtectedEmail
                  variant="primary"
                  className="text-slate-300 hover:text-white transition-colors truncate"
                />
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <ProtectedEmail
                  variant="secondary"
                  className="text-slate-400 hover:text-white transition-colors truncate"
                />
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <ProtectedPhone
                  variant="primary"
                  className="text-slate-300 hover:text-white transition-colors"
                />
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <ProtectedPhone
                  variant="secondary"
                  className="text-slate-400 hover:text-white transition-colors"
                />
              </li>
              <li className="pt-2">
                <ProtectedWhatsApp
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors text-xs font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant WhatsApp Enquiry</span>
                </ProtectedWhatsApp>
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

