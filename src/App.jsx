import "./app/base.scss";
import WelcomePortfolio from "./components/parallax/WelcomePortfolio/WelcomePortfolio";
import ScrollVelocity from "./reactBitsComponent/ScrollVelocity/ScrollVelocity";

import WhatIDo from "./components/WhatIdo/WhatIDo";
import AboutMe from "./components/aboutMe/AboutMe";
import Contact from "./components/contact/Contact";
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Experience from "./components/experience/Experience";
import Projects from "./components/projects/Projects";
import TechStack from "./components/techstack/TechStack";

const App = () => {
    return (
        <div>
            <Cursor />
            <section id="Home">
                <Navbar />
                <Hero />
                <TechStack />
            </section>

            {/** 
            <section>
                <WelcomePortfolio />
            </section>
            */}



            <section id="What-I-Do">
                <ScrollVelocity
                    texts={['What I Do', 'Scroll Down']}
                    velocity={50}
                    className="custom-scroll-text"
                />
                <WhatIDo />
            </section>

            <section id="Experience">
                <Experience />
            </section>

            <section id="Projects">
                <Projects />
            </section>

            <section id="About">
                <AboutMe />
            </section>

            <section id="Contact">
                <Contact />
            </section>

        </div>
    );
};

export default App;
