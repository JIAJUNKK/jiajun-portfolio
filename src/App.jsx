import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import FlemingHowlandPage from "./pages/FlemingHowland/FlemingHowlandPage";

import "./app/base.scss";
import "./app/layout.scss";

const App = () => {
    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects/fleming-howland" element={<FlemingHowlandPage />} />
                {/* later: more routes */}
            </Routes>
        </Router>
    );
};

export default App;
