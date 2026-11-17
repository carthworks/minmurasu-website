import type { Article } from "./types";

export const geoGuide: Article = {
  slug: "generative-engine-optimisation-guide",
  title: "How to Prepare Your Brand for Generative Engine Optimisation (GEO)",
  seoTitle: "Generative Engine Optimisation (GEO): 2026 Guide",
  description:
    "How ChatGPT, Perplexity, Gemini and Google AI Overviews pick the sources they cite, and the practical steps that make your brand one of them in 2026.",
  excerpt:
    "Why keyword stuffing fails with large language models, and how to structure your content, schema and off-site citations so ChatGPT, Perplexity, Gemini and Google's AI answers cite your brand.",
  category: "AI & Search",
  keywords: [
    "Generative Engine Optimisation",
    "GEO",
    "AI search optimization",
    "ChatGPT search visibility",
    "Google AI Overviews",
    "AI Mode SEO",
    "Perplexity citations",
    "llms.txt",
  ],
  publishedAt: "2026-11-18",
  updatedAt: "2026-11-18",
  cover: {
    src: "/images/insights/generative-engine-optimisation-guide.svg",
    alt: "Illustration of an AI answer box citing a website among several sources",
  },
  body: [
    {
      type: "p",
      text: "More and more searches now end in an AI-written answer rather than a list of ten blue links. Google shows AI Overviews and AI Mode, ChatGPT and Perplexity answer with citations, and Gemini summarises the web inside Google's own apps. **Generative Engine Optimisation (GEO)** is the work of making your brand one of the sources those answers rely on and link to.",
    },
    {
      type: "p",
      text: "The good news: GEO is not a separate discipline that replaces SEO. It builds on it. The bad news: the shortcuts that once worked in SEO, such as stuffing keywords and publishing thin pages at volume, work even worse when the reader is a language model.",
    },
    { type: "h2", id: "how-ai-picks-sources", text: "How AI answers pick their sources" },
    {
      type: "image",
      src: "/images/insights/geo-answer-pipeline.svg",
      alt: "Diagram: a question goes through retrieval, ranking and synthesis before sources are cited",
      caption: "Most AI search products retrieve pages first, then write an answer from them. You have to be retrievable before you can be cited.",
      width: 1200,
      height: 520,
    },
    {
      type: "p",
      text: "Most AI search experiences follow the same broad pattern: they **retrieve** candidate pages from a search index, **rank** passages for relevance and trust, **synthesise** an answer, and **cite** the pages they leaned on. Google's AI features draw on Google's own index; ChatGPT search uses its own crawler (OAI-SearchBot) alongside partner data; Perplexity runs its own retrieval too.",
    },
    {
      type: "p",
      text: "That has a practical consequence: **if a page is not indexed, fast and clearly about something, it cannot be cited.** Technical SEO is the entry ticket to GEO.",
    },
    {
      type: "callout",
      tone: "tip",
      title: "What changed in 2026",
      text: "In May 2026 Google announced changes to how AI Overviews and AI Mode show links, including citations placed next to the text they support and more prominent links to websites. Being the clearest source for a specific claim matters more than ever.",
    },
    { type: "h2", id: "seven-steps", text: "Seven steps to become citable" },
    { type: "h3", text: "1. Let the right crawlers in" },
    {
      type: "p",
      text: "Check `robots.txt` and your firewall or CDN bot settings. Blocking OAI-SearchBot or PerplexityBot keeps you out of those engines' answers. Note the difference between search crawlers and training crawlers: you can, for example, block OpenAI's GPTBot (used for training) while allowing OAI-SearchBot (used for ChatGPT search). Google-Extended controls whether your content is used for Gemini models, but it does not remove you from Google Search or AI Overviews.",
    },
    { type: "h3", text: "2. Write answer-first content" },
    {
      type: "ul",
      items: [
        "Open each section with a direct, quotable answer in one or two sentences, then add the detail.",
        "Use question-style headings that match how people actually ask (“How much does X cost in Chennai?”).",
        "Include specifics a model can lift: prices, ranges, steps, comparisons, definitions, dates.",
        "Keep one main topic per page so the passage that answers a question is easy to isolate.",
      ],
    },
    { type: "h3", text: "3. Make your entity unambiguous" },
    {
      type: "p",
      text: "AI systems need to be sure who you are. Use the same business name, address and phone number everywhere; keep a detailed About page; name the people behind the work; and add Organization or LocalBusiness structured data with `sameAs` links to your real profiles. Inconsistent details across directories make models less confident about citing you.",
    },
    { type: "h3", text: "4. Use structured data for meaning, not tricks" },
    {
      type: "p",
      text: "Schema markup (Article, FAQPage, Product, Service, LocalBusiness) does not guarantee a citation, and Google limits which sites get FAQ rich results. It still helps machines read your page correctly. Only mark up content that is visible on the page.",
    },
    { type: "h3", text: "5. Earn mentions where models look" },
    {
      type: "p",
      text: "AI answers lean heavily on sources other than your own site: review platforms, industry directories, news coverage, comparison articles and community threads. Being mentioned, accurately, in the places your buyers already read is now part of search work. Prioritise the handful of sites that already rank for your main topics.",
    },
    { type: "h3", text: "6. Add llms.txt (cheap, optional)" },
    {
      type: "p",
      text: "`llms.txt` is a proposed plain-text file that summarises your site for language models. No major engine has confirmed relying on it, so treat it as a low-cost extra rather than a ranking lever. This site publishes one at [/llms.txt](/llms.txt).",
    },
    { type: "h3", text: "7. Measure AI visibility" },
    {
      type: "ul",
      items: [
        "In GA4, look at referrals from chatgpt.com, perplexity.ai, gemini.google.com and copilot.microsoft.com. ChatGPT often adds `utm_source=chatgpt.com` to the links it shows.",
        "Keep a list of 20–30 questions your buyers ask and check monthly which brands the main AI tools mention and cite.",
        "Watch Search Console for impressions on long, conversational queries. They are often a sign of AI-feature exposure.",
      ],
    },
    {
      type: "image",
      src: "/images/services/generative-engine-optimisation.jpg",
      alt: "Generative Engine Optimisation workspace showing AI search results analysis",
      caption: "GEO work is mostly content structure, entity clarity and measurement, not magic prompts.",
      width: 1376,
      height: 768,
    },
    { type: "h2", id: "common-mistakes", text: "Common GEO mistakes" },
    {
      type: "ul",
      items: [
        "Publishing AI-generated pages at volume. Models favour sources that add something new; near-duplicate content rarely gets cited.",
        "Hiding the answer below long intros, sliders and pop-ups.",
        "Blocking AI search crawlers by accident through a CDN's default bot protection.",
        "Measuring only rankings. AI exposure often shows up as brand searches and direct visits rather than clicks.",
      ],
    },
    {
      type: "callout",
      tone: "takeaway",
      title: "The short version",
      text: "Be indexable, be the clearest answer to specific questions, be consistent about who you are, and be mentioned on the sites AI tools already trust.",
    },
  ],
  faqs: [
    {
      q: "What is Generative Engine Optimisation?",
      a: "GEO is the practice of making your content and brand easy for AI search tools such as Google AI Overviews, ChatGPT, Perplexity and Gemini to find, understand, trust and cite in their answers.",
    },
    {
      q: "Is GEO different from SEO?",
      a: "It builds on SEO rather than replacing it. Indexing, speed and relevance are still prerequisites; GEO adds answer-first writing, entity consistency, off-site mentions and tracking AI referrals.",
    },
    {
      q: "Does llms.txt improve AI rankings?",
      a: "There is no confirmed evidence that major AI search engines rely on it. It is cheap to add, so it does no harm, but focus on content and crawl access first.",
    },
    {
      q: "Should I block AI crawlers?",
      a: "Block training crawlers if you prefer, but allow search crawlers such as OAI-SearchBot and PerplexityBot if you want to be cited in those tools' answers.",
    },
  ],
  sources: [
    {
      label: "Google Search Central: AI features and your website",
      url: "https://developers.google.com/search/docs/appearance/ai-features",
    },
    { label: "OpenAI: Overview of OpenAI crawlers", url: "https://platform.openai.com/docs/bots" },
    {
      label: "Nieman Lab: Google highlights links from subscribed publications in AI Overviews (May 2026)",
      url: "https://niemanlab.org/2026/05/google-highlights-links-from-subscribed-publications-in-new-ai-overviews-update",
    },
    { label: "llms.txt proposal", url: "https://llmstxt.org/" },
  ],
  cta: {
    title: "Want to know if AI tools cite you?",
    text: "Our free audit checks crawl access, entity consistency and how ChatGPT, Perplexity and Google's AI answer questions in your category.",
    href: "/free-audit",
    label: "Get a free GEO audit",
  },
};
