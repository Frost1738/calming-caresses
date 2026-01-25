import {
  Users,
  User,
  Activity,
  CheckCircle,
  Calendar,
  MapPin,
} from "lucide-react";

export default function PerformersList({
  activeTab,
  currentRankings,
  getRankBadge,
  getPerformanceLevel,
  formatName,
}) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700/50">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
              {activeTab === "therapists" ? (
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              ) : (
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                {activeTab === "therapists" ? "Top Therapists" : "Top Clients"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                All-time rankings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden xs:block">
              <div className="text-xs sm:text-sm text-gray-400">Top</div>
              <div className="text-lg font-bold text-white">
                {currentRankings.length}
              </div>
            </div>
          </div>
        </div>

        {/* Performers List */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {currentRankings.length > 0 ? (
            currentRankings.map((item, index) => {
              const rank = index + 1;
              const badge = getRankBadge(rank);
              const BadgeIcon = badge.icon;
              const score =
                activeTab === "therapists"
                  ? item.performanceScore
                  : item.loyaltyScore;
              const performanceLevel = getPerformanceLevel(score);
              const LevelIcon = performanceLevel.icon;

              return (
                <div key={item.name} className="group relative overflow-hidden">
                  {rank <= 3 && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}

                  <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Rank and Name */}
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
                        <div className="relative shrink-0">
                          <div
                            className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${badge.bgColor}`}
                          >
                            <BadgeIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 xs:-top-2 xs:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 rounded-full border-2 border-gray-800 flex items-center justify-center">
                            <span className="text-[10px] xs:text-xs font-bold text-white">
                              {rank}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                            <h3 className="text-sm xs:text-base sm:text-lg font-bold text-white truncate">
                              {formatName(item.name)}
                            </h3>
                            <span
                              className={`px-1.5 py-0.5 xs:px-2 xs:py-1 text-xs font-medium rounded-full ${performanceLevel.bgColor} w-fit`}
                            >
                              <div className="flex items-center gap-1">
                                <LevelIcon className="w-3 h-3" />
                                <span className="hidden xs:inline">
                                  {performanceLevel.label}
                                </span>
                                <span className="xs:hidden">
                                  {performanceLevel.label.slice(0, 3)}
                                </span>
                              </div>
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-3">
                            {activeTab === "therapists" ? (
                              <>
                                <div className="flex items-center gap-1 text-[10px] xs:text-xs text-gray-400">
                                  <Users className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-cyan-400" />
                                  <span>{item.bookings} bks</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] xs:text-xs text-gray-400">
                                  <User className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-400" />
                                  <span>{item.uniqueClientCount} clts</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] xs:text-xs text-gray-400">
                                  <Activity className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-purple-400" />
                                  <span>{item.massageTypeCount} types</span>
                                </div>
                                {item.completionRate > 0 && (
                                  <div className="flex items-center gap-1 text-[10px] xs:text-xs text-gray-400">
                                    <CheckCircle className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-green-400" />
                                    <span>
                                      {item.completionRate.toFixed(0)}%
                                    </span>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-1 text-[10px] xs:text-xs text-gray-400">
                                  <Calendar className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-rose-400" />
                                  <span>{item.bookings} visits</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] xs:text-xs text-gray-400">
                                  <Users className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-purple-400" />
                                  <span className="truncate max-w-[80px] xs:max-w-[100px]">
                                    {item.favoriteTherapist
                                      ? `Fav: ${formatName(
                                          item.favoriteTherapist.split(" ")[0],
                                        )}`
                                      : "No fav"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] xs:text-xs text-gray-400">
                                  <MapPin className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-amber-400" />
                                  <span>{item.massageTypeCount} types</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Score Bar */}
                      <div className="w-full sm:w-auto sm:min-w-[140px] lg:min-w-[160px]">
                        <div className="flex items-center justify-between sm:justify-end mb-1">
                          <span className="text-xs text-gray-400 sm:hidden">
                            Score
                          </span>
                          <div className="flex items-center gap-1 xs:gap-2">
                            <span className="text-xs xs:text-sm text-gray-400 hidden sm:inline">
                              Score
                            </span>
                            <span className="text-sm xs:text-base sm:text-lg font-bold text-white">
                              {score}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 xs:h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${performanceLevel.bgColor}`}
                            style={{
                              width: `${Math.min(score, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400">No {activeTab} data available</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
