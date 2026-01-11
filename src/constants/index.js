export const SERVICES = [
    {
        id: "fullstack",
        title: "Full-Stack Development",
        body: `
        I build modern web and mobile apps end-to-end—crafting clean, accessible frontends and robust backend APIs. 
        Beyond shipping features, I profile and optimise algorithms, queries, and data structures so responses feel instant at scale. 
        From database schema design to API integration on the client, I deliver reliable, maintainable systems.
        `,
        bullets: [
            "React.js, Vue.js, Angular, React Native & Expo",
            "Node.js, Express.js (REST APIs)",
            "Firebase Firestore & Functions, MongoDB & SQL",
            "Stripe payments & subscriptions",
            "Docker, CI/CD",
        ],
    },
    {
        id: "frontend",
        title: "UI/UX & Frontend",
        body: `
        I design and build clean, modern interfaces that are responsive by default and work beautifully on any device. 
        Guided by HCI principles and WCAG best practices, I ship fast, intuitive UIs with semantic HTML and thoughtful interactions. 
        For rapid delivery I prototype in Figma and implement in code or WordPress while maintaining design fidelity and performance.
        `,
        bullets: [
            "TailwindCSS, GSAP",
            "Figma, Wordpress",
            "HTML, CSS, SCSS, JavaScript"
        ],
    },
    {
        id: "optimisation",
        title: "SEO",
        body: `
        I run technical and on-page SEO audits with Screaming Frog and Semrush—fixing meta tags, headings, sitemaps, internal linking and schema. 
        I optimise content and Core Web Vitals to lift organic rankings and click-through. 
        For paid lift, I plan and manage Google Ads, while Google Tag Manager tracks user behaviour and conversions so we can iterate with data. 
        The focus: sustainable, compounding traffic—not just spikes.
        `,
        bullets: [
            "Screaming Frog & SemRush",
            "Technical SEO",
            "Google Tag Manager"],
    },
];

export const experiences = [
    {
        title: "Full Stack Web Developer",
        company_name: "Hedera, United Kingdom 🇬🇧",
        icon: "/companies/hedera.png",
        iconBg: "#012616",
        date: "October 2025 - Present",
        description: [
        ],
    },
    {
        title: "International Student Ambassador",
        company_name: "Lancaster University, United Kingdom 🇬🇧",
        icon: "/companies/lancaster.png",
        iconBg: "white",
        date: "November 2023 - October 2025",
        description: [
            "Answered questions and shared crucial information for over 300 prospective Lancaster University students.",
            "Delivered over 50 campus and accommodation tours to prospective students.",
            "Coordinated Offer Holder Event's venue with a team of ambassadors and ensured the seamless execution of the event, accommodating over 5000 visitors per event",
        ],
    },
    {
        title: "Student",
        company_name: "Lancaster University, United Kingdom 🇬🇧",
        icon: "/companies/lancaster.png",
        iconBg: "white",
        date: "October 2023 - July 2025",
        description: [
            "Bachelor's Degree in Software Engineering.",
            "Grade: 1:1, First Class Honours",
            "Relevant Modules: Operating Systems, Advanced Programming, Human Computer Interactions, Software Design, Database, Networking, Artificial Intelligence, Distributed System",
        ],
    },
    {
        title: "Web Developer Intern",
        company_name: "Logical BI Limited, Lancaster 🇬🇧",
        icon: "/companies/logicalBI.png",
        iconBg: "white",
        date: "November 2024 - Febuary 2025",
        description: [
            "Designed and developed an interactive community platform, allowing members to participate in events, post content, upload videos, and interact with one another.",
            "Automated user registration, payment processing, and invoicing, significantly reducing manual operations and improving customer experience.",
            "Minimised development costs by exclusively utilising Firebase and Stripe without relying on additional third-party services, optimising budget efficiency",
        ],
    },
    {
        title: "Robocon Team Member",
        company_name: "H.O.M.E Lab | Sunway University, Malaysia 🇲🇾",
        icon: "/companies/sunway.png",
        iconBg: "white",
        date: "April 2022 - April 2023",
        description: [
            "Contributed and designed a ring tosser robot for 2023 ABU Robocon using Blender.",
            "Conducted research on past competitions to enhance decision making process.",
        ],
    },

];

export const projects = [
    {
        id: "fleming-howland",
        title: "Fleming Howland",
        img: "/projects/FlemingHowland.png",
        description: [
            "Reduced translation costs by ~78% through automating the workflow with a custom Python script",
            "Developed reusable blocks for website."
        ],
        liveDemoLink: "https://fleminghowland.com/",
        type: "route",
        to: "/projects/fleming-howland",
    },
    {
        id: "profit-harmony",
        title: "Profit Harmony",
        img: "/projects/ProfitHarmony.png",
        description: [
            "Built a Stripe-powered membership community platform with Firebase automation for onboarding, gated content access, and subscription management."
        ],
        liveDemoLink: "https://profitharmony.com/",
        type: "route",
        to: "/projects/profit-harmony",
    },
    {
        id: "j-expense",
        title: "J Expense",
        img: "/projects/J-Expense.png",
        description: [
            "BEST USED IN MOBILE",
            "Developed a mobile-friendly expense tracking application using Angular and TypeScript, ensuring a modern and responsive user experience.",
            "Integrated Firebase Firestore for secure, real-time data storage, enabling instant updates on expenses.",
            "Implemented a real-time currency update feature, allowing users to track expenses in multiple currencies with automatic rate adjustments.",
            "Engineered a progressive web app (PWA) structure, making J-Expense installable directly from the web.",
        ],
        liveDemoLink: "https://j-expense-tracker.vercel.app/",
    },
];

export const HOME_SECTIONS = [
    { label: "Home", type: "section", id: "Home" },
    { label: "What I do", type: "section", id: "What-I-Do" },
    { label: "Experience", type: "section", id: "Experience" },
    { label: "Projects", type: "section", id: "Projects" },
    { label: "About", type: "section", id: "About" },
    { label: "Contact", type: "section", id: "Contact" },
];

export const CASE_STUDY_NAV = [
    { label: "Back to Projects", type: "route", to: "/#Projects" },
    { label: "Contact Jia Jun", type: "route", to: "/#Contact" },
];
