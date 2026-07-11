import { motion } from "motion/react";

const Loader = () => {
  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#050505]
      "
    >

      <motion.div
        initial={{
          opacity:0,
          scale:0.7,
        }}

        animate={{
          opacity:1,
          scale:1,
          rotate:360,
        }}

        transition={{
          opacity:{
            duration:0.5,
          },

          scale:{
            duration:0.5,
          },

          rotate:{
            duration:1.2,
            repeat:Infinity,
            ease:"linear",
          },
        }}

        className="
          relative
          h-16
          w-16
          rounded-full
          border-4
          border-violet-500
          border-t-transparent
          shadow-[0_0_40px_rgba(139,92,246,0.6)]
        "
      />

    </div>
  );
};

export default Loader;