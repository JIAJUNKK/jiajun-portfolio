import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";

import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import ScrollManager from "./components/system/ScrollManager";
import { scrollToHash } from "./utils/scrollToHash";
import { installViewportVars } from "./utils/viewportVars";

import "./styles/base.scss";
import "./styles/layout.scss";

const FlemingHowlandPage = lazy(() => import("./pages/FlemingHowland/FlemingHowlandPage"));
const ProfitHarmonyPage = lazy(() => import("./pages/ProfitHarmony/ProfitHarmonyPage"));

function ScrollToHashOnRouteChange() {
    const location = useLocation();

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useEffect(() => {
        if (!location.hash) return;

        scrollToHash(location.hash);
        const t = setTimeout(() => scrollToHash(location.hash), 250);
        return () => clearTimeout(t);
    }, [location.pathname, location.hash]);

    return null;
}

const App = () => {
    useEffect(() => {
        return installViewportVars();
    }, []);
    return (
        <LazyMotion features={domAnimation}>
            <Router>
                <Navbar />
                <ScrollManager />

                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/projects/fleming-howland" element={<FlemingHowlandPage />} />
                        <Route path="/projects/profit-harmony" element={<ProfitHarmonyPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </LazyMotion>
    );
};

export default App;
