import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import "./CaseStudyFooterCta.scss";

const ease = [0.21, 0.47, 0.32, 0.98];

const CaseStudyFooterCta = ({
    title = "Thinking about similar work?",
    text = "I'm interested in more projects that sit between frontend, content and workflow design.",
    primaryLabel = "View the live site",
    primaryHref,
    secondaryLabel = "Talk about a project",
    secondaryTo = "/#Contact",
    badge = "Available for projects",
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.35, once: false });

    const variants = useMemo(
        () => ({
            wrap: {
                hidden: { opacity: 0, y: 24 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease, staggerChildren: 0.07 },
                },
            },
            item: {
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
            },
        }),
        []
    );

    return (
        <motion.footer
            ref={ref}
            className="cs-footer-cta"
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={variants.wrap}
        >
            {/* Ambient layers */}
            <div className="cs-footer-cta__bg" aria-hidden="true">
                <motion.span
                    className="cs-footer-cta__orb cs-footer-cta__orb--a"
                    initial={false}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                />
                <motion.span
                    className="cs-footer-cta__orb cs-footer-cta__orb--b"
                    initial={false}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.35, ease, delay: 0.06 }}
                />
                <motion.span
                    className="cs-footer-cta__orb cs-footer-cta__orb--c"
                    initial={false}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.35, ease, delay: 0.12 }}
                />

                <motion.span
                    className="cs-footer-cta__sheen"
                    initial={{ x: "-35%", opacity: 0 }}
                    animate={inView ? { x: "35%", opacity: 1 } : { x: "-35%", opacity: 0 }}
                    transition={{ duration: 1.35, ease }}
                />

                {/* subtle grain so glass doesn’t look flat */}
                <span className="cs-footer-cta__grain" />
            </div>

            <div className="cs-footer-cta__inner">
                <motion.div className="cs-footer-cta__copy" variants={variants.item}>
                    {badge && (
                        <span className="cs-footer-cta__badge">
                            {badge}
                        </span>
                    )}

                    <h3 className="cs-footer-cta__title">{title}</h3>
                    <p className="cs-footer-cta__text">{text}</p>
                </motion.div>

                <motion.div className="cs-footer-cta__actions" variants={variants.item}>
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                        <Link to={secondaryTo} className="fh-button fh-button--ghost">
                            {secondaryLabel}
                        </Link>
                    </motion.div>

                    {primaryHref && (
                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                            <a
                                href={primaryHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fh-button fh-button--primary cs-footer-cta__primary"
                            >
                                {primaryLabel}
                                <span className="cs-footer-cta__arrow" aria-hidden="true">
                                    ↗
                                </span>
                            </a>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default CaseStudyFooterCta;
