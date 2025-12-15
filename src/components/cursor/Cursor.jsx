import { useEffect, useState } from "react";
import { m, useSpring } from "framer-motion";
import useCoarsePointer from "../../hooks/useCoarsePointer";
import "./cursor.scss";

const Cursor = () => {
    const coarse = useCoarsePointer();
    if (coarse) return null;
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const springX = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 });
    const springY = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 });

    useEffect(() => {
        const mouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            springX.set(e.clientX - 25);
            springY.set(e.clientY - 25);
        };

        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, [springX, springY]);

    return (
        <m.div
            className="cursor"
            style={{
                x: springX,
                y: springY,
            }}
        />
    );
};

export default Cursor;
