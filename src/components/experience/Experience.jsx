import { useRef } from "react";
import "./experience.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { experiences} from "../../constants";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      className="experience-card"
      contentStyle={{
        background: "white",
        color: "#011f4b",
        border: '3px solid #011f4b'
      }}

      contentArrowStyle={{ borderRight: "10px solid #011f4b" }}
      date={
        experience.date
      }
      iconStyle={{ background: experience.iconBg}}
      icon={
        <div className='icon'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="icon-image"
          />
        </div>
      }
    >
      <div className="experience-card-header">
        <h3>{experience.title}</h3>
        <p>{experience.company_name}</p>
      </div>

      <ul>
        {experience.description.map((desc, index) => (
          <li
            key={`experience-desc-${index}`}
            className=''
          >
            {desc}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
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
    <div className="experience">
      <div className="progress">
        <h1>Experience</h1>
      </div>

      <div className=''>
        <VerticalTimeline
            lineColor= {'black'}
        >
          
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;
