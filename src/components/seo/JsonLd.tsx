import React from "react";
import { siteConfig } from "@/lib/site-config";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    alternateName: "MIN MURASU Digital Growth & AI Automation Agency",
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/MIN_MURASU_business_card_preview.png`,
    image: `${siteConfig.url}/images/MIN_MURASU_front_CMYK_300dpi.jpg`,
    telephone: siteConfig.phones.primary,
    email: siteConfig.emails.primary,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.0168",
      longitude: "76.9558",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Coimbatore",
      },
      {
        "@type": "City",
        name: "Chennai",
      },
      {
        "@type": "City",
        name: "Bengaluru",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "18:30",
      },
    ],
    sameAs: [
      siteConfig.socials.linkedin,
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    url: `${siteConfig.url}/services/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

