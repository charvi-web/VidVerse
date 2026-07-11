import { motion } from "motion/react";
import { fadeIn } from "../../utils/motion";

const HeroContent = () => {
  return (
    <>

      <motion.span
        variants={fadeIn("down",0)}
        className="
          mb-8
          rounded-full
          border
          border-white/10
          bg-white/5
          px-5
          py-2
          text-sm
          text-zinc-300
          backdrop-blur-xl
        "
      >
        ✨ Next Generation Video Experience
      </motion.span>



      <motion.h1
        variants={fadeIn("up",0.15)}
        className="
          max-w-5xl
          text-5xl
          font-black
          leading-[1.05]
          tracking-tight
          sm:text-6xl
          md:text-7xl
          lg:text-[84px]
        "
      >

        Stream Stories.
        <br/>

        Create Your{" "}

        <span
          className="
            bg-gradient-to-r
            from-violet-400
            via-purple-400
            to-cyan-400
            bg-clip-text
            text-transparent
          "
        >
          Digital Universe
        </span>

      </motion.h1>



      <motion.p
        variants={fadeIn("up",0.3)}
        className="
          mx-auto
          mt-7
          max-w-2xl
          text-lg
          leading-8
          text-zinc-400
        "
      >
        Discover creators, watch trending videos,
        and experience a modern streaming platform
        built for the next generation.
      </motion.p>

    </>
  );
};

export default HeroContent;