import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

const AuroraBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Purple */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -60, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/4 -top-[20%] h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{
          background: isDark
            ? "rgba(147,51,234,.42)"
            : "rgba(168,85,247,.28)",
        }}
      />

      {/* Indigo */}
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 80, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-1/4 top-0 h-[480px] w-[480px] rounded-full blur-[135px]"
        style={{
          background: isDark
            ? "rgba(99,102,241,.40)"
            : "rgba(99,102,241,.22)",
        }}
      />

      {/* Cyan */}
      <motion.div
        animate={{
          x: [-30, 30, -30],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-120px] left-1/2 h-[460px] w-[700px] -translate-x-1/2 rounded-full blur-[150px]"
        style={{
          background: isDark
            ? "rgba(34,211,238,.22)"
            : "rgba(56,189,248,.16)",
        }}
      />

      {/* Extra Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.55, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{
          background: isDark
            ? "rgba(99,102,241,.10)"
            : "rgba(99,102,241,.08)",
        }}
      />
    </div>
  );
};

export default AuroraBackground;