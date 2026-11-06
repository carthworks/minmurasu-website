import React from "react";
import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="py-16 sm:py-24 bg-white" aria-busy="true" aria-label="Loading page content">
      <Container>
        {/* Header Skeleton */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-14">
          <div className="h-5 w-36 rounded-full bg-slate-200/80 mx-auto animate-shimmer" />
          <div className="h-10 w-3/4 rounded-2xl bg-slate-200/80 mx-auto animate-shimmer" />
          <div className="h-4 w-2/3 rounded-xl bg-slate-100 mx-auto animate-shimmer" />
        </div>

        {/* 3-Column Card Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-7 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-4 animate-shimmer"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-200/80" />
                <div className="w-10 h-6 rounded-lg bg-slate-200/60" />
              </div>
              <div className="h-5 w-2/3 rounded-lg bg-slate-200/80" />
              <div className="space-y-2 pt-1">
                <div className="h-3 w-full rounded bg-slate-200/60" />
                <div className="h-3 w-5/6 rounded bg-slate-200/60" />
                <div className="h-3 w-3/4 rounded bg-slate-200/50" />
              </div>
              <div className="h-9 w-full rounded-xl bg-slate-200/50 mt-4" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
