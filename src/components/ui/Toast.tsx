"use client";

import React, { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "loading";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  loading: "⟳",
};

const badgeStyles: Record<ToastType, string> = {
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  error: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  info: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  loading: "bg-amber-500/15 text-amber-400 border-amber-500/30 animate-spin",
};

export function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    if (toast.type === "loading") return;
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration ?? 5000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl backdrop-blur-md bg-[#0D2040]/95 text-white border border-slate-700/80 shadow-xl shadow-slate-950/25 transition-all duration-300"
    >
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold shrink-0 ${badgeStyles[toast.type]}`}
      >
        {icons[toast.type]}
      </span>
      <p className="text-xs sm:text-sm font-medium pr-2 leading-snug">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-white text-xs ml-auto p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}
