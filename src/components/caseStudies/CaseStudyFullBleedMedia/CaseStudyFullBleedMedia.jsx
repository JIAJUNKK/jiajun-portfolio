import { motion } from "framer-motion";
import "./CaseStudyFullBleedMedia.scss";

const CaseStudyFullBleedMedia = ({ children, caption, className = "" }) => {
    return (
        <motion.figure
            className={`case-study-fullbleed ${className}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.19, 0.6, 0.22, 1] }}
        >
            <div className="case-study-fullbleed__frame">{children}</div>

            {caption && (
                <figcaption className="case-study-fullbleed__caption">
                    {caption}
                </figcaption>
            )}
        </motion.figure>
    );
};

export default CaseStudyFullBleedMedia;
