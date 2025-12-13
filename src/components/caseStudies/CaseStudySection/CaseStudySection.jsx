// src/components/caseStudies/CaseStudySection/CaseStudySection.jsx
import { motion } from "framer-motion";
import "./CaseStudySection.scss";

const CaseStudySection = ({ className = "", children }) => {
    return (
        <motion.section
            className={`case-study-section ${className}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.19, 0.6, 0.22, 1] }}
        >
            {children}
        </motion.section>
    );
};

export default CaseStudySection;
