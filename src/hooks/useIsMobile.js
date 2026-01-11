import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 900) {
    const getMatches = () => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
    };

    const [isMobile, setIsMobile] = useState(getMatches);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const onChange = (e) => setIsMobile(e.matches);

        // sync once in case breakpoint changes
        setIsMobile(mql.matches);

        if (mql.addEventListener) mql.addEventListener("change", onChange);
        else mql.addListener(onChange);

        return () => {
            if (mql.removeEventListener) mql.removeEventListener("change", onChange);
            else mql.removeListener(onChange);
        };
    }, [breakpoint]);

    return isMobile;
}
