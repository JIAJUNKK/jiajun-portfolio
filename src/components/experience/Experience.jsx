import "./experience.scss";
import { experiences } from "../../constants";
import useCoarsePointer from "../../hooks/useCoarsePointer";

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const ExperienceCard = ({ experience, visible = false }) => {
    return (

        <VerticalTimelineElement
            className="experience-card"
            visible={visible}
            contentStyle={{
                background: "white",
                color: "#011f4b",
                border: '3px solid #011f4b'
            }}

            contentArrowStyle={{ borderRight: "10px solid #011f4b" }}
            date={
                experience.date
            }
            dateClassName={"experience-date"}
            iconStyle={{ background: experience.iconBg }}
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
                <h4>{experience.title}</h4>
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
    const coarse = useCoarsePointer();

    return (
        <div className="experience">
            <div className="experience-header">
                <p>Things I have done so far ✅</p>
                <h1>Experience</h1>
            </div>
            <div className="vertical-time-line">
                <VerticalTimeline
                    animate={!coarse}
                    lineColor={'black'}
                >
                    {experiences.map((experience, index) => (
                        <ExperienceCard
                            key={`experience-${index}`}
                            experience={experience}
                            visible={coarse}
                        />
                    ))}
                </VerticalTimeline>
            </div>
        </div>
    );
};

export default Experience;
