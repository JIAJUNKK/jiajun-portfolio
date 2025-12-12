// src/components/caseStudies/CaseStudyHero/CaseStudyHero.jsx
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./CaseStudyHero.scss";

const renderCta = (cta, variant) => {
    if (!cta) return null;

    const className =
        variant === "primary"
            ? "fh-button fh-button--primary"
            : "fh-button fh-button--ghost";

    if (cta.external) {
        return (
            <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {cta.label}
            </a>
        );
    }

    return (
        <Link to={cta.href} className={className}>
            {cta.label}
        </Link>
    );
};

const CaseStudyHero = forwardRef(
    (
        {
            category,
            metaLine,
            title,
            lede,
            metaItems = [],
            stackIcons = [],          // <- NEW / UPDATED
            primaryCta,
            secondaryCta,
            heroImageSrc,
            heroImageAlt,
            heroImageMotionStyle,
        },
        ref
    ) => {
        const hasMeta =
            (metaItems && metaItems.length > 0) ||
            (stackIcons && stackIcons.length > 0);

        return (
            <header ref={ref} className="fh-hero">

                <div className="fh-hero-intro-wrapper">
                    <motion.div
                        className="fh-hero__tagline"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {category && (
                            <span className="fh-hero__category">{category}</span>
                        )}
                        {metaLine && (
                            <span className="fh-hero__meta">{metaLine}</span>
                        )}
                    </motion.div>

                    <motion.div
                        className="fh-hero__grid"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.08 }}
                    >
                        <div className="fh-hero__grid-left">
                            <div className="fh-hero__text">
                                {title && <h1>{title}</h1>}
                                {lede && <p className="fh-hero__lede">{lede}</p>}
                            </div>
                            <div className="fh-hero__ctas">
                                {renderCta(primaryCta, "primary")}
                                {renderCta(secondaryCta, "ghost")}
                            </div>
                        </div>

                        {hasMeta && (
                            <div className="fh-hero__meta-grid">
                                {metaItems.map((item) => (
                                    <div key={item.label}>
                                        <p className="fh-hero__label">
                                            {item.label}
                                        </p>
                                        <p className="fh-hero__value">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}

                                {stackIcons && stackIcons.length > 0 && (
                                    <div className="fh-hero__stack">
                                        <p className="fh-hero__label">Stack</p>
                                        <div className="fh-hero__stack-icons">
                                            {stackIcons.map((icon) => {
                                                // String form: "javascript" or "firebase.png"
                                                if (typeof icon === "string") {
                                                    const hasExt = icon.includes(".");
                                                    const filename = hasExt
                                                        ? icon
                                                        : `${icon}.svg`;
                                                    const src = `/techStack/${filename}`;
                                                    const baseName = hasExt
                                                        ? icon.split(".")[0]
                                                        : icon;

                                                    return (
                                                        <img
                                                            key={icon}
                                                            src={src}
                                                            alt={`${baseName} logo`}
                                                        />
                                                    );
                                                }

                                                // Object form: { src, alt?, key? }
                                                return (
                                                    <img
                                                        key={
                                                            icon.key ||
                                                            icon.src ||
                                                            icon.alt
                                                        }
                                                        src={icon.src}
                                                        alt={
                                                            icon.alt ||
                                                            icon.label ||
                                                            ""
                                                        }
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
                {heroImageSrc && (
                    <motion.div
                        className="fh-hero__image-wrap"
                        style={heroImageMotionStyle}
                    >
                        <div className="fh-hero__image-frame">
                            <img
                                src={heroImageSrc}
                                alt={heroImageAlt || title}
                            />
                        </div>
                    </motion.div>
                )}
            </header>
        );
    }
);

export default CaseStudyHero;
