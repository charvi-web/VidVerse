import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.5, 1, 0.5],
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Scroll
        </span>

        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-xl">
          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-4 w-4 text-indigo-400" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;