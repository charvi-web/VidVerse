import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const FooterCTA = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className="relative overflow-hidden py-36 transition-colors duration-500"
      style={{
        background: isDark ? "#09090B" : "#f8fafc",
      }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
          style={{
            background: isDark
              ? "rgba(99,102,241,.18)"
              : "rgba(99,102,241,.10)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-black md:text-6xl"
          style={{
            color: isDark ? "#ffffff" : "#111827",
          }}
        >
          Ready to Enter
          <br />

          <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
            VIDVERSE?
          </span>
        </motion.h2>

        <p
          className="mx-auto mt-8 max-w-2xl text-lg leading-8"
          style={{
            color: isDark ? "#a1a1aa" : "#6b7280",
          }}
        >
          Upload, discover and experience videos like never before.
        </p>

        <Link
          to="/register"
          className="
            mt-12
            inline-flex
            items-center
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            px-10
            py-5
            text-lg
            font-bold
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-2xl
          "
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
};

export default FooterCTA;