const DonutChart = ({ data, size = 120 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>

      <svg viewBox="0 0 100 100" className="rotate-[-90deg] relative z-10">
        {data.map((item, index) => {
          const percent = (item.value / total) * 100;
          const dashArray = `${percent} ${100 - percent}`;
          const dashOffset = 100 - cumulativePercent;
          cumulativePercent += percent;

          return (
            <g key={index}>
              <defs>
                <linearGradient
                  id={`grad${index}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={item.color} stopOpacity="1" />
                  <stop
                    offset="100%"
                    stopColor={item.color2 || item.color}
                    stopOpacity="0.8"
                  />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={`url(#grad${index})`}
                strokeWidth="16"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000 ease-out"
                style={{ filter: `drop-shadow(0 0 8px ${item.color})` }}
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center rotate-90 relative">
          <div className="relative z-10">
            <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
              {total}
            </div>
            <div className="text-[10px] md:text-xs text-gray-400 mt-1">
              Total
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
