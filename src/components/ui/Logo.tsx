import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "header" | "full" | "mark" | "footer";
  dark?: boolean;
  href?: string;
}

export function LogoMark({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center rounded-xl",
        dark ? "bg-white/10 p-1 backdrop-blur-xs" : "",
        className
      )}
    >
      <Image
        src="/images/logo.png"
        alt="MIN MURASU Logo"
        width={56}
        height={56}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

export default function Logo({
  className,
  variant = "header",
  dark = false,
  href = "/",
}: LogoProps) {
  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none", className)}>
      <LogoMark dark={dark} className={variant === "full" ? "w-14 h-14" : "w-11 h-11"} />

      {variant !== "mark" && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "font-black tracking-tight leading-none",
                variant === "full" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
                dark ? "text-white" : "text-[#0D2040]"
              )}
            >
              MIN MURASU
            </span>
          </div>

          <span
            className={cn(
              "tracking-wide uppercase font-semibold leading-tight mt-1",
              variant === "full" ? "text-xs" : "text-[10px]",
              dark ? "text-slate-300" : "text-[#0082CA]"
            )}
          >
            Turn Digital Attention Into Business Growth
          </span>

          {variant === "full" && (
            <div className="w-16 h-1 bg-[#F58220] rounded-full mt-1.5" />
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus-visible:outline-[#0082CA] rounded inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
