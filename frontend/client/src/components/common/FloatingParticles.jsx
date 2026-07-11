import { motion } from "motion/react";

const particles = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 8 + 8,
  delay: Math.random() * 3,
}));


const FloatingParticles = () => {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-10
        overflow-hidden
      "
    >

      {particles.map((particle)=>(

        <motion.span

          key={particle.id}

          className="
            absolute
            rounded-full
            bg-white/50
            shadow-[0_0_15px_rgba(255,255,255,0.8)]
          "

          style={{
            left:`${particle.left}%`,
            top:`${particle.top}%`,
            width:particle.size,
            height:particle.size,
          }}


          animate={{
            y:[0,-100,0],
            opacity:[0.2,1,0.2],
            scale:[1,1.5,1],
          }}


          transition={{
            duration:particle.duration,
            repeat:Infinity,
            delay:particle.delay,
            ease:"easeInOut",
          }}

        />

      ))}

    </div>
  );
};


export default FloatingParticles;