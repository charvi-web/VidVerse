import { motion } from "motion/react";

const GlassCard = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      className={`
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-indigo-500/30
        hover:shadow-2xl
        hover:shadow-indigo-500/10
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;