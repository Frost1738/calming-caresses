"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { deleteTherapist } from "@/app/ApiServices/serverActions";
import toast from "react-hot-toast";
import StatsCards from "./statsCard";
import SearchAndFilters from "./searchAndFilters";
import TherapistCard from "./therapistCard";
import DeregisterModal from "./Modal";
import EmptyState from "./emptyState";
import { getLevelColor, getLevelLabel } from "@/app/helpers/helper";
import { Header } from "./header";

export default function DemotionPage({ therapists: initialTherapists }) {
  // FIX: Use correct prop name and ensure it's always an array
  const [therapists, setTherapists] = useState(() => {
    if (Array.isArray(initialTherapists)) {
      return initialTherapists;
    } else if (initialTherapists && typeof initialTherapists === "object") {
      // Try to extract array from object
      const values = Object.values(initialTherapists);
      const arrayValue = values.find((v) => Array.isArray(v));
      return arrayValue || [];
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    level: "all",
    verified: "all",
  });
  const [therapistToRemove, setTherapistToRemove] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Sync with prop changes
  useEffect(() => {
    if (Array.isArray(initialTherapists)) {
      setTherapists(initialTherapists);
    } else if (initialTherapists && typeof initialTherapists === "object") {
      const values = Object.values(initialTherapists);
      const arrayValue = values.find((v) => Array.isArray(v));
      setTherapists(arrayValue || []);
    } else {
      setTherapists([]);
    }
  }, [initialTherapists]);

  // Safe filtering with multiple fallbacks
  const filteredTherapists = Array.isArray(therapists)
    ? therapists.filter((therapist) => {
        // Handle null/undefined therapist
        if (!therapist || typeof therapist !== "object") return false;

        // Extract values with multiple fallbacks
        const therapistName =
          therapist.name || therapist.fullName || therapist.username || "";
        const therapistLevel = therapist.level || therapist.rank || "novice";
        const therapistVerified =
          therapist.verified ||
          therapist.isVerified ||
          therapist.status === "verified" ||
          false;

        // Apply filters
        const matchesSearch = therapistName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesLevel =
          filters.level === "all" || therapistLevel === filters.level;
        const matchesVerified =
          filters.verified === "all" ||
          (filters.verified === "verified" && therapistVerified) ||
          (filters.verified === "unverified" && !therapistVerified);

        return matchesSearch && matchesLevel && matchesVerified;
      })
    : [];

  const handleDeregister = (id) => {
    setTherapistToRemove(id);
  };

  const confirmDeregister = async () => {
    if (!therapistToRemove) return;

    setIsRemoving(true);

    try {
      // Find the therapist by ID
      const therapist = therapists.find((t) => t.id === therapistToRemove);
      if (!therapist) {
        toast.error("Therapist not found");
        return;
      }

      // Get the name to delete
      const therapistName = therapist.name || therapist.fullName;
      if (!therapistName) {
        toast.error("Therapist name not found");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading(`De-registering ${therapistName}...`);

      // Call the server action
      const result = await deleteTherapist(therapistName);

      if (result.success) {
        // Remove therapist from local state
        setTherapists((prev) => prev.filter((t) => t.id !== therapistToRemove));

        // Update toast to success
        toast.dismiss(loadingToast);
        toast.success(
          <div>
            <div className="font-semibold">Success!</div>
            <div>{therapistName} has been de-registered</div>
          </div>,
          {
            duration: 4000,
            icon: "✅",
          },
        );
      } else {
        throw new Error(result.message || "Failed to delete therapist");
      }
    } catch (error) {
      console.error("Error de-registering therapist:", error);
      toast.error(
        <div>
          <div className="font-semibold">Failed to de-register</div>
          <div className="text-sm mt-1">{error.message}</div>
        </div>,
        {
          duration: 5000,
        },
      );
    } finally {
      setTherapistToRemove(null);
      setIsRemoving(false);
    }
  };

  // Calculate stats with defensive checks
  const stats = {
    total: Array.isArray(therapists) ? therapists.length : 0,
    verified: Array.isArray(therapists)
      ? therapists.filter((t) => t?.verified || t?.isVerified).length
      : 0,
    seasoned: Array.isArray(therapists)
      ? therapists.filter((t) => (t?.level || t?.rank) === "seasoned").length
      : 0,
    specialist: Array.isArray(therapists)
      ? therapists.filter((t) => (t?.level || t?.rank) === "specialist").length
      : 0,
    novice: Array.isArray(therapists)
      ? therapists.filter(
          (t) => (t?.level || t?.rank) === "novice" || !t?.level,
        ).length
      : 0,
  };

  // Helper function to format education
  const formatEducation = (education) => {
    if (!education) return "Not specified";
    return education.charAt(0).toUpperCase() + education.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] p-3 xs:p-4 sm:p-6 md:p-8">
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "linear-gradient(135deg, #1A1A2E, #16213E)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          },
          success: {
            duration: 3000,
            style: {
              background: "linear-gradient(135deg, #00B894, #00A085)",
              color: "#fff",
              border: "1px solid rgba(0, 184, 148, 0.3)",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#00B894",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "linear-gradient(135deg, #FF6B6B, #EE5A52)",
              color: "#fff",
              border: "1px solid rgba(255, 107, 107, 0.3)",
            },
          },
          loading: {
            duration: Infinity,
          },
        }}
      />

      {/* Header Section */}
      <Header stats={stats} />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Therapist List */}
      {filteredTherapists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
          {filteredTherapists.map((therapist, index) => {
            // Ensure therapist has required fields
            const safeTherapist = {
              id: therapist.id || therapist._id || `temp-${index}`,
              name:
                therapist.name ||
                therapist.fullName ||
                `Therapist ${index + 1}`,
              email: therapist.email || therapist.emailAddress || "",
              emailAddress: therapist.emailAddress || therapist.email || "",
              level: therapist.level || therapist.rank || "novice",
              verified: therapist.verified || therapist.isVerified || false,
              experience:
                therapist.experience || therapist.yearsExperience || 0,
              education:
                therapist.education ||
                therapist.qualification ||
                "Not specified",
              hours: therapist.hours || therapist.weeklyHours || 0,
              price: therapist.price || therapist.sessionPrice || 0,
              reviews: therapist.reviews || therapist.totalReviews || 0,
              rating: therapist.rating || therapist.averageRating || 0,
              image: therapist.image || therapist.profileImage || "",
            };

            return (
              <TherapistCard
                key={safeTherapist.id}
                therapist={safeTherapist}
                handleDeregister={handleDeregister}
                getLevelColor={getLevelColor}
                getLevelLabel={getLevelLabel}
                formatEducation={formatEducation}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* Deregister Modal */}
      <DeregisterModal
        therapistToRemove={therapistToRemove}
        therapists={therapists}
        isRemoving={isRemoving}
        setTherapistToRemove={setTherapistToRemove}
        confirmDeregister={confirmDeregister}
      />
    </div>
  );
}
