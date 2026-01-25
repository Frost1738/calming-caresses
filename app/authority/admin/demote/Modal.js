"use client";

import { AlertCircle, UserX } from "lucide-react";
import toast from "react-hot-toast";

export default function DeregisterModal({
  therapistToRemove,
  therapists,
  isRemoving,
  setTherapistToRemove,
  confirmDeregister,
}) {
  if (!therapistToRemove) return null;

  const therapist = therapists.find((t) => t.id === therapistToRemove);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center p-3 xs:p-4 sm:p-6 z-50">
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl sm:rounded-2xl max-w-md w-full p-4 sm:p-6 mx-auto border border-[#9D4EDD]/30 shadow-2xl shadow-purple-500/30">
        {/* Modal Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#FF6B6B]/20 to-[#EE5A52]/20 rounded-full flex items-center justify-center border border-[#FF6B6B]/30">
            <AlertCircle className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#FF6B6B]" />
          </div>
          <h3 className="text-lg xs:text-xl font-semibold text-white mb-1.5 xs:mb-2">
            De-register Therapist
          </h3>
          <p className="text-[#B8B8FF] text-sm xs:text-base">
            Are you sure you want to de-register this therapist? This action
            cannot be undone.
          </p>
        </div>

        {/* Therapist Info */}
        <div className="bg-gradient-to-br from-[#0F0F23]/50 to-[#1A1A2E]/50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-[#9D4EDD]/30">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#9D4EDD]/20 to-[#7B2CBF]/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#9D4EDD]/30">
              <span className="font-bold text-[#B8B8FF] text-sm xs:text-base">
                {therapist?.name?.charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-white text-sm xs:text-base truncate">
                {therapist?.name}
              </div>
              <div className="text-xs text-[#B8B8FF] truncate">
                {therapist?.email ||
                  `${therapist?.name?.toLowerCase()?.replace(/\s+/g, ".")}@massageclinic.com`}
              </div>
              <div className="text-xs text-[#B8B8FF]/60 mt-0.5 truncate">
                Using name-based deletion: "{therapist?.name}"
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <button
            onClick={() => {
              setTherapistToRemove(null);
              toast("Cancelled de-registration", {
                icon: "⚠️",
                duration: 2000,
              });
            }}
            disabled={isRemoving}
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-[#9D4EDD]/30 text-[#B8B8FF] hover:bg-[#9D4EDD]/10 transition-colors text-sm sm:text-base backdrop-blur-sm"
          >
            Cancel
          </button>
          <button
            onClick={confirmDeregister}
            disabled={isRemoving}
            className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
              isRemoving
                ? "bg-gradient-to-r from-[#FF6B6B] to-[#EE5A52]"
                : "bg-gradient-to-r from-[#FF6B6B] to-[#EE5A52] hover:from-[#FF5252] hover:to-[#DD4747] hover:shadow-lg hover:shadow-[#FF6B6B]/30"
            }`}
          >
            {isRemoving ? (
              <>
                <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="truncate">Removing...</span>
              </>
            ) : (
              <>
                <UserX className="w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0" />
                <span className="truncate">De-register</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
