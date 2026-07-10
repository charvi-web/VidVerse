import { useEffect, useState } from "react";
import { motion } from "motion/react";

const MouseGlow = () => {
  const [position, setPosition] = useState({
    x: -300,
    y: -300,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 180,
        y: position.y - 180,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 180,
      }}
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-0
        h-[360px]
        w-[360px]
        rounded-full
        bg-indigo-500/15
        blur-[120px]
      "
    />
  );
};

export default MouseGlow;