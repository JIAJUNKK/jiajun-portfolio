import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrubbed SplitText:
 * - Reveals letters as you scroll down
 * - Reverses smoothly as you scroll up
 * - Progress is tied to scroll (scrub: true)
 */
const SplitTextGsap = ({
    text = "",
    className = "",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    stagger = 0.05,
    start = "top 85%",
    end = "bottom 15%",
    ease = "power3.out",
    textAlign = "center",
}) => {
    const containerRef = useRef(null);
    const letterRefs = useRef([]);

    // reset refs each render for safety
    letterRefs.current = [];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const letters = letterRefs.current.filter(Boolean);

            // defensive: no letters, no timeline
            if (!letters.length) return;

            const tl = gsap.timeline({
                defaults: { ease },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start,
                    end,
                    scrub: true,           // <-- ties progress to scroll (for reverse-on-scroll-up)
                    fastScrollEnd: true,
                },
            });

            tl.fromTo(
                letters,
                from,
                { ...to, stagger }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [from, to, stagger, start, end, ease]);

    // Split text into words and letters
    const words = text.split(" ").map((w) => w.split(""));
    let runningIndex = 0;

    return (
        <p
            ref={containerRef}
            className={`split-parent ${className}`}
            style={{
                textAlign,
                overflow: "hidden",
                display: "inline",
                whiteSpace: "normal",
                wordWrap: "break-word",
            }}
        >
            {words.map((word, wi) => (
                <span key={`w-${wi}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {word.map((letter, li) => {
                        const idx = runningIndex++;
                        return (
                            <span
                                key={idx}
                                ref={(el) => (letterRefs.current[idx] = el)}
                                style={{ display: "inline-block", willChange: "transform, opacity" }}
                            >
                                {letter}
                            </span>
                        );
                    })}
                    <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
                </span>
            ))}
        </p>
    );
};

export default SplitTextGsap;
