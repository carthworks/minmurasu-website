import React from "react";
import Link from "next/link";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|`[^`]+`)/g;

/** Renders **bold**, `code` and [text](href) inside article copy. Everything else is plain text. */
export default function InlineText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-[#0D2040]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="font-mono text-[0.9em] bg-slate-100 text-[#0D2040] px-1.5 py-0.5 rounded">
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const cls = "text-[#0082CA] font-medium underline underline-offset-2 hover:text-[#0D2040]";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} className={cls} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

/** Strips inline marks, for word counts and plain-text contexts. */
export function plainText(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}
