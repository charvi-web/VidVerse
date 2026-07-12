import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

const FloatingOrbs = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const orbs = [
    {
      size: 360,
      top: "4%",
      left: "-8%",
      dark: "rgba(99,102,241,.28)",
      light: "rgba(99,102,241,.14)",
      duration: 12,
    },
    {
      size: 330,
      top: "18%",
      right: "-10%",
      dark: "rgba(168,85,247,.30)",
      light: "rgba(168,85,247,.14)",
      duration: 15,
    },
    {
      size: 280,
      bottom: "4%",
      left: "34%",
      dark: "rgba(34,211,238,.22)",
      light: "rgba(34,211,238,.10)",
      duration: 18,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -45, 0],
            x: [0, 30, 0],
            scale: [1, 1.08, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full blur-[140px]"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: isDark ? orb.dark : orb.light,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;