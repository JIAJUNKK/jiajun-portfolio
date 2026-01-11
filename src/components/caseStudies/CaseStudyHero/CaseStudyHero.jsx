import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import "./CaseStudyHero.scss";

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mql = window.matchMedia(query);
        const onChange = (e) => setMatches(e.matches);

        if (mql.addEventListener) mql.addEventListener("change", onChange);
        else mql.addListener(onChange);

        return () => {
            if (mql.removeEventListener) mql.removeEventListener("change", onChange);
            else mql.removeListener(onChange);
        };
    }, [query]);

    return matches;
};

const renderCta = (cta, variant) => {
    if (!cta) return null;

    const className =
        variant === "primary"
            ? "case-study-button case-study-button--primary"
            : "case-study-button case-study-button--ghost";

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
            stackIcons = [],
            primaryCta,
            secondaryCta,

            heroImageSrc,
            heroImageAlt,
            heroImageSrcMobile,
            heroImageAltMobile,

            heroImageMotionStyle,
        },
        ref
    ) => {
        const isMobile = useMediaQuery("(max-width: 768px)");

        const imgSrc =
            isMobile && heroImageSrcMobile ? heroImageSrcMobile : heroImageSrc;

        const imgAlt =
            (isMobile && heroImageAltMobile ? heroImageAltMobile : heroImageAlt) ||
            title;

        const hasMeta =
            (metaItems && metaItems.length > 0) ||
            (stackIcons && stackIcons.length > 0);

        return (
            <header ref={ref} className="case-study-hero">
                <div className="case-study-hero__intro">
                    <m.div
                        className="case-study-hero__tagline"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {category && (
                            <span className="case-study-hero__category">
                                {category}
                            </span>
                        )}
                        {metaLine && (
                            <span className="case-study-hero__meta">
                                {metaLine}
                            </span>
                        )}
                    </m.div>

                    <m.div
                        className="case-study-hero__grid"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.08 }}
                    >
                        <div className="case-study-hero__grid-left">
                            <div className="case-study-hero__text">
                                {title && <h1>{title}</h1>}
                                {lede && (
                                    <p className="case-study-hero__lede">
                                        {lede}
                                    </p>
                                )}
                            </div>

                            <div className="case-study-hero__ctas">
                                {renderCta(primaryCta, "primary")}
                                {renderCta(secondaryCta, "ghost")}
                            </div>
                        </div>

                        {hasMeta && (
                            <div className="case-study-hero__meta-grid">
                                {metaItems.map((item) => (
                                    <div key={item.label}>
                                        <p className="case-study-hero__label">
                                            {item.label}
                                        </p>
                                        <p className="case-study-hero__value">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}

                                {stackIcons && stackIcons.length > 0 && (
                                    <div className="case-study-hero__stack">
                                        <p className="case-study-hero__label">
                                            Stack
                                        </p>
                                        <div className="case-study-hero__stack-icons">
                                            {stackIcons.map((icon) => {
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
                    </m.div>
                </div>

                {imgSrc && (
                    <m.div
                        className="case-study-hero__image-wrap"
                        style={heroImageMotionStyle}
                    >
                        <m.div
                            className="case-study-hero__image-frame"
                            style={{
                                borderRadius: heroImageMotionStyle?.borderRadius,
                                overflow: "hidden",
                            }}
                        >
                            <img src={imgSrc} alt={imgAlt} />
                        </m.div>
                    </m.div>
                )}
            </header>
        );
    }
);

export default CaseStudyHero;
