import { useEffect, useState } from "react";

export default function useCoarsePointer() {
    const [coarse, setCoarse] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mql = window.matchMedia("(pointer: coarse)");
        const onChange = (e) => setCoarse(e.matches);

        if (mql.addEventListener) mql.addEventListener("change", onChange);
        else mql.addListener(onChange);

        return () => {
            if (mql.removeEventListener) mql.removeEventListener("change", onChange);
            else mql.removeListener(onChange);
        };
    }, []);

    return coarse;
}
