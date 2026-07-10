import { motion } from "motion/react";

const AuroraBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [-60, 60, -60],
          y: [-40, 40, -40],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-48 -top-48 h-[650px] w-[650px] rounded-full bg-indigo-600/25 blur-[170px]"
      />

      <motion.div
        animate={{
          x: [50, -50, 50],
          y: [30, -30, 30],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-52 bottom-[-180px] h-[700px] w-[700px] rounded-full bg-purple-600/20 blur-[190px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/3 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[140px]"
      />
    </div>
  );
};

export default AuroraBackground;