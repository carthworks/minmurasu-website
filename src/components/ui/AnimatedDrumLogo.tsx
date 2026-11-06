import React from "react";

export default function AnimatedDrumLogo({
  className = "w-full h-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 -30 420 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Min Murasu drum logo, animated"
      className={`${className} overflow-visible`}
    >
      <style>{`
        .mm-stick{transform-origin:322px 6px;animation:mm-stick var(--dur,2.4s) infinite}
        @keyframes mm-stick{
          0%{transform:translate(16px,-26px) rotate(8deg);animation-timing-function:cubic-bezier(.45,0,.55,1)}
          34%{transform:translate(24px,-38px) rotate(12deg);animation-timing-function:cubic-bezier(.7,0,.95,.6)}
          46%{transform:translate(0,0) rotate(0deg);animation-timing-function:cubic-bezier(.2,.7,.4,1)}
          55%{transform:translate(8px,-13px) rotate(4deg);animation-timing-function:cubic-bezier(.5,0,.6,1)}
          62%{transform:translate(1px,-2px) rotate(.5deg);animation-timing-function:cubic-bezier(.45,0,.55,1)}
          100%{transform:translate(16px,-26px) rotate(8deg)}
        }
        .mm-drum{transform-box:fill-box;transform-origin:50% 85%;animation:mm-drum var(--dur,2.4s) infinite}
        @keyframes mm-drum{
          0%,45%{transform:scale(1,1)}
          49%{transform:scale(1.035,.955)}
          55%{transform:scale(.985,1.02)}
          62%{transform:scale(1.008,.995)}
          70%,100%{transform:scale(1,1)}
        }
        .mm-ripple{transform-box:fill-box;transform-origin:50% 50%;opacity:0;animation:mm-ripple var(--dur,2.4s) infinite}
        .mm-ripple.r2{animation-delay:calc(var(--dur,2.4s) * .06)}
        @keyframes mm-ripple{
          0%,45%{transform:scale(.15);opacity:0}
          47%{opacity:.85}
          75%{transform:scale(1);opacity:0}
          100%{transform:scale(1);opacity:0}
        }
        .mm-flash{transform-box:fill-box;transform-origin:50% 50%;opacity:0;animation:mm-flash var(--dur,2.4s) infinite}
        @keyframes mm-flash{0%,45%{opacity:0;transform:scale(.4)}48%{opacity:.9;transform:scale(1)}66%,100%{opacity:0;transform:scale(1.4)}}
        .mm-wave{transform-box:fill-box;transform-origin:0% 50%;animation:mm-wave var(--dur,2.4s) infinite}
        .mm-wave.w2{animation-delay:calc(var(--dur,2.4s) * .025)}
        .mm-wave.w3{animation-delay:calc(var(--dur,2.4s) * .05)}
        @keyframes mm-wave{
          0%,45%{opacity:.6;transform:translate(0,0) scaleX(.75)}
          50%{opacity:1;transform:translate(calc(var(--dx)*.4),calc(var(--dy)*.4)) scaleX(1.1)}
          68%{opacity:.9;transform:translate(var(--dx),var(--dy)) scaleX(1)}
          85%,100%{opacity:.6;transform:translate(0,0) scaleX(.75)}
        }
        .mm-px rect{animation:mm-px var(--dur,2.4s) infinite;transform-box:fill-box;transform-origin:50% 50%}
        @keyframes mm-px{
          0%,47%{opacity:1;transform:translateX(0) scale(1)}
          60%{opacity:.25;transform:translateX(-12px) scale(.75)}
          80%,100%{opacity:1;transform:translateX(0) scale(1)}
        }
        .mm-swoosh{transform-box:fill-box;transform-origin:60% 50%;animation:mm-swoosh var(--dur,2.4s) infinite}
        @keyframes mm-swoosh{0%,46%{transform:rotate(0) scale(1)}54%{transform:rotate(-2.5deg) scale(1.025)}72%,100%{transform:rotate(0) scale(1)}}
        .mm-shine{stroke-dasharray:60 520;animation:mm-shine var(--dur,2.4s) infinite linear}
        @keyframes mm-shine{0%,46%{stroke-dashoffset:60;opacity:0}50%{opacity:.9}80%{stroke-dashoffset:-430;opacity:0}100%{stroke-dashoffset:-430;opacity:0}}
        @keyframes mm-bar{0%,44%{transform:scaleX(.55)}50%{transform:scaleX(1.08)}70%,100%{transform:scaleX(.55)}}
        .mm-bar-anim{transform-origin:center;animation:mm-bar var(--dur,2.4s) cubic-bezier(.45,0,.2,1) infinite}
        @media (prefers-reduced-motion:reduce){.mm-stick,.mm-drum,.mm-ripple,.mm-flash,.mm-wave,.mm-px rect,.mm-swoosh,.mm-shine,.mm-bar-anim{animation:none}}
      `}</style>
      <defs>
        <linearGradient id="mmBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2A3A5C" />
          <stop offset=".45" stopColor="#1B2A48" />
          <stop offset="1" stopColor="#101C33" />
        </linearGradient>
        <linearGradient id="mmSwoosh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1D3F7A" />
          <stop offset=".55" stopColor="#1F6FC5" />
          <stop offset="1" stopColor="#2F93E6" />
        </linearGradient>
        <radialGradient id="mmHead" cx=".45" cy=".4" r=".7">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E9EEF6" />
        </radialGradient>
        <radialGradient id="mmGlow">
          <stop offset="0" stopColor="#FFB25E" stopOpacity=".95" />
          <stop offset="1" stopColor="#FFB25E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* digital pixels */}
      <g className="mm-px">
        <rect x="104" y="92" width="15" height="15" rx="2" fill="#2F93E6" style={{ animationDelay: "0s" }} />
        <rect x="80" y="112" width="12" height="12" rx="2" fill="#1F6FC5" style={{ animationDelay: ".05s" }} />
        <rect x="108" y="122" width="19" height="19" rx="2" fill="#1A5DAE" style={{ animationDelay: ".02s" }} />
        <rect x="56" y="128" width="10" height="10" rx="2" fill="#2F93E6" style={{ animationDelay: ".12s" }} />
        <rect x="84" y="140" width="15" height="15" rx="2" fill="#2F93E6" style={{ animationDelay: ".08s" }} />
        <rect x="36" y="146" width="8" height="8" rx="1.5" fill="#1F6FC5" style={{ animationDelay: ".18s" }} />
        <rect x="62" y="158" width="12" height="12" rx="2" fill="#1A5DAE" style={{ animationDelay: ".14s" }} />
        <rect x="96" y="166" width="11" height="11" rx="2" fill="#1F6FC5" style={{ animationDelay: ".1s" }} />
        <rect x="44" y="176" width="9" height="9" rx="1.5" fill="#2F93E6" style={{ animationDelay: ".2s" }} />
      </g>

      {/* drum */}
      <g transform="translate(212 132) rotate(30)">
        <g className="mm-drum">
          <path
            d="M-76 -70 C -80 -8, -66 46, -50 76 A 50 18 0 0 0 50 76 C 66 46, 80 -8, 76 -70 Z"
            fill="url(#mmBody)"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <g fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round">
            <path d="M-53 -50 Q -58 22 -36 87" />
            <path d="M-18 -43 Q -20 25 -12 92" />
            <path d="M18 -43 Q 20 25 12 92" />
            <path d="M53 -50 Q 58 22 36 87" />
          </g>
          <ellipse cx="0" cy="-70" rx="76" ry="28" fill="url(#mmHead)" stroke="#F28A22" strokeWidth="9" />
          <ellipse className="mm-ripple" cx="0" cy="-70" rx="60" ry="21" fill="none" stroke="#F28A22" strokeWidth="3" />
          <ellipse className="mm-ripple r2" cx="0" cy="-70" rx="44" ry="15" fill="none" stroke="#F7B26A" strokeWidth="2.5" />
          <ellipse className="mm-flash" cx="0" cy="-70" rx="30" ry="12" fill="url(#mmGlow)" />
        </g>
      </g>

      {/* swoosh ring */}
      <g className="mm-swoosh">
        <path
          d="M92 186 C 150 252, 280 246, 346 140 C 300 222, 170 244, 92 186 Z"
          fill="url(#mmSwoosh)"
        />
        <path
          className="mm-shine"
          d="M102 193 C 165 240, 275 236, 338 150"
          fill="none"
          stroke="#BFE3FF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* sound waves */}
      <g stroke="#F28A22" strokeWidth="10" strokeLinecap="round" fill="none">
        <line
          className="mm-wave"
          x1="306"
          y1="30"
          x2="336"
          y2="13"
          style={{ ["--dx" as string]: "10px", ["--dy" as string]: "-6px" }}
        />
        <line
          className="mm-wave w2"
          x1="318"
          y1="66"
          x2="356"
          y2="62"
          style={{ ["--dx" as string]: "12px", ["--dy" as string]: "-1px" }}
        />
        <line
          className="mm-wave w3"
          x1="310"
          y1="104"
          x2="342"
          y2="118"
          style={{ ["--dx" as string]: "10px", ["--dy" as string]: "5px" }}
        />
      </g>

      {/* stick */}
      <g className="mm-stick">
        <line
          x1="322"
          y1="6"
          x2="247"
          y2="74"
          stroke="#F28A22"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="245" cy="76" r="8.5" fill="#E2761A" />
      </g>
    </svg>
  );
}

