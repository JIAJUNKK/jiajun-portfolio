import { useState } from "react";
import { motion } from "framer-motion";
import "./CaseStudyImageSwitcherFullBleed.scss";

const CaseStudyImageSwitcherFullBleed = ({ images = [], caption }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = images[activeIndex] || images[0];

    if (!active) return null;

    return (
        <motion.figure
            className="fh-fullbleed fh-image-switcher"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.19, 0.6, 0.22, 1] }}
        >
            <div className="fh-fullbleed__frame">
                <div className="fh-image-switcher__inner">
                    <div className="fh-image-switcher__content">
                        {/* LEFT – image stack (no remounts, just opacity) */}
                        <div className="fh-image-switcher__main">
                            <div className="fh-image-switcher__img-stack">
                                {images.map((img, index) => (
                                    <img
                                        key={img.src}
                                        src={img.src}
                                        alt={img.alt || img.label}
                                        className={
                                            "fh-image-switcher__img" +
                                            (index === activeIndex
                                                ? " is-active"
                                                : "")
                                        }
                                    />
                                ))}
                            </div>

                            <div className="fh-image-switcher__badge">
                                {active.label}
                            </div>
                        </div>

                        {/* RIGHT – text + buttons */}
                        <div className="fh-image-switcher__side">
                            {caption && (
                                <p className="fh-image-switcher__side-caption">
                                    {caption}
                                </p>
                            )}

                            <div className="fh-image-switcher__controls">
                                {images.map((img, index) => (
                                    <button
                                        key={img.src}
                                        type="button"
                                        className={
                                            "fh-image-switcher__pill" +
                                            (index === activeIndex
                                                ? " fh-image-switcher__pill--active"
                                                : "")
                                        }
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <span className="fh-image-switcher__pill-code">
                                            {img.shortLabel || img.code}
                                        </span>
                                        <span className="fh-image-switcher__pill-label">
                                            {img.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </motion.figure>
    );
};

export default CaseStudyImageSwitcherFullBleed;
