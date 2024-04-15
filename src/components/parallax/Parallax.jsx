import { useRef } from "react";
import "./parallax.scss";
import { motion, useScroll, useTransform } from "framer-motion";


const Parallax = ({ type }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });


  const aboutMeText = useTransform(scrollYProgress, [0, 1], ["0%", "420%"]);
  const experienceText = useTransform(scrollYProgress, [0, 1], ["0%", "400%"]);
  const projectsText = useTransform(scrollYProgress, [0, 1], ["0%", "250%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const textMotion = (type) =>{
    if (type === "about"){
      return aboutMeText
    }else if (type === "experience"){
      return experienceText
    }else if (type === "projects"){
      return projectsText
    }
  }

  return (
    <div
      className="parallax"
      ref={ref}
      style={{background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(208,229,245,1) 35%, rgba(189,215,235,1) 100%)"}}
    >
      <motion.h1 
        style={{ y: textMotion(type)}}
      >
        {type === "about" && "About Me"}
        {type === "experience" && "Experience"}
        {type === "projects" && "Projects"}
      </motion.h1>
      
      <motion.div className="mountains"></motion.div>
      <motion.div
        className="planets"
        style={{
          y: yBg,
          backgroundImage: `url(${
            type === "about" ? "/planets.png" : "/sun.png"
          })`,
        }}
      ></motion.div>
      <motion.div style={{ x: yBg }} className="stars"></motion.div>
    </div>
  );
};

export default Parallax;
