import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ScrollIndicator = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{
        delay: 1.2,
        duration: 0.8,
      }}
      className="
        fixed
        bottom-8
        left-1/2
        z-50
        -translate-x-1/2
      "
    >
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          flex
          flex-col
          items-center
          gap-2
          rounded-full
          px-4
          py-3
          backdrop-blur-xl
        "
        style={{
          color: isDark ? "#a1a1aa" : "#4b5563",
          background: isDark
            ? "rgba(255,255,255,.04)"
            : "rgba(255,255,255,.75)",
          border: isDark
            ? "1px solid rgba(255,255,255,.08)"
            : "1px solid rgba(0,0,0,.08)",
        }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.45em]"
          style={{
            color: isDark ? "#71717a" : "#6b7280",
          }}
        >
          Scroll
        </span>

        <ChevronDown
          size={20}
          strokeWidth={1.6}
          color={isDark ? "#d4d4d8" : "#4f46e5"}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;