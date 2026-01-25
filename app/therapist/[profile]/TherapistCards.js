"use client";

import React, { useState } from "react";
import { Star, MapPin, Clock, Award, Heart, CheckCircle } from "lucide-react";
import { FcAlarmClock } from "react-icons/fc";
import { PiCertificateLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTherapistAvailability } from "@/app/helpers/availabilityHelper";

export default function TherapistCard({
  id,
  onBook,
  onFavorite,
  name,
  speciality,
  experience,
  rating,
  reviews,
  availability,
  nextAvailable,
  price,
  education,
  imageUrl,
  verified,
  hours,
  techniques,
  bookings,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const techniquesArray = techniques?.split(","); // Split by the comma
  const router = useRouter();

  // Handles liking
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (onFavorite) onFavorite(id, newFavoriteState);
  };

  const searchParams = new URLSearchParams();

  searchParams.set("therapistName", name);

  function handleBook() {
    onBook && onBook(id);
  }
  // Availability styling
  const availabilityConfig = {
    today: {
      label: "Today",
      color: "bg-green-100 text-green-800",
      dot: "bg-green-500",
    },
    tomorrow: {
      label: "Tomorrow",
      color: "bg-blue-100 text-blue-800",
      dot: "bg-blue-500",
    },
    "this-week": {
      label: "This Week",
      color: "bg-amber-100 text-amber-800",
      dot: "bg-amber-500",
    },
    "next-week": {
      label: "Next Week",
      color: "bg-gray-100 text-gray-800",
      dot: "bg-gray-500",
    },
  };

  const avail = availabilityConfig[availability] || availabilityConfig.today;
  const freeTime = getTherapistAvailability(bookings, name);
  console.log(freeTime);

  return (
    <div
      className="group relative m-[15px] w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200
                    xxs:max-w-[280px] xs:max-w-[320px] sm:max-w-sm max-xxs:max-w-[280px]
                    xxs:mx-auto xs:mx-auto sm:mx-0 "
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300
                   xxs:p-1.5 xs:p-2
                   ${
                     isFavorite
                       ? "bg-red-50"
                       : "bg-white/90 backdrop-blur-sm hover:bg-red-50"
                   }`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 transition-all duration-300
                     ${
                       isFavorite
                         ? "fill-red-500 text-red-500 scale-110"
                         : "text-gray-400 hover:text-red-400 hover:scale-110"
                     }`}
        />
      </button>

      <div
        className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg
                      xxs:text-[10px] xxs:px-1.5 xxs:py-0.5
                      xs:text-xs xs:px-2 xs:py-1
                      font-bold"
      >
        {experience}+ yrs
      </div>

      <div
        className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200
                      xxs:h-40 xs:h-44 sm:h-48"
      >
        <img
          src={imageUrl}
          alt={`${name}, ${speciality}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="p-4 xxs:p-3 xs:p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 xxs:gap-1.5">
              <h3
                className="font-bold text-gray-900 truncate
                            xxs:text-base xs:text-lg sm:text-lg"
              >
                {name}
              </h3>
              {verified && (
                <CheckCircle
                  className="flex-shrink-0
                                       xxs:w-4 xxs:h-4 xs:w-5 xs:h-5
                                       text-blue-500"
                />
              )}
            </div>
            <p
              className="text-gray-600 truncate mt-1
                         xxs:text-xs xs:text-sm sm:text-sm"
            >
              {speciality} massages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4
                          ${
                            i < Math.floor(rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
              />
            ))}
          </div>
          <span
            className="font-bold text-gray-900
                          xxs:text-sm xs:text-base"
          >
            {rating}
          </span>
          <span
            className="text-gray-500
                          xxs:text-xs xs:text-sm"
          >
            ({reviews} reviews)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 xxs:gap-2 mb-5">
          <div className="flex items-center gap-2">
            <PiCertificateLight className="xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 text-gray-400 flex-shrink-0" />
            <div>
              <div
                className="font-medium text-gray-900
                             xxs:text-xs xs:text-sm"
              >
                {education}
              </div>
              <div className="text-gray-500 xxs:text-[10px] xs:text-xs">
                certified
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 text-gray-400 flex-shrink-0" />
            <div>
              <div
                className="font-medium text-gray-900
                             xxs:text-xs xs:text-sm"
              >
                ${price}
              </div>
              <div className="text-gray-500 xxs:text-[10px] xs:text-xs">
                Per session
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5 xxs:gap-1 mb-3">
            {techniquesArray.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full
                          xxs:text-[10px] xxs:px-1.5
                          xs:text-xs xs:px-2
                          font-medium"
              >
                {tech}
              </span>
            ))}
            {techniquesArray.length > 3 && (
              <span
                className="px-1.5 py-0.5 text-gray-500
                              xxs:text-[10px] xs:text-xs"
              >
                +{techniques.length - 3}
              </span>
            )}
          </div>
          <div
            className="flex items-center gap-2 text-gray-600
                         xxs:text-xs xs:text-sm"
          >
            <FcAlarmClock className="xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4" />
            <span>{hours} hours</span>
          </div>
        </div>

        <div
          className="flex items-center justify-between pt-4 border-t border-gray-100
                       max-xxs:flex-col max-xxs:gap-[5px] xs:flex-row"
        >
          <div className="flex items-center gap-2 max-xxs:w-full xxs:justify-start">
            <div className={`w-2 h-2 rounded-full ${avail.dot}`} />
            <div className="flex flex-col">
              <h3
                className="text-gray-900
                            xxs:text-xs xs:text-sm"
              >
                Available:
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`font-medium px-2 py-0.5 rounded-full ${avail.color}
                                xxs:text-[10px] xs:text-xs`}
                >
                  {freeTime.nextAvailable.slotType}
                </span>
                {availability === "today" && (
                  <span className="text-gray-500 xxs:text-[10px] xs:text-xs">
                    {freeTime.nextAvailable.start}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Link
            onClick={handleBook}
            href={{
              pathname: "/booking/dates",
              query: { therapistId: id, therapistName: name },
            }}
            className="bg-gradient-to-r text-center from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                      text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg
                      max-xxs:w-full xxs:py-2.5 max-xxs:py-1 xxs:text-sm
                      xs:px-1 xs:py-2.5 xs:ml-1 xs:text-base"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
