"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import {
  ProtectedEmail,
  ProtectedPhone,
  ProtectedWhatsApp,
} from "@/components/ui/ProtectedContact";
import { Menu, X, Phone, MessageSquare } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80"
          : "bg-white border-b border-slate-100"
      }`}
    >
      {/* Top micro bar for direct contact channels */}
      <div className="bg-[#0D2040] text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <Container className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              {siteConfig.locations.coverageLine}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#06B6D4]" />
              <ProtectedPhone
                variant="primary"
                className="hover:text-white transition-colors"
              />
            </span>
            <ProtectedWhatsApp
              message={siteConfig.whatsapp.messages.consultation}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteConfig.cta.whatsapp.label}</span>
            </ProtectedWhatsApp>
            <ProtectedEmail
              variant="primary"
              className="hover:text-white transition-colors"
            />
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <div className="py-3.5 sm:py-4">
        <Container className="flex items-center justify-between">
          {/* Authentic Murasu Drum Logo */}
          <Logo variant="header" href="/" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#0082CA] ${
                    isActive ? "text-[#0082CA] font-bold" : "text-[#475569]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href={siteConfig.cta.primary.href}
              variant="orange"
              size="sm"
              className="shadow-xs font-bold"
            >
              {siteConfig.cta.primary.label}
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-[#0D2040] hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#0082CA]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </Container>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl">
          <div className="flex flex-col space-y-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-medium py-2 px-3 rounded-md text-[#0D2040] hover:bg-[#F0F8FF] hover:text-[#0082CA] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <Button
                href={siteConfig.cta.primary.href}
                variant="teal"
                size="md"
                className="w-full justify-center"
              >
                {siteConfig.cta.primary.label}
              </Button>
              <ProtectedWhatsApp
                message={siteConfig.whatsapp.messages.consultation}
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors w-full"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{siteConfig.cta.whatsapp.label}</span>
              </ProtectedWhatsApp>
              <div className="text-xs text-center text-slate-500 pt-1 flex items-center justify-center gap-2">
                <ProtectedPhone variant="primary" />
                <span>&bull;</span>
                <ProtectedEmail variant="primary" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

