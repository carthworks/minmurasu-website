import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { servicesData } from "@/content/services";
import { industriesData } from "@/content/industries";
import { articles } from "@/content/insights";
import { publishedCaseStudies } from "@/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/book",
    "/free-audit",
    "/for-developers",
    "/crm",
    "/validate",
    "/pricing",
    "/roi-calculator",
    "/about",
    "/brand",
    "/services",
    "/industries",
    "/approach",
    "/work",
    "/insights",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/refund-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const servicePages = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryPages = Object.keys(industriesData).map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const insightPages = articles.map((a) => ({
    url: `${baseUrl}/insights/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // /case-studies is noindex until the first case study is live, so it joins the sitemap then.
  const caseStudyPages =
    publishedCaseStudies.length > 0
      ? [
          {
            url: `${baseUrl}/case-studies`,
            lastModified: new Date().toISOString().split("T")[0],
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
          ...publishedCaseStudies.map((c) => ({
            url: `${baseUrl}/case-studies/${c.slug}`,
            lastModified: c.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
        ]
      : [];

  return [...staticPages, ...servicePages, ...industryPages, ...insightPages, ...caseStudyPages];
}

