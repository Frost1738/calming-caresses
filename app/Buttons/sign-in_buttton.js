"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const FaSignInAlt = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaSignInAlt),
  { ssr: false },
);

export default function LiquidButton({ children }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  function handleClick() {
    router.push("./authentication?mode={registration}");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={handleClick}
      className="relative group w-full sm:w-auto max-w-xs mx-auto sm:mx-0
        border-none bg-transparent p-0 outline-none cursor-pointer 
        font-mono font-medium uppercase mt-4 sm:mt-8 md:mt-[5rem] mr-0
        transition-all duration-700 hover:scale-[1.01] active:scale-[0.99]
        isolate"
    >
      <div
        className="absolute -inset-4 rounded-[50%_60%_60%_50%_/_50%_50%_60%_60%]
        bg-gradient-to-r from-amber-200/30 via-orange-200/20 to-yellow-200/30
        opacity-0 group-hover:opacity-70 blur-2xl
        transition-all duration-2000 ease-in-out
        group-hover:rounded-[60%_40%_50%_70%_/_60%_40%_70%_50%]
        -z-10"
      ></div>

      <div
        className="absolute top-0 left-0 w-full h-full rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%]
        bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900
        opacity-95 group-hover:opacity-100
        transition-all duration-3000 ease-in-out
        group-hover:rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]
        animate-blob
        shadow-2xl shadow-black/30"
      ></div>

      <div
        className="absolute top-0 left-0 w-full h-full rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%]
        bg-gradient-to-b from-amber-100/15 via-yellow-100/10 to-amber-50/5
        mix-blend-overlay
        transition-all duration-3000 ease-in-out
        group-hover:rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]"
      ></div>

      <div
        className="absolute top-0 left-0 w-full h-full rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%]
        bg-gradient-to-br from-yellow-300/5 via-transparent to-amber-400/5
        opacity-60 group-hover:opacity-80
        transition-opacity duration-1000
        group-hover:rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]"
      ></div>

      <div
        className="relative flex items-center justify-center 
        py-4 px-6 text-base sm:py-4 sm:px-7 sm:text-lg
        md:py-5 md:px-8 md:text-xl lg:py-5 lg:px-9 lg:text-xl
        text-white rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%] gap-3 sm:gap-4
        transition-all duration-3000 ease-in-out
        group-hover:rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]
        group-hover:bg-gradient-to-r from-slate-800/60 via-gray-700/60 to-slate-800/60
        backdrop-blur-sm border border-amber-200/20 group-hover:border-amber-300/30
        overflow-hidden
        shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] group-hover:shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]"
        style={{
          transitionProperty:
            "border-radius, background, border-color, box-shadow",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative h-7 sm:h-8 md:h-9 overflow-hidden flex items-center z-10">
          <span
            className="select-none text-nowrap whitespace-nowrap 
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            transform translate-y-0 opacity-100 
            group-hover:-translate-y-full group-hover:opacity-0 block 
            text-amber-100 font-light tracking-widest text-sm sm:text-base
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          >
            welcome
          </span>

          <span
            className="select-none text-nowrap whitespace-nowrap 
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            transform translate-y-full opacity-0 
            group-hover:translate-y-0 group-hover:opacity-100
            absolute top-0 left-0 w-full text-center font-medium
            bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200
            text-sm sm:text-base tracking-wider
            drop-shadow-[0_0_10px_rgba(251,191,36,0.3),0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {children}
          </span>
        </div>

        <div className="relative flex-shrink-0 z-10">
          <FaSignInAlt
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
            transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
            group-hover:translate-x-3
            group-hover:rotate-180
            text-amber-200 group-hover:text-yellow-100
            drop-shadow-[0_0_8px_rgba(251,191,36,0.5),0_2px_4px_rgba(0,0,0,0.3)]
            group-hover:drop-shadow-[0_0_12px_rgba(253,230,138,0.7),0_2px_6px_rgba(0,0,0,0.4)]"
          />

          <div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full
            bg-gradient-to-br from-amber-300/60 to-yellow-200/40
            scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100
            transition-all duration-700 ease-out
            animate-drip
            shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          ></div>

          <div
            className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-300/15 to-amber-400/20
            scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-60
            transition-all duration-1000 ease-out
            blur-md"
          ></div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%]
          group-hover:rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]
          transition-all duration-3000 ease-in-out"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-20 h-20 rounded-full 
              bg-gradient-to-r from-amber-200/10 via-yellow-100/5 to-transparent
              animate-ripple"
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "3s",
              }}
            ></div>
          ))}
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-300/40 animate-pulse"
              style={{
                top: `${15 + i * 15}%`,
                left: `${Math.random() * 80 + 10}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-yellow-200
              animate-float-golden"
            style={{
              left: `${i * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + i}s`,
            }}
          ></div>
        ))}
      </div>

      <div
        className="absolute top-2 left-2 w-full h-full rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%]
        bg-gradient-to-r from-amber-900/20 via-yellow-900/15 to-amber-900/20
        -z-10
        transition-all duration-3000 ease-in-out
        group-hover:rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]"
      ></div>
    </button>
  );
}
