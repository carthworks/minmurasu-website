import React from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  MessageSquare,
  Database,
  UserCheck,
  BellRing,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    title: "Customer Asks a Question",
    desc: "A visitor arrives and asks specific service questions. An approved AI assistant answers verified business facts instantly.",
    icon: MessageSquare,
    badge: "Instant Response",
  },
  {
    step: "02",
    title: "Enquiry Saved Automatically",
    desc: "Contact details and service requirements are validated and synced immediately to your CRM or database with zero manual copy-pasting.",
    icon: Database,
    badge: "CRM Sync",
  },
  {
    step: "03",
    title: "Sent to the Right Person",
    desc: "The enquiry is routed to the appropriate specialist (e.g. clinic manager, industrial sales lead) based on service category and location.",
    icon: UserCheck,
    badge: "Targeted Routing",
  },
  {
    step: "04",
    title: "Team Alert & Human Handover",
    desc: "Your sales or admissions team receives an instant WhatsApp/Slack/Email notification with conversation context, ready to close the deal.",
    icon: BellRing,
    badge: "Human Handover",
  },
];

export default function AISection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Workflow Automation"
          title="Make Every Enquiry Easier to Manage"
          description="Bridge the gap between marketing interest and human sales follow-up. Practical automation that speeds response time while keeping your human team firmly in control."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-12">
          {workflowSteps.map((ws, i) => {
            const Icon = ws.icon;
            return (
              <div
                key={ws.step}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:border-[#0082CA]/40 transition-colors relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#0082CA]">
                      Step {ws.step}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {ws.badge}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#F0F8FF] text-[#0082CA] border border-[#BAE6FD] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0D2040] mb-2">
                    {ws.title}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {ws.desc}
                  </p>
                </div>

                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Realistic compliance note */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3 max-w-3xl mx-auto">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Platform &amp; Compliance Disclosure:</strong> WhatsApp Business API integrations
            require registered Meta Business accounts, approved message templates, opt-in consent, and are subject
            to Meta conversation charges. We do not claim fully autonomous customer handling without human
            supervision.
          </div>
        </div>
      </Container>
    </section>
  );
}

