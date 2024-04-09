import { useRef, useState, useEffect } from "react";
import "./parallax.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const Parallax = ({ type }) => {
  const ref = useRef();
  const [hidePlanets, setHidePlanets] = useState(false); 
  const [aboutMeTextStyle, setAboutMeTextStyle] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const aboutMeText = useTransform(scrollYProgress, [0, 1], ["0%", "450%"]);
  const aboutMeTextSize = useTransform(scrollYProgress, [0, 0.5], ["100%", "80%"]);

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "750%"]);

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "110%"]);

  useEffect(() => {
    const threshold = 0.5; 
    const handleScroll = () => {
      if (scrollYProgress.current >= threshold) {
        setHidePlanets(true);
        setAboutMeTextStyle(true);

      } 
      else{
        setHidePlanets(false);

        setAboutMeTextStyle(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollYProgress]);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "visible";
    };
  }, []);


  return (
    <div
      className={`parallax ${hidePlanets ? "hide-planets" : ""}`}
      ref={ref}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(208,229,245,1) 35%, rgba(189,215,235,1) 100%)"
      }}
    >

      <motion.h1 
        className={
          type === "about" && aboutMeTextStyle ? "about-me-text" : ""
        }
        style={
          type === "about" ? { y: aboutMeText, scale: aboutMeTextSize} : { y: yText }}
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
