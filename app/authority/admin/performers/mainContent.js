import PerformersList from "./performanceList";
import RightColumn from "./rightColumn";

export default function MainContent({
  activeTab,
  currentRankings,
  getRankBadge,
  getPerformanceLevel,
  formatName,
  totalStats,
  therapistRankings,
  clientRankings,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      <PerformersList
        activeTab={activeTab}
        currentRankings={currentRankings}
        getRankBadge={getRankBadge}
        getPerformanceLevel={getPerformanceLevel}
        formatName={formatName}
      />

      <RightColumn
        activeTab={activeTab}
        totalStats={totalStats}
        therapistRankings={therapistRankings}
        clientRankings={clientRankings}
        formatName={formatName}
      />
    </div>
  );
}
