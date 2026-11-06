# MIN MURASU — Official Website

> **The Digital Voice That Makes Your Brand Heard**  
> Digital growth &amp; AI automation agency headquartered in Coimbatore, Tamil Nadu, India. Serving Coimbatore, Chennai, Bengaluru, across India, and remote clients worldwide.  
> **Website:** [https://www.minmurasu.digital](https://www.minmurasu.digital)  
> **Contact:** `minmurasu.digital@gmail.com`  
> **Phone / WhatsApp:** +91 94867 72206, +91 94452 77206  

---

## 1. Technical Architecture & Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS with custom brand design tokens
  - Deep navy (primary / theme): `#0D2040`
  - Orange (accent, CTAs): `#F58220`
  - Blue (secondary accent): `#0082CA`
  - Light blue (surfaces): `#F0F8FF`
  - Single source of truth: `src/lib/site-config.ts` → `brand.colors`
- **Icons:** `lucide-react`
- **Forms & Validation:** `react-hook-form` + `zod`
- **SEO & Structured Data:** Semantic HTML, Dynamic `sitemap.xml`, `robots.txt`, Open Graph metadata.

---

## 2. Local Development Setup

### Prerequisites
- Node.js `v20.x` or `v22.x`
- npm `v10.x`

### Installation
```bash
# Install dependencies cleanly
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Linting
```bash
# Build the production bundle
npm run build

# Start the production server
npm run start

# Run ESLint checks
npm run lint
```

---

## 3. Environment Variables

Copy `.env.example` to `.env.local` to configure external credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site domain (`https://www.minmurasu.digital`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager Container ID (`GTM-XXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_CLARITY_ID` | Optional Meta Pixel and Microsoft Clarity IDs |
| `GMAIL_USER` | Gmail account that sends lead notifications (`minmurasu.digital@gmail.com`) |
| `GMAIL_APP_PASSWORD` | 16-character Google App Password for that account (never commit it) |
| `CONTACT_TO_EMAIL` | Inbox that receives web leads (`minmurasu.digital@gmail.com`) |
| `WHATSAPP_NUMBER` | WhatsApp Business destination number without `+` (`919486772206`) |

---

## 4. Website Route Structure

- `/` — High-converting homepage (Hero, Connected Growth Engine visual, 7 Services, 5-Step Framework, Industries, Why Choose Us, Process, Measurement, AI Section, Honest Case Studies, FAQs, Final CTA).
- `/services` — Complete service suite hub.
- `/services/[slug]` — 7 dedicated service detail pages (Digital Strategy, SEO & Local SEO, Generative Engine Optimisation, Social Media, Google & Meta Ads, Web Development, AI Automation).
- `/industries` — Vertical-specific growth playbooks.
- `/industries/[slug]` — 5 sector detail pages (Healthcare & Clinics, Real Estate, Manufacturing & Industrial, Education & Training, Retail & Local Services).
- `/about` — Agency positioning, values, Coimbatore heritage, and operating principles.
- `/work` — Solution blueprints by industry (not client results — zero-fabrication policy).
- `/insights` — Strategic B2B growth guides and technical articles.
- `/contact` — Comprehensive enquiry routing, consultation booking, and instant WhatsApp launch.
- `/privacy-policy` & `/terms` — Compliant legal documents.
- `/api/contact` — Validates enquiries (honeypot, time-trap, rate limit) and emails each lead via Gmail SMTP. Returns an error with a WhatsApp fallback if delivery fails — it never reports false success.
- `/sitemap.xml` & `/robots.txt` — Automated search engine indexing.

---

## 5. Pre-Launch Checklist

Before deploying to public production:
1. [ ] Connect custom domain `minmurasu.digital` on Vercel or cloud provider.
2. [ ] Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` once GA4 property is created.
3. [ ] Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` in Vercel → Settings → Environment Variables, then submit a test enquiry.
4. [ ] Verify WhatsApp Business API account for automated messaging templates.
5. [ ] Optional later: move to a domain email (e.g. hello@minmurasu.digital) with SPF, DKIM and DMARC.
