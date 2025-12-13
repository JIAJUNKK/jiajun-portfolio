import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyWorkflow.scss";

const ease = [0.21, 0.47, 0.32, 0.98];

const CaseStudyWorkflow = ({ eyebrow, title, intro, steps = [] }) => {
    const items = useMemo(
        () =>
            steps.map((label, i) => ({
                id: `step-${i}`,
                label,
                index: i,
            })),
        [steps]
    );

    const [activeIndex, setActiveIndex] = useState(0);

    const total = items.length;
    const progress = total > 0 ? (activeIndex + 1) / total : 0;

    const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const goNext = () => setActiveIndex((i) => Math.min(total - 1, i + 1));

    return (
        <CaseStudySection className="case-study-workflow">
            <div className="case-study-workflow__header">
                <div className="case-study-workflow__header-top">
                    <div className="case-study-workflow__header-copy">
                        {eyebrow && <p className="case-study-eyebrow">{eyebrow}</p>}
                        {title && <h2>{title}</h2>}
                        {intro && <p className="case-study-workflow__intro">{intro}</p>}
                    </div>

                    {total > 1 && (
                        <div className="case-study-workflow__controls">
                            <button
                                type="button"
                                className="case-study-button case-study-workflow__nav"
                                onClick={goPrev}
                                disabled={activeIndex === 0}
                            >
                                Prev
                            </button>

                            <button
                                type="button"
                                className="case-study-button case-study-button--primary case-study-workflow__nav"
                                onClick={goNext}
                                disabled={activeIndex === total - 1}
                            >
                                Next
                            </button>

                            <div className="case-study-workflow__progress" aria-hidden="true">
                                <div className="case-study-workflow__progress-track" />
                                <motion.div
                                    className="case-study-workflow__progress-fill"
                                    initial={false}
                                    animate={{ scaleX: progress }}
                                    transition={{ duration: 0.45, ease }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ol className="case-study-workflow__steps">
                {items.map((item, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <li key={item.id} className="case-study-workflow__step">
                            <motion.button
                                type="button"
                                className={
                                    "case-study-card case-study-workflow__step-btn" +
                                    (isActive ? " is-active" : "")
                                }
                                onClick={() => setActiveIndex(index)}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ duration: 0.2, ease }}
                            >
                                <div className="case-study-workflow__step-left">
                                    <span className="case-study-workflow__badge">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* no trimming, no expand — just render it */}
                                    <span className="case-study-workflow__step-text">
                                        {item.label}
                                    </span>
                                </div>
                            </motion.button>
                        </li>
                    );
                })}
            </ol>
        </CaseStudySection>
    );
};

export default CaseStudyWorkflow;
