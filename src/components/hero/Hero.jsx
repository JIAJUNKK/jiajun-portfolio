import "./hero.scss";
import CircularText from "../../reactBitsComponent/CircularText/CircularText";
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
            Full Stack Developer 👋🏻
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
        <CircularText
          text="JIAJUN**JIAJUN**"
          onHover="slowDown"
          spinDuration={15}
          className="circular-text"
        />
        <img src="/hero.png" alt="" />
      </motion.div>
    </div>
  );
};

export default Hero;