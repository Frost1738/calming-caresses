"use client";

import { useState, useEffect, useMemo } from "react";
import { TbMassage } from "react-icons/tb";

// Pure deterministic function - can be shared or imported
function deterministicRandom(seed) {
  const x = Math.sin(seed * 100) * 10000;
  return Math.abs(x - Math.floor(x));
}

export default function AnotherLoader() {
  const [loading, setLoading] = useState(true);

  // Memoized bubble positions for this component
  const bubblePositions = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const random1 = deterministicRandom(i * 3);
        const random2 = deterministicRandom(i * 3 + 1);

        return {
          id: i,
          width: `${20 + i * 8}px`,
          height: `${20 + i * 8}px`,
          left: `${random1 * 100}%`,
          top: `${random2 * 100}%`,
          animation: `float ${8 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        };
      }),
    [],
  );

  // Your loader logic...

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {bubblePositions.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-200/30 to-purple-200/30"
            style={{
              width: bubble.width,
              height: bubble.height,
              left: bubble.left,
              top: bubble.top,
              animation: bubble.animation,
              animationDelay: bubble.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Main animation container */}
      <div className="relative flex flex-col items-center">
        {/* Breathing Icon Container */}
        <div className="relative mb-10">
          {/* Morphing container - like Supabase's breathing circle */}
          <div className="relative">
            {/* Outer breathing ring */}
            <div
              className={`absolute -inset-6 rounded-full border-2 transition-all duration-600 ${
                pulsePhase === 0
                  ? "border-emerald-400/40 scale-100"
                  : pulsePhase === 1
                    ? "border-blue-400/60 scale-110"
                    : pulsePhase === 2
                      ? "border-purple-400/40 scale-105"
                      : "border-emerald-300/50 scale-95"
              }`}
              style={{
                animation: "none", // We control via React state
              }}
            />

            {/* Inner breathing ring */}
            <div
              className={`absolute -inset-3 rounded-full border transition-all duration-500 ${
                pulsePhase === 0
                  ? "border-blue-300/30 scale-95"
                  : pulsePhase === 1
                    ? "border-purple-300/50 scale-105"
                    : pulsePhase === 2
                      ? "border-emerald-300/40 scale-100"
                      : "border-blue-300/40 scale-98"
              }`}
            />

            {/* The massage icon with Supabase-like breathing */}
            <TbMassage
              className={`relative w-24 h-24 transition-all duration-500 ${
                pulsePhase === 0
                  ? "text-emerald-600 scale-100 opacity-90"
                  : pulsePhase === 1
                    ? "text-blue-600 scale-110 opacity-100"
                    : pulsePhase === 2
                      ? "text-purple-600 scale-105 opacity-95"
                      : "text-emerald-500 scale-98 opacity-85"
              }`}
            />

            {/* Subtle particles that appear/disappear */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full transition-all duration-400 ${
                  pulsePhase === i
                    ? "bg-emerald-400/80 scale-100 opacity-100"
                    : "scale-0 opacity-0"
                }`}
                style={{
                  left: `${50 + Math.cos(i * 2.09) * 40}%`,
                  top: `${50 + Math.sin(i * 2.09) * 40}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Your three-dot loader (keeping what you like) */}
        <div className="text-center">
          <p className="text-emerald-800 font-medium text-lg tracking-wide mb-4">
            Preparing your session...
          </p>
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  pulsePhase === i
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 scale-125"
                    : "bg-emerald-300 scale-100"
                }`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS for floating dots */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-15px) translateX(10px) rotate(120deg);
            opacity: 0.6;
          }
          66% {
            transform: translateY(10px) translateX(-10px) rotate(240deg);
            opacity: 0.4;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
