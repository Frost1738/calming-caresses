// Header Component
import { MdPersonRemoveAlt1 } from "react-icons/md";
export function Header({ stats }) {
  return (
    <div className="max-w-7xl mx-auto mb-8 md:mb-10">
      <div className="flex flex-col xs:flex-row xs:items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col xs:flex-row xs:items-center gap-3 sm:gap-4 mb-3">
            <div className="p-2 xs:p-3 bg-gradient-to-br from-[#9D4EDD] via-[#7B2CBF] to-[#5A189A] rounded-xl sm:rounded-2xl w-fit shadow-lg shadow-purple-500/20">
              <MdPersonRemoveAlt1 className="w-7 h-7 xs:w-8 xs:h-8 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#E0E0FF] via-[#B8B8FF] to-[#9D4EDD] bg-clip-text text-transparent leading-tight break-words">
                Therapist Management
              </h1>
              <p className="text-[#B8B8FF] mt-1 xs:mt-2 text-sm xs:text-base leading-snug">
                Manage your team of professional massage therapists
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1A1A2E]/80 to-[#16213E]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-[#9D4EDD]/30 shadow-lg shadow-purple-500/10 w-full xs:w-auto min-w-[140px]">
          <div className="text-center">
            <div className="text-xl xs:text-2xl font-bold text-white">
              {stats.total}
            </div>
            <div className="text-xs xs:text-sm text-[#B8B8FF]">
              Active Therapists
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
