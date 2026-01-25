// app/components/MassageList.jsx - COMPLETE VERSION
"use client";

import { useState, useContext } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import MassageComponent from "./massage";
import { CartContext } from "../cartContext";
import { useRouter } from "next/navigation";

const massages = [
  {
    id: 1,
    name: "Hot Stone Massage",
    category: "relaxation",
    duration: 90,
    price: 120,
    rating: 4.8,
    description: "Heated stones massage",
    intensity: "medium",
  },
  {
    id: 2,
    name: "Swedish Massage",
    category: "relaxation",
    duration: 60,
    price: 85,
    rating: 4.9,
    description: "Gentle massage",
    intensity: "light",
  },
  {
    id: 3,
    name: "Cultural Massage",
    category: "traditional",
    duration: 75,
    price: 95,
    rating: 4.7,
    description: "Traditional massage",
    intensity: "medium",
  },
  {
    id: 4,
    name: "Shiatsu Massage",
    category: "therapeutic",
    duration: 60,
    price: 100,
    rating: 4.8,
    description: "Pressure point massage",
    intensity: "medium",
  },
  {
    id: 5,
    name: "Aromatherapy Massage",
    category: "relaxation",
    duration: 60,
    price: 90,
    rating: 4.6,
    description: "Essential oils massage",
    intensity: "light",
  },
  {
    id: 6,
    name: "Thai Massage",
    category: "sports",
    duration: 90,
    price: 110,
    rating: 4.5,
    description: "Stretching massage",
    intensity: "medium",
  },
  {
    id: 7,
    name: "Reflexology Massage",
    category: "specialty",
    duration: 50,
    price: 70,
    rating: 4.4,
    description: "Foot massage",
    intensity: "light",
  },
  {
    id: 8,
    name: "Sports Massage",
    category: "sports",
    duration: 60,
    price: 80,
    rating: 4.9,
    description: "Athlete massage",
    intensity: "high",
  },
  {
    id: 9,
    name: "Prenatal Massage",
    category: "specialty",
    duration: 50,
    price: 75,
    rating: 4.8,
    description: "Pregnancy massage",
    intensity: "light",
  },
  {
    id: 10,
    name: "Trigger Point Therapy",
    category: "therapeutic",
    duration: 60,
    price: 95,
    rating: 4.7,
    description: "Muscle knot massage",
    intensity: "high",
  },
  {
    id: 11,
    name: "Massage Chair",
    category: "quick",
    duration: 30,
    price: 50,
    rating: 4.3,
    description: "Chair massage",
    intensity: "light",
  },
];

const categories = [
  "all",
  "relaxation",
  "therapeutic",
  "sports",
  "specialty",
  "traditional",
  "quick",
];
const intensities = ["all", "light", "medium", "high"];

