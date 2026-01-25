import {
  User,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  getStatusColor,
  getStatusIcon,
  getStatusText,
  isPastDate,
} from "./StatusHelpers";
import { AppointmentActions } from "./AppointmentActions";

export const MobileAppointmentCard = ({
  appointment,
  expandedAppointment,
  onToggleDetails,
  onEdit,
  onCancel,
  onComplete,
  onMarkNoShow,
  isLoading,
}) => {
  const isPast = isPastDate(appointment.date);

  return (
    <div
      className={`bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-xl border p-4 ${
        isPast ? "border-slate-600/30 opacity-80" : "border-slate-700/30"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 border border-cyan-500/20">
            <User className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="font-medium text-white">
              {appointment.clientName}
              {isPast && (
                <span className="ml-2 text-xs text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded">
                  Past
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                  appointment.status,
                  appointment.completed,
                )}`}
              >
                {getStatusIcon(appointment.status, appointment.completed)}
                {getStatusText(appointment.status, appointment.completed)}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(appointment.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => onToggleDetails(appointment.id)} className="p-1">
          {expandedAppointment === appointment.id ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-sm">
          <div className="text-slate-400">Time</div>
          <div className="text-white font-medium">
            {appointment.time.split(":").slice(0, 2).join(":")}
          </div>
        </div>
        <div className="text-sm">
          <div className="text-slate-400">Service</div>
          <div className="text-white font-medium">
            {appointment.massageName}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expandedAppointment === appointment.id && (
        <div className="mt-4 pt-4 border-t border-slate-700/30 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300">
              {appointment.clientEmail || "No email"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300">Room: {appointment.room}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300">
              Duration: {appointment.duration}
            </span>
          </div>
          <div className="text-sm">
            <div className="text-slate-400">Price</div>
            <div className="text-emerald-300 font-medium">
              {appointment.price}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-slate-700/30">
        <AppointmentActions
          appointment={appointment}
          isLoading={isLoading}
          onEdit={onEdit}
          onCancel={onCancel}
          onComplete={onComplete}
          onMarkNoShow={onMarkNoShow}
        />
      </div>
    </div>
  );
};
