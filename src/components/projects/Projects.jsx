import { useRef } from "react";
import { Link } from "react-router-dom";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "../../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './projects.scss';

const Single = ({ project }) => {
    const ref = useRef();
    const liveDemoExist = (project.liveDemoLink && project.liveDemoLink !== "");
    const sourceCodeExist = (project.githubLink && project.githubLink !== "");
    const caseStudyExist = (project.type === "route" && project.to);

    const { scrollYProgress } = useScroll({
        target: ref,
    });

    const y = useTransform(scrollYProgress, [0, 1], [-390, 50]);

    return (
        <section className="project-section">
            <div className="container">
                <div className="wrapper">

                    <div className="imageContainer" ref={ref}>
                        <img src={project.img} alt="" />
                    </div>

                    <m.div className="textContainer" style={{ y }}>
                        {caseStudyExist ? (
                            <Link className="titleLink" to={project.to}>
                                <h2>{project.title}</h2>
                            </Link>
                        ) : (
                            <h2>{project.title}</h2>
                        )}

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
                            {caseStudyExist && (
                                <Link className="pillButton pillPrimary" to={project.to}>
                                    <span>View Details</span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </Link>
                            )}

                            {sourceCodeExist && (
                                <a className="pillButton pillGhost" href={project.githubLink} target="_blank" rel="noreferrer">
                                    <h3>Source Code {'</>'}</h3>
                                </a>
                            )}

                            {liveDemoExist && (
                                <a className="pillButton pillGhost" href={project.liveDemoLink} target="_blank" rel="noreferrer">
                                    <span>Live Demo</span>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                </a>
                            )}
                        </div>

                    </m.div>

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
                <m.div style={{ scaleX }} className="progressBar" />
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
