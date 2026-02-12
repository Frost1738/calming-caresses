"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaSignInAlt,
} from "react-icons/fa";
import { login } from "../ApiServices/serverActions";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [hasAccount, setHasAccount] = useState("login");
  const router = useRouter();

  function handleToggle() {
    const newMode = "register"; // or whatever logic determines the new mode
    setHasAccount(newMode);
    router.push(`/authentication?mode=${newMode}`);
  }

  const searchParams = new URLSearchParams();

  searchParams.set("mode", hasAccount);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  function handleOauth() {
    signIn("google");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm">
      <div className="w-3/4 mx-auto my-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-white/20 overflow-hidden h-[75vh] flex flex-col">
          <div className="bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-indigo-500/30 p-6 md:p-8 text-center border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-center mb-3">
              <FaSignInAlt className="text-white mr-3" size={28} />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                Welcome Back
              </h1>
            </div>
            <p className="text-white/80 text-sm sm:text-base md:text-lg">
              Sign in to your account
            </p>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <form action={login} className="p-4 sm:p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm sm:text-base md:text-lg font-medium text-white/90">
                  <FaEnvelope className="mr-2 sm:mr-3 text-white" size={20} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:py-4 pl-12 md:pl-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10 text-base md:text-lg"
                    placeholder="you@example.com"
                  />
                  <FaEnvelope
                    className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-white/50"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="flex items-center text-sm sm:text-base md:text-lg font-medium text-white/90">
                    <FaLock className="mr-2 sm:mr-3 text-white" size={20} />
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-white/70 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:py-4 pl-12 md:pl-14 pr-12 md:pr-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10 text-base md:text-lg"
                    placeholder="••••••••"
                  />
                  <FaLock
                    className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-white/50"
                    size={20}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 md:right-5 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-5 w-5 md:h-6 md:w-6 bg-white/5 border-white/20 rounded focus:ring-white/50 text-emerald-400"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-3 text-sm sm:text-base md:text-lg text-white/80"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500/40 to-blue-500/40 backdrop-blur-sm text-white py-3 md:py-4 px-4 rounded-xl font-medium hover:from-emerald-500/50 hover:to-blue-500/50 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 border border-white/20 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center group mt-6"
              >
                <span className="text-base sm:text-lg md:text-xl">Sign In</span>
                <FaArrowRight
                  className="ml-2 sm:ml-3 md:ml-4 group-hover:translate-x-2 transition-transform"
                  size={20}
                />
              </button>

              <div className="relative my-6 sm:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 sm:px-4 md:px-5 bg-transparent text-white/60 text-sm md:text-base">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleOauth}
                  className="flex items-center justify-center px-4 py-3 md:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <FaGoogle className="w-5 h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-white group-hover:text-rose-400" />
                  <span className="text-white text-sm sm:text-base md:text-lg">
                    Google
                  </span>
                </button>
              </div>

              <div className="text-center pt-6 md:pt-8">
                <p className="text-white/80 text-sm sm:text-base md:text-lg">
                  Don&apos;t have an account?{" "}
                  <a
                    onClick={handleToggle}
                    href="#"
                    className="font-medium text-emerald-300 hover:text-emerald-200 underline underline-offset-2 transition-colors"
                  >
                    Sign up now
                  </a>
                </p>
                <p className="text-white/60 text-xs sm:text-sm mt-2">
                  By signing in, you agree to our{" "}
                  <a href="#" className="underline hover:text-white/80">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-white/80">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
