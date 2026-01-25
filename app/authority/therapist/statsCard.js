import { CalendarDays, Clock, CheckCircle, XCircle, UserX } from "lucide-react";

export const StatsCards = ({
  todaysCount,
  scheduledCount,
  completedCount,
  cancelledCount,
  noShowCount,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
      {/* Today */}
      <div className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-cyan-700/30">
        <div className="flex items-center">
          <div className="p-2 md:p-3 bg-cyan-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
            <CalendarDays className="w-4 h-4 md:w-6 md:h-6 text-cyan-300" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-cyan-100/80 font-medium">
              Today
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white">
              {todaysCount}
            </p>
          </div>
        </div>
      </div>

      {/* Scheduled */}
      <div className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-cyan-700/30">
        <div className="flex items-center">
          <div className="p-2 md:p-3 bg-cyan-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
            <Clock className="w-4 h-4 md:w-6 md:h-6 text-cyan-300" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-cyan-100/80 font-medium">
              Scheduled
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white">
              {scheduledCount}
            </p>
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-gradient-to-br from-emerald-900/60 to-green-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-emerald-700/30">
        <div className="flex items-center">
          <div className="p-2 md:p-3 bg-emerald-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-emerald-300" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-emerald-100/80 font-medium">
              Completed
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white">
              {completedCount}
            </p>
          </div>
        </div>
      </div>

      {/* Cancelled */}
      <div className="bg-gradient-to-br from-rose-900/60 to-pink-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-rose-700/30">
        <div className="flex items-center">
          <div className="p-2 md:p-3 bg-rose-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
            <XCircle className="w-4 h-4 md:w-6 md-h-6 text-rose-300" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-rose-100/80 font-medium">
              Cancelled
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white">
              {cancelledCount}
            </p>
          </div>
        </div>
      </div>

      {/* No Show */}
      <div className="bg-gradient-to-br from-amber-900/60 to-orange-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-amber-700/30">
        <div className="flex items-center">
          <div className="p-2 md:p-3 bg-amber-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
            <UserX className="w-4 h-4 md:w-6 md:h-6 text-amber-300" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-amber-100/80 font-medium">
              No Show
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white">
              {noShowCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
