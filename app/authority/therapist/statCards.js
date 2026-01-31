import React from "react";
import { CalendarDays, Clock, CheckCircle, XCircle, UserX } from "lucide-react";

const StatsCard = ({
  icon: Icon,
  label,
  value,
  gradientFrom,
  gradientTo,
  borderColor,
  iconColor,
  iconBgColor,
}) => {
  return (
    <div
      className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm rounded-xl p-4 md:p-5 border ${borderColor}`}
    >
      <div className="flex items-center">
        <div
          className={`p-2 md:p-3 ${iconBgColor} backdrop-blur-sm rounded-lg mr-3 md:mr-4`}
        >
          <Icon className={`w-4 h-4 md:w-6 md:h-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-xs md:text-sm text-white/80 font-medium">
            {label}
          </p>
          <p className="text-xl md:text-2xl font-semibold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function StatsCards({ stats }) {
  const cards = [
    {
      icon: CalendarDays,
      label: "Today",
      value: stats.todaysCount,
      gradientFrom: "from-cyan-900/60",
      gradientTo: "to-blue-900/60",
      borderColor: "border-cyan-700/30",
      iconBgColor: "bg-cyan-500/20",
      iconColor: "text-cyan-300",
    },
    {
      icon: Clock,
      label: "Scheduled",
      value: stats.scheduledCount,
      gradientFrom: "from-cyan-900/60",
      gradientTo: "to-blue-900/60",
      borderColor: "border-cyan-700/30",
      iconBgColor: "bg-cyan-500/20",
      iconColor: "text-cyan-300",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: stats.completedCount,
      gradientFrom: "from-emerald-900/60",
      gradientTo: "to-green-900/60",
      borderColor: "border-emerald-700/30",
      iconBgColor: "bg-emerald-500/20",
      iconColor: "text-emerald-300",
    },
    {
      icon: XCircle,
      label: "Cancelled",
      value: stats.cancelledCount,
      gradientFrom: "from-rose-900/60",
      gradientTo: "to-pink-900/60",
      borderColor: "border-rose-700/30",
      iconBgColor: "bg-rose-500/20",
      iconColor: "text-rose-300",
    },
    {
      icon: UserX,
      label: "No Show",
      value: stats.noShowCount,
      gradientFrom: "from-amber-900/60",
      gradientTo: "to-orange-900/60",
      borderColor: "border-amber-700/30",
      iconBgColor: "bg-amber-500/20",
      iconColor: "text-amber-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  );
}
