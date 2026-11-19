/**
 * MIN MURASU CRM landing page — all copy in one place.
 * Facts and prices mirror the sales deck (public/crm/minmurasu-crm-sales-deck.pdf).
 * Update both together so the page and the PDF never disagree.
 */

export const crmAssets = {
  deckPdf: "/crm/minmurasu-crm-sales-deck.pdf",
  deckFileName: "MIN-MURASU-CRM-Sales-Deck.pdf",
  dashboardImage: "/crm/crm-dashboard.png",
  /**
   * TODO: paste the demo reel URL here when it's ready.
   * A local file ("/video/crm-demo.mp4") plays in a <video>; a YouTube embed URL
   * ("https://www.youtube-nocookie.com/embed/<id>") plays in an iframe.
   * Empty = the "demo coming soon" placeholder is shown.
   */
  demoVideoUrl: "",
};

export const crmWhatsAppMessage =
  "Hi MIN MURASU team! 👋 I run a digital agency and I'm interested in the white-label MIN MURASU CRM.\n\n• Agency name: \n• Team size: \n• Number of clients: \n\nCan you show me a quick demo?";

export const crmHero = {
  eyebrow: "White-label CRM for digital agencies",
  title: "Run your whole agency",
  titleAccent: "under your own brand.",
  subtitle:
    "Client approvals, leads, billing and WhatsApp in one branded portal — on your logo, your colours and your domain. Your clients log in to your software, not ours.",
  proof: ["Set up for you in days", "Billing in ₹, plus GST", "English & Tamil support"],
};

export const crmFeatures = [
  {
    icon: "LayoutDashboard",
    title: "Branded client portal",
    text: "Each client logs in to see only their own posts, deliverables and invoices — under your agency's name.",
  },
  {
    icon: "CheckCheck",
    title: "One-tap approvals",
    text: "Clients approve or request changes in a single tap, with a timestamped record of every decision.",
  },
  {
    icon: "KanbanSquare",
    title: "Leads & pipeline",
    text: "Track every enquiry from first message to signed retainer, with stages that match how agencies sell.",
  },
  {
    icon: "FolderKanban",
    title: "Projects & deliverables",
    text: "Plan campaigns, assign work to your team and see what's due, overdue or waiting on the client.",
  },
  {
    icon: "IndianRupee",
    title: "Billing in ₹",
    text: "Raise invoices, record payments and see exactly what each client still owes.",
  },
  {
    icon: "MessageCircle",
    title: "WhatsApp built in",
    text: "Connect your WhatsApp Business number and capture incoming enquiries straight into your pipeline.",
  },
  {
    icon: "Sparkles",
    title: "AI assistant",
    text: "Ask about revenue, campaigns or overdue work in plain English and get an answer in seconds.",
  },
  {
    icon: "FileBarChart",
    title: "Branded PDF reports",
    text: "Send polished monthly reports on your letterhead without copy-pasting between tools.",
  },
];

export const crmBenefits = [
  {
    stat: "01",
    title: "Look bigger than you are",
    text: "Clients see your logo, colours and domain on every screen. It feels like software your agency built — and it raises what you can charge.",
  },
  {
    stat: "02",
    title: "Sign-offs without the chase",
    text: "One link replaces long WhatsApp threads and approvals lost in email. Work ships sooner, and nobody argues about who approved what.",
  },
  {
    stat: "03",
    title: "Cash flow you can see",
    text: "Every invoice and payment sits next to the client it belongs to, so overdue retainers surface before they become a problem.",
  },
  {
    stat: "04",
    title: "Scale without adding admin",
    text: "Six roles from admin to client mean you can add account managers and clients without spreadsheets, shared passwords or extra coordinators.",
  },
];

export const crmTrust = [
  { title: "Client data kept apart", text: "Isolation enforced in the database, not just on screen." },
  { title: "Fast in India", text: "Hosted in Mumbai on Next.js and Vercel." },
  { title: "Full audit trail", text: "Key changes logged with who made them and when." },
  { title: "Done-for-you setup", text: "We set up your portal and import your clients." },
];

export type CrmPlan = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  seats: string;
  clients: string;
  features: string[];
  popular?: boolean;
};

export const crmPlans: CrmPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹3,999",
    tagline: "For boutique agencies getting organised.",
    seats: "5 team seats",
    clients: "Up to 15 clients",
    features: ["Client portal & approvals", "Leads, pipeline & billing", "Projects & deliverables", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹9,999",
    tagline: "For agencies ready to put their brand on everything.",
    seats: "15 team seats",
    clients: "Up to 50 clients",
    features: [
      "Everything in Starter",
      "Your logo & colours",
      "WhatsApp & AI assistant",
      "Branded PDF reports",
    ],
    popular: true,
  },
  {
    id: "agency-pro",
    name: "Agency Pro",
    price: "₹19,999",
    tagline: "For multi-team agencies that want it fully theirs.",
    seats: "Unlimited team seats",
    clients: "Unlimited clients",
    features: [
      "Everything in Growth",
      "Your own domain",
      "Setup & data migration",
      "Priority support",
    ],
  },
];

export const teamSizes = ["Just me", "2–5 people", "6–15 people", "16–50 people", "50+ people"];

export const crmSteps = [
  { step: "Step 1", title: "Book a 20-minute demo", text: "See the portal with your own workflow in mind." },
  { step: "Step 2", title: "We set up your branded portal", text: "Logo, colours, team and clients imported for you." },
  { step: "Step 3", title: "Invite your first clients", text: "Send one link. Approvals start the same day." },
];

export const crmFaqs = [
  {
    question: "What does “white-label” mean here?",
    answer:
      "Your clients see your agency's logo and colours throughout the portal, and on Agency Pro it runs on your own domain (for example portal.youragency.in). MIN MURASU branding stays out of their view.",
  },
  {
    question: "Do my clients need to install anything?",
    answer:
      "No. Clients open a link in any browser, on mobile or desktop, and see only their own work and invoices.",
  },
  {
    question: "Can you move our existing clients and leads over?",
    answer:
      "Yes. Setup and data migration are included on Agency Pro, and we help every plan get started with a live walkthrough for your team.",
  },
  {
    question: "Are prices inclusive of GST?",
    answer: "No — all prices are per month, plus GST, billed in Indian rupees.",
  },
];
