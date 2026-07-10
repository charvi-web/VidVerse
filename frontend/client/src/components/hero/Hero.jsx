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
      aria-label="Hero Section"
      className="relative min-h-screen overflow-hidden bg-[#09090B]"
    >
      {/* Mouse Glow */}
      <MouseGlow />

      {/* Aurora Background */}
      <AuroraBackground />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <HeroContent />

        <HeroButtons />

        <HeroStats />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;