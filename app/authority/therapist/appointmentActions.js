import { Edit2, XCircle, CheckCircle, UserX, AlertCircle } from "lucide-react";

const ModalContent = {
  edit: ({
    selectedAppointment,
    editTime,
    setEditTime,
    isLoading,
    timeSlots,
  }) => ({
    icon: <Edit2 className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-cyan-600 to-blue-600",
    title: "Edit Appointment Time",
    description: `Change time for ${selectedAppointment.clientName}'s appointment`,
    content: (
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
    ),
    alert: {
      color: "from-cyan-900/30 to-blue-900/30 border border-cyan-700/30",
      text: "Client will be notified of the time change.",
    },
    buttons: {
      cancel: "Cancel",
      confirm: "Update",
      confirmColor: "from-cyan-600 to-blue-600",
    },
    validate: !editTime,
  }),

  cancel: ({ selectedAppointment }) => ({
    icon: <XCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-rose-600 to-pink-600",
    title: "Cancel Appointment",
    description: `Cancel ${selectedAppointment.clientName}'s appointment on ${new Date(selectedAppointment.date).toLocaleDateString()}?`,
    content: null,
    alert: {
      color: "from-rose-900/30 to-pink-900/30 border border-rose-700/30",
      text: `Important Information:
      • Client will be notified via email
      • This action cannot be undone
      • Email sent to: ${selectedAppointment.clientEmail}`,
    },
    buttons: {
      cancel: "Keep",
      confirm: "Confirm",
      confirmColor: "from-rose-600 to-pink-600",
    },
  }),

  complete: ({ selectedAppointment }) => ({
    icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-emerald-600 to-green-600",
    title: "Mark as Complete",
    description: `Mark ${selectedAppointment.clientName}'s session as completed?`,
    content: null,
    alert: {
      color: "from-emerald-900/30 to-green-900/30 border border-emerald-700/30",
      text: `• Mark session as completed
      • Update client records
      • Trigger follow-up reminders`,
    },
    buttons: {
      cancel: "Not Yet",
      confirm: "Complete",
      confirmColor: "from-emerald-600 to-green-600",
    },
  }),

  no_show: ({ selectedAppointment }) => ({
    icon: <UserX className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "from-amber-600 to-orange-600",
    title: "Mark as No Show",
    description: `Mark ${selectedAppointment.clientName}'s appointment as no show?`,
    content: null,
    alert: {
      color: "from-amber-900/30 to-orange-900/30 border border-amber-700/30",
      text: `Important Information:
      • This marks the client as not showing up
      • This action cannot be undone
      • May affect client's future booking privileges`,
    },
    buttons: {
      cancel: "Cancel",
      confirm: "Mark as No Show",
      confirmColor: "from-amber-600 to-orange-600",
    },
  }),
};

export const ActionModal = ({
  isOpen,
  action,
  selectedAppointment,
  editTime,
  setEditTime,
  isLoading,
  timeSlots,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !selectedAppointment || !action) return null;

  const modal = ModalContent[action]({
    selectedAppointment,
    editTime,
    setEditTime,
    isLoading,
    timeSlots,
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl max-w-md w-full p-4 md:p-6 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4 md:mb-6">
          <div
            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${modal.color} mx-auto mb-3 md:mb-4`}
          >
            {modal.icon}
          </div>

          <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
            {modal.title}
          </h3>

          <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
            {modal.description}
          </p>

          {modal.content}

          {modal.alert && (
            <div
              className={`bg-gradient-to-r ${modal.alert.color} rounded-lg p-2 md:p-3 mb-3 md:mb-4`}
            >
              <div className="flex items-start">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-current mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm whitespace-pre-line">
                  {modal.alert.text}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 md:gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
            disabled={isLoading}
          >
            {modal.buttons.cancel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading || modal.validate}
            className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
              isLoading || modal.validate
                ? `bg-gradient-to-r ${modal.buttons.confirmColor}/50 cursor-not-allowed`
                : `bg-gradient-to-r ${modal.buttons.confirmColor} hover:opacity-90`
            }`}
          >
            {isLoading ? "Processing..." : modal.buttons.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};
