import "./hero.scss";
import { motion } from "framer-motion";
import { textVariants } from "../../constants/motion";
import TechStack from "../techstack/TechStack";

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
          <motion.h2 variants={textVariants}>KONG JIA JUN</motion.h2>
          <motion.h1 variants={textVariants}>
            Full Stack Developer | Software Engineer 👋🏻
          </motion.h1>
          <motion.h3 variants={textVariants}>
            Hi, I'm Jia Jun. A passionate software engineering from Malaysia 🇲🇾
          </motion.h3>
          <br></br>

          <TechStack/>

        </motion.div>
      </div>
      
      <div className="imageContainer">
        <img src="/hero.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;