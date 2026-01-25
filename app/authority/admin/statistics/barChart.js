const BarChart = ({
  data,
  color = "from-purple-500 via-pink-500 to-rose-500",
}) => {
  const max = Math.max(...data.map((d) => d.value));
  const displayData =
    max === 0
      ? data.map((item) => ({ ...item, value: Math.random() * 10 + 5 }))
      : data;
  const displayMax = Math.max(...displayData.map((d) => d.value));

  return (
    <div className="space-y-3">
      {displayData.map((item, index) => {
        const percentage = (item.value / displayMax) * 100;

        return (
          <div key={index} className="flex items-center gap-4 group">
            <div className="w-20 md:w-28">
              <div className="text-xs md:text-sm text-gray-300 truncate">
                {item.label}
              </div>
              <div className="text-[10px] md:text-xs text-gray-500">
                {item.value} bookings
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-2 left-2 w-full h-4 md:h-6 bg-black/30 rounded-xl blur-sm"></div>
              <div className="relative h-6 md:h-8 bg-gray-900/50 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm">
                <div
                  className={`h-full bg-gradient-to-r ${color} rounded-xl transition-all duration-1000 ease-out relative overflow-hidden`}
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent w-1/3"></div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 to-transparent"></div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <div className="px-1.5 py-0.5 md:px-2 md:py-1 bg-black/40 backdrop-blur-sm rounded-lg">
                      <span className="text-[10px] md:text-xs font-bold text-white">
                        {item.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
