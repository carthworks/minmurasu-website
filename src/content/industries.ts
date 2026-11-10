export interface IndustryDetail {
  slug: string;
  title: string;
  headline: string;
  summary: string;
  industryProblems: string[];
  growthPlaybook: { title: string; desc: string }[];
  keyDeliverables: string[];
  metricsTracked: string[];
}

export const industriesData: Record<string, IndustryDetail> = {
  "healthcare-clinics": {
    slug: "healthcare-clinics",
    title: "Healthcare Providers & Clinics",
    headline: "Ethical Patient Acquisition & Frictionless Appointment Workflows",
    summary:
      "We help multi-specialty clinics, diagnostic centres, and medical practitioners establish trustworthy digital presence, rank locally for specialty treatments, and automate appointment enquiries.",
    industryProblems: [
      "High no-show rates for consultations without automated WhatsApp reminders.",
      "Patients struggling to find authentic doctor credentials and treatment specifics.",
      "Local map pack searches dominated by competing aggregators.",
    ],
    growthPlaybook: [
      {
        title: "Medical Specialty Local SEO",
        desc: "Optimizing Google Business Profiles and localized content for medical treatments in Coimbatore and surrounding districts.",
      },
      {
        title: "Reassuring Web Experience",
        desc: "Clean, fast-loading clinic sites with verified doctor profiles, patient FAQs, and transparent facility overviews.",
      },
      {
        title: "WhatsApp Appointment Confirmation",
        desc: "Instant automated WhatsApp confirmations and location directions for booked patients.",
      },
    ],
    keyDeliverables: [
      "Google Business Profile optimization & local citation audit",
      "Specialty clinic landing pages",
      "WhatsApp appointment reminder workflow",
      "Monthly local search and call volume reporting",
    ],
    metricsTracked: [
      "Verified appointment inquiries and phone calls",
      "Top 3 local Google Maps visibility for specialty searches",
      "Reduction in appointment no-show rates",
    ],
  },

  "real-estate": {
    slug: "real-estate",
    title: "Real Estate & Property Developers",
    headline: "High-Intent Buyer Lead Generation & Instant Qualification",
    summary:
      "We design project-specific landing pages and performance ad campaigns that filter out casual browsers and deliver verified property enquiries directly to your sales team.",
    industryProblems: [
      "Spending lakhs on portal listings that deliver low-intent, shared leads.",
      "Slow initial contact allowing warm buyers to engage competing projects.",
      "Disconnected CRM tracking failing to attribute site visits to source campaigns.",
    ],
    growthPlaybook: [
      {
        title: "Dedicated Project Landing Pages",
        desc: "High-speed landing pages featuring floor plans, master layouts, location advantages, and virtual tour options.",
      },
      {
        title: "High-Intent Meta & Google Ads",
        desc: "Hyper-targeted campaigns focused on specific buyer income tiers, NRIs, and commercial investors.",
      },
      {
        title: "Instant Brochure & Qualification Bot",
        desc: "Automated WhatsApp delivery of project brochures with instant qualification questions before human sales takeover.",
      },
    ],
    keyDeliverables: [
      "Custom project landing page with fast mobile responsiveness",
      "Google Search & Meta Ad campaign architecture",
      "Automated WhatsApp brochure distribution bot",
      "CRM webhook setup and cost-per-lead tracking dashboard",
    ],
    metricsTracked: [
      "Cost per verified lead (CPL)",
      "Site visit booking conversion rate",
      "Direct brochure download engagement",
    ],
  },

  "manufacturing-industrial": {
    slug: "manufacturing-industrial",
    title: "Manufacturing & Industrial SMEs",
    headline: "B2B Product Visibility & High-Value RFQ Pipeline Generation",
    summary:
      "Coimbatore is an industrial powerhouse. We help pump manufacturers, textile machinery builders, foundries, and precision engineering SMEs showcase their capabilities nationally and internationally.",
    industryProblems: [
      "Outdated static websites that fail to explain complex technical specifications.",
      "Reliance on domestic trade fairs with zero inbound digital RFQ pipeline.",
      "Lack of structured digital product catalogues for procurement engineers.",
    ],
    growthPlaybook: [
      {
        title: "Technical Specification Catalogues",
        desc: "Digital catalogues organized by industrial standards, material grades, and application tolerances.",
      },
      {
        title: "Industrial B2B Search Optimisation",
        desc: "Ranking for exact OEM, component, and technical manufacturing search terms searched by procurement teams.",
      },
      {
        title: "Direct RFQ Routing",
        desc: "Structured enquiry forms that capture technical requirements, CAD file uploads, and quantities directly to sales directors.",
      },
    ],
    keyDeliverables: [
      "Modern technical catalogue website with CAD/drawing enquiry forms",
      "Industrial B2B keyword strategy",
      "LinkedIn outreach and thought leadership content direction",
      "Lead attribution dashboard",
    ],
    metricsTracked: [
      "Qualified B2B RFQs received per month",
      "Procurement decision-maker visits from target geographies",
      "Search visibility for specialized industrial equipment terms",
    ],
  },

  "education-training": {
    slug: "education-training",
    title: "Education & Training Businesses",
    headline: "Predictable Student Enrollments & Structured Admission Funnels",
    summary:
      "From professional certification academies to higher education institutions, we build predictable student recruitment funnels with transparent acquisition economics.",
    industryProblems: [
      "Frantic last-minute admissions marketing with high ad spend and low yield.",
      "Prospective students dropping out during complicated enquiry processes.",
      "Unmanaged social media accounts creating negative student sentiment.",
    ],
    growthPlaybook: [
      {
        title: "Curriculum-Focused Landing Pages",
        desc: "Course pages highlighting syllabus, placement outcomes, faculty credentials, and fee structures.",
      },
      {
        title: "Seasonal Paid Search Sprints",
        desc: "Aggressive paid search capture aligned with entrance exam and graduation timelines.",
      },
      {
        title: "Automated Admission Nurture",
        desc: "Multi-touch email and WhatsApp sequences addressing common counseling concerns and fee payment deadlines.",
      },
    ],
    keyDeliverables: [
      "Admission funnel landing page architecture",
      "Google Search campaign for high-intent course queries",
      "WhatsApp automated syllabus and prospectus delivery",
      "Admissions pipeline dashboard",
    ],
    metricsTracked: [
      "Cost per completed application form",
      "Counseling call booking conversion rate",
      "Enrollment conversion rate",
    ],
  },

  "retail-services": {
    slug: "retail-services",
    title: "Retail & Local Services",
    headline: "Local Search Domination & Automated Customer Booking",
    summary:
      "Drive predictable foot traffic and service bookings for premium retail showrooms, auto service networks, and consumer service centers across Coimbatore and Tamil Nadu.",
    industryProblems: [
      "Losing nearby customers to competitors with higher Google Maps ratings.",
      "Disconnected store locators that confuse mobile shoppers.",
      "Manual phone booking that leads to missed customer calls during peak hours.",
    ],
    growthPlaybook: [
      {
        title: "Local Map Pack & Review Optimization",
        desc: "Systematic review generation and local map listing optimization for multiple store branches.",
      },
      {
        title: "Localized Landing Pages",
        desc: "Fast, location-specific pages showing branch hours, parking, staff, and real-time inventory or service menus.",
      },
      {
        title: "One-Click WhatsApp Booking",
        desc: "Seamless WhatsApp booking widget with location autodetection for instant appointment scheduling.",
      },
    ],
    keyDeliverables: [
      "Branch-level Google Business Profile audits & remediation",
      "Store locator web experience",
      "Review management workflow",
      "Local search ranking reports",
    ],
    metricsTracked: [
      "Google Maps direction requests and phone call clicks",
      "Direct WhatsApp store enquiries",
      "Review velocity and average rating score",
    ],
  },
};

// Aliases for URL variants & backward compatibility
industriesData["retail-local-services"] = {
  ...industriesData["retail-services"],
  slug: "retail-local-services",
};

