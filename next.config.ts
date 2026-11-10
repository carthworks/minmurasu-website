import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable streaming metadata (<div hidden><Suspense name="Next.Metadata">) so browser extensions injecting nodes into <body> (e.g. #rcr-wrapper) do not trigger hydration mismatches */
  htmlLimitedBots: /.*/,
  /* Inline critical CSS to eliminate render-blocking stylesheet requests */
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [
      {
        source: "/industries/retail-local-services",
        destination: "/industries/retail-services",
        permanent: true,
      },
      {
        source: "/services/search-engine-optimization",
        destination: "/services/seo-local-seo",
        permanent: true,
      },
      {
        source: "/services/search-engine-optimisation",
        destination: "/services/seo-local-seo",
        permanent: true,
      },
      {
        source: "/services/web-development",
        destination: "/services/website-landing-pages",
        permanent: true,
      },
      {
        source: "/web-development",
        destination: "/services/website-landing-pages",
        permanent: true,
      },
      {
        source: "/services/seo",
        destination: "/services/seo-local-seo",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
