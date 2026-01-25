"use client";

import { useState, useEffect } from "react";
import AppointmentCard from "./appointmentCard";
import toast from "react-hot-toast";

export default function AppointmentsSlider({ appointments, userName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const totalSlides = Math.ceil(appointments.length / slidesToShow);

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (userName) {
      toast.success(`Welcome back, ${userName}`);
    }
  }, []);

  if (!appointments || appointments.length === 0) {
    return (
      <div className="h-auto p-[1rem] bg-[radial-gradient(ellipse_at_center,_rgba(255,203,71,1)_0%,_rgba(168,126,29,1)_35%,_rgba(39,41,50,1)_100%)] flex justify-center items-center flex-col md:flex-row md:h-[80vh]">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            These are your appointments
          </h1>
          <p className="text-white text-xl">
            No appointments scheduled {userName}
          </p>
        </div>
      </div>
    );
  }

  const startIdx = currentIndex * slidesToShow;
  const currentSlides = appointments.slice(startIdx, startIdx + slidesToShow);
  const hasNext = currentIndex < totalSlides - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div className="h-auto min-h-[100vh] w-[100%]  bg-[radial-gradient(ellipse_at_center,_rgba(255,203,71,1)_0%,_rgba(168,126,29,1)_35%,_rgba(39,41,50,1)_100%)] flex justify-center items-center flex-col md:h-[80vh] ">
      {/* Heading */}
      <div className="w-full text-center ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"></h1>
        <p className="text-white/80 text-lg md:text-xl xl:mt-8  md:pb-2 max-md:mb-6.5 md:mt-7.5 ">
          <span className="font-semibold text-[#ABA194] font-[family-name:var(--font-quicksand))]  ">
            YOU ARE SCHEDULED FOR 🗓️
          </span>
        </p>
      </div>

      <div className="relative w-full max-w-[100%] h-full flex items-center justify-center max-sm:mt-2 sm:mt-1.5 md:mt-1 ">
        {/* Left Arrow - Positioned at 20% */}
        {hasPrev && (
          <button
            onClick={prevSlide}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 shadow-xl"
            aria-label="Previous appointments"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        <div className="w-full px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-[1rem] w-full">
            {currentSlides.map((appointment, index) => (
              <div
                key={appointment.id || index}
                className="flex justify-center w-[100%]"
              >
                <div className="w-full max-w-xs md:max-w-[100%] flex justify-center items-center">
                  <AppointmentCard
                    date={appointment.date}
                    time={appointment.time}
                    session={appointment.massageName}
                    therapist={appointment.therapistName}
                    room={appointment.room}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow - Positioned at 80% */}
        {hasNext && (
          <button
            onClick={nextSlide}
            className="absolute right-[5%] top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 shadow-xl"
            aria-label="Next appointments"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Pagination and Info */}
      <div className="mt-8 md:mt-10 md:mb-10 text-center">
        <div className="inline-flex items-center space-x-4 bg-black/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
          <span className="text-white font-medium">
            Page <span className="text-amber-100">{currentIndex + 1}</span> of{" "}
            {totalSlides}
          </span>
          <div className="w-px h-4 bg-white/30"></div>
          <span className="text-white/90">
            Showing{" "}
            <span className="text-amber-100 font-semibold">
              {startIdx + 1}-
              {Math.min(startIdx + slidesToShow, appointments.length)}
            </span>{" "}
            of {appointments.length} appointments
          </span>
        </div>

        {/* Pagination Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center space-x-3">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
