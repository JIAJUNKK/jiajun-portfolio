import AboutSection from "../../aboutMe/AboutSection";
import SplitTextGsap from "../../../reactBitsComponent/SplitText/SplitTextGasp";
import "./WelcomePortfolio.scss";

const WelcomePortfolio = () => {
    return (
        <div className="welcome-portfolio-main">
            <AboutSection>
                <SplitTextGsap
                    text="Hello, welcome to my portfolio website!"
                    className="introduction-text"
                    from={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                    stagger={0.045}
                    start="top 85%"
                    end="bottom 55%"
                    ease="power3.out"
                />
            </AboutSection>

            {/** 
            <AboutSection>
                <About />
            </AboutSection>
            */}
        </div>
    );
};

export default WelcomePortfolio;