export default function MassageList() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIntensity, setSelectedIntensity] = useState("all");

  const router = useRouter();

  const {
    massage: selectedMassageInCart,
    setMassage,
    setDuration,
    setPrice,
  } = useContext(CartContext);

  // Find which massage is currently in cart
  const selectedMassage = massages.find(
    (m) => m.name === selectedMassageInCart,
  );
  const selectedMassageId = selectedMassage?.id || null;

  const handleMassageSelect = (massageId) => {
    const selectedMassage = massages.find((m) => m.id === massageId);

    if (selectedMassage) {
      // If clicking the same massage that's already selected, deselect it
      if (selectedMassageId === massageId) {
        console.log("Deselecting massage");
        setMassage(null);
        setDuration(null); // Clear duration
        setPrice(null); // Clear price
      } else {
        // Otherwise select the new massage and set its details
        console.log("Selecting massage:", selectedMassage.name);
        setMassage(selectedMassage.name);
        setDuration(selectedMassage.duration);
        setPrice(selectedMassage.price);
      }
    }
  };

  const handleClearSelection = () => {
    setMassage(null);
    setDuration(null);
    setPrice(null);
  };

  // Filter logic
  const filteredMassages = massages.filter((massage) => {
    if (
      search &&
      !massage.name.toLowerCase().includes(search.toLowerCase()) &&
      !massage.description.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    if (selectedCategory !== "all" && massage.category !== selectedCategory) {
      return false;
    }

    if (
      selectedIntensity !== "all" &&
      massage.intensity !== selectedIntensity
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 min-h-screen">
      {/* Cart Status Display */}
      <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-r from-blue-200 via-sky-200 to-cyan-200 border border-blue-400/40 rounded-xl sm:rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex-1">
            <div className="font-medium text-blue-900 flex items-center gap-2 text-sm sm:text-base">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              Current Selection:
            </div>
            <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent break-words">
              {selectedMassageInCart
                ? selectedMassageInCart
                : "No massage selected"}
            </p>
            {selectedMassageInCart && (
              <div className="mt-2 flex flex-wrap gap-3">
                <div className="text-sm text-blue-800">
                  <span className="font-medium">Duration:</span>{" "}
                  {selectedMassage?.duration} min
                </div>
                <div className="text-sm text-blue-800">
                  <span className="font-medium">Price:</span> $
                  {selectedMassage?.price}
                </div>
              </div>
            )}
          </div>
          {selectedMassageInCart && (
            <button
              onClick={handleClearSelection}
              className="px-4 py-2.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-red-200 to-pink-200 hover:from-red-300 hover:to-pink-300 text-red-800 rounded-lg sm:rounded-xl font-medium border border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-sm w-full sm:w-auto text-sm sm:text-base"
            >
              Clear Selection
            </button>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
          Choose Your Massage
        </h1>
        <p className="text-gray-700 text-sm sm:text-lg">
          Select or deselect treatments by clicking on them
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8 border border-amber-300">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600" />
            <input
              type="text"
              placeholder="Search massages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-white border border-amber-400 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <FiFilter className="text-amber-600 hidden sm:block" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto bg-white border border-amber-400 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent sm:min-w-[160px] transition-all duration-300 text-sm sm:text-base"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all"
                      ? "All Categories"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedIntensity}
              onChange={(e) => setSelectedIntensity(e.target.value)}
              className="w-full sm:w-auto bg-white border border-amber-400 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent sm:min-w-[140px] transition-all duration-300 text-sm sm:text-base"
            >
              {intensities.map((int) => (
                <option key={int} value={int}>
                  {int === "all"
                    ? "All Intensities"
                    : int.charAt(0).toUpperCase() + int.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setSelectedIntensity("all");
            }}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
              selectedCategory === "all" &&
              !search &&
              selectedIntensity === "all"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md"
                : "bg-white text-gray-800 hover:bg-amber-50 border border-amber-400 hover:border-amber-500"
            }`}
          >
            Show All ({massages.length})
          </button>

          {categories.slice(1).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 border border-amber-400 shadow-sm"
                  : "bg-white text-gray-800 hover:bg-amber-50 border border-amber-400 hover:border-amber-500"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results info */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-white to-amber-50 rounded-lg sm:rounded-xl border border-amber-300 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4">
          <p className="text-gray-800 font-medium text-sm sm:text-base text-center md:text-left">
            Found {filteredMassages.length} massage
            {filteredMassages.length !== 1 ? "s" : ""}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
            {selectedIntensity !== "all" && ` (${selectedIntensity} intensity)`}
          </p>

          {selectedMassageInCart && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-200 to-green-200 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-emerald-400 mt-2 md:mt-0">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-600 animate-pulse"></div>
              <span className="font-medium text-emerald-800 text-xs sm:text-sm">
                Massage selected - click again to deselect
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Massage Cards */}
      <div className="space-y-4 sm:space-y-5">
        {filteredMassages.map((massage) => (
          <MassageComponent
            key={massage.id}
            massage={massage}
            isSelected={massage.id === selectedMassageId}
            onSelect={() => handleMassageSelect(massage.id)}
          />
        ))}

        {filteredMassages.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-gradient-to-br from-white to-amber-100 rounded-xl sm:rounded-2xl border border-amber-300 shadow-sm px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-200 to-orange-200 flex items-center justify-center border border-amber-400">
              <FiSearch className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
            </div>
            <p className="text-gray-700 text-lg sm:text-xl mb-4">
              No massages found
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setSelectedIntensity("all");
              }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Continue Button */}
      {selectedMassageInCart && (
        <div className="mt-6 sm:mt-10 p-4 sm:p-6 bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 border border-emerald-400 rounded-xl sm:rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-600 animate-pulse"></div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                  Ready to book!
                </h3>
              </div>
              <p className="text-gray-800 text-sm sm:text-base">
                Selected:{" "}
                <span className="font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  {selectedMassageInCart}
                </span>
              </p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm sm:text-base">
                <div className="text-gray-700">
                  <span className="font-medium">Duration:</span>{" "}
                  {selectedMassage?.duration} min
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Price:</span> $
                  {selectedMassage?.price}
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Category:</span>{" "}
                  {selectedMassage?.category}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 sm:mt-2">
                Click the massage again or "Clear Selection" to deselect
              </p>
            </div>
            <button
              onClick={() => {
                router.push("/booking/rooms");
              }}
              className="px-6 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group w-full sm:w-auto justify-center mt-4 md:mt-0 text-sm sm:text-base"
            >
              Next Step
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
