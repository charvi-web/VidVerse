import { motion } from "motion/react";

const FooterCTA = () => {
  return (
    <section className="relative overflow-hidden py-36">

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[180px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-6xl font-black text-white"
        >
          Ready to Enter
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            VIDVERSE?
          </span>
        </motion.h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400">
          Upload, discover and experience videos like never before.
        </p>

        <button
          className="
            mt-12
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            px-10
            py-5
            text-lg
            font-bold
            transition
            hover:scale-105
          "
        >
          Get Started Free
        </button>

      </div>

    </section>
  );
};

export default FooterCTA;