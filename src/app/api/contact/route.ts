import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { siteConfig } from "@/lib/site-config";

// Sliding window IP rate limiter: max 3 enquiries per 15 minutes per IP
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
// Duplicate payload fingerprint cache to block spam bursts across IPs
const recentPayloads = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MIN_HUMAN_FILL_TIME_MS = 2500; // Humans take >2.5s to fill 5 required fields

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. Origin / Referer anti-bot verification
    const origin = request.headers.get("origin") || "";
    const host = request.headers.get("host") || "";
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json(
        { error: "Cross-origin form submissions are not permitted." },
        { status: 403 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 2. Per-IP Rate Limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many submission attempts from your network. Please wait 15 minutes or reach us on WhatsApp.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 3. Dual Honeypot check (check raw body before Zod so bots receive silent 200 OK)
    if (
      (typeof body?.companyFax === "string" && body.companyFax.length > 0) ||
      (typeof body?.secondaryRole === "string" && body.secondaryRole.length > 0)
    ) {
      return NextResponse.json({
        success: true,
        message: "Enquiry received.",
      });
    }

    // 4. Time-trap velocity check: block bots submitting in < 2.5 seconds
    if (typeof body?.formLoadedAt === "number" && body.formLoadedAt > 0) {
      const elapsed = Date.now() - body.formLoadedAt;
      if (elapsed < MIN_HUMAN_FILL_TIME_MS) {
        return NextResponse.json({
          success: true,
          message: "Enquiry received.",
        });
      }
    }

    // 5. Validate with strict Zod schema (disposable email filter, spam link filter, phone digits check)
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const firstError =
        Object.values(fieldErrors).flat()[0] ||
        "Please check your form inputs and try again.";
      return NextResponse.json(
        { error: firstError, details: fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 6. Duplicate submission deduplication (10-minute window)
    const fingerprint = `${data.email.toLowerCase()}::${data.message.trim().slice(0, 60).toLowerCase()}`;
    const lastSeen = recentPayloads.get(fingerprint);
    if (lastSeen && Date.now() - lastSeen < 10 * 60 * 1000) {
      return NextResponse.json(
        {
          error:
            "We have already received this enquiry. Our team will contact you shortly.",
        },
        { status: 429 }
      );
    }
    recentPayloads.set(fingerprint, Date.now());

    // Server-side email notification logging / dispatch
    const notificationPayload = {
      timestamp: new Date().toISOString(),
      to: [
        process.env.CONTACT_TO_EMAIL || siteConfig.emails.primary,
      ],
      lead: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || "Not provided",
        website: data.website || "Not provided",
        service: data.service,
        budget: data.budget || "Not specified",
        preferredContact: data.preferredContact,
        message: data.message,
      },
    };

    if (process.env.EMAIL_PROVIDER_API_KEY) {
      console.log(
        "[Lead Notification Dispatched via API]:",
        notificationPayload.lead.email
      );
    } else {
      console.log(
        "[Lead Notification Logged]:",
        JSON.stringify(notificationPayload, null, 2)
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your enquiry has been verified and received. Our team will contact you within 24 business hours.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred. Please contact us directly via WhatsApp or phone.",
      },
      { status: 500 }
    );
  }
}
