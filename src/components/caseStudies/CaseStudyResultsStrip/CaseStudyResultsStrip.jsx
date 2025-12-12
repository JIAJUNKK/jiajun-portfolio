// src/components/caseStudies/CaseStudyResultsStrip/CaseStudyResultsStrip.jsx
import { motion } from "framer-motion";
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyResultsStrip.scss";

const clamp01 = (n) => Math.max(0, Math.min(1, n));

const renderGraph = (graph) => {
    if (!graph) return null;

    const type = graph.type || "bar";

    if (type === "bar") {
        const progress = clamp01(graph.progress ?? 1);
        const width = `${Math.round(progress * 100)}%`;

        return (
            <div className="fh-results__graph fh-results__graph--bar">
                <div className="fh-results__bar-track">
                    <div
                        className="fh-results__bar-fill"
                        style={{ "--fh-bar-progress": width }}
                    />
                </div>
            </div>
        );
    }

    if (type === "spark") {
        const count = graph.bars ?? 6;

        return (
            <div className="fh-results__graph fh-results__graph--spark">
                <div className="fh-results__spark">
                    {Array.from({ length: count }).map((_, index) => (
                        <motion.span
                            key={index}
                            className="fh-results__spark-bar"
                            initial={{ scaleY: 0.4, opacity: 0.4 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8 + index * 0.12,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: index * 0.05,
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // "pulse" or unknown types – nice for non-quantifiable results
    return (
        <div className="fh-results__graph fh-results__graph--pulse">
            <motion.div
                className="fh-results__pulse"
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
            >
                <span />
            </motion.div>
        </div>
    );
};

const CaseStudyResultsStrip = ({ eyebrow, title, intro, stats = [] }) => {
    return (
        <CaseStudySection className="fh-results">
            <div className="fh-results__layout">
                {/* LEFT – stacked big figures + graphs */}
                <motion.div
                    className="fh-results__left"
                    initial={{ opacity: 0, x: -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.19, 0.6, 0.22, 1] }}
                >
                    {eyebrow && (
                        <p className="fh-eyebrow fh-results__eyebrow">
                            {eyebrow}
                        </p>
                    )}

                    <div className="fh-results__figures">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="fh-results__item"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.06,
                                    ease: [0.19, 0.6, 0.22, 1],
                                }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="fh-results__head">
                                    <p className="fh-results__value">
                                        {stat.value}
                                    </p>
                                    {stat.badge && (
                                        <span className="fh-results__badge">
                                            {stat.badge}
                                        </span>
                                    )}
                                </div>

                                {stat.label && (
                                    <p className="fh-results__label">
                                        {stat.label}
                                    </p>
                                )}

                                {renderGraph(stat.graph)}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT – headline + paragraph, like Tim Hortons screenshot */}
                <motion.div
                    className="fh-results__right"
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.08,
                        ease: [0.19, 0.6, 0.22, 1],
                    }}
                >
                    {title && (
                        <h2 className="fh-results__title">
                            {title}
                        </h2>
                    )}

                    {intro && (
                        <p className="fh-results__text">
                            {intro}
                        </p>
                    )}
                </motion.div>
            </div>
        </CaseStudySection>
    );
};

export default CaseStudyResultsStrip;
