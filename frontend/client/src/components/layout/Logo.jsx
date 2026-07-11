import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Logo = ({ size = 48 }) => {
  return (
    <Link to="/" aria-label="VIDVERSE Home">
      <motion.div
        whileHover={{
          scale: 1.06,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
        }}
        className="flex cursor-pointer select-none items-center gap-3"
      >
        {/* Icon */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: size,
            height: size,
          }}
        >

          {/* Outer Aura */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-[-6px]
              rounded-full
              bg-gradient-to-r
              from-indigo-500
              via-purple-500
              to-cyan-400
              opacity-40
              blur-lg
            "
          />


          {/* Inner Glow */}
          <motion.div
            animate={{
              scale:[1,1.25,1],
              opacity:[0.25,0.6,0.25]
            }}
            transition={{
              duration:3,
              repeat:Infinity,
            }}
            className="
              absolute
              inset-0
              rounded-full
              bg-purple-500
              blur-xl
            "
          />


          <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            fill="none"
            className="relative z-10"
          >

            {/* Glass Circle */}
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="rgba(24,24,27,0.8)"
              stroke="url(#grad)"
              strokeWidth="4"
            />


            {/* Play */}
            <path
              d="
              M50 40
              L86 60
              L50 80
              Z
              "
              fill="url(#play)"
            />


            {/* Orbit */}
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              stroke="#22D3EE"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="8 12"
              animate={{
                rotate:360
              }}
              transition={{
                duration:10,
                repeat:Infinity,
                ease:"linear"
              }}
            />


            <defs>

              <linearGradient id="grad">
                <stop stopColor="#6366F1"/>
                <stop offset="1" stopColor="#22D3EE"/>
              </linearGradient>


              <linearGradient id="play">
                <stop stopColor="#A855F7"/>
                <stop offset="1" stopColor="#22D3EE"/>
              </linearGradient>

            </defs>

          </svg>

        </div>


        {/* Brand */}
        <div className="leading-tight">

          <h1
            className="
            text-2xl
            font-black
            tracking-tight
            bg-gradient-to-r
            from-white
            via-indigo-300
            to-cyan-400
            bg-clip-text
            text-transparent
            "
          >
            VIDVERSE
          </h1>


          <p
            className="
            hidden
            text-xs
            text-zinc-400
            sm:block
            "
          >
            Where Every Video Finds Its Universe.
          </p>

        </div>

      </motion.div>
    </Link>
  );
};

export default Logo;