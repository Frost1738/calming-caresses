"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const WelcomePage = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [particles, setParticles] = useState([]);
  const buttonRef = useRef(null);

  const fullText = "Welcome to Calming Caresses";
  const subtitleText = "Where wellness meets serenity";
  const typingSpeed = 100;
  const pauseBeforeButton = 500;

  // Pure deterministic random function
  const deterministicRandom = useMemo(() => {
    const seed = 12345;
    return (index) => {
      const x = Math.sin(seed + index * 1000) * 10000;
      return Math.abs(x - Math.floor(x));
    };
  }, []);

  // Memoized animation duration
  const animationDuration = useMemo(
    () => deterministicRandom(0) * 10 + 10,
    [deterministicRandom],
  );

  // Memoized hover animations
  const hoverAnimations = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        x: `${deterministicRandom(i * 2) * 100}%`,
        y: `${deterministicRandom(i * 2 + 1) * 100}%`,
      })),
    [deterministicRandom],
  );

  // Responsive particle count - fixed with deterministic values
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 50;

    const newParticles = Array.from({ length: particleCount }, (_, i) => {
      const random1 = deterministicRandom(i * 3);
      const random2 = deterministicRandom(i * 3 + 1);
      const random3 = deterministicRandom(i * 3 + 2);
      const random4 = deterministicRandom(i * 3 + 3);
      const random5 = deterministicRandom(i * 3 + 4);

      return {
        id: i,
        x: random1 * 100,
        y: random2 * 100,
        size: random3 * 2 + 1,
        speedX: (random4 - 0.5) * 0.3,
        speedY: (random5 - 0.5) * 0.3,
        opacity: random3 * 0.4 + 0.1,
      };
    });

    setParticles(newParticles);
  }, [deterministicRandom]);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
        })),
      );
    };
    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setShowButton(true);
      }, pauseBeforeButton);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Responsive floating animation
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Memoized button hover particles
  const buttonHoverParticles = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        x: deterministicRandom(i * 5) * 100,
        y: deterministicRandom(i * 5 + 1) * 100,
      })),
    [deterministicRandom],
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-x-hidden">
      {/* Animated gradient background - Made responsive */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 animate-gradient-shift"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>

        {/* Responsive particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white hidden sm:block" // Hide on mobile for performance
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
            }}
            animate={{
              x: [0, Math.sin(p.id) * 10, 0], // Reduced movement on mobile
              y: [0, Math.cos(p.id) * 10, 0],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Responsive geometric patterns */}
      <div className="fixed inset-0 opacity-5 sm:opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 sm:w-96 sm:h-96 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-48 sm:h-48 rotate-45 border border-white/20 rounded-lg -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main content with responsive padding */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
        <div className="max-w-6xl w-full text-center">
          {/* Responsive logo */}
          <motion.div
            className="mb-8 sm:mb-12 md:mb-16"
            animate={floatingAnimation}
          >
            <div className="relative inline-block">
              {/* Outer glow - responsive blur */}
              <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse-slow"></div>

              {/* Main logo - responsive sizing */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg sm:shadow-xl md:shadow-2xl shadow-blue-500/30 border-2 sm:border-3 md:border-4 border-white/10 backdrop-blur-sm">
                {/* Inner rings - hide on mobile */}
                <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/20 rounded-full animate-spin-slow hidden sm:block"></div>
                <div className="absolute inset-6 sm:inset-8 md:inset-12 border border-white/10 rounded-full hidden sm:block"></div>

                {/* Flower icon - responsive size */}
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  🌼
                </div>
              </div>

              {/* Floating dots - hide on mobile */}
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg hidden sm:block"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg hidden sm:block"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>

          {/* Responsive heading */}
          <div className="mb-6 sm:mb-8 md:mb-12 px-2">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {displayText}
            </motion.h1>

            {/* Subtitle */}
            <AnimatePresence>
              {currentIndex === fullText.length && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light tracking-wide sm:tracking-wider"
                >
                  {subtitleText}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Begin button with conditional effects */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative px-2"
              >
                <Link href="/therapist" passHref>
                  <motion.button
                    ref={buttonRef}
                    className="group relative px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                    whileHover={{ scale: window.innerWidth > 640 ? 1.05 : 1 }} // Disable on mobile
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:bg-[position:100%_0] bg-[position:0%_0] hidden sm:block"></div>

                    {/* Animated border - hide on mobile */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 hidden sm:block"></div>

                    {/* Shimmer effect - hide on mobile */}
                    <div className="absolute -inset-20 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 hidden sm:block"></div>

                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                      <span className="text-white tracking-wide">
                        commence booking
                      </span>
                      <motion.svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{
                          x: window.innerWidth > 640 ? [0, 10, 0] : 0,
                        }} // Disable on mobile
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </motion.svg>
                    </div>

                    {/* Particle effect on hover - desktop only */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl hidden sm:block">
                      {buttonHoverParticles.map((anim, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-white/30"
                          initial={{ x: "50%", y: "50%", scale: 0 }}
                          whileHover={{
                            x: anim.x,
                            y: anim.y,
                            scale: [0, 1, 0],
                          }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.button>
                </Link>

                {/* Responsive trust badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-xs sm:max-w-md md:max-w-2xl mx-auto"
                >
                  {[
                    { text: "Wide Therapists selection", icon: "⭐" },
                    { text: "24/7 Support", icon: "🛡️" },
                    { text: "Secure & Private", icon: "🔒" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10"
                      whileHover={
                        window.innerWidth > 640
                          ? {
                              // Disable on mobile
                              scale: 1.05,
                              backgroundColor: "rgba(255,255,255,0.1)",
                            }
                          : {}
                      }
                    >
                      <span className="text-lg sm:text-xl md:text-2xl">
                        {item.icon}
                      </span>
                      <span className="text-gray-300 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Scroll indicator - hide on mobile */}
                <motion.div
                  className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 hidden sm:block"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div
                      className="w-1 h-2 bg-white/50 rounded-full"
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative w-full h-12 sm:h-16 md:h-20 lg:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-white/10"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35,6.36,119.13-6.25,33-11,66.21-28.13,97.07-46.86,32.74-19.84,66-39.14,100.18-55.68,35.34-17,73-32.08,112.45-39.58C1055.5,5,1122.77,6.47,1192,26.27V0Z"
            opacity=".5"
            className="fill-white/5"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default WelcomePage;
