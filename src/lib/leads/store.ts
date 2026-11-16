import "server-only";
import postgres from "postgres";
import type { Lead } from "./types";

/**
 * Postgres system of record for leads (Supabase / Neon / any Postgres).
 * Schema: db/migrations/001_leads.sql. When DATABASE_URL is unset, storage is
 * skipped and the pipeline falls back to synchronous email delivery.
 */

type Sql = ReturnType<typeof postgres>;
const globalForSql = globalThis as unknown as { __leadsSql?: Sql };

function getSql(): Sql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForSql.__leadsSql) {
    globalForSql.__leadsSql = postgres(url, {
      max: 3,
      idle_timeout: 20,
      connect_timeout: 8,
      // Required for Supabase's transaction pooler (port 6543) and harmless elsewhere.
      prepare: false,
    });
  }
  return globalForSql.__leadsSql;
}

export function isLeadStoreConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function insertLead(lead: Lead): Promise<{ ok: true } | { ok: false; reason: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, reason: "DATABASE_URL not set" };
  try {
    await sql`
      insert into leads (
        id, created_at, source, name, email, phone, company, website,
        service, budget, preferred_contact, message, attribution, meta
      ) values (
        ${lead.id}, ${lead.createdAt}, ${lead.source}, ${lead.name}, ${lead.email},
        ${lead.phone}, ${lead.company}, ${lead.website}, ${lead.service}, ${lead.budget},
        ${lead.preferredContact}, ${lead.message},
        ${sql.json(lead.attribution)}, ${sql.json(lead.meta)}
      )`;
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

/** Records the outcome of post-response deliveries so a retry job can pick up failures. */
export async function markDelivery(
  id: string,
  channel: "email" | "webhook",
  result: { ok: true } | { ok: false; reason: string }
): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    if (channel === "email") {
      await sql`update leads set
        email_sent_at = ${result.ok ? sql`now()` : null},
        email_error = ${result.ok ? null : result.reason}
        where id = ${id}`;
    } else {
      await sql`update leads set
        webhook_delivered_at = ${result.ok ? sql`now()` : null},
        webhook_error = ${result.ok ? null : result.reason},
        webhook_attempts = webhook_attempts + 1
        where id = ${id}`;
    }
  } catch (err) {
    console.error(`[Leads] Failed to record ${channel} delivery for ${id}:`, err);
  }
}
