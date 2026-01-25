import { Sparkles, Zap, Target, TrendingUp } from "lucide-react";

export default function Legend() {
  return (
    <div className="mt-4 sm:mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-800/30 to-black/30 backdrop-blur-xl rounded-2xl border border-gray-700/50">
      <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-xs sm:text-sm text-white">Elite 80+</span>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-xs sm:text-sm text-white">Expert 60-79</span>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm text-white">Pro 40-59</span>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-white">New 0-39</span>
          </div>
        </div>
      </div>
    </div>
  );
}
