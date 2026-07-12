import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import HeroButtons from "./HeroButtons";
import ScrollIndicator from "./ScrollIndicator";
import FloatingOrbs from "./FloatingOrbs";

import AuroraBackground from "../common/AuroraBackground";
import FloatingParticles from "../common/FloatingParticles";
import MouseGlow from "../common/MouseGlow";

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden transition-all duration-500"
      style={{
        background: isDark
          ? "#050505"
          : "linear-gradient(180deg,#f8fafc 0%,#eef4ff 45%,#ffffff 100%)",
      }}
    >
      {/* Mouse Glow */}
      <MouseGlow />

      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AuroraBackground />
        <FloatingParticles />
        <FloatingOrbs />

        {/* Overlay */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isDark
              ? "rgba(0,0,0,0.32)"
              : "rgba(255,255,255,0.18)",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
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
          pt-24
          pb-20
          text-center
        "
      >
        <HeroContent />
        <HeroButtons />
        <HeroStats />
      </motion.div>

      <div className="relative z-20">
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;