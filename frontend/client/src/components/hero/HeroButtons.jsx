import { motion } from "motion/react";
import { Play, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const HeroButtons = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.6 }}
      className="mt-10 flex flex-wrap items-center justify-center gap-4"
    >
      {/* Primary Button */}
      <motion.button
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate("/explore")}
        className="group relative flex items-center gap-3 overflow-hidden rounded-xl px-8 py-4 font-semibold transition-all duration-300"
        style={{
          background: isDark ? "#ffffff" : "#4f46e5",
          color: isDark ? "#111111" : "#ffffff",
          boxShadow: isDark
            ? "0 0 35px rgba(255,255,255,.15)"
            : "0 15px 40px rgba(79,70,229,.30)",
        }}
      >
        <Play
          size={17}
          fill="currentColor"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />

        <span>Start Watching</span>
      </motion.button>

      {/* Secondary Button */}
      <motion.button
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          document
            .getElementById("explore")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="group flex items-center gap-3 rounded-xl px-8 py-4 font-semibold transition-all duration-300"
        style={{
          background: isDark
            ? "rgba(255,255,255,.06)"
            : "#ffffff",

          color: isDark ? "#ffffff" : "#18181b",

          border: isDark
            ? "1px solid rgba(255,255,255,.12)"
            : "1px solid #d4d4d8",

          boxShadow: isDark
            ? "none"
            : "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <Compass
          size={18}
          className="transition-transform duration-300 group-hover:rotate-12"
        />

        Explore
      </motion.button>
    </motion.div>
  );
};

export default HeroButtons;