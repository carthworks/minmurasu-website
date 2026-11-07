import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import {
  Users,
  KeyRound,
  MessageCircle,
  BarChart3,
  ClipboardCheck,
  MonitorPlay,
  Globe,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "One team for everything",
    text: "Marketing, website and automation from the same people — no finger-pointing between vendors.",
  },
  {
    icon: MessageCircle,
    title: "Talk to the people doing the work",
    text: "No layers of account managers. You speak directly with the person running your campaigns.",
  },
  {
    icon: KeyRound,
    title: "You own everything",
    text: "Your domain, website, Google and Meta accounts stay in your name from day one.",
  },
  {
    icon: BarChart3,
    title: "Reports in plain numbers",
    text: "Enquiries, cost per enquiry and new customers — not likes and impressions.",
  },
];

const proofs = [
  {
    icon: ClipboardCheck,
    title: "Your free audit",
    text: "The best proof is a real review of your own business, delivered in 1–2 business days.",
    href: siteConfig.cta.audit.href,
    cta: "Get my audit",
  },
  {
    icon: MonitorPlay,
    title: "A live demo",
    text: "On a 30-minute call we'll show working WhatsApp auto-replies and lead tracking.",
    href: siteConfig.cta.primary.href,
    cta: "Book a demo call",
  },
  {
    icon: Globe,
    title: "This website",
    text: "Designed, built and run by us — fast on mobile, and every enquiry is tracked.",
    href: "/approach",
    cta: "See how we build",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function FounderProof() {
  const f = siteConfig.founderDetails;
  const offer = siteConfig.foundingClientOffer;

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          title="Why businesses work with us"
          description="A small, hands-on team that treats your budget like our own."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          {/* Founder card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0D2040] text-white p-8 flex flex-col items-center text-center">
            {f.photo ? (
              <Image
                src={f.photo}
                alt={f.name}
                width={128}
                height={128}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#F58220] mb-5"
              />
            ) : (
              <div
                aria-hidden="true"
                className="w-28 h-28 rounded-full bg-[#F58220] text-white flex items-center justify-center text-4xl font-black mb-5"
              >
                {initials(f.name)}
              </div>
            )}
            <div className="text-2xl font-extrabold">{f.name}</div>
            <div className="text-sm font-semibold text-orange-200 mt-1">{f.role}</div>
            <p className="text-[15px] text-slate-200 leading-relaxed mt-4">
              {f.bio ||
                `${f.name.split(" ")[0]} founded ${siteConfig.name} in Coimbatore and works directly with every client.`}
            </p>
            {f.linkedin && (
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white underline underline-offset-4 hover:text-[#F58220]"
              >
                Connect on LinkedIn <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Reasons */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60">
                <Icon className="w-7 h-7 text-[#0082CA] mb-4" />
                <h3 className="text-lg font-extrabold text-[#0D2040] mb-1.5">{title}</h3>
                <p className="text-[15px] text-[#334155] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proof we can show today */}
        <div className="rounded-3xl bg-[#F0F8FF] border border-[#BAE6FD] p-7 sm:p-10">
          <h3 className="text-2xl font-black text-[#0D2040] mb-2">See it before you commit</h3>
          <p className="text-[15px] text-[#334155] mb-7 max-w-3xl flex items-start gap-2">
            <Info className="w-4 h-4 text-[#0082CA] shrink-0 mt-1" />
            <span>
              We&apos;re a new agency, so we don&apos;t show client logos or results yet — we&apos;ll
              publish real case studies only with our clients&apos; permission. Here&apos;s what you
              can check for yourself today:
            </span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {proofs.map(({ icon: Icon, title, text, href, cta }) => (
              <Link
                key={title}
                href={href}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#F58220] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <Icon className="w-7 h-7 text-[#F58220] mb-3" />
                  <div className="text-lg font-extrabold text-[#0D2040] mb-1">{title}</div>
                  <p className="text-[15px] text-[#334155] leading-relaxed mb-4">{text}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0082CA] group-hover:text-[#F58220]">
                  {cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          {offer.enabled && (
            <div className="mt-7 p-5 rounded-2xl bg-[#0D2040] text-white flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-[#F58220] shrink-0" />
                <div>
                  <div className="font-extrabold">{offer.title}</div>
                  <p className="text-sm text-slate-200">{offer.text}</p>
                </div>
              </div>
              <Link
                href={siteConfig.cta.primary.href}
                className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#F58220] font-bold text-sm hover:bg-orange-500"
              >
                Ask about it <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
