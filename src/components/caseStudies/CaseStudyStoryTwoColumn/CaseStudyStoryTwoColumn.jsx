import { useState } from "react";
import { motion } from "framer-motion";
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
    const cards = [
        leftBlock && { id: "left", ...leftBlock },
        rightBlock && { id: "right", ...rightBlock },
    ].filter(Boolean);

    const [activeIndex, setActiveIndex] = useState(0);

    const hasIntro =
        eyebrow || title || (introParagraphs && introParagraphs.length > 0);

    return (
        <CaseStudySection className={`case-study-story ${className}`}>
            <div className="case-study-story__layout">
                {/* LEFT: prose / story copy */}
                {hasIntro && (
                    <div className="case-study-story__prose">
                        {eyebrow && <p className="case-study-eyebrow">{eyebrow}</p>}
                        {title && <h2>{title}</h2>}
                        {introParagraphs.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>
                )}

                {/* RIGHT: stacked cards */}
                <div className="case-study-story__card-column">
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

                                    // 0 = active, 1 = just behind, 2 = further back...
                                    const relIndex =
                                        (index - activeIndex + total) % total;

                                    const depth = Math.min(relIndex, 3);
                                    const isActive = depth === 0;

                                    return (
                                        <motion.article
                                            key={card.id || index}
                                            className={
                                                "case-study-card case-study-story__card" +
                                                (isActive ? " is-active" : " is-back")
                                            }
                                            initial={false}
                                            animate={{
                                                // stack goes "up" behind the active card
                                                y: -depth * 20,
                                                scale: 1 - depth * 0.04,
                                                opacity: 1,
                                                boxShadow:
                                                    depth === 0
                                                        ? "0 18px 40px rgba(15,23,42,0.18)"
                                                        : "0 10px 26px rgba(15,23,42,0.08)",
                                            }}
                                            transition={cardTransition}
                                            style={{
                                                zIndex: total - depth,
                                            }}
                                        >
                                            {isActive && (
                                                <div className="case-study-story__block">
                                                    {card.title && <h3>{card.title}</h3>}
                                                    {card.body && <p>{card.body}</p>}
                                                    {Array.isArray(card.bullets) &&
                                                        card.bullets.length > 0 && (
                                                            <ul>
                                                                {card.bullets.map(
                                                                    (item, bulletIndex) => (
                                                                        <li key={bulletIndex}>{item}</li>
                                                                    )
                                                                )}
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
                </div>
            </div>
        </CaseStudySection>
    );
};

export default CaseStudyStoryTwoColumn;
