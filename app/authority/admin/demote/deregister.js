"use client";

import { useState } from "react";
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

export default function DemotionPage({ therapist: initialTherapists }) {
  const [therapists, setTherapists] = useState(initialTherapists || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    level: "all",
    verified: "all",
  });
  const [therapistToRemove, setTherapistToRemove] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Filter therapists by name
  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch = therapist.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel =
      filters.level === "all" || therapist.level === filters.level;
    const matchesVerified =
      filters.verified === "all" ||
      (filters.verified === "verified" && therapist.verified) ||
      (filters.verified === "unverified" && !therapist.verified);

    return matchesSearch && matchesLevel && matchesVerified;
  });

  const handleDeregister = (id) => {
    setTherapistToRemove(id);
  };

  const confirmDeregister = async () => {
    if (!therapistToRemove) return;

    setIsRemoving(true);

    try {
      // Find the therapist by ID to get their name
      const therapist = therapists.find((t) => t.id === therapistToRemove);
      if (!therapist) {
        toast.error("Therapist not found");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading(`De-registering ${therapist.name}...`);

      // Call the server action to delete the therapist by name
      const result = await deleteTherapist(therapist.name);

      if (result.success) {
        // Remove therapist from local state
        setTherapists((prev) => prev.filter((t) => t.id !== therapistToRemove));

        // Update toast to success
        toast.dismiss(loadingToast);
        toast.success(
          <div>
            <div className="font-semibold">Success!</div>
            <div>{therapist.name} has been de-registered</div>
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

  // Calculate stats
  const stats = {
    total: therapists.length,
    verified: therapists.filter((t) => t.verified).length,
    seasoned: therapists.filter((t) => t.level === "seasoned").length,
    specialist: therapists.filter((t) => t.level === "specialist").length,
    novice: therapists.filter((t) => t.level === "novice").length,
  };

  // Helper functions

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
          {filteredTherapists.map((therapist) => (
            <TherapistCard
              key={therapist.id}
              therapist={therapist}
              handleDeregister={handleDeregister}
              getLevelColor={getLevelColor}
              getLevelLabel={getLevelLabel}
              formatEducation={formatEducation}
            />
          ))}
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
