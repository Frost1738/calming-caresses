import { BarChart3 } from "lucide-react";

export default function PerformanceMetrics({ activeTab, totalStats }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700/50">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
        </div>
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">
          Performance Insights
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {activeTab === "therapists" ? (
          <>
            <div className="p-2 sm:p-3 bg-gray-800/30 rounded-lg">
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">
                Total Bookings
              </div>
              <div className="text-sm xs:text-base sm:text-lg font-bold text-white">
                {totalStats.totalBookings}
              </div>
            </div>

            <div className="p-2 sm:p-3 bg-gray-800/30 rounded-lg">
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">
                Unique Clients
              </div>
              <div className="text-sm xs:text-base sm:text-lg font-bold text-white">
                {totalStats.totalUniqueClients}
              </div>
            </div>

            <div className="col-span-2 p-2 sm:p-3 bg-gray-800/30 rounded-lg">
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">
                Massage Types
              </div>
              <div className="text-sm xs:text-base sm:text-lg font-bold text-white">
                {totalStats.totalMassageTypes}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-2 sm:p-3 bg-gray-800/30 rounded-lg">
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">
                Total Visits
              </div>
              <div className="text-sm xs:text-base sm:text-lg font-bold text-white">
                {totalStats.totalVisits}
              </div>
            </div>

            <div className="p-2 sm:p-3 bg-gray-800/30 rounded-lg">
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">
                Most Frequent
              </div>
              <div className="text-sm xs:text-base sm:text-lg font-bold text-white truncate">
                {totalStats.mostFrequentClient}
              </div>
            </div>

            <div className="col-span-2 p-2 sm:p-3 bg-gray-800/30 rounded-lg">
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">
                Unique Therapists
              </div>
              <div className="text-sm xs:text-base sm:text-lg font-bold text-white">
                {totalStats.totalUniqueTherapists}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
