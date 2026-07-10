import { motion } from "motion/react";

const Logo = ({ size = 46 }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        rotate: 8,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full bg-violet-500 blur-xl"
        />

        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
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
            fill="#8B5CF6"
          />

          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#A855F7"
            strokeOpacity=".3"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="leading-tight">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          VIDVERSE
        </h1>

        <p className="text-xs text-zinc-400">
          Where Every Video Finds Its Universe.
        </p>
      </div>
    </motion.div>
  );
};

export default Logo;