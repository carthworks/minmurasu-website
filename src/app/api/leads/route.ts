import {
  anonymiseIp,
  detectBrowser,
  detectDevice,
  detectOS,
  extractRawIp,
  extractSource,
  isIpIgnored,
  recordEvent,
} from "@/lib/first-party-analytics";
import { handleLeadSubmission } from "@/lib/leads/handler";

// Node.js runtime (default) is required for nodemailer and postgres.
// Allows after() deliveries (email + webhook retry) to finish on serverless hosts.
export const maxDuration = 30;

export async function POST(request: Request) {
  let leadBody: Record<string, unknown> = {};
  try {
    leadBody = (await request.clone().json()) as Record<string, unknown>;
  } catch {
    // ignore malformed json — handleLeadSubmission will validate it
  }

  const response = await handleLeadSubmission(request);

  // Record successful form submissions as first-party "enquiry" analytics events
  if (response.ok) {
    try {
      const rawIp = extractRawIp(request);
      const host = (request.headers.get("host") ?? "").toLowerCase();
      const isLocal =
        host.startsWith("localhost") ||
        host.startsWith("127.0.0.1") ||
        host.startsWith("[::1]");

      if (!isLocal && !(await isIpIgnored(rawIp))) {
        const ua = (request.headers.get("user-agent") ?? "").slice(0, 300);
        const referrer = request.headers.get("referer") ?? "";
        const service =
          typeof leadBody.service === "string" && leadBody.service.trim()
            ? leadBody.service.trim()
            : typeof leadBody.interest === "string" && leadBody.interest.trim()
              ? leadBody.interest.trim()
              : "General Enquiry";
        const utmSource =
          typeof leadBody.utm_source === "string"
            ? leadBody.utm_source
            : undefined;

        await recordEvent({
          type: "enquiry",
          ts: Date.now(),
          ip: anonymiseIp(rawIp),
          path: "/contact",
          label: `Contact Form - ${service}`,
          detail: service,
          referrer,
          source: extractSource(referrer, utmSource),
          utmSource,
          ua,
          device: detectDevice(ua),
          browser: detectBrowser(ua),
          os: detectOS(ua),
          country:
            request.headers.get("x-vercel-ip-country") ??
            request.headers.get("cf-ipcountry") ??
            undefined,
          city: request.headers.get("x-vercel-ip-city")
            ? decodeURIComponent(request.headers.get("x-vercel-ip-city")!)
            : undefined,
        });
      }
    } catch {
      // Never affect lead submission response
    }
  }

  return response;
}
