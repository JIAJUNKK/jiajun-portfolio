import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyImageSwitcher.scss";

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

const CaseStudyImageSwitcher = ({ images = [], caption }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const isMobile = useMediaQuery("(max-width: 768px)");

    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.3, once: false });

    if (!images || images.length === 0) return null;

    const active = images[activeIndex] || images[0];

    const getSrc = (img) => {
        if (!img) return "";
        if (isMobile && img.srcMobile) return img.srcMobile;
        return img.src;
    };

    const getAlt = (img) => {
        if (!img) return "";
        if (isMobile && img.altMobile) return img.altMobile;
        return img.alt || img.label || "";
    };

    return (
        <CaseStudySection>
            <motion.figure
                ref={ref}
                className="case-study-image-switcher"
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 1, ease: [0.19, 0.6, 0.22, 1] }}
            >
                <div className="case-study-image-switcher__inner">
                    <div className="case-study-image-switcher__content">
                        {/* LEFT – image stack */}
                        <div className="case-study-card case-study-image-switcher__main">
                            <div className="case-study-image-switcher__img-stack">
                                {images.map((img, index) => (
                                    <img
                                        key={img.src + (img.srcMobile || "")}
                                        src={getSrc(img)}
                                        alt={getAlt(img)}
                                        className={
                                            "case-study-image-switcher__img" +
                                            (index === activeIndex ? " is-active" : "")
                                        }
                                    />
                                ))}
                            </div>

                            <div className="case-study-image-switcher__badge">
                                {active.label}
                            </div>
                        </div>

                        {/* RIGHT – text + controls */}
                        <div className="case-study-image-switcher__side">
                            {caption && (
                                <p className="case-study-image-switcher__caption">{caption}</p>
                            )}

                            <div className="case-study-image-switcher__controls">
                                {images.map((img, index) => (
                                    <button
                                        key={img.src + (img.srcMobile || "")}
                                        type="button"
                                        className={
                                            "case-study-pill case-study-image-switcher__pill" +
                                            (index === activeIndex ? " is-active" : "")
                                        }
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <span className="case-study-image-switcher__pill-code">
                                            {img.shortLabel || img.code}
                                        </span>
                                        <span className="case-study-image-switcher__pill-label">
                                            {img.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.figure>
        </CaseStudySection>
    );
};

export default CaseStudyImageSwitcher;
