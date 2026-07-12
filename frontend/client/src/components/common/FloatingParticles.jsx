import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

const particles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 8 + 8,
  delay: Math.random() * 4,
}));

const FloatingParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((particle) => {
        const lightColor =
          particle.id % 3 === 0
            ? "rgba(99,102,241,.45)"
            : particle.id % 3 === 1
            ? "rgba(168,85,247,.35)"
            : "rgba(34,211,238,.35)";

        return (
          <motion.span
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,

              background: isDark
                ? "rgba(255,255,255,.75)"
                : lightColor,

              boxShadow: isDark
                ? "0 0 18px rgba(255,255,255,.85)"
                : `0 0 18px ${lightColor}`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 12, -12, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.45, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingParticles;