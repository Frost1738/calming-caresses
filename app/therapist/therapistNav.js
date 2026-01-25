"use client";

import React from "react";
import Link from "next/link";
import { TbSmartHome } from "react-icons/tb";
import { PiCellSignalHighThin } from "react-icons/pi";
import { useState } from "react";

export default function TherapistNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-gradient-to-r from-[#0F1B2E] via-[#1A365D] to-[#0F1B2E] shadow-lg z-50">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="flex items-center h-16">
            <div className="flex-1 flex items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d85d92] to-[#aaa40d] flex items-center justify-center shadow-[0_0_20px_rgba(144,205,244,0.3)]">
                  <span className="font-bold text-[#0F1B2E] text-base">🌸</span>
                </div>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#90CDF4] via-[#EBF8FF] to-[#90CDF4] text-xl tracking-tight">
                  please select your Masseur
                </span>
              </div>
            </div>

            <div className="flex-1 flex justify-end items-center gap-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-[#2C5282]/80 to-[#2D3748]/80 backdrop-blur-sm hover:from-[#4299E1]/40 hover:to-[#2C5282]/40 text-[#EBF8FF] border border-[#90CDF4]/20 hover:border-[#90CDF4]/40 hover:shadow-[0_0_15px_rgba(144,205,244,0.2)]"
              >
                <TbSmartHome className="text-xl" />
                <span className="font-semibold">Home</span>
              </Link>
              <Link
                href="/therapist"
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-[#2C5282]/80 to-[#2D3748]/80 backdrop-blur-sm hover:from-[#4299E1]/40 hover:to-[#2C5282]/40 text-[#EBF8FF] border border-[#90CDF4]/20 hover:border-[#90CDF4]/40 hover:shadow-[0_0_15px_rgba(144,205,244,0.2)]"
              >
                <PiCellSignalHighThin className="text-2xl" />
                <span className="font-semibold">Levels</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-[#0F1B2E] via-[#1A365D] to-[#0F1B2E] shadow-lg z-50">
        <div className="px-5">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#90CDF4] to-[#63B3ED] flex items-center justify-center shadow-[0_0_15px_rgba(144,205,244,0.3)]">
                <span className="font-bold text-[#0F1B2E] text-sm">T</span>
              </div>
              <span className="font-bold text-[#EBF8FF] text-lg">
                Therapists
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#2C5282]/80 to-[#2D3748]/80 backdrop-blur-sm hover:from-[#4299E1]/40 hover:to-[#2C5282]/40 text-[#EBF8FF] border border-[#90CDF4]/20 hover:border-[#90CDF4]/40 transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_10px_rgba(144,205,244,0.2)]"
            >
              {isMenuOpen ? (
                <span className="text-lg font-bold">✕</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-gradient-to-b from-[#1A365D]/95 to-[#0F1B2E]/95 backdrop-blur-xl border-t border-[#90CDF4]/20 shadow-2xl py-4 px-5">
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 px-5 py-4 rounded-xl text-[#EBF8FF] hover:text-white hover:bg-gradient-to-r hover:from-[#4299E1]/20 hover:to-[#2C5282]/20 transition-all duration-300 border border-[#90CDF4]/10 hover:border-[#90CDF4]/30 mb-3"
              >
                <TbSmartHome className="text-2xl" />
                <span className="font-semibold text-lg">Home</span>
              </Link>
              <Link
                href="/therapist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 px-5 py-4 rounded-xl text-[#EBF8FF] hover:text-white hover:bg-gradient-to-r hover:from-[#4299E1]/20 hover:to-[#2C5282]/20 transition-all duration-300 border border-[#90CDF4]/10 hover:border-[#90CDF4]/30"
              >
                <PiCellSignalHighThin className="text-2xl" />
                <span className="font-semibold text-lg">Levels</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="h-16 md:h-16"></div>
    </>
  );
}
