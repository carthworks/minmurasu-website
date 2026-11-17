# Lead pipeline backend setup

About 30 minutes. Each service is optional; with nothing configured the site emails leads only.

Fill values into `.env.local` (gitignored) as you go, then run `npm run check:backend`.
When everything passes locally, copy the same values into Vercel.

## 1. Supabase (lead database)

1. Sign up at supabase.com and create a project.
   - **Region:** South Asia (Mumbai), closest to your visitors and Vercel `bom1`.
   - Save the database password in your password manager.
2. **SQL Editor → New query** → paste all of `db/migrations/001_leads.sql` → **Run**.
3. **Connect** (top bar) → **Transaction pooler** → copy the URI (port **6543**).
   Replace `[YOUR-PASSWORD]` with the database password.
   - If the password has `@ : / ? #` or `%`, URL-encode it (or reset it to letters and digits).
4. Paste into `.env.local` as `DATABASE_URL=`.

Notes
- Row level security is on with no policies, so the public `anon` key cannot read leads.
  The site connects as the `postgres` role through `DATABASE_URL`, which is server-only.
- View leads under **Table Editor → leads**.
- Free projects pause after a week with no activity. Real form traffic keeps it awake;
  upgrade to Pro when leads become business-critical.

## 2. Upstash Redis (rate limiting and duplicate check)

1. Sign up at upstash.com → **Create Database** (Redis).
   - **Region:** ap-south-1 (Mumbai). Free plan is plenty.
2. Open the database → **REST API** section → copy `UPSTASH_REDIS_REST_URL` and
   `UPSTASH_REDIS_REST_TOKEN` into `.env.local`.

## 3. n8n (automation hub)

Pick one:
- **n8n Cloud** (n8n.io): no server to run; paid after the trial.
- **Self-hosted** (a small VPS with Docker, or Railway/Render): cheaper long term.
  Set `NODE_FUNCTION_ALLOW_BUILTIN=crypto` so the Code node can verify signatures.

Then:
1. **Workflows → Import from file** → `n8n/minmurasu-lead-intake.json`.
2. Open **Verify signature** → replace `PASTE_LEAD_WEBHOOK_SECRET_HERE` with the
   `LEAD_WEBHOOK_SECRET` value already generated in `.env.local`.
3. Save, then toggle the workflow **Active**.
4. Open **Lead webhook** → copy the **Production URL** → `.env.local` as `LEAD_WEBHOOK_URL=`.
5. `npm run check:backend` should show "signed test event accepted".
   The test event has `event: "lead.test"`; filter on `lead.created` when you add Phase 1 steps.

## 4. Gmail alerts

Google Account (the agency Gmail) → turn on 2-Step Verification → **App passwords** →
create one → paste into `GMAIL_APP_PASSWORD=` (no spaces).

## 5. Verify locally

```
npm run check:backend
```

Every configured service should show ✔. The script never prints secrets and sends no email.

## 6. Vercel (production)

1. Vercel → project → **Settings → Environment Variables**.
2. Add each variable from `.env.local` for **Production** (and Preview if you want previews to store leads).
   Use separate Supabase/n8n targets for Preview if you don't want test leads in the real table.
3. **Settings → Functions → Region:** Mumbai (`bom1`), next to Supabase and Upstash.
4. **Redeploy** (env changes only apply to new deployments).
5. Submit one real enquiry on the live site and confirm:
   - a row in Supabase `leads` with `email_sent_at` and `webhook_delivered_at` filled in,
   - the Gmail alert arrived,
   - a successful execution in n8n.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `password authentication failed` | Wrong DB password in the URI, or it needs URL-encoding |
| `prepared statement ... already exists` | You're on the pooler without `prepare: false`; already handled in `store.ts` |
| Webhook 404 | Workflow not Active, or you copied the Test URL instead of the Production URL |
| Webhook 401 | Secret in n8n doesn't match `LEAD_WEBHOOK_SECRET` |
| `require('crypto')` not allowed (self-hosted) | Set `NODE_FUNCTION_ALLOW_BUILTIN=crypto` and restart n8n |
| Rows have `webhook_error` | n8n was down; resend from n8n later or re-trigger those rows in Phase 1 |
