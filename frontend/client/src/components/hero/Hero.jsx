import { motion } from "motion/react";

import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import HeroButtons from "./HeroButtons";
import ScrollIndicator from "./ScrollIndicator";
import FloatingOrbs from "./FloatingOrbs";

import AuroraBackground from "../common/AuroraBackground";
import FloatingParticles from "../common/FloatingParticles";
import MouseGlow from "../common/MouseGlow";


const Hero = () => {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050505]
      "
    >

      {/* Mouse glow */}
      <MouseGlow />


      {/* Background */}
      <div
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >

        <AuroraBackground />

        <FloatingParticles />

        <FloatingOrbs />


        <div
          className="
            absolute
            inset-0
            bg-black/20
          "
        />

      </div>



      {/* Main Content */}

      <motion.div

        initial="hidden"

        animate="show"

        variants={{
          hidden:{},

          show:{
            transition:{
              staggerChildren:0.2
            }
          }
        }}

        className="
          relative
          z-20
          mx-auto
          flex
          min-h-screen
          max-w-6xl
          flex-col
          items-center
          justify-center
          gap-8
          px-6
          pt-20
          text-center
        "
      >

        <HeroContent />

        <HeroButtons />

        <HeroStats />

      </motion.div>



      <ScrollIndicator />


    </section>
  );
};


export default Hero;