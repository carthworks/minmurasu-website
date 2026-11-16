import { handleLeadSubmission } from "@/lib/leads/handler";

// Node.js runtime (default) is required for nodemailer and postgres.
// Allows after() deliveries (email + webhook retry) to finish on serverless hosts.
export const maxDuration = 30;

export async function POST(request: Request) {
  return handleLeadSubmission(request);
}
