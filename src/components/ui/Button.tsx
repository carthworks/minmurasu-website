import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "amber" | "teal" | "orange" | "navy" | "cyan";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs sm:text-sm",
    md: "px-5 py-2.5 text-sm font-semibold",
    lg: "px-6 py-3 text-base font-semibold shadow-sm",
  };

  const variantStyles = {
    primary:
      "bg-[#0D2040] text-white hover:bg-[#16325C] active:bg-[#071326] focus-visible:outline-[#0D2040]",
    orange:
      "bg-[#F58220] text-white hover:bg-[#E06F12] active:bg-[#C95E09] font-bold focus-visible:outline-[#F58220]",
    navy:
      "bg-[#0D2040] text-white hover:bg-[#16325C] active:bg-[#071326] focus-visible:outline-[#0D2040]",
    cyan:
      "bg-[#0082CA] text-white hover:bg-[#0070AE] active:bg-[#005E94] focus-visible:outline-[#0082CA]",
    teal:
      "bg-[#0082CA] text-white hover:bg-[#0891B2] active:bg-[#155E75] focus-visible:outline-[#0082CA]",
    amber:
      "bg-[#F58220] text-white hover:bg-[#E06F12] active:bg-[#C95E09] font-semibold focus-visible:outline-[#F58220]",
    secondary:
      "bg-[#F0F8FF] text-[#0082CA] hover:bg-[#E1F0FA] border border-[#BAE6FD] focus-visible:outline-[#0082CA]",
    outline:
      "bg-transparent border border-[#CBD5E1] text-[#0D2040] hover:bg-slate-50 focus-visible:outline-[#0D2040]",
    ghost:
      "bg-transparent text-[#475569] hover:bg-slate-100 hover:text-[#0D2040] focus-visible:outline-[#0D2040]",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

