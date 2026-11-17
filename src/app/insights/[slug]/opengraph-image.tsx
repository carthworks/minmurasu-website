import { ImageResponse } from "next/og";
import { articles, getArticle } from "@/content/insights";
import { siteConfig } from "@/lib/site-config";

export const alt = "MIN MURASU Insights article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? "Growth Insights";
  const category = article?.category ?? "Insights";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0D2040 0%, #12305c 60%, #0082CA 140%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#F58220",
              border: "2px solid rgba(245,130,32,0.5)",
              borderRadius: 999,
              padding: "8px 20px",
            }}
          >
            {category}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 70 ? 54 : 62, fontWeight: 800, lineHeight: 1.12 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", fontWeight: 800, letterSpacing: 1 }}>{siteConfig.name}</div>
          <div style={{ display: "flex", color: "#BAE6FD" }}>minmurasu.digital/insights</div>
        </div>
      </div>
    ),
    size
  );
}
