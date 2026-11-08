/**
 * ROI calculator model. Pure functions, no rounding until display.
 *
 * The lift and loss constants below are planning assumptions, not measured
 * results or published benchmarks. Replace them with client data once
 * Min Murasu has before/after numbers.
 */
export type ResponseTimeSpeed = "fast" | "medium" | "slow";

export const responseLossPct: Record<ResponseTimeSpeed, number> = {
  fast: 0.1,
  medium: 0.38,
  slow: 0.65,
};

export const roiScenarios = {
  conservative: { conversionLift: 1.2, targetLossPct: 0.2 },
  expected: { conversionLift: 1.4, targetLossPct: 0.12 },
} as const;

const MAX_CONVERSION_PCT = 8;

export interface RoiInput {
  visitors: number;
  conversionPct: number;
  closePct: number;
  dealValue: number;
  responseTime: ResponseTimeSpeed;
}

export interface RoiPoint {
  rawLeads: number;
  leadsLost: number;
  leads: number;
  customers: number;
  monthlyValue: number;
}

export interface RoiResult {
  baseline: RoiPoint;
  conservative: RoiPoint;
  expected: RoiPoint;
  extraLeads: { low: number; high: number };
  extraCustomers: { low: number; high: number };
  annualGain: { low: number; high: number };
  expectedMultiple: number;
}

function point(input: RoiInput, conversionPct: number, lossPct: number): RoiPoint {
  const rawLeads = (input.visitors * conversionPct) / 100;
  const leadsLost = rawLeads * lossPct;
  const leads = rawLeads - leadsLost;
  const customers = (leads * input.closePct) / 100;
  return { rawLeads, leadsLost, leads, customers, monthlyValue: customers * input.dealValue };
}

export function calculateRoi(input: RoiInput): RoiResult {
  const currentLoss = responseLossPct[input.responseTime];
  const scenario = (s: { conversionLift: number; targetLossPct: number }) =>
    point(
      input,
      Math.max(input.conversionPct, Math.min(MAX_CONVERSION_PCT, input.conversionPct * s.conversionLift)),
      // A business that already responds faster than the target keeps its own loss rate.
      Math.min(currentLoss, s.targetLossPct)
    );

  const baseline = point(input, input.conversionPct, currentLoss);
  const conservative = scenario(roiScenarios.conservative);
  const expected = scenario(roiScenarios.expected);

  return {
    baseline,
    conservative,
    expected,
    extraLeads: { low: conservative.leads - baseline.leads, high: expected.leads - baseline.leads },
    extraCustomers: {
      low: conservative.customers - baseline.customers,
      high: expected.customers - baseline.customers,
    },
    annualGain: {
      low: (conservative.monthlyValue - baseline.monthlyValue) * 12,
      high: (expected.monthlyValue - baseline.monthlyValue) * 12,
    },
    expectedMultiple: baseline.monthlyValue > 0 ? expected.monthlyValue / baseline.monthlyValue : 1,
  };
}

