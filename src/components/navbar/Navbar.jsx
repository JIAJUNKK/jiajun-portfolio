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
        // Create the slab once
        let slab = document.getElementById("glass-slab");
        if (!slab) {
            slab = document.createElement("div");
            slab.id = "glass-slab";
            document.body.appendChild(slab);
        }

        const nav = document.querySelector(".navbar");

        const navH = () => (nav?.offsetHeight ? nav.offsetHeight : 100);

        let ticking = false;

        const compute = () => {
            ticking = false;

            // ✅ Query *inside* compute so it works even if Projects mounts later
            const container = document.querySelector(".portfolio");
            const progress = document.querySelector(".portfolio .progress");

            const nh = navH();
            const ph = progress?.offsetHeight ? progress.offsetHeight : 0;

            // If we're not on the Projects area/page, reset to navbar-only slab
            if (!container || !progress) {
                slab.style.height = `${nh}px`;
                nav?.classList.remove("over-projects");
                progress?.classList.remove("is-stuck");
                return;
            }

            const c = container.getBoundingClientRect();

            // Is the projects header sticky?
            const stuck = c.top <= nh && c.bottom >= nh + ph;

            // Resize slab: cover navbar only, or navbar + sticky header
            slab.style.height = stuck ? `${nh + ph}px` : `${nh}px`;

            nav?.classList.toggle("over-projects", stuck);
            progress?.classList.toggle("is-stuck", stuck);
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


    useEffect(() => {
        if (!window.visualViewport) return;

        let raf = 0;
        const apply = () => {
            raf = 0;
            const vv = window.visualViewport;
            const top = Math.max(0, vv?.offsetTop || 0);
            document.documentElement.style.setProperty('--vv-top', `${top}px`);
        };
        const onVV = () => { if (!raf) raf = requestAnimationFrame(apply); };

        visualViewport.addEventListener('scroll', onVV);
        visualViewport.addEventListener('resize', onVV);
        apply();

        return () => {
            visualViewport.removeEventListener('scroll', onVV);
            visualViewport.removeEventListener('resize', onVV);
            if (raf) cancelAnimationFrame(raf);
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
