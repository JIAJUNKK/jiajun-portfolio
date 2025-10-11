import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "../../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import './projects.scss';

const Single = ({ project }) => {
    const ref = useRef();
    const liveDemoExist = (project.liveDemoLink && project.liveDemoLink !== "");
    const sourceCodeExist = (project.githubLink && project.githubLink !== "");

    const { scrollYProgress } = useScroll({
        target: ref,
    });

    const y = useTransform(scrollYProgress, [0, 1], [-390, 200]);

    return (
        <section className="project-section">
            <div className="container">
                <div className="wrapper">

                    <div className="imageContainer" ref={ref}>
                        <img src={project.img} alt="" />
                    </div>

                    <motion.div className="textContainer" style={{ y }}>
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

                        <div className="button-container">
                            {sourceCodeExist && (
                                <a className="source-code-button-container" href={project.githubLink} target="_blank">
                                    <h3>Source Code {'</>'}</h3>
                                </a>
                            )}

                            {liveDemoExist && (
                                <a className="source-code-button-container" href={project.liveDemoLink} target="_blank">
                                    <h3>Live Demo <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></h3>
                                </a>
                            )}
                        </div>

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
        <div id="Projects" className="portfolio" ref={ref}>
            <div id="projects-sentinel" aria-hidden="true" />
            <div className="progress">
                <h1>Projects</h1>
                <motion.div style={{ scaleX }} className="progressBar" />
            </div>

            <div className="list">   {/* <- add class */}
                {projects.map((project) => (
                    <Single project={project} key={project.id} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
