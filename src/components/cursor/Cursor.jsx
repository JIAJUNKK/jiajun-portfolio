import { useEffect, useRef, useState } from "react";
import { m, useSpring } from "framer-motion";
import useCoarsePointer from "../../hooks/useCoarsePointer";
import "./cursor.scss";

const Cursor = () => {
    const coarse = useCoarsePointer();
    if (coarse) return null;

    const [mode, setMode] = useState("none"); // "none" | "link" | "button"
    const targetRef = useRef(null);

    // orb follows pointer
    const orbX = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 });
    const orbY = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 });
    const orbOpacity = useSpring(1, { stiffness: 260, damping: 26, mass: 0.6 });
    const orbScale = useSpring(1, { stiffness: 260, damping: 26, mass: 0.6 });

    // hover highlight (underline / outline)
    const hoverX = useSpring(0, { stiffness: 500, damping: 40, mass: 0.6 });
    const hoverY = useSpring(0, { stiffness: 500, damping: 40, mass: 0.6 });
    const hoverW = useSpring(0, { stiffness: 500, damping: 40, mass: 0.6 });
    const hoverH = useSpring(0, { stiffness: 500, damping: 40, mass: 0.6 });
    const hoverR = useSpring(999, { stiffness: 500, damping: 40, mass: 0.6 });
    const hoverOpacity = useSpring(0, { stiffness: 260, damping: 26, mass: 0.6 });

    const setHoverForElement = (el, nextMode) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (nextMode === "link") {
            hoverX.set(rect.left);
            hoverY.set(rect.bottom + 6);
            hoverW.set(rect.width);
            hoverH.set(3);
            hoverR.set(999);
            hoverOpacity.set(1);
            return;
        }

        if (nextMode === "button") {
            const pad = 6;
            const cs = window.getComputedStyle(el);
            const br = parseFloat(cs.borderRadius || "12") || 12;

            hoverX.set(rect.left - pad);
            hoverY.set(rect.top - pad);
            hoverW.set(rect.width + pad * 2);
            hoverH.set(rect.height + pad * 2);
            hoverR.set(br + pad);
            hoverOpacity.set(1);
        }
    };

    useEffect(() => {
        const mouseMove = (e) => {
            // orb position
            orbX.set(e.clientX - 25);
            orbY.set(e.clientY - 25);

            // detect hover target under pointer
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const linkEl = el?.closest?.("a[href]");
            const btnEl = el?.closest?.("button, [role='button'], .pillButton");

            let nextMode = "none";
            let nextTarget = null;

            if (linkEl) {
                nextMode = "link";
                nextTarget = linkEl;
            } else if (btnEl) {
                nextMode = "button";
                nextTarget = btnEl;
            }

            if (nextMode !== mode || nextTarget !== targetRef.current) {
                setMode(nextMode);
                targetRef.current = nextTarget;

                if (nextMode === "none") {
                    hoverOpacity.set(0);
                    orbOpacity.set(1);
                    orbScale.set(1);
                } else {
                    orbOpacity.set(0);
                    orbScale.set(0.6);
                    setHoverForElement(nextTarget, nextMode);
                }
            }
        };

        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, [mode, orbX, orbY, hoverOpacity, orbOpacity, orbScale]);

    useEffect(() => {
        const update = () => {
            if (mode === "none") return;
            const el = targetRef.current;
            if (!el) return;
            setHoverForElement(el, mode);
        };

        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update, true);
            window.removeEventListener("resize", update);
        };
    }, [mode]);

    return (
        <>
            <m.div
                className="cursorOrb"
                style={{
                    x: orbX,
                    y: orbY,
                    opacity: orbOpacity,
                    scale: orbScale,
                }}
            />
            <m.div
                className="cursorHover"
                data-mode={mode}
                style={{
                    x: hoverX,
                    y: hoverY,
                    width: hoverW,
                    height: hoverH,
                    borderRadius: hoverR,
                    opacity: hoverOpacity,
                }}
            />
        </>
    );
};

export default Cursor;
