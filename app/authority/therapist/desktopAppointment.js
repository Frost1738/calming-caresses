import { User, Mail, Clock, MapPin } from "lucide-react";
import {
  getStatusColor,
  getStatusIcon,
  getStatusText,
  isTodayAppointment,
  isPastDate,
} from "./StatusHelpers";
import { AppointmentActions } from "./AppointmentActions";

export const DesktopAppointmentRow = ({
  appointment,
  onEdit,
  onCancel,
  onComplete,
  onMarkNoShow,
  isLoading,
}) => {
  const isPast = isPastDate(appointment.date);
  const isToday = isTodayAppointment(appointment.date);

  return (
    <tr
      className={`hover:bg-slate-800/20 transition-colors ${
        isPast ? "opacity-80" : ""
      }`}
    >
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 border border-cyan-500/20">
            <User className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="font-medium text-white flex items-center gap-2">
              {appointment.clientName}
              {isToday && (
                <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  Today
                </span>
              )}
              {isPast && !isToday && (
                <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded">
                  Past
                </span>
              )}
            </div>
            <div className="text-sm text-slate-400 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {appointment.clientEmail || "No email"}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800/40 px-2 py-1 rounded">
                <MapPin className="w-3 h-3" />
                {appointment.room}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-white font-medium">
          {new Date(appointment.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3" />
          {appointment.time.split(":").slice(0, 2).join(":")}
          <span className="text-slate-600">•</span>
          {appointment.duration}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-white font-medium">{appointment.massageName}</div>
        <div className="text-sm text-emerald-300 mt-1">{appointment.price}</div>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm ${getStatusColor(
            appointment.status,
            appointment.completed,
          )}`}
        >
          {getStatusIcon(appointment.status, appointment.completed)}
          {getStatusText(appointment.status, appointment.completed)}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <AppointmentActions
            appointment={appointment}
            isLoading={isLoading}
            onEdit={onEdit}
            onCancel={onCancel}
            onComplete={onComplete}
            onMarkNoShow={onMarkNoShow}
          />
        </div>
      </td>
    </tr>
  );
};
