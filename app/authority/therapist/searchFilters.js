import React from "react";
import { Search, Menu } from "lucide-react";

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  uniqueDates,
  showPastAppointments,
  setShowPastAppointments,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
  therapistName,
}) {
  if (isMobile) {
    return (
      <>
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-900/40 to-indigo-900/40 backdrop-blur-sm rounded-2xl p-4 border border-emerald-800/30">
            <div>
              <h1 className="text-xl font-semibold text-white">Appointments</h1>
              <p className="text-xs text-emerald-100/80 mt-1">
                Manage your schedule
              </p>
              <p className="text-xs text-emerald-200/60 mt-1">
                Therapist: {therapistName}
              </p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-3 bg-gradient-to-r from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No Show</option>
                  </select>

                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    <option value="all">All Dates</option>
                    {uniqueDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Past Appointments Toggle - Mobile */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">
                    Show Past Appointments
                  </span>
                  <button
                    onClick={() =>
                      setShowPastAppointments(!showPastAppointments)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      showPastAppointments ? "bg-emerald-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        showPastAppointments ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="hidden md:block bg-gradient-to-r from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search appointments by client or massage type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-white placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-white transition-colors"
          >
            <option value="all" className="bg-slate-900">
              All Status
            </option>
            <option value="scheduled" className="bg-slate-900">
              Scheduled
            </option>
            <option value="completed" className="bg-slate-900">
              Completed
            </option>
            <option value="cancelled" className="bg-slate-900">
              Cancelled
            </option>
            <option value="no_show" className="bg-slate-900">
              No Show
            </option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-white transition-colors"
          >
            <option value="all" className="bg-slate-900">
              All Dates
            </option>
            {uniqueDates.map((date) => (
              <option key={date} value={date} className="bg-slate-900">
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>

          {/* Past Appointments Toggle - Desktop */}
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3">
            <span className="text-sm text-slate-300 whitespace-nowrap">
              Show Past
            </span>
            <button
              onClick={() => setShowPastAppointments(!showPastAppointments)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                showPastAppointments ? "bg-emerald-600" : "bg-slate-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  showPastAppointments ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
