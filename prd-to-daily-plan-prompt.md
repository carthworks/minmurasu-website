# Vibe Coding Master Prompt — Digital Growth & AI Automation Agency Website

> Brand: MIN MURASU | Site: https://www.minmurasu.digital | Email: minmurasu.digital@gmail.com | Phone/WhatsApp: +91 9486772206, +91 94445277206 Paste the Master Build Prompt into Cursor, Antigravity, Lovable, Bolt,claude or another AI coding tool. Build in phases and test each phase.

---

# 1. Master Build Prompt

Act as a senior product designer, conversion-focused UX strategist, SEO specialist, and senior full-stack engineer.

Design and build a premium, modern, responsive website for **MIN MURASU**, a Digital Growth & AI Automation Agency based in Coimbatore, Tamil Nadu, India, serving businesses across Coimbatore, Chennai, Bengaluru, and the wider Indian market.

## Business positioning

MIN MURASU helps businesses:
1. Build a strong digital presence.
2. Attract relevant prospects through SEO, content, and paid campaigns.
3. Convert website visitors and enquiries into qualified leads.
4. Improve lead response and follow-up using practical AI and workflow automation.
5. Measure marketing performance with clear analytics and reporting.

The agency combines digital marketing, web and software development, analytics, and AI automation. It must not look like a generic social-media-only agency.

**Core positioning:** “Digital growth, powered by intelligent technology.”
MIN MURASU = The Digital Voice That Makes Your Brand Heard.

**Supporting message:** “We bring marketing, technology, and automation together to help businesses attract the right customers, convert more enquiries, and make better growth decisions.”

Use a confident, clear, credible B2B tone. Avoid exaggerated claims such as guaranteed leads, 10x growth, or fabricated performance statistics.

## Target customers

- Healthcare providers, clinics, and diagnostic centres.
- Real estate companies and property professionals.
- Manufacturing companies, industrial suppliers, and local SMEs.
- Education and training businesses.
- Retail and service businesses.

Mention these sectors without inventing specialist experience. Keep industries configurable.

## Primary conversion goals

Encourage visitors to book a discovery call, request an initial digital presence audit, send an enquiry through WhatsApp, or submit a project enquiry form. Use clear CTAs without crowding each section.

---

# 2. Technology and engineering requirements

Use this stack unless the existing project already has an established equivalent:

- **Framework:** Next.js with App Router.
- **Language:** TypeScript, strict mode.
- **Styling:** Tailwind CSS.
- **UI:** Accessible, reusable React components; use shadcn/ui only where useful.
- **Icons:** Lucide React.
- **Forms:** React Hook Form + Zod validation.
- **Animations:** Framer Motion or Motion, used sparingly and with reduced-motion support.
- **Backend:** Next.js route handlers for simple form submission, or a separate Node.js API if required.
- **Email:** Transactional email provider configured through environment variables.
- **Deployment:** Vercel-compatible.
- **Analytics:** Google Tag Manager and GA4 integration points.
- **SEO:** Metadata, canonical URLs, sitemap, robots.txt, Open Graph metadata, and valid structured data.

Before coding:
1. Inspect the repository, framework, dependencies, routing, and conventions.
2. Preserve working code and avoid unnecessary dependency upgrades.
3. Create a concise implementation plan.
4. Build reusable components and a consistent design system.
5. Run lint, type checks, tests if present, and production build.
6. Fix errors; do not hide them with `any`, disabled lint rules, or broad TypeScript suppressions.

If the repository is empty, scaffold the project using the stack above.

## Suggested project structure

```text
src/
  app/
    page.tsx
    about/page.tsx
    services/page.tsx
    services/[slug]/page.tsx
    industries/page.tsx
    industries/[slug]/page.tsx
    work/page.tsx
    insights/page.tsx
    contact/page.tsx
    privacy-policy/page.tsx
    terms/page.tsx
    api/contact/route.ts
    sitemap.ts
    robots.ts
  components/
    layout/Header.tsx
    layout/Footer.tsx
    layout/MobileMenu.tsx
    sections/Hero.tsx
    sections/TrustBar.tsx
    sections/ServicesOverview.tsx
    sections/IndustriesOverview.tsx
    sections/Process.tsx
    sections/WhyChooseUs.tsx
    sections/AISection.tsx
    sections/CaseStudies.tsx
    sections/Testimonials.tsx
    sections/FAQ.tsx
    sections/FinalCTA.tsx
    ui/Button.tsx
    ui/Container.tsx
    ui/SectionHeading.tsx
    ui/FormField.tsx
  lib/validation.ts
  lib/analytics.ts
  lib/site-config.ts
  content/services.ts
  content/industries.ts
  content/faqs.ts
  styles/globals.css
public/images/
public/icons/
```

