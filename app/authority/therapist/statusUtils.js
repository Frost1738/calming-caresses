// Import icons for the icon function
import { Clock, CheckCircle, XCircle, UserX, Check, Edit2 } from "lucide-react";

export const getDisplayStatus = (status, completed) => {
  const normalizedStatus = status?.toLowerCase().replace(/\s+/g, "_");

  if (normalizedStatus === "cancelled") return "cancelled";
  if (normalizedStatus === "no_show") return "no_show";
  if (normalizedStatus === "completed") return "completed";
  if (completed) return "completed";

  return "scheduled";
};

export const getStatusColor = (status, completed) => {
  const displayStatus = getDisplayStatus(status, completed);

  switch (displayStatus) {
    case "scheduled":
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
    case "completed":
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    case "cancelled":
      return "bg-rose-500/20 text-rose-300 border border-rose-500/30";
    case "no_show":
      return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
    default:
      return "bg-slate-500/20 text-slate-300 border border-slate-500/30";
  }
};

export const getStatusIcon = (
  status,
  completed,
  className = "w-3 h-3 mr-1",
) => {
  const displayStatus = getDisplayStatus(status, completed);

  switch (displayStatus) {
    case "scheduled":
      return <Clock className={className} />;
    case "completed":
      return <CheckCircle className={className} />;
    case "cancelled":
      return <XCircle className={className} />;
    case "no_show":
      return <UserX className={className} />;
    default:
      return null;
  }
};

export const getStatusText = (status, completed) => {
  const displayStatus = getDisplayStatus(status, completed);

  switch (displayStatus) {
    case "scheduled":
      return "Scheduled";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    case "no_show":
      return "No Show";
    default:
      return "Pending";
  }
};

// Status action buttons renderer
export const renderActionButtons = (
  appointment,
  handlers,
  isLoading,
  isPastDate,
) => {
  const { handleMarkComplete, handleMarkNoShow, handleEditTime, handleCancel } =
    handlers;
  const displayStatus = getDisplayStatus(
    appointment.status,
    appointment.completed,
  );
  const isPast = isPastDate(appointment.date);

  // ONLY show action buttons for SCHEDULED appointments
  if (displayStatus === "scheduled") {
    if (isPast) {
      // Past scheduled appointments - suggest marking as no_show
      return (
        <div className="flex flex-col gap-2">
          <div className="text-sm text-amber-300 font-medium px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 backdrop-blur-sm text-center">
            <UserX className="w-3 h-3 inline mr-2" />
            Past Date - Mark as No Show
          </div>
          <button
            onClick={() => handleMarkNoShow(appointment)}
            className="w-full px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1 hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
            disabled={isLoading}
          >
            <UserX className="w-4 h-4" />
            Mark as No Show
          </button>
        </div>
      );
    }

    // Future or today's scheduled appointments - show all actions
    return (
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleMarkComplete(appointment)}
          className="flex-1 min-w-[100px] px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
          disabled={isLoading}
        >
          <Check className="w-3 h-3" />
          Complete
        </button>
        <button
          onClick={() => handleMarkNoShow(appointment)}
          className="flex-1 min-w-[100px] px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
          disabled={isLoading}
        >
          <UserX className="w-3 h-3" />
          No Show
        </button>
        <button
          onClick={() => handleEditTime(appointment)}
          className="p-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg"
          disabled={isLoading}
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCancel(appointment)}
          className="p-2 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg"
          disabled={isLoading}
        >
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // For completed, cancelled, and no_show statuses - just show the status
  return renderStatusIndicator(appointment);
};

// Render status indicator
export const renderStatusIndicator = (appointment) => {
  const displayStatus = getDisplayStatus(
    appointment.status,
    appointment.completed,
  );

  return (
    <div
      className={`text-sm font-medium px-3 py-1.5 rounded-lg border backdrop-blur-sm text-center ${getStatusColor(appointment.status, appointment.completed)}`}
    >
      {displayStatus === "completed" && (
        <CheckCircle className="w-3 h-3 inline mr-2" />
      )}
      {displayStatus === "cancelled" && (
        <XCircle className="w-3 h-3 inline mr-2" />
      )}
      {displayStatus === "no_show" && <UserX className="w-3 h-3 inline mr-2" />}
      {getStatusText(appointment.status, appointment.completed)}
    </div>
  );
};
