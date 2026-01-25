"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Levels({ marginLeft, level, description }) {
  const divRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMargin = () => {
      if (!divRef.current) return;

      const width = window.innerWidth;

      if (width < 1024) {
        divRef.current.style.marginLeft = "0px";
      } else if (width >= 1024 && width < 1400) {
        divRef.current.style.marginLeft = `${marginLeft * 0.7}rem`;
      } else {
        divRef.current.style.marginLeft = `${marginLeft}rem`;
      }
    };

    // Set initial
    updateMargin();

    // Update on resize
    window.addEventListener("resize", updateMargin);

    return () => window.removeEventListener("resize", updateMargin);
  }, [marginLeft]);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  // Stagger the animation for each level
  const getAnimationDelay = () => {
    switch (level) {
      case "novice":
        return "0.2s";
      case "specialist":
        return "0.4s";
      case "seasoned":
        return "0.6s";
      default:
        return "0.1s";
    }
  };

  return (
    <div
      ref={divRef}
      className={`w-[90%] h-[10rem] flex justify-center items-center mt-[3rem] transform transition-all duration-700 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
      style={{ transitionDelay: getAnimationDelay() }}
    >
      <Link
        href={`/therapist/${level}`}
        className="flex items-center w-full gap-[-1rem]"
      >
        <div className="w-[6rem] h-[6rem] rounded-full bg-[#CABAC8] flex justify-center items-center transform transition-transform duration-500 hover:scale-110 hover:rotate-12">
          {level}
        </div>
        <div className="xs:[clip-path:polygon(10%_0%,_100%_0%,_100%_100%,_20%_100%)] max-xs: [clip-path:polygon(20%_0%,_100%_0%,_100%_100%,_40%_100%)] w-[70%] rounded-[3rem] bg-[#BCA0BC] h-[6rem] lg:pt-[9px] flex justify-end items-center transform transition-all duration-500 hover:scale-[1.02]">
          <p className="w-[80%] max-xs:w-[90%] max-xs:pl-[5rem] max-xs:mr[5px] overflow-y-scroll h-[100%] max-xs:text-sm mr-[1rem] max-sm:p-[1rem] text-ellipsis p-[5px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
