import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "../../constants";
import "./WhatIDo.scss";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDo({ services = SERVICES }) {
    const rootRef = useRef(null);
    const stageRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        const root = rootRef.current;
        const stage = stageRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!root || !stage || !cards.length) return;

        let frame = null;

        // --------------------------------------------------
        // Measurements
        // --------------------------------------------------

        const getViewportHeight = () =>
            window.visualViewport?.height ?? window.innerHeight;

        const getNavbarHeight = () =>
            document
                .querySelector(".navbar")
                ?.getBoundingClientRect()
                .height ?? 0;

        const getPinOffset = () => getNavbarHeight();

        const setStageHeight = () => {
            const available =
                getViewportHeight() - getPinOffset();

            stage.style.height = `${Math.max(
                300,
                available
            )}px`;
        };

        /*
         * Every header has the same CSS height,
         * so measuring the first one is enough.
         */
        const getHeaderHeight = () => {
            const header =
                cards[0]?.querySelector(".rows__header");

            return (
                header?.getBoundingClientRect().height ??
                64
            );
        };

        /*
         * Card 01 = 0
         * Card 02 = 1 header down
         * Card 03 = 2 headers down
         */
        const getCardRestY = (index) =>
            index * getHeaderHeight();

        /*
         * One transition per incoming card.
         */
        const getScrollPerCard = () =>
            gsap.utils.clamp(
                320,
                650,
                getViewportHeight() * 0.72
            );

        setStageHeight();

        // --------------------------------------------------
        // GSAP
        // --------------------------------------------------

        const ctx = gsap.context(() => {
            cards.forEach((card, index) => {
                gsap.set(card, {
                    zIndex: 100 + index,
                    force3D: true,
                });
            });

            /*
             * First card is already on screen.
             */
            gsap.set(cards[0], {
                y: 0,
            });

            /*
             * Remaining cards wait immediately below
             * the pinned stage.
             */
            gsap.set(cards.slice(1), {
                y: () => stage.clientHeight,
            });

            if (cards.length === 1) return;

            const timeline = gsap.timeline({
                defaults: {
                    ease: "none",
                },

                scrollTrigger: {
                    trigger: stage,

                    start: () =>
                        `top top+=${getPinOffset()}`,

                    /*
                     * No fake dead-scroll after the final card.
                     */
                    end: () =>
                        `+=${Math.round(
                            (cards.length - 1) *
                            getScrollPerCard()
                        )}`,

                    pin: true,
                    pinSpacing: true,

                    scrub: 0.35,

                    anticipatePin: 1,

                    invalidateOnRefresh: true,
                },
            });

            cards.slice(1).forEach((card, index) => {
                const cardIndex = index + 1;

                timeline.fromTo(
                    card,
                    {
                        y: () => stage.clientHeight,
                    },
                    {
                        /*
                         * This is the key.
                         *
                         * Each new card stops exactly
                         * one header below the previous.
                         */
                        y: () =>
                            getCardRestY(cardIndex),

                        duration: 1,
                        ease: "none",
                    },
                    index
                );
            });
        }, root);

        // --------------------------------------------------
        // Refresh handling
        // --------------------------------------------------

        const requestRefresh = () => {
            if (frame) {
                cancelAnimationFrame(frame);
            }

            frame = requestAnimationFrame(() => {
                setStageHeight();

                requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                });
            });
        };

        const handleRefreshInit = () => {
            setStageHeight();
        };

        ScrollTrigger.addEventListener(
            "refreshInit",
            handleRefreshInit
        );

        window.addEventListener(
            "resize",
            requestRefresh
        );

        window.visualViewport?.addEventListener(
            "resize",
            requestRefresh
        );

        document.fonts?.ready
            ?.then(requestRefresh)
            .catch(() => { });

        requestRefresh();

        return () => {
            if (frame) {
                cancelAnimationFrame(frame);
            }

            window.removeEventListener(
                "resize",
                requestRefresh
            );

            window.visualViewport?.removeEventListener(
                "resize",
                requestRefresh
            );

            ScrollTrigger.removeEventListener(
                "refreshInit",
                handleRefreshInit
            );

            ctx.revert();
        };
    }, [services.length]);

    return (
        <section
            ref={rootRef}
            className="what-i-do-rows"
            aria-labelledby="what-title"
        >
            <div
                ref={stageRef}
                className="rows__stage"
            >
                {services.map((service, index) => (
                    <article
                        key={service.id}
                        className="rows__card"
                        ref={(element) => {
                            cardsRef.current[index] =
                                element;
                        }}
                    >
                        <header className="rows__header">
                            <span className="rows__num">
                                {String(index + 1).padStart(
                                    2,
                                    "0"
                                )}
                            </span>

                            <h3 className="rows__h3">
                                {service.title}
                            </h3>
                        </header>

                        <div className="rows__content">
                            <p className="rows__body">
                                {service.body}
                            </p>

                            {!!service.bullets?.length && (
                                <ul
                                    className="rows__bullets"
                                    role="list"
                                >
                                    {service.bullets.map(
                                        (
                                            bullet,
                                            bulletIndex
                                        ) => (
                                            <li
                                                key={
                                                    bulletIndex
                                                }
                                                className="rows__bullet"
                                            >
                                                <span className="rows__bulletIndex">
                                                    {String(
                                                        bulletIndex +
                                                        1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                <span className="rows__bulletLabel">
                                                    {bullet}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}