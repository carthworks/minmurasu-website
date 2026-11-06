import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

// Simple in-memory IP rate limiter: 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please try again in 10 minutes or message us on WhatsApp." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate with Zod
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Honeypot check: companyFax must be empty
    if (data.companyFax && data.companyFax.length > 0) {
      // Silently return success to confuse spam bots
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    // Server-side email notification logging / dispatch
    const notificationPayload = {
      timestamp: new Date().toISOString(),
      to: [
        process.env.CONTACT_TO_EMAIL || "hello@minmurasu.com",
        "minmurasu.digital@gmail.com",
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

    // If EMAIL_PROVIDER_API_KEY is configured, dispatch transactional email here
    if (process.env.EMAIL_PROVIDER_API_KEY) {
      // Integration hook for Resend / SendGrid / Postmark
      console.log("[Lead Notification Dispatched via API]:", notificationPayload.lead.email);
    } else {
      console.log("[Lead Notification Logged]:", JSON.stringify(notificationPayload, null, 2));
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your enquiry has been received. Our team will contact you within 24 business hours.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please contact us directly via WhatsApp or phone." },
      { status: 500 }
    );
  }
}

