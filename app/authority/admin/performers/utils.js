// Get rank badge
export const getRankBadge = (rank, icons) => {
  const { Crown, Trophy, Medal, Award } = icons;
  switch (rank) {
    case 1:
      return {
        icon: Crown,
        color: "from-yellow-500 to-amber-500",
        label: "Champion",
        bgColor: "bg-gradient-to-br from-yellow-500 to-amber-500",
      };
    case 2:
      return {
        icon: Trophy,
        color: "from-gray-400 to-gray-300",
        label: "Elite",
        bgColor: "bg-gradient-to-br from-gray-400 to-gray-300",
      };
    case 3:
      return {
        icon: Medal,
        color: "from-amber-600 to-orange-500",
        label: "Pro",
        bgColor: "bg-gradient-to-br from-amber-600 to-orange-500",
      };
    default:
      return {
        icon: Award,
        color: "from-blue-500 to-cyan-500",
        label: "Rising Star",
        bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
      };
  }
};

// Get performance level
export const getPerformanceLevel = (score, icons) => {
  const { Sparkles, Zap, Target, TrendingUp, Star } = icons;
  if (score >= 80)
    return {
      label: "Elite",
      color: "from-purple-600 to-pink-600",
      icon: Sparkles,
      textColor: "text-purple-400",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    };
  if (score >= 60)
    return {
      label: "Expert",
      color: "from-blue-600 to-cyan-600",
      icon: Zap,
      textColor: "text-blue-400",
      bgColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
    };
  if (score >= 40)
    return {
      label: "Professional",
      color: "from-emerald-600 to-teal-600",
      icon: Target,
      textColor: "text-emerald-400",
      bgColor: "bg-gradient-to-r from-emerald-600 to-teal-600",
    };
  if (score >= 20)
    return {
      label: "Developing",
      color: "from-amber-600 to-orange-600",
      icon: TrendingUp,
      textColor: "text-amber-400",
      bgColor: "bg-gradient-to-r from-amber-600 to-orange-600",
    };
  return {
    label: "Newcomer",
    color: "from-gray-600 to-gray-500",
    icon: Star,
    textColor: "text-gray-400",
    bgColor: "bg-gradient-to-r from-gray-600 to-gray-500",
  };
};

// Safe name formatter with null check
export const formatName = (name) => {
  if (!name || name === "null" || name === "undefined") {
    return "Guest Client";
  }
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
