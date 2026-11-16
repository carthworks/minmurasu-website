import "server-only";
import { NextResponse, after } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { leadSubmissionSchema, toLead } from "./types";
import { insertLead, isLeadStoreConfigured, markDelivery } from "./store";
import { sendLeadEmail } from "./email";
import { isWebhookConfigured, sendLeadWebhook } from "./webhook";
import { checkRateLimit, isDuplicate, leadFingerprint, rememberSubmission } from "./ratelimit";

const MIN_HUMAN_FILL_TIME_MS = 2500;

const originHost = (origin: string) => {
  try {
    return new URL(origin).host;
  } catch {
    return null; // e.g. "null" from sandboxed frames
  }
};

const silentOk = () => NextResponse.json({ success: true, message: "Enquiry received." });

/**
 * Lead pipeline:
 *   anti-bot checks → validate → dedupe → persist to Postgres
 *   → respond to the visitor → after(): email alert + signed webhook (n8n)
 *
 * If Postgres is not configured or the insert fails, the email alert is sent
 * synchronously instead, so a lead is never acknowledged without being delivered.
 */
export async function handleLeadSubmission(request: Request): Promise<Response> {
  try {
    const origin = request.headers.get("origin") || "";
    const host = request.headers.get("host") || "";
    if (origin && host && originHost(origin) !== host) {
      return NextResponse.json(
        { error: "Cross-origin form submissions are not permitted." },
        { status: 403 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!(await checkRateLimit(ip))) {
      return NextResponse.json(
        {
          error:
            "Too many submission attempts from your network. Please wait 15 minutes or reach us on WhatsApp.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypots: bots get a silent 200.
    if (
      (typeof body?.companyFax === "string" && body.companyFax.length > 0) ||
      (typeof body?.secondaryRole === "string" && body.secondaryRole.length > 0)
    ) {
      return silentOk();
    }

    // Time trap: submissions faster than a human could type.
    if (typeof body?.formLoadedAt === "number" && body.formLoadedAt > 0) {
      if (Date.now() - body.formLoadedAt < MIN_HUMAN_FILL_TIME_MS) return silentOk();
    }

    const validation = leadSubmissionSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const firstError =
        Object.values(fieldErrors).flat()[0] || "Please check your form inputs and try again.";
      return NextResponse.json({ error: firstError, details: fieldErrors }, { status: 400 });
    }

    const lead = toLead(validation.data, request.headers.get("referer"));

    const fingerprint = await leadFingerprint(lead.email, lead.message);
    if (await isDuplicate(fingerprint)) {
      return NextResponse.json(
        { error: "We have already received this enquiry. Our team will contact you shortly." },
        { status: 429 }
      );
    }

    const stored = isLeadStoreConfigured()
      ? await insertLead(lead)
      : ({ ok: false, reason: "DATABASE_URL not set" } as const);

    if (!stored.ok) {
      if (isLeadStoreConfigured()) console.error("[Leads] Insert failed:", stored.reason);
      // Not persisted: the email is the only copy, so it must succeed before we say thanks.
      const emailed = await sendLeadEmail(lead);
      if (!emailed.ok) {
        console.error("[Leads] Lead not delivered (no DB, email failed):", emailed.reason);
        return NextResponse.json(
          {
            error: `We couldn't send your enquiry right now. Please WhatsApp or call us on ${siteConfig.phones.primaryDisplay} — we'll respond quickly.`,
          },
          { status: 503 }
        );
      }
      if (isWebhookConfigured()) {
        after(async () => {
          const res = await sendLeadWebhook(lead);
          if (!res.ok) console.error(`[Leads] Webhook failed for ${lead.id}:`, res.reason);
        });
      }
    } else {
      // Persisted: notify after the response so third parties never slow the form down.
      after(async () => {
        const [emailed, hooked] = await Promise.all([
          sendLeadEmail(lead),
          isWebhookConfigured() ? sendLeadWebhook(lead) : Promise.resolve(null),
        ]);
        if (!emailed.ok) console.error(`[Leads] Email failed for ${lead.id}:`, emailed.reason);
        await markDelivery(lead.id, "email", emailed);
        if (hooked) {
          if (!hooked.ok) console.error(`[Leads] Webhook failed for ${lead.id}:`, hooked.reason);
          await markDelivery(lead.id, "webhook", hooked);
        }
      });
    }

    await rememberSubmission(fingerprint);

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message:
        "Thank you! Your enquiry has been received. Our team will contact you within one business day.",
    });
  } catch (error) {
    console.error("[Leads API Error]:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred. Please contact us directly via WhatsApp or phone.",
      },
      { status: 500 }
    );
  }
}
