import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Links.scss";

const navOffset = () => (document.querySelector(".navbar")?.offsetHeight || 0) + 12;

export default function Links({ closeSidebar = () => { } }) {
    const location = useLocation();
    const navigate = useNavigate();

    const onHome = location.pathname === "/";
    const onCaseStudy = location.pathname.startsWith("/projects/");
    const currentHash = (location.hash || "").replace("#", "");

    // ---------- Sections ----------
    const homeSections = useMemo(
        () => [
            { label: "Home", type: "section", id: "Home" },
            { label: "What I do", type: "section", id: "What-I-Do" },
            { label: "Experience", type: "section", id: "Experience" },
            { label: "Projects", type: "section", id: "Projects" },
            { label: "About", type: "section", id: "About" },
            { label: "Contact", type: "section", id: "Contact" },
        ],
        []
    );

    // ---------- Case studies ----------
    const caseStudies = useMemo(
        () => [
            {
                label: "Fleming Howland",
                type: "route",
                to: "/projects/fleming-howland",
                meta: "Translation workflow · WordPress",
                tags: ["WordPress", "Workflow"],
            },
            // add more later...
        ],
        []
    );

    // On case study page, left column becomes "Navigate"
    const caseStudyNav = useMemo(
        () => [
            { label: "Back to Home", type: "route", to: "/#Home" },
            { label: "Back to Projects", type: "route", to: "/#Projects" },
            { label: "Contact", type: "route", to: "/#Contact" },
        ],
        []
    );

    const leftColumn = useMemo(() => {
        if (onCaseStudy) {
            return { title: "Navigate", items: caseStudyNav, kind: "rows" };
        }
        return { title: "On this page", items: homeSections, kind: "rows-2col" };
    }, [onCaseStudy, caseStudyNav, homeSections]);

    const rightColumn = useMemo(() => {
        return { title: "Case studies", items: caseStudies, kind: "caseStudies" };
    }, [caseStudies]);

    // Active column determines which gets more width
    const activeColumn = onCaseStudy ? "right" : "left";

    // ---------- Search ----------
    const [query, setQuery] = useState("");
    const filteredCaseStudies = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return caseStudies;

        return caseStudies.filter((x) => {
            const hay = [x.label, x.meta || "", ...(x.tags || []), x.to || ""].join(" ").toLowerCase();
            return hay.includes(q);
        });
    }, [caseStudies, query]);

    const isActive = (item) => {
        if (item.type === "section") return false;

        // keep route highlighting (case studies / navigate links)
        if (item.type === "route") return location.pathname === item.to;

        return false;
    };


    const goToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - navOffset();
        window.scrollTo({ top: y, behavior: "smooth" });
    };

    const handleClick = (e, item) => {
        e.preventDefault();

        if (item.type === "route") {
            navigate(item.to);
            closeSidebar();
            return;
        }

        // section
        if (!onHome) {
            navigate(`/#${item.id}`);
            closeSidebar();
            return;
        }

        goToSection(item.id);
        window.history.replaceState(null, "", `/#${item.id}`);
        closeSidebar();
    };

    return (
        <div className={`rb-mega rb-mega--active-${activeColumn}`}>
            {/* LEFT */}
            <div className="rb-col rb-col--left">
                <div className="rb-panel">
                    <div className="rb-head">
                        <div className="rb-title">{leftColumn.title}</div>
                    </div>

                    <div className="rb-body">
                        {leftColumn.kind === "rows-2col" ? (
                            <div className="rb-rows rb-rows--two">
                                {leftColumn.items.map((item) => (
                                    <a
                                        key={item.id || item.to || item.label}
                                        href={item.type === "route" ? item.to : `#${item.id}`}
                                        onClick={(e) => handleClick(e, item)}
                                        className={"rb-row" + (isActive(item) ? " is-active" : "")}
                                    >
                                        <span className="rb-rowText">{item.label}</span>
                                        <span className="rb-caret" aria-hidden="true">↗</span>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="rb-rows rb-rows--one">
                                {leftColumn.items.map((item) => (
                                    <a
                                        key={item.id || item.to || item.label}
                                        href={item.type === "route" ? item.to : `#${item.id}`}
                                        onClick={(e) => handleClick(e, item)}
                                        className={"rb-row" + (isActive(item) ? " is-active" : "")}
                                    >
                                        <span className="rb-rowText">{item.label}</span>
                                        <span className="rb-caret" aria-hidden="true">↗</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="rb-col rb-col--right">
                <div className="rb-panel">
                    <div className="rb-head">
                        <div className="rb-title">{rightColumn.title}</div>
                    </div>

                    <div className="rb-body">
                        <div className="rb-searchRow">
                            <input
                                className="rb-search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search case studies…"
                                aria-label="Search case studies"
                            />
                            <div className="rb-count" aria-hidden="true">
                                {filteredCaseStudies.length}
                            </div>
                        </div>

                        <div className="rb-csList" role="list">
                            {filteredCaseStudies.map((item) => (
                                <a
                                    key={item.to || item.label}
                                    href={item.to}
                                    onClick={(e) => handleClick(e, item)}
                                    className={"rb-csRow" + (isActive(item) ? " is-active" : "")}
                                    role="listitem"
                                >
                                    <div className="rb-csMain">
                                        <div className="rb-csTitle">{item.label}</div>
                                        {item.meta && <div className="rb-csMeta">{item.meta}</div>}

                                        {!!item.tags?.length && (
                                            <div className="rb-tags">
                                                {item.tags.slice(0, 3).map((t) => (
                                                    <span className="rb-tag" key={t}>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <span className="rb-caret" aria-hidden="true">↗</span>
                                </a>
                            ))}

                            {filteredCaseStudies.length === 0 && <div className="rb-empty">No matches.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
