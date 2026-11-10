import React from "react";
import AnimatedDrumLogo from "@/components/ui/AnimatedDrumLogo";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-[#0082CA]/15 via-[#F58220]/20 to-transparent blur-2xl animate-pulse pointer-events-none" />

        {/* Authentic Beating Drum */}
        <div className="w-36 h-28 sm:w-44 sm:h-32 relative z-10 drop-shadow-md">
          <AnimatedDrumLogo twoSticks={true} className="w-full h-full" />
        </div>

        {/* Brand indicator */}
        <div className="mt-4 text-center z-10">
          <span className="font-black text-lg tracking-tight text-[#0D2040] block">
            MIN MURASU
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#0082CA] block mt-0.5">
            Loading...
          </span>

          {/* Rhythmic beat bar */}
          <div className="w-28 h-1 bg-slate-100 rounded-full mx-auto mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#0082CA] via-[#F58220] to-[#0082CA] rounded-full animate-[mm-loader-bar_1.2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
