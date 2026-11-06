import React from "react";
import Link from "next/link";

export function EmptyState({
  title = "No items found",
  description = "Get started by exploring our core growth capabilities or adjusting your filter.",
  actionLabel = "Explore Services",
  actionHref = "/services",
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-slate-300 rounded-2xl bg-[#F0F8FF]/50 max-w-md mx-auto my-8">
      <div className="w-12 h-12 rounded-2xl bg-white border border-[#BAE6FD] flex items-center justify-center text-xl mb-4 text-[#F58220] shadow-2xs">
        ✦
      </div>
      <h3 className="text-base font-extrabold text-[#0D2040]">{title}</h3>
      <p className="text-xs text-[#475569] mt-1.5 mb-5 max-w-xs leading-relaxed">
        {description}
      </p>
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0D2040] text-white hover:bg-[#16305c] active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <span>+</span> {actionLabel}
        </button>
      ) : (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0D2040] text-white hover:bg-[#16305c] active:scale-95 transition-all shadow-sm"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

