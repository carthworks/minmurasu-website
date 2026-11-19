import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CheckCheck,
  Download,
  FileBarChart,
  FolderKanban,
  IndianRupee,
  KanbanSquare,
  LayoutDashboard,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig, getFaqSchema } from "@/lib/site-config";
import CrmLeadForm from "./CrmLeadForm";
import CrmWhatsAppLink from "./CrmWhatsAppLink";
import {
  crmAssets,
  crmBenefits,
  crmFaqs,
  crmFeatures,
  crmHero,
  crmPlans,
  crmSteps,
  crmTrust,
} from "./crm-content";

const pageUrl = `${siteConfig.url}/crm`;

export const metadata: Metadata = {
  title: "White-Label CRM for Digital Agencies | Client Portal, Approvals & Billing",
  description:
    "MIN MURASU CRM is a white-label client and project management platform for digital agencies: branded client portal, one-tap approvals, leads, ₹ billing and WhatsApp. From ₹3,999/month.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Run your whole agency under your own brand",
    description:
      "Client approvals, leads, billing and WhatsApp in one branded portal your clients will love logging into.",
    url: pageUrl,
    type: "website",
    images: [{ url: crmAssets.dashboardImage }],
  },
};

const featureIcons: Record<string, LucideIcon> = {
  LayoutDashboard,
  CheckCheck,
  KanbanSquare,
  FolderKanban,
  IndianRupee,
  MessageCircle,
  Sparkles,
  FileBarChart,
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MIN MURASU CRM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: crmHero.subtitle,
  url: pageUrl,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  offers: crmPlans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price.replace(/[^\d]/g, ""),
    priceCurrency: "INR",
    url: `${pageUrl}#pricing`,
  })),
};

const whatsappBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-[#1EBE5A] hover:-translate-y-0.5";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:-translate-y-0.5";

function DemoVideo() {
  const url = crmAssets.demoVideoUrl;
  if (url) {
    return url.endsWith(".mp4") ? (
      <video
        src={url}
        poster={crmAssets.dashboardImage}
        controls
        preload="none"
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    ) : (
      <iframe
        src={url}
        title="MIN MURASU CRM demo"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    );
  }
  // Placeholder until the reel is recorded.
  return (
    <>
      <Image
        src={crmAssets.dashboardImage}
        alt="MIN MURASU CRM agency dashboard"
        fill
        sizes="(min-width: 1024px) 896px, 100vw"
        className="object-cover object-top opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2040] via-[#0D2040]/70 to-[#0D2040]/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#F58220] shadow-2xl shadow-orange-500/40">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#F58220]/40" />
          <Play className="relative h-8 w-8 translate-x-0.5 fill-white text-white" />
        </span>
        <div>
          <p className="text-lg font-bold text-white sm:text-xl">2-minute product reel — coming soon</p>
          <p className="mt-1 text-sm text-slate-300">
            Want to see it now? We&apos;ll walk you through it live on WhatsApp or a call.
          </p>
        </div>
      </div>
    </>
  );
}

export default function CrmLandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(crmFaqs)) }} />

      {/* ───────────────────────── 1. HERO ───────────────────────── */}
      <section className="relative overflow-hidden bg-[#0D2040] pt-28 pb-20 text-white sm:pt-32 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#0082CA]/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#F58220]/20 blur-3xl"
        />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FDBA74]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
              {crmHero.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {crmHero.title}{" "}
              <span className="bg-gradient-to-r from-[#F58220] to-[#FDBA74] bg-clip-text text-transparent">
                {crmHero.titleAccent}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{crmHero.subtitle}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#demo-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F58220] px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#E06F12] hover:-translate-y-0.5"
              >
                Book a free demo <ArrowRight className="h-4 w-4" />
              </a>
              <CrmWhatsAppLink location="hero" className={whatsappBtn}>
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </CrmWhatsAppLink>
              <a href={crmAssets.deckPdf} download={crmAssets.deckFileName} className={ghostBtn}>
                <Download className="h-4 w-4" /> Sales deck (PDF)
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              {crmHero.proof.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#25D366]" /> {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Product mock: branded approvals card over the real dashboard screenshot */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0A1930] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 rounded-md bg-white/10 px-3 py-0.5 text-[11px] text-slate-300">
                  portal.youragency.in
                </span>
              </div>
              <Image
                src={crmAssets.dashboardImage}
                alt="MIN MURASU CRM dashboard showing clients, pipeline and revenue"
                width={1906}
                height={937}
                priority
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 w-64 rounded-2xl border border-slate-200 bg-white p-4 text-[#0D2040] shadow-2xl sm:-left-8">
              <p className="text-xs font-bold uppercase tracking-wide text-[#F58220]">Festive campaign</p>
              <p className="mt-1 text-sm font-semibold">3 posts waiting for your approval</p>
              <div className="mt-3 flex gap-2">
                <span className="flex-1 rounded-lg bg-[#0D2040] py-1.5 text-center text-xs font-bold text-white">
                  Approve all
                </span>
                <span className="flex-1 rounded-lg border border-slate-200 py-1.5 text-center text-xs font-semibold text-slate-600">
                  Request changes
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────── DEMO REEL ───────────────────────── */}
      <section id="demo" className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="See it in action"
            title="From client brief to paid invoice — in one portal"
            description="Watch how an agency sends work for approval, tracks a new lead from WhatsApp and raises the invoice, all without leaving its own branded portal."
          />
          <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-3xl bg-[#0D2040] shadow-2xl ring-1 ring-slate-900/10">
            <DemoVideo />
          </div>
        </Container>
      </section>

      {/* ───────────────────────── 2. FEATURES ───────────────────────── */}
      <section id="features" className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Features"
            title="Everything your agency runs on"
            description="Built around how agencies actually work: clients, content, approvals, retainers and WhatsApp."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {crmFeatures.map((f) => {
              const Icon = featureIcons[f.icon] ?? Sparkles;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#0082CA]/40 hover:shadow-xl hover:shadow-slate-200"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0082CA]/10 text-[#0082CA] transition group-hover:bg-[#0082CA] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[#0D2040]">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────────── 3. BENEFITS ───────────────────────── */}
      <section id="benefits" className="bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              className="mb-8 sm:mb-8"
              eyebrow="Why agencies switch"
              title="Look bigger. Work faster. Get paid."
              description="Most agencies outgrow spreadsheets, WhatsApp groups and a patchwork of tools long before they outgrow their clients. One branded system lets you take on more accounts without adding more admin."
            />
            <div className="grid grid-cols-2 gap-3">
              {crmTrust.map((t) => (
                <div key={t.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-[#0D2040]">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#0082CA]" /> {t.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
          <ol className="space-y-5">
            {crmBenefits.map((b) => (
              <li
                key={b.title}
                className="flex gap-5 rounded-2xl border border-slate-200 p-6 transition hover:border-[#F58220]/40 hover:shadow-lg sm:p-7"
              >
                <span className="text-3xl font-extrabold leading-none text-[#F58220]/80">{b.stat}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0D2040]">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{b.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───────────────────────── 4. PRICING ───────────────────────── */}
      <section id="pricing" className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Simple plans that grow with you"
            description="Billed monthly in ₹, plus GST. No per-client add-ons for WhatsApp or approvals. Updates included on every plan."
          />
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3 lg:items-stretch">
            {crmPlans.map((plan) => (
              <div
                key={plan.id}
                className={
                  plan.popular
                    ? "relative flex flex-col rounded-3xl bg-[#0D2040] p-8 text-white shadow-2xl shadow-[#0D2040]/30 ring-2 ring-[#F58220] lg:-my-4 lg:py-12"
                    : "relative flex flex-col rounded-3xl border border-slate-200 bg-white p-8 text-[#0D2040]"
                }
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#F58220] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className={`mt-1 text-sm ${plan.popular ? "text-slate-300" : "text-slate-500"}`}>{plan.tagline}</p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-slate-300" : "text-slate-500"}`}>/month + GST</span>
                </p>
                <div
                  className={`mt-6 grid grid-cols-2 gap-2 rounded-xl p-3 text-xs font-semibold ${
                    plan.popular ? "bg-white/10" : "bg-slate-50"
                  }`}
                >
                  <span>{plan.seats}</span>
                  <span>{plan.clients}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.popular ? "text-[#F58220]" : "text-[#0082CA]"}`} />
                      <span className={plan.popular ? "text-slate-200" : "text-slate-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#demo-form"
                  className={
                    plan.popular
                      ? "mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F58220] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E06F12]"
                      : "mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#0D2040] transition hover:border-[#0D2040] hover:bg-slate-50"
                  }
                >
                  Book a demo <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Not sure which plan fits?{" "}
            <CrmWhatsAppLink location="pricing" className="font-semibold text-[#0082CA] underline-offset-4 hover:underline">
              Ask us on WhatsApp
            </CrmWhatsAppLink>{" "}
            — we&apos;ll recommend one based on your team and client count.
          </p>
        </Container>
      </section>

      {/* ───────────────────────── 5. LEAD FORM ───────────────────────── */}
      <section id="demo-form" className="relative overflow-hidden bg-[#0D2040] py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-[#0082CA]/25 blur-3xl"
        />
        <Container className="relative grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FDBA74]">Your next step</span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Put your brand on every client touchpoint.
            </h2>
            <p className="mt-4 max-w-md text-slate-300">
              Tell us a little about your agency and we&apos;ll show you the portal set up the way you work —
              no slides, no pressure.
            </p>
            <ol className="mt-8 space-y-5">
              {crmSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F58220] text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold">{s.title}</p>
                    <p className="text-sm text-slate-400">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CrmWhatsAppLink location="form-section" className={whatsappBtn}>
                <MessageCircle className="h-4 w-4" /> WhatsApp {siteConfig.phones.primaryDisplay}
              </CrmWhatsAppLink>
              <a href={crmAssets.deckPdf} download={crmAssets.deckFileName} className={ghostBtn}>
                <Download className="h-4 w-4" /> Download the deck
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-[#0D2040] shadow-2xl sm:p-8">
            <h3 className="text-xl font-bold">Book your free demo</h3>
            <p className="mt-1 mb-6 text-sm text-slate-500">Takes 30 seconds. We&apos;ll confirm a slot on WhatsApp.</p>
            <CrmLeadForm />
          </div>
        </Container>
      </section>

      {/* ───────────────────────── FAQ ───────────────────────── */}
      <section id="faq" className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions agencies ask us" />
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {crmFaqs.map((f) => (
              <details key={f.question} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0D2040]">
                  {f.question}
                  <span className="text-xl leading-none text-[#F58220] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
