import { Edit2, XCircle, CheckCircle, UserX, AlertCircle } from "lucide-react";

export const ActionModal = ({
  isOpen,
  onClose,
  modalAction,
  selectedAppointment,
  editTime,
  setEditTime,
  onConfirm,
  isLoading,
  timeSlots = [],
}) => {
  if (!isOpen || !selectedAppointment) return null;

  const modalConfigs = {
    edit: {
      icon: Edit2,
      title: "Edit Appointment Time",
      description: `Change time for ${selectedAppointment.clientName}'s appointment`,
      color: "from-cyan-600 to-blue-600",
      bgColor: "from-cyan-900/30 to-blue-900/30",
      borderColor: "border-cyan-700/30",
      textColor: "text-cyan-300",
      alertIconColor: "text-cyan-400",
      confirmText: "Update",
      loadingText: "Updating...",
      content: (
        <>
          <div className="mb-3 md:mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-1 md:mb-2">
              Select New Time
            </label>
            <select
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm md:text-base"
              disabled={isLoading}
            >
              <option value="" className="bg-slate-900">
                Select a time
              </option>
              {timeSlots.map((time) => (
                <option key={time} value={time} className="bg-slate-900">
                  {time.split(":").slice(0, 2).join(":")}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`bg-gradient-to-r ${modalConfigs.edit.bgColor} border ${modalConfigs.edit.borderColor} rounded-lg p-2 md:p-3`}
          >
            <div className="flex items-start">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-cyan-300">
                Client will be notified of the time change.
              </p>
            </div>
          </div>
        </>
      ),
    },
    cancel: {
      icon: XCircle,
      title: "Cancel Appointment",
      description: `Cancel ${selectedAppointment.clientName}'s appointment on ${new Date(selectedAppointment.date).toLocaleDateString()}?`,
      color: "from-rose-600 to-pink-600",
      bgColor: "from-rose-900/30 to-pink-900/30",
      borderColor: "border-rose-700/30",
      textColor: "text-rose-300",
      alertIconColor: "text-rose-400",
      confirmText: "Confirm",
      loadingText: "Cancelling...",
      content: (
        <div
          className={`bg-gradient-to-r ${modalConfigs.cancel.bgColor} border ${modalConfigs.cancel.borderColor} rounded-lg p-2 md:p-3 mb-3 md:mb-4`}
        >
          <div className="flex items-start">
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-rose-400 mr-2 flex-shrink-0 mt=0.5" />
            <div>
              <p className="text-xs md:text-sm text-rose-300 mb-1">
                Important Information:
              </p>
              <p className="text-xs md:text-sm text-rose-400">
                • Client will be notified via email
                <br />• This action cannot be undone
                <br />• Email sent to: {selectedAppointment.clientEmail}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    complete: {
      icon: CheckCircle,
      title: "Mark as Complete",
      description: `Mark ${selectedAppointment.clientName}'s session as completed?`,
      color: "from-emerald-600 to-green-600",
      bgColor: "from-emerald-900/30 to-green-900/30",
      borderColor: "border-emerald-700/30",
      textColor: "text-emerald-300",
      alertIconColor: "text-emerald-400",
      confirmText: "Complete",
      loadingText: "Processing...",
      content: (
        <div
          className={`bg-gradient-to-r ${modalConfigs.complete.bgColor} border ${modalConfigs.complete.borderColor} rounded-lg p-2 md:p-3 mb-3 md:mb-4`}
        >
          <div className="flex items-start">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 mr-2 flex-shrink-0 mt=0.5" />
            <div>
              <p className="text-xs md:text-sm text-emerald-300">
                • Mark session as completed
                <br />
                • Update client records
                <br />• Trigger follow-up reminders
              </p>
            </div>
          </div>
        </div>
      ),
    },
    no_show: {
      icon: UserX,
      title: "Mark as No Show",
      description: `Mark ${selectedAppointment.clientName}'s appointment as no show?`,
      color: "from-amber-600 to-orange-600",
      bgColor: "from-amber-900/30 to-orange-900/30",
      borderColor: "border-amber-700/30",
      textColor: "text-amber-300",
      alertIconColor: "text-amber-400",
      confirmText: "Mark as No Show",
      loadingText: "Processing...",
      content: (
        <div
          className={`bg-gradient-to-r ${modalConfigs.no_show.bgColor} border ${modalConfigs.no_show.borderColor} rounded-lg p-2 md:p-3 mb-3 md:mb-4`}
        >
          <div className="flex items-start">
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-amber-400 mr-2 flex-shrink-0 mt=0.5" />
            <div>
              <p className="text-xs md:text-sm text-amber-300 mb-1">
                Important Information:
              </p>
              <p className="text-xs md:text-sm text-amber-400">
                • This marks the client as not showing up
                <br />• This action cannot be undone
                <br />• May affect client's future booking privileges
              </p>
            </div>
          </div>
        </div>
      ),
    },
  };

  const config = modalConfigs[modalAction];
  if (!config) return null;

  const IconComponent = config.icon;
  const isDisabled = isLoading || (modalAction === "edit" && !editTime);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl max-w-md w-full p-4 md:p-6 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4 md:mb-6">
          <div
            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${config.color} mx-auto mb-3 md:mb-4`}
          >
            <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>

          <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
            {config.title}
          </h3>

          <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
            {config.description}
          </p>

          {config.content}
        </div>

        <div className="flex gap-2 md:gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
            disabled={isLoading}
          >
            {modalAction === "edit"
              ? "Cancel"
              : modalAction === "cancel"
                ? "Keep"
                : modalAction === "complete"
                  ? "Not Yet"
                  : "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDisabled}
            className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
              isDisabled
                ? `bg-gradient-to-r ${config.color}/50 cursor-not-allowed`
                : `bg-gradient-to-r ${config.color} hover:opacity-90`
            }`}
          >
            {isLoading ? config.loadingText : config.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
