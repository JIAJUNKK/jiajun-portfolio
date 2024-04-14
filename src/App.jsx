import { useEffect } from "react";
import "./app.scss";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Parallax from "./components/parallax/Parallax";
import Experience from "./components/experience/Experience";
import Projects from "./components/projects/Projects";

const App = () => {
  useEffect(() => {
    const scrollWithAnimation = (targetElement) => {
      targetElement.scrollIntoView({ behavior: "smooth" });
    };

    const links = document.querySelectorAll("a[href^='#']");

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute("href").slice(1);
        const targetElement = document.getElementById(targetId);
        scrollWithAnimation(targetElement);
      });
    });
  }, []);
  
  return (
    <div>
      <Cursor />
      <section id="Home">
        <Navbar />
        <Hero />
      </section>
      <section id="About">
        <Parallax type="about" />
      </section>
      <section>
        <About/>
      </section>
      <section id="Experience">
        <Parallax type="experience" />
      </section>
        <Experience />

      <section id="Projects">
        <Parallax type="projects" />
      </section>

        <Projects/>
      
      <section id="Contact">
        <Contact />
      </section>

    </div>
  );
};

export default App;
