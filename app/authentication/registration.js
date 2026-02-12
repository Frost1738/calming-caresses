"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaArrowRight,
  FaGoogle,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import { register } from "../ApiServices/serverActions";
import { signIn } from "next-auth/react";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [hasAccount, setHasAccount] = useState("register");
  const router = useRouter();

  function handleToggle() {
    const newMode = "login";
    setHasAccount(newMode);
    router.push(`/authentication?mode=${newMode}`);
  }

  const searchParams = new URLSearchParams();

  searchParams.set("mode", hasAccount);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isPasswordMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm">
      <div className="w-3/4 mx-auto my-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-white/20 overflow-hidden h-[85vh] flex flex-col">
          <div className="bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 p-6 md:p-8 text-center border-b border-white/10 flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              Create Account
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg">
              commence your relaxation experience 🍨
            </p>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <form
              action={register}
              className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm sm:text-base md:text-lg font-medium text-white/90">
                    <FaUser className="mr-2 sm:mr-3 text-white" size={20} />
                    User Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 md:py-4 pl-12 md:pl-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10 text-base md:text-lg"
                      placeholder="John Doe"
                    />
                    <FaUser
                      className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-white/50"
                      size={20}
                    />
                  </div>
                </div>

                {/* Email Field */}
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
                      placeholder="john@example.com"
                    />
                    <FaEnvelope
                      className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-white/50"
                      size={20}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm sm:text-base md:text-lg font-medium text-white/90">
                    <FaLock className="mr-2 sm:mr-3 text-white" size={20} />
                    Password
                  </label>
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

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm sm:text-base md:text-lg font-medium text-white/90">
                    <FaLock className="mr-2 sm:mr-3 text-white" size={20} />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 md:py-4 pl-12 md:pl-14 pr-12 md:pr-14 bg-white/5 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10 text-base md:text-lg ${
                        formData.confirmPassword
                          ? isPasswordMatch
                            ? "border-emerald-400/50"
                            : "border-rose-400/50"
                          : "border-white/10"
                      }`}
                      placeholder="••••••••"
                    />
                    <FaLock
                      className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-white/50"
                      size={20}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-10 md:right-12 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                    {formData.confirmPassword && (
                      <div className="absolute right-4 md:right-5 top-1/2 transform -translate-y-1/2">
                        {isPasswordMatch ? (
                          <FaCheck className="text-emerald-400" size={20} />
                        ) : (
                          <span className="text-rose-400 text-lg">✗</span>
                        )}
                      </div>
                    )}
                  </div>
                  {formData.confirmPassword && !isPasswordMatch && (
                    <p className="text-sm md:text-base text-rose-400 flex items-center">
                      Passwords do not match
                    </p>
                  )}
                  {isPasswordMatch && (
                    <p className="text-sm md:text-base text-emerald-400 flex items-center">
                      <FaCheck className="mr-1" size={16} /> Passwords match
                    </p>
                  )}
                </div>
              </div>

              {/* remember me */}
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-5 w-5 md:h-6 md:w-6 bg-white/5 border-white/20 rounded focus:ring-white/50 text-white"
                />
                <label
                  htmlFor="terms"
                  className="ml-3 md:ml-4 text-sm sm:text-base md:text-lg text-white/80"
                >
                  <a
                    href="#"
                    className="text-white hover:text-white/90 font-medium underline underline-offset-2"
                  >
                    remember me
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white py-3 md:py-4 px-4 rounded-xl font-medium hover:from-white/30 hover:to-white/20 focus:ring-2 focus:ring-offset-2 focus:ring-white/50 border border-white/20 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-white/20 flex items-center justify-center group mt-4"
              >
                <span className="text-base sm:text-lg md:text-xl">
                  Register Now
                </span>
                <FaArrowRight
                  className="ml-2 sm:ml-3 md:ml-4 group-hover:translate-x-2 transition-transform"
                  size={20}
                />
              </button>

              {/* Divider */}
              <div className="relative my-4 sm:my-6 md:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 sm:px-4 md:px-5 bg-transparent text-white/60 text-sm md:text-base">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="flex items-center justify-center px-4 py-3 md:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <FaGoogle className="w-5 h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-white group-hover:text-rose-400" />
                  <span className="text-white text-sm sm:text-base md:text-lg">
                    Google
                  </span>
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-white/80 text-sm sm:text-base md:text-lg pt-4 md:pt-6">
                Already have an account?{" "}
                <a
                  onClick={handleToggle}
                  href="#"
                  className="font-medium text-white hover:text-white/90 underline underline-offset-2"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
