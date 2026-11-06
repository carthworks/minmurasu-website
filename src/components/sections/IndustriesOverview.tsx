import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Stethoscope,
  Building2,
  Factory,
  GraduationCap,
  Store,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const industryData = [
  {
    slug: "healthcare-clinics",
    title: "Healthcare Providers & Clinics",
    icon: Stethoscope,
    painPoint: "High no-show rates and unorganised enquiry management across channels.",
    solutions: [
      "Local SEO for medical specialties in Coimbatore & Chennai",
      "Automated appointment enquiry & WhatsApp follow-ups",
      "Clean, reassuring web experience with clear doctor credentials",
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate & Property Developers",
    icon: Building2,
    painPoint: "Junk leads from generic portals and slow initial outreach.",
    solutions: [
      "Dedicated, fast landing pages per residential/commercial project",
      "Google & Meta ad targeting verified high-intent buyers",
      "Instant WhatsApp brochure dispatch and lead qualification",
    ],
  },
  {
    slug: "manufacturing-industrial",
    title: "Manufacturing & Industrial SMEs",
    icon: Factory,
    painPoint: "Outdated product catalogues and lack of international or national B2B RFQ volume.",
    solutions: [
      "Modern specification catalogues with technical search visibility",
      "Inbound RFQ (Request for Quote) routing directly to sales directors",
      "Targeted search visibility for industrial component keywords",
    ],
  },
  {
    slug: "education-training",
    title: "Education & Training Businesses",
    icon: GraduationCap,
    painPoint: "High cost-per-lead during intake seasons and dropped enquiry follow-ups.",
    solutions: [
      "Cohort & admission enrollment landing pages with clear curricula",
      "Targeted Google Search campaigns for diploma & certification searches",
      "Automated email & WhatsApp nurture sequence for prospective students",
    ],
  },
  {
    slug: "retail-services",
    title: "Retail & Multi-Location Services",
    icon: Store,
    painPoint: "Competitors outranking on Google Maps and unmanaged customer reviews.",
    solutions: [
      "Google Business Profile optimisation and review generation campaigns",
      "Local store locator landing pages optimized for nearby searches",
      "Automated booking systems and direct WhatsApp customer enquiry lines",
    ],
  },
];

export default function IndustriesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Target Sectors"
          title="Tailored for Your Industry's Operational Realities"
          description="We do not apply a generic formula. Every industry has distinct buying cycles, regulatory considerations, and buyer expectations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryData.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.slug}
                className="rounded-2xl border border-slate-200/90 p-7 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0E7490] mb-5 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#14243A] mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200/50 p-2.5 rounded-lg mb-4">
                    <strong>Challenge:</strong> {ind.painPoint}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      How we help:
                    </div>
                    {ind.solutions.map((sol) => (
                      <div key={sol} className="flex items-start gap-2 text-xs text-[#475569]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7490] shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="text-xs font-bold text-[#0E7490] hover:text-[#14243A] inline-flex items-center gap-1 group"
                  >
                    <span>View {ind.title.split(" ")[0]} Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

