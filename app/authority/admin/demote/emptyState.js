"use client";

import { Users } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-12 sm:py-16 md:py-20">
      <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto mb-4 xs:mb-5 sm:mb-6 bg-gradient-to-br from-[#9D4EDD]/20 to-[#7B2CBF]/20 rounded-full flex items-center justify-center border border-[#9D4EDD]/30">
        <Users className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-[#9D4EDD]" />
      </div>
      <h3 className="text-lg xs:text-xl font-medium bg-gradient-to-r from-[#B8B8FF] to-[#9D4EDD] bg-clip-text text-transparent mb-1.5 xs:mb-2">
        No therapists found
      </h3>
      <p className="text-[#B8B8FF] text-sm xs:text-base">
        Try adjusting your search or filters
      </p>
    </div>
  );
}
