import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import FlemingHowlandPage from "./pages/FlemingHowland/FlemingHowlandPage";
import { scrollToHash } from "./utils/scrollToHash";

import "./styles/base.scss";
import "./styles/layout.scss";

function ScrollToHashOnRouteChange() {
    const location = useLocation();

    // prevent browser restoration fighting your manual scroll
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useEffect(() => {
        if (!location.hash) return;

        // run now
        scrollToHash(location.hash);

        // run again shortly after (beats late "scroll to top" effects & layout shifts)
        const t = setTimeout(() => {
            scrollToHash(location.hash);
        }, 250);

        return () => clearTimeout(t);
    }, [location.pathname, location.hash]);

    return null;
}

const App = () => {
    return (
        <Router>
            <Navbar />
            <ScrollToHashOnRouteChange />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects/fleming-howland" element={<FlemingHowlandPage />} />
                {/* later: more routes */}
            </Routes>
        </Router>
    );
};

export default App;
