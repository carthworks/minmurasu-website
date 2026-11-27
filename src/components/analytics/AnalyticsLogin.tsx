"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

interface AnalyticsLoginProps {
  configured: boolean;
}

export default function AnalyticsLogin({ configured }: AnalyticsLoginProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim() || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/analytics/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Invalid password");
        setSubmitting(false);
        return;
      }
      setPassword("");
      router.refresh();
    } catch {
      setError("Unable to verify right now");
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0D2040] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white mb-4">
            <Lock className="w-3 h-3" />
            Hidden Analytics
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#0D2040]">
            MIN MURASU Web Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your private passphrase to unlock
          </p>
        </div>

        {!configured ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800 text-center">
            Set <code className="font-mono font-semibold">ANALYTICS_SECRET</code>{" "}
            in your environment variables to enable access.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="mm-analytics-password" className="sr-only">
                Passphrase
              </label>
              <input
                id="mm-analytics-password"
                type="password"
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passphrase"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0D2040] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2040]/10"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs text-rose-600 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !password.trim()}
              className="w-full rounded-xl bg-[#0D2040] hover:bg-[#16305E] disabled:opacity-40 disabled:cursor-not-allowed px-4 py-3 text-sm font-semibold text-white transition-colors"
            >
              {submitting ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
