import { Menu, X, Users, User } from "lucide-react";

export default function MobileHeader({
  bookings,
  mobileMenuOpen,
  setMobileMenuOpen,
  timeRange,
  setTimeRange,
  activeTab,
  setActiveTab,
  timeRanges,
  currentRankings,
  formatName,
}) {
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="text-left">
          <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            TOP PERFORMERS
          </h1>
          <p className="text-xs text-gray-400">
            {bookings?.length || 0} bookings
          </p>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-gray-300" />
          ) : (
            <Menu className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer - Positioned from right */}
      {mobileMenuOpen && (
        <div className="absolute right-3 top-20 z-50 w-[calc(100%-1.5rem)] max-w-xs bg-gray-800/90 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 animate-slideFromRight shadow-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Time Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      setTimeRange(range.value);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range.value
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
                        : "bg-gray-800/50 text-gray-400 border border-gray-700/50"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                View Rankings
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setActiveTab("therapists");
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
                    activeTab === "therapists"
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-gray-800/50 text-gray-400 border border-gray-700/50"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Therapists</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("clients");
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
                    activeTab === "clients"
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-gray-800/50 text-gray-400 border border-gray-700/50"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">Clients</span>
                </button>
              </div>
            </div>

            {/* Close button at bottom */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full mt-4 p-2 bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600/50 text-sm font-medium"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* Mobile Stats Cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50">
          <div className="text-xs text-gray-400 mb-1">Showing Top</div>
          <div className="text-base font-bold text-white">
            {currentRankings.length}
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50">
          <div className="text-xs text-gray-400 mb-1">Active Tab</div>
          <div className="text-sm font-medium text-white capitalize truncate">
            {activeTab}
          </div>
        </div>
      </div>
    </div>
  );
}
