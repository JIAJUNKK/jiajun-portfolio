// Sidebar.jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Links from "./links/Links";
import ToggleButton from "./toggleButton/ToggleButton";
import "./sidebar.scss";

const CENTER = 24 + 48 / 2;

const variants = {
    open: {
        clipPath: `circle(1200px at ${CENTER}px ${CENTER}px)`,
        transition: {
            type: "spring",
            stiffness: 20,
        },
    },
    closed: {
        clipPath: `circle(30px at ${CENTER}px ${CENTER}px)`,
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

const SidebarOverlay = ({ open, closeSidebar }) =>
    createPortal(
        <motion.div className={`sidebar-overlay ${open ? "open" : ""}`}
            animate={open ? "open" : "closed"} initial={false}>
            <motion.div className="sidebar-bg" variants={variants}>
                <Links closeSidebar={closeSidebar} />
            </motion.div>
        </motion.div>,
        document.body
    );

const TogglePortal = ({ open, setOpen }) =>
    createPortal(
        <div className="sidebar-toggle">
            <ToggleButton setOpen={setOpen} isOpen={open} />
        </div>,
        document.body
    );

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <TogglePortal open={open} setOpen={setOpen} />
            <SidebarOverlay open={open} closeSidebar={() => setOpen(false)} />
        </>
    );
}
