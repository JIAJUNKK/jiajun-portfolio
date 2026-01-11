import { useEffect, useMemo, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../../../hooks/useIsMobile";
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyFeatureGroupScroller.scss";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));


const CaseStudyFeatureGroupScroller = ({
    eyebrow = "Platform",
    title = "Explore the features",
    intro = "Scroll to explore • Click to jump",
    stickyTop = 110,
    stepMinVh = 38,
    endSpaceVh = 70,
    holdVh = 32,
    features = [],
}) => {
    const prefersReduced = useReducedMotion();
    const isMobile = useIsMobile(768);

    const sectionRef = useRef(null);
    const stepRefs = useRef([]);
    const rafRef = useRef(null);

    const mainViewportRef = useRef(null);
    const supportViewportRefs = useRef([null, null]);

    const [mainH, setMainH] = useState(420);
    const [supportH0, setSupportH0] = useState(200);
    const [supportH1, setSupportH1] = useState(200);

    const [activeIndex, setActiveIndex] = useState(0);
    const [globalProgress, setGlobalProgress] = useState(0);
    const [localProgress, setLocalProgress] = useState(0);

    const last = useRef({ idx: 0, g: 0, l: 0 });
    const mobileRatios = useRef(new Map());

    const items = useMemo(() => {
        if (!Array.isArray(features)) return [];
        return features
            .filter(Boolean)
            .map((f, i) => ({
                badge: f.badge || "Feature",
                title: f.title || `Feature ${i + 1}`,
                description: f.description || "",
                mainImage: f.mainImage || { src: "", alt: "" },
                supportingImages: Array.isArray(f.supportingImages) ? f.supportingImages : [],
            }))
            .filter((f) => f.mainImage?.src);
    }, [features]);

    const steps = items.length;

    useEffect(() => {
        if (!steps || isMobile) return;

        const cleanups = [];

        const observe = (el, onSize) => {
            if (!el) return;
            const measure = () => {
                const h = Math.round(el.getBoundingClientRect().height);
                if (h) onSize(h);
            };
            measure();

            if (typeof ResizeObserver !== "undefined") {
                const ro = new ResizeObserver(measure);
                ro.observe(el);
                cleanups.push(() => ro.disconnect());
            } else {
                window.addEventListener("resize", measure);
                cleanups.push(() => window.removeEventListener("resize", measure));
            }
        };

        observe(mainViewportRef.current, (h) => setMainH((prev) => (Math.abs(prev - h) > 1 ? h : prev)));
        observe(supportViewportRefs.current[0], (h) => setSupportH0((prev) => (Math.abs(prev - h) > 1 ? h : prev)));
        observe(supportViewportRefs.current[1], (h) => setSupportH1((prev) => (Math.abs(prev - h) > 1 ? h : prev)));

        return () => cleanups.forEach((fn) => fn());
    }, [steps, isMobile]);

    useEffect(() => {
        if (!steps || isMobile) return;

        const update = () => {
            if (rafRef.current) return;

            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;

                const section = sectionRef.current;
                if (!section) return;

                const sRect = section.getBoundingClientRect();
                const sectionVisible = sRect.bottom >= 0 && sRect.top <= window.innerHeight;
                if (!sectionVisible) return;

                const topLine = stickyTop + 2;

                const els = stepRefs.current.filter(Boolean);
                if (!els.length) return;

                let idx = 0;

                for (let i = 0; i < els.length; i++) {
                    const r = els[i].getBoundingClientRect();
                    if (r.top <= topLine) idx = i;
                    else break;
                }

                const ar = els[idx].getBoundingClientRect();
                const l = clamp((topLine - ar.top) / Math.max(1, ar.height), 0, 1);
                const g = steps <= 1 ? 1 : clamp((idx + l) / (steps - 1), 0, 1);

                if (idx !== last.current.idx) {
                    last.current.idx = idx;
                    setActiveIndex(idx);
                }
                if (Math.abs(g - last.current.g) > 0.005) {
                    last.current.g = g;
                    setGlobalProgress(g);
                }
                if (Math.abs(l - last.current.l) > 0.01) {
                    last.current.l = l;
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
    }, [steps, stickyTop, isMobile]);

    useEffect(() => {
        // Mobile-only: IntersectionObserver drives activeIndex
        if (!steps || !isMobile) return;

        mobileRatios.current = new Map();
        setGlobalProgress(steps <= 1 ? 1 : 0);
        setLocalProgress(0);

        const els = stepRefs.current.filter(Boolean);
        if (!els.length) return;
        if (typeof IntersectionObserver === "undefined") return;

        const navOffset = stickyTop + 86;
        const thresholds = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1];

        const obs = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    const idx = Number(e.target.dataset.idx);
                    mobileRatios.current.set(idx, e.isIntersecting ? e.intersectionRatio : 0);
                }

                let bestIdx = last.current.idx;
                let bestRatio = -1;
                for (const [idx, ratio] of mobileRatios.current.entries()) {
                    if (ratio > bestRatio) {
                        bestRatio = ratio;
                        bestIdx = idx;
                    }
                }

                const nextIdx = clamp(bestIdx, 0, steps - 1);
                if (nextIdx !== last.current.idx) {
                    last.current.idx = nextIdx;
                    setActiveIndex(nextIdx);
                }

                const g = steps <= 1 ? 1 : nextIdx / (steps - 1);
                if (Math.abs(g - last.current.g) > 0.001) {
                    last.current.g = g;
                    setGlobalProgress(g);
                }

                const l = clamp(bestRatio, 0, 1);
                if (Math.abs(l - last.current.l) > 0.01) {
                    last.current.l = l;
                    setLocalProgress(l);
                }
            },
            { root: null, threshold: thresholds, rootMargin: `-${navOffset}px 0px -55% 0px` }
        );

        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [steps, isMobile, stickyTop]);

    if (!steps) return null;

    const safeIndex = clamp(activeIndex, 0, steps - 1);
    const active = items[safeIndex];

    const scrollTo = (i) => {
        const idx = clamp(i, 0, steps - 1);
        const el = stepRefs.current[idx];
        if (!el) return;

        el.scrollIntoView({
            behavior: prefersReduced ? "auto" : "smooth",
            block: "start",
        });
    };

    const pMedia = clamp(safeIndex, 0, steps - 1);

    const mainStackY = -pMedia * mainH;
    const supportStackY0 = -pMedia * supportH0;
    const supportStackY1 = -pMedia * supportH1;

    const spring = prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 26, mass: 0.7 };

    return (
        <CaseStudySection>
            <div
                ref={sectionRef}
                className={"case-study-feature-group-scroller" + (isMobile ? " is-mobile" : "")}
                style={{
                    ["--stickyTop"]: `${stickyTop}px`,
                    ["--stepMinH"]: `${stepMinVh}vh`,
                    ["--endSpaceVh"]: `${endSpaceVh}vh`,
                    ["--holdVh"]: `${holdVh}vh`,
                }}
            >
                <header className="case-study-feature-group-scroller__header">
                    <p className="case-study-feature-group-scroller__eyebrow">{eyebrow}</p>
                    <h3 className="case-study-feature-group-scroller__title">{title}</h3>
                    {intro ? <p className="case-study-feature-group-scroller__intro">{intro}</p> : null}
                </header>

                {!isMobile ? (
                    <div className="case-study-feature-group-scroller__grid">
                        <div className="case-study-feature-group-scroller__sticky">
                            <div className="case-study-card case-study-feature-group-scroller__stage">
                                <div className="case-study-feature-group-scroller__stageTop">
                                    <div className="case-study-feature-group-scroller__kicker">
                                        <span className="case-study-feature-group-scroller__badge">{active.badge}</span>
                                        <span className="case-study-feature-group-scroller__count">
                                            {String(safeIndex + 1).padStart(2, "0")} / {String(steps).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <div className="case-study-feature-group-scroller__nav">
                                        <div className="case-study-feature-group-scroller__dots">
                                            {items.map((_, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className={
                                                        "case-study-feature-group-scroller__dot" + (i === safeIndex ? " is-active" : "")
                                                    }
                                                    onClick={() => scrollTo(i)}
                                                    aria-label={`Go to feature ${i + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="case-study-feature-group-scroller__progress">
                                    <div
                                        className="case-study-feature-group-scroller__progressFill"
                                        style={{ width: `${Math.round(globalProgress * 100)}%` }}
                                    />
                                </div>

                                <m.div
                                    key={`meta-${safeIndex}`}
                                    className="case-study-feature-group-scroller__stageMeta"
                                    initial={prefersReduced ? false : { y: 8 }}
                                    animate={{ y: 0 }}
                                    transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 28 }}
                                >
                                    <h4 className="case-study-feature-group-scroller__activeTitle">{active.title}</h4>
                                    {active.description ? (
                                        <p className="case-study-feature-group-scroller__activeDesc">{active.description}</p>
                                    ) : null}
                                </m.div>

                                <div className="case-study-feature-group-scroller__mediaRow">
                                    <div ref={mainViewportRef} className="case-study-feature-group-scroller__main">
                                        <m.div
                                            className="case-study-feature-group-scroller__mainStack"
                                            animate={{ y: mainStackY }}
                                            transition={spring}
                                        >
                                            {items.map((it, i) => (
                                                <div
                                                    key={(it.mainImage?.src || "") + "-" + i}
                                                    className="case-study-feature-group-scroller__mainFrame"
                                                >
                                                    <img
                                                        src={it.mainImage?.src}
                                                        alt={it.mainImage?.alt || it.title}
                                                        className="case-study-feature-group-scroller__mainImg"
                                                        loading={i === 0 ? "eager" : "lazy"}
                                                    />
                                                </div>
                                            ))}
                                        </m.div>
                                    </div>

                                    <div className="case-study-feature-group-scroller__supportCol">
                                        <figure
                                            ref={(el) => (supportViewportRefs.current[0] = el)}
                                            className="case-study-feature-group-scroller__supportViewport"
                                        >
                                            <m.div
                                                className="case-study-feature-group-scroller__supportStack"
                                                animate={{ y: supportStackY0 }}
                                                transition={spring}
                                            >
                                                {items.map((it, i) => {
                                                    const img = it.supportingImages?.[0] || null;
                                                    return (
                                                        <div key={`s0-${i}`} className="case-study-feature-group-scroller__supportFrame">
                                                            {img?.src ? (
                                                                <img
                                                                    src={img.src}
                                                                    alt={img.alt || `${it.title} supporting 1`}
                                                                    className="case-study-feature-group-scroller__supportImg"
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                <div className="case-study-feature-group-scroller__supportBlank" aria-hidden />
                                                            )}
                                                            {img?.label ? (
                                                                <div className="case-study-feature-group-scroller__supportLabelOverlay">
                                                                    {img.label}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    );
                                                })}
                                            </m.div>
                                        </figure>

                                        <figure
                                            ref={(el) => (supportViewportRefs.current[1] = el)}
                                            className="case-study-feature-group-scroller__supportViewport"
                                        >
                                            <m.div
                                                className="case-study-feature-group-scroller__supportStack"
                                                animate={{ y: supportStackY1 }}
                                                transition={spring}
                                            >
                                                {items.map((it, i) => {
                                                    const img = it.supportingImages?.[1] || null;
                                                    return (
                                                        <div key={`s1-${i}`} className="case-study-feature-group-scroller__supportFrame">
                                                            {img?.src ? (
                                                                <img
                                                                    src={img.src}
                                                                    alt={img.alt || `${it.title} supporting 2`}
                                                                    className="case-study-feature-group-scroller__supportImg"
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                <div className="case-study-feature-group-scroller__supportBlank" aria-hidden />
                                                            )}
                                                            {img?.label ? (
                                                                <div className="case-study-feature-group-scroller__supportLabelOverlay">
                                                                    {img.label}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    );
                                                })}
                                            </m.div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="case-study-feature-group-scroller__rail">
                            {items.map((f, i) => (
                                <div
                                    key={(f.title || "feature") + i}
                                    ref={(el) => (stepRefs.current[i] = el)}
                                    className={
                                        "case-study-feature-group-scroller__stepWrap" +
                                        (i === steps - 1 ? " is-last" : "")
                                    }
                                    style={{ ["--z"]: steps - i }}
                                    onClick={() => scrollTo(i)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            scrollTo(i);
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <article
                                        className={
                                            "case-study-card case-study-feature-group-scroller__step" +
                                            (i === safeIndex ? " is-active" : "")
                                        }
                                    >
                                        <div className="case-study-feature-group-scroller__stepHead">
                                            <span className="case-study-feature-group-scroller__stepNo">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>

                                            <div className="case-study-feature-group-scroller__stepText">
                                                <p className="case-study-feature-group-scroller__stepKicker">{f.badge}</p>
                                                <h4 className="case-study-feature-group-scroller__stepTitle">{f.title}</h4>
                                                {f.description ? (
                                                    <p className="case-study-feature-group-scroller__stepDesc">{f.description}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="case-study-feature-group-scroller__mobile">
                        <div className="case-study-feature-group-scroller__mobileNav">
                            <div className="case-study-feature-group-scroller__mobileNavTop">
                                <span className="case-study-feature-group-scroller__badge">{active.badge}</span>
                                <span className="case-study-feature-group-scroller__count">
                                    {String(safeIndex + 1).padStart(2, "0")} / {String(steps).padStart(2, "0")}
                                </span>
                            </div>

                            <div className="case-study-feature-group-scroller__progress" aria-hidden>
                                <div
                                    className="case-study-feature-group-scroller__progressFill"
                                    style={{ width: `${Math.round(globalProgress * 100)}%` }}
                                />
                            </div>
                        </div>

                        <div className="case-study-feature-group-scroller__mobileList">
                            {items.map((f, i) => {
                                const s0 = f.supportingImages?.[0] || null;
                                const s1 = f.supportingImages?.[1] || null;

                                return (
                                    <section
                                        key={`m-${f.title || "feature"}-${i}`}
                                        ref={(el) => (stepRefs.current[i] = el)}
                                        data-idx={i}
                                        className={
                                            "case-study-card case-study-feature-group-scroller__mobileSection" +
                                            (i === safeIndex ? " is-active" : "")
                                        }
                                    >
                                        <div className="case-study-feature-group-scroller__mobileHead">
                                            <span className="case-study-feature-group-scroller__stepNo">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <div className="case-study-feature-group-scroller__mobileText">
                                                <p className="case-study-feature-group-scroller__stepKicker">
                                                    {f.badge}
                                                </p>
                                                <h4 className="case-study-feature-group-scroller__stepTitle">
                                                    {f.title}
                                                </h4>
                                                {f.description ? (
                                                    <p className="case-study-feature-group-scroller__stepDesc">
                                                        {f.description}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="case-study-feature-group-scroller__mobileMedia">
                                            <div className="case-study-feature-group-scroller__mobileMainFrame">
                                                <img
                                                    src={f.mainImage?.src}
                                                    alt={f.mainImage?.alt || f.title}
                                                    className="case-study-feature-group-scroller__mainImg"
                                                    loading={i === 0 ? "eager" : "lazy"}
                                                />
                                            </div>

                                            <div className="case-study-feature-group-scroller__mobileSupportGrid">
                                                <div className="case-study-feature-group-scroller__mobileSupportFrame">
                                                    {s0?.src ? (
                                                        <img
                                                            src={s0.src}
                                                            alt={s0.alt || `${f.title} supporting 1`}
                                                            className="case-study-feature-group-scroller__supportImg"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="case-study-feature-group-scroller__supportBlank"
                                                            aria-hidden
                                                        />
                                                    )}
                                                    {s0?.label ? (
                                                        <div className="case-study-feature-group-scroller__supportLabelOverlay">
                                                            {s0.label}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="case-study-feature-group-scroller__mobileSupportFrame">
                                                    {s1?.src ? (
                                                        <img
                                                            src={s1.src}
                                                            alt={s1.alt || `${f.title} supporting 2`}
                                                            className="case-study-feature-group-scroller__supportImg"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="case-study-feature-group-scroller__supportBlank"
                                                            aria-hidden
                                                        />
                                                    )}
                                                    {s1?.label ? (
                                                        <div className="case-study-feature-group-scroller__supportLabelOverlay">
                                                            {s1.label}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </CaseStudySection>
    );
};

export default CaseStudyFeatureGroupScroller;
