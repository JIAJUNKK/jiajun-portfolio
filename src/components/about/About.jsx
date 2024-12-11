import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { textVariants } from "../../constants/motion";

import "./about.scss";

const HighlightText = ({ highlightedContent }) => {
  const contentRef = useRef();

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["end center", "start start"]
  });

  const scrollValue = useTransform(scrollYProgress, [0, 0.01], ["100%", "0%"]);
  const clipPathVal = useMotionTemplate`inset(0% ${scrollValue} 0% 0%)`;

  return (
    <span className="text-container" ref={contentRef}>
      <motion.span 
        variants={textVariants}
        className="highlighted-text" 
        data-text={highlightedContent} 
      />
    </span>
  );
};
const About = () => {
  return (
    <div className="outer">

      <img src="/aboutMe-study.jpeg"></img>

      <div className="inner">
        <h1>About Me 👨🏻‍💻 </h1>
        <h2>Software Engineering Student</h2>
        <p>
          I am an undergraduate student aspiring to, {' '}
          <HighlightText highlightedContent={"secure internship opportunities"} /> 
          {' '}in the field of {' '} 
          <HighlightText highlightedContent={"software engineering and web development. "} /> 
          {' '}With expertise in, {' '}
          <HighlightText highlightedContent={"full stack development, "} /> 
          {' '}I am capable of {' '}
          <HighlightText highlightedContent={"delivering user-centric products"} /> 
          {' '} that prioritize user satisfaction while {' '}
          <HighlightText highlightedContent={"meeting the market needs."} /> 
          {' '} I'm currently seeking opportunities to apply my skills and hands-on experience to contribute effectively in real-world projects, 
          while continuously refining my skills in {' '}
          <HighlightText highlightedContent={"full-stack development and software design. "} /> 
          Let's connect to address potential challenges together and collaborate on exploring the latest tech trends.
        </p>
      </div>
      
      
    </div>
  );
};

export default About;
