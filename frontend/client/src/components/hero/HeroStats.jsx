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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-5 md:grid-cols-4"
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9 + index * 0.15,
              duration: 0.6,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="
              rounded-2xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
              transition-all
              duration-300
              hover:border-indigo-500/30
              hover:bg-white/10
              hover:shadow-xl
              hover:shadow-indigo-500/10
            "
          >
            <div className="mb-4 flex justify-center">
              <div className="rounded-xl bg-indigo-500/15 p-3">
                <Icon
                  size={26}
                  className="text-indigo-400"
                />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-white">
              {item.number}
            </h2>

            <p className="mt-2 text-sm tracking-wide text-zinc-400">
              {item.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default HeroStats;