Adapt this structure if the repository already follows another convention.

---

# 3. Visual identity and design direction

Create a polished, premium B2B technology-agency look. The site should feel strategic, modern, human, and trustworthy—not like a cheap template or an overly futuristic AI landing page.

## Colour palette

- Deep navy: `#14243A` — primary dark surfaces and headings.
- Teal: `#0E7490` — primary brand accent.
- Light blue: `#F0F9FF` — soft section backgrounds.
- Amber: `#F59E0B` — limited highlight colour.
- White: `#FFFFFF`.
- Body text: `#475569`.
- Border: `#E2E8F0`.

Use strong contrast and accessible colour combinations. Do not use amber for large areas or every CTA.

## Typography and layout

- Use a clean sans-serif such as Inter, Manrope, or Geist.
- Use a clear type scale, strong headings, and readable body copy.
- Use generous whitespace, consistent spacing, strong grid alignment, subtle gradients, restrained borders, and tasteful rounded corners.
- Use relevant imagery or custom abstract graphics. Avoid generic stock photos of people pointing at laptops.
- Use diagrams/cards to explain how marketing, technology, analytics, and automation connect.
- Use restrained reveal-on-scroll and hover transitions; respect `prefers-reduced-motion`.
- Design mobile layouts intentionally, not as squeezed desktop layouts.

## Header

- Logo/wordmark: `MIN MURASU`.
- Navigation: Home, Services, Industries, Our Approach, Insights, About, Contact.
- Primary CTA: “Book a Free Consultation”.
- Sticky header with subtle background treatment.
- Mobile menu must be keyboard accessible and close after navigation.

---

# 4. Sitemap and page requirements

Build these pages:

| Page | Purpose |
|---|---|
| Home | Explain the value proposition and convert visitors |
| About | Explain the agency, approach, values, and team |
| Services | Present the service portfolio |
| Service detail pages | Explain deliverables, process, and outcomes |
| Industries | Show relevant business use cases |
| Work / Case Studies | Display verified work only; support an honest empty state |
| Insights | SEO-friendly articles and practical resources |
| Contact | Capture and route enquiries |
| Privacy Policy | Explain data collection and use |
| Terms | Set basic website and service-use terms |

Do not publish fake client logos, testimonials, case studies, awards, years of experience, or numerical results. If there is no verified portfolio, create an honest “How we can help” or “Sample solutions” section.

---

# 5. Homepage — detailed section-by-section specification

## 5.1 Hero

**Headline:** “Turn Digital Attention Into Business Growth.”

**Supporting copy:** “From digital marketing and high-converting websites to AI-powered automation, we help businesses attract better prospects, convert more enquiries, and grow with clarity.”

Primary CTA: **Book a Free Consultation**. Secondary CTA: **Explore Our Services**.

Create a compelling right-side composition showing a connected growth system: website/landing pages, search and social campaigns, lead pipeline/CRM, analytics dashboard, and AI assistant/workflow automation. The visual must not imply real client results. Stack it below the copy on mobile.

## 5.2 Capability strip

Use capability labels rather than invented customer logos: Digital Strategy; SEO & Content; Performance Marketing; Web Development; Analytics & CRO; AI Automation.

## 5.3 Business problem

Headline: “Getting attention is only the first step.” Explain common problems:
- A website gets visits but few enquiries.
- Marketing activity has no clear measurement.
- Leads are not followed up quickly.
- Tools are disconnected and work is repetitive.
- Campaign performance and return are unclear.

Close with: “We connect the pieces into one practical growth system.”

## 5.4 Services overview

Create six service cards with descriptions and links to detail pages:

1. **Digital Strategy & Consulting:** Audience research, positioning, channel planning, campaign roadmaps, and growth priorities.
2. **Search Engine Optimisation (SEO):** Technical SEO, on-page optimisation, local SEO, AI search visibility, keyword research, content planning, and reporting.
3. **Generative Engine Optimisation (GEO):** AI search visibility audits, content structured for AI answers, schema markup, brand mention and citation building, and visibility tracking across platforms such as ChatGPT, Gemini, Perplexity, and Google’s AI results.
4. **Social Media & Content Marketing:** Content strategy, monthly calendars, creative direction, post production, short-form video, publishing support, and performance review.
5. **Google & Meta Ads:** Campaign strategy, account setup, audience and keyword targeting, conversion tracking, optimisation, and reporting. Media spend is paid directly by the client.
6. **Website & Landing Page Development**: Responsive business websites, landing pages, lead forms, performance optimisation, analytics setup, and conversion-focused user journeys.
7. **AI & Business Automation:** Website chat assistants, lead qualification, supported WhatsApp workflows, email follow-ups, CRM automation, notifications, and reporting dashboards.

Each card needs an “Explore service” link. Do not claim every service is available as a fully managed service until operationally confirmed.

## 5.5 Integrated growth system

Show five steps:
1. **Attract** — SEO, content, social, and paid campaigns.
2. **Engage** — useful content, landing pages, and clear messaging.
3. **Convert** — forms, calls, booking flows, and lead capture.
4. **Automate** — lead routing, follow-up workflows, and AI assistance.
5. **Measure** — analytics, CRM reporting, and improvement.

Explain that automation supports the customer journey; it does not replace a sound offer, good service, or genuine demand.

## 5.6 Industries served

Create cards for Healthcare & Clinics; Real Estate; Manufacturing & Industrial Businesses; Education & Training; Retail & Local Services. Show relevant use cases rather than generic claims. For example, clinics may need appointment enquiries, local search visibility, and follow-up workflows. Avoid medical outcome claims or unverified compliance claims.

## 5.7 Why choose us

Use defensible differentiators:
- Marketing and technology under one roof.
- Practical automation, not AI for decoration.
- Clear tracking and reporting.
- Solutions sized to business needs.
- Direct communication and defined deliverables.
- Continuous improvement based on evidence.

Do not use unsupported claims such as “No. 1 agency” or “best in India”.

## 5.8 Process

Display five stages:
1. Discover — understand goals, audience, channels, and constraints.
2. Audit — review website, visibility, campaigns, lead journey, and tracking.
3. Plan — agree priorities, scope, deliverables, and success measures.
4. Execute — build, launch, monitor, and improve.
5. Report & Optimise — review outcomes and agree next actions.

## 5.9 Measurement and reporting

Headline: “Know what is working. Know what to improve.” Explain that reporting can include website traffic and engagement, organic search visibility, campaign impressions/clicks/cost, enquiries and qualified leads, conversion rates and cost per lead, and sales outcomes where the client shares CRM/sales data.

Mention GA4, Google Search Console, Google Tag Manager, Meta Ads Manager, CRM platforms, and Looker Studio as examples of the measurement stack. Do not imply a tool alone guarantees accurate attribution.

## 5.10 AI automation feature

Headline: “Make every enquiry easier to manage.” Show example workflow:
- Website visitor asks a question → assistant provides approved information.
- Prospect submits an enquiry → lead is recorded in CRM.
- Lead is routed to the right team member.
- Follow-up reminder is created.
- Team reviews the conversation and takes over when needed.

Show human handover clearly. Do not promise fully autonomous customer service. Do not imply WhatsApp automation can be deployed without required platform approvals, templates, consent, and applicable charges.

## 5.11 Work / case studies

Create reusable case-study cards, but populate them only with verified projects and approved client information. Each case study should support client/project name, industry, business challenge, work delivered, tools/channels, verified before-and-after metrics with dates and definitions, and client permission status.

If no approved case studies exist, show: “Selected work and practical demonstrations are being prepared. Contact us to discuss a solution for your business.”

## 5.12 Testimonials

Create the component and content schema, but do not invent testimonials. Hide the section when there are no approved testimonials.

## 5.13 FAQ

Include:
- What types of businesses do you work with?
- Do you work with businesses outside Coimbatore?
- Can you build a website and manage its marketing?
- Is advertising spend included in your fee?
- How soon can we expect to see progress?
- Do you provide monthly reports?
- Can you connect enquiries to our CRM?
- Do you provide AI chatbot and WhatsApp automation?
- What do you need from us to get started?

Answers must be realistic. Explain that results depend on competition, budget, offer, website quality, sales follow-up, and other factors. Never guarantee rankings, leads, or revenue.

## 5.14 Final CTA

Headline: “Let’s build a smarter growth plan for your business.”

