// src/utils/scrollToHash.js
const navOffset = () => (document.querySelector(".navbar")?.offsetHeight || 0) + 12;

export function scrollToHash(hash, opts = {}) {
    const id = String(hash || "").replace("#", "").trim();
    if (!id) return;

    const {
        timeoutMs = 4000, // wait up to 4s for the element to exist
        initialBehavior = "auto", // jump immediately first
        behavior = "smooth", // then smooth-adjust
    } = opts;

    const start = Date.now();

    const attempt = (scrollBehavior) => {
        const el = document.getElementById(id);
        if (!el) return false;

        const y = el.getBoundingClientRect().top + window.scrollY - navOffset();
        window.scrollTo({ top: y, behavior: scrollBehavior });
        return true;
    };

    // try immediately
    if (attempt(initialBehavior)) {
        // smooth-adjust next frame (handles nav offset changes after paint)
        requestAnimationFrame(() => attempt(behavior));
        return;
    }

    // keep retrying until element exists or timeout
    const tick = () => {
        if (Date.now() - start > timeoutMs) return;
        if (attempt(initialBehavior)) {
            requestAnimationFrame(() => attempt(behavior));
            return;
        }
        requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
}
