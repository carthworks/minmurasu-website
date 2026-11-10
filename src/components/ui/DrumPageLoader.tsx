"use client";

import React, { useEffect, useState } from "react";
import AnimatedDrumLogo from "@/components/ui/AnimatedDrumLogo";

export default function DrumPageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fading out after initial mount
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 350);

    // Completely remove from DOM after fade transition
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 650);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-300 select-none ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Subtle Rhythmic Pulsing Glow behind Drum */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-gradient-to-tr from-[#0082CA]/15 via-[#F58220]/20 to-transparent blur-2xl animate-pulse pointer-events-none" />

        {/* Authentic Beating Drum with 2 Sticks */}
        <div className="w-36 h-28 sm:w-44 sm:h-32 relative z-10 drop-shadow-md">
          <AnimatedDrumLogo twoSticks={true} className="w-full h-full" />
        </div>

        {/* Brand Label & Rhythm Bar */}
        <div className="mt-4 text-center z-10">
          <span className="font-black text-lg tracking-tight text-[#0D2040] block">
            MIN MURASU
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#0082CA] block mt-0.5">
            The Digital Drum
          </span>

          {/* Smooth Rhythmic Loading Pulse Bar */}
          <div className="w-28 h-1 bg-slate-100 rounded-full mx-auto mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#0082CA] via-[#F58220] to-[#0082CA] rounded-full animate-[mm-loader-bar_1.2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}

