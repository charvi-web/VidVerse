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


export const fadeIn = (
  direction = "up",
  delay = 0,
  duration = 0.8
) => {

  const directions = {
    up: { x:0, y:50 },
    down:{ x:0, y:-50 },
    left:{ x:50, y:0 },
    right:{ x:-50, y:0 },
  };


  return {
    hidden:{
      opacity:0,
      scale:0.96,
      filter:"blur(8px)",
      ...directions[direction],
    },

    show:{
      opacity:1,
      scale:1,
      filter:"blur(0px)",
      x:0,
      y:0,

      transition:{
        delay,
        duration,
        ease:[0.25,0.1,0.25,1],
      },
    },
  };
};


export const slideIn = (
  direction="left",
  delay=0,
  duration=0.8
)=>{

  const directions={
    left:{x:-120},
    right:{x:120},
    up:{y:120},
    down:{y:-120},
  };


  return {
    hidden:{
      opacity:0,
      ...directions[direction],
    },

    show:{
      opacity:1,
      x:0,
      y:0,
      transition:{
        delay,
        duration,
        ease:"easeOut",
      },
    },
  };
};