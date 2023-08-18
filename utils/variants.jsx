
export const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? 300 : direction === 'right' ? -300 : 0,
      y: direction === 'up' ? 300 : direction === 'down' ? -300 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: [ 0.5,0.4,0.3,0.2]
      },
    },
  });
  export const staggerContainer = (staggerChildren, delayChildren) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });