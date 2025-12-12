// src/pages/FlemingHowlandPage.jsx
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import CaseStudyHero from "../../components/caseStudies/CaseStudyHero/CaseStudyHero";
import CaseStudyResultsStrip from "../../components/caseStudies/CaseStudyResultsStrip/CaseStudyResultsStrip";
import CaseStudyStoryTwoColumn from "../../components/caseStudies/CaseStudyStoryTwoColumn/CaseStudyStoryTwoColumn";
import CaseStudyWorkflow from "../../components/caseStudies/CaseStudyWorkflow/CaseStudyWorkflow";
import CaseStudyFullBleedMedia from "../../components/caseStudies/CaseStudyFullBleedMedia/CaseStudyFullBleedMedia";
import CaseStudyScrollIndicator from "../../components/caseStudies/CaseStudyScrollIndicator/CaseStudyScrollIndicator";

import "./FlemingHowland.scss";

const FlemingHowlandPage = () => {
    const heroRef = useRef(null);

    // Only this page hides scrollbar
    useEffect(() => {
        document.body.classList.add("fh-no-scrollbar");
        return () => {
            document.body.classList.remove("fh-no-scrollbar");
        };
    }, []);

    const { scrollYProgress: heroScrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end end"],
    });

    // ---- IMAGE MORPH EFFECT ----
    // Move image slightly up as we scroll so it feels like it's stacking
    const heroImageY = useTransform(
        heroScrollYProgress,
        [0, 0.5, 1],
        [0, -40, -120]
    );

    // Start a bit smaller, then grow to feel like a full-width spread
    const heroImageScale = useTransform(
        heroScrollYProgress,
        [0, 1],
        [1, 1.5]
    );

    // Slide from right → centre as you scroll
    const heroImageX = useTransform(
        heroScrollYProgress,
        [0, 1],
        [0, 0] // tweak if you want a stronger slide
    );

    // Slightly soften the card → flatter, more "full-bleed" feel
    const heroImageBorderRadius = useTransform(
        heroScrollYProgress,
        [0, 1],
        [24, 0] // px
    );

    const heroImageMotionStyle = {
        y: heroImageY,
        x: heroImageX,
        scale: heroImageScale,
        borderRadius: heroImageBorderRadius,
    };


    return (
        <main className="fh-page">
            <div className="fh-page__inner">
                <CaseStudyHero
                    ref={heroRef}
                    category="Client project · E-commerce"
                    metaLine="Creative development · Workflow automation"
                    title="Fleming Howland"
                    lede="Automating translation workflows and designing flexible components for a luxury furniture brand's marketing website."
                    metaItems={[
                        { label: "Role", value: "Full Stack Developer" },
                        { label: "Year", value: "2025 - Present" },
                    ]}

                    // default to svg, put other extensions if need
                    stackIcons={[
                        "javascript",
                        "python",
                        "php",
                        "wordpress",
                        "html",
                        "css",
                    ]}
                    primaryCta={{
                        label: "Visit live site",
                        href: "https://fleminghowland.com/",
                        external: true,
                    }}
                    secondaryCta={{
                        label: "Back to all projects",
                        href: "/#Projects",
                        external: false,
                    }}
                    heroImageSrc="/projects/FlemingHowland.png"
                    heroImageAlt="Fleming Howland marketing website"
                    heroImageMotionStyle={heroImageMotionStyle}
                />

                <CaseStudyResultsStrip
                    eyebrow="Results"
                    title="Moving from manual updates to a repeatable system."
                    intro="The goal was to keep Fleming Howland's craft-led storytelling, while making multi-language updates faster and less manual for the team."
                    stats={[
                        {
                            value: "≈78%",
                            label:
                                "reduction in translation spend on recurring updates",
                        },
                        {
                            value: "Hours → minutes",
                            label:
                                "to roll out new copy across language variants",
                        },
                        {
                            value: "Reusable blocks",
                            label:
                                "components the team can assemble without dev help",
                        },
                    ]}
                />

                <CaseStudyStoryTwoColumn
                    eyebrow="The story"
                    title="Making long-form storytelling work across languages."
                    introParagraphs={[
                        "Fleming Howland is a luxury furniture brand with a strong visual identity and long-form product stories. Each page mixes narrative copy, specification detail and photography.",
                        "Before this project, every language lived as a separate copy of the site. Updating content meant jumping into the CMS, finding each translation and manually pasting text into the right fields. It worked, but it was slow, easy to break and expensive as the site grew.",
                    ]}
                    leftBlock={{
                        title: "The challenge",
                        body: "Keep the richness of the content, without turning every update into a multi-day task. The team needed:",
                        bullets: [
                            "less copy-paste work in the CMS",
                            "better alignment between language versions",
                            "a process translators and marketers could follow without touching templates",
                        ],
                    }}
                    rightBlock={{
                        title: "The solution",
                        body: "I built a small translation pipeline around WordPress, plus a component-based layout system. The pipeline handles structured content and mapping; the components help the team build pages from a set of reliable building blocks.",
                    }}
                />
            </div>

            <div className="fh-page__inner">
                <CaseStudyWorkflow
                    eyebrow="Approach"
                    title="How the translation workflow fits into their week."
                    intro="The tooling had to feel like a simple extension of how the team already writes, reviews and signs off content."
                    steps={[
                        "Export clean content. A Python script pulls titles, body copy and metadata from WordPress into a structured JSON / CSV file with stable IDs.",
                        "Translate once. Translators work directly in that file, keeping the structure intact across all languages.",
                        "Validate before import. The script checks for missing keys, broken IDs and empty required fields before anything reaches the live site.",
                        "Re-import to language variants. Updated copy is mapped back onto existing pages and language versions automatically.",
                    ]}
                />
            </div>

            <CaseStudyFullBleedMedia
                className="fh-fullbleed--light"
                caption="A quick walkthrough of the internal translation tooling used by the team."
            >
                <video
                    src="/projects/FlemingHowland-workflow-demo.mp4"
                    muted
                    loop
                    controls
                />
            </CaseStudyFullBleedMedia>

            <div className="fh-page__inner">
                <CaseStudyStoryTwoColumn
                    className="fh-body--bottom"
                    introParagraphs={[]}
                    leftBlock={{
                        title: "Frontend & component work",
                        body: "Alongside the workflow, I focused on giving the marketing team composable pieces they could re-use.",
                        bullets: [
                            "Story sections, feature blocks and image layouts that can be mixed to create new pages.",
                            "Layouts tuned for different copy lengths per language, so translations don't break the design.",
                            "A consistent spacing and type scale so new pages still feel on-brand.",
                        ],
                    }}
                    rightBlock={{
                        title: "What I took away",
                        body: "",
                        bullets: [
                            "Translation tools work best when they mirror how the team already reviews and approves content.",
                            "Clean IDs and validation logic prevent subtle content mismatches later.",
                            "Reusable components only land if they feel natural for non-technical people to combine.",
                        ],
                    }}
                />

                <motion.footer
                    className="fh-footer"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                >
                    <div className="fh-footer__copy">
                        <p className="fh-footer__title">
                            Thinking about similar work?
                        </p>
                        <p className="fh-footer__text">
                            I&apos;m interested in more projects that sit between
                            frontend, content and workflow design.
                        </p>
                    </div>
                    <div className="fh-footer__actions">
                        <Link
                            to="/#Contact"
                            className="fh-button fh-button--ghost"
                        >
                            Talk about a project
                        </Link>
                        <a
                            href="https://fleminghowland.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fh-button fh-button--primary"
                        >
                            View the live site
                        </a>
                    </div>
                </motion.footer>
            </div>

            <CaseStudyScrollIndicator />
        </main>
    );
};

export default FlemingHowlandPage;
