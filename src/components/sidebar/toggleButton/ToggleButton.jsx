// ToggleButton.jsx
import { m } from "framer-motion";

const ToggleButton = ({ setOpen, isOpen }) => {
    const stroke = "#011f4b";

    return (
        <button
            className="sidebar-toggle-btn"
            data-open={isOpen}
            onClick={() => setOpen((p) => !p)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-pressed={isOpen}
        >
            <m.svg
                width="40" height="40" viewBox="0 0 24.5 24.5"
                initial={false}
                animate={isOpen ? "open" : "closed"}
            >
                <m.path
                    strokeWidth="3" stroke={stroke} strokeLinecap="round"
                    variants={{ closed: { d: "M 4 6 L 20 6" }, open: { d: "M 5 18 L 19 6" } }}
                    transition={{ duration: 0.2 }}
                />
                <m.path
                    strokeWidth="3" stroke={stroke} strokeLinecap="round" d="M 4 12 L 20 12"
                    variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                    transition={{ duration: 0.15 }}
                />
                <m.path
                    strokeWidth="3" stroke={stroke} strokeLinecap="round"
                    variants={{ closed: { d: "M 4 18 L 20 18" }, open: { d: "M 5 6 L 19 18" } }}
                    transition={{ duration: 0.2 }}
                />
            </m.svg>
        </button>
    );
};

export default ToggleButton;
