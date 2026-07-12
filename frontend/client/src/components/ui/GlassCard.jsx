import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

const GlassCard = ({
  children,
  className = "",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      className={`rounded-3xl p-8 transition-all duration-300 ${className}`}
      style={{
        background: isDark
          ? "rgba(255,255,255,.05)"
          : "rgba(255,255,255,.88)",

        backdropFilter: "blur(22px)",

        border: isDark
          ? "1px solid rgba(255,255,255,.10)"
          : "1px solid rgba(0,0,0,.08)",

        boxShadow: isDark
          ? "0 10px 35px rgba(0,0,0,.35)"
          : "0 12px 35px rgba(99,102,241,.08)",
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;