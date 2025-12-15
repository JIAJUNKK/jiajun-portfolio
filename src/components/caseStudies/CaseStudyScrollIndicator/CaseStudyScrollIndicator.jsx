// src/components/caseStudies/CaseStudyScrollIndicator/CaseStudyScrollIndicator.jsx
import { m, useScroll } from "framer-motion";
import "./CaseStudyScrollIndicator.scss";

const CaseStudyScrollIndicator = () => {
    const { scrollYProgress } = useScroll();

    return (
        <m.div className="case-study-scroll-indicator" aria-hidden="true">
            <div className="case-study-scroll-indicator__track" />
            <m.div
                className="case-study-scroll-indicator__thumb"
                style={{ scaleY: scrollYProgress }}
            />
        </m.div>
    );
};

export default CaseStudyScrollIndicator;
