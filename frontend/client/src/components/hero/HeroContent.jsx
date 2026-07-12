import { motion } from "motion/react";
import { fadeIn } from "../../utils/motion";
import { useTheme } from "../../context/ThemeContext";

const HeroContent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {/* Badge */}
      <motion.span
        variants={fadeIn("down", 0)}
        className="mb-8 rounded-full border px-5 py-2 text-sm font-medium backdrop-blur-xl shadow-sm"
        style={{
          color: isDark ? "#d4d4d8" : "#52525b",
          background: isDark
            ? "rgba(255,255,255,.06)"
            : "rgba(255,255,255,.75)",
          borderColor: isDark
            ? "rgba(255,255,255,.12)"
            : "rgba(0,0,0,.08)",
        }}
      >
        ✨ Next Generation Video Experience
      </motion.span>

      {/* Heading */}
      <motion.h1
        variants={fadeIn("up", 0.15)}
        className="
          max-w-5xl
          text-5xl
          font-black
          leading-[1.05]
          tracking-tight
          sm:text-6xl
          md:text-7xl
          lg:text-[84px]
        "
        style={{
          color: isDark ? "#ffffff" : "#18181b",
        }}
      >
        <span
          style={{
            color: isDark ? "#ffffff" : "#111827",
          }}
        >
          Stream Stories.
          <br />
          Create Your{" "}
        </span>

        <span
          className="
            bg-gradient-to-r
            from-violet-600
            via-purple-500
            to-cyan-500
            bg-clip-text
            text-transparent
          "
        >
          Digital Universe
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeIn("up", 0.3)}
        className="
          mx-auto
          mt-7
          max-w-2xl
          text-lg
          leading-8
        "
        style={{
          color: isDark ? "#a1a1aa" : "#4b5563",
        }}
      >
        Discover creators, watch trending videos,
        <br />
        and experience a modern streaming platform
        <br />
        built for the next generation.
      </motion.p>
    </>
  );
};

export default HeroContent;