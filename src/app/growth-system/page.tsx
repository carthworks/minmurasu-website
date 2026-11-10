"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getWhatsAppUrl } from "@/lib/site-config";
import { feedback } from "@/lib/vibe-feedback";
import BuildersReelPlayer from "@/components/ui/BuildersReelPlayer";
import {
  Building2,
  HardHat,
  ShieldCheck,
  FileText,
  Video,
  PhoneCall,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronDown,
  Cpu,
  Target,
  Sparkles,
  Sliders,
  DollarSign,
  Send,
  X,
  Play,
  Award,
  Lock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data Definitions                                                   */
/* ------------------------------------------------------------------ */

interface StepDetail {
  number: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  deliverables: string[];
  timeline: string;
  outcome: string;
}

const engineSteps: StepDetail[] = [
  {
    number: "01",
    title: "Positioning & Specialization Authority",
    tagline: "Define high-margin focus areas to escape commoditized price bidding",
    icon: Target,
    deliverables: [
      "High-value niche identification (Industrial PEB, Cleanrooms, Commercial IT Parks, MEP)",
      "Target Buyer Persona mapping (Corporate Real Estate Directors, Architects, PMCs)",
      "Proprietary value proposition blueprint distinguishing firm from local sub-contractors",
      "Competitive tender differentiation dossier",
    ],
    timeline: "Week 1 – 2",
    outcome: "Positions your firm as the obvious specialist rather than a generic general builder.",
  },
  {
    number: "02",
    title: "Digital Credential Vault & Speed Asset",
    tagline: "A sub-second digital headquarters built for board-level due diligence",
    icon: Building2,
    deliverables: [
      "Sub-second Next.js web infrastructure meeting enterprise corporate compliance",
      "Technical case study breakdowns with BOQ capability highlights and load metrics",
      "Interactive completed projects gallery with drone footage & structural data",
      "Downloadable C-Suite Credential Dossier (PDF) for tender committees",
    ],
    timeline: "Week 2 – 4",
    outcome: "Instills immediate confidence when procurement heads and PMCs review your website.",
  },
  {
    number: "03",
    title: "Account-Based Inbound & Targeted ABM",
    tagline: "Put your brand in front of architects, developers & PMCs before tenders float",
    icon: Cpu,
    deliverables: [
      "Precision Google Search capture for high-ticket commercial construction queries",
      "LinkedIn ABM targeting corporate expansion heads and industrial developers",
      "Direct Architect & Project Management Consultant (PMC) outreach sequences",
      "Localized corridor targeting (Coimbatore, Chennai, Bengaluru industrial belts)",
    ],
    timeline: "Week 3 – Ongoing",
    outcome: "Generates private, pre-tender invitations to quote for multi-crore facilities.",
  },
  {
    number: "04",
    title: "Drone Progress & On-Site Video Proof",
    tagline: "Unassailable visual evidence of active machinery, safety, and delivery speed",
    icon: Video,
    deliverables: [
      "High-definition 4K drone fly-throughs of active and completed structural sites",
      "Site milestone documentation videos highlighting safety and engineering discipline",
      "Managing Director authority soundbites addressing delivery timelines and quality",
      "B2B social distribution showcasing active construction progress to institutional buyers",
    ],
    timeline: "Bi-weekly / Monthly",
    outcome: "Eliminates doubts regarding actual execution capacity, manpower, and equipment.",
  },
  {
    number: "05",
    title: "Automated Procurement CRM & Fast Follow-Up",
    tagline: "Zero lead leakage with instant WhatsApp notifications and qualification routing",
    icon: MessageSquare,
    deliverables: [
      "Automated WhatsApp lead dispatch instantly notifying estimation and founder teams",
      "Pre-qualification form capturing project square footage, location, and budget range",
      "CRM pipeline synchronization tracking every RFP from inquiry to BOQ submission",
      "Automated follow-up cadences ensuring pending proposals never go cold",
    ],
    timeline: "Week 4 – 5",
    outcome: "Guarantees your estimation team responds within 1 hour, winning buyer momentum.",
  },
  {
    number: "06",
    title: "Tender & Direct Negotiation Collateral",
    tagline: "Boardroom-ready closing assets that justify your premium pricing",
    icon: FileText,
    deliverables: [
      "Custom branded tender presentation kit and executive pitch deck",
      "Compliance and safety documentation binders formatted for corporate audit boards",
      "Client testimonial and institutional references pack",
      "Commercial value realization model demonstrating long-term lifecycle savings",
    ],
    timeline: "Week 5 – 6",
    outcome: "Empowers your sales team to command premium margins and close direct contracts.",
  },
];

const walkthroughPhases = [
  {
    id: "positioning",
    label: "01. Positioning",
    title: "Phase 1: Positioning & Specialization",
    subtitle: "Differentiating your construction firm from low-margin general contractors.",
    highlights: [
      "Niche specialization roadmap (Industrial, PEB, Commercial, Healthcare)",
      "Competitor moat analysis in target industrial corridors",
      "C-Suite value messaging matrix",
    ],
    deliverable: "Strategic Brand & Market Architecture Deck",
    previewType: "positioning",
  },
  {
    id: "vault",
    label: "02. Digital Vault",
    title: "Phase 2: Digital Credential Vault",
    subtitle: "A fast, modern corporate web asset that passes institutional due diligence.",
    highlights: [
      "Sub-second page speeds (<0.8s) built on Next.js 16",
      "Deep project case studies with structural specs & timeline data",
      "Instant PDF credential dossiers for tender boards",
    ],
    deliverable: "Turnkey Enterprise Web Architecture & Portfolio System",
    previewType: "vault",
  },
  {
    id: "inbound",
    label: "03. Lead Gen",
    title: "Phase 3: High-Intent Inbound & ABM",
    subtitle: "Targeting institutional buyers, architects & PMCs actively planning projects.",
    highlights: [
      "Google Search capture for 'Turnkey Industrial Builder Coimbatore/Chennai'",
      "LinkedIn Account-Based Marketing targeting Corporate Real Estate heads",
      "Direct Architect & PMC partnership network sequences",
    ],
    deliverable: "Live Multi-Channel Inbound Acquisition Engine",
    previewType: "inbound",
  },
  {
    id: "video",
    label: "04. Site Proof",
    title: "Phase 4: Drone Progress & Video Proof",
    subtitle: "Cinematic, on-site proof of active machinery, safety and execution rigor.",
    highlights: [
      "4K Drone site sweeps capturing scale and structural milestones",
      "Client and PMC testimonial reels",
      "Safety and equipment asset validation clips",
    ],
    deliverable: "Bi-Weekly Video & Drone Production Fleet",
    previewType: "video",
  },
  {
    id: "crm",
    label: "05. CRM Sync",
    title: "Phase 5: Automated Procurement CRM",
    subtitle: "Instant lead dispatch to your estimators via WhatsApp and cloud CRM.",
    highlights: [
      "Automated WhatsApp notification to MD & Estimation Head within 30 seconds",
      "Pre-qualification filtering out low-budget residential leads",
      "Quotation follow-up drip sequence preventing lost bids",
    ],
    deliverable: "End-to-End Lead Routing & Pipeline Tracking System",
    previewType: "crm",
  },
  {
    id: "close",
    label: "06. Deal Close",
    title: "Phase 6: Negotiation & Tender Collateral",
    subtitle: "Boardroom-level presentation assets that justify your project pricing.",
    highlights: [
      "Customized C-Suite tender presentation deck templates",
      "Safety, ISO, and compliance verification packages",
      "Value engineering and ROI comparison sheets for clients",
    ],
    deliverable: "Executive Tender Pitch Kit & Proposal Vault",
    previewType: "close",
  },
];

const comparisonMatrix = [
  {
    dimension: "Core Strategic Focus",
    agency: "Generic likes, social media memes & TikTok reels",
    minmurasu: "Multi-crore institutional contracts, corporate expansions & PMC shortlists",
  },
  {
    dimension: "Industry Knowledge",
    agency: "Zero understanding of BOQ, tenders, MEP, or commercial engineering",
    minmurasu: "Deep command of construction procurement, architects, and tender timelines",
  },
  {
    dimension: "Digital Web Asset",
    agency: "Clunky 5-page WordPress templates from generic web shops",
    minmurasu: "Sub-second Next.js enterprise credential vault built for board due diligence",
  },
  {
    dimension: "Lead Quality & Filtering",
    agency: "Spam inquiries, residential inquiries & unqualified tire-kickers",
    minmurasu: "Pre-screened commercial inquiries with verified site area and budget range",
  },
  {
    dimension: "Visual Proof & Media",
    agency: "Stock images from Google and generic Canva graphics",
    minmurasu: "On-site 4K drone shoots, structural milestone reels & engineer interviews",
  },
  {
    dimension: "Accountability Metric",
    agency: "Reports on impressions, click-through rates, and follower growth",
    minmurasu: "Reports on pipeline value, qualified RFQs submitted, and signed contract revenue",
  },
];

export default function GrowthSystemPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  // Live ROI Engine State
  const [contractValueCrores, setContractValueCrores] = useState<number>(2.5);
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(14);
  const [contractsWonPerYear, setContractsWonPerYear] = useState<number>(2);

  // Walkthrough Interactive Simulator State
  const [simulatedNiche, setSimulatedNiche] = useState<string>("industrial");
  const [isAlertSimulated, setIsAlertSimulated] = useState<boolean>(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("Complete Growth Engine");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    projectType: "Industrial / Factory",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Generate unique IDs for form accessibility
  const nameId = useId();
  const companyId = useId();
  const phoneId = useId();
  const projectTypeId = useId();

  // Calculations for ROI Engine
  const totalRevenueAddedCrores = contractValueCrores * contractsWonPerYear;
  const grossProfitAddedLakhs = totalRevenueAddedCrores * (grossMarginPercent / 100) * 100;
  // Estimated annual investment for Min Murasu growth engine is approx 4.8L - 7.5L
  const estimatedSystemCostLakhs = 6.0;
  const estimatedRoiMultiple = (grossProfitAddedLakhs / estimatedSystemCostLakhs).toFixed(1);

  // Formatted Indian Currency String Helper
  const formatCrores = (val: number) => {
    return `₹${val.toFixed(2)} Cr`;
  };
  const formatLakhs = (val: number) => {
    if (val >= 100) {
      return `₹${(val / 100).toFixed(2)} Cr`;
    }
    return `₹${val.toFixed(1)} Lakhs`;
  };

  const handleStepClick = (index: number) => {
    feedback.playPop();
    feedback.triggerHaptic(10);
    setActiveStep(activeStep === index ? -1 : index);
  };

  const handlePhaseClick = (index: number) => {
    feedback.playPop();
    feedback.triggerHaptic(15);
    setActivePhaseIndex(index);
  };

  const triggerRfqSimulation = () => {
    feedback.playPop();
    feedback.triggerHaptic([30, 50, 30]);
    setIsAlertSimulated(true);
  };

  const openBookingModal = (planName: string) => {
    feedback.playPop();
    feedback.triggerHaptic(20);
    setSelectedPlan(planName);
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    feedback.playPop();
    feedback.triggerHaptic([20, 40, 60]);
    setFormSubmitted(true);
  };

  const generateWhatsAppRoiMessage = () => {
    const text = `Hi Karthikeyan & MIN MURASU team! 👋 I was exploring the Growth System interactive demo for commercial contractors.\n\n• Target Contract Size: ${formatCrores(contractValueCrores)}\n• Estimated Margin: ${grossMarginPercent}%\n• Target Wins / Year: ${contractsWonPerYear}\n• Projected Gross Profit Added: ${formatLakhs(grossProfitAddedLakhs)} (~${estimatedRoiMultiple}x ROI)\n\nCan we schedule a 20-minute call to discuss deploying this engine for our firm?`;
    return getWhatsAppUrl(text);
  };

  const activePhase = walkthroughPhases[activePhaseIndex];

  return (
    <div className="bg-[#FAFBFD] text-[#475569] min-h-screen selection:bg-[#F58220] selection:text-white">
      {/* ------------------------------------------------------------------ */}
      {/* Top Private Demo Micro-Header                                      */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <Container className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={() => feedback.playPop()}
            >
              <div className="w-8 h-8 rounded-lg bg-[#0D2040] flex items-center justify-center text-white font-black text-sm">
                M
              </div>
              <span className="font-black text-[#0D2040] text-lg tracking-tight group-hover:text-[#F58220] transition-colors">
                MIN MURASU
              </span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold tracking-wide">
              <Lock className="w-3 h-3 text-amber-600" />
              Private Client Demo · Growth System
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#engine" className="hover:text-[#F58220] transition-colors">
              The 6 Steps
            </a>
            <a href="#walkthrough" className="hover:text-[#F58220] transition-colors">
              Interactive Demo
            </a>
            <a href="#roi-engine" className="hover:text-[#F58220] transition-colors">
              ROI Engine
            </a>
            <a href="#compare" className="hover:text-[#F58220] transition-colors">
              Agency vs. Min Murasu
            </a>
            <a href="#pricing" className="hover:text-[#F58220] transition-colors">
              Partnership Models
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={getWhatsAppUrl("Hi MIN MURASU! I'm reviewing the Growth System demo for commercial contractors and would like to connect.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                feedback.playPop();
                feedback.triggerHaptic(10);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0D2040] font-bold text-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => openBookingModal("General Consultation")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F58220] hover:bg-[#e07116] text-white font-bold text-xs shadow-sm hover:shadow transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Schedule Call</span>
            </button>
          </div>
        </Container>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero Section                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-200 bg-white">
        {/* Subtle radial backdrop accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF5ED] border border-[#F58220]/25 text-[#F58220] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <HardHat className="w-3.5 h-3.5" />
            FOR COMMERCIAL CONTRACTORS, EPC &amp; INFRASTRUCTURE FIRMS
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2040] tracking-tight leading-[1.15] mb-6">
            Win Multi-Crore Construction Contracts With a Predictable Growth Engine.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Most commercial contractors rely on broker commissions, word-of-mouth, and cut-throat government tenders. Min Murasu installs a proprietary client acquisition engine that positions your firm directly in front of corporate developers, architects, and PMCs—before tenders are even floated.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <a
              href="#engine"
              onClick={() => {
                feedback.playPop();
                feedback.triggerHaptic(10);
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F58220] hover:bg-[#e07116] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Explore The 6-Step Engine</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#walkthrough"
              onClick={() => {
                feedback.playPop();
                feedback.triggerHaptic(10);
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-[#0D2040] font-bold text-sm shadow-xs hover:bg-slate-50 transition-all"
            >
              <Play className="w-3.5 h-3.5 text-[#F58220] fill-[#F58220]" />
              <span>Interactive 3-Min Walkthrough</span>
            </a>
            <a
              href="#roi-engine"
              onClick={() => {
                feedback.playPop();
                feedback.triggerHaptic(10);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-[#0082CA] hover:text-[#006ba8] font-bold text-sm transition-colors"
            >
              <DollarSign className="w-4 h-4" />
              <span>Calculate ROI Potential →</span>
            </a>
          </div>

          {/* High-Trust Boardroom Criteria Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#F58220]" />
              <h2 className="text-sm sm:text-base font-extrabold text-[#0D2040]">
                What Corporate Decision-Makers &amp; PMCs Actually Look For Before Shortlisting:
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0D2040] block">Audited Project Delivery Proof</span>
                  Sub-second video &amp; drone footage of delivered factories, commercial tech parks, and MEP scope.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0D2040] block">Technical Solvency &amp; Plant Ownership</span>
                  Institutional proof of heavy machinery, equipment fleet, and structural safety records.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0D2040] block">Safety Compliance &amp; ESG Standards</span>
                  ISO, LEED, and Zero-Accident compliance protocols documented upfront for corporate review.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0D2040] block">Direct Executive Accessibility</span>
                  Managing director credentials that remove bureaucratic friction and ensure accountability.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. The 6-Step Construction Growth Engine                           */}
      {/* ------------------------------------------------------------------ */}
      <section id="engine" className="py-20 lg:py-28 bg-[#FAFBFD] border-b border-slate-200 scroll-mt-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-extrabold text-[#F58220] uppercase tracking-widest block mb-2">
              PROVEN SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D2040] tracking-tight mb-3">
              The 6-Step Construction Growth Engine
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              A battle-tested pipeline that converts anonymous commercial inquiries into multi-crore signed contracts.
            </p>
          </div>

          {/* Interactive Steps Stack */}
          <div className="max-w-3xl mx-auto space-y-4">
            {engineSteps.map((step, idx) => {
              const isExpanded = activeStep === idx;
              const IconComp = step.icon;

              return (
                <div
                  key={step.number}
                  className={`rounded-2xl border transition-all duration-200 bg-white shadow-xs overflow-hidden ${
                    isExpanded
                      ? "border-[#F58220] ring-2 ring-[#F58220]/10 shadow-md"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => handleStepClick(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-start gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-black text-sm transition-colors ${
                        isExpanded
                          ? "bg-[#F58220] text-white"
                          : "bg-slate-100 text-[#0D2040]"
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComp className="w-4 h-4 text-[#F58220]" />
                        <h3 className="text-base sm:text-lg font-bold text-[#0D2040]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                        {step.tagline}
                      </p>
                    </div>

                    <div className="ml-2 shrink-0 pt-1">
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#F58220]" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 bg-[#FFFDF9]/60">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <div className="md:col-span-2 space-y-2.5">
                          <span className="text-[11px] font-bold text-[#0D2040] uppercase tracking-wider block">
                            Key Deliverables We Build:
                          </span>
                          <ul className="space-y-2">
                            {step.deliverables.map((item, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-3">
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                              Deployment Window
                            </span>
                            <span className="text-xs font-bold text-[#0D2040]">
                              {step.timeline}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                              Business Impact
                            </span>
                            <span className="text-xs text-slate-600 leading-snug block">
                              {step.outcome}
                            </span>
                          </div>
                          <button
                            onClick={() => openBookingModal(`Step ${step.number}: ${step.title}`)}
                            className="w-full text-center py-2 px-3 rounded-lg bg-slate-900 hover:bg-[#F58220] text-white text-[11px] font-bold transition-colors"
                          >
                            Explore This Step
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Interactive 3-Minute Walkthrough (Live App Simulation)          */}
      {/* ------------------------------------------------------------------ */}
      <section id="walkthrough" className="py-20 lg:py-28 bg-white border-b border-slate-200 scroll-mt-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-extrabold text-[#F58220] uppercase tracking-widest block mb-2">
              HANDS-ON PREVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D2040] tracking-tight mb-3">
              Interactive 3-Minute Walkthrough
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Experience the system from the perspective of an institutional client awarding a high-value contract.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Interactive Tab Strip */}
            <div className="flex items-center overflow-x-auto no-scrollbar border-b border-slate-200 bg-slate-50/80 p-2 gap-1.5">
              {walkthroughPhases.map((phase, pIdx) => {
                const isActive = activePhaseIndex === pIdx;
                return (
                  <button
                    key={phase.id}
                    onClick={() => handlePhaseClick(pIdx)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#F58220] text-white shadow-sm"
                        : "text-slate-600 hover:text-[#0D2040] hover:bg-slate-200/60"
                    }`}
                  >
                    {phase.label}
                  </button>
                );
              })}
            </div>

            {/* Split Screen Content & Interactive Demo */}
            <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white">
              {/* Left Column: Details */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-[#F58220] text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Phase Objective
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#0D2040] leading-tight">
                  {activePhase.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {activePhase.subtitle}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    What Gets Installed:
                  </span>
                  {activePhase.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">
                    Primary Deliverable:
                  </span>
                  <span className="font-bold text-[#0D2040] block mt-0.5">
                    {activePhase.deliverable}
                  </span>
                </div>
              </div>

              {/* Right Column: Live Interactive Mockup Simulator */}
              <div className="lg:col-span-7">
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0D2040] text-white shadow-lg border border-slate-800">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">
                        minmurasu-growth-engine // {activePhase.id}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                      Live Simulation
                    </span>
                  </div>

                  {/* Simulator Screen 1: Positioning Niche Selector */}
                  {activePhase.previewType === "positioning" && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-300">
                        Select a focus vertical to see how Min Murasu positions your firm for institutional procurement:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { key: "industrial", label: "Industrial & PEB Factories" },
                          { key: "cleanroom", label: "Pharma Cleanrooms & MEP" },
                          { key: "itpark", label: "Commercial IT Parks" },
                          { key: "infra", label: "Civil Infrastructure & Warehousing" },
                        ].map((n) => (
                          <button
                            key={n.key}
                            onClick={() => {
                              feedback.playPop();
                              setSimulatedNiche(n.key);
                            }}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              simulatedNiche === n.key
                                ? "bg-[#F58220] border-[#F58220] text-white font-bold"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            {n.label}
                          </button>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs space-y-2">
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                          Generated Institutional Positioning Statement:
                        </span>
                        <p className="text-slate-200 leading-relaxed italic font-serif">
                          {simulatedNiche === "industrial" &&
                            `"Specialist Turnkey Industrial & Heavy PEB Builders delivering certified manufacturing facilities in Tamil Nadu within 120-day rapid commissioning cycles."`}
                          {simulatedNiche === "cleanroom" &&
                            `"ISO Class 5-8 Certified Cleanroom & Advanced MEP Engineering Contractors catering to global pharmaceutical and medical device manufacturing plants."`}
                          {simulatedNiche === "itpark" &&
                            `"High-Speed Grade-A Commercial IT Park & Tech Campus General Contractors engineered for institutional REITS and multinational corporate tenants."`}
                          {simulatedNiche === "infra" &&
                            `"Heavy Logistics & Warehousing Infrastructure Contractors with in-house batching plants, fleet machinery, and zero-defect floor finishes."`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Simulator Screen 2: Digital Vault */}
                  {activePhase.previewType === "vault" && (
                    <div className="space-y-3.5">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold block text-white">
                            Flagship Project: 180,000 sq.ft Manufacturing Plant
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Coimbatore Industrial Corridor · Delivered in 14 Months
                          </span>
                        </div>
                        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          Verified Audit
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-xs font-bold text-amber-400 block">0.68s</span>
                          <span className="text-[10px] text-slate-400">FCP Speed</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-xs font-bold text-emerald-400 block">100%</span>
                          <span className="text-[10px] text-slate-400">Mobile Score</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-xs font-bold text-cyan-400 block">PDF Ready</span>
                          <span className="text-[10px] text-slate-400">Tender Dossier</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-black/30 border border-white/5 text-[11px] text-slate-300 flex items-center justify-between">
                        <span>Includes automated BOQ capability highlights &amp; ISO cert links</span>
                        <span className="text-[#F58220] font-bold">Live Asset</span>
                      </div>
                    </div>
                  )}

                  {/* Simulator Screen 3: Inbound Search & ABM */}
                  {activePhase.previewType === "inbound" && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-xs">
                        <span className="text-[10px] text-slate-400 block">Simulated Google Search Result:</span>
                        <span className="text-amber-400 font-bold block text-sm">
                          Top Turnkey Industrial Construction Firm | Coimbatore &amp; Chennai
                        </span>
                        <p className="text-[11px] text-slate-300 mt-1">
                          Direct tender quotes for factories, PEB structures, and cleanrooms. Certified delivery within 120 days. Speak to Chief Project Engineer.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-cyan-300 text-[11px]">
                            LinkedIn ABM Filter Running:
                          </span>
                          <span className="text-[10px] bg-cyan-900/60 text-cyan-200 px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px]">
                          Targeting: VP of Corporate Real Estate, Head of Projects, Chief Procurement Officers at manufacturing firms expanding in South India.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Simulator Screen 4: Site Proof & Drone Reels */}
                  {activePhase.previewType === "video" && (
                    <div className="space-y-3 flex flex-col items-center">
                      <BuildersReelPlayer />
                      <p className="text-[11px] text-slate-300 text-center">
                        Raw, authentic proof that satisfies project management consultants before site visits.
                      </p>
                    </div>
                  )}

                  {/* Simulator Screen 5: WhatsApp CRM Alert (Interactive Action!) */}
                  {activePhase.previewType === "crm" && (
                    <div className="space-y-3.5">
                      <div className="text-center p-2">
                        <button
                          onClick={triggerRfqSimulation}
                          className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Simulate Incoming ₹14.5 Cr RFQ</span>
                        </button>
                      </div>

                      {isAlertSimulated ? (
                        <div className="p-4 rounded-xl bg-[#005C4B]/90 border border-emerald-400/40 text-white space-y-2 animate-in fade-in zoom-in-95 duration-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-emerald-200 uppercase">
                              WhatsApp Alert Dispatched to MD:
                            </span>
                            <span className="text-[10px] text-emerald-200">Just now</span>
                          </div>
                          <p className="text-xs leading-relaxed">
                            <strong>🚨 High-Intent RFQ Received:</strong>
                            <br />
                            • Project: 140,000 sq.ft Industrial Warehouse
                            <br />
                            • Location: Sriperumbudur Industrial Corridor
                            <br />
                            • Est. Budget: ₹14.50 Crores
                            <br />
                            • Client: Leading Tier-1 Auto-Ancillary Group
                            <br />
                            • Status: Qualified &amp; routed to Senior Estimator
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/20 text-center text-xs text-slate-400">
                          Click the button above to simulate the exact real-time WhatsApp alert your leadership team receives within 30 seconds of an inquiry.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Simulator Screen 6: Tender Pitch Kit */}
                  {activePhase.previewType === "close" && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-xs space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 font-bold">
                          <Award className="w-4 h-4" />
                          <span>Executive Proposal Kit Included:</span>
                        </div>
                        <ul className="space-y-1 text-slate-300 text-[11px]">
                          <li>• Slide Deck: &apos;Why Us vs. Tier-1 Corporates&apos; (Agility &amp; Cost Savings)</li>
                          <li>• Audited Cost-Breakdown &amp; Value Engineering Comparison</li>
                          <li>• Formal Safety &amp; Zero-Dispute Track Record Guarantee</li>
                        </ul>
                      </div>
                      <p className="text-[11px] text-slate-400 text-center">
                        Eliminates client price hesitation by presenting verifiable engineering ROI.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. The Commercial Value & ROI Engine (Interactive Calculator)      */}
      {/* ------------------------------------------------------------------ */}
      <section id="roi-engine" className="py-20 lg:py-28 bg-[#FAFBFD] border-b border-slate-200 scroll-mt-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-extrabold text-[#F58220] uppercase tracking-widest block mb-2">
              MEASURABLE COMMERCIAL RETURN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D2040] tracking-tight mb-3">
              The Commercial Value &amp; ROI Engine
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Slide the parameters below to calculate the compounded enterprise value of winning just 1–2 additional contracts per year.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Sliders Column */}
            <div className="md:col-span-7 space-y-6">
              {/* Slider 1: Average Contract Value */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="slider-contract-value" className="text-xs font-bold text-[#0D2040] uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#F58220]" />
                    Avg. Contract Value (Crores)
                  </label>
                  <span className="text-sm font-black text-[#F58220] bg-orange-50 px-2 py-0.5 rounded">
                    {formatCrores(contractValueCrores)}
                  </span>
                </div>
                <input
                  id="slider-contract-value"
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.25"
                  value={contractValueCrores}
                  onChange={(e) => {
                    feedback.triggerHaptic(5);
                    setContractValueCrores(parseFloat(e.target.value));
                  }}
                  className="w-full accent-[#F58220] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>₹50 Lakhs</span>
                  <span>₹7.5 Cr</span>
                  <span>₹15.0 Cr</span>
                </div>
              </div>

              {/* Slider 2: Gross Margin % */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="slider-gross-margin" className="text-xs font-bold text-[#0D2040] uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#0082CA]" />
                    Expected Gross Margin (%)
                  </label>
                  <span className="text-sm font-black text-[#0082CA] bg-blue-50 px-2 py-0.5 rounded">
                    {grossMarginPercent}%
                  </span>
                </div>
                <input
                  id="slider-gross-margin"
                  type="range"
                  min="8"
                  max="25"
                  step="1"
                  value={grossMarginPercent}
                  onChange={(e) => {
                    feedback.triggerHaptic(5);
                    setGrossMarginPercent(parseInt(e.target.value, 10));
                  }}
                  className="w-full accent-[#0082CA] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>8% (Civil Core)</span>
                  <span>14% (PEB/Turnkey)</span>
                  <span>25% (Cleanroom/MEP)</span>
                </div>
              </div>

              {/* Slider 3: Target Contracts Won Per Year */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="slider-target-contracts" className="text-xs font-bold text-[#0D2040] uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Additional Contracts Won / Year
                  </label>
                  <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {contractsWonPerYear} {contractsWonPerYear === 1 ? "Contract" : "Contracts"}
                  </span>
                </div>
                <input
                  id="slider-target-contracts"
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={contractsWonPerYear}
                  onChange={(e) => {
                    feedback.triggerHaptic(5);
                    setContractsWonPerYear(parseInt(e.target.value, 10));
                  }}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>1 Contract</span>
                  <span>3 Contracts</span>
                  <span>6 Contracts</span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#0D2040] to-[#0A1931] text-white shadow-md text-center space-y-4">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
                Projected Growth Impact
              </span>

              <div>
                <span className="text-3xl sm:text-4xl font-black text-[#F58220] tracking-tight block">
                  ~{estimatedRoiMultiple}x ROI
                </span>
                <span className="text-xs text-slate-300 mt-0.5 block">
                  Estimated System Return Multiple
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>New Annual Revenue:</span>
                  <span className="font-bold text-white">
                    {formatCrores(totalRevenueAddedCrores)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Gross Profit Added:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {formatLakhs(grossProfitAddedLakhs)}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10 leading-relaxed text-left">
                💡 <strong>Break-Even Metric:</strong> Winning just <strong>1 contract</strong> every 2.4 years completely covers the entire growth system investment.
              </p>

              <a
                href={generateWhatsAppRoiMessage()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  feedback.playPop();
                  feedback.triggerHaptic(15);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all hover:scale-[1.01]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss This ROI Model on WhatsApp</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Agency vs. Min Murasu Growth Partnership (Comparison Table)     */}
      {/* ------------------------------------------------------------------ */}
      <section id="compare" className="py-20 lg:py-28 bg-white border-b border-slate-200 scroll-mt-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-extrabold text-[#F58220] uppercase tracking-widest block mb-2">
              THE HONEST COMPARISON
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D2040] tracking-tight mb-3">
              Cheap Freelancer / Agency vs. Min Murasu Growth Partnership
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Why traditional marketing agencies fail when marketing multi-crore civil, industrial, and commercial engineering projects.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs">
                    <th className="py-4 px-4 sm:px-6 font-bold text-[#0D2040] w-1/4">
                      Evaluation Dimension
                    </th>
                    <th className="py-4 px-4 sm:px-6 font-bold text-rose-800 bg-rose-50/50 w-3/8">
                      Typical Marketing Agency / Freelancer
                    </th>
                    <th className="py-4 px-4 sm:px-6 font-bold text-emerald-900 bg-emerald-50/60 w-3/8">
                      Min Murasu Growth Partnership
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonMatrix.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-bold text-[#0D2040] align-top">
                        {row.dimension}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600 bg-rose-50/20 align-top">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.agency}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-700 bg-emerald-50/30 align-top font-medium">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[#0D2040]">{row.minmurasu}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Choose How We Partner Together (Pricing / Engagement Models)    */}
      {/* ------------------------------------------------------------------ */}
      <section id="pricing" className="py-20 lg:py-28 bg-[#FAFBFD] border-b border-slate-200 scroll-mt-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-extrabold text-[#F58220] uppercase tracking-widest block mb-2">
              TRANSPARENT ENGAGEMENT MODELS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D2040] tracking-tight mb-3">
              Choose How We Partner Together
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Clear, milestone-based retainers and growth sprints with zero long-term lock-in traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Model 1: Foundation Sprint */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  6-WEEK SPRINT
                </span>
                <h3 className="text-lg font-black text-[#0D2040] mb-2">
                  Authority Foundation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Best for established contractors wanting a modern digital credential vault and brand positioning.
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-5">
                  <span className="font-bold text-[#0D2040] block">Ideal Turnover:</span>
                  <span className="text-slate-500">₹5 Cr – ₹20 Cr annual revenue</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Next.js Sub-Second Digital Credential Vault</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>5 Detailed Technical Case Studies with BOQ metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Drone Shoot &amp; Photography of 2 Flagship Sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Automated WhatsApp Lead Routing setup</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openBookingModal("Authority Foundation (6-Week Sprint)")}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 font-bold text-xs text-[#0D2040] hover:bg-slate-50 transition-colors"
              >
                Inquire For Foundation
              </button>
            </div>

            {/* Model 2: Complete Growth Engine (Featured) */}
            <div className="rounded-2xl border-2 border-[#F58220] bg-white p-6 sm:p-7 shadow-lg relative flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F58220] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                MOST POPULAR FOR BUILDERS
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#F58220] uppercase tracking-widest block mb-1">
                  FULL PARTNERSHIP
                </span>
                <h3 className="text-lg font-black text-[#0D2040] mb-2">
                  Complete Growth Engine
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  End-to-end inbound pipeline, monthly ABM campaigns, drone video shoots, and tender follow-up workflows.
                </p>

                <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 text-xs mb-5">
                  <span className="font-bold text-[#0D2040] block">Ideal Turnover:</span>
                  <span className="text-slate-600">₹20 Cr – ₹100 Cr commercial contractors</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Everything in Authority Foundation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>High-Intent Google Ads &amp; LinkedIn ABM Campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Monthly 4K Drone Progress &amp; Milestone Video Shoots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Architect &amp; PMC Direct Partnership Sequences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Bi-Weekly Pipeline Review directly with Founder</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openBookingModal("Complete Growth Engine (Full Partnership)")}
                className="w-full py-3 px-4 rounded-xl bg-[#F58220] hover:bg-[#e07116] text-white font-bold text-xs shadow-md transition-all hover:scale-[1.01]"
              >
                Apply For Growth Engine
              </button>
            </div>

            {/* Model 3: Enterprise & Multi-City */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  ENTERPRISE MANDATE
                </span>
                <h3 className="text-lg font-black text-[#0D2040] mb-2">
                  Multi-City Scale
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Bespoke growth squad for large EPC contractors expanding across Coimbatore, Chennai, Bengaluru, and Hyderabad.
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-5">
                  <span className="font-bold text-[#0D2040] block">Ideal Turnover:</span>
                  <span className="text-slate-500">₹100 Cr+ Multi-State Developers &amp; EPCs</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Multi-City Geo-Targeted Acquisition Campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dedicated Creative Crew &amp; On-Demand Video Production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Managing Director Authority &amp; Thought Leadership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Custom ERP / Salesforce CRM Pipeline Integrations</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openBookingModal("Enterprise Multi-City Expansion")}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 font-bold text-xs text-[#0D2040] hover:bg-slate-50 transition-colors"
              >
                Inquire For Enterprise
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. Final Action & Consultation Call                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 lg:py-24 bg-white text-center">
        <Container className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F58220] text-xs font-bold uppercase tracking-wider mb-4">
            NEXT STEPS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D2040] tracking-tight mb-4">
            Turn Your Construction Brand Into a Multi-Crore Contract Engine.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            Book a confidential 30-minute growth architecture session. We will evaluate your current pipeline, inspect competitor visibility, and show you the exact system blueprint tailored to your firm.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
            <button
              onClick={() => openBookingModal("Final Call-to-Action")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F58220] hover:bg-[#e07116] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Schedule Strategy Call</span>
            </button>
            <a
              href={getWhatsAppUrl("Hi Karthikeyan! I reviewed the Growth System client demo for construction contracts and would like to schedule a 30-min strategy session.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                feedback.playPop();
                feedback.triggerHaptic(10);
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message on WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-slate-400">
            Strict Confidentiality · Zero Aggressive Sales Pitch · Direct Discussion With Founder Karthikeyan T
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Discreet Demo Footer (Invisible from standard nav)                 */}
      {/* ------------------------------------------------------------------ */}
      <footer className="py-8 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#F58220]" />
              <span>MIN MURASU DIGITAL SOLUTIONS · PRIVATE CLIENT DEMO</span>
            </div>
            <div>
              <span>Confidential &amp; Proprietary System Architecture · Coimbatore &amp; Chennai</span>
            </div>
          </div>
        </Container>
      </footer>

      {/* ------------------------------------------------------------------ */}
      {/* Interactive Booking Modal                                          */}
      {/* ------------------------------------------------------------------ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              onClick={() => {
                feedback.playPop();
                setIsModalOpen(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {!formSubmitted ? (
              <div>
                <span className="text-[10px] font-bold text-[#F58220] uppercase tracking-wider block mb-1">
                  Confidential Strategy Session
                </span>
                <h3 id="modal-title" className="text-lg font-black text-[#0D2040] mb-2">
                  Request Growth Blueprint
                </h3>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  Plan Selected: <strong className="text-[#0D2040]">{selectedPlan}</strong>. Fill in below and we will send a customized architecture overview within 1 business day.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor={nameId} className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name &amp; Designation
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar, Managing Director"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220] text-xs text-slate-800 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={companyId} className="block text-xs font-bold text-slate-700 mb-1">
                      Construction / Contracting Firm Name
                    </label>
                    <input
                      id={companyId}
                      type="text"
                      required
                      placeholder="e.g. Apex Civil & Industrial Infra"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220] text-xs text-slate-800 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneId} className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Direct Mobile Number
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220] text-xs text-slate-800 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={projectTypeId} className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Construction Focus
                    </label>
                    <select
                      id={projectTypeId}
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220] text-xs text-slate-800 outline-none bg-white"
                    >
                      <option value="Industrial / Factory / PEB">Industrial / Factory / PEB</option>
                      <option value="Commercial Tech Park / Office">Commercial Tech Park / Office</option>
                      <option value="Cleanrooms & Pharma MEP">Cleanrooms &amp; Pharma MEP</option>
                      <option value="Infrastructure / Warehousing">Infrastructure / Warehousing</option>
                      <option value="High-Rise Residential / Villa">High-Rise Residential / Villa</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-[#F58220] hover:bg-[#e07116] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm &amp; Request Blueprint</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0D2040]">
                  Session Request Confirmed
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Founder Karthikeyan will review your firm’s profile (<strong>{formData.company}</strong>) and connect via WhatsApp within 4 business hours.
                </p>
                <div className="pt-2">
                  <a
                    href={getWhatsAppUrl(`Hi Karthikeyan, I just submitted the Growth System blueprint request for ${formData.company} (${formData.name}). Let's discuss!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => feedback.playPop()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Fast-Track on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
