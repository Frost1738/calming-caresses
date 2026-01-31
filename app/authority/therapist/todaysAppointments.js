import React from "react";
import { User, CalendarDays } from "lucide-react";
import {
  getDisplayStatus,
  getStatusColor,
  getStatusIcon,
  getStatusText,
} from "./statusUtils";

export default function TodaysAppointments({
  appointments,
  renderActionButtons,
  todaysCount,
}) {
  if (todaysCount === 0) {
    return (
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-cyan-400" />
            Today's Appointments (0)
          </h2>
          <div className="text-sm text-slate-300">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6 md:p-8 text-center">
          <CalendarDays className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">
            No appointments today
          </h3>
          <p className="text-slate-500">You're all clear for today!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-cyan-400" />
          Today's Appointments ({todaysCount})
        </h2>
        <div className="text-sm text-slate-300">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => {
          const displayStatus = getDisplayStatus(
            appointment.status,
            appointment.completed,
          );

          return (
            <div
              key={appointment.id}
              className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 p-4 hover:border-cyan-500/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 border border-cyan-500/20">
                    <User className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {appointment.clientname}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                          appointment.status,
                          appointment.completed,
                        )}`}
                      >
                        {getStatusIcon(
                          appointment.status,
                          appointment.completed,
                        )}
                        {getStatusText(
                          appointment.status,
                          appointment.completed,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Time</span>
                  <span className="text-white font-medium">
                    {appointment.time.split(":").slice(0, 2).join(":")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Service</span>
                  <span className="text-white">{appointment.massage_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Room</span>
                  <span className="text-white">{appointment.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="text-white">
                    {appointment.duration} minutes
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-slate-700/30">
                {renderActionButtons(appointment)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
