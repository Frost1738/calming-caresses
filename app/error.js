"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full">
        {/* Error Card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Header */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-xl"></div>
                <div className="relative bg-red-500/20 p-3 rounded-full backdrop-blur-sm">
                  <FiAlertTriangle className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  System Error
                </h1>
                <p className="text-slate-400 mt-1">
                  An unexpected issue has occurred
                </p>
              </div>
            </div>
          </div>

          {/* Error Details */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Error Message */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <FiAlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-300 mb-1">
                    Error Information
                  </h3>
                  <p className="text-slate-400 text-sm font-mono break-words bg-slate-900/50 p-3 rounded-lg">
                    {error.message || "Unknown error"}
                  </p>
                  {error.digest && (
                    <p className="text-slate-500 text-xs mt-2">
                      Reference: {error.digest}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => reset()}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <FiRefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Retry Operation
              </button>

              <Link
                href="/dashboard"
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg border border-slate-700"
              >
                <FiHome className="w-5 h-5" />
                Return Home
              </Link>

              <button
                onClick={() => router.back()}
                className="sm:col-span-2 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg border border-slate-600"
              >
                ← Navigate Back
              </button>
            </div>

            {/* Support Info */}
            <div className="text-center pt-6 border-t border-slate-700">
              <p className="text-slate-500 text-sm">
                Technical support:{" "}
                <button
                  onClick={() => alert("Contact: support@calmingcaresses.com")}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  support@calmingcaresses.com
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
