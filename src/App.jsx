import { useEffect } from "react";
import "./app.scss";
import About from "./components/about/About";
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
        <TechStack/>
      </section>

      <section id="About">
        <About/>
      </section>

      <section id="Experience">
        <Experience />
      </section>

      <Projects/>
      
      <section id="Contact">
        <Contact />
      </section>

    </div>
  );
};

export default App;
