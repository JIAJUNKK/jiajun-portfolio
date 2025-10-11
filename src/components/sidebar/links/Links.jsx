import { motion } from "framer-motion";

const variants = {
    open: { transition: { staggerChildren: 0.1 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 50, opacity: 0 },
};

const navOffset = () => (document.querySelector(".navbar")?.offsetHeight || 0) + 12;

const Links = ({ closeSidebar }) => {
    // label → what you display; id → the section id in your DOM
    const items = [
        { label: "Home", id: "Home" },
        { label: "What I Do", id: "What-I-Do" },
        { label: "Experience", id: "Experience" },
        { label: "Projects", id: "Projects" },
        { label: "About", id: "About" },
        { label: "Contact", id: "Contact" },
    ];

    const handleClick = (e, id) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            const y = target.getBoundingClientRect().top + window.scrollY - navOffset();
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        closeSidebar();
    };

    return (
        <motion.div className="links" variants={variants}>
            {items.map(({ label, id }) => (
                <motion.a
                    href={`#${id}`}
                    key={id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleClick(e, id)}
                    aria-label={`Go to ${label}`}
                >
                    {label}
                </motion.a>
            ))}
        </motion.div>
    );
};

export default Links;
