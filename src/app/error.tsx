"use client";

import React from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container className="max-w-md text-center">
        <div className="p-8 rounded-2xl border border-slate-200 bg-[#F0F8FF]/60 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#BAE6FD] flex items-center justify-center text-xl mx-auto text-[#F58220] font-bold">
            !
          </div>
          <h2 className="text-xl font-extrabold text-[#0D2040]">
            Something went wrong
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            An unexpected error occurred while loading this view. You can retry loading the page or return to the homepage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button type="button" variant="navy" size="sm" onClick={() => reset()}>
              Try Again
            </Button>
            <Button href="/" variant="outline" size="sm">
              Go Home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

