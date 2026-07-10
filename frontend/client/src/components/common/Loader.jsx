import { motion } from "motion/react";

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B]">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          h-14
          w-14
          rounded-full
          border-4
          border-indigo-500
          border-t-transparent
        "
      />
    </div>
  );
};

export default Loader;