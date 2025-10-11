import "./navbar.scss";
import Sidebar from "../sidebar/Sidebar";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
    useEffect(() => {
        // 1) Ensure CSS var --nav-h matches real nav height
        const nav = document.querySelector(".navbar");
        const setH = () =>
            document.documentElement.style.setProperty("--nav-h", `${nav?.offsetHeight || 100}px`);
        setH();
        window.addEventListener("resize", setH);
        return () => window.removeEventListener("resize", setH);
    }, []);

    useEffect(() => {
        // 2) Create a single fixed glass slab if not present
        let slab = document.getElementById("glass-slab");
        if (!slab) {
            slab = document.createElement("div");
            slab.id = "glass-slab";
            document.body.appendChild(slab);
        }

        const nav = document.querySelector(".navbar");
        const container = document.querySelector(".portfolio");          // Projects wrapper
        const progress = document.querySelector(".portfolio .progress"); // sticky header

        const navH = () => (nav?.offsetHeight ? nav.offsetHeight : 100);
        const progH = () => (progress?.offsetHeight ? progress.offsetHeight : 0);

        let ticking = false;
        const compute = () => {
            ticking = false;

            const nh = navH();
            const c = container?.getBoundingClientRect();
            const ph = progH();

            // Is the projects header sticky?
            const stuck = !!(c && c.top <= nh && c.bottom >= nh + ph);

            // 3) Resize slab: cover navbar only, or navbar + sticky header
            slab.style.height = stuck ? `${nh + ph}px` : `${nh}px`;

            // visual tweak: drop navbar shadow when sticky header is present
            nav?.classList.toggle("over-projects", stuck);
        };

        const onScrollOrResize = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(compute);
            }
        };

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        compute(); // initial

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, []);

    return (
        <div className="navbar">
            <Sidebar />
            <div className="wrapper">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Jia Jun
                </motion.span>

                <div className="social">
                    <a href="https://www.instagram.com/jiajunkk" target="_blank" rel="noreferrer noopener">
                        <img src="/instagram.svg" alt="Instagram" />
                    </a>
                    <a href="https://github.com/JIAJUNKK" target="_blank" rel="noreferrer noopener">
                        <img src="/github.svg" alt="GitHub" />
                    </a>
                    <a href="https://www.linkedin.com/in/jiajunkk/" target="_blank" rel="noreferrer noopener">
                        <img src="/linkedin.svg" alt="LinkedIn" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
