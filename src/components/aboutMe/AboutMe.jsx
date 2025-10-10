import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from "../../reactBitsComponent/ProfileCard/ProfileCard";
import "./aboutMe.scss";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
    const textRef = useRef(null);
    const navOffset = () => (document.querySelector(".navbar")?.offsetHeight || 0) + 12;

    const smoothScrollTo = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - navOffset(); // offset for fixed navbar
        window.scrollTo({ top: y, behavior: "smooth" });
    };

    const highlightImportantWords = (text, wordsToHighlight) => {
        let result = [];
        let lastIndex = 0;

        wordsToHighlight.forEach((phrase, i) => {
            const matchIndex = text.indexOf(phrase, lastIndex);

            if (matchIndex !== -1) {
                // Push text before the matched phrase
                result.push(text.substring(lastIndex, matchIndex));

                // Highlight the phrase (split by space if you want each word in its own <span>)
                const words = phrase.split(" ").map((word, index, arr) => (
                    <span
                        key={`${i}-${index}`}
                        className="highlight-effect"
                        style={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                        }}
                    >
                        {word}
                        {index < arr.length - 1 ? "\u00A0" : ""}
                    </span>
                ));

                result.push(...words);
                lastIndex = matchIndex + phrase.length;
            }
        });

        // Push any remaining text after the last match
        result.push(text.substring(lastIndex));

        return result;
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const el = textRef.current;
            const spans = el?.querySelectorAll(".highlight-effect");
            if (!spans?.length) return;

            // belt & suspenders: kill any old trigger with the same id
            ScrollTrigger.getById("about-highlights")?.kill();

            gsap.set(spans, { willChange: "clip-path" });

            gsap.fromTo(
                spans,
                { clipPath: "inset(0 100% 0 0)" },
                {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 1.1,
                    ease: "power2.out",
                    stagger: 0.05,
                    scrollTrigger: {
                        id: "about-highlights",
                        trigger: el,
                        start: "top 80%",
                        once: true,                 // ← play exactly once, never retrigger
                        // toggleActions: "play none none none", // (optional alternative)
                    },
                }
            );
        }, textRef);

        return () => ctx.revert();
    }, []);


    return (
        <div className="about-us">
            <div className="outer">

                <div className="image-container">
                    <ProfileCard
                        name="Kong Jia Jun"
                        title="Full Stack Developer"
                        handle="jiajunkk"
                        status="LinkedIn"
                        contactText="Contact Me"
                        avatarUrl="/JiaJun.png"
                        iconUrl="/iconpattern.png"
                        showBehindGradient={false}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => smoothScrollTo("Contact")}
                    />
                </div>

                <div className="text-container">
                    <h1>About Me 👨🏻‍💻</h1>
                    <h2>Full Stack Web Developer</h2>

                    <p ref={textRef}>
                        {highlightImportantWords(
                            `
                        I'm a full-stack web developer who ships fast, accessible products end-to-end. 
                        When it comes to developing websites and apps, on the front end I design clean, responsive interfaces (React/Next.js, Vue, Angular) with thoughtful micro-interactions; 
                        on the back end I build reliable RESTful APIs with Node.js and Express, backed by Firebase (Firestore/Functions), MongoDB and SQL, 
                        and integrate Stripe for checkout/subscriptions—wiring signed webhooks into the backend to update orders, manage access, and keep billing in sync in real time.                        My day-to-day stack includes TypeScript, TailwindCSS, Docker and CI/CD pipelines to keep delivery smooth and dependable. 
                        I optimise data models, queries and algorithms so experiences feel instant at scale. 
                        I also bring a product mindset—UX, performance, instrumentation and maintainability—to every feature across modern websites and apps.
                        `,
                            [
                                "full-stack web developer",
                                "accessible products",
                                "clean, responsive interfaces",
                                "React/Next.js",
                                "Vue",
                                "Angular",
                                "micro-interactions",
                                "RESTful APIs",
                                "Node.js",
                                "Express",
                                "Firebase",
                                "Firestore",
                                "Functions",
                                "MongoDB",
                                "SQL",
                                "Stripe",
                                "checkout/subscriptions",
                                "signed webhooks",
                                "real time",
                                "TypeScript",
                                "TailwindCSS",
                                "Docker",
                                "CI/CD",
                                "data models",
                                "queries",
                                "algorithms",
                                "UX",
                                "performance",
                                "instrumentation",
                                "maintainability"
                            ]
                        )}
                    </p>


                </div>
            </div>
        </div>
    );
};

export default AboutMe;
