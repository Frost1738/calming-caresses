"use client";

import { Mail, Clock, Award, Star, UserX, Shield } from "lucide-react";
import Image from "next/image";
export default function TherapistCard({
  therapist,
  handleDeregister,
  getLevelColor,
  getLevelLabel,
  formatEducation,
}) {
  return (
    <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl shadow-2xl border border-[#9D4EDD]/20 overflow-hidden hover:shadow-[0_20px_50px_rgba(157,78,221,0.3)] transition-all duration-500 hover:scale-[1.02]">
      <div className="p-4 sm:p-6">
        {/* Therapist Header */}
        <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-start space-x-3 sm:space-x-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#9D4EDD]/20 to-[#7B2CBF]/20 rounded-xl overflow-hidden border border-[#9D4EDD]/30">
                {therapist.image ? (
                  <Image
                    src={therapist.image || "/default-therapist.jpg"}
                    alt={therapist.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xl xs:text-2xl font-bold text-[#B8B8FF]">
                      {therapist.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Verified Badge */}
              {therapist.verified && (
                <div className="absolute -bottom-1 -right-1 p-0.5 xs:p-1 bg-gradient-to-br from-[#00B894] to-[#00A085] rounded-full border border-white/20">
                  <Shield className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-white" />
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col xs:flex-row xs:items-center xs:flex-wrap gap-1.5 xs:gap-2 sm:gap-3 mb-2">
                <h3 className="text-base xs:text-lg font-semibold text-white truncate">
                  {therapist.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold text-white rounded-lg shadow-lg ${getLevelColor(
                    therapist.level,
                  )} w-fit`}
                >
                  {getLevelLabel(therapist.level)}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-sm text-[#B8B8FF]">
                  <Mail className="w-3 h-3 flex-shrink-0 text-[#9D4EDD]" />
                  <span className="truncate text-xs xs:text-sm">
                    {therapist.emailAddress ||
                      `${therapist.name
                        .toLowerCase()
                        .replace(/\s+/g, ".")}@massageclinic.com`}
                  </span>
                </div>

                <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 xs:gap-4 text-xs xs:text-sm text-[#B8B8FF]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 flex-shrink-0 text-[#00B894]" />
                    <span>{therapist.experience} years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3 flex-shrink-0 text-[#FF8E53]" />
                    <span>{formatEducation(therapist.education)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mt-4 xs:mt-5 sm:mt-6 mb-3 xs:mb-4">
          <div className="text-center">
            <div className="text-base xs:text-lg font-bold bg-gradient-to-r from-[#48CAE4] to-[#00B4D8] bg-clip-text text-transparent">
              {therapist.hours}
            </div>
            <div className="text-xs text-[#B8B8FF]/70 truncate">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-base xs:text-lg font-bold bg-gradient-to-r from-[#00B894] to-[#00A085] bg-clip-text text-transparent">
              ${therapist.price}
            </div>
            <div className="text-xs text-[#B8B8FF]/70 truncate">Session</div>
          </div>
          <div className="text-center">
            <div className="text-base xs:text-lg font-bold bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">
              {therapist.reviews}
            </div>
            <div className="text-xs text-[#B8B8FF]/70 truncate">Reviews</div>
          </div>
          <div className="text-center">
            <div className="flex flex-col xs:flex-row xs:items-center justify-center gap-0.5 xs:gap-1">
              <Star className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#FFD700] fill-current mx-auto xs:mx-0" />
              <span className="text-base xs:text-lg font-bold text-[#FFD700]">
                {therapist.rating}
              </span>
            </div>
            <div className="text-xs text-[#B8B8FF]/70 truncate">Rating</div>
          </div>
        </div>

        {/* Deregister Button */}
        <div className="pt-3 xs:pt-4 border-t border-[#9D4EDD]/20">
          <button
            onClick={() => handleDeregister(therapist.id)}
            className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gradient-to-r from-[#FF6B6B]/10 to-[#EE5A52]/10 text-[#FF6B6B] hover:from-[#FF6B6B]/20 hover:to-[#EE5A52]/20 border border-[#FF6B6B]/30 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5 xs:gap-2 text-sm xs:text-base hover:shadow-lg hover:shadow-[#FF6B6B]/20"
          >
            <UserX className="w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0" />
            <span className="truncate">De-register Therapist</span>
          </button>
        </div>
      </div>
    </div>
  );
}
