import React, { useEffect, useState } from "react";

export default function CarLoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing ROCKETDRIVE Engine...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const statuses = [
      "Initializing ROCKETDRIVE Engine...",
      "Calibrating Hybrid & EV Powertrains...",
      "Connecting VIN Inventory Registry...",
      "Synchronizing Smart Credit Engine...",
      "Ready for Launch."
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFadingOut(true);
          setTimeout(() => {
            if (onFinished) onFinished();
          }, 600);
          return 100;
        }
        const next = prev + 2;
        const textIndex = Math.min(Math.floor((next / 100) * statuses.length), statuses.length - 1);
        setStatusText(statuses[textIndex]);
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050d1a] transition-opacity duration-700 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background glow and subtle speed grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f214015_1px,transparent_1px),linear-gradient(to_bottom,#0f214015_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center">
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/30">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black tracking-widest text-white">ROCKET<span className="text-cyan-400">DRIVE</span></span>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Drive Your Next Journey</p>
          </div>
        </div>

        {/* ROAD TRACK & DRIVING CAR ANIMATION */}
        <div className="relative w-full h-24 mb-6 flex flex-col justify-end">
          {/* Animated Car running across the road */}
          <div
            className="absolute bottom-2 transition-all duration-75"
            style={{
              left: `calc(${progress}% - 70px)`,
              transform: "translateY(0)"
            }}
          >
            {/* Speed trail glow */}
            <div className="absolute -left-16 top-3 w-16 h-2 bg-gradient-to-r from-transparent to-cyan-400/60 blur-[3px]" />
            <div className="absolute -left-10 top-5 w-10 h-1 bg-gradient-to-r from-transparent to-sky-400/80 blur-[2px]" />

            {/* Small Sleek Sports Car SVG */}
            <svg
              className="w-24 h-12 filter drop-shadow-[0_4px_12px_rgba(14,165,233,0.5)]"
              viewBox="0 0 120 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Car Body Streamlined */}
              <path
                d="M8 32 C12 32 15 22 30 18 L68 14 C82 14 96 22 108 28 L114 31 C117 33 118 36 116 38 L112 40 C110 41 106 41 102 41 L10 41 C6 41 4 39 4 36 C4 33 6 32 8 32 Z"
                fill="url(#car_paint)"
              />
              {/* Cabin & Windows */}
              <path
                d="M34 18 L52 10 C62 10 76 11 82 16 L92 24 L38 24 Z"
                fill="url(#window_tint)"
              />
              <path
                d="M58 11 L57 24 M72 13 L70 24"
                stroke="#0f2140"
                strokeWidth="1.5"
              />
              {/* Headlight (LED Beam) */}
              <circle cx="112" cy="33" r="2.5" fill="#38bdf8" />
              <path d="M114 33 L126 31 L126 37 Z" fill="url(#headlight_beam)" opacity="0.7" />
              {/* Taillight (Red LED) */}
              <rect x="5" y="32" width="3" height="4" rx="1" fill="#ef4444" />
              <path d="M5 34 L-4 32 L-4 36 Z" fill="#ef4444" opacity="0.5" />
              {/* Wheel Arches & Rotating Neon Wheels */}
              <circle cx="28" cy="39" r="8" fill="#020617" stroke="#1e293b" strokeWidth="2" />
              <circle cx="28" cy="39" r="5" fill="#0ea5e9" className="animate-spin" style={{ animationDuration: "0.6s" }} />
              <circle cx="28" cy="39" r="2" fill="#ffffff" />

              <circle cx="90" cy="39" r="8" fill="#020617" stroke="#1e293b" strokeWidth="2" />
              <circle cx="90" cy="39" r="5" fill="#0ea5e9" className="animate-spin" style={{ animationDuration: "0.6s" }} />
              <circle cx="90" cy="39" r="2" fill="#ffffff" />

              <defs>
                <linearGradient id="car_paint" x1="0" y1="14" x2="118" y2="41" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0284c7" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#0369a1" />
                </linearGradient>
                <linearGradient id="window_tint" x1="34" y1="10" x2="92" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#082f49" />
                  <stop offset="1" stopColor="#0c4a6e" />
                </linearGradient>
                <linearGradient id="headlight_beam" x1="114" y1="33" x2="126" y2="33" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Asphalt Road Track */}
          <div className="w-full h-2 bg-slate-800 rounded-full relative overflow-hidden">
            {/* Road lines */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0ea5e9_0,#0ea5e9_15px,transparent_15px,transparent_30px)] opacity-40 animate-pulse" />
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full bg-slate-800/80 rounded-full h-2.5 p-0.5 mb-3 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-300 rounded-full transition-all duration-100 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {statusText}
          </span>
          <span className="text-cyan-400 font-bold font-mono text-sm">{progress}%</span>
        </div>

        <p className="mt-8 text-[11px] text-slate-500 text-center tracking-wider uppercase">
          Digital Automotive Dealership Ecosystem • Jakarta 2026
        </p>
      </div>
    </div>
  );
}
