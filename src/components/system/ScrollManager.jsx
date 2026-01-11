import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { scrollToHash } from "../../utils/scrollToHash";

export default function ScrollManager() {
    const location = useLocation();
    const navType = useNavigationType(); // "PUSH" | "POP" | "REPLACE"
    const positionsRef = useRef(new Map()); // location.key -> scrollY

    // tell browser we handle it
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    // save scroll position for the page we're leaving
    useEffect(() => {
        const key = location.key;
        return () => {
            positionsRef.current.set(key, window.scrollY);
        };
    }, [location.key]);

    // restore / scroll-to-top / hash scroll
    useEffect(() => {
        // 1) hash wins
        if (location.hash) {
            scrollToHash(location.hash);
            const t = setTimeout(() => scrollToHash(location.hash), 250);
            return () => clearTimeout(t);
        }

        // 2) back/forward restores
        if (navType === "POP") {
            const y = positionsRef.current.get(location.key);
            if (typeof y === "number") {
                requestAnimationFrame(() => window.scrollTo({ top: y, left: 0, behavior: "auto" }));
                return;
            }
        }

        // 3) normal navigation goes to top
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    }, [location.pathname, location.hash, location.key, navType]);

    return null;
}
