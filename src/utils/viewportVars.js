export function installViewportVars() {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
        const vv = window.visualViewport;

        const innerH = window.innerHeight;
        const vvH = vv?.height ?? innerH;

        // Keyboard detection heuristic (works well on iOS)
        const keyboardOpen = !!vv && vvH < innerH - 80;

        // IMPORTANT: During iOS rubber-band overscroll, vv.offsetTop can jump.
        // We only apply vv.offsetTop when keyboard is open; otherwise force 0.
        const top = keyboardOpen ? Math.max(0, vv.offsetTop || 0) : 0;

        root.style.setProperty("--vv-top", `${top}px`);
        root.style.setProperty("--vv-h", `${vvH}px`);
    };

    const schedule = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("orientationchange", schedule, { passive: true });
    window.visualViewport?.addEventListener("resize", schedule, { passive: true });
    window.visualViewport?.addEventListener("scroll", schedule, { passive: true });

    document.addEventListener("focusin", schedule, true);
    document.addEventListener("focusout", schedule, true);

    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", schedule);
        window.removeEventListener("orientationchange", schedule);
        window.visualViewport?.removeEventListener("resize", schedule);
        window.visualViewport?.removeEventListener("scroll", schedule);
        document.removeEventListener("focusin", schedule, true);
        document.removeEventListener("focusout", schedule, true);
    };
}
