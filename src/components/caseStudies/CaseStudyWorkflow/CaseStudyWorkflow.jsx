import { useMemo, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
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

    // Option C: trigger on enter + reset on leave
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.35, once: false });

    return (
        <CaseStudySection className="case-study-workflow">
            <div ref={ref}>
                <m.div
                    className="case-study-workflow__header"
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                    transition={{ duration: 0.7, ease: [0.19, 0.6, 0.22, 1] }}
                >
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
                                    <m.div
                                        className="case-study-workflow__progress-fill"
                                        initial={false}
                                        animate={{ scaleX: progress }}
                                        transition={{ duration: 0.45, ease }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </m.div>

                <m.ol
                    className="case-study-workflow__steps"
                    initial={{ opacity: 0, y: 22 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.06,
                        ease: [0.19, 0.6, 0.22, 1],
                    }}
                >
                    {items.map((item, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <li key={item.id} className="case-study-workflow__step">
                                <m.button
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

                                        <span className="case-study-workflow__step-text">
                                            {item.label}
                                        </span>
                                    </div>
                                </m.button>
                            </li>
                        );
                    })}
                </m.ol>
            </div>
        </CaseStudySection>
    );
};

export default CaseStudyWorkflow;
