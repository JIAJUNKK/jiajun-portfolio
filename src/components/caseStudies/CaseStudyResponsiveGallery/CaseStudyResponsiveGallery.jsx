// CaseStudyResponsiveGallery.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyResponsiveGallery.scss";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

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

const CaseStudyResponsiveGallery = ({
    eyebrow = "Build quality",
    title = "Responsive Web App",
    subtitle = "Mobile-first layouts across the Profit Harmony platform — built to feel great on smaller screens.",
    images = [],
    initialIndex = 0,

    phoneHeight = 520,
    phoneHeightMobile = 440,

    deckShiftX = 56,
    deckShiftXMobile = 0,

    // NEW: allows your site header offset
    stickyTop = 110,
}) => {
    const prefersReduced = useReducedMotion();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const items = useMemo(() => {
        if (!Array.isArray(images)) return [];
        return images
            .filter(Boolean)
            .map((img, i) => ({
                src: img.src,
                alt: img.alt || img.label || `Mobile screen ${i + 1}`,
                label: img.label || `Screen ${i + 1}`,
                note: img.note || "",
            }))
            .filter((x) => x.src);
    }, [images]);

    const [activeIndex, setActiveIndex] = useState(() =>
        clamp(initialIndex, 0, Math.max(0, items.length - 1))
    );

    // mobile sticky info height
    const infoRef = useRef(null);
    const [infoH, setInfoH] = useState(0);

    // refs for mobile phone sections (and desktop stage uses none)
    const phoneRefs = useRef([]);
    const rafRef = useRef(null);

    // for anim direction in sticky info
    const lastIdxRef = useRef(activeIndex);
    const [dir, setDir] = useState(1);

    useEffect(() => {
        setActiveIndex((cur) => clamp(cur, 0, Math.max(0, items.length - 1)));
    }, [items.length]);

    // measure sticky info height on mobile
    useEffect(() => {
        if (!isMobile) return;

        const el = infoRef.current;
        if (!el) return;

        const measure = () => {
            const h = Math.round(el.getBoundingClientRect().height);
            if (h && Math.abs(h - infoH) > 1) setInfoH(h);
            if (h && !infoH) setInfoH(h);
        };

        measure();

        if (typeof ResizeObserver !== "undefined") {
            const ro = new ResizeObserver(measure);
            ro.observe(el);
            return () => ro.disconnect();
        }

        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    if (!items.length) return null;

    const safeIndex = clamp(activeIndex, 0, items.length - 1);
    const active = items[safeIndex];

    const ph = isMobile ? phoneHeightMobile : phoneHeight;
    const shift = isMobile ? deckShiftXMobile : deckShiftX;

    const dragThreshold = isMobile ? 50 : 70;
    const swipeVelocity = 700;

    const fade = prefersReduced ? { duration: 0 } : { duration: 0.22, ease: "easeOut" };

    const scrollTo = (idx, behavior = prefersReduced ? "auto" : "smooth") => {
        const i = clamp(idx, 0, items.length - 1);
        const el = phoneRefs.current[i];
        if (!el) return;

        el.scrollIntoView({ behavior, block: "start" });
    };

    const goTo = (idx) => {
        const i = clamp(idx, 0, items.length - 1);
        if (isMobile) scrollTo(i);
        else {
            setDir(i > safeIndex ? 1 : -1);
            setActiveIndex(i);
        }
    };

    const next = () => goTo(safeIndex + 1);
    const prev = () => goTo(safeIndex - 1);

    const infoMotion = prefersReduced
        ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 }, transition: { duration: 0 } }
        : {
            initial: { opacity: 0, y: dir > 0 ? 10 : -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: dir > 0 ? -10 : 10 },
            transition: { duration: 0.18, ease: "easeOut" },
        };

    // mobile scrollspy: update activeIndex as phones approach the sticky info card
    useEffect(() => {
        if (!isMobile) return;
        if (!items.length) return;

        const update = () => {
            if (rafRef.current) return;

            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;

                const els = phoneRefs.current.filter(Boolean);
                if (!els.length) return;

                // "close enough" line: just under the sticky info card
                const infoEl = infoRef.current;
                const infoBottom = infoEl
                    ? Math.round(infoEl.getBoundingClientRect().bottom)
                    : stickyTop + infoH;

                // "close enough" line: just under the info card, capped to avoid skipping
                const buffer = Math.min(200, Math.round(ph * 0.35));
                const topLine = infoBottom + buffer;

                let idx = 0;
                for (let i = 0; i < els.length; i++) {
                    const r = els[i].getBoundingClientRect();
                    if (r.top <= topLine) idx = i;
                    else break;
                }

                const nextIdx = clamp(idx, 0, items.length - 1);
                const current = clamp(lastIdxRef.current, 0, items.length - 1);
                if (nextIdx !== current) {
                    setDir(nextIdx > lastIdxRef.current ? 1 : -1);
                    lastIdxRef.current = nextIdx;
                    setActiveIndex(nextIdx);
                }
            });
        };

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();

        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, items.length, stickyTop, infoH, ph]);


    return (
        <CaseStudySection>
            <div
                className={"case-study-responsive-gallery" + (isMobile ? " is-mobile" : "")}
                style={{
                    ["--phoneH"]: `${ph}px`,
                    ["--deckShiftX"]: `${shift}px`,
                    ["--stickyTop"]: `${stickyTop}px`,
                    ["--infoH"]: `${infoH}px`,
                }}
            >
                {!isMobile ? (
                    // ====================== DESKTOP (original behaviour) ======================
                    <div className="case-study-responsive-gallery__grid">
                        <header className="case-study-responsive-gallery__header">
                            {eyebrow ? <p className="case-study-responsive-gallery__eyebrow">{eyebrow}</p> : null}
                            <h3 className="case-study-responsive-gallery__title">{title}</h3>
                            {subtitle ? <p className="case-study-responsive-gallery__subtitle">{subtitle}</p> : null}
                        </header>

                        {/* LEFT info card */}
                        <div className="case-study-card case-study-responsive-gallery__info">
                            <div className="case-study-responsive-gallery__infoTop">
                                <span className="case-study-responsive-gallery__pill">Mobile</span>

                                <span className="case-study-responsive-gallery__count">
                                    {String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                                </span>

                                <div className="case-study-responsive-gallery__nav">
                                    <button
                                        type="button"
                                        className="case-study-responsive-gallery__navBtn"
                                        onClick={prev}
                                        disabled={safeIndex === 0}
                                        aria-label="Previous screen"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        className="case-study-responsive-gallery__navBtn"
                                        onClick={next}
                                        disabled={safeIndex === items.length - 1}
                                        aria-label="Next screen"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>

                            <div className="case-study-responsive-gallery__infoBody">
                                <h4 className="case-study-responsive-gallery__screenTitle">{active.label}</h4>

                                {active.note ? (
                                    <p className="case-study-responsive-gallery__screenNote">{active.note}</p>
                                ) : (
                                    <p className="case-study-responsive-gallery__screenNote">
                                        Swipe left/right or use arrows. Switching fades (no stack motion).
                                    </p>
                                )}
                            </div>

                            <div className="case-study-responsive-gallery__dots">
                                {items.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={"case-study-responsive-gallery__dot" + (i === safeIndex ? " is-active" : "")}
                                        onClick={() => goTo(i)}
                                        aria-label={`Go to screen ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* RIGHT stage */}
                        <div className="case-study-responsive-gallery__stage">
                            <div className="case-study-responsive-gallery__stageInner">
                                <div className="case-study-responsive-gallery__stageMeta">
                                    <span className="case-study-responsive-gallery__stageCount">
                                        {String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="case-study-responsive-gallery__fan">
                                    <AnimatePresence mode="wait" initial={false}>
                                        <m.button
                                            key={active.src}
                                            type="button"
                                            className="case-study-responsive-gallery__phone is-active"
                                            onClick={() => { }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={fade}
                                            drag={prefersReduced ? false : "x"}
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.14}
                                            dragSnapToOrigin
                                            whileDrag={prefersReduced ? undefined : { scale: 1.01 }}
                                            onDragEnd={(e, info) => {
                                                if (prefersReduced) return;

                                                const goNext =
                                                    info.offset.x < -dragThreshold || info.velocity.x < -swipeVelocity;

                                                const goPrev =
                                                    info.offset.x > dragThreshold || info.velocity.x > swipeVelocity;

                                                if (goNext) next();
                                                else if (goPrev) prev();
                                            }}
                                            aria-label={`Open ${active.label}`}
                                        >
                                            <div className="case-study-responsive-gallery__notch" />
                                            <img
                                                src={active.src}
                                                alt={active.alt}
                                                className="case-study-responsive-gallery__img"
                                                loading="lazy"
                                            />
                                            <div className="case-study-responsive-gallery__phoneLabel">{active.label}</div>
                                        </m.button>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // ====================== MOBILE (new behaviour) ======================
                    <div className="case-study-responsive-gallery__mobile">
                        <header className="case-study-responsive-gallery__header">
                            {eyebrow ? <p className="case-study-responsive-gallery__eyebrow">{eyebrow}</p> : null}
                            <h3 className="case-study-responsive-gallery__title">{title}</h3>
                            {subtitle ? <p className="case-study-responsive-gallery__subtitle">{subtitle}</p> : null}
                        </header>

                        {/* Sticky info card */}
                        <div ref={infoRef} className="case-study-card case-study-responsive-gallery__info is-sticky">
                            <div className="case-study-responsive-gallery__infoTop">
                                <span className="case-study-responsive-gallery__pill">Mobile</span>

                                <span className="case-study-responsive-gallery__count">
                                    {String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                                </span>
                            </div>

                            <div className="case-study-responsive-gallery__infoBody">
                                <AnimatePresence mode="wait" initial={false}>
                                    <m.div key={`meta-${safeIndex}`} {...infoMotion}>
                                        <h4 className="case-study-responsive-gallery__screenTitle">{active.label}</h4>
                                        {active.note ? (
                                            <p className="case-study-responsive-gallery__screenNote">{active.note}</p>
                                        ) : (
                                            <p className="case-study-responsive-gallery__screenNote">
                                                Scroll to explore. As each phone reaches the top, this panel updates.
                                            </p>
                                        )}
                                    </m.div>
                                </AnimatePresence>
                            </div>

                            <div className="case-study-responsive-gallery__dots" aria-label="Jump to screen">
                                {items.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={"case-study-responsive-gallery__dot" + (i === safeIndex ? " is-active" : "")}
                                        onClick={() => goTo(i)}
                                        aria-label={`Go to screen ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* All phones in one column */}
                        <div className="case-study-responsive-gallery__phoneList">
                            {items.map((it, i) => (
                                <section
                                    key={it.src + "-" + i}
                                    ref={(el) => (phoneRefs.current[i] = el)}
                                    className={
                                        "case-study-responsive-gallery__phoneWrap" +
                                        (i === safeIndex ? " is-active" : "")
                                    }
                                >
                                    <div className="case-study-responsive-gallery__fan">
                                        <div className="case-study-responsive-gallery__phone" role="img" aria-label={it.label}>
                                            <div className="case-study-responsive-gallery__notch" />
                                            <img
                                                src={it.src}
                                                alt={it.alt}
                                                className="case-study-responsive-gallery__img"
                                                loading="lazy"
                                            />
                                            <div className="case-study-responsive-gallery__phoneLabel">{it.label}</div>
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </CaseStudySection>
    );
};

export default CaseStudyResponsiveGallery;
