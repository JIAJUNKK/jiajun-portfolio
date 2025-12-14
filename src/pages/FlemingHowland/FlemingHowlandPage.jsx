// src/pages/FlemingHowlandPage.jsx
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import CaseStudyHero from "../../components/caseStudies/CaseStudyHero/CaseStudyHero";
import CaseStudyResultsStrip from "../../components/caseStudies/CaseStudyResultsStrip/CaseStudyResultsStrip";
import CaseStudyStoryTwoColumn from "../../components/caseStudies/CaseStudyStoryTwoColumn/CaseStudyStoryTwoColumn";
import CaseStudyWorkflow from "../../components/caseStudies/CaseStudyWorkflow/CaseStudyWorkflow";
import CaseStudyScrollIndicator from "../../components/caseStudies/CaseStudyScrollIndicator/CaseStudyScrollIndicator";
import CaseStudyImageSwitcher from "../../components/caseStudies/CaseStudyImageSwitcher/CaseStudyImageSwitcher";
import CaseStudyFooterCta from "../../components/caseStudies/CaseStudyFooterCta/CaseStudyFooterCta";

import FLEMING_HOWLAND_CASE_STUDY from "../../constants/caseStudy/FlemingHowland";
import "./FlemingHowland.scss";

const FlemingHowlandPage = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        document.body.classList.add("fh-no-scrollbar");
        return () => {
            document.body.classList.remove("fh-no-scrollbar");
        };
    }, []);

    const { scrollYProgress: heroScrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroImageY = useTransform(heroScrollYProgress, [0, 0.5, 1], [0, -40, -120]);

    const SCALE_START = 0.14;
    const SCALE_END = 0.4;
    const SCALE_MAX = 1.4;

    const heroImageScale = useTransform(
        heroScrollYProgress,
        [0, SCALE_START, SCALE_END, 1],
        [1, 1, SCALE_MAX, SCALE_MAX]
    );

    const heroImageX = useTransform(heroScrollYProgress, [0, 1], [0, 0]);

    const heroImageOpacity = useTransform(heroScrollYProgress, [0, 0.14, 0.2], [0, 0, 1]);

    const heroImageClip = useTransform(heroScrollYProgress, [0, 0.14, 0.26], [
        "inset(100% 0% 0% 0% round 24px)",
        "inset(100% 0% 0% 0% round 24px)",
        "inset(0% 0% 0% 0% round 24px)",
    ]);

    const heroImageBorderRadius = useTransform(heroScrollYProgress, [0, 1], [0, 0]);

    const heroImageMotionStyle = {
        opacity: heroImageOpacity,
        clipPath: heroImageClip,
        y: heroImageY,
        x: heroImageX,
        scale: heroImageScale,
        borderRadius: heroImageBorderRadius,
    };

    const cs = FLEMING_HOWLAND_CASE_STUDY;

    return (
        <main className="fh-page case-study">
            <CaseStudyScrollIndicator />

            <div className="fh-page__inner">
                <CaseStudyHero
                    ref={heroRef}
                    {...cs.hero}
                    heroImageMotionStyle={heroImageMotionStyle}
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
