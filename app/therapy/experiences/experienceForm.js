"use client";

import { useState, useEffect, useContext } from "react";
import { X, Star, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TherapyContext } from "../therapyContext";
import { collectComment } from "../../ApiServices/serverActions";
import toast from "react-hot-toast";

export default function ExperienceForm({ massageTitle, onClose }) {
  const { userName } = useContext(TherapyContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    rating: 0,
  });

  const handleRatingClick = (value) => {
    setRating(value);
    setFormData({ ...formData, rating: value });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop - NOW CLOSES THE FORM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-blue-900/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Popup Form */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-20"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="relative p-8 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Share Your Experience
                  </h2>
                  <p className="text-white/70 text-sm mt-1">
                    Help us improve your {massageTitle} {/* title */}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form action={collectComment} className="relative p-8 pt-6">
              <input type="hidden" name="rating" value={rating || 0} />
              <input type="hidden" name="massageTitle" value={massageTitle} />

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm font-medium mb-3">
                  How was your {massageTitle}?
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-2 transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          (hoverRating || rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-white/10 text-white/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment textarea */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Your feedback
                </label>
                <textarea
                  name="feedback"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white min-h-[100px] resize-none"
                  placeholder={`What did you think of the ${massageTitle}?`}
                  required
                />
              </div>

              {/* Name input */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Your name (optional)
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={userName || ""}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  placeholder="Enter your name"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                onClick={() => {
                  toast.loading("submitting review...");
                  setTimeout(() => {
                    onClose();
                    setTimeout(() => {
                      toast.success("comment received");
                    }, 3000);
                  }, 100);
                }}
              >
                Submit Review
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
