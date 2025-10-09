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
        title: "Student",
        company_name: "Lancaster University, United Kingdom 🇬🇧",
        icon: "/companies/lancaster.png",
        iconBg: "#383E56",
        date: "October 2023 - Present",
        description: [
            "Pursuing Bachelor's Degree in Computer Software Engineering.",
            "Predicted Grade: 1:1, First Class Honours",
            "Relevant Modules: Operating Systems, Advanced Programming, Human Computer Interactions, Software Design, Database, Networking, Artificial Intelligence, Distributed System",
        ],
    },
    {
        title: "Web Developer Intern",
        company_name: "Logical BI Limited, Lancaster 🇬🇧",
        icon: "/companies/logicalBI.png",
        iconBg: "#E6DEDD",
        date: "November 2024 - Present",
        description: [
            "Designed and developed an interactive community platform, allowing members to participate in events, post content, upload videos, and interact with one another.",
            "Automated user registration, payment processing, and invoicing, significantly reducing manual operations and improving customer experience.",
            "Minimised development costs by exclusively utilising Firebase and Stripe without relying on additional third-party services, optimising budget efficiency",
        ],
    },
    {
        title: "International Student Ambassador",
        company_name: "Lancaster University, United Kingdom 🇬🇧",
        icon: "/companies/lancaster.png",
        iconBg: "#383E56",
        date: "November 2023 - Present",
        description: [
            "Answered questions and doubts from over 300 prospective students for Lancaster University.",
            "Delivered visitors with over 25 campus and accommodation tours to prospective students.",
            " Coordinated Offer Holder Event’s venue with a team of ambassadors and ensured the seamless execution of the event, accommodating over 5000 visitors.",
        ],
    },
    {
        title: "Robocon Team Member",
        company_name: "H.O.M.E Lab | Sunway University, Malaysia 🇲🇾",
        icon: "/companies/sunway.png",
        iconBg: "#E6DEDD",
        date: "April 2022 - April 2023",
        description: [
            "Contributed and designed a ring tosser robot for 2023 ABU Robocon using Blender.",
            "Conducted research on past competitions to enhance decision making process.",
        ],
    },

];

export const projects = [
    {
        id: 1,
        title: "7 Mantap",
        img: "/projects/7Mantap.png",
        description: [
            "Leveraged REST API to establish connection to the MongoDB.",
            "Integrated with Stripe's API to facilitate secure checkout.",
            "Enhanced UX by interpreting the users' data in the database.",
            "Empowered users with comprehensive post-purchase support, including email confirmations, access to order history for tracking, and the ability to manage personal details seamlessly.",
        ],
        githubLink: "https://github.com/JIAJUNKK/7Mantap",
        liveDemoLink: "https://7mantap.vercel.app/",
    },
    {
        id: 2,
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
    {
        id: 3,
        title: "Health Buddy",
        img: "/projects/healthBuddy.png",
        description: [
            "Finalised the UI/UX requirements and implemented those as a design lead of a team of 5",
            "Set up Firebase server for Health Buddy's backend.",
            "Enable real time update to track users' progress with maximum delay of 1 second.",
        ],
        githubLink: "https://github.com/JIAJUNKK/HealthBuddy",
    },
    {
        id: 4,
        title: "Tian Ye Cushion",
        img: "/projects/tianye.png",
        description: [
            "Customised a website for a client in Malaysia using React, JS, SCCS and Firebase",
            "Allowed the client to easily update product descriptions, prices, and images using Firebase, minimising the need for manual intervention.",
        ],
        liveDemoLink: "https://tianyecushion.vercel.app/",
    },
    {
        id: 5,
        title: "Bomb Sweeper",
        img: "/projects/bombSweeper.png",
        description: [
            "Implemented the famous bomb sweeper game using Java.Swing.",
            "Enhanced the code's efficiency using recursion.",
            "Implemented adaptive difficulty algorithm for a balanced gaming experience, increasing player engagement by 50% and extending average playtime by 30%, catering to all player skill levels.",
        ],
        githubLink: "https://github.com/JIAJUNKK/BombSweeper",
    },
    {
        id: 6,
        title: "Instagram Follower Tracker",
        img: "/projects/instagram_follower_tracker.png",
        description: [
            "Implemented a Python and Selenium application aimed at identifying individuals who don’t follow back user on Instagram.",
            "Utilised Python file writing function to improve the efficiency by at least 20%.",
        ],
        githubLink: "https://github.com/JIAJUNKK/instagram_follower_tracker",
    },

];

export default { SERVICES, experiences, projects }
