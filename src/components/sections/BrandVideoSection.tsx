"use client";

import React, { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { feedback } from "@/lib/vibe-feedback";

export default function BrandVideoSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    feedback.triggerHaptic(10);
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    feedback.triggerHaptic(10);
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const handleFullscreen = () => {
    const vid = videoRef.current;
    if (!vid) return;
    feedback.triggerHaptic(10);
    if (vid.requestFullscreen) {
      vid.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section
      id="brand-video"
      className={`${
        compact ? "py-12 lg:py-16" : "py-16 lg:py-24"
      } bg-gradient-to-b from-white via-[#F0F8FF]/60 to-white border-b border-slate-100 scroll-mt-24`}
    >
      <Container>
        {!compact && (
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2040] text-white text-xs font-bold tracking-wide uppercase mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
              <span>Official Brand Intro &bull; 4K Ultra HD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D2040] tracking-tight mb-3">
              The Digital Voice That Makes Your Brand Heard.
            </h2>
            <div className="w-20 h-1 bg-[#F58220] mx-auto rounded-full mb-4" />
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Watch how MIN MURASU combines high-intent digital marketing,
              conversion-engineered web systems, and AI workflow automation into one
              disciplined growth engine.
            </p>
          </div>
        )}

        {/* Cinema Showcase Frame */}
        <div className="relative max-w-5xl mx-auto rounded-3xl p-2 sm:p-3 bg-[#0D2040] border border-slate-700/80 shadow-2xl shadow-slate-950/20 overflow-hidden group">
          {/* Top Cinema Chrome Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#071326]/90 rounded-t-2xl border-b border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F58220]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#0082CA]" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-[11px] text-slate-300 font-semibold tracking-wider uppercase">
                MIN MURASU — DIGITAL GROWTH &amp; AI AUTOMATION
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#38BDF8] bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
              4K UHD
            </span>
          </div>

          {/* 16:9 Responsive Video Container */}
          <div className="relative aspect-video w-full bg-[#071326] rounded-b-2xl overflow-hidden">
            <video
              ref={videoRef}
              src="/video/MinMurasu_Intro_4K.mp4"
              poster="/images/MIN_MURASU_business_card_preview.png"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover cursor-pointer"
              aria-label="MIN MURASU Official 4K Brand Intro Video"
            >
              Your browser does not support the HTML5 video tag.
            </video>

            {/* Center Play Overlay when paused */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play brand intro video"
                className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
              >
                <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F58220] text-white flex items-center justify-center shadow-xl shadow-orange-950/50 hover:scale-105 active:scale-95 transition-transform">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </span>
              </button>
            )}

            {/* Floating Control Pill */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 bg-[#0D2040]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-white shadow-lg">
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-1.5 text-xs font-bold hover:text-[#F58220] transition-colors cursor-pointer px-1.5 py-1"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>

              <div className="w-px h-4 bg-slate-700" />

              <button
                type="button"
                onClick={toggleMute}
                className="flex items-center gap-1.5 text-xs font-bold hover:text-[#38BDF8] transition-colors cursor-pointer px-1.5 py-1"
                aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sound On</span>
                  </>
                )}
              </button>

              <div className="w-px h-4 bg-slate-700" />

              <button
                type="button"
                onClick={handleFullscreen}
                className="p-1 hover:text-[#38BDF8] transition-colors cursor-pointer"
                aria-label="Fullscreen video"
                title="Watch in Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

