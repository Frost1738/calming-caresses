"use client";

import { Search, Filter } from "lucide-react";

export default function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) {
  return (
    <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-4 sm:p-5 shadow-lg border border-[#9D4EDD]/30 mb-4 sm:mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9D4EDD] w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search therapists by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-[#0F0F23]/50 border border-[#9D4EDD]/30 rounded-lg focus:ring-2 focus:ring-[#9D4EDD] focus:border-[#9D4EDD] outline-none text-white placeholder-[#B8B8FF]/60 text-sm sm:text-base backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#B8B8FF] flex-shrink-0" />
            <select
              value={filters.level}
              onChange={(e) =>
                setFilters({ ...filters, level: e.target.value })
              }
              className="w-full xs:w-auto px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0F0F23]/50 border border-[#9D4EDD]/30 rounded-lg focus:ring-2 focus:ring-[#9D4EDD] outline-none text-white text-sm sm:text-base backdrop-blur-sm"
            >
              <option value="all">All Levels</option>
              <option value="seasoned">Seasoned</option>
              <option value="specialist">Specialist</option>
              <option value="novice">Novice</option>
            </select>
          </div>

          <select
            value={filters.verified}
            onChange={(e) =>
              setFilters({ ...filters, verified: e.target.value })
            }
            className="w-full xs:w-auto px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0F0F23]/50 border border-[#9D4EDD]/30 rounded-lg focus:ring-2 focus:ring-[#9D4EDD] outline-none text-white text-sm sm:text-base backdrop-blur-sm"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified Only</option>
            <option value="unverified">Unverified Only</option>
          </select>
        </div>
      </div>
    </div>
  );
}
