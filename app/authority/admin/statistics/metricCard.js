import { useState, useEffect, useMemo } from "react";
import LineSparkline from "./lineSpark";
import { TrendingUp } from "lucide-react";

// Pure deterministic random-like function
function deterministicValue(seed, i) {
  const x = Math.sin(seed * 100 + i * 1000) * 10000;
  return Math.abs(x - Math.floor(x)); // Returns 0-1
}

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  trend,
  index = 0,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof value === "number") {
      const end = parseInt(value.toString().replace(/[^0-9]/g, ""));
      const duration = 1500;

      // Use requestAnimationFrame for smoother animation
      let startTime = null;
      let animationFrameId = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * end);

        setCount(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [value]);

  const displayValue = useMemo(() => {
    if (typeof value === "number") {
      const displayCount = count;
      return trend === "currency"
        ? `$${displayCount.toLocaleString()}`
        : displayCount.toLocaleString();
    }
    return value;
  }, [value, count, trend]);

  // Pure sparkline data generation
  const sparklineData = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const baseWave = Math.sin(i * 0.5 + index) * 10;
      const detailWave = Math.sin(i * 0.8 + index * 0.3) * 5;
      const fineWave = Math.sin(i * 1.2 + index * 0.7) * 5;
      return 50 + baseWave + detailWave + fineWave;
    });
  }, [index]);

  const trendColor = useMemo(() => {
    return trend === "up"
      ? {
          bg: "bg-gradient-to-r from-emerald-500/20 to-teal-500/20",
          text: "text-emerald-300",
          border: "border-emerald-500/30",
        }
      : {
          bg: "bg-gradient-to-r from-rose-500/20 to-pink-500/20",
          text: "text-rose-300",
          border: "border-rose-500/30",
        };
  }, [trend]);

  return (
    <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:scale-[1.02] group">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div
            className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${color} shadow-2xl shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105`}
          >
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div
            className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold backdrop-blur-md border ${trendColor.bg} ${trendColor.text} ${trendColor.border} transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/10`}
          >
            <div className="flex items-center gap-0.5 md:gap-1">
              <TrendingUp
                className={`w-2 h-2 md:w-3 md:h-3 transition-transform duration-300 ${
                  trend === "down" ? "rotate-180" : ""
                }`}
              />
              <span>{change}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <p className="text-xs md:text-sm text-gray-400 font-medium truncate transition-colors duration-300 group-hover:text-gray-300">
            {title}
          </p>
          <p className="text-xl md:text-3xl font-bold text-white tracking-tight truncate transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white">
            {displayValue}
          </p>
        </div>

        <div className="mt-3 md:mt-6 transition-opacity duration-300 group-hover:opacity-80">
          <LineSparkline data={sparklineData} />
        </div>
      </div>

      {/* Subtle background glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
    </div>
  );
};

export default MetricCard;
