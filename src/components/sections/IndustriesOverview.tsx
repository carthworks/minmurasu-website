import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig, getPlaybookLabel } from "@/lib/site-config";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  GraduationCap,
  Stethoscope,
  Store,
} from "lucide-react";
import Link from "next/link";

const iconMap = {
  Stethoscope,
  Building2,
  Factory,
  GraduationCap,
  Store,
};

const industryDetails: Record<
  string,
  { painPoint: string; solutions: string[] }
> = {
  "healthcare-clinics": {
    painPoint: "High no-show rates and unorganised enquiry management across channels.",
    solutions: [
      "Local SEO for medical specialties in Coimbatore & Chennai",
      "Automated appointment enquiry & WhatsApp follow-ups",
      "Clean, reassuring web experience with clear doctor credentials",
    ],
  },
  "real-estate": {
    painPoint: "Junk leads from generic portals and slow initial outreach.",
    solutions: [
      "Dedicated, fast landing pages per residential/commercial project",
      "Google & Meta ad targeting verified high-intent buyers",
      "Instant WhatsApp brochure dispatch and lead qualification",
    ],
  },
  "manufacturing-industrial": {
    painPoint: "Outdated product catalogues and lack of international or national B2B RFQ volume.",
    solutions: [
      "Modern specification catalogues with technical search visibility",
      "Inbound RFQ (Request for Quote) routing directly to sales directors",
      "Targeted search visibility for industrial component keywords",
    ],
  },
  "education-training": {
    painPoint: "High cost-per-lead during intake seasons and dropped enquiry follow-ups.",
    solutions: [
      "Cohort & admission enrollment landing pages with clear curricula",
      "Targeted Google Search campaigns for diploma & certification searches",
      "Automated email & WhatsApp nurture sequence for prospective students",
    ],
  },
  "retail-services": {
    painPoint: "Competitors outranking on Google Maps and unmanaged customer reviews.",
    solutions: [
      "Google Business Profile optimisation and review generation campaigns",
      "Local store locator landing pages optimized for nearby searches",
      "Automated booking systems and direct WhatsApp customer enquiry lines",
    ],
  },
};

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
          {siteConfig.industries.map((ind, idx) => {
            const Icon = iconMap[ind.icon as keyof typeof iconMap] || Store;
            const detail = industryDetails[ind.slug];
            return (
              <div
                key={ind.slug}
                className="rounded-2xl border border-slate-200/90 p-7 bg-white hover:bg-[#F0F8FF]/30 hover:border-[#0082CA]/40 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0D2040] text-white flex items-center justify-center shadow-xs group-hover:bg-[#F58220] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      SECTOR 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0D2040] mb-3">
                    {ind.title}
                  </h3>
                  {detail && (
                    <>
                      <p className="text-xs text-orange-950 bg-orange-50/90 border border-orange-200/70 p-3 rounded-xl mb-5 leading-relaxed">
                        <strong className="text-[#F58220] uppercase tracking-wider text-[10px] block mb-0.5">
                          Operational Bottleneck:
                        </strong>
                        {detail.painPoint}
                      </p>
                      <div className="space-y-2.5 mb-6">
                        <div className="text-[11px] font-extrabold text-[#0D2040] uppercase tracking-wider">
                          MIN MURASU Solution:
                        </div>
                        {detail.solutions.map((sol) => (
                          <div key={sol} className="flex items-start gap-2 text-xs text-[#475569]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0082CA] shrink-0 mt-0.5" />
                            <span>{sol}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="text-xs font-bold text-[#0082CA] group-hover:text-[#F58220] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{getPlaybookLabel(ind)}</span>
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

