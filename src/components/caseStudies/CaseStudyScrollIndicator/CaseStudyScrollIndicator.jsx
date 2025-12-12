// src/components/caseStudies/CaseStudyScrollIndicator/CaseStudyScrollIndicator.jsx
import { motion, useScroll } from "framer-motion";
import "./CaseStudyScrollIndicator.scss";

const CaseStudyScrollIndicator = () => {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div className="fh-scroll-indicator" aria-hidden="true">
            <div className="fh-scroll-indicator__track" />
            <motion.div
                className="fh-scroll-indicator__thumb"
                style={{ scaleY: scrollYProgress }}
            />
        </motion.div>
    );
};

export default CaseStudyScrollIndicator;
