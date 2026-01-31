"use client";
import { useContext, useEffect, useState } from "react";
import {
  User,
  Mail,
  Sparkles,
  Search,
  Filter,
  X,
  Heart,
  Star,
  Zap,
  Target,
  Award,
  ChevronRight,
  Shield,
  Clock,
  Calendar,
  MessageSquare,
  Send,
  CheckCircle,
  Sparkle,
} from "lucide-react";
import { TherapistContext } from "../therapistContext";
import {
  getAllBookings,
  getAllPostSessionTips,
  getCompletedBookingsForTips,
} from "@/app/ApiServices/getFunctions";
import { giveTip } from "@/app/ApiServices/serverActions";
import { IoIosFlower } from "react-icons/io";
import { findMatchingIds, findNonMatchingIds } from "@/app/helpers/helper";

export default function ClientListPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tips, setTips] = useState({
    mainTip1: "",
    explanation1: "",
    mainTip2: "",
    explanation2: "",
    bonusTip: "",
  });
  const [sending, setSending] = useState(false);
  const [notification, setNotification] = useState(null);
  const { therapistName } = useContext(TherapistContext);
  console.log("what", selectedClient);

  const themeColors = {
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
    },
    secondary: {
      50: "#fdf2f8",
      100: "#fce7f3",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
    },
    accent: {
      50: "#fef3c7",
      100: "#fde68a",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
    },
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
    },
    gradient: {
      primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      accent: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      success: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  };

  // Fetch bookings when therapistName changes
  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const allBookings = await getAllBookings();
        const allPostSesssionTips = await getAllPostSessionTips();

        const canBeTipped = findNonMatchingIds(
          allBookings,
          allPostSesssionTips,
        );

        const rawBookings = await getCompletedBookingsForTips(therapistName);
        const possibleToBeTipped = allBookings.filter(
          (booking, i) => booking.id == canBeTipped[i],
        );
        const bookings = possibleToBeTipped.filter((booking, i) =>
          rawBookings.some((rawBooking) => rawBooking.id === booking.id),
        );

        // Transform bookings to client format with color coding
        const clientsData = bookings.map((booking, index) => {
          const colors = [
            { bg: "from-rose-400 to-pink-500", text: "text-rose-100" },
            { bg: "from-violet-400 to-purple-500", text: "text-violet-100" },
            { bg: "from-blue-400 to-cyan-500", text: "text-blue-100" },
            { bg: "from-emerald-400 to-teal-500", text: "text-emerald-100" },
            { bg: "from-amber-400 to-orange-500", text: "text-amber-100" },
          ][index % 5];

          return {
            id: booking.id || index + 1,
            name: booking.clientname || `Client ${index + 1}`,
            email: booking.clientemail || `client${index + 1}@email.com`,
            bookingDate: booking.date,
            service: booking.service,
            bookingData: booking,
            color: colors,
            serviceConsumed: booking.massage_name,
            massageId: booking.id,
          };
        });

        console.log(clientsData);
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    if (therapistName) {
      fetchBookings();
    }
  }, [therapistName]);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOpenModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
    setTips({
      mainTip1: "",
      explanation1: "",
      mainTip2: "",
      explanation2: "",
      bonusTip: "",
    });
    setNotification(null);
  };

  const handleSubmit = async () => {
    if (!selectedClient || !tips.mainTip1 || !tips.mainTip2) return;

    setSending(true);

    try {
      const tipData = {
        firstMainTip: tips.mainTip1,
        firstExplanation: tips.explanation1,
        secondMainTip: tips.mainTip2,
        secondExplanation: tips.explanation2,
        bonusTip: tips.bonusTip,
        clientName: selectedClient.name,
        clientEmail: selectedClient.email,
        therapistName: therapistName,
        serviceConsumed: selectedClient.serviceConsumed, // Pass the service consumed
        massageId: selectedClient.massageId,
      };

      const result = await giveTip(tipData);

      if (result.status === "success") {
        setNotification({
          type: "success",
          message: `✨ Tips delivered to ${selectedClient.name}!`,
        });

        setTimeout(() => {
          setIsModalOpen(false);
          setTips({
            mainTip1: "",
            explanation1: "",
            mainTip2: "",
            explanation2: "",
            bonusTip: "",
          });
          setSelectedClient(null);
        }, 2000);
      } else {
        setNotification({
          type: "error",
          message: "❌ Oops! Tips got lost in transit. Try again!",
        });
      }
    } catch (error) {
      console.error("Error submitting tips:", error);
      setNotification({
        type: "error",
        message: "⚡ Something went wrong. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return (
      <div
        className="min-h-screen p-4 md:p-8 flex items-center justify-center"
        style={{ background: themeColors.gradient.primary }}
      >
        <div className="text-center backdrop-blur-xl bg-white/10 p-12 rounded-3xl border border-white/20">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white"></div>
          </div>
          <p className="mt-6 text-white text-lg font-medium">
            Loading client constellations...
          </p>
          <div className="flex gap-2 justify-center mt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-white animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div
        className="min-h-screen p-4 md:p-8"
        style={{ background: themeColors.gradient.primary }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            🦋Finalized clients
          </h1>
          <p className="text-white/80 mt-2">
            Share your wellness tips with your clients
          </p>
        </div>
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-16 text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-6 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full blur-2xl opacity-20"></div>
            <User className="relative w-24 h-24 text-white/50" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            No completed sessions yet
          </h3>
          <p className="text-white/60">
            Once clients complete sessions, they'll appear here like stars in
            your galaxy!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ background: themeColors.gradient.primary }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                [
                  "#ff6b6b20",
                  "#4ecdc420",
                  "#45b7d120",
                  "#96ceb420",
                  "#ffeaa720",
                ][i % 5]
              }, transparent)`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 p-5 rounded-2xl shadow-2xl backdrop-blur-xl border ${
            notification.type === "success"
              ? "bg-gradient-to-r from-emerald-500/90 to-teal-600/90 border-emerald-400 text-white"
              : "bg-gradient-to-r from-rose-500/90 to-pink-600/90 border-rose-400 text-white"
          } transform transition-all duration-300`}
          style={{ animation: "slideIn 0.5s ease-out" }}
        >
          <div className="flex items-center gap-3">
            {notification.type === "success" ? (
              <CheckCircle className="w-6 h-6 animate-bounce" />
            ) : (
              <X className="w-6 h-6" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                  🦋 Finalized clients
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse"></div>
                  <p className="text-white/80">
                    Share your wellness tips with clients
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-lg">
                  {clients.length} {clients.length > 1 ? "people " : "person "}
                  for now
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
            <input
              type="text"
              placeholder="🔍 Search for your clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder:text-white/40 text-lg transition-all"
            />
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="group relative">
              {/* Card background effects */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-300 hover:scale-[1.02]">
                {/* Client avatar */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div
                      className={`absolute -inset-4 bg-gradient-to-r ${client.color.bg} rounded-2xl blur-xl opacity-20`}
                    ></div>
                    <div
                      className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${client.color.bg} flex items-center justify-center shadow-2xl`}
                    >
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenModal(client)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group/btn"
                  >
                    <Zap className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                    Give Tips
                  </button>
                </div>

                {/* Client info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {client.name}
                    </h3>
                    <p className="text-white/60 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {client.email}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {client.serviceConsumed && (
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <span className="text-white/70">
                          {client.serviceConsumed}
                        </span>
                      </div>
                    )}
                    {client.bookingDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span className="text-white/70">
                          Session:{" "}
                          {new Date(client.bookingDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-white/50">
                      <Sparkles className="w-4 h-4" />
                      Ready for wellness tips
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-8 bg-gradient-to-r from-rose-500/20 to-pink-600/20 rounded-full blur-3xl"></div>
              <Search className="relative w-20 h-20 text-white/30" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No matches found
            </h3>
            <p className="text-white/60 max-w-md mx-auto">
              No clients found for "{searchTerm}". Try a different search term!
            </p>
          </div>
        )}
      </div>

      {/* Tips Modal */}
      {/* Tips Modal - RESPONSIVE VERSION */}
      {isModalOpen && selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6 z-50 touch-manipulation">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !sending && setIsModalOpen(false)}
          />

          <div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-[90dvh] sm:h-[85dvh] md:h-[80dvh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl overflow-hidden mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content Container - Flex column layout */}
            <div className="flex flex-col h-full">
              {/* HEADER - Sticky top */}
              <div className="p-3 sm:p-4 md:p-6 border-b border-white/10 flex-shrink-0">
                <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg sm:rounded-xl blur opacity-30"></div>
                      <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <IoIosFlower className="w-3 h-3 sm:w-4 sm:h-4 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white truncate">
                        Share Wellness Tips
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base text-white/60 truncate">
                        For {selectedClient.name}
                      </p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => !sending && setIsModalOpen(false)}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 active:scale-95 touch-manipulation"
                    disabled={sending}
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/60 hover:text-white" />
                  </button>
                </div>

                {/* Client Info */}
                <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-white/5 to-white/2">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r ${selectedClient.color.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <User className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base font-medium text-white truncate">
                      {selectedClient.name}
                    </div>
                    <div className="text-xs sm:text-sm text-white/60 truncate">
                      {selectedClient.email}
                    </div>
                  </div>
                  {selectedClient.serviceConsumed && (
                    <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                      {selectedClient.serviceConsumed}
                    </div>
                  )}
                </div>
              </div>

              {/* SCROLLABLE CONTENT AREA */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                  {/* TIP 1 */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex-shrink-0 mt-0.5">
                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block">
                          <span className="text-sm sm:text-base md:text-lg font-semibold text-white block mb-1">
                            First Main Tip{" "}
                            <span className="text-rose-400">*</span>
                          </span>
                          <input
                            type="text"
                            value={tips.mainTip1}
                            onChange={(e) =>
                              setTips({ ...tips, mainTip1: e.target.value })
                            }
                            placeholder="Morning meditation routine"
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-white placeholder:text-white/30 backdrop-blur-sm disabled:opacity-50"
                            disabled={sending}
                          />
                        </label>
                      </div>
                    </div>
                    <label className="block">
                      <span className="text-xs sm:text-sm font-medium text-white/80 block mb-1">
                        Why this matters
                      </span>
                      <textarea
                        value={tips.explanation1}
                        onChange={(e) =>
                          setTips({ ...tips, explanation1: e.target.value })
                        }
                        rows={2}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-white placeholder:text-white/30 resize-none backdrop-blur-sm disabled:opacity-50"
                        placeholder="Explain the benefits and importance..."
                        disabled={sending}
                      />
                    </label>
                  </div>

                  {/* TIP 2 */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-md bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex-shrink-0 mt-0.5">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block">
                          <span className="text-sm sm:text-base md:text-lg font-semibold text-white block mb-1">
                            Second Main Tip{" "}
                            <span className="text-rose-400">*</span>
                          </span>
                          <input
                            type="text"
                            value={tips.mainTip2}
                            onChange={(e) =>
                              setTips({ ...tips, mainTip2: e.target.value })
                            }
                            placeholder="Posture awareness throughout day"
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none text-white placeholder:text-white/30 backdrop-blur-sm disabled:opacity-50"
                            disabled={sending}
                          />
                        </label>
                      </div>
                    </div>
                    <label className="block">
                      <span className="text-xs sm:text-sm font-medium text-white/80 block mb-1">
                        Implementation guide
                      </span>
                      <textarea
                        value={tips.explanation2}
                        onChange={(e) =>
                          setTips({ ...tips, explanation2: e.target.value })
                        }
                        rows={2}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none text-white placeholder:text-white/30 resize-none backdrop-blur-sm disabled:opacity-50"
                        placeholder="How to implement in daily life..."
                        disabled={sending}
                      />
                    </label>
                  </div>

                  {/* BONUS TIP */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-md bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex-shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block">
                          <span className="text-sm sm:text-base md:text-lg font-semibold text-white block mb-1">
                            ✨ Bonus Tip{" "}
                            <span className="text-white/40 text-xs">
                              (Optional)
                            </span>
                          </span>
                          <textarea
                            value={tips.bonusTip}
                            onChange={(e) =>
                              setTips({ ...tips, bonusTip: e.target.value })
                            }
                            rows={2}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none text-white placeholder:text-white/30 resize-none backdrop-blur-sm disabled:opacity-50"
                            placeholder="Extra magic for their wellness journey..."
                            disabled={sending}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER - Sticky bottom */}
              <div className="p-3 sm:p-4 md:p-6 border-t border-white/10 flex-shrink-0">
                {notification && (
                  <div
                    className={`mb-3 sm:mb-4 p-3 rounded-lg backdrop-blur-sm ${
                      notification.type === "success"
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
                        : "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-white">
                      {notification.type === "success" ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 flex-shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm">
                        {notification.message}
                      </span>
                    </div>
                  </div>
                )}

                {/* BUTTONS - Responsive layout */}
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => !sending && setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base border border-white/20 text-white rounded-lg hover:bg-white/5 disabled:opacity-50 transition-all active:scale-95 touch-manipulation"
                    disabled={sending}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!tips.mainTip1 || !tips.mainTip2 || sending}
                    className={`flex-1 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base rounded-lg font-medium flex items-center justify-center gap-2 transition-all active:scale-95 touch-manipulation ${
                      !tips.mainTip1 || !tips.mainTip2 || sending
                        ? "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed text-gray-300"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25 text-white"
                    }`}
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-white/30 border-t-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Send Tips</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes modalAppear {
          from {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
        }
      `}</style>
    </div>
  );
}
