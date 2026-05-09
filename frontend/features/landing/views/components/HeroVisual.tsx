"use client";

import { BrainCircuit } from 'lucide-react';
import React, { ReactNode } from 'react'

interface FloatingCardProps {
  className: string;
  title: string;
  children: ReactNode;
}

interface AnimatedLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  dash: number;
  duration: string;
  delay: string;
}

const FloatingCard = ({
  className, title, children,
}: FloatingCardProps) => {
  return (
    <div
      className={`absolute rounded-[10px] border border-white/10 bg-slate-900/85 px-1.5 py-1 sm:px-3.5 sm:py-2.5 md:px-2.5 md:py-1.5 lg:px-3.5 lg:py-2.5 font-mono text-[11px] text-slate-400 backdrop-blur-sm ${className}`}
    >
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[1px] text-slate-200">
        {title}
      </div>
      {children}
    </div>
  );
}

function AnimatedLine({
  x1, y1, x2, y2, stroke, dash, duration, delay,
}: AnimatedLineProps) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth="1"
      strokeDasharray={dash}
      strokeDashoffset={dash}
    >
      <animate
        attributeName="stroke-dashoffset"
        from={String(dash)}
        to="0"
        dur={duration}
        begin={delay}
        fill="freeze"
      />
    </line>
  );
}

