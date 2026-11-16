import "server-only";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";
import type { Lead } from "./types";

/* Lead email alert (Gmail SMTP with an App Password). */

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function isEmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendLeadEmail(
  lead: Lead
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return { ok: false, reason: "GMAIL_USER / GMAIL_APP_PASSWORD not set" };
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.emails.primary;
  const a = lead.attribution;
  const channel =
    [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / ") ||
    (a.gclid || a.gbraid || a.wbraid ? "Google Ads (click ID)" : a.fbclid ? "Meta (click ID)" : "") ||
    a.referrer ||
    "Direct / unknown";

  const rows: [string, string][] = [
    ["Lead ID", lead.id],
    ["Source", lead.source],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company || "Not provided"],
    ["Website", lead.website || "Not provided"],
    ["Service", lead.service],
    ["Budget", lead.budget || "Not specified"],
    ["Preferred contact", lead.preferredContact],
    ["Channel", channel],
    ["Landing page", a.landing_page || "unknown"],
    ["Submitted from", a.submitted_from || "unknown"],
    ...Object.entries(lead.meta).map(([k, v]) => [k, String(v)] as [string, string]),
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${lead.message}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#0D2040">
      <h2 style="margin:0 0 12px">New website enquiry — ${escapeHtml(lead.service)}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#64748b;white-space:nowrap">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <p style="font-size:14px;margin-top:16px"><strong>Message</strong><br>${escapeHtml(lead.message).replace(/\n/g, "<br>")}</p>
    </div>`;

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: `"${siteConfig.name} Website" <${user}>`,
      to,
      replyTo: `"${lead.name.replace(/"/g, "")}" <${lead.email}>`,
      subject: `New ${lead.source} lead: ${lead.service} — ${lead.name}`,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
