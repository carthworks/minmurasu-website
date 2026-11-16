import { handleLeadSubmission } from "@/lib/leads/handler";

// Legacy endpoint kept for cached pages and old clients. New code posts to /api/leads.
export const maxDuration = 30;

export async function POST(request: Request) {
  return handleLeadSubmission(request);
}
