import { useEffect, useMemo, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyResponsiveReel.scss";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

const CaseStudyResponsiveReel = ({
    eyebrow = "Build quality",
    title = "Responsive Web App",
    subtitle = "A mobile-first experience across community, chat, notifications and the landing flow.",
    items = [],

    initialIndex = 0,
    autoplay = true,
    loop = true,
    intervalMs = 2600,
}) => {
    const prefersReduced = useReducedMotion();

    const reelRef = useRef(null);
    const rafRef = useRef(null);
    const isUserInteracting = useRef(false);

    const [isPlaying, setIsPlaying] = useState(autoplay && !prefersReduced);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0); // 0..1 across whole reel

    const slides = useMemo(() => {
        if (!Array.isArray(items)) return [];
        return items
            .filter(Boolean)
            .map((it, i) => ({
                src: it.src,
                alt: it.alt || it.label || `Screen ${i + 1}`,
                label: it.label || `Screen ${i + 1}`,
                note: it.note || "",
            }))
            .filter((x) => x.src);
    }, [items]);

    // init
    useEffect(() => {
        if (!slides.length) return;
        setActiveIndex(clamp(initialIndex, 0, slides.length - 1));
    }, [slides.length, initialIndex]);

    // scroll to initial index once container is ready
    useEffect(() => {
        const el = reelRef.current;
        if (!el || !slides.length) return;

        const go = () => {
            const w = el.clientWidth;
            const idx = clamp(initialIndex, 0, slides.length - 1);
            el.scrollTo({ left: idx * w, behavior: "auto" });
        };

        // allow layout to settle
        const t = setTimeout(go, 0);
        return () => clearTimeout(t);
    }, [slides.length, initialIndex]);

    // read scroll -> activeIndex + progress (rAF throttled)
    useEffect(() => {
        const el = reelRef.current;
        if (!el || !slides.length) return;

        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;

                const w = el.clientWidth || 1;
                const max = Math.max(1, el.scrollWidth - w);
                const p = clamp(el.scrollLeft / max, 0, 1);

                const idx = clamp(Math.round(el.scrollLeft / w), 0, slides.length - 1);

                setProgress(p);
                setActiveIndex(idx);
            });
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => {
            el.removeEventListener("scroll", onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, [slides.length]);

    // autoplay
    useEffect(() => {
        const el = reelRef.current;
        if (!el || !slides.length) return;
        if (!isPlaying) return;

        const tick = () => {
            if (isUserInteracting.current) return;

            const w = el.clientWidth || 1;
            const idx = clamp(Math.round(el.scrollLeft / w), 0, slides.length - 1);
            const next = idx + 1;

            if (next <= slides.length - 1) {
                el.scrollTo({ left: next * w, behavior: prefersReduced ? "auto" : "smooth" });
            } else if (loop) {
                el.scrollTo({ left: 0, behavior: prefersReduced ? "auto" : "smooth" });
            } else {
                setIsPlaying(false);
            }
        };

        const id = window.setInterval(tick, intervalMs);
        return () => window.clearInterval(id);
    }, [isPlaying, slides.length, intervalMs, loop, prefersReduced]);

    if (!slides.length) return null;

    const active = slides[activeIndex];

    const scrollToIndex = (idx) => {
        const el = reelRef.current;
        if (!el) return;
        const w = el.clientWidth || 1;
        el.scrollTo({ left: clamp(idx, 0, slides.length - 1) * w, behavior: prefersReduced ? "auto" : "smooth" });
    };

    const onScrub = (value01) => {
        const el = reelRef.current;
        if (!el) return;
        const w = el.clientWidth || 1;
        const max = Math.max(1, el.scrollWidth - w);
        el.scrollTo({ left: value01 * max, behavior: "auto" });
    };

    const pauseForInteraction = () => {
        isUserInteracting.current = true;
        if (!prefersReduced) setIsPlaying(false);
    };

    const endInteraction = () => {
        isUserInteracting.current = false;
    };

    return (
        <CaseStudySection>
            <section className="case-study-responsive-reel">
                <header className="case-study-responsive-reel__header">
                    {eyebrow ? <p className="case-study-responsive-reel__eyebrow">{eyebrow}</p> : null}
                    <h3 className="case-study-responsive-reel__title">{title}</h3>
                    {subtitle ? <p className="case-study-responsive-reel__subtitle">{subtitle}</p> : null}
                </header>

                <div className="case-study-responsive-reel__grid">
                    {/* LEFT card */}
                    <div className="case-study-card case-study-responsive-reel__info">
                        <div className="case-study-responsive-reel__infoTop">
                            <span className="case-study-responsive-reel__pill">Mobile</span>

                            <span className="case-study-responsive-reel__count">
                                {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                            </span>

                            <div className="case-study-responsive-reel__actions">
                                <button
                                    type="button"
                                    className="case-study-responsive-reel__iconBtn"
                                    onClick={() => scrollToIndex(activeIndex - 1)}
                                    disabled={activeIndex === 0}
                                    aria-label="Previous"
                                >
                                    ‹
                                </button>

                                <button
                                    type="button"
                                    className="case-study-responsive-reel__playBtn"
                                    onClick={() => setIsPlaying((p) => !p)}
                                    aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                                >
                                    {isPlaying ? "Pause" : "Play"}
                                </button>

                                <button
                                    type="button"
                                    className="case-study-responsive-reel__iconBtn"
                                    onClick={() => scrollToIndex(activeIndex + 1)}
                                    disabled={!loop && activeIndex === slides.length - 1}
                                    aria-label="Next"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        {/* progress bar */}
                        <div className="case-study-responsive-reel__progress">
                            <div
                                className="case-study-responsive-reel__progressFill"
                                style={{ width: `${Math.round(progress * 100)}%` }}
                            />
                        </div>

                        <div className="case-study-responsive-reel__infoBody">
                            <h4 className="case-study-responsive-reel__screenTitle">{active.label}</h4>
                            <p className="case-study-responsive-reel__screenNote">
                                {active.note || "Autoplay to preview, or scrub to explore each screen."}
                            </p>
                        </div>

                        <div className="case-study-responsive-reel__scrubWrap">
                            <label className="case-study-responsive-reel__scrubLabel">Scrub</label>
                            <input
                                className="case-study-responsive-reel__scrub"
                                type="range"
                                min={0}
                                max={1000}
                                value={Math.round(progress * 1000)}
                                onPointerDown={pauseForInteraction}
                                onPointerUp={endInteraction}
                                onChange={(e) => onScrub(Number(e.target.value) / 1000)}
                                aria-label="Scrub through screens"
                            />
                        </div>

                        <div className="case-study-responsive-reel__hint">
                            Drag the slider • Or swipe the reel
                        </div>
                    </div>

                    {/* RIGHT reel */}
                    <div className="case-study-card case-study-responsive-reel__stage">
                        <div
                            className="case-study-responsive-reel__reel"
                            ref={reelRef}
                            onMouseEnter={pauseForInteraction}
                            onMouseLeave={endInteraction}
                            onTouchStart={pauseForInteraction}
                            onTouchEnd={endInteraction}
                        >
                            {slides.map((s, i) => (
                                <div key={s.src + i} className="case-study-responsive-reel__slide">
                                    <div className="case-study-responsive-reel__phone">
                                        <div className="case-study-responsive-reel__notch" />
                                        <img
                                            src={s.src}
                                            alt={s.alt}
                                            className="case-study-responsive-reel__img"
                                            loading="lazy"
                                        />
                                    </div>

                                    <m.div
                                        className="case-study-responsive-reel__slideLabel"
                                        animate={{ opacity: i === activeIndex ? 1 : 0 }}
                                        transition={{ duration: prefersReduced ? 0 : 0.2 }}
                                    >
                                        {s.label}
                                    </m.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </CaseStudySection>
    );
};

export default CaseStudyResponsiveReel;
