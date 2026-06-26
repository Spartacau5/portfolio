'use client';

import { useEffect, useRef, useState } from 'react';

// Internal reactions captured in Slack when the 2-year B2B vision was shared
// across Arrive. Names/roles live here so they're easy to tweak; `accent` tints
// the initials avatar.
interface Reaction {
    quote: string;
    name: string;
    role: string;
    accent: string;
    source: string;
}

const REACTIONS: Reaction[] = [
    {
        quote:
            "I think it's incredible. It's really a positive piece that has been missing — both in terms of aligning within product, what we want to do and why. This made me get much more excited about the work I'm doing, seeing the potential we can create.",
        name: 'Max Librach',
        role: 'Head of B2B',
        accent: '#6366f1',
        source: 'Arrive for Business',
    },
    {
        quote:
            "This is sooo crazy… and so important to share. I want to work with Craft too 😄 — great work and a lot to do for sure 🚀. This got me so excited, you know how much marketing materials and enablement this will create.",
        name: 'Shandro van Taunay',
        role: 'Arrive for Business',
        accent: '#0ea5e9',
        source: 'Shared in #b2b-all',
    },
];

const AUTOPLAY_MS = 7000;

function initials(name: string) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function VisionReactions() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const count = REACTIONS.length;
    const go = (i: number) => setIndex(((i % count) + count) % count);

    // Auto-advance, paused on hover/focus, when the section is on screen and the
    // user hasn't asked to reduce motion.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let timer: ReturnType<typeof setInterval> | null = null;
        let visible = false;

        const tick = () => setIndex((c) => (c + 1) % count);
        const start = () => {
            if (timer || paused || !visible) return;
            timer = setInterval(tick, AUTOPLAY_MS);
        };
        const stop = () => {
            if (timer) clearInterval(timer);
            timer = null;
        };

        const io = new IntersectionObserver(
            (entries) => {
                visible = entries[0].isIntersecting;
                visible ? start() : stop();
            },
            { threshold: 0.4 }
        );
        io.observe(root);

        return () => {
            stop();
            io.disconnect();
        };
    }, [paused, count]);

    const r = REACTIONS[index];

    return (
        <div
            className="vr"
            ref={rootRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            <div className="vr-stage">
                <button
                    type="button"
                    className="vr-arrow"
                    aria-label="Previous reaction"
                    onClick={() => go(index - 1)}
                >
                    <svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                <article className="vr-card" key={index}>
                    <blockquote className="vr-quote">
                        <span className="vr-mark" aria-hidden="true">&ldquo;</span>
                        <p className="vr-text">{r.quote}</p>
                    </blockquote>

                    <figcaption className="vr-attribution">
                        <div className="vr-person-meta">
                            <p className="vr-name">{r.name}</p>
                            <p className="vr-role">{r.role}</p>
                            <p className="vr-source">{r.source}</p>
                        </div>
                        <div className="vr-avatar" style={{ backgroundColor: r.accent }}>
                            {initials(r.name)}
                        </div>
                    </figcaption>
                </article>

                <button
                    type="button"
                    className="vr-arrow"
                    aria-label="Next reaction"
                    onClick={() => go(index + 1)}
                >
                    <svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
            </div>

            <div className="vr-dots" role="tablist" aria-label="Reactions">
                {REACTIONS.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`Reaction ${i + 1}`}
                        className={`vr-dot ${i === index ? 'is-active' : ''}`}
                        onClick={() => go(i)}
                    />
                ))}
            </div>
        </div>
    );
}
