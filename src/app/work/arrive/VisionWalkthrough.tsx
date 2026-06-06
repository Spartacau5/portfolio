'use client';

import { useEffect, useRef } from 'react';

// Each step: a heading, a looping video (looped from `start` seconds), and a
// vertical timeline of points.
const STEPS = [
    {
        n: 1,
        label: 'Browse',
        src: '/images/arrive-vision1.mp4',
        start: 8,
        points: [
            'User comes to a marketing page where we highlight the breadth of things we can support through ParkMobile business.',
            'Help users find the right solution by tailoring navigation to their needs.',
            'Feature-differentiated pricing tiers with minimal (but transparent) add-ons.',
        ],
    },
    {
        n: 2,
        label: 'Onboard',
        src: '/images/arrive-vision2.mp4',
        start: 7,
        points: [
            'Once user has selected their base product, we collect contact details and payment settings.',
            'Discover & browse integrations (expense, telematics).',
            'Configure extensive restrictions & controls (old & new).',
        ],
    },
    {
        n: 3,
        label: 'Configuration',
        src: '/images/arrive-vision3.mp4',
        start: 9,
        points: [
            'With configuration complete, we’ll surface insights and additional services that drive smarter parking and mobility decisions.',
            'Dashboard displays additional mobility services like automated tolling for hassle-free expense management and telematics integration to maximize cost efficiency.',
        ],
    },
    {
        n: 4,
        label: 'Analyze',
        src: '/images/arrive-vision4.mp4',
        start: 14,
        points: [
            'Users have a dedicated reporting space with interactive graphs to better visualize and explore data.',
            'We drill into a parking inefficiency to investigate further and receive suggestions on how to park better.',
            'While this information is valuable let’s make sure to meet users where they are and share insights to fleet managers and drivers accordingly (via email).',
        ],
    },
];

// Plays a muted video on a loop that restarts at `start` seconds (instead of 0),
// so the loop skips the intro of each clip.
function LoopingVideo({ src, start }: { src: string; start: number }) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        const seekToStart = () => {
            try {
                v.currentTime = start;
            } catch {
                /* seeking before metadata is ready — ignore */
            }
        };
        const onEnded = () => {
            seekToStart();
            v.play().catch(() => {});
        };
        v.addEventListener('loadedmetadata', seekToStart);
        v.addEventListener('ended', onEnded);
        if (v.readyState >= 1) seekToStart();
        return () => {
            v.removeEventListener('loadedmetadata', seekToStart);
            v.removeEventListener('ended', onEnded);
        };
    }, [start]);

    return <video ref={ref} src={src} autoPlay muted playsInline />;
}

// Timing (ms) for the looping fill animation.
const LEAD = 600; // all-grey pause at the start so the first dot visibly fills in
const DOT_HOLD = 360; // pause on each lit dot
const SEG_FILL = 620; // time for the line to trickle to the next dot
const END_HOLD = 1100; // pause on the last dot before resetting to grey

export function VisionWalkthrough() {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const timelines = Array.from(root.querySelectorAll<HTMLElement>('.vw-timeline')).map((tl) => ({
            dots: Array.from(tl.querySelectorAll<HTMLElement>('.vw-dot')),
            fills: Array.from(tl.querySelectorAll<HTMLElement>('.vw-connector-fill')),
        }));

        const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            timelines.forEach((t) => {
                t.dots.forEach((d) => d.classList.add('is-on'));
                t.fills.forEach((f) => (f.style.height = '100%'));
            });
            return;
        }

        let raf = 0;
        let startTime = 0;
        let running = false;

        // Map elapsed time within one timeline's cycle to a head position in
        // [0, segs] — dots light as the head passes, the line fills between them.
        const headFor = (elapsed: number, segs: number) => {
            const cycle = LEAD + (segs + 1) * DOT_HOLD + segs * SEG_FILL + END_HOLD;
            let t = elapsed % cycle;
            if (t < LEAD) return -1; // all grey before the first dot lights
            t -= LEAD;
            if (t < DOT_HOLD) return 0;
            t -= DOT_HOLD;
            for (let i = 0; i < segs; i++) {
                if (t < SEG_FILL) return i + t / SEG_FILL;
                t -= SEG_FILL;
                if (t < DOT_HOLD) return i + 1;
                t -= DOT_HOLD;
            }
            return segs; // end hold
        };

        const draw = (now: number) => {
            if (!startTime) startTime = now;
            const elapsed = now - startTime;
            timelines.forEach((t) => {
                const segs = t.dots.length - 1;
                const h = headFor(elapsed, segs);
                t.dots.forEach((d, i) => d.classList.toggle('is-on', h >= i - 0.001));
                t.fills.forEach((f, i) => (f.style.height = clamp(h - i, 0, 1) * 100 + '%'));
            });
            if (running) raf = requestAnimationFrame(draw);
        };

        const startLoop = () => {
            if (running) return;
            running = true;
            startTime = 0;
            raf = requestAnimationFrame(draw);
        };
        const stopLoop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };

        // Only animate while the section is on screen.
        const io = new IntersectionObserver(
            (entries) => (entries[0].isIntersecting ? startLoop() : stopLoop()),
            { threshold: 0 }
        );
        io.observe(root);

        return () => {
            stopLoop();
            io.disconnect();
        };
    }, []);

    return (
        <section className="vw" ref={rootRef}>
            {STEPS.map((step) => (
                <div className="vw-step-block" key={step.n}>
                    <h3 className="vw-step-heading">
                        {step.n}. {step.label}
                    </h3>
                    <div className="vw-step-body">
                        <div className="vw-video">
                            <LoopingVideo src={step.src} start={step.start} />
                        </div>
                        <ol className="vw-timeline">
                            {step.points.map((pt, i) => (
                                <li className="vw-item" key={i}>
                                    <div className="vw-marker">
                                        <span className="vw-dot" />
                                        {i < step.points.length - 1 && (
                                            <span className="vw-connector">
                                                <span className="vw-connector-fill" />
                                            </span>
                                        )}
                                    </div>
                                    <p className="vw-text">{pt}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            ))}
        </section>
    );
}
