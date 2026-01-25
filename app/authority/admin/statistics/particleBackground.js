const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/50 to-cyan-950/30"></div>

      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] max-lg:w-[600px] max-lg:h-[600px] max-md:w-[400px] max-md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 max-lg:w-64 max-lg:h-64 max-md:w-48 max-md:h-48 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-[80px] animate-spin-slow"></div>
      </div>

      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 7}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
