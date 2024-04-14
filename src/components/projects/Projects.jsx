import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "../../constants";
import './projects.scss';

const Single = ({ project }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section class="project-section">
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={project.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{y}}>
            <h2>{project.title}</h2>

            <ul>
              {project.description.map((desc, index) => (
                <li
                  key={`project-desc-${index}`}
                  className=''
                >
                  {desc}
                </li>
              ))}
            </ul>      

            <a className="source-code-button-container" href={project.githubLink} target="_blank">
              <div className="source-code-button">
                  <img src="/github.svg"></img>
              </div>    
              <h3>View Source Code {'</>'}</h3>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Projects</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>

      <div>
        {projects.map((project) => (
          <Single project={project} key={project.id} />
        ))}
      </div>
    </div>


  );
};

export default Projects;
