// src/pages/FlemingHowlandPage.jsx
import { useRef, useState, useEffect, useMemo } from "react";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";

import CaseStudyHero from "../../components/caseStudies/CaseStudyHero/CaseStudyHero";
import CaseStudyResultsStrip from "../../components/caseStudies/CaseStudyResultsStrip/CaseStudyResultsStrip";
import CaseStudyStoryTwoColumn from "../../components/caseStudies/CaseStudyStoryTwoColumn/CaseStudyStoryTwoColumn";
import CaseStudyWorkflow from "../../components/caseStudies/CaseStudyWorkflow/CaseStudyWorkflow";
import CaseStudyScrollIndicator from "../../components/caseStudies/CaseStudyScrollIndicator/CaseStudyScrollIndicator";
import CaseStudyImageSwitcher from "../../components/caseStudies/CaseStudyImageSwitcher/CaseStudyImageSwitcher";
import CaseStudyFooterCta from "../../components/caseStudies/CaseStudyFooterCta/CaseStudyFooterCta";

import FLEMING_HOWLAND_CASE_STUDY from "../../constants/caseStudy/FlemingHowland";
import "./FlemingHowland.scss";

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

const FlemingHowlandPage = () => {
    const heroRef = useRef(null);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const reduceMotion = useReducedMotion();

    // Desktop only: scroll-linked hero animation.
    // Mobile: no scroll-linked transforms (fixes “draggy” scroll after refresh).
    const enableScrollFx = !isMobile && !reduceMotion;

    const { scrollYProgress: heroScrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Desktop transforms (only used when enableScrollFx = true)
    const heroImageY = useTransform(heroScrollYProgress, [0, 0.5, 1], [0, -40, -120]);

    const SCALE_START = 0.14;
    const SCALE_END = 0.4;
    const SCALE_MAX_DESKTOP = 1.4;

    const heroImageScale = useTransform(
        heroScrollYProgress,
        [0, SCALE_START, SCALE_END, 1],
        [1, 1, SCALE_MAX_DESKTOP, SCALE_MAX_DESKTOP]
    );

    const heroImageX = useTransform(heroScrollYProgress, [0, 1], [0, 0]);

    const heroImageOpacity = useTransform(heroScrollYProgress, [0, 0.14, 0.2], [0, 0, 1]);

    const heroImageClip = useTransform(heroScrollYProgress, [0, 0.14, 0.26, 0.6], [
        "inset(100% 0% 0% 0% round 24px)",
        "inset(100% 0% 0% 0% round 24px)",
        "inset(0% 0% 0% 0% round 24px)",
        "inset(0% 0% 0% 0% round 0px)",
    ]);

    const heroImageBorderRadius = useTransform(heroScrollYProgress, [0, 0.6], [24, 0]);

    const heroImageMotionStyle = useMemo(() => {
        // Mobile / reduced-motion: STATIC styles (no scroll-driven updates)
        if (!enableScrollFx) {
            return {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                borderRadius: isMobile ? 20 : 24,
                // no clipPath
                willChange: "auto",
            };
        }

        // Desktop: full effect
        return {
            opacity: heroImageOpacity,
            clipPath: heroImageClip,
            y: heroImageY,
            x: heroImageX,
            scale: heroImageScale,
            borderRadius: heroImageBorderRadius,
            willChange: "transform",
        };
    }, [
        enableScrollFx,
        isMobile,
        heroImageOpacity,
        heroImageClip,
        heroImageY,
        heroImageX,
        heroImageScale,
        heroImageBorderRadius,
    ]);

    const cs = FLEMING_HOWLAND_CASE_STUDY;

    return (
        <main className="cs-page case-study">
            <CaseStudyScrollIndicator />

            <div className="cs-page__inner">
                <CaseStudyHero
                    ref={heroRef}
                    {...cs.hero}
                    heroImageMotionStyle={heroImageMotionStyle}
                    heroImageSrc="/caseStudies/FH/hero-desktop.png"
                    heroImageSrcMobile="/caseStudies/FH/hero-mobile.png"
                    heroImageAlt="Fleming Howland hero"
                    heroImageAltMobile="Fleming Howland hero mobile"
                />

                <CaseStudyResultsStrip {...cs.results} />
                <CaseStudyStoryTwoColumn {...cs.story1} />
                <CaseStudyImageSwitcher {...cs.imageSwitcher} />
                <CaseStudyWorkflow {...cs.workflow} />
                <CaseStudyStoryTwoColumn {...cs.story2} />
                <CaseStudyFooterCta {...cs.footerCta} />
            </div>
        </main>
    );
};

export default FlemingHowlandPage;
