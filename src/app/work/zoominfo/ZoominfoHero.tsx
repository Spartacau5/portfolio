'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { scrollToTop } from '@/app/lib/lenisScroll';

export function ZoominfoHero() {
    const router = useRouter();
    const lenis = useLenis();
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const hintRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        if (window.history.length > 1) router.back();
        else router.push('/work');
    };

    useEffect(() => {
        const track = trackRef.current;
        const card = cardRef.current;
        const closeBtn = closeRef.current;
        const hint = hintRef.current;
        if (!track || !card) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Start every load at the fullscreen top. Browsers restore the previous
        // scroll position on refresh, which — combined with the tall scroll
        // runway we set below — would otherwise drop the hero into a broken
        // mid-shrink state (hero stuck fullscreen, content unreachable, nav
        // showing). Forcing a clean top makes a refresh behave exactly like
        // entering the case study from the home page.
        const html = document.documentElement;
        const prevRestoration = history.scrollRestoration;
        try { history.scrollRestoration = 'manual'; } catch { /* unsupported */ }
        scrollToTop(lenis, true);
        // Hide the floating nav immediately so it never flashes over the
        // fullscreen hero before the first scroll frame paints. With reduced
        // motion the hero docks instantly, so the nav should stay visible.
        if (!reduce) html.classList.add('arrive-immersive');

        const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const shape = (t: number) => Math.pow(t, 1.4);

        const GAP = 100;
        const REST_TOP = 95;
        let runway = 600;
        let restW = 0;
        let restH = 0;

        const layout = () => {
            const vh = window.innerHeight;
            restW = track.clientWidth;
            restH = restW / 2;
            runway = clamp(vh * 1.05, 720, 1350);
            track.style.height = REST_TOP + restH + runway + GAP + 'px';
            update();
        };

        let raf = 0;
        const update = () => {
            raf = 0;
            const vw = document.documentElement.clientWidth;
            const vh = window.innerHeight;
            const trackTopDoc = track.getBoundingClientRect().top + window.scrollY;
            const s = window.scrollY - trackTopDoc;

            const dock = reduce ? 1 : shape(clamp(s, 0, runway) / runway);
            const w = lerp(vw, restW, dock);
            const h = lerp(vh, restH, dock);
            const left = (vw - w) / 2;
            const top = lerp(0, REST_TOP, dock) - Math.max(0, s - runway);
            const radius = lerp(0, 16, dock);

            card.style.width = w + 'px';
            card.style.height = h + 'px';
            card.style.borderRadius = radius + 'px';
            card.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            card.style.boxShadow = `0 ${24 * dock}px ${60 * dock}px rgba(13, 27, 42, ${0.18 * dock})`;

            const immersive = !reduce && dock < 0.999 && top < 64;
            document.documentElement.classList.toggle('arrive-immersive', immersive);

            // Overlay UI (close button + scroll hint) live only while the hero
            // fills the screen and slickly fade away as the user starts scrolling.
            if (closeBtn) {
                const o = reduce ? 0 : 1 - clamp(s / 120, 0, 1);
                closeBtn.style.opacity = String(o);
                closeBtn.style.pointerEvents = o < 0.05 ? 'none' : 'auto';
            }
            if (hint) {
                const o = reduce ? 0 : 1 - clamp(s / 200, 0, 1);
                hint.style.opacity = String(o);
            }
        };

        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };

        layout();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', layout);
        const settle = requestAnimationFrame(layout);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', layout);
            cancelAnimationFrame(raf);
            cancelAnimationFrame(settle);
            try { history.scrollRestoration = prevRestoration; } catch { /* unsupported */ }
            document.documentElement.classList.remove('arrive-immersive');
        };
    }, []);

    return (
        <div className="arrive-hero-track" ref={trackRef}>
            <div className="arrive-hero-card zi-hero-card" ref={cardRef}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/zoominfo-hero.gif"
                    alt=""
                    className="arrive-cs-hero-video"
                    aria-hidden="true"
                />
            </div>

            {/* Close button — visible while the hero fills the screen, fades on scroll */}
            <button
                type="button"
                className="arrive-hero-close"
                ref={closeRef}
                onClick={handleClose}
                aria-label="Close"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {/* Scroll hint — two bouncing chevrons, fades on scroll */}
            <div className="arrive-scroll-hint" ref={hintRef} aria-hidden="true">
                <div className="arrive-scroll-arrows">
                    <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
                        <path d="M2 2l11 11L24 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
                        <path d="M2 2l11 11L24 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
