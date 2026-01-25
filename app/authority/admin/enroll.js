"use client";
import { useState } from "react";
import {
  UserPlus,
  Upload,
  Award,
  GraduationCap,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { enrollTherapist } from "@/app/ApiServices/serverActions";
import toast from "react-hot-toast";
import { GiJewelCrown } from "react-icons/gi";

const SPECIALTIES_OPTIONS = [
  "Deep Tissue",
  "Sports Therapy",
  "Prenatal",
  "Swedish Massage",
  "Hot Stone",
  "Trigger Point",
  "Myofascial Release",
  "Reflexology",
  "Shiatsu",
  "Thai Massage",
];

const TECHNIQUES_OPTIONS = [
  "Dry Needling",
  "Ischemic Compression",
  "Cupping Therapy",
  "Stretching",
  "Joint Mobilization",
  "Myofascial Release",
  "Trigger Point Therapy",
  "Deep Pressure",
];

const EDUCATION_OPTIONS = [
  "Certificate",
  "Diploma",
  "Degree",
  "Master's Degree",
  "Doctorate",
];

const LEVEL_OPTIONS = [
  { value: "novice", label: "Novice" },
  { value: "specialist", label: "Specialist" },
  { value: "seasoned", label: "Seasoned" },
];

export default function EnrollmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
    experience: "",
    education: "",
    specialties: [],
    techniques: [],
    hours: "",
    level: "",
    price: "",
    verified: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      return current.includes(value)
        ? { ...prev, [field]: current.filter((item) => item !== value) }
        : { ...prev, [field]: [...current, value] };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.education) newErrors.education = "Education is required";
    if (formData.specialties.length === 0)
      newErrors.specialties = "Select at least one specialty";
    if (formData.techniques.length === 0)
      newErrors.techniques = "Select at least one technique";
    if (!formData.hours) newErrors.hours = "Hours are required";
    if (!formData.level) newErrors.level = "Level is required";
    if (!formData.price) newErrors.price = "Price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }
    setIsSubmitting(true);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(
          key,
          Array.isArray(value) ? value.join(", ") : value.toString(),
        );
      });

      const result = await enrollTherapist(formDataToSend);
      if (result?.success) {
        setSuccess(true);
        toast.success("Therapist enrolled successfully!");
        setFormData({
          name: "",
          image: "",
          email: "",
          password: "",
          experience: "",
          education: "",
          specialties: [],
          techniques: [],
          hours: "",
          level: "",
          price: "",
          verified: false,
        });
        setErrors({});
        setTimeout(() => setSuccess(false), 5000);
      } else {
        toast.error(`❌ ${result?.message || "Failed to enroll therapist"}`);
        if (result?.errors) setErrors(result.errors);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("🔥 An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40"></div>
              <div className="relative p-3 sm:p-4 md:p-5 bg-gradient-to-br from-cyan-500/90 to-blue-600/90 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl">
                <GiJewelCrown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight">
                Enroll New Therapist
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed">
                Add professional therapists to your wellness team
              </p>
            </div>
          </div>

          {/* Success Message  */}
          {success && (
            <div className="mb-4 sm:mb-6 md:mb-8 relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-cyan-700/30">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20"></div>
              <div className="relative p-3 sm:p-4 md:p-6 bg-gradient-to-r from-cyan-950/60 to-blue-950/60 backdrop-blur-sm sm:backdrop-blur-xl">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-cyan-100 font-semibold text-sm sm:text-base md:text-lg lg:text-xl break-words">
                      Therapist enrolled successfully!
                    </p>
                    <p className="text-cyan-300/80 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">
                      They can now access the system
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 sm:space-y-8 md:space-y-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {/* Left Column */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* Basic Information Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-xl sm:rounded-2xl md:rounded-3xl blur-lg sm:blur-xl opacity-20 sm:opacity-30 group-hover:opacity-30 sm:group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-900/20 backdrop-blur-sm sm:backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-cyan-700/30 shadow-lg sm:shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
                    <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-cyan-600/80 to-blue-600/80 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg">
                      <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent break-words">
                        Basic Information
                      </h2>
                      <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                        Essential personal details
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 sm:mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-slate-800/40 border ${
                          errors.name
                            ? "border-rose-500/50"
                            : "border-cyan-600/30"
                        } rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-1 sm:focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-slate-500 backdrop-blur-sm text-sm sm:text-base`}
                      />
                      {errors.name && (
                        <p className="mt-2 text-xs sm:text-sm text-rose-400 flex items-center gap-1 sm:gap-2">
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 sm:mb-3">
                        Profile Image URL
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
                        <input
                          type="text"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="https://example.com/profile.jpg"
                          className="flex-1 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-slate-800/40 border border-cyan-600/30 rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-1 sm:focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-slate-500 backdrop-blur-sm text-sm sm:text-base"
                        />
                        <button
                          type="button"
                          className="px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-slate-300 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 border border-cyan-600/30 hover:border-cyan-500/50 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base"
                        >
                          <Upload className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          Upload
                        </button>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-slate-500">
                        Leave empty to use default avatar
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 sm:mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="therapist@example.com"
                          className={`w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-slate-800/40 border ${
                            errors.email
                              ? "border-rose-500/50"
                              : "border-cyan-600/30"
                          } rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-1 sm:focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-slate-500 backdrop-blur-sm text-sm sm:text-base`}
                        />
                        {errors.email && (
                          <p className="mt-2 text-xs sm:text-sm text-rose-400">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 sm:mb-3">
                          Password *
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className={`w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-slate-800/40 border ${
                            errors.password
                              ? "border-rose-500/50"
                              : "border-cyan-600/30"
                          } rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-1 sm:focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-slate-500 backdrop-blur-sm text-sm sm:text-base`}
                        />
                        {errors.password && (
                          <p className="mt-2 text-xs sm:text-sm text-rose-400">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills & Techniques Card - Stack buttons on mobile */}
              <div className="relative group">
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-xl sm:rounded-2xl md:rounded-3xl blur-lg sm:blur-xl opacity-20 sm:opacity-30 group-hover:opacity-30 sm:group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-900/80 to-indigo-900/20 backdrop-blur-sm sm:backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-blue-700/30 shadow-lg sm:shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
                    <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-blue-600/80 to-indigo-600/80 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent break-words">
                        Skills & Techniques
                      </h2>
                      <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                        Specialized expertise
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-3 sm:mb-4">
                        Specialties *
                      </label>
                      {errors.specialties && (
                        <p className="text-xs sm:text-sm text-rose-400 mb-2 sm:mb-3">
                          {errors.specialties}
                        </p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        {SPECIALTIES_OPTIONS.map((specialty) => (
                          <button
                            key={specialty}
                            type="button"
                            onClick={() =>
                              handleMultiSelect("specialties", specialty)
                            }
                            className={`px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 text-left group ${
                              formData.specialties.includes(specialty)
                                ? "bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-cyan-500/50 text-cyan-200 shadow-md sm:shadow-lg shadow-cyan-500/30"
                                : "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800/70 hover:border-cyan-600/30 hover:text-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-xs sm:text-sm md:text-base break-words text-left">
                                {specialty}
                              </span>
                              {formData.specialties.includes(specialty) ? (
                                <div className="p-1 sm:p-1.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded sm:rounded-lg">
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                              ) : (
                                <div className="p-1 sm:p-1.5 bg-slate-700 rounded sm:rounded-lg">
                                  <div className="w-3 h-3 sm:w-4 sm:h-4"></div>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-3 sm:mb-4">
                        Techniques *
                      </label>
                      {errors.techniques && (
                        <p className="text-xs sm:text-sm text-rose-400 mb-2 sm:mb-3">
                          {errors.techniques}
                        </p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        {TECHNIQUES_OPTIONS.map((technique) => (
                          <button
                            key={technique}
                            type="button"
                            onClick={() =>
                              handleMultiSelect("techniques", technique)
                            }
                            className={`px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-300 text-left group ${
                              formData.techniques.includes(technique)
                                ? "bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/50 text-blue-200 shadow-md sm:shadow-lg shadow-blue-500/30"
                                : "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800/70 hover:border-blue-600/30 hover:text-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-xs sm:text-sm md:text-base break-words text-left">
                                {technique}
                              </span>
                              {formData.techniques.includes(technique) ? (
                                <div className="p-1 sm:p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded sm:rounded-lg">
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                              ) : (
                                <div className="p-1 sm:p-1.5 bg-slate-700 rounded sm:rounded-lg">
                                  <div className="w-3 h-3 sm:w-4 sm:h-4"></div>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            {/* Professional Details Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-teal-600/30 to-emerald-600/30 rounded-xl sm:rounded-2xl md:rounded-3xl blur-lg sm:blur-xl opacity-20 sm:opacity-30 group-hover:opacity-30 sm:group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-900/80 to-teal-900/20 backdrop-blur-sm sm:backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-teal-700/30 shadow-lg sm:shadow-2xl">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
                  <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-teal-600/80 to-emerald-600/80 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent break-words">
                      Professional Details
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                      Credentials & experience
                    </p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 sm:mb-3">
                        Experience (Years) *
                      </label>
                      <input
                        type="number"
                        name="experience"
                        min="0"
                        max="50"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="5"
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-slate-800/40 border ${
                          errors.experience
                            ? "border-rose-500/50"
                            : "border-teal-600/30"
                        } rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-1 sm:focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-white placeholder:text-slate-500 backdrop-blur-sm text-sm sm:text-base`}
                      />
                      {errors.experience && (
                        <p className="mt-2 text-xs sm:text-sm text-rose-400">
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 sm:mb-3">
                        Education Level *
                      </label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-slate-800/40 border ${
                          errors.education
                            ? "border-rose-500/50"
                            : "border-teal-600/30"
                        } rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-1 sm:focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-white backdrop-blur-sm text-xs sm:text-sm md:text-base`}
                      >
                        <option
                          value=""
                          className="bg-slate-900 text-xs sm:text-sm"
                        >
                          Select education
                        </option>
                        {EDUCATION_OPTIONS.map((edu) => (
                          <option
                            key={edu}
                            value={edu.toLowerCase()}
                            className="bg-slate-900 text-xs sm:text-sm"
                          >
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.education && (
                        <p className="mt-2 text-xs sm:text-sm text-rose-400">
                          {errors.education}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 sm:mb-3">
                        Hours Completed *
                      </label>
                      <input
                        type="number"
                        name="hours"
                        min="0"
                        value={formData.hours}
                        onChange={handleInputChange}
                        placeholder="780"
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-slate-800/40 border ${
                          errors.hours
                            ? "border-rose-500/50"
                            : "border-teal-600/30"
                        } rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-1 sm:focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-white placeholder:text-slate-500 backdrop-blur-sm text-sm sm:text-base`}
                      />
                      {errors.hours && (
                        <p className="mt-2 text-xs sm:text-sm text-rose-400">
                          {errors.hours}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 sm:mb-3">
                        Professional Level *
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-slate-800/40 border ${
                          errors.level
                            ? "border-rose-500/50"
                            : "border-teal-600/30"
                        } rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-1 sm:focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-white backdrop-blur-sm text-xs sm:text-sm md:text-base`}
                      >
                        <option
                          value=""
                          className="bg-slate-900 text-xs sm:text-sm"
                        >
                          Select level
                        </option>
                        {LEVEL_OPTIONS.map((level) => (
                          <option
                            key={level.value}
                            value={level.value}
                            className="bg-slate-900 text-xs sm:text-sm"
                          >
                            {level.label}
                          </option>
                        ))}
                      </select>
                      {errors.level && (
                        <p className="mt-2 text-xs sm:text-sm text-rose-400">
                          {errors.level}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Section - Stack buttons on mobile*/}
          <div className="sticky bottom-4 sm:bottom-6 md:bottom-8 z-20">
            <div className="relative group">
              <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-indigo-600/30 rounded-xl sm:rounded-2xl md:rounded-3xl blur-lg sm:blur-2xl opacity-30 sm:opacity-40"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-sm sm:backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-cyan-700/40 shadow-lg sm:shadow-2xl md:shadow-3xl">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-6 md:gap-8">
                  <div className="flex-1 min-w-0 mb-4 lg:mb-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent break-words">
                      Complete Enrollment
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 md:mt-3">
                      Review all details before final submission
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          name: "",
                          image: "",
                          email: "",
                          password: "",
                          experience: "",
                          education: "",
                          specialties: [],
                          techniques: [],
                          hours: "",
                          level: "",
                          price: "",
                          verified: false,
                        });
                        setErrors({});
                      }}
                      className="px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-slate-300 rounded-lg sm:rounded-xl md:rounded-2xl font-medium transition-all duration-300 border border-cyan-600/30 hover:border-cyan-500/50 text-xs sm:text-sm md:text-base lg:text-lg"
                    >
                      Clear Form
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-blue-500/40"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Enrolling...</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            <span>Enroll Therapist</span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
