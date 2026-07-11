export const slideIn = (
  direction = "left",
  delay = 0,
  duration = 0.6
) => {
  const offsets = {
    left: { x: -120 },
    right: { x: 120 },
    up: { y: 120 },
    down: { y: -120 },
  };
  const initial = offsets[direction] || offsets.left;

  return {
    hidden: {
      opacity: 0,
      ...initial,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};
