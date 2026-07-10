import { motion } from "motion/react";
import { Play, Compass } from "lucide-react";

const HeroButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="mt-12 flex flex-wrap items-center justify-center gap-5"
    >
      <button
        className="
          group
          flex items-center gap-2
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          px-8 py-4
          font-semibold
          text-white
          shadow-lg shadow-indigo-600/25
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-indigo-500/50
        "
      >
        <Play
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
        Start Watching
      </button>

      <button
        className="
          group
          flex items-center gap-2
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-8 py-4
          font-semibold
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-indigo-500/40
          hover:bg-white/10
          hover:scale-105
        "
      >
        <Compass
          size={18}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
        Explore
      </button>
    </motion.div>
  );
};

export default HeroButtons;