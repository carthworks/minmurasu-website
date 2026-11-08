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

export function buildRoiWhatsAppMessage(input: RoiInput, result: RoiResult, responseLabel: string): string {
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
    "*Estimated range (not a guarantee)*",
    `• Extra enquiries a month: ${formatRange(result.extraLeads.low, result.extraLeads.high, formatMonthlyCount)}`,
    `• Extra customers a month: ${formatRange(result.extraCustomers.low, result.extraCustomers.high, formatMonthlyCount)}`,
    `• Extra revenue a year, once running: ${formatRange(result.annualGain.low, result.annualGain.high, formatRoughINR)}`,
    "",
    "Could you check whether this is realistic for my business?",
    "My business: ",
  ].join("\n");
}
