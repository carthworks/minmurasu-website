import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  dark = false,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-12 sm:mb-16",
        alignmentClasses[align],
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs uppercase font-extrabold tracking-wider text-[#F58220] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4",
          dark ? "text-white" : "text-[#0D2040]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            dark ? "text-slate-300" : "text-[#334155]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

