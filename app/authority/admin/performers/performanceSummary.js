"use client";
import { useState, useMemo } from "react";
import MobileHeader from "./mobileHeader";
import DesktopHeader from "./desktopHeader";
import MainContent from "./mainContent";
import Legend from "./legend";

import {
  Trophy,
  Award,
  Star,
  TrendingUp,
  Users,
  Zap,
  Sparkles,
  Crown,
  Flame,
  Target,
  Medal,
  Gem,
  BarChart3,
  User,
  Clock,
  Heart,
  Activity,
  Calendar,
  MapPin,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function TopPerformersPage({ bookings }) {
  const [timeRange, setTimeRange] = useState("all");
  const [activeTab, setActiveTab] = useState("therapists");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Normalize booking data to use consistent property names
  const normalizedBookings = useMemo(() => {
    if (!bookings || !Array.isArray(bookings)) return [];

    return bookings.map((booking) => ({
      ...booking,
      // Map your actual database fields to expected field names
      therapistName: booking.therapistname || booking.therapistName || null,
      massageName: booking.massage_name || booking.massageName || null,
      clientName: booking.clientname || booking.clientName || null,
      clientEmail: booking.clientemail || booking.clientEmail || null,
      // Ensure date is properly formatted
      date: booking.date || booking.created_at || null,
      // Map status if needed
      status: booking.status || "completed", // Assuming all are completed
      completed: booking.completed || true, // Assuming all are completed
    }));
  }, [bookings]);

  // Safe name formatter with null check
  const formatName = (name) => {
    if (!name || name === "null" || name === "undefined") {
      return "Guest Client";
    }
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Filter bookings by time range
  const filteredBookings = useMemo(() => {
    if (!normalizedBookings || !Array.isArray(normalizedBookings)) return [];
    if (timeRange === "all") return normalizedBookings;

    const now = new Date();
    let daysBack = 30;
    if (timeRange === "week") daysBack = 7;
    if (timeRange === "month") daysBack = 30;
    if (timeRange === "quarter") daysBack = 90;

    const cutoffDate = new Date(now.setDate(now.getDate() - daysBack));

    return normalizedBookings.filter((booking) => {
      if (!booking.date) return false;
      try {
        const bookingDate = new Date(booking.date);
        return !isNaN(bookingDate.getTime()) && bookingDate >= cutoffDate;
      } catch {
        return false;
      }
    });
  }, [normalizedBookings, timeRange]);

  // Calculate therapist rankings (0-100 points)
  const therapistRankings = useMemo(() => {
    const therapistMap = new Map();

    filteredBookings.forEach((booking) => {
      const therapistName = booking.therapistName;
      if (!therapistName || therapistName === "null") return;

      if (!therapistMap.has(therapistName)) {
        therapistMap.set(therapistName, {
          name: therapistName,
          bookings: 0,
          uniqueClients: new Set(),
          massageTypes: new Set(),
          totalCompleted: 0,
        });
      }

      const therapist = therapistMap.get(therapistName);
      therapist.bookings++;

      if (booking.clientName && booking.clientName !== "null") {
        therapist.uniqueClients.add(booking.clientName);
      }

      if (booking.massageName) {
        therapist.massageTypes.add(booking.massageName);
      }

      if (booking.completed === true || booking.status === "completed") {
        therapist.totalCompleted++;
      }
    });

    const therapistArray = Array.from(therapistMap.values());

    if (therapistArray.length === 0) return [];

    // Calculate max values for normalization
    const maxBookings = Math.max(...therapistArray.map((t) => t.bookings), 1);
    const maxUniqueClients = Math.max(
      ...therapistArray.map((t) => t.uniqueClients.size),
      1,
    );

    return therapistArray
      .map((therapist) => {
        const uniqueClientCount = therapist.uniqueClients.size;
        const massageTypeCount = therapist.massageTypes.size;
        const completionRate =
          therapist.bookings > 0
            ? (therapist.totalCompleted / therapist.bookings) * 100
            : 0;

        // Calculate performance score (0-100)
        const bookingsScore = (therapist.bookings / maxBookings) * 40; // 40% weight
        const clientsScore = (uniqueClientCount / maxUniqueClients) * 30; // 30% weight
        const varietyScore = Math.min((massageTypeCount / 5) * 20, 20); // 20% weight, capped at 5 types
        const completionScore = completionRate * 0.1; // 10% weight

        const performanceScore = Math.min(
          bookingsScore + clientsScore + varietyScore + completionScore,
          100,
        );

        return {
          ...therapist,
          uniqueClientCount,
          massageTypeCount,
          completionRate,
          performanceScore: Math.round(performanceScore),
        };
      })
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, 5);
  }, [filteredBookings]);

  // Calculate client rankings (0-100 points)
  const clientRankings = useMemo(() => {
    const clientMap = new Map();

    filteredBookings.forEach((booking) => {
      const clientName = booking.clientName;
      if (!clientName || clientName === "null") return;

      if (!clientMap.has(clientName)) {
        clientMap.set(clientName, {
          name: clientName,
          bookings: 0,
          favoriteTherapists: new Map(),
          massageTypes: new Set(),
          lastVisit: booking.date,
        });
      }

      const client = clientMap.get(clientName);
      client.bookings++;

      if (booking.therapistName && booking.therapistName !== "null") {
        const therapistCount =
          client.favoriteTherapists.get(booking.therapistName) || 0;
        client.favoriteTherapists.set(
          booking.therapistName,
          therapistCount + 1,
        );
      }

      if (booking.massageName) {
        client.massageTypes.add(booking.massageName);
      }

      if (booking.date) {
        client.lastVisit = booking.date;
      }
    });

    const clientArray = Array.from(clientMap.values());

    if (clientArray.length === 0) return [];

    // Calculate max values for normalization
    const maxBookings = Math.max(...clientArray.map((c) => c.bookings), 1);
    const maxMassageTypes = Math.max(
      ...clientArray.map((c) => c.massageTypes.size),
      1,
    );
    const maxTherapists = Math.max(
      ...clientArray.map((c) => c.favoriteTherapists.size),
      1,
    );

    return clientArray
      .map((client) => {
        let favoriteTherapist = "";
        let maxCount = 0;
        client.favoriteTherapists.forEach((count, therapist) => {
          if (count > maxCount) {
            maxCount = count;
            favoriteTherapist = therapist;
          }
        });

        const massageTypeCount = client.massageTypes.size;
        const therapistVariety = client.favoriteTherapists.size;

        // Calculate loyalty score (0-100)
        // Frequency: 50% (0-50 points)
        const frequencyScore = (client.bookings / maxBookings) * 50;

        // Variety: 30% (0-30 points)
        const massageVarietyScore = (massageTypeCount / maxMassageTypes) * 15;
        const therapistVarietyScore = (therapistVariety / maxTherapists) * 15;
        const varietyScore = massageVarietyScore + therapistVarietyScore;

        // Recency: 20% (0-20 points)
        let recencyScore = 0;
        if (client.lastVisit) {
          try {
            const daysSinceLastVisit = Math.floor(
              (new Date() - new Date(client.lastVisit)) / (1000 * 60 * 60 * 24),
            );
            // 20 points if visited within 7 days, decreasing to 0 after 60 days
            recencyScore = Math.max(0, 20 - (daysSinceLastVisit * 20) / 60);
          } catch {
            recencyScore = 0;
          }
        }

        const loyaltyScore = Math.min(
          frequencyScore + varietyScore + recencyScore,
          100,
        );

        return {
          ...client,
          favoriteTherapist,
          massageTypeCount,
          loyaltyScore: Math.round(loyaltyScore),
        };
      })
      .sort((a, b) => b.loyaltyScore - a.loyaltyScore)
      .slice(0, 5);
  }, [filteredBookings]);

  // Get rank badge
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return {
          icon: Crown,
          color: "from-yellow-500 to-amber-500",
          label: "Champion",
          bgColor: "bg-gradient-to-br from-yellow-500 to-amber-500",
        };
      case 2:
        return {
          icon: Trophy,
          color: "from-gray-400 to-gray-300",
          label: "Elite",
          bgColor: "bg-gradient-to-br from-gray-400 to-gray-300",
        };
      case 3:
        return {
          icon: Medal,
          color: "from-amber-600 to-orange-500",
          label: "Pro",
          bgColor: "bg-gradient-to-br from-amber-600 to-orange-500",
        };
      default:
        return {
          icon: Award,
          color: "from-blue-500 to-cyan-500",
          label: "Rising Star",
          bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
        };
    }
  };

  // Get performance level
  const getPerformanceLevel = (score) => {
    if (score >= 80)
      return {
        label: "Elite",
        color: "from-purple-600 to-pink-600",
        icon: Sparkles,
        textColor: "text-purple-400",
        bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      };
    if (score >= 60)
      return {
        label: "Expert",
        color: "from-blue-600 to-cyan-600",
        icon: Zap,
        textColor: "text-blue-400",
        bgColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
      };
    if (score >= 40)
      return {
        label: "Professional",
        color: "from-emerald-600 to-teal-600",
        icon: Target,
        textColor: "text-emerald-400",
        bgColor: "bg-gradient-to-r from-emerald-600 to-teal-600",
      };
    if (score >= 20)
      return {
        label: "Developing",
        color: "from-amber-600 to-orange-600",
        icon: TrendingUp,
        textColor: "text-amber-400",
        bgColor: "bg-gradient-to-r from-amber-600 to-orange-600",
      };
    return {
      label: "Newcomer",
      color: "from-gray-600 to-gray-500",
      icon: Star,
      textColor: "text-gray-400",
      bgColor: "bg-gradient-to-r from-gray-600 to-gray-500",
    };
  };

  // Current rankings based on active tab
  const currentRankings =
    activeTab === "therapists" ? therapistRankings : clientRankings;

  // Calculate total stats for the active tab
  const totalStats = useMemo(() => {
    if (activeTab === "therapists") {
      return {
        totalBookings: therapistRankings.reduce(
          (sum, t) => sum + t.bookings,
          0,
        ),
        totalUniqueClients: new Set(
          therapistRankings.flatMap((t) => Array.from(t.uniqueClients)),
        ).size,
        totalMassageTypes: new Set(
          therapistRankings.flatMap((t) => Array.from(t.massageTypes)),
        ).size,
        averageScore:
          therapistRankings.length > 0
            ? Math.round(
                therapistRankings.reduce(
                  (sum, t) => sum + t.performanceScore,
                  0,
                ) / therapistRankings.length,
              )
            : 0,
      };
    } else {
      return {
        totalVisits: clientRankings.reduce((sum, c) => sum + c.bookings, 0),
        mostFrequentClient: clientRankings[0]
          ? formatName(clientRankings[0].name.split(" ")[0])
          : "N/A",
        totalUniqueTherapists: new Set(
          clientRankings.flatMap((c) =>
            Array.from(c.favoriteTherapists.keys()),
          ),
        ).size,
        averageScore:
          clientRankings.length > 0
            ? Math.round(
                clientRankings.reduce((sum, c) => sum + c.loyaltyScore, 0) /
                  clientRankings.length,
              )
            : 0,
      };
    }
  }, [activeTab, therapistRankings, clientRankings]);

  // Time range options
  const timeRanges = [
    { value: "all", label: "All Time" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "quarter", label: "Quarter" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
      <MobileHeader
        bookings={normalizedBookings}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeRanges={timeRanges}
        currentRankings={currentRankings}
        formatName={formatName}
      />

      <DesktopHeader
        bookings={normalizedBookings}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeRanges={timeRanges}
      />

      <MainContent
        activeTab={activeTab}
        currentRankings={currentRankings}
        getRankBadge={getRankBadge}
        getPerformanceLevel={getPerformanceLevel}
        formatName={formatName}
        totalStats={totalStats}
        therapistRankings={therapistRankings}
        clientRankings={clientRankings}
      />

      <Legend />
    </div>
  );
}
