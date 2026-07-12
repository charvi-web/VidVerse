import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Logo = ({ size = 48 }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Link to="/" aria-label="VIDVERSE Home">
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
        }}
        className="flex cursor-pointer select-none items-center gap-3"
      >
        {/* Logo Icon */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: size,
            height: size,
          }}
        >
          {/* Rotating Aura */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-6px] rounded-full blur-lg"
            style={{
              background:
                "linear-gradient(90deg,#6366f1,#a855f7,#22d3ee)",
              opacity: isDark ? 0.45 : 0.30,
            }}
          />

          {/* Inner Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: "#8b5cf6",
            }}
          />

          <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            fill="none"
            className="relative z-10"
          >
            <circle
              cx="60"
              cy="60"
              r="44"
              fill={
                isDark
                  ? "rgba(24,24,27,.88)"
                  : "rgba(255,255,255,.98)"
              }
              stroke="url(#grad)"
              strokeWidth="4"
            />

            <path
              d="M50 40 L86 60 L50 80 Z"
              fill="url(#play)"
            />

            <motion.circle
              cx="60"
              cy="60"
              r="52"
              stroke="#22D3EE"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="8 12"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <defs>
              <linearGradient id="grad">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>

              <linearGradient id="play">
                <stop stopColor="#A855F7" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand */}
        <div className="leading-tight">
          <h1
            className="text-2xl font-black tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(90deg,#ffffff,#a5b4fc,#22d3ee)"
                : "linear-gradient(90deg,#312e81,#6366f1,#0891b2)",
            }}
          >
            VIDVERSE
          </h1>

          <p
            className="hidden text-xs sm:block"
            style={{
              color: isDark ? "#a1a1aa" : "#52525b",
            }}
          >
            Where Every Video Finds Its Universe.
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;