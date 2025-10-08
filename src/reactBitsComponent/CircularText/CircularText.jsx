import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
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

/**
 * Props:
 * - text: string
 * - spinDuration: number (seconds)
 * - onHover: "slowDown" | "speedUp" | "pause" | "goBonkers" | undefined
 * - className: string
 * - targetRef: ref to the IMG (or any element) we should wrap around
 * - gap: number (px) distance from the image edge to the text ring
 * - radius: number (px) optional fixed radius override
 */
const CircularText = ({
    text,
    spinDuration = 35,
    onHover = "speedUp",
    className = "",
    targetRef,
    gap = 16,
    radius: radiusProp,
}) => {
    const letters = Array.from(text || "");
    const controls = useAnimation();
    const [currentRotation, setCurrentRotation] = useState(0);
    const [radius, setRadius] = useState(radiusProp ?? 150);

    // Auto-fit to target element (image) width
    useLayoutEffect(() => {
        if (radiusProp) {
            setRadius(radiusProp);
            return;
        }
        const el = targetRef?.current;
        if (!el || typeof ResizeObserver === "undefined") return;

        const ro = new ResizeObserver(([entry]) => {
            const w = entry.contentRect.width;
            // Ring radius = half image width + gap
            setRadius(w / 2 + gap);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [targetRef, gap, radiusProp]);

    // Spin baseline
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

    // Heuristic font size that scales with ring size + letter count
    const fontSizePx = Math.round(
        Math.max(10, Math.min(28, (radius * 0.7) / Math.max(letters.length, 12)))
    );

    return (
        <motion.div
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
                const angleDeg = (360 / letters.length) * i;
                // Place each char on a circle: rotate -> move outwards -> rotate back 90deg so letters are upright
                const transform = `rotate(${angleDeg}deg) translate(${radius}px) rotate(90deg)`;
                return (
                    <span
                        key={`${letter}-${i}`}
                        style={{ transform, WebkitTransform: transform }}
                    >
                        {letter}
                    </span>
                );
            })}
        </motion.div>
    );
};

export default CircularText;
