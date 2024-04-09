export const textVariants = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
}

export const textVariantsY = {
    initial: {
        y: 500,
        opacity: 0,
      },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 1.5,
          staggerChildren: 0.1,
        },
      },
};
  


export default {textVariants, textVariantsY};