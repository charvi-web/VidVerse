import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{
        delay: 1.2,
        duration: 0.8,
      }}
      className="
        fixed
        bottom-8
        left-1/2
        z-50
        -translate-x-1/2
      "
    >

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          flex
          flex-col
          items-center
          gap-2
          text-zinc-400
        "
      >

        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.5em]
          "
        >
          Scroll
        </span>


        <ChevronDown
          size={20}
          strokeWidth={1.5}
        />

      </motion.div>

    </motion.div>
  );
};

export default ScrollIndicator;