import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Logo = ({ size = 48 }) => {
  return (
    <Link to="/" aria-label="VIDVERSE Home">
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
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
          {/* Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-violet-500 blur-xl"
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
              r="42"
              fill="#18181B"
              stroke="#6366F1"
              strokeWidth="4"
            />

            <polygon
              points="52,42 84,60 52,78"
              fill="#A855F7"
            />

            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#A855F7"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="leading-tight">
          <h1
            className="
              text-2xl
              font-black
              tracking-tight
              bg-gradient-to-r
              from-white
              via-indigo-300
              to-purple-400
              bg-clip-text
              text-transparent
            "
          >
            VIDVERSE
          </h1>

          <p className="hidden text-xs text-zinc-400 sm:block">
            Where Every Video Finds Its Universe.
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;