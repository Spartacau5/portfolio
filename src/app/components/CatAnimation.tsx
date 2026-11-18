'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { analytics } from './GoogleAnalytics';
import {
    createPetSession,
    idleLine,
    NUDGE_AFTER_MS,
    STREAK_GAP_MS,
} from '../lib/billuPets';

// Frame order: cat1 through cat13 (note: cat6 doesn't exist)
const frameSequence = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13];

const FLUSH_MS = 700; // batch rapid pets into one counter request
const MAX_BATCH = 25; // matches the API cap

type CatAnimationProps = {
    /** 'click' (default) pets Billu and counts it; 'hover' plays the stretch on mouse-enter and lets clicks fall through */
    trigger?: 'click' | 'hover';
    /** don't give Billu a hover-buddy line (e.g. inside presentation decks) */
    hideTooltip?: boolean;
};

export default function CatAnimation({ trigger = 'click', hideTooltip = false }: CatAnimationProps = {}) {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<NodeJS.Timeout | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [petCount, setPetCount] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    // Pet streak → what Arpit's hover buddy says
    const session = useRef<ReturnType<typeof createPetSession> | null>(null);
    if (session.current === null) session.current = createPetSession();
    const [petLine, setPetLine] = useState<string | null>(null);
    const [streak, setStreak] = useState(0);
    const nudgeTimer = useRef<number | null>(null);
    const idleTimer = useRef<number | null>(null);

    // Batched counter writes
    const pending = useRef(0);
    const flushTimer = useRef<number | null>(null);

    useEffect(() => setMounted(true), []);

    // Load pet count from API on mount
    useEffect(() => {
        fetch('/api/cat-counter')
            .then(res => res.json())
            .then(data => setPetCount(data.count))
            .catch(() => setPetCount(0));
    }, []);

    // Preload all images
    useEffect(() => {
        const preloadImages = async () => {
            const promises = frameSequence.map((num) => {
                return new Promise<void>((resolve) => {
                    const img = new window.Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                    img.src = `/images/cat${num}.svg`;
                });
            });
            await Promise.all(promises);
            setImagesLoaded(true);
        };
        preloadImages();
    }, []);

    // Visual-only animation (no pet count increment)
    const playAnimationVisual = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        let frame = 0;

        const animate = () => {
            frame++;
            if (frame >= frameSequence.length) {
                frame = 0;
                setCurrentFrame(frame);
                setIsAnimating(false);
                return;
            }
            setCurrentFrame(frame);
            animationRef.current = setTimeout(animate, 130);
        };

        animationRef.current = setTimeout(animate, 130);
    }, [isAnimating]);

    const flush = useCallback((useBeacon = false) => {
        if (flushTimer.current !== null) {
            window.clearTimeout(flushTimer.current);
            flushTimer.current = null;
        }
        const amount = pending.current;
        if (!amount) return;
        pending.current = 0;
        const body = JSON.stringify({ amount });

        if (useBeacon && typeof navigator.sendBeacon === 'function') {
            navigator.sendBeacon('/api/cat-counter', body);
            return;
        }
        fetch('/api/cat-counter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
            keepalive: true,
        })
            .then(res => res.json())
            .then(data => {
                // server total + anything petted since this batch went out
                if (typeof data.count === 'number') setPetCount(data.count + pending.current);
            })
            .catch(() => {});
    }, []);

    // Don't lose a streak's pets if the tab closes mid-batch
    useEffect(() => {
        const onHide = () => flush(true);
        window.addEventListener('pagehide', onHide);
        return () => {
            window.removeEventListener('pagehide', onHide);
            flush();
        };
    }, [flush]);

    const clearLineTimers = () => {
        if (nudgeTimer.current !== null) window.clearTimeout(nudgeTimer.current);
        if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
        nudgeTimer.current = idleTimer.current = null;
    };

    // Every click counts — the stretch keeps playing, but pets never get dropped.
    const pet = useCallback(() => {
        analytics.trackCatPet();

        pending.current += 1;
        setPetCount(c => (c ?? 0) + 1);
        if (pending.current >= MAX_BATCH) flush();
        else {
            if (flushTimer.current !== null) window.clearTimeout(flushTimer.current);
            flushTimer.current = window.setTimeout(() => flush(), FLUSH_MS);
        }

        const beat = session.current!.pet();
        setPetLine(beat.line);
        setStreak(beat.streak);

        // Pause mid-streak → Arpit eggs you on. Longer pause → back to idle.
        clearLineTimers();
        nudgeTimer.current = window.setTimeout(() => {
            const nudge = session.current!.nudge();
            if (nudge) setPetLine(nudge);
        }, NUDGE_AFTER_MS);
        idleTimer.current = window.setTimeout(() => {
            setPetLine(null);
            setStreak(0);
        }, STREAK_GAP_MS + 1800);

        playAnimationVisual();
    }, [flush, playAnimationVisual]);

    // Auto-play animation once per session on first visit
    useEffect(() => {
        if (!imagesLoaded) return;
        const hasPlayed = sessionStorage.getItem('cat-animation-played');
        if (!hasPlayed) {
            sessionStorage.setItem('cat-animation-played', 'true');
            // Small delay so the page settles before animation starts
            const timer = setTimeout(() => {
                playAnimationVisual();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [imagesLoaded, playAnimationVisual]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
            clearLineTimers();
        };
    }, []);

    const frameNumber = frameSequence[currentFrame];
    const hoverMode = trigger === 'hover';
    const speaks = !hideTooltip;

    // What Arpit's hover buddy says. The buddy re-speaks whenever this changes.
    const buddyLine = petLine ?? (mounted ? idleLine(petCount) : 'You can pet my cat Billu.');
    const badge = petLine && streak >= 2 ? `×${streak}` : undefined;

    return (
        <div
            className="cat-animation-container"
            data-buddy={speaks ? buddyLine : undefined}
            data-buddy-badge={speaks ? badge : undefined}
            data-buddy-hint={speaks && !hoverMode ? 'my cat Billu' : undefined}
            onClick={hoverMode ? undefined : pet}
            onMouseEnter={() => {
                if (hoverMode) playAnimationVisual();
            }}
            onMouseLeave={() => {
                clearLineTimers();
                setPetLine(null);
                setStreak(0);
            }}
            style={{
                cursor: hoverMode ? 'default' : 'pointer',
                width: '220px',
                height: '62px',
                overflow: 'visible',
                position: 'relative',
            }}
        >
            {/* SVG with cropped viewBox to show only the cat */}
            <svg
                viewBox="260 625 400 110"
                width="220"
                height="60"
                style={{
                    display: 'block',
                    opacity: imagesLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <image
                    href={`/images/cat${frameNumber}.svg`}
                    x="0"
                    y="0"
                    width="1694"
                    height="820"
                />
            </svg>
        </div>
    );
}