const inr = (val: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

/** Short rupee amount. Rounds to what the model can honestly support. */
export function formatRoughINR(val: number): string {
  if (val >= 1_00_00_000) return `₹${(val / 1_00_00_000).toFixed(1)} Cr`;
  if (val >= 1_00_000) return `₹${(val / 1_00_000).toFixed(1)} L`;
  return inr(Math.round(val / 1000) * 1000);
}

/** Low volumes read as "1 every 3 months" so we never show a false whole customer. */
export function formatMonthlyCount(val: number): string {
  if (val >= 1) return `+${Math.round(val)}`;
  if (val <= 0) return "0";
  return `1 every ${Math.max(2, Math.round(1 / val))} months`;
}

export function formatRange(low: number, high: number, format: (n: number) => string): string {
  const a = format(low);
  const b = format(high);
  return a === b ? a : `${a} to ${b}`;
}

export interface RoiRecommendation {
  headline: string;
  bottleneck: string;
  summary: string;
  actions: [string, string, string];
  whatsappSummary: string;
}

/**
 * Diagnostic logic: determines the primary growth bottleneck and prescribes
 * a 3-step action plan based on user metrics.
 */
export function getRoiRecommendation(input: RoiInput): RoiRecommendation {
  // Scenario 1: Severe Lead Decay from slow response time (30m to 24+h)
  if (input.responseTime === "slow" || input.responseTime === "medium") {
    const lossPct = input.responseTime === "slow" ? "65%" : "38%";
    return {
      headline: "Stop Lead Leakage with Instant WhatsApp Triage",
      bottleneck: `Slow lead follow-up (~${lossPct} drop-off)`,
      summary: `You are currently losing an estimated ${lossPct} of inbound prospects simply because they inquire with multiple providers and buy from whoever responds first.`,
      actions: [
        "Connect website forms and ad leads to instant WhatsApp triage (< 60s automated reply).",
        "Re-engineer mobile landing page with high-visibility call & WhatsApp buttons.",
        "Set up instant sales rep alerts so warm prospects never wait more than 5 minutes.",
      ],
      whatsappSummary: `Fix ${lossPct} lead decay via instant WhatsApp triage (<60s) before spending more on ads`,
    };
  }

  // Scenario 2: Website Conversion Friction (Low conversion rate < 1.2%)
  if (input.conversionPct < 1.2) {
    return {
      headline: "Overhaul Mobile Landing Page Speed & Conversion Friction",
      bottleneck: `High visitor bounce rate (${input.conversionPct}% conversion)`,
      summary: `Over ${(100 - input.conversionPct).toFixed(1)}% of your visitors leave without inquiring—typically caused by slow mobile load times, weak value propositions, or cluttered forms.`,
      actions: [
        "Replace slow templates with a sub-second Next.js landing page built for 4G mobile speeds.",
        "Clarify above-the-fold commercial offer and add single-tap WhatsApp contact triggers.",
        "Shorten lead forms to remove hesitation and eliminate unnecessary friction.",
      ],
      whatsappSummary: "Overhaul mobile landing page speed and CTA friction to turn more visitors into enquiries",
    };
  }

  // Scenario 3: High-Ticket Lead Qualification (Deal Value >= ₹50,000, Close Rate < 20%)
  if (input.dealValue >= 50000 && input.closePct < 20) {
    return {
      headline: "Pre-Qualify High-Intent Decision Makers",
      bottleneck: `Unqualified enquiries dragging down close rate (${input.closePct}%)`,
      summary: `With high transaction sizes (${inr(input.dealValue)}/deal), your sales capacity is best spent on serious buyers rather than tire-kickers.`,
      actions: [
        "Deploy automated WhatsApp qualification questions (budget, project timeline, decision role).",
        "Focus ad targeting on high-intent commercial keywords instead of broad informational search.",
        "Implement automated case-study nurturing sequences for longer B2B evaluation cycles.",
      ],
      whatsappSummary: "Implement automated qualification and high-intent keyword targeting for higher deal closures",
    };
  }

  // Scenario 4: Funnel is healthy, primary bottleneck is traffic scale
  return {
    headline: "Scale Top-of-Funnel Media into Your High-Performing Funnel",
    bottleneck: "Traffic volume & commercial search market share",
    summary: `Your conversion fundamentals (${input.conversionPct}%) and response speed are strong. The highest-leverage move is scaling qualified traffic into this proven funnel.`,
    actions: [
      "Launch Google Search campaigns targeting high-intent commercial and localized buyer queries.",
      "Configure server-side Meta CAPI and Google Tag Manager to train algorithms on real conversions.",
      "Dominate local search & Google 3-Pack rankings to capture regional market share.",
    ],
    whatsappSummary: "Scale high-intent Google Search and local SEO to feed our proven conversion funnel",
  };
}

export function buildRoiWhatsAppMessage(input: RoiInput, result: RoiResult, responseLabel: string): string {
  const rec = getRoiRecommendation(input);
  return [
    "Hi MIN MURASU, I used your ROI calculator on minmurasu.digital.",
    "",
    "*My current numbers*",
    `• Visitors or ad clicks: ${input.visitors.toLocaleString("en-IN")} a month`,
    `• Website conversion: ${input.conversionPct}%`,
    `• Close rate: ${input.closePct}%`,
    `• Value per customer: ${inr(input.dealValue)}`,
    `• Lead response time: ${responseLabel}`,
    "",
    "*Estimated extra revenue once running (range)*",
    `• Extra enquiries: ${formatRange(result.extraLeads.low, result.extraLeads.high, formatMonthlyCount)} a month`,
    `• Extra customers: ${formatRange(result.extraCustomers.low, result.extraCustomers.high, formatMonthlyCount)} a month`,
    `• Extra revenue: ${formatRange(result.annualGain.low, result.annualGain.high, formatRoughINR)} a year`,
    "",
    "*Diagnosed growth recommendation*",
    `• Focus: ${rec.headline}`,
    `• Strategy: ${rec.whatsappSummary}`,
    "",
    "Could you check whether this is realistic for my business?",
    "My business: ",
  ].join("\n");
}
