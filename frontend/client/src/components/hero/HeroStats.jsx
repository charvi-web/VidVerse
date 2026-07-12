import { motion } from "motion/react";
import {
  Users,
  PlayCircle,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const stats = [
  {
    number: "50K+",
    label: "Active Users",
    icon: Users,
  },
  {
    number: "1M+",
    label: "Videos",
    icon: PlayCircle,
  },
  {
    number: "500+",
    label: "Creators",
    icon: BadgeCheck,
  },
  {
    number: "99.99%",
    label: "Uptime",
    icon: ShieldCheck,
  },
];

const HeroStats = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      className="
        mt-16
        flex
        w-full
        max-w-4xl
        flex-wrap
        justify-center
        rounded-2xl
        px-6
        py-5
        backdrop-blur-xl
      "
      style={{
        background: isDark
          ? "rgba(255,255,255,.04)"
          : "rgba(255,255,255,.82)",
        border: isDark
          ? "1px solid rgba(255,255,255,.08)"
          : "1px solid rgba(0,0,0,.08)",
        boxShadow: isDark
          ? "none"
          : "0 20px 50px rgba(15,23,42,.08)",
      }}
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.9 + index * 0.1,
            }}
            className="
              flex
              min-w-[160px]
              flex-1
              items-center
              justify-center
              gap-3
              px-6
              py-3
            "
            style={{
              borderRight:
                index !== stats.length - 1
                  ? isDark
                    ? "1px solid rgba(255,255,255,.08)"
                    : "1px solid rgba(0,0,0,.08)"
                  : "none",
            }}
          >
            <Icon
              size={22}
              style={{
                color: isDark ? "#a1a1aa" : "#6366f1",
              }}
            />

            <div className="text-left">
              <h2
                className="text-2xl font-bold"
                style={{
                  color: isDark ? "#ffffff" : "#111827",
                }}
              >
                {item.number}
              </h2>

              <p
                className="text-xs"
                style={{
                  color: isDark ? "#71717a" : "#6b7280",
                }}
              >
                {item.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default HeroStats;