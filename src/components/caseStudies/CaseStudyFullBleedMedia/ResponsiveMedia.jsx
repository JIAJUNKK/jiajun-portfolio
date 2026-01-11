import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";

export function ResponsiveVideo({
    desktopSrc,
    mobileSrc,
    desktopPoster,
    mobilePoster,
    breakpoint = 768,
    ...videoProps
}) {
    const isMobile = useIsMobile(breakpoint);

    const src = useMemo(
        () => (isMobile ? mobileSrc : desktopSrc),
        [isMobile, mobileSrc, desktopSrc]
    );

    const poster = useMemo(
        () => (isMobile ? mobilePoster : desktopPoster),
        [isMobile, mobilePoster, desktopPoster]
    );

    return (
        <video
            key={src}
            src={src}
            poster={poster}
            playsInline
            muted
            autoPlay
            loop
            preload="metadata"
            {...videoProps}
        />
    );
}

export function ResponsiveImage({
    desktopSrc,
    mobileSrc,
    alt,
    breakpoint = 768,
    ...props
}) {
    const isMobile = useIsMobile(breakpoint);
    const src = isMobile ? (mobileSrc ?? desktopSrc) : desktopSrc;

    return <img src={src} alt={alt} loading="lazy" {...props} />;
}
