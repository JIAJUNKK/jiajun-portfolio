import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { HOME_SECTIONS, CASE_STUDY_NAV, projects } from "../../../constants/index";
import "./Links.scss";

const navOffset = () => (document.querySelector(".navbar")?.offsetHeight || 0) + 12;

export default function Links({ closeSidebar = () => { } }) {
    const location = useLocation();
    const navigate = useNavigate();

    const onHome = location.pathname === "/";
    const onCaseStudy = location.pathname.startsWith("/projects/");
    const currentHash = (location.hash || "").replace("#", "");

    const isMobile = useIsMobile(768);

    const caseStudies = useMemo(() => {
        return projects
            .filter((p) => !!p.to && p.to.startsWith("/projects/"))
            .map((p) => ({
                label: p.title,
                type: "route",
                to: p.to,
                meta: p.meta ?? (Array.isArray(p.description) ? p.description[0] : ""),
                tags: p.tags ?? [],
            }));
    }, []);


    const leftColumn = useMemo(() => {
        if (onCaseStudy) {
            return { title: "Navigate", items: CASE_STUDY_NAV, kind: "rows" };
        }
        return { title: "On this page", items: HOME_SECTIONS, kind: "rows-2col" };
    }, [onCaseStudy, CASE_STUDY_NAV, HOME_SECTIONS]);

    const rightColumn = useMemo(() => {
        return { title: "Case studies", items: caseStudies, kind: "caseStudies" };
    }, [caseStudies]);

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

    // ✅ Mobile: which panel is shown
    const [mobileView, setMobileView] = useState(() => (onCaseStudy ? "caseStudies" : "onPage"));
    useEffect(() => {
        // default view: caseStudy pages show Case Studies first, home shows On Page first
        setMobileView(onCaseStudy ? "caseStudies" : "onPage");
    }, [onCaseStudy]);

    // optional: clear search when leaving caseStudies on mobile
    useEffect(() => {
        if (!isMobile) return;
        if (mobileView !== "caseStudies") setQuery("");
    }, [isMobile, mobileView]);

    const isActive = (item) => {
        if (item.type === "section") return currentHash === item.id;
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

    // ✅ pick what to render on mobile
    const showLeft = !isMobile || mobileView === "onPage";
    const showRight = !isMobile || mobileView === "caseStudies";

    return (
        <div className={`rb-mega rb-mega--active-${activeColumn}`}>
            {/* ✅ Mobile pill toggle (doesn't affect desktop) */}
            <div className="rb-mobilePillWrap">
                <div className="rb-pill" role="tablist" aria-label="Menu view">
                    <button
                        type="button"
                        className={"rb-pillBtn" + (mobileView === "onPage" ? " is-active" : "")}
                        onClick={() => setMobileView("onPage")}
                        role="tab"
                        aria-selected={mobileView === "onPage"}
                    >
                        {leftColumn.title}
                    </button>
                    <button
                        type="button"
                        className={"rb-pillBtn" + (mobileView === "caseStudies" ? " is-active" : "")}
                        onClick={() => setMobileView("caseStudies")}
                        role="tab"
                        aria-selected={mobileView === "caseStudies"}
                    >
                        {rightColumn.title}
                    </button>
                </div>
            </div>

            {/* LEFT */}
            {showLeft && (
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
                                            <span className="rb-caret" aria-hidden="true">
                                                ↗
                                            </span>
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
                                            <span className="rb-caret" aria-hidden="true">
                                                ↗
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* RIGHT */}
            {showRight && (
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
                                        <span className="rb-caret" aria-hidden="true">
                                            ↗
                                        </span>
                                    </a>
                                ))}

                                {filteredCaseStudies.length === 0 && <div className="rb-empty">No matches.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
