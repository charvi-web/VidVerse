export const staggerContainer = (
  staggerChildren = 0.15,
  delayChildren = 0
) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerFast = staggerContainer(0.08);

export const staggerSlow = staggerContainer(0.25);