Copy: “Tell us what you want to improve. We’ll review your goals and suggest practical next steps.”

Buttons: **Book a Free Consultation** and **Request a Digital Presence Audit**.

## 5.15 Footer

Include logo and positioning statement; service, industry, and company links; `hello@minmurasu.com`, `9486772206`, `9486772206`; service locations Coimbatore, Chennai, Bengaluru, and remote engagements across India only where genuinely supported; configurable LinkedIn/Instagram/Facebook links; Privacy Policy and Terms; and dynamically generated copyright year.

---

# 6. Service detail page template

Create a reusable template for each service. Every page should include:
1. Clear headline and outcome-oriented introduction.
2. Business problem addressed.
3. Suitable customer profile.
4. Deliverables and inclusions.
5. Process/timeline.
6. What the client must provide.
7. Measurement and reporting approach.
8. FAQs.
9. Related services.
10. Consultation CTA.

Create pages for Digital Strategy; SEO & Local SEO; Social Media & Content; Google Ads & Meta Ads; Website & Landing Page Development; AI Chatbots & Workflow Automation; Analytics, Tracking & Reporting.

Be precise about inclusions and separately billed items. Do not publish fixed prices until the agency approves pricing and scope.

---

# 7. Contact and lead capture

Build a professional contact page with a short introduction, contact details, WhatsApp CTA, consultation request form, optional service-interest selector, optional budget range selector, preferred contact method, and consent checkbox linking to the Privacy Policy.

Suggested fields:
- Name (required).
- Business email (required, validated).
- Phone number (required; allow international numbers).
- Company/business name (optional).
- Website URL (optional).
- Service interested in (required).
- Brief project description (required).
- Preferred contact method (optional).
- Consent to be contacted (required).

## Form behaviour

- Validate on client and server using Zod or equivalent.
- Show inline, accessible validation messages.
- Disable submit while submitting.
- Show success only after the server confirms receipt.
- Show a useful error state if submission fails.
- Protect against spam using a honeypot and rate limiting; add CAPTCHA only if needed.
- Never expose API keys or email credentials in client code.
- Do not silently discard submissions.
- Send notification to `hello@minmurasu.com` using a provider configured through environment variables.
- Optionally store enquiries in a database or CRM after the data-handling approach is approved.
- Do not collect unnecessary sensitive personal information.

Create `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://www.minmurasu.digital
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
CONTACT_TO_EMAIL=hello@minmurasu.com
EMAIL_PROVIDER_API_KEY=
WHATSAPP_NUMBER=9486772206
```

Do not put real secrets in `.env.example` or commit `.env.local`.

---

# 8. Conversion tracking, analytics, and SEO

## Conversion tracking

Create a central analytics utility and track meaningful events where consent and configuration permit:
- `generate_lead` — successful enquiry submission confirmed by the server.
- `book_consultation_click` — consultation CTA clicked.
- `whatsapp_click` — WhatsApp link clicked.
- `click_to_call` — phone link clicked.
- `service_view` — service detail viewed.
- `audit_request` — audit request successfully submitted.

Do not fire `generate_lead` merely because a user clicks Submit. Never send names, email addresses, phone numbers, or other personal information to analytics platforms.

Preserve UTM source/medium/campaign through the enquiry journey where appropriate. Document how to connect GTM, GA4, Search Console, and ad conversion tracking.

## SEO

For every indexable page provide a unique title and meta description, one clear H1, logical H2/H3 structure, descriptive URL slug, canonical URL, Open Graph metadata, descriptive image alt text, internal links, and breadcrumbs on detail pages where useful.

Technical SEO:
- Generate `sitemap.xml` and `robots.txt`.
- Use semantic HTML.
- Avoid duplicate metadata.
- Optimise images and use modern formats.
- Add structured data only when the details are accurate.

Potential structured data: Organization; ProfessionalService or LocalBusiness only when business details and eligibility are accurate; Service; BreadcrumbList; Article for published insights. Do not add fake aggregate ratings, review counts, addresses, opening hours, or awards.

## Local SEO

Make location content configurable. Include Coimbatore as the initial primary location and Chennai as a service market. Do not create thin, duplicated city landing pages. Each location page must contain genuinely useful, locally relevant content before publication.

---

# 9. Accessibility, performance, and security

