import "server-only";
import { createHmac } from "node:crypto";
import type { Lead } from "./types";

/**
 * Signed fan-out webhook (n8n / Make / Zapier). Receivers verify:
 *   expected = HMAC_SHA256(LEAD_WEBHOOK_SECRET, `${X-MinMurasu-Timestamp}.${rawBody}`)
 *   X-MinMurasu-Signature === `sha256=${expected}` and timestamp is within 5 minutes.
 */

export function isWebhookConfigured(): boolean {
  return Boolean(process.env.LEAD_WEBHOOK_URL && process.env.LEAD_WEBHOOK_SECRET);
}

export function signPayload(secret: string, timestamp: string, body: string): string {
  return `sha256=${createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")}`;
}

export async function sendLeadWebhook(
  lead: Lead
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const url = process.env.LEAD_WEBHOOK_URL;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!url || !secret) return { ok: false, reason: "LEAD_WEBHOOK_URL / LEAD_WEBHOOK_SECRET not set" };

  const body = JSON.stringify({ event: "lead.created", version: 1, lead });
  let lastReason = "unknown";

  for (let attempt = 1; attempt <= 2; attempt++) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-MinMurasu-Event": "lead.created",
          "X-MinMurasu-Delivery": lead.id,
          "X-MinMurasu-Timestamp": timestamp,
          "X-MinMurasu-Signature": signPayload(secret, timestamp, body),
        },
        body,
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return { ok: true };
      lastReason = `HTTP ${res.status}`;
      if (res.status < 500 && res.status !== 429) break; // client errors won't fix themselves
    } catch (err) {
      lastReason = err instanceof Error ? err.message : String(err);
    }
    if (attempt === 1) await new Promise((r) => setTimeout(r, 1000));
  }
  return { ok: false, reason: lastReason };
}
