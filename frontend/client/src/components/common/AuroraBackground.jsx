import { motion } from "motion/react";

const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/4
          top-[-20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-purple-600/40
          blur-[120px]
        "
      />

      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-1/4
          top-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-indigo-500/40
          blur-[120px]
        "
      />

      <motion.div
        className="
          absolute
          bottom-0
          left-1/2
          h-[400px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-cyan-400/20
          blur-[140px]
        "
      />

    </div>
  );
};

export default AuroraBackground;