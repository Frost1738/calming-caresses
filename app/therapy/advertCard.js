"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { ChevronLeft, ChevronRight, Share2, ExternalLink } from "lucide-react";

import ExperienceForm from "./experiences/experienceForm";

const sampleImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop",
];

export default function AdvertCard({
  title = "Premium Collection",
  description = "Discover our exclusive range...",
  images = sampleImages,
  name,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const [cardFormOpen, setCardFormOpen] = useState(false);

  function handleSelection() {
    setCardFormOpen(true);
  }

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  // Function to reset timer
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetTimer();
  };

  return (
    <>
      {cardFormOpen && (
        <ExperienceForm
          massageTitle={title}
          onClose={() => setCardFormOpen(false)}
          name={name}
        />
      )}

      <div className="w-full max-w-md mx-auto lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto min-h-[30rem]">
        <div
          className="relative overflow-hidden rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-xl group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
            {/* Current Image */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                </button>
              </>
            )}

            {/* Slide Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      resetTimer();
                    }}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-white w-3 sm:w-4"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Text Content  */}
          <div className="p-4 sm:p-5 md:p-6 bg-[#E6DBD0]">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
              {title}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6 line-clamp-3">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={`https://www.webmd.com/balance/guide/swedish-massage`}
                className="w-full sm:flex-1 bg-[#1C1F33] hover:bg-[#7D6167] text-white font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Learn More
              </a>

              <button
                onClick={handleSelection}
                className="w-full sm:flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Share Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
