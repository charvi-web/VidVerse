import { motion } from "motion/react";

const orbs = [
  {
    size: 220,
    top: "12%",
    left: "8%",
    color: "bg-indigo-500/20",
    duration: 8,
  },
  {
    size: 170,
    top: "68%",
    left: "18%",
    color: "bg-cyan-500/20",
    duration: 10,
  },
  {
    size: 260,
    top: "18%",
    right: "10%",
    color: "bg-purple-500/20",
    duration: 9,
  },
  {
    size: 180,
    bottom: "10%",
    right: "20%",
    color: "bg-pink-500/20",
    duration: 11,
  },
];

const FloatingOrbs = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: orb.duration,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full blur-3xl ${orb.color}`}
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;