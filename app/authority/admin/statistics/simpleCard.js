const SimpleCard = ({ children, className = "" }) => {
  return (
    <div
      className={`relative bg-gradient-to-br from-gray-900/80 to-gray-950/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:scale-[1.01] ${className}`}
    >
      {children}
    </div>
  );
};

export default SimpleCard;
