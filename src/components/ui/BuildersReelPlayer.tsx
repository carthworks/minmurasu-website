"use client";

import React, { useRef, useState } from "react";
import {
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { feedback } from "@/lib/vibe-feedback";

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface BuildersReelPlayerProps {
  className?: string;
  autoPlay?: boolean;
}

export default function BuildersReelPlayer({
  className = "",
  autoPlay = false,
}: BuildersReelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    feedback.playPop();
    feedback.triggerHaptic(15);
    setHasInteracted(true);

    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    feedback.triggerHaptic(10);
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    feedback.triggerHaptic(10);
    if (vid.requestFullscreen) {
      vid.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className={`relative mx-auto w-full max-w-[280px] sm:max-w-[310px] ${className}`}>
      {/* Smartphone Outer Chassis with Instagram styling */}
      <div className="relative rounded-[36px] p-2 bg-gradient-to-b from-slate-800 via-[#0D2040] to-black border-2 border-slate-700/80 shadow-2xl overflow-hidden group">
        {/* Top Speaker / Camera Notch */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/80 rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 mr-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
        </div>

        {/* 9:16 Vertical Reel Screen */}
        <div
          onClick={togglePlay}
          className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-black cursor-pointer select-none"
        >
          <video
            ref={videoRef}
            src="/video/MinMurasu_Builders_Reel_4K_presenter.mp4"
            playsInline
            loop
            muted={isMuted}
            preload="metadata"
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Top Reel Overlay: Instagram Brand Bar */}
          <div className="absolute top-0 inset-x-0 p-3 pt-6 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-20 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#F58220] to-[#E1306C] flex items-center justify-center text-white shadow-xs">
                <InstagramIcon className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-[11px] block text-white drop-shadow">
                  @minmurasu
                </span>
                <span className="text-[9px] text-slate-300 block">
                  Builders Growth Reel
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#F58220]" />
                )}
              </button>

              <button
                type="button"
                onClick={handleFullscreen}
                aria-label="Fullscreen view"
                className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Play Button Overlay (when paused or initial) */}
          {!isPlaying && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
              <div className="w-14 h-14 rounded-full bg-[#F58220] hover:bg-[#e07116] text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-1 fill-white" />
              </div>
              <span className="mt-3 text-xs font-bold text-white uppercase tracking-wider drop-shadow bg-black/60 px-3 py-1 rounded-full border border-white/10">
                {hasInteracted ? "Paused · Tap to Play" : "Watch 60s Reel"}
              </span>
            </div>
          )}

          {/* Subtle Bottom Reel Title Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-20 text-white text-left pointer-events-none">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F58220]/90 text-white text-[9px] font-extrabold uppercase tracking-wide mb-1.5">
              <Sparkles className="w-2.5 h-2.5" />
              4K Presenter Reel
            </div>
            <p className="text-[11px] font-bold text-white leading-tight drop-shadow">
              Turnkey Growth Architecture for Builders &amp; Contractors
            </p>
            <span className="text-[10px] text-slate-300 block mt-0.5">
              Tap screen to {isPlaying ? "pause" : "play"} · Min Murasu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
