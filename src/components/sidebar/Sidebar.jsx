// src/components/sidebar/Sidebar.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Links from "./links/Links";
import ToggleButton from "./toggleButton/ToggleButton";
import "./sidebar.scss";

const panelVariants = {
    closed: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.16, ease: [0.22, 0.7, 0.2, 1] },
    },
    open: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: [0.22, 0.7, 0.2, 1] },
    },
};

const overlayVariants = {
    closed: { opacity: 0, transition: { duration: 0.12 } },
    open: { opacity: 1, transition: { duration: 0.12 } },
};

function setSlabHeightForMenu(open, menuEl) {
    const slab = document.getElementById("glass-slab");
    if (!slab) return;

    if (!open) {
        // let Navbar.jsx compute() handle projects; default back to nav height
        slab.style.height = `var(--nav-h)`;
        slab.style.setProperty("--menu-h", "0px");
        return;
    }

    // Measure visible menu height (cap at viewport so slab always covers what you see)
    const rect = menuEl?.getBoundingClientRect();
    const menuH = rect ? Math.max(0, Math.min(rect.height, window.innerHeight)) : 0;

    slab.style.setProperty("--menu-h", `${menuH}px`);
    slab.style.height = `calc(var(--nav-h) + var(--menu-h))`;
}

const SidebarOverlay = ({ open, closeSidebar }) => {
    const menuRef = useRef(null);

    // Keep glass-slab height synced while menu is open (and on resize)
    useLayoutEffect(() => {
        setSlabHeightForMenu(open, menuRef.current);

        if (!open) return;

        const onResize = () => setSlabHeightForMenu(true, menuRef.current);
        window.addEventListener("resize", onResize);

        // Watch content changes (accordion open/close etc.)
        const ro = new ResizeObserver(() => setSlabHeightForMenu(true, menuRef.current));
        if (menuRef.current) ro.observe(menuRef.current);

        return () => {
            window.removeEventListener("resize", onResize);
            ro.disconnect();
        };
    }, [open]);

    return createPortal(
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    className="sidebar-overlay"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={overlayVariants}
                >
                    {/* click-outside */}
                    <button
                        className="sidebar-backdrop"
                        type="button"
                        aria-label="Close menu"
                        onClick={closeSidebar}
                    />

                    {/* Full-width dropdown attached to navbar */}
                    <motion.div
                        ref={menuRef}
                        className="sidebar-bg"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={panelVariants}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                    >
                        <div className="sidebar-panel">
                            <Links closeSidebar={closeSidebar} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

const TogglePortal = ({ open, setOpen }) =>
    createPortal(
        <div className="sidebar-toggle">
            <ToggleButton setOpen={setOpen} isOpen={open} />
        </div>,
        document.body
    );

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("menu-open", open);
        return () => document.body.classList.remove("menu-open");
    }, [open]);

    useEffect(() => {
        document.body.classList.toggle("menu-open", open);

        // ✅ Force Navbar to recompute immediately (restore shadow/border without scrolling)
        window.dispatchEvent(new Event("nav-recompute"));

        return () => document.body.classList.remove("menu-open");
    }, [open]);

    return (
        <>
            <TogglePortal open={open} setOpen={setOpen} />
            <SidebarOverlay open={open} closeSidebar={() => setOpen(false)} />
        </>
    );
}
