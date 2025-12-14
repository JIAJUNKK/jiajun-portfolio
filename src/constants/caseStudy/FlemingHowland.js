// src/constants/CaseStudy/FlemingHowland.js

export const FLEMING_HOWLAND_CASE_STUDY = {
    slug: "fleming-howland",
    hero: {
        category: "Project · E-commerce",
        metaLine: "Creative development · Workflow automation",
        title: "Fleming Howland",
        lede:
            "Automating translation workflows and designing flexible components for a luxury furniture brand's marketing website.",
        metaItems: [
            { label: "Role", value: "Full Stack Developer" },
            { label: "Year", value: "2025 - Present" },
        ],
        stackIcons: ["javascript", "python", "php", "wordpress", "html", "css"],
        primaryCta: {
            label: "Visit live site",
            href: "https://fleminghowland.com/",
            external: true,
        },
        secondaryCta: {
            label: "Back to all projects",
            href: "/#Projects",
            external: false,
        },
        heroImageSrc: "/projects/FlemingHowland.png",
        heroImageAlt: "Fleming Howland marketing website",
    },

    results: {
        eyebrow: "Results",
        title: "Moving from manual updates to a repeatable system.",
        intro:
            "The goal was to keep Fleming Howland's craft-led storytelling, while making multi-language updates faster and less manual for the team.",
        stats: [
            {
                value: "≈78%",
                label: "reduction in translation spend on recurring updates",
                badge: "Automation",
                graph: { type: "bar", progress: 0.78 },
            },
            {
                value: "Hours → minutes",
                label: "to roll out new copy across language variants",
                badge: "Speed",
                graph: { type: "spark", bars: 7 },
            },
        ],
    },

    story1: {
        eyebrow: "The story",
        title: "Designing a translation system that respects craft and brand voice.",
        introParagraphs: [
            "Fleming Howland’s products don’t read like a generic catalogue. They have names, stories and material descriptions that are tightly tied to the brand’s tone of voice. That makes them hard to translate well — you can’t just run everything through a plugin and hope it still feels like Fleming Howland.",
            "The existing setup relied heavily on WPML, plus a lot of manual PHP-based translations. Some product names couldn’t be translated at all, and many auto-translations felt off-brand or simply wrong. Keeping everything consistent across languages meant editing the same content in multiple places and maintaining thousands of lines of translation code by hand.",
        ],
        leftBlock: {
            title: "The translation challenge",
            body:
                "We needed a way to scale multi-language content without losing the brand’s tone, or relying on developers to touch PHP every time copy changed. In practice, that meant:",
            bullets: [
                "avoiding literal translations for product names and brand phrases that shouldn’t change",
                "fixing WPML translations that were technically correct but off-tone for Fleming Howland",
                "removing the need to maintain thousands of lines of manual translation arrays in PHP",
                "giving the team a simple way to review and adjust translations in bulk",
            ],
        },
        rightBlock: {
            title: "Coding the brand into the workflow",
            body:
                "Working closely with the director, I turned their preferred wording and examples into a set of concrete rules and instructions. I then wired those into a Python script that strips structured content out into Excel, applies the translation logic, and feeds the result back into the site. After a few iterations, we improved translation accuracy from roughly 70% to around 95% in our internal checks. That allowed us to delete thousands of lines of manual PHP translation code and lean on a cleaner combination of Weglot plus the Python pipeline for brand-safe language across the site.",
        },
    },

    imageSwitcher: {
        caption:
            "Four language variants of the same product story, generated and checked through the Python + Weglot translation workflow.",
        images: [
            {
                src: "/caseStudies/FH/FH-ENG.png",
                srcMobile: "/caseStudies/FH/FH-ENG-mobile.png",
                label: "English",
                shortLabel: "EN",
                code: "EN",
            },
            {
                src: "/caseStudies/FH/FH-ES.png",
                srcMobile: "/caseStudies/FH/FH-ES-mobile.png",
                label: "Spanish",
                shortLabel: "ES",
                code: "ES",
            },
            {
                src: "/caseStudies/FH/FH-FR.png",
                srcMobile: "/caseStudies/FH/FH-FR-mobile.png",
                label: "French",
                shortLabel: "FR",
                code: "FR",
            },
            {
                src: "/caseStudies/FH/FH-DE.png",
                srcMobile: "/caseStudies/FH/FH-DE-mobile.png",
                label: "German",
                shortLabel: "DE",
                code: "DE",
            },
        ],
    },

    workflow: {
        eyebrow: "Approach",
        title: "How the translation workflow fits into their week.",
        intro:
            "The tooling had to feel like a simple extension of how the team already writes, reviews and signs off content.",
        steps: [
            "Export clean content. A Python script pulls titles, body copy and metadata from WordPress into a structured JSON / CSV file with stable IDs.",
            "Translate once. Translators work directly in that file, keeping the structure intact across all languages.",
            "Validate before import. The script checks for missing keys, broken IDs and empty required fields before anything reaches the live site.",
            "Re-import to language variants. Updated copy is mapped back onto existing pages and language versions automatically.",
        ],
    },

    story2: {
        eyebrow: "Beyond translation",
        title: "Helping the team find answers faster.",
        introParagraphs: [
            "Once the language system felt solid, we looked at how the team was actually finding information day to day. A lot of time was being spent searching the site, digging through internal docs or asking the same questions in Slack.",
        ],
        leftBlock: {
            title: "AI knowledge assistant",
            body:
                "To reduce that friction, I built a lightweight AI chatbot for Fleming Howland using a Cloudflare Worker, an OpenAI model and an OpenAI vector store. The bot is tuned on product information and internal documentation so the marketing and customer service teams can ask questions in plain language and get relevant answers back in a few seconds, instead of hunting through pages or handbooks.",
        },
        rightBlock: {
            title: "Supporting UI & moodboard work",
            body:
                "Alongside the language and tooling work, I also contributed to frontend implementation across the marketing site and a bespoke moodboard experience. That included wiring up the moodboard UI, refining layouts and interactions, and making sure new components felt consistent with the existing brand system.",
        },
    },

    footerCta: {
        title: "Thinking about similar work?",
        text: "I'm interested in more projects that sit between frontend, content and workflow design.",
        secondaryTo: "/#Contact",
        secondaryLabel: "Talk about a project",
        primaryHref: "https://fleminghowland.com/",
        primaryLabel: "View the live site",
    },
};

export default FLEMING_HOWLAND_CASE_STUDY;
