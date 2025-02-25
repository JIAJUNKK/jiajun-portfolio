import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelTransition from "../../reactBitsComponent/PixelTransitionCard/PixelTransition";
import "./about.scss";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef(null);

  const highlightImportantWords = (text, wordsToHighlight) => {
    let result = [];
    let lastIndex = 0;
  
    wordsToHighlight.forEach((phrase, i) => {
      const matchIndex = text.indexOf(phrase, lastIndex);
  
      if (matchIndex !== -1) {
        // Push text before the matched phrase
        result.push(text.substring(lastIndex, matchIndex));
  
        // Highlight the phrase (split by space if you want each word in its own <span>)
        const words = phrase.split(" ").map((word, index, arr) => (
          <span
            key={`${i}-${index}`}
            className="highlight-effect"
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {word}
            {index < arr.length - 1 ? "\u00A0" : ""} 
          </span>
        ));
  
        result.push(...words);
        lastIndex = matchIndex + phrase.length;
      }
    });
  
    // Push any remaining text after the last match
    result.push(text.substring(lastIndex));
  
    return result;
  };
  
  
  useEffect(() => {
    const el = textRef.current;
    const textSpans = el.querySelectorAll(".highlight-effect");

    gsap.fromTo(
      textSpans,
      { clipPath: "inset(0 150% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)", 
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.05, // Apply animation to each span with a delay
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);


  return (
    <div className="outer">
      <PixelTransition
        firstContent={
          <img
            src="/aboutMe-study.jpg"
            alt="default pixel transition content"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
        secondContent={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              backgroundColor: "#415a77",
              padding: "10px",
            }}
          >
            <p style={{ fontWeight: 900, fontSize: "1rem", color: "#ffffff" }}>
              My Favourite Picture on Pinterest
            </p>
          </div>
        }
        gridSize={20}
        pixelColor="#ffffff"
        animationStepDuration={0.4}
        className="image-container"
        aspectRatio="150%"
      />

      <div className="text-container" ref={textRef}>
        <h1>About Me 👨🏻‍💻</h1>
        <h2>Software Engineering Student</h2>

        <p ref={textRef}>
          {highlightImportantWords(
            `
            I am an undergraduate student aspiring to secure job opportunities in software engineering and web development. 
            With expertise in full-stack development, I create user-centric products that enhance user experience while meeting market needs. 
            My skills include React.js, Vue.js, Node.js, Firebase, and MongoDB, allowing me to develop scalable and efficient applications. 
            I have experience in building e-commerce platforms with secure payment integrations and community-driven applications. 
            I am currently seeking opportunities to apply my expertise in real-world projects, focusing on modern web technologies and scalable system architectures. 
            Let's connect to tackle challenges and explore the latest advancements in technology.
            `,
            [
              "secure job opportunities",
              "software engineering",
              "web development",
              "full-stack development",
              "user-centric products",
              "meeting market needs",
              "React.js",
              "Vue.js",
              "Node.js",
              "Firebase",
              "MongoDB",
              "scalable and efficient applications",
              "e-commerce platforms",
              "secure payment integrations",
              "community-driven applications",
              "modern web technologies",
              "scalable system architectures",
            ]
          )}
        </p>


      </div>
    </div>
  );
};

export default About;
