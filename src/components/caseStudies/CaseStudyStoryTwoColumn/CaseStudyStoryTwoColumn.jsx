// src/components/caseStudies/CaseStudyStoryTwoColumn/CaseStudyStoryTwoColumn.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyStoryTwoColumn.scss";

const cardTransition = {
    duration: 0.4,
    ease: [0.21, 0.47, 0.32, 0.98],
};

const CaseStudyStoryTwoColumn = ({
    eyebrow,
    title,
    introParagraphs = [],
    leftBlock,
    rightBlock,
    className = "",
}) => {
    const cards = useMemo(
        () =>
            [
                leftBlock && { id: "left", ...leftBlock },
                rightBlock && { id: "right", ...rightBlock },
            ].filter(Boolean),
        [leftBlock, rightBlock]
    );

    const [activeIndex, setActiveIndex] = useState(0);

    // In-view trigger (Option C)
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { amount: 0.35, once: false });

    // Keep activeIndex safe if cards length changes
    useEffect(() => {
        if (activeIndex >= cards.length) setActiveIndex(0);
    }, [cards.length, activeIndex]);

    const hasIntro =
        eyebrow || title || (introParagraphs && introParagraphs.length > 0);

    return (
        <CaseStudySection className={`case-study-story ${className}`}>
            <div ref={sectionRef} className="case-study-story__layout">
                {/* LEFT: prose / story copy */}
                {hasIntro && (
                    <motion.div
                        className="case-study-story__prose"
                        initial={{ opacity: 0, x: -28 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
                        transition={{ duration: 0.55, ease: [0.19, 0.6, 0.22, 1] }}
                    >
                        {eyebrow && <p className="case-study-eyebrow">{eyebrow}</p>}
                        {title && <h2>{title}</h2>}
                        {introParagraphs.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </motion.div>
                )}

                {/* RIGHT: stacked cards */}
                <motion.div
                    className="case-study-story__card-column"
                    initial={{ opacity: 0, x: 28 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
                    transition={{
                        duration: 0.55,
                        delay: 0.06,
                        ease: [0.19, 0.6, 0.22, 1],
                    }}
                >
                    {cards.length > 1 && (
                        <div className="case-study-story__stack-toggle">
                            {cards.map((card, index) => (
                                <button
                                    key={card.id || index}
                                    type="button"
                                    className={
                                        "case-study-pill case-study-story__toggle-pill" +
                                        (activeIndex === index ? " is-active" : "")
                                    }
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <span className="case-study-story__toggle-label">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="case-study-story__card-shell" aria-live="polite">
                        {cards.length > 0 && (
                            <div className="case-study-story__card-stack">
                                {cards.map((card, index) => {
                                    const total = cards.length;
                                    const relIndex = (index - activeIndex + total) % total;

                                    const depth = Math.min(relIndex, 3);
                                    const isActive = depth === 0;

                                    return (
                                        <motion.article
                                            key={card.id || index}
                                            className={
                                                "case-study-card case-study-story__card" +
                                                (isActive ? " is-active" : " is-back")
                                            }
                                            // important: keep your stack animation logic
                                            initial={false}
                                            animate={{
                                                y: -depth * 20,
                                                scale: 1 - depth * 0.04,
                                                opacity: 1,
                                                boxShadow:
                                                    depth === 0
                                                        ? "0 18px 40px rgba(15,23,42,0.18)"
                                                        : "0 10px 26px rgba(15,23,42,0.08)",
                                            }}
                                            transition={cardTransition}
                                            style={{ zIndex: total - depth }}
                                        >
                                            {isActive && (
                                                <div className="case-study-story__block">
                                                    {card.title && <h3>{card.title}</h3>}
                                                    {card.body && <p>{card.body}</p>}
                                                    {Array.isArray(card.bullets) &&
                                                        card.bullets.length > 0 && (
                                                            <ul>
                                                                {card.bullets.map((item, bulletIndex) => (
                                                                    <li key={bulletIndex}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                </div>
                                            )}
                                        </motion.article>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </CaseStudySection>
    );
};

export default CaseStudyStoryTwoColumn;
