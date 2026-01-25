"use client";

import { Users, Shield, Award, Star, Clock } from "lucide-react";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {/* Verified Card */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-3 sm:p-4 shadow-lg border border-[#00B4D8]/30">
        <div className="flex items-center">
          <div className="p-1.5 xs:p-2 bg-gradient-to-br from-[#00B4D8]/20 to-[#48CAE4]/20 rounded-lg mr-2 xs:mr-3 border border-[#00B4D8]/30">
            <Shield className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#48CAE4]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs xs:text-sm text-[#B8B8FF] truncate">
              Verified
            </p>
            <p className="text-base xs:text-lg font-semibold text-white truncate">
              {stats.verified}
            </p>
          </div>
        </div>
      </div>

      {/* Seasoned Card */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-3 sm:p-4 shadow-lg border border-[#FF6B6B]/30">
        <div className="flex items-center">
          <div className="p-1.5 xs:p-2 bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8E53]/20 rounded-lg mr-2 xs:mr-3 border border-[#FF6B6B]/30">
            <Award className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#FF8E53]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs xs:text-sm text-[#B8B8FF] truncate">
              Seasoned
            </p>
            <p className="text-base xs:text-lg font-semibold text-white truncate">
              {stats.seasoned}
            </p>
          </div>
        </div>
      </div>

      {/* Specialist Card */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-3 sm:p-4 shadow-lg border border-[#9D4EDD]/30">
        <div className="flex items-center">
          <div className="p-1.5 xs:p-2 bg-gradient-to-br from-[#9D4EDD]/20 to-[#C77DFF]/20 rounded-lg mr-2 xs:mr-3 border border-[#9D4EDD]/30">
            <Star className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#C77DFF]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs xs:text-sm text-[#B8B8FF] truncate">
              Specialist
            </p>
            <p className="text-base xs:text-lg font-semibold text-white truncate">
              {stats.specialist}
            </p>
          </div>
        </div>
      </div>

      {/* Novice Card */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-3 sm:p-4 shadow-lg border border-[#00B894]/30">
        <div className="flex items-center">
          <div className="p-1.5 xs:p-2 bg-gradient-to-br from-[#00B894]/20 to-[#00A085]/20 rounded-lg mr-2 xs:mr-3 border border-[#00B894]/30">
            <Clock className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#00B894]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs xs:text-sm text-[#B8B8FF] truncate">Novice</p>
            <p className="text-base xs:text-lg font-semibold text-white truncate">
              {stats.novice}
            </p>
          </div>
        </div>
      </div>

      {/* Total Card */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-3 sm:p-4 shadow-lg border border-[#B8B8FF]/30 col-span-2 xs:col-span-4 md:col-span-1">
        <div className="flex items-center justify-center md:justify-start">
          <div className="p-1.5 xs:p-2 bg-gradient-to-br from-[#B8B8FF]/20 to-[#9D4EDD]/20 rounded-lg mr-2 xs:mr-3 border border-[#B8B8FF]/30">
            <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#B8B8FF]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs xs:text-sm text-[#B8B8FF] truncate">Total</p>
            <p className="text-base xs:text-lg font-semibold text-white truncate">
              {stats.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
