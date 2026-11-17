// Verifies the lead-pipeline backend using the values in .env.local.
// Run: npm run check:backend
// Prints only pass/fail and non-secret details; never prints keys or passwords.
import { createHmac, randomUUID } from "node:crypto";
import postgres from "postgres";
import { Redis } from "@upstash/redis";

const env = process.env;
let failures = 0;
const ok = (msg) => console.log(`  ✔ ${msg}`);
const bad = (msg) => {
  failures++;
  console.log(`  ✖ ${msg}`);
};
const skip = (msg) => console.log(`  – ${msg}`);

async function checkDatabase() {
  console.log("\nSupabase / Postgres (DATABASE_URL)");
  if (!env.DATABASE_URL) return skip("not set: leads will be emailed only");
  let host = "unknown";
  try {
    const u = new URL(env.DATABASE_URL);
    host = `${u.hostname}:${u.port || 5432}`;
    if (u.hostname.includes("supabase") && u.port !== "6543") {
      console.log(`  ! using port ${u.port || 5432}; Supabase on Vercel should use the transaction pooler (6543)`);
    }
  } catch {
    return bad("DATABASE_URL is not a valid URL (check for unescaped special characters in the password)");
  }
  const sql = postgres(env.DATABASE_URL, { max: 1, connect_timeout: 10, prepare: false });
  try {
    await sql`select 1`;
    ok(`connected to ${host}`);
    const [t] = await sql`select to_regclass('public.leads') as t`;
    if (!t.t) {
      bad("table 'leads' not found: run db/migrations/001_leads.sql in the Supabase SQL editor");
    } else {
      const [{ count }] = await sql`select count(*)::int as count from leads`;
      ok(`table 'leads' exists (${count} rows)`);
      const [rls] = await sql`select relrowsecurity from pg_class where oid = 'public.leads'::regclass`;
      rls.relrowsecurity ? ok("row level security is on") : bad("row level security is OFF on leads");
    }
  } catch (err) {
    bad(`connection failed: ${err.message}`);
  } finally {
    await sql.end({ timeout: 2 });
  }
}

async function checkRedis() {
  console.log("\nUpstash Redis (UPSTASH_REDIS_REST_URL / _TOKEN)");
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    return skip("not set: in-memory rate limiting (not effective on Vercel)");
  }
  try {
    const redis = Redis.fromEnv();
    const key = `mm:check:${randomUUID()}`;
    await redis.set(key, 1, { ex: 30 });
    const v = await redis.get(key);
    await redis.del(key);
    v == 1 ? ok("read/write works") : bad("write succeeded but read returned an unexpected value");
  } catch (err) {
    bad(`request failed: ${err.message}`);
  }
}

async function checkWebhook() {
  console.log("\nn8n webhook (LEAD_WEBHOOK_URL / _SECRET)");
  if (!env.LEAD_WEBHOOK_URL || !env.LEAD_WEBHOOK_SECRET) return skip("not set: no webhook will be sent");
  if (env.LEAD_WEBHOOK_SECRET.length < 32) bad("LEAD_WEBHOOK_SECRET is shorter than 32 characters");
  const body = JSON.stringify({
    event: "lead.test",
    version: 1,
    lead: { id: randomUUID(), source: "contact", name: "Backend check", email: "check@example.org", test: true },
  });
  const ts = Math.floor(Date.now() / 1000).toString();
  const sig = `sha256=${createHmac("sha256", env.LEAD_WEBHOOK_SECRET).update(`${ts}.${body}`).digest("hex")}`;
  try {
    const res = await fetch(env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MinMurasu-Event": "lead.test",
        "X-MinMurasu-Timestamp": ts,
        "X-MinMurasu-Signature": sig,
      },
      body,
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) ok(`signed test event accepted (HTTP ${res.status})`);
    else if (res.status === 401) bad("n8n rejected the signature: the secret in n8n doesn't match .env.local");
    else if (res.status === 404) bad("HTTP 404: is the n8n workflow active, and are you using the Production URL?");
    else bad(`HTTP ${res.status}`);
  } catch (err) {
    bad(`request failed: ${err.message}`);
  }
}

async function checkEmail() {
  console.log("\nGmail alert (GMAIL_USER / GMAIL_APP_PASSWORD)");
  if (!env.GMAIL_USER || !env.GMAIL_APP_PASSWORD) return skip("not set");
  const { default: nodemailer } = await import("nodemailer");
  try {
    await nodemailer.createTransport({ service: "gmail", auth: { user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD } }).verify();
    ok("SMTP login works (no email sent)");
  } catch (err) {
    bad(`SMTP login failed: ${err.message}`);
  }
}

await checkDatabase();
await checkRedis();
await checkWebhook();
await checkEmail();
console.log(failures ? `\n${failures} problem(s) found.` : "\nAll configured services look good.");
process.exit(failures ? 1 : 0);
