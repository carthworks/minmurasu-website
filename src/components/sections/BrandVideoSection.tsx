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
  Clapperboard,
} from "lucide-react";
import { feedback } from "@/lib/vibe-feedback";
import BuildersReelPlayer, { InstagramIcon } from "@/components/ui/BuildersReelPlayer";

export default function BrandVideoSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"brand" | "builders">("brand");

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
              <span>60-second intro</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D2040] tracking-tight mb-3">
              See how it works in one minute.
            </h2>
            <div className="w-20 h-1 bg-[#F58220] mx-auto rounded-full mb-4" />
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
              Murasu is the drum once used to announce news to a whole kingdom. We do the
              same for your business online — then make sure every enquiry gets an answer.
            </p>
          </div>
        )}

        {/* Tab Switcher: Brand Intro vs. Builders Instagram Reel */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => {
              feedback.playPop();
              feedback.triggerHaptic(10);
              setActiveTab("brand");
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "brand"
                ? "bg-[#0D2040] text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5 text-[#F58220]" />
            <span>Brand Intro (60s Cinema)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              feedback.playPop();
              feedback.triggerHaptic(10);
              setActiveTab("builders");
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "builders"
                ? "bg-gradient-to-r from-[#F58220] to-[#E1306C] text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Builders 4K Reel (Instagram)</span>
          </button>
        </div>

        {activeTab === "brand" ? (
          /* Cinema Showcase Frame */
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
                FULL HD
              </span>
            </div>

            {/* 16:9 Responsive Video Container */}
            <div className="relative aspect-video w-full bg-[#071326] rounded-b-2xl overflow-hidden">
              <video
                ref={videoRef}
                src="/video/MinMurasu_Intro_1080p.mp4"
                poster="/images/video-poster.jpg"
                loop
                playsInline
                preload="none"
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover cursor-pointer"
                aria-label="MIN MURASU brand intro video"
              >
                Your browser does not support the HTML5 video tag.
              </video>

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play brand intro video"
                  className="absolute inset-0 flex items-center justify-center bg-slate-950/15 transition-opacity cursor-pointer"
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
        ) : (
          /* Builders Instagram Reel Showcase */
          <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0D2040] via-[#0A1931] to-[#071326] text-white shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#F58220] to-[#E1306C] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram 4K Presenter Reel</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  Min Murasu Builders &amp; Construction Growth Reel
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  How commercial builders and property developers win qualified buyer inquiries online without relying on shared portal leads or brokers. Watch the full 60-second presenter breakdown.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10">
                    ✓ High-speed project landing pages
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10">
                    ✓ Automated WhatsApp brochure delivery
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10">
                    ✓ Verified buyer qualification
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center">
                <BuildersReelPlayer />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

