'use client';

import { useEffect, useRef } from 'react';

export function ZoominfoHero() {
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const card = cardRef.current;
        if (!track || !card) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        </div>
    );
}
