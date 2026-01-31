"use client";
import { useContext, useEffect, useState } from "react";
import { updateAppointmentStatus } from "@/app/ApiServices/serverActions";
import { getTherapistsBooking } from "@/app/ApiServices/getFunctions";
import toast, { Toaster } from "react-hot-toast";

// Import new components
import StatsCards from "./statCards";
import SearchFilters from "./searchFilters";
import AppointmentRow from "./appointmentRow";
import MobileAppointmentCard from "./mobileAppointmentCard";
import ActionModal from "./actionModal";
import TodaysAppointments from "./todaysAppointments";

// Import utilities
import {
  getDisplayStatus,
  getStatusColor,
  getStatusIcon,
  getStatusText,
  renderActionButtons,
} from "./statusUtils";
import { isTodayAppointment, isPastDate } from "./dateUtils";
import { initEmailJS, sendCancellationEmail } from "./emailService";

// Import context
import { TherapistContext } from "./therapistContext";
import { useSearchParams } from "next/navigation";

// Import icons
import {
  Calendar,
  Menu,
  ChevronDown,
  ChevronUp,
  CalendarDays,
} from "lucide-react";

export default function TherapistAppointments({ personalizedBookings }) {
  // State management
  const [bookings, setBookings] = useState(personalizedBookings || []);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [editTime, setEditTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [originalAppointmentState, setOriginalAppointmentState] =
    useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [showPastAppointments, setShowPastAppointments] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  // Context and URL params
  const searchParams = useSearchParams();
  const { therapistName, setTherapistName } = useContext(TherapistContext);
  const nameFromUrl = searchParams.get("name");

  // EmailJS initialization
  useEffect(() => {
    initEmailJS();
  }, []);

  // Data fetching useEffect
  useEffect(() => {
    let isMounted = true;
    let fetchedTherapistName = null;

    const initializeAndFetch = async () => {
      try {
        // Step 1: Determine therapist name
        if (nameFromUrl) {
          fetchedTherapistName = nameFromUrl;
          if (isMounted) {
            setTherapistName(nameFromUrl);
            localStorage.setItem("therapistName", nameFromUrl);
          }
        } else {
          const storedName = localStorage.getItem("therapistName");
          if (storedName && !therapistName) {
            fetchedTherapistName = storedName;
            if (isMounted) {
              setTherapistName(storedName);
            }
          } else if (therapistName) {
            fetchedTherapistName = therapistName;
          }
        }

        // Step 2: Fetch data using server action
        if (fetchedTherapistName && !hasFetched) {
          console.log(
            "📋 Fetching bookings for therapist:",
            fetchedTherapistName,
          );

          // USING SERVER ACTION HERE
          const result = await getTherapistsBooking(fetchedTherapistName);
          console.log("Server response:", result);

          if (isMounted) {
            // FIXED: Handle both array response and object with success/data
            let bookingsData = [];

            if (Array.isArray(result)) {
              // Result is directly the array of appointments
              bookingsData = result;
            } else if (result && result.success && result.data) {
              // Result has success/data structure
              bookingsData = result.data;
            } else {
              // Result might be an object with the data property
              bookingsData = result?.data || result || [];
            }

            setBookings(bookingsData);
            setHasFetched(true);

            const updatedAppointments = bookingsData.map((apt) => ({
              ...apt,
              completed: apt.completed === true,
              status: apt.status || "scheduled",
              price: apt.price || "$100",
              duration: apt.duration || "60",
            }));
            setAppointments(updatedAppointments);

            // Only show error if we have no data and no personalizedBookings
            if (
              bookingsData.length === 0 &&
              (!personalizedBookings || personalizedBookings.length === 0)
            ) {
              toast.error("No appointments found. Please try again.");
            }
          }
        } else if (!fetchedTherapistName && isMounted) {
          // No therapist name yet, check if we have personalizedBookings
          if (personalizedBookings && personalizedBookings.length > 0) {
            const updatedAppointments = personalizedBookings.map((apt) => ({
              ...apt,
              completed: apt.completed === true,
              status: apt.status || "scheduled",
              price: apt.price || "$100",
              duration: apt.duration || "60 min",
            }));
            setAppointments(updatedAppointments);
          }
        }
      } catch (error) {
        console.error("❌ Error initializing or fetching:", error);
        if (isMounted) {
          if (personalizedBookings && personalizedBookings.length > 0) {
            const updatedAppointments = personalizedBookings.map((apt) => ({
              ...apt,
              completed: apt.completed === true,
              status: apt.status || "scheduled",
              price: apt.price || "$100",
              duration: apt.duration || "60 min",
            }));
            setAppointments(updatedAppointments);
          }
          toast.error("Could not load appointments. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAndFetch();

    return () => {
      isMounted = false;
    };
  }, [
    nameFromUrl,
    setTherapistName,
    therapistName,
    hasFetched,
    personalizedBookings,
  ]);

  // Get all appointments
  const allAppointments = appointments;

  // Get today's appointments
  const todaysAppointments = allAppointments.filter((apt) =>
    isTodayAppointment(apt.date),
  );

  // Stats calculations
  const stats = {
    scheduledCount: allAppointments.filter(
      (a) => getDisplayStatus(a.status, a.completed) === "scheduled",
    ).length,
    completedCount: allAppointments.filter(
      (a) => getDisplayStatus(a.status, a.completed) === "completed",
    ).length,
    cancelledCount: allAppointments.filter(
      (a) => getDisplayStatus(a.status, a.completed) === "cancelled",
    ).length,
    noShowCount: allAppointments.filter(
      (a) => getDisplayStatus(a.status, a.completed) === "no_show",
    ).length,
    todaysCount: todaysAppointments.length,
  };

  // Filter appointments for main table
  const filteredAppointments = allAppointments.filter((appointment) => {
    const displayStatus = getDisplayStatus(
      appointment.status,
      appointment.completed,
    );
    const matchesSearch =
      appointment.clientname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.massage_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || displayStatus === statusFilter;
    const matchesDate = dateFilter === "all" || appointment.date === dateFilter;
    const isPast = isPastDate(appointment.date);
    const showThisAppointment = showPastAppointments || !isPast;

    return matchesSearch && matchesStatus && matchesDate && showThisAppointment;
  });

  const uniqueDates = [...new Set(allAppointments.map((apt) => apt.date))];

  // Appointment action handlers
  const handleEditTime = (appointment) => {
    setSelectedAppointment(appointment);
    setEditTime(appointment.time);
    setModalAction("edit");
    setIsModalOpen(true);
  };

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction("cancel");
    setIsModalOpen(true);
  };

  const handleMarkComplete = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction("complete");
    setIsModalOpen(true);
  };

  const handleMarkNoShow = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction("no_show");
    setIsModalOpen(true);
  };

  const toggleAppointmentDetails = (appointmentId) => {
    setExpandedAppointment(
      expandedAppointment === appointmentId ? null : appointmentId,
    );
  };

  const optimisticUpdate = (appointmentId, updates) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, ...updates } : apt,
      ),
    );
  };

  // Handler object for renderActionButtons
  const actionHandlers = {
    handleMarkComplete,
    handleMarkNoShow,
    handleEditTime,
    handleCancel,
  };

  // Custom renderActionButtons that uses our handlers
  const customRenderActionButtons = (appointment) => {
    return renderActionButtons(
      appointment,
      actionHandlers,
      isLoading,
      isPastDate,
    );
  };

  // Confirm action
  const confirmAction = async () => {
    if (!selectedAppointment) return;

    setIsLoading(true);
    setOriginalAppointmentState(selectedAppointment);

    let toastId;
    let updates = {};
    let successMessage = "";
    let errorMessage = "";

    try {
      switch (modalAction) {
        case "cancel":
          updates = { status: "cancelled", completed: false };
          toastId = toast.loading("Cancelling appointment...");
          successMessage = "Appointment cancelled successfully!";
          errorMessage = "Failed to cancel appointment";

          const emailResult = await sendCancellationEmail(
            selectedAppointment,
            therapistName,
          );
          if (!emailResult.success) {
            console.warn("Email notification failed");
          }
          break;

        case "complete":
          updates = { status: "completed", completed: true };
          toastId = toast.loading("Marking as complete...");
          successMessage = "Appointment marked as complete!";
          errorMessage = "Failed to mark as complete";
          break;

        case "no_show":
          updates = { status: "no_show", completed: false };
          toastId = toast.loading("Marking as no show...");
          successMessage = "Appointment marked as no show!";
          errorMessage = "Failed to mark as no show";
          break;

        case "edit":
          if (!editTime) {
            toast.error("Please select a new time");
            setIsLoading(false);
            return;
          }
          updates = { time: editTime };
          toastId = toast.loading("Updating appointment time...");
          successMessage = "Appointment time updated successfully!";
          errorMessage = "Failed to update appointment time";
          break;
      }

      optimisticUpdate(selectedAppointment.id, updates);
      const result = await updateAppointmentStatus(
        selectedAppointment.id,
        updates,
      );

      if (result.success) {
        if (result.data) {
          optimisticUpdate(selectedAppointment.id, result.data);
        }

        toast.success(successMessage, {
          id: toastId,
          duration: 3000,
          style: {
            background: modalAction === "no_show" ? "#7c2d12" : "#064e3b",
            color: "#f0fdfa",
          },
        });

        setIsModalOpen(false);
        setSelectedAppointment(null);
        setEditTime("");
        setExpandedAppointment(null);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Action failed:", error);

      if (originalAppointmentState) {
        optimisticUpdate(selectedAppointment.id, originalAppointmentState);
      }

      toast.error(error.message || errorMessage, {
        id: toastId,
        duration: 4000,
        style: {
          background: "#7f1d1d",
          color: "#fef2f2",
        },
      });
    } finally {
      setIsLoading(false);
      setOriginalAppointmentState(null);
    }
  };

  // Loading state
  if (isLoading && appointments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-indigo-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-emerald-100/80">Loading appointments...</p>
          {therapistName && (
            <p className="text-emerald-100/60 text-sm mt-2">
              Fetching appointments for {therapistName}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1e293b",
            color: "#f8fafc",
            border: "1px solid #475569",
            borderRadius: "0.75rem",
            padding: "16px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#1e293b",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1e293b",
            },
          },
          loading: {
            iconTheme: {
              primary: "#0ea5e9",
              secondary: "#1e293b",
            },
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-indigo-950 p-3 md:p-6">
        {/* Mobile Header and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          uniqueDates={uniqueDates}
          showPastAppointments={showPastAppointments}
          setShowPastAppointments={setShowPastAppointments}
          isMobile={true}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          therapistName={therapistName}
        />

        {/* Desktop Header */}
        <div className="hidden md:block mb-8">
          <div className="bg-gradient-to-r from-emerald-900/40 to-indigo-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-emerald-800/30 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
                  Appointment Dashboard
                </h1>
                <p className="text-emerald-100/80">
                  Therapist: {therapistName}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="text-white font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-emerald-200/80 text-sm mt-1">
                    Total: {allAppointments.length} appointments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Desktop Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          uniqueDates={uniqueDates}
          showPastAppointments={showPastAppointments}
          setShowPastAppointments={setShowPastAppointments}
          isMobile={false}
          therapistName={therapistName}
        />

        {/* Loading State */}
        {isLoading && bookings.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-slate-300">Loading appointments...</p>
            <p className="text-slate-500 text-sm mt-2">
              Fetching appointments for {therapistName}
            </p>
          </div>
        )}

        {/* Mobile Appointments List */}
        <div className="md:hidden space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              All Appointments
            </h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gradient-to-r from-emerald-600/80 to-cyan-600/80 text-white text-sm rounded-lg">
                {filteredAppointments.length}
              </span>
              <button
                onClick={() => setShowPastAppointments(!showPastAppointments)}
                className={`px-3 py-1 text-sm rounded-lg border ${
                  showPastAppointments
                    ? "bg-emerald-600/20 text-emerald-300 border-emerald-600/30"
                    : "bg-slate-800/60 text-slate-300 border-slate-700/30"
                }`}
              >
                {showPastAppointments ? "Hide Past" : "Show Past"}
              </button>
            </div>
          </div>

          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <MobileAppointmentCard
                key={appointment.id}
                appointment={appointment}
                expandedAppointment={expandedAppointment}
                toggleAppointmentDetails={toggleAppointmentDetails}
                renderActionButtons={customRenderActionButtons}
                isPastDate={isPastDate}
              />
            ))
          ) : !isLoading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                No appointments found
              </h3>
              <p className="text-slate-500">Try adjusting your search</p>
            </div>
          ) : null}
        </div>

        {/* Desktop Appointments Table */}
        <div className="hidden md:block bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 shadow-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/80 to-slate-800/60">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                All Appointments ({filteredAppointments.length})
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-300">
                  Showing: {showPastAppointments ? "All" : "Upcoming Only"}
                </span>
                <button
                  onClick={() => setShowPastAppointments(!showPastAppointments)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    showPastAppointments
                      ? "bg-emerald-600/20 text-emerald-300 border-emerald-600/30 hover:bg-emerald-600/30"
                      : "bg-slate-800/60 text-slate-300 border-slate-700/30 hover:bg-slate-800"
                  }`}
                >
                  {showPastAppointments ? "Hide Past" : "Show Past"}
                </button>
              </div>
            </div>
          </div>

          {filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-900/40 to-slate-800/40 border-b border-slate-700/30">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                      Client
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                      Date & Time
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                      Service
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredAppointments.map((appointment) => {
                    const isToday = isTodayAppointment(appointment.date);
                    const isPast = isPastDate(appointment.date);

                    return (
                      <AppointmentRow
                        key={appointment.id}
                        appointment={appointment}
                        renderActionButtons={customRenderActionButtons}
                        isToday={isToday}
                        isPast={isPast}
                        getStatusIcon={getStatusIcon}
                        getStatusText={getStatusText}
                        getStatusColor={getStatusColor}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : !isLoading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-700/30">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                No appointments found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filters
              </p>
            </div>
          ) : null}
        </div>

        {/* TODAY'S APPOINTMENTS SECTION */}
        <TodaysAppointments
          appointments={todaysAppointments}
          renderActionButtons={customRenderActionButtons}
          todaysCount={stats.todaysCount}
        />
      </div>

      {/* Action Modal */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppointment(null);
          setEditTime("");
        }}
        modalAction={modalAction}
        selectedAppointment={selectedAppointment}
        editTime={editTime}
        setEditTime={setEditTime}
        confirmAction={confirmAction}
        isLoading={isLoading}
      />
    </>
  );
}
