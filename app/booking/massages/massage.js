"use client";

import { FiStar, FiClock, FiCheck, FiX } from "react-icons/fi";

export default function MassageComponent({ massage, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`
        bg-white rounded-xl p-5 sm:p-6 border-2 cursor-pointer transition-all duration-300
        ${
          isSelected
            ? "border-green-500 bg-green-50 shadow-md"
            : "border-gray-200 hover:border-blue-300 hover:shadow-md"
        }
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Massage info - Now with proper text wrapping */}
        <div className="flex-1 sm:pr-4 lg:pr-6 min-w-0">
          {" "}
          {/* Added min-w-0 for text truncation */}
          {/* Header with better wrapping */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                {massage.name}
              </h3>
              <div className="flex items-center gap-1 text-amber-500 shrink-0">
                <FiStar className="fill-current" />
                <span className="font-semibold">{massage.rating}</span>
              </div>
            </div>

            {isSelected && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 w-fit shrink-0">
                <FiCheck /> Selected
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base break-words">
            {massage.description}
          </p>
          {/* Tags - Better responsive wrapping */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base shrink-0">
              <FiClock className="shrink-0" />
              <span className="font-medium">{massage.duration} min</span>
            </div>

            <div className="text-lg sm:text-xl font-bold text-blue-600 shrink-0">
              ${massage.price}
            </div>

            <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm shrink-0">
              {massage.intensity.charAt(0).toUpperCase() +
                massage.intensity.slice(1)}
            </span>

            <span className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm shrink-0">
              {massage.category.charAt(0).toUpperCase() +
                massage.category.slice(1)}
            </span>
          </div>
        </div>

        {/* Selection button - Now properly aligned */}
        <div className="flex flex-col items-center sm:items-end sm:justify-center sm:self-start shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`
              px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-colors flex items-center gap-2
              w-full sm:w-auto justify-center
              ${
                isSelected
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
            `}
          >
            {isSelected ? (
              <>
                <FiX /> <span className="sm:hidden">Remove</span>
                <span className="hidden sm:inline">Deselect</span>
              </>
            ) : (
              <>
                <span className="sm:hidden">reserve</span>
                <span className="hidden sm:inline">Select</span>
              </>
            )}
          </button>

          {isSelected && (
            <p className="mt-2 text-xs sm:text-sm text-red-600 font-medium text-center sm:text-right">
              Click card to remove
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
