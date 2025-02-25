import AboutSection from "./AboutSection";
import About from "./About"
import SplitText from "../../reactBitsComponent/SplitText/SplitText";
import "./aboutMe.scss";

const AboutMe = () => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  return (
    <div className="about-us">
      <AboutSection>
        <SplitText
          text="Hello, welcome to my portfolio website!"
          className="introduction-text"
          delay={50}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />      
      </AboutSection>

      <AboutSection>
        <About/>
      </AboutSection>
    </div>
  );
};

export default AboutMe;
