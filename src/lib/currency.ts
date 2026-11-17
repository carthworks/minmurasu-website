import { useSyncExternalStore } from "react";
import type { Currency } from "@/content/pricing";

/**
 * Site-wide display currency for published prices. Every component that calls
 * useCurrency() re-renders together when it changes, and the choice is remembered
 * across pages (and tabs) via localStorage.
 *
 * The server always renders INR; after hydration the client switches to the stored
 * choice, or USD for visitors outside the India time zone.
 */
const STORAGE_KEY = "mm-pricing-currency";

let current: Currency | null = null;
const listeners = new Set<() => void>();

function isCurrency(v: unknown): v is Currency {
  return v === "INR" || v === "USD";
}

function initialCurrency(): Currency {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isCurrency(stored)) return stored;
  } catch {
    /* storage unavailable */
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz === "Asia/Kolkata" || tz === "Asia/Calcutta" ? "INR" : "USD";
  } catch {
    return "INR";
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && isCurrency(e.newValue) && e.newValue !== current) {
      current = e.newValue;
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Currency {
  if (current === null) current = initialCurrency();
  return current;
}

function getServerSnapshot(): Currency {
  return "INR";
}

export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setCurrency(next: Currency) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
  emit();
}
