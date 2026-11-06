# MIN MURASU — Official Website

> **The Digital Voice That Makes Your Brand Heard**  
> Digital growth &amp; AI automation agency headquartered in Coimbatore, Tamil Nadu, India. Serving clients across Coimbatore, Chennai, Bengaluru, and PAN-India.  
> **Website:** [https://www.minmurasu.com](https://www.minmurasu.com)  
> **Contact:** `hello@minmurasu.com` | `minmurasu.digital@gmail.com`  
> **Phone / WhatsApp:** +91 9486772206, +91 94445277206  

---

## 1. Technical Architecture & Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS with custom brand design tokens
  - Deep navy: `#14243A`
  - Teal accent: `#0E7490`
  - Light blue: `#F0F9FF`
  - Amber highlight: `#F59E0B`
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
| `NEXT_PUBLIC_SITE_URL` | Canonical site domain (`https://www.minmurasu.com`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager Container ID (`GTM-XXXXXX`) |
| `CONTACT_TO_EMAIL` | Destination inbox for web leads (`hello@minmurasu.com`) |
| `EMAIL_PROVIDER_API_KEY` | Transactional email provider key (e.g., Resend, SendGrid) |
| `WHATSAPP_NUMBER` | WhatsApp Business destination number without `+` (`919486772206`) |

---

## 4. Website Route Structure

- `/` — High-converting homepage (Hero, Connected Growth Engine visual, 7 Services, 5-Step Framework, Industries, Why Choose Us, Process, Measurement, AI Section, Honest Case Studies, FAQs, Final CTA).
- `/services` — Complete service suite hub.
- `/services/[slug]` — 7 dedicated service detail pages (Digital Strategy, SEO & Local SEO, Generative Engine Optimisation, Social Media, Google & Meta Ads, Web Development, AI Automation).
- `/industries` — Vertical-specific growth playbooks.
- `/industries/[slug]` — 5 sector detail pages (Healthcare & Clinics, Real Estate, Manufacturing & Industrial, Education & Training, Retail & Local Services).
- `/about` — Agency positioning, values, Coimbatore heritage, and operating principles.
- `/work` — Verified architectural case study frameworks (zero-fabrication policy).
- `/insights` — Strategic B2B growth guides and technical articles.
- `/contact` — Comprehensive enquiry routing, consultation booking, and instant WhatsApp launch.
- `/privacy-policy` & `/terms` — Compliant legal documents.
- `/api/contact` — Secure API route handler with in-memory IP rate limiting and honeypot spam protection.
- `/sitemap.xml` & `/robots.txt` — Automated search engine indexing.

---

## 5. Pre-Launch Checklist

Before deploying to public production:
1. [ ] Connect custom domain `minmurasu.com` on Vercel or cloud provider.
2. [ ] Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` once GA4 property is created.
3. [ ] Set `EMAIL_PROVIDER_API_KEY` (e.g. Resend) for real transactional email dispatch.
4. [ ] Verify WhatsApp Business API account for automated messaging templates.
5. [ ] Ensure DNS records (SPF, DKIM, DMARC) are validated for `hello@minmurasu.com`.
