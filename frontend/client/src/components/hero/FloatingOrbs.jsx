import { motion } from "motion/react";

const orbs = [
  {
    size: 350,
    top: "5%",
    left: "-8%",
    color: "bg-indigo-500/30",
    duration: 12,
  },
  {
    size: 320,
    top: "20%",
    right: "-10%",
    color: "bg-purple-500/35",
    duration: 15,
  },
  {
    size: 260,
    bottom: "5%",
    left: "35%",
    color: "bg-cyan-400/25",
    duration: 18,
  },
];


const FloatingOrbs = () => {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
    >

      {orbs.map((orb,index)=>(
        <motion.div

          key={index}

          animate={{
            y:[0,-50,0],
            x:[0,30,0],
            scale:[1,1.08,1],
          }}

          transition={{
            duration:orb.duration,
            repeat:Infinity,
            ease:"easeInOut",
          }}

          className={`
            absolute
            rounded-full
            ${orb.color}
            blur-[120px]
          `}

          style={{
            width:orb.size,
            height:orb.size,
            top:orb.top,
            left:orb.left,
            right:orb.right,
            bottom:orb.bottom,
          }}

        />
      ))}

    </div>
  );
};


export default FloatingOrbs;