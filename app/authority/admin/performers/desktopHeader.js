import { Trophy, Users, User } from "lucide-react";

export default function DesktopHeader({
  bookings,
  timeRange,
  setTimeRange,
  activeTab,
  setActiveTab,
  timeRanges,
}) {
  return (
    <div className="hidden lg:block mb-8">
      <div className="flex flex-col items-center">
        <div className="relative mb-6 max-w-lg w-full">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-full"></div>
          <div className="relative p-4 bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl">
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TOP PERFORMERS
                </h1>
                <p className="text-gray-400 mt-1">
                  Based on {bookings?.length || 0} bookings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Time Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <div className="inline-flex flex-wrap gap-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  timeRange === range.value
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-800/30 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
            {["therapists", "clients"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 capitalize ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "therapists" ? (
                  <Users className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="hidden xs:inline">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
