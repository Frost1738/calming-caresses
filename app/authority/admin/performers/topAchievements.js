import { Gem, Flame, Heart, Target } from "lucide-react";

export default function TopAchievements({
  activeTab,
  therapistRankings,
  clientRankings,
  formatName,
}) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700/50">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg">
          <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
        </div>
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">
          Top Achievements
        </h3>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {activeTab === "therapists" && therapistRankings[0] && (
          <div className="p-2 sm:p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <div className="text-xs sm:text-sm text-amber-300">
                🏆 Most Booked
              </div>
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            </div>
            <div className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
              {formatName(therapistRankings[0].name)}
            </div>
            <div className="text-[10px] xs:text-xs text-amber-200/60 mt-0.5">
              {therapistRankings[0].bookings} bookings •{" "}
              {therapistRankings[0].uniqueClientCount} clients
            </div>
          </div>
        )}

        {activeTab === "clients" && clientRankings[0] && (
          <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <div className="text-xs sm:text-sm text-purple-300">
                💎 Most Loyal
              </div>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            </div>
            <div className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
              {formatName(clientRankings[0].name)}
            </div>
            <div className="text-[10px] xs:text-xs text-purple-200/60 mt-0.5">
              {clientRankings[0].bookings} visits •{" "}
              {clientRankings[0].massageTypeCount} types
            </div>
          </div>
        )}

        <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="text-xs sm:text-sm text-cyan-300">
              ⭐ Most Versatile
            </div>
            <Target className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
          </div>
          <div className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
            {activeTab === "therapists"
              ? therapistRankings.sort(
                  (a, b) => b.massageTypeCount - a.massageTypeCount,
                )[0]?.name
                ? formatName(
                    therapistRankings.sort(
                      (a, b) => b.massageTypeCount - a.massageTypeCount,
                    )[0].name,
                  )
                : "N/A"
              : clientRankings.sort(
                    (a, b) => b.massageTypeCount - a.massageTypeCount,
                  )[0]?.name
                ? formatName(
                    clientRankings.sort(
                      (a, b) => b.massageTypeCount - a.massageTypeCount,
                    )[0].name,
                  )
                : "N/A"}
          </div>
          <div className="text-[10px] xs:text-xs text-cyan-200/60 mt-0.5">
            {activeTab === "therapists"
              ? therapistRankings.sort(
                  (a, b) => b.massageTypeCount - a.massageTypeCount,
                )[0]?.massageTypeCount || 0
              : clientRankings.sort(
                  (a, b) => b.massageTypeCount - a.massageTypeCount,
                )[0]?.massageTypeCount || 0}{" "}
            different services
          </div>
        </div>
      </div>
    </div>
  );
}
