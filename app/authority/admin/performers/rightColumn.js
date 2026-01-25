import PerformanceMetrics from "./performanceMetrics";
import TopAchievements from "./topAchievements";

export default function RightColumn({
  activeTab,
  totalStats,
  therapistRankings,
  clientRankings,
  formatName,
}) {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
      <PerformanceMetrics activeTab={activeTab} totalStats={totalStats} />

      <TopAchievements
        activeTab={activeTab}
        therapistRankings={therapistRankings}
        clientRankings={clientRankings}
        formatName={formatName}
      />
    </div>
  );
}