const HeroVisual = () => {
  return (
    <div className="relative h-120 overflow-hidden md:h-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.08)_0%,transparent_55%),radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.07)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[28px_28px]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 520" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="210" cy="260" r="90" fill="url(#coreGrad)" />
        <circle cx="210" cy="260" r="110" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />

        <g className="origin-center animate-[spin_18s_linear_infinite]">
          <circle cx="210" cy="260" r="130" fill="none" stroke="rgba(99,102,241,0.18)" strokeWidth="0.8" strokeDasharray="5 8" />
          <circle cx="210" cy="130" r="5" fill="#6366f1" opacity="0.8" />
          <circle cx="210" cy="390" r="4" fill="#6366f1" opacity="0.6" />
          <circle cx="80" cy="260" r="4" fill="#6366f1" opacity="0.6" />
          <circle cx="340" cy="260" r="5" fill="#6366f1" opacity="0.8" />
        </g>

        <g className="origin-center animate-[spin_24s_linear_infinite_reverse]">
          <circle cx="210" cy="260" r="165" fill="none" stroke="rgba(6,182,212,0.12)" strokeWidth="0.8" strokeDasharray="3 12" />
          <circle cx="210" cy="95" r="3.5" fill="#22d3ee" opacity="0.7" />
          <circle cx="375" cy="260" r="3.5" fill="#22d3ee" opacity="0.7" />
          <circle cx="45" cy="260" r="3" fill="#22d3ee" opacity="0.5" />
          <circle cx="210" cy="425" r="3" fill="#22d3ee" opacity="0.5" />
        </g>

        <AnimatedLine x1={210} y1={260} x2={80} y2={150} stroke="rgba(99,102,241,0.35)" dash={400} duration="2.5s" delay="0s" />
        <AnimatedLine x1={210} y1={260} x2={300} y2={140} stroke="rgba(99,102,241,0.35)" dash={300} duration="2s" delay="0.4s" />
        <AnimatedLine x1={210} y1={260} x2={100} y2={340} stroke="rgba(99,102,241,0.3)" dash={400} duration="2.5s" delay="0s" />
        <AnimatedLine x1={210} y1={260} x2={320} y2={340} stroke="rgba(99,102,241,0.3)" dash={300} duration="2s" delay="0.4s" />
        <AnimatedLine x1={210} y1={260} x2={210} y2={110} stroke="rgba(6,182,212,0.3)" dash={350} duration="2s" delay="0.8s" />
        <AnimatedLine x1={210} y1={260} x2={210} y2={410} stroke="rgba(6,182,212,0.25)" dash={350} duration="2s" delay="0.8s" />

        <line x1="120" y1="140" x2="300" y2="140" stroke="rgba(99,102,241,0.2)" strokeWidth="0.6" strokeDasharray="4 6" />
        <line x1="100" y1="340" x2="320" y2="340" stroke="rgba(99,102,241,0.2)" strokeWidth="0.6" strokeDasharray="4 6" />
        <line x1="120" y1="140" x2="100" y2="340" stroke="rgba(99,102,241,0.15)" strokeWidth="0.6" strokeDasharray="4 6" />
        <line x1="300" y1="140" x2="320" y2="340" stroke="rgba(99,102,241,0.15)" strokeWidth="0.6" strokeDasharray="4 6" />

        <g filter="url(#glow)">
          <circle cx="210" cy="260" r="28" fill="url(#nodeGrad)" opacity="0.95" />
          <circle cx="210" cy="260" r="22" fill="#4f46e5" />

          <g transform="translate(198 250)">
            <BrainCircuit className="h-4 w-4 -translate-y-2 text-white" />
            <text x="12" y="27" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="JetBrains Mono">CORE</text>
          </g>
        </g>

        <g filter="url(#glow)">
          <circle cx="80" cy="150" r="20" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
          <text x="80" y="146" textAnchor="middle" fill="#a5b4fc" fontSize="8" fontFamily="JetBrains Mono">ARCH</text>
          <text x="80" y="157" textAnchor="middle" fill="rgba(165,180,252,0.6)" fontSize="7" fontFamily="JetBrains Mono">design</text>
        </g>

        <g filter="url(#glow)">
          <circle cx="300" cy="150" r="16" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
          <text x="300" y="146" textAnchor="middle" fill="#67e8f9" fontSize="7" fontFamily="JetBrains Mono">CODE</text>
          <text x="300" y="157" textAnchor="middle" fill="rgba(103,232,249,0.6)" fontSize="6.5" fontFamily="JetBrains Mono">gen</text>
        </g>

        <g filter="url(#glow)">
          <circle cx="100" cy="340" r="20" fill="#0f172a" stroke="#f472b6" strokeWidth="1.5" />
          <text x="100" y="336" textAnchor="middle" fill="#f9a8d4" fontSize="8" fontFamily="JetBrains Mono">EVAL</text>
          <text x="100" y="347" textAnchor="middle" fill="rgba(249,168,212,0.6)" fontSize="7" fontFamily="JetBrains Mono">verify</text>
        </g>

        <g filter="url(#glow)">
          <circle cx="320" cy="340" r="18" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
          <text x="320" y="336" textAnchor="middle" fill="#6ee7b7" fontSize="7.5" fontFamily="JetBrains Mono">DEPLOY</text>
          <text x="320" y="347" textAnchor="middle" fill="rgba(110,231,183,0.6)" fontSize="6.5" fontFamily="JetBrains Mono">ship</text>
        </g>

        <g>
          <circle cx="210" cy="110" r="20" fill="#0f172a" stroke="rgba(99,102,241,0.45)" strokeWidth="1.5" />
          <text x="210" y="107" textAnchor="middle" fill="#818cf8" fontSize="8" fontFamily="JetBrains Mono">PLAN</text>
          <text x="210" y="117" textAnchor="middle" fill="rgba(129,140,248,0.5)" fontSize="7" fontFamily="JetBrains Mono">reqs</text>
        </g>

        <g>
          <circle cx="210" cy="410" r="16" fill="#0f172a" stroke="rgba(6,182,212,0.45)" strokeWidth="1" />
          <text x="210" y="407" textAnchor="middle" fill="#22d3ee" fontSize="7" fontFamily="JetBrains Mono">MONITOR</text>
          <text x="210" y="418" textAnchor="middle" fill="rgba(34,211,238,0.5)" fontSize="7" fontFamily="JetBrains Mono">observe</text>
        </g>

        <circle cx="165" cy="195" r="3" fill="#6366f1" opacity="0.5">
          <animate attributeName="cx" values="165;190;210" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="195;228;260" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.9;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="255" cy="195" r="3" fill="#22d3ee" opacity="0.5">
          <animate attributeName="cx" values="255;232;210" dur="2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="195;228;260" dur="2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.9;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="300" r="3" fill="#34d399" opacity="0.5">
          <animate attributeName="cx" values="210;235;265;290" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="300;310;325;340" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="300" r="3" fill="#f472b6" opacity="0.5">
          <animate attributeName="cx" values="210;185;155;120" dur="3.5s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="300;312;328;340" dur="3.5s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="3.5s" begin="0.8s" repeatCount="indefinite" />
        </circle>
      </svg>

      <FloatingCard className="left-[10%] top-[6%] animate-[float_3.8s_ease-in-out_infinite]" title="Plan">
        <div className="mb-1 text-[#6366f1]">→ Microservices</div>
        <div className="flex gap-1">
          <span className="rounded bg-[rgba(99,102,241,0.15)] px-1.5 py-0.5 text-[10px] text-[#818cf8]">REST</span>
          <span className="rounded bg-[rgba(34,211,238,0.12)] px-1.5 py-0.5 text-[10px] text-[#22d3ee]">gRPC</span>
          <span className="rounded bg-[rgba(52,211,153,0.12)] px-1.5 py-0.5 text-[10px] text-[#34d399]">CQRS</span>
        </div>
      </FloatingCard>

      <FloatingCard className="right-[2%] top-[12%] animate-[float_4.2s_ease-in-out_infinite] [animation-delay:1.2s]" title="Generated">
        <div className="text-[#22d3ee]">api/routes.ts</div>
        <div className="mt-0.75 text-[10px] text-slate-500">247 lines · TypeScript</div>
      </FloatingCard>

      <FloatingCard className="left-[6%] bottom-[10%] animate-[float_3.5s_ease-in-out_infinite] [animation-delay:0.6s]" title="Test suite">
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[#34d399]">✓ 48 passed</span>
          <span className="text-[#f87171]">✗ 2 flagged</span>
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-[16%] right-[3%] animate-[float_4s_ease-in-out_infinite] [animation-delay:1.8s]" title="Status">
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="inline-block h-1.75 w-1.75 rounded-full bg-[#34d399] animate-pulse" />
          <span className="text-[#34d399]">Live on staging</span>
        </div>
      </FloatingCard>
    </div>
  );
}

export default HeroVisual;