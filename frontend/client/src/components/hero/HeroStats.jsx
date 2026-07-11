import { motion } from "motion/react";
import {
  Users,
  PlayCircle,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

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
        divide-x
        divide-white/10
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        px-6
        py-5
        backdrop-blur-lg
      "
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
              min-w-[150px]
              flex-1
              items-center
              justify-center
              gap-3
              px-6
              py-3
            "
          >
            <Icon
              size={22}
              className="text-zinc-400"
            />

            <div className="text-left">
              <h2 className="text-2xl font-bold text-white">
                {item.number}
              </h2>

              <p className="text-xs text-zinc-500">
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