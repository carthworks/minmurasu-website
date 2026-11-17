"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { setCurrency, useCurrency } from "@/lib/currency";
import { formatPrice, type Currency } from "@/content/pricing";

const OPTIONS: [Currency, string][] = [
  ["INR", "₹ INR · India"],
  ["USD", "$ USD · International"],
];

/** INR / USD switch. All prices on the page (and other pages) follow the choice. */
export function CurrencyToggle({ className, showNote = true }: { className?: string; showNote?: boolean }) {
  const currency = useCurrency();
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        role="radiogroup"
        aria-label="Currency"
        className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200"
      >
        {OPTIONS.map(([c, label]) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={currency === c}
            onClick={() => setCurrency(c)}
            className={cn(
              "px-4 sm:px-5 py-2 rounded-full text-sm font-bold transition-colors",
              currency === c ? "bg-[#0D2040] text-white shadow" : "text-slate-600 hover:text-[#0D2040]"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {showNote && (
        <p className="text-xs text-slate-500">
          {currency === "INR"
            ? "Prices for businesses in India, excluding 18% GST."
            : "Prices for businesses outside India, invoiced in US dollars."}
        </p>
      )}
    </div>
  );
}

/** A price in the visitor's chosen currency. */
export function Price({ amounts }: { amounts: Record<Currency, number> }) {
  const currency = useCurrency();
  return <>{formatPrice(amounts[currency], currency)}</>;
}

/** "+ 18% GST" or "Billed in USD", matching the chosen currency. */
export function TaxNote() {
  return useCurrency() === "INR" ? <>+ 18% GST</> : <>Billed in USD</>;
}
