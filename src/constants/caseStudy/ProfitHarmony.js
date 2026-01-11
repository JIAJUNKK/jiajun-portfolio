// src/constants/CaseStudy/ProfitHarmony.js

export const PROFIT_HARMONY_CASE_STUDY = {
    slug: "profit-harmony",

    hero: {
        category: "Project · SaaS",
        metaLine: "Community platform · Membership & content",
        title: "Profit Harmony",
        lede:
            "A community platform for personal finance, with membership access and gated content designed for a smooth, premium experience.",
        metaItems: [
            { label: "Role", value: "Full Stack Developer" },
            { label: "Year", value: "Jan 2024 - Dec 2024" },
        ],
        stackIcons: ["react", "javascript", "firebase", "html", "css", "scss", "stripe"],
        primaryCta: {
            label: "Visit live site",
            href: "https://profitharmony.com/",
            external: true,
        },
        secondaryCta: {
            label: "Back to all projects",
            href: "/#Projects",
            external: false,
        },
        heroImageSrc: "/caseStudies/ProfitHarmony/landing-hero-desktop-1.png",
        heroImageAlt: "Profit Harmony Landing Page Hero",
        heroImageSrcMobile: "/caseStudies/ProfitHarmony/landing-hero-mobile-1.png",
        heroImageAltMobile: "Profit Harmony Landing Page Hero"
    },

    story1: {
        eyebrow: "The story",
        title: "Designing a community platform that protects paid content and automates the member journey.",
        introParagraphs: [
            "Profit Harmony had already built a strong coaching community — but the experience was held together by multiple tools. Skool was used for the community, Mailchimp handled email, and key steps like onboarding and access were still largely manual.",
            "That setup created real limitations. Members could only pay in USD, Zoom recordings couldn’t be securely hosted inside Skool, and sharing video links risked paid content leaking outside the membership. On top of that, workflows relied on switching between platforms instead of running end-to-end in one place.",
        ],
        leftBlock: {
            title: "The platform challenge",
            body:
                "This wasn’t about rebuilding Skool — it was about removing the friction Profit Harmony had outgrown:",
            bullets: [
                "support GBP (and other required currencies) at checkout",
                "replace Mailchimp with automated emails triggered by platform events",
                "protect Zoom recordings with member-only access (no shareable links)",
                "let members add events to their calendar in one click",
                "bring key workflows into one platform to reduce tool-switching",
            ],
        },
        rightBlock: {
            title: "Built for secure access and automation",
            body:
                "I built the platform around the full journey: pay → onboard → access content → attend events. Multi-currency removed the USD limitation, Firebase Functions power automated emails, videos are gated to logged-in members to prevent leaks, and events support one-tap calendar adds.",
        },

    },
    results: {
        eyebrow: "Results",
        title: "A safer, smoother member platform",
        intro:
            "Profit Harmony moved from Skool + Mailchimp + shareable Zoom links to a single platform. Payments now support GBP (and other required currencies), emails run automatically via Firebase Functions, videos are members-only to prevent leaks, and events can be added to calendars in one tap.",
        stats: [
            {
                value: "Multi-currency",
                label: "Checkout in GBP + required currencies",
                badge: "Flexible",
                graph: { type: "spark", bars: 7 },
            },
            {
                value: "Secure access",
                label: "Member-only video library (no share links)",
                badge: "Protected",
                graph: { type: "spark", bars: 7 },
            },
        ],
    },
    featureGroups: {
        eyebrow: "Platform",
        title: "Explore the core features",
        intro: "Each feature includes a main view and supporting screens.",
        stickyTop: 110,
        features: [
            {
                badge: "Community",
                title: "Posts & comments",
                description: "Share updates, reply in threads, and stay in the loop.",
                mainImage: {
                    src: "/caseStudies/ProfitHarmony/feature-post-1.png",
                    alt: "Community feed",
                },
                supportingImages: [
                    { src: "/caseStudies/ProfitHarmony/feature-post-2.png", alt: "Messaging view", label: "Mentions" },
                    { src: "/caseStudies/ProfitHarmony/feature-post-3.png", alt: "Event view", label: "Threads" },
                ],
            },
            {
                badge: "Chat",
                title: "Member messaging",
                description: "Keep conversations inside the platform.",
                mainImage: {
                    src: "/caseStudies/ProfitHarmony/feature-message-1.png",
                    alt: "Chat modal",
                },
                supportingImages: [
                    { src: "/caseStudies/ProfitHarmony/feature-message-2.png", alt: "Event view", label: "Notifications" },
                    { src: "/caseStudies/ProfitHarmony/feature-message-3.png", alt: "Feed view", label: "Members' Status" },
                ],
            },
            {
                badge: "Calendar",
                title: "Events",
                description: "View sessions and stay organised.",
                mainImage: {
                    src: "/caseStudies/ProfitHarmony/feature-event-1.png",
                    alt: "Event modal",
                },
                supportingImages: [
                    { src: "/caseStudies/ProfitHarmony/feature-event-2.png", alt: "Feed view", label: "Add directly" },
                    { src: "/caseStudies/ProfitHarmony/feature-event-3.PNG", alt: "Get notified", label: "Get Notified" },
                ],
            },
        ],
    },
    responsiveGallery: {
        title: "Responsive Web App",
        subtitle:
            "Mobile-first layouts across the Profit Harmony platform — built to feel native on smaller screens.",
        images: [
            {
                src: "/caseStudies/ProfitHarmony/platform-mobile-1.png",
                alt: "Profit Harmony mobile notifications screen",
                label: "Notifications",
                note: "Events, uploads, and mentions stay visible at a glance.",
            },
            {
                src: "/caseStudies/ProfitHarmony/platform-mobile-2.png",
                alt: "Profit Harmony mobile chats screen",
                label: "Chats",
                note: "Member messaging optimised for fast replies on mobile.",
            },
            {
                src: "/caseStudies/ProfitHarmony/platform-mobile-3.png",
                alt: "Profit Harmony mobile community screen",
                label: "Community",
                note: "Posts and comments remain readable and touch-friendly.",
            },
            {
                src: "/caseStudies/ProfitHarmony/landing-content-mobile-1.png",
                alt: "Profit Harmony mobile landing screen",
                label: "Landing",
                note: "Marketing pages scale cleanly without breaking hierarchy.",
            },
        ],
    },
    story2: {
        eyebrow: "Collaboration & Next Steps",
        title: "From mobile UX decisions to a shipped SaaS",
        introParagraphs: [
            "Instead of shrinking desktop components, the mobile layouts were rebuilt around touch-first patterns. Bigger tap targets, cleaner spacing, and panels that feel closer to a native app than a squeezed website.",
            "Navigation and hierarchy stay consistent across the platform, so members can move between notifications, chats, and community posts without having to stop and think.",

            "I built this project end to end, from the product decisions to the UI and the small details that make it feel right on mobile. I’m open to taking on new projects, especially if you want someone who can own the build, move quickly, and still care about quality.",

            "The biggest win is that this isn’t just a set of screens. It’s a working SaaS that’s been shipped. If I had two more weeks, I’d put that time into polish and speed, tightening the micro interactions and improving data fetching so everything feels instant. With more runway, I’d add automation around key events, sending activity into n8n and using triggers to handle the repetitive ops work in the background.",
        ],
        rightColumn: false,
    },

    footerCta: {
        title: "Thinking about similar work?",
        text: "I'm interested in more projects that sit between frontend, content and workflow design.",
        secondaryTo: "/#Contact",
        secondaryLabel: "Talk about a project",
        primaryHref: "https://profitharmony.com/",
        primaryLabel: "View the live site",
    },
};

export default PROFIT_HARMONY_CASE_STUDY;
