import { useState, useEffect } from "react";
import LineSparkline from "./lineSpark";
import { TrendingUp } from "lucide-react";

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  trend,
  index,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof value === "number") {
      const end = parseInt(value.toString().replace(/[^0-9]/g, ""));
      const duration = 1500;
      const stepTime = Math.max(Math.floor(duration / end), 1);

      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil(end / (duration / stepTime));
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setCount(current);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [value]);

  const displayValue =
    typeof value === "number"
      ? trend === "currency"
        ? `$${count.toLocaleString()}`
        : count.toLocaleString()
      : value;

  return (
    <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:scale-[1.02] group">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div
            className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${color} shadow-2xl shadow-cyan-500/20`}
          >
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <div
            className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold backdrop-blur-md border ${trend === "up" ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30" : "bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/30"}`}
          >
            <div className="flex items-center gap-0.5 md:gap-1">
              <TrendingUp
                className={`w-2 h-2 md:w-3 md:h-3 ${trend === "down" ? "rotate-180" : ""}`}
              />
              <span>{change}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <p className="text-xs md:text-sm text-gray-400 font-medium truncate">
            {title}
          </p>
          <p className="text-xl md:text-3xl font-bold text-white tracking-tight truncate">
            {displayValue}
          </p>
        </div>

        <div className="mt-3 md:mt-6">
          <LineSparkline
            data={Array.from(
              { length: 8 },
              (_, i) =>
                Math.sin(i * 0.5 + index) * 10 + 50 + Math.random() * 20,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
