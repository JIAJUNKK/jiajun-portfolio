import './app.scss';
import Navbar from './components/navBar/navbar';
import Hero from './components/hero/Hero';
import Parallax from './components/parallax/Parallax';
import About from './components/about/About';

const highlightedContent = [
  "secure internship opportunities",
  "full stack development, I'm capable of",
  "delivering user-centric products",
  "meeting the market needs.",
  "coding, software design, and full-stack development.",
  "connect",
];

const App = () => {
  return (
    <div>
      <section id="Homepage">
        <Navbar/>
        <Hero/>
      </section>

      <section id="About"><Parallax type="about"/></section>
      <section><About highlightedContent={highlightedContent} /></section>
      <section id="Experience"><Parallax type="experience"/></section>
      <section>Experience</section>
      <section id="Projects"><Parallax type="projects"/></section>

      <section>Portfolio1</section>
      <section>Portfolio2</section>
      <section>Portfolio3</section>
      <section>Contact</section>


    </div>
  );
};

export default App;
