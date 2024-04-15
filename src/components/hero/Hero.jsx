import "./hero.scss";
import { motion } from "framer-motion";
import { textVariants } from "../../constants/motion";

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h1 variants={textVariants}>
            Full Stack Developer | Software Engineer 👋🏻
          </motion.h1>
          <motion.h3 variants={textVariants}>
            Hi, I'm Jia Jun. A passionate software engineering student from Malaysia 🇲🇾
          </motion.h3>
        </motion.div>
      </div>

      <motion.div 
        className="imageContainer" 
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        <img src="/hero.png" alt="" />
      </motion.div>
    </div>
  );
};

export default Hero;