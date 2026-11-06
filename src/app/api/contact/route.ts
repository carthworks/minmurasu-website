import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";
import type { ContactFormData } from "@/lib/validation";
// Note: route handlers run on the Node.js runtime by default, which nodemailer requires.

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
    // 7. Deliver the lead by email. If delivery is not configured or fails, tell the
    //    visitor so they can use WhatsApp/phone instead — never report false success.
    const delivered = await sendLeadEmail(data, request);
    if (!delivered.ok) {
      console.error("[Contact API] Lead email not delivered:", delivered.reason);
      return NextResponse.json(
        {
          error: `We couldn't send your enquiry right now. Please WhatsApp or call us on ${siteConfig.phones.primaryDisplay} — we'll respond quickly.`,
        },
        { status: 503 }
      );
    }

    // Only remember the fingerprint after a successful send, so a failed attempt can be retried.
    recentPayloads.set(fingerprint, Date.now());

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your enquiry has been received. Our team will contact you within one business day.",
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

/* ------------------------------------------------------------------ */
/* Lead email delivery (Gmail SMTP with an App Password)               */
/* ------------------------------------------------------------------ */

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function sendLeadEmail(
  data: ContactFormData,
  request: Request
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return { ok: false, reason: "GMAIL_USER / GMAIL_APP_PASSWORD not set" };
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.emails.primary;
  const referer = request.headers.get("referer") || "unknown page";

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company || "Not provided"],
    ["Website", data.website || "Not provided"],
    ["Service", data.service],
    ["Budget", data.budget || "Not specified"],
    ["Preferred contact", data.preferredContact],
    ["Submitted from", referer],
  ];

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${data.message}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#0D2040">
      <h2 style="margin:0 0 12px">New website enquiry — ${escapeHtml(data.service)}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#64748b;white-space:nowrap">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <p style="font-size:14px;margin-top:16px"><strong>Message</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    </div>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"${siteConfig.name} Website" <${user}>`,
      to,
      replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
      subject: `New enquiry: ${data.service} — ${data.name}`,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