The site must:
- Work at 360px mobile width, tablet, laptop, and large desktop.
- Use semantic landmarks and correct heading order.
- Support keyboard navigation and visible focus states.
- Have accessible form labels and errors.
- Meet WCAG AA contrast targets where practical.
- Use buttons for actions and links for navigation.
- Include descriptive alt text for meaningful images.
- Avoid text embedded in images.
- Respect reduced-motion preferences.
- Avoid layout shifts and oversized assets.
- Use responsive images and lazy loading below the fold.
- Avoid autoplay audio/video.

Performance:
- Aim for strong Core Web Vitals.
- Minimise unnecessary JavaScript and third-party scripts.
- Use server components by default where appropriate; client components only for interactivity.
- Optimise fonts and images.
- Avoid unnecessary libraries.

Security:
- Validate all submitted data on the server.
- Safely render user-provided content.
- Rate-limit public endpoints.
- Keep secrets server-side.
- Use secure headers where appropriate.
- Do not expose internal error traces to visitors.
- Add a clear privacy notice for forms and tracking.

---

# 10. Content and brand rules

Write in plain, specific business language for business owners and decision-makers.

Avoid:
- “We are passionate about innovation.”
- “We deliver world-class solutions.”
- Guaranteed top Google rankings, leads, or sales.
- Fake statistics, testimonials, customer logos, or case studies.
- Excessive buzzwords such as revolutionary, disruptive, next-generation, and game-changing.

Prefer explaining what the service does, which problem it solves, what the client receives, how progress is measured, what the client must provide, and what is outside scope.

Keep key content editable through central content files or a CMS-ready structure. Do not hardcode repeated service data across components.

---

# 11. Pricing approach

Do not display final public pricing until the agency confirms packages, scope, and commercial terms. If pricing is later shown, clearly separate agency service fees, advertising media spend, third-party software subscriptions, hosting/domain costs, WhatsApp/messaging provider charges, and custom integration/development costs. Explain that final scope is confirmed after discovery.

---

# 12. Required deliverables and definition of done

Deliver:
1. Fully responsive pages listed in the sitemap.
2. Reusable header, footer, buttons, cards, forms, and page sections.
3. Consistent design tokens and typography.
4. Functional contact form with server-side validation and documented email setup.
5. WhatsApp and click-to-call links using configurable values.
6. SEO metadata, sitemap, robots.txt, and valid structured data.
7. Analytics event integration points and setup documentation.
8. `.env.example`.
9. README with local setup, environment variables, development, testing, build, and deployment instructions.
10. A content checklist of every placeholder to replace before launch.
11. A list of incomplete integrations requiring external accounts or credentials.

The website is complete only when:
- All navigation links work and all pages render without errors.
- Mobile navigation works.
- Forms validate and show success/error states.
- Contact submission reaches the configured destination in a test environment.
- No placeholder contact details remain unnoticed.
- No fake testimonials, client logos, or results are published.
- No console or TypeScript errors remain.
- Lint and production build pass.
- SEO metadata and sitemap are present.
- README explains configuration and deployment.

At completion, report what was implemented, files/routes created, commands run and results, integrations needing credentials, launch blockers, and next steps.

---

# 13. Recommended build sequence

### Phase 1 — Foundation and design system
Inspect repository; set up or confirm Next.js and TypeScript; configure Tailwind and design tokens; build typography, container, buttons, cards, header, footer, and responsive navigation.

### Phase 2 — Homepage
Implement homepage sections; check visual hierarchy, responsiveness, and CTA clarity; use honest sample visuals, not fabricated client proof.

### Phase 3 — Inner pages
Build About, Services, service detail template, Industries, Work, Insights, and Contact using reusable data-driven templates.

### Phase 4 — Forms and integrations
Add server-side validation and contact notification; add WhatsApp and click-to-call links; add analytics event hooks and environment configuration.

### Phase 5 — SEO, accessibility, and performance
Add metadata, sitemap, robots, valid structured data, image optimisation, keyboard checks, and reduced-motion support. Review mobile layouts and Core Web Vitals.

### Phase 6 — QA and deployment
Run lint, type checks, tests, and production build. Test form submission and navigation. Review placeholders. Document deployment and external credentials.

---

# 14. Final instruction to the coding agent

Prioritise a credible, conversion-focused agency website over visual gimmicks. Make the site feel like a capable partner that understands business growth and can execute both marketing and technology work.

Do not invent business facts. Where information is missing, use clearly marked placeholders and list them in the launch checklist. Build a coherent, maintainable application—not just a homepage mockup.
