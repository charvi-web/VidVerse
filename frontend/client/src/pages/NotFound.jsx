import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Home, Compass } from "lucide-react";

import Button from "../components/ui/Button";
import GradientText from "../components/ui/GradientText";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6">
      <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-[9rem] font-black leading-none tracking-tighter sm:text-[12rem]">
          <GradientText from="from-indigo-500" via="via-purple-500" to="to-fuchsia-500">
            404
          </GradientText>
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Lost in the universe of videos
        </h2>

        <p className="mx-auto mt-4 max-w-md text-zinc-400">
          The page you're looking for has drifted away or never existed.
          Let's get you back on track.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button icon={Home}>Back to Home</Button>
          </Link>

          <Link to="/">
            <Button variant="secondary" icon={Compass}>
              Explore Videos
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
