import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import "./about.scss";

const HighlightText = ({ highlightedContent }) => {
  const contentRef = useRef(); // Separate useRef for each instance

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["end center", "start start"]
  });

  const scrollValue = useTransform(scrollYProgress, [0, 0.1], ["100%", "0%"]);
  const clipPathVal = useMotionTemplate`inset(0% ${scrollValue} 0% 0%)`;

  return (
    <span className="text-container" ref={contentRef}>
      <motion.span
        style={{ clipPath: clipPathVal }}
        className={`highlighted-text`}
        data-text={highlightedContent}
      />
      <span className="static-text">{highlightedContent}</span>
    </span>
  );
};

const ScrollText = () => {
  return (
    <div className="outer">
      <div className="inner">
        <p>
          I am an undergraduate student aspiring to, {' '}
          <HighlightText highlightedContent={"secure internship opportunities"} /> 
          {' '}in the field of {' '} 
          <HighlightText highlightedContent={"software engineering and web development. "} /> 
          With expertise in, {' '}
          <HighlightText highlightedContent={"full stack development, "} /> 
          I am capable of {' '}
          <HighlightText highlightedContent={"delivering user-centric products"} /> 
          {' '} that prioritize user satisfaction while {' '}
          <HighlightText highlightedContent={"meeting the market needs."} /> 

          {' '} I'm currently seeking opportunities to apply my skills and hands-on experience to contribute effectively in real-world projects, 
          while continuously refining my skills in {' '}

          <HighlightText highlightedContent={"full-stack development and software design. "} /> 

          {' '}Let's {' '}
          <HighlightText highlightedContent={"connect"} /> 
          {' '}to address potential challenges together and collaborate on exploring the latest tech trends.
        </p>
      </div>
    </div>
  );
};

export default ScrollText;
