import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { m, useAnimation } from "framer-motion";
import "./CircularText.css";

const getRotationTransition = (duration, from, loop = true) => ({
    from,
    to: from + 360,
    ease: "linear",
    duration,
    type: "tween",
    repeat: loop ? Infinity : 0,
});
const getTransition = (duration, from) => ({
    rotate: getRotationTransition(duration, from),
    scale: { type: "spring", damping: 20, stiffness: 300 },
});

const CircularText = ({
    text,
    spinDuration = 35,
    onHover = "speedUp",
    className = "",
    targetRef,
    gap = 16,
    radius: radiusProp,
    tracking = 0,          // px added after each glyph (use negative to pack tighter)
    startAngle = -90,      // center at top by default
}) => {
    const letters = Array.from(text || "");
    const controls = useAnimation();
    const containerRef = useRef(null);

    const [currentRotation, setCurrentRotation] = useState(0);
    const [radius, setRadius] = useState(radiusProp ?? 150);
    const [angles, setAngles] = useState([]);

    // --- auto-fit radius from target element (image) ---
    // "use client"
    useEffect(() => {
        if (radiusProp) {
            setRadius(radiusProp);
            return;
        }

        const el = targetRef?.current;
        if (!el) return;

        // Prefer offsetWidth so transforms from framer-motion don’t skew size
        const readWidth = () => (el instanceof HTMLElement && el.offsetWidth) || el.getBoundingClientRect().width || 0;

        const update = () => {
            const w = readWidth();
            if (w > 0) setRadius(w / 2 + gap);
        };

        // 1) Run once immediately
        update();

        // 2) If it's an IMG, wait for the actual pixels
        let imgLoadCleanup = () => { };
        if (el.tagName === "IMG") {
            const img = /** @type {HTMLImageElement} */ (el);
            // decode() fires even for cached images in many browsers
            if ("decode" in img) {
                img.decode().then(update).catch(() => { }); // ignore decoding errors
            }
            if (!img.complete) {
                const onLoad = () => update();
                img.addEventListener("load", onLoad, { once: true });
                imgLoadCleanup = () => img.removeEventListener("load", onLoad);
            }
        }

        // 3) Observe both the image and its parent container
        let ro;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(() => update());
            ro.observe(el);
            if (el.parentElement) ro.observe(el.parentElement);
        }

        // 4) Last-ditch fallback: poll briefly in case RO never fires in prod
        const pollId = setInterval(() => {
            const w = readWidth();
            if (w > 0) {
                setRadius(w / 2 + gap);
                clearInterval(pollId);
            }
        }, 250);

        return () => {
            imgLoadCleanup();
            ro?.disconnect();
            clearInterval(pollId);
        };
    }, [targetRef, gap, radiusProp]);

    // --- compute angles by glyph width (arc-length spacing) ---
    const computeAngles = () => {
        const root = containerRef.current;
        if (!root || letters.length === 0) return setAngles([]);

        const cs = window.getComputedStyle(root);
        const fSize = parseFloat(cs.fontSize) || 16;
        const fWeight = cs.fontWeight || "700";
        const fFamily = cs.fontFamily || "inherit";

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = `${fWeight} ${fSize}px ${fFamily}`;

        const widths = letters.map((ch) => ctx.measureText(ch === "\n" ? " " : ch).width);
        const totalWidth =
            widths.reduce((a, b) => a + b, 0) + tracking * Math.max(letters.length - 1, 0);

        const degPerPx = 360 / Math.max(totalWidth, 1);
        let accPx = 0;
        const a = widths.map((w, i) => {
            const angle = startAngle + accPx * degPerPx;
            accPx += w + (i < widths.length - 1 ? tracking : 0);
            return angle;
        });
        setAngles(a);
    };

    useLayoutEffect(() => {
        computeAngles();
        const ro = new ResizeObserver(computeAngles);
        if (containerRef.current) ro.observe(containerRef.current);
        window.addEventListener("resize", computeAngles);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", computeAngles);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, tracking, startAngle]);

    // --- spin baseline + hover controls ---
    useEffect(() => {
        controls.start({
            rotate: currentRotation + 360,
            scale: 1,
            transition: getTransition(spinDuration, currentRotation),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spinDuration, controls, onHover, text]);

    const handleHoverStart = () => {
        if (!onHover) return;
        const map = {
            slowDown: spinDuration * 2,
            speedUp: spinDuration / 4,
            pause: null,
            goBonkers: spinDuration / 20,
        };
        if (onHover === "pause") {
            controls.start({
                rotate: currentRotation,
                scale: 1,
                transition: {
                    rotate: { type: "spring", damping: 20, stiffness: 300 },
                    scale: { type: "spring", damping: 20, stiffness: 300 },
                },
            });
            return;
        }
        const dur = map[onHover] ?? spinDuration;
        controls.start({
            rotate: currentRotation + 360,
            scale: onHover === "goBonkers" ? 0.9 : 1,
            transition: getTransition(dur, currentRotation),
        });
    };
    const handleHoverEnd = () => {
        controls.start({
            rotate: currentRotation + 360,
            scale: 1,
            transition: getTransition(spinDuration, currentRotation),
        });
    };

    // scale font relative to radius & amount of text
    const fontSizePx = Math.round(
        Math.max(10, Math.min(28, (radius * 0.7) / Math.max(letters.length, 12)))
    );

    return (
        <m.div
            ref={containerRef}
            initial={{ rotate: 0 }}
            className={`circular-text ${className}`}
            animate={controls}
            onUpdate={(latest) => {
                const r = Number(latest.rotate);
                if (!Number.isNaN(r)) setCurrentRotation(r);
            }}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            aria-hidden="true"
            style={{ fontSize: `${fontSizePx}px` }}
        >
            {letters.map((letter, i) => {
                const angleDeg = angles[i] ?? startAngle;
                const transform = `rotate(${angleDeg}deg) translate(${radius}px) rotate(90deg)`;
                return (
                    <span key={`${letter}-${i}`} style={{ transform, WebkitTransform: transform }}>
                        {letter}
                    </span>
                );
            })}
        </m.div>
    );
};

export default CircularText;
