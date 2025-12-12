// src/components/caseStudies/CaseStudyResultsStrip/CaseStudyResultsStrip.jsx
import { motion } from "framer-motion";
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyResultsStrip.scss";

const CaseStudyResultsStrip = ({ eyebrow, title, intro, stats = [] }) => {
    return (
        <CaseStudySection className="fh-results">
            <div className="fh-results__intro">
                {eyebrow && <p className="fh-eyebrow">{eyebrow}</p>}
                {title && <h2>{title}</h2>}
                {intro && <p>{intro}</p>}
            </div>

            <div className="fh-results__band">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="fh-results__stat"
                        whileHover={{ y: -4 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 22,
                        }}
                    >
                        <p className="fh-results__value">{stat.value}</p>
                        <p className="fh-results__label">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </CaseStudySection>
    );
};

export default CaseStudyResultsStrip;
