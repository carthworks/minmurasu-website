import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting + duplicate detection shared across serverless instances via
 * Upstash Redis. Falls back to per-instance memory when Upstash is not configured
 * (fine for local dev; not effective on multi-instance hosting).
 */

const WINDOW_SECONDS = 15 * 60;
const MAX_REQUESTS = 3;
const DEDUPE_SECONDS = 10 * 60;

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const limiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, `${WINDOW_SECONDS} s`),
      prefix: "mm:leads:rl",
    })
  : null;

const memHits = new Map<string, { count: number; expiresAt: number }>();
const memSeen = new Map<string, number>();

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (limiter) {
    try {
      const { success } = await limiter.limit(ip);
      return success;
    } catch (err) {
      console.error("[Leads] Upstash rate limit failed, allowing request:", err);
      return true;
    }
  }
  const now = Date.now();
  const entry = memHits.get(ip);
  if (!entry || now > entry.expiresAt) {
    memHits.set(ip, { count: 1, expiresAt: now + WINDOW_SECONDS * 1000 });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Fingerprint is hashed so no email address is stored in Redis. */
export async function leadFingerprint(email: string, message: string): Promise<string> {
  return sha256(`${email.toLowerCase()}::${message.trim().slice(0, 60).toLowerCase()}`);
}

export async function isDuplicate(fingerprint: string): Promise<boolean> {
  if (redis) {
    try {
      return (await redis.exists(`mm:leads:dup:${fingerprint}`)) === 1;
    } catch {
      return false;
    }
  }
  const seen = memSeen.get(fingerprint);
  return Boolean(seen && Date.now() - seen < DEDUPE_SECONDS * 1000);
}

export async function rememberSubmission(fingerprint: string): Promise<void> {
  if (redis) {
    try {
      await redis.set(`mm:leads:dup:${fingerprint}`, 1, { ex: DEDUPE_SECONDS });
    } catch {
      /* non-critical */
    }
    return;
  }
  memSeen.set(fingerprint, Date.now());
}
