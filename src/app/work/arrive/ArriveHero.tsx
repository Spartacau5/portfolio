'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * Scroll-driven hero for the Arrive case study.
 *
 * On load the video card fills the viewport (fixed, edge-to-edge, behind the
 * floating nav) with a white tagline that fades in beneath the logo. As you
 * scroll the runway it shrinks — centered first, then lifting to a top anchor —
 * and the page content rises to meet it flush.
 *
 * Driven entirely from scrollY (no sticky), so positioning is deterministic:
 *  - `runway` is the scroll distance the shrink consumes.
 *  - A power-curve `shape` (no flat tail) keeps the card visibly shrinking until
 *    it docks, so the content arrives exactly as it settles — no dead space.
 *  - `.arrive-hero-track` reserves the settled height + runway + a small gap.
 */
export function ArriveHero() {
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const card = cardRef.current;
        const tagline = taglineRef.current;
        if (!track || !card) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        // Smooth start, but a non-zero finishing slope (no flat tail) so the card
        // keeps shrinking right up until it docks — that's what kills the gap.
        const shape = (t: number) => Math.pow(t, 1.4);

        const GAP = 100; // breathing room between the settled hero and the intro
        const REST_TOP = 95; // settled card's distance from the top (below the nav)
        let runway = 600; // scroll distance the shrink consumes
        let restW = 0; // resting hero width
        let restH = 0; // resting hero height (16 / 8 aspect)

        // The white fullscreen tagline reveals ~1s after the banner fills.
        let revealed = false;
        const revealTimer = window.setTimeout(() => {
            revealed = true;
            update();
        }, 1000);

        const layout = () => {
            const vh = window.innerHeight;
            restW = track.clientWidth;
            restH = restW / 2; // matches the 16 / 8 resting aspect ratio
            runway = clamp(vh * 1.05, 720, 1350);
            // Reserve: settled top offset + hero height + runway + gap, so the
            // intro lands exactly GAP px below the settled card.
            track.style.height = REST_TOP + restH + runway + GAP + 'px';
            update();
        };

        let raf = 0;
        const update = () => {
            raf = 0;
            const vw = document.documentElement.clientWidth;
            const vh = window.innerHeight;
            const trackTopDoc = track.getBoundingClientRect().top + window.scrollY;
            const s = window.scrollY - trackTopDoc; // px scrolled into the track

            // dock: 0 = fullscreen, 1 = settled.
            const dock = reduce ? 1 : shape(clamp(s, 0, runway) / runway);
            const w = lerp(vw, restW, dock);
            const h = lerp(vh, restH, dock);
            const left = (vw - w) / 2;
            // Shrinks anchored toward the top: the bottom edge descends smoothly
            // and monotonically (top goes 0 → REST_TOP as it docks), so the gap to
            // the content below closes steadily instead of dipping in mid-scroll
            // — no "text drifts close then pulls away". Past the runway the docked
            // card rides up with the page, content glued a constant GAP beneath.
            const top = lerp(0, REST_TOP, dock) - Math.max(0, s - runway);
            const radius = lerp(0, 16, dock);

            card.style.width = w + 'px';
            card.style.height = h + 'px';
            card.style.borderRadius = radius + 'px';
            card.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            card.style.boxShadow = `0 ${24 * dock}px ${60 * dock}px rgba(30, 12, 54, ${0.14 * dock})`;

            // White tagline: fades in once and then persists beneath the logo
            // for the whole shrink, so it stays docked under the mark.
            if (tagline) {
                tagline.style.opacity = revealed ? '1' : '0';
            }

            // Hide the floating nav/header while the card still covers the top of
            // the screen; reveal it once the card has dropped below the header.
            const immersive = !reduce && dock < 0.999 && top < 64;
            document.documentElement.classList.toggle('arrive-immersive', immersive);
        };

        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };

        layout();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', layout);
        // Re-measure after fonts/late layout settle the track position.
        const settle = requestAnimationFrame(layout);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', layout);
            cancelAnimationFrame(raf);
            cancelAnimationFrame(settle);
            window.clearTimeout(revealTimer);
            document.documentElement.classList.remove('arrive-immersive');
        };
    }, []);

    return (
        <div className="arrive-hero-track" ref={trackRef}>
            <div className="arrive-hero-card" ref={cardRef}>
                <video
                    src="/images/arrive-hero.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="arrive-cs-hero-video"
                />
                <div className="arrive-hero-center">
                    <Image
                        src="/images/arrive-logo.png"
                        alt="Arrive"
                        width={320}
                        height={80}
                        className="arrive-cs-hero-logo arrive-hero-logo"
                        priority
                    />
                    <div className="arrive-hero-tagline" ref={taglineRef}>
                        Making cities more liveable
                    </div>
                </div>
            </div>
        </div>
    );
}
