import { useMemo } from "react";

function generateParticles(count, seed = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle1 = Math.sin(seed + i * 100) * 10000;
    const angle2 = Math.cos(seed + i * 200) * 10000;
    const angle3 = Math.sin(seed + i * 300) * 10000;

    const deterministicRandom1 = Math.abs(angle1 - Math.floor(angle1));
    const deterministicRandom2 = Math.abs(angle2 - Math.floor(angle2));
    const deterministicRandom3 = Math.abs(angle3 - Math.floor(angle3));

    return {
      id: i,
      left: `${deterministicRandom1 * 100}%`,
      top: `${deterministicRandom2 * 100}%`,
      animationDelay: `${deterministicRandom3 * 5}s`,
      animationDuration: `${3 + deterministicRandom1 * 7}s`,
      size: 1 + deterministicRandom2 * 2,
      opacity: 0.3 + deterministicRandom3 * 0.7,
    };
  });
}

const ParticleBackground = () => {
  const particles = useMemo(() => generateParticles(30, 12345), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/50 to-cyan-950/30"></div>

      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] max-lg:w-[600px] max-lg:h-[600px] max-md:w-[400px] max-md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 max-lg:w-64 max-lg:h-64 max-md:w-48 max-md:h-48 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-[80px] animate-spin-slow"></div>
      </div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,200,255,0.5) 100%)",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
