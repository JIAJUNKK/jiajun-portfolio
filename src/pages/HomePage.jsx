import useCoarsePointer from "../hooks/useCoarsePointer";

import ScrollVelocity from "../reactBitsComponent/ScrollVelocity/ScrollVelocity";
import WhatIDo from "../components/WhatIdo/WhatIDo";
import AboutMe from "../components/aboutMe/AboutMe";
import Contact from "../components/contact/Contact";
import Hero from "../components/hero/Hero";
import Experience from "../components/experience/Experience";
import Projects from "../components/projects/Projects";
import TechStack from "../components/techstack/TechStack";
// import Cursor from "../components/cursor/Cursor";

const HomePage = () => {
    const coarse = useCoarsePointer();

    return (
        <div>
            {/* Cursor is not useful on touch + often causes RAF/perf cost 
            {!coarse && <Cursor />}
            */}
            <section id="Home">
                <Hero />
                <TechStack />
            </section>

            <section id="What-I-Do">
                {/* ScrollVelocity is continuous animation → kill on touch */}
                {!coarse && (
                    <ScrollVelocity
                        texts={["What I Do", "Scroll Down"]}
                        velocity={50}
                        className="custom-scroll-text"
                    />
                )}
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

export default HomePage;
