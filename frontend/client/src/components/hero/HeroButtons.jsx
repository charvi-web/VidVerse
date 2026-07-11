import { motion } from "motion/react";
import { Play, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";


const HeroButtons = () => {

  const navigate = useNavigate();


  return (
    <motion.div
      initial={{
        opacity:0,
        y:25
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        delay:0.55,
        duration:0.6
      }}

      className="
        mt-10
        flex
        flex-wrap
        items-center
        justify-center
        gap-4
      "
    >


      {/* Primary Button */}

      <motion.button

        whileHover={{
          y:-4,
          scale:1.05
        }}

        whileTap={{
          scale:0.95
        }}

        onClick={()=>{
          navigate("/watch");
        }}

        className="
          group
          relative
          flex
          items-center
          gap-3
          overflow-hidden
          rounded-xl
          bg-white
          px-8
          py-4
          font-semibold
          text-black
          shadow-[0_0_40px_rgba(255,255,255,0.15)]
        "
      >

        <Play
          size={17}
          fill="currentColor"
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />

        <span>
          Start Watching
        </span>


      </motion.button>




      {/* Secondary Button */}

      <motion.button

        whileHover={{
          y:-4,
          scale:1.05
        }}

        whileTap={{
          scale:0.95
        }}

        onClick={()=>{
          document
          .getElementById("explore")
          ?.scrollIntoView({
            behavior:"smooth"
          });
        }}

        className="
          group
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-white/15
          bg-white/[0.05]
          px-8
          py-4
          font-semibold
          text-white
          backdrop-blur-xl
          transition-all
          hover:border-white/40
          hover:bg-white/10
        "
      >

        <Compass
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:rotate-12
          "
        />

        Explore

      </motion.button>


    </motion.div>
  );
};


export default HeroButtons;