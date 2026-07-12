import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

const MouseGlow = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [position, setPosition] = useState({
    x: -500,
    y: -500,
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
        x: position.x - 220,
        y: position.y - 220,
      }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 28,
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[440px] w-[440px] rounded-full blur-[150px] md:block"
      style={{
        background: isDark
          ? "radial-gradient(circle, rgba(99,102,241,.22) 0%, rgba(168,85,247,.14) 45%, rgba(34,211,238,.06) 100%)"
          : "radial-gradient(circle, rgba(99,102,241,.16) 0%, rgba(168,85,247,.12) 45%, rgba(34,211,238,.05) 100%)",
      }}
    />
  );
};

export default MouseGlow;