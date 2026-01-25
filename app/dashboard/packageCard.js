"use client";

import React from "react";

export default function PackageCard({
  benefit1,
  benefit2,
  benefit3,
  benefit4,
  benefit5,
  price,
  from,
  via,
  imageUrl,
  to,
  textColor,
}) {
  const gradient = `bg-gradient-to-br from-${from} via-${via} to-${to}`;

  return (
    <>
      <div className="group relative w-[85vw] max-w-[400px] min-w-[280px] xs:w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] xl:w-[22vw] aspect-[3/4] sm:aspect-[4/3] lg:aspect-square cursor-pointer perspective-1000 h-auto min-h-[20rem] sm:min-h-[25rem] lg:h-[30rem] mx-auto m-[1rem]">
        <div className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] preserve-3d group-hover:rotate-y-[-180deg] group-focus:rotate-y-[-180deg] group-active:rotate-y-[-180deg]">
          <div
            className={`absolute w-full h-full backface-hidden rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 ${gradient} shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_25px_rgba(0,0,0,0.25)] sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.3)]`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-600/20 animate-gradient-x"></div>

            <div className="relative z-10 h-full flex flex-col items-center justify-between text-white p-3 sm:p-4">
              <div
                className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4 md:mb-6 h-[45%] min-h-[8rem] bg-cover bg-center bg-no-repeat  w-full rounded-xl sm:rounded-2xl overflow-hidden`}
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>

              <div className="w-full max-w-[95%] flex-1 flex flex-col items-center justify-start space-y-1.5 sm:space-y-2 overflow-hidden">
                <h3
                  className={`text-xs xs:text-sm border-b border-white/30 py-1 w-full text-center truncate overflow-ellipsis whitespace-nowrap ${textColor}`}
                >
                  {benefit1}
                </h3>
                <h3
                  className={`text-xs xs:text-sm border-b border-white/30 py-1 w-full text-center truncate overflow-ellipsis ${textColor}`}
                >
                  {benefit2}
                </h3>
                <h3
                  className={`text-xs xs:text-sm border-b border-white/30 py-1 w-full text-center truncate overflow-ellipsis ${textColor}`}
                >
                  {benefit3}
                </h3>
                <h3
                  className={`text-xs xs:text-sm border-b border-white/30 py-1 w-full text-center truncate overflow-ellipsis ${textColor}`}
                >
                  {benefit4}
                </h3>
                <h3
                  className={`text-xs xs:text-sm py-1 text-center truncate overflow-ellipsis ${textColor}`}
                >
                  {benefit5}
                </h3>
              </div>
            </div>
          </div>
          {/*back face*/}
          <div
            className={`absolute w-full h-full backface-hidden rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 ${gradient} backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_25px_rgba(0,0,0,0.25)] sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.3)] rotate-y-[180deg]`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]"></div>

            <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-8">
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-200">
                  Package Details
                </h2>

                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-white/10">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 text-amber-300 text-center">
                      Price
                    </h3>
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                          ${price}
                          <span className="text-sm sm:text-base md:text-lg text-white/70">
                            /month
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-white/60 mt-1">
                          Cancel anytime
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-4 sm:mt-5 md:mt-6 py-2.5 sm:py-3 md:py-4 px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-800 hover:from-amber-800 hover:via-yellow-700 hover:to-amber-700 transition-all duration-300 font-semibold text-amber-50 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-sm sm:text-base min-h-[44px] touch-manipulation group"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    Gain Access
                  </span>
                  <div className="relative">
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1 text-yellow-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <div className="absolute -inset-1 bg-yellow-400/20 blur-sm scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-3 sm:-inset-4 md:-inset-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl sm:rounded-3xl blur-xl -z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-700"></div>
      </div>
    </>
  );
}
