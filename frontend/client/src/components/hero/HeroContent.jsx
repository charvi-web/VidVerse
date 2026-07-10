import { motion } from "motion/react";

const HeroContent = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300 backdrop-blur-xl">
          🚀 The Future of Video Streaming
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.8 }}
        className="max-w-6xl text-5xl font-black leading-tight sm:text-6xl md:text-7xl lg:text-8xl"
      >
        Where Every Video
        <br />
        Finds Its{" "}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Universe
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg md:text-xl"
      >
        Discover creators, explore trending content, stream instantly,
        and experience a premium video platform powered by modern web
        technologies.
      </motion.p>
    </>
  );
};

export default HeroContent;