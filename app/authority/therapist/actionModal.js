import React from "react";
import { Edit2, XCircle, CheckCircle, UserX, AlertCircle } from "lucide-react";

const timeSlots = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
];

export default function ActionModal({
  isOpen,
  onClose,
  modalAction,
  selectedAppointment,
  editTime,
  setEditTime,
  confirmAction,
  isLoading,
}) {
  if (!isOpen || !selectedAppointment) return null;

  const renderEditModal = () => (
    <>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 mx-auto mb-3 md:mb-4">
          <Edit2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>

        <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
          Edit Appointment Time
        </h3>

        <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
          Change time for {selectedAppointment.clientname}&apos;s appointment
        </p>

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

        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700/30 rounded-lg p-2 md:p-3">
          <div className="flex items-start">
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-cyan-300">
              Client will be notified of the time change.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={confirmAction}
          disabled={isLoading || !editTime}
          className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
            isLoading || !editTime
              ? "bg-gradient-to-r from-cyan-700/50 to-blue-700/50 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          }`}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </>
  );

  const renderCancelModal = () => (
    <>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-rose-600 to-pink-600 mx-auto mb-3 md:mb-4">
          <XCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>

        <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
          Cancel Appointment
        </h3>

        <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
          Cancel {selectedAppointment.clientname}&apos;s appointment on{" "}
          {new Date(selectedAppointment.date).toLocaleDateString()}?
        </p>

        <div className="bg-gradient-to-r from-rose-900/30 to-pink-900/30 border border-rose-700/30 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
          <div className="flex items-start">
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-rose-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs md:text-sm text-rose-300 mb-1">
                Important Information:
              </p>
              <p className="text-xs md:text-sm text-rose-400">
                • Client will be notified via email
                <br />• This action cannot be undone
                <br />• Email sent to: {selectedAppointment.clientemail}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
          disabled={isLoading}
        >
          Keep
        </button>
        <button
          onClick={confirmAction}
          disabled={isLoading}
          className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
            isLoading
              ? "bg-gradient-to-r from-rose-700/50 to-pink-700/50 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
          }`}
        >
          {isLoading ? "Cancelling..." : "Confirm"}
        </button>
      </div>
    </>
  );

  const renderCompleteModal = () => (
    <>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 mx-auto mb-3 md:mb-4">
          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>

        <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
          Mark as Complete
        </h3>

        <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
          Mark {selectedAppointment.clientname}&apos;s session as completed?
        </p>

        <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-700/30 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
          <div className="flex items-start">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
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
      </div>

      <div className="flex gap-2 md:gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
          disabled={isLoading}
        >
          Not Yet
        </button>
        <button
          onClick={confirmAction}
          disabled={isLoading}
          className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
            isLoading
              ? "bg-gradient-to-r from-emerald-700/50 to-green-700/50 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
          }`}
        >
          {isLoading ? "Processing..." : "Complete"}
        </button>
      </div>
    </>
  );

  const renderNoShowModal = () => (
    <>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 mx-auto mb-3 md:mb-4">
          <UserX className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>

        <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
          Mark as No Show
        </h3>

        <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
          Mark {selectedAppointment.clientname}&apos;s appointment as no show?
        </p>

        <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-700/30 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
          <div className="flex items-start">
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs md:text-sm text-amber-300 mb-1">
                Important Information:
              </p>
              <p className="text-xs md:text-sm text-amber-400">
                • This marks the client as not showing up
                <br />• This action cannot be undone
                <br />• May affect client&apos;s future booking privileges
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={confirmAction}
          disabled={isLoading}
          className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
            isLoading
              ? "bg-gradient-to-r from-amber-700/50 to-orange-700/50 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          }`}
        >
          {isLoading ? "Processing..." : "Mark as No Show"}
        </button>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl max-w-md w-full p-4 md:p-6 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        {modalAction === "edit" && renderEditModal()}
        {modalAction === "cancel" && renderCancelModal()}
        {modalAction === "complete" && renderCompleteModal()}
        {modalAction === "no_show" && renderNoShowModal()}
      </div>
    </div>
  );
}
