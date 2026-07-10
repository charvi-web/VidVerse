import { motion } from "motion/react";

const GlowButton = ({ children }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.04,
        y: -2,
      }}
      whileTap={{
        scale: .97,
      }}
      className="
      relative
      overflow-hidden
      rounded-full
      bg-gradient-to-r
      from-indigo-500
      via-violet-500
      to-fuchsia-500
      px-6
      py-3
      font-medium
      text-white
      shadow-purple
      "
    >
      {children}
    </motion.button>
  );
};

export default GlowButton;