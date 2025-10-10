import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "../../constants";
import ScrollVelocity from "../../reactBitsComponent/ScrollVelocity/ScrollVelocity";
import "./WhatIDo.scss";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDo({ services = SERVICES }) {
    const rootRef = useRef(null);
    const stageRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        const NAV_H = document.querySelector(".navbar")?.offsetHeight || 100;
        const OFFSET = NAV_H + 24;

        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add("(min-width: 1025px)", () => {
                const cards = cardsRef.current.filter(Boolean);
                if (!cards.length) return;

                const STACK_GAP = 120;
                const SCROLL_PER_CARD = 420;

                cards.forEach((el, i) => (el.style.zIndex = String(100 + i)));

                const tl = gsap.timeline({
                    defaults: { ease: "power1.out" },
                    scrollTrigger: {
                        trigger: stageRef.current,
                        start: () => `top top+=${OFFSET}`,
                        // add extra runway so release feels natural
                        end: () =>
                            `+=${cards.length * SCROLL_PER_CARD + Math.round(window.innerHeight * 0.5)}`,
                        scrub: 0.7,
                        pin: true,
                        pinSpacing: true,
                        fastScrollEnd: false,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                cards.forEach((card, i) => {
                    tl.fromTo(
                        card,
                        { y: "110%", immediateRender: false },
                        { y: i * STACK_GAP, duration: 0.9, ease: "power1.out" },
                        i
                    );
                });

                return () => tl.scrollTrigger?.kill();
            });
            // Mobile & tablets
            mm.add("(max-width: 1024px)", () => {
                const cards = cardsRef.current.filter(Boolean);
                if (!cards.length) return;

                const STACK_GAP = 65;
                const SCROLL_PER_CARD = 420;

                cards.forEach((el, i) => (el.style.zIndex = String(100 + i)));

                const tl = gsap.timeline({
                    defaults: { ease: "power1.out" },
                    scrollTrigger: {
                        trigger: stageRef.current,
                        start: () => `top top+=${OFFSET}`,
                        end: `+=${cards.length * SCROLL_PER_CARD}`,
                        scrub: 0.8,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                cards.forEach((card, i) => {
                    tl.fromTo(
                        card,
                        { y: "110%", immediateRender: false },
                        { y: i * STACK_GAP, duration: 0.9, ease: "power1.out" },
                        i
                    );
                });

                return () => tl.scrollTrigger?.kill();
            });
        }, rootRef);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <div className="what-i-do-rows" ref={rootRef} aria-labelledby="what-title">
            <div className="rows__stage" ref={stageRef}>
                {services.map((s, i) => (
                    <article
                        key={s.id}
                        className="rows__card"
                        ref={(el) => (cardsRef.current[i] = el)}
                    >
                        <div className="rows__numRow">
                            <span className="rows__num">{String(i + 1).padStart(2, "0")}</span>
                        </div>

                        <div className="rows__content">
                            <h3 className="rows__h3">{s.title}</h3>
                            <p className="rows__body">{s.body}</p>
                            <ul className="rows__bullets" role="list">
                                {(s.bullets || []).map((b, j) => (
                                    <li key={j} className="rows__bullet">
                                        <span className="rows__bulletIndex">{String(j + 1).padStart(2, "0")}</span>
                                        <span className="rows__bulletLabel">{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
