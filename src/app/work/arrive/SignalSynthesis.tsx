'use client';

import { useEffect, useRef } from 'react';

// Two kinds of truth converge into one strategy. The two columns up top carry
// the signal sources side by side (external = the people who park, internal =
// the people who sell it); each one periodically fires a pulse that travels
// down its connector into the centered node at the bottom, which charges up as
// signals land — then the whole thing resets and loops.

type Group = 'external' | 'internal';

interface Source {
    id: string;
    label: string;
    group: Group;
    x: number;
    y: number;
    w: number;
}

const CHIP_H = 40;

const SOURCES: Source[] = [
    // External column (left)
    { id: 'drivers', label: 'Drivers · the core persona', group: 'external', x: 70, y: 70, w: 236 },
    { id: 'dispatch', label: 'Dispatchers & fleet managers', group: 'external', x: 70, y: 126, w: 276 },
    { id: 'admins', label: 'B2B admins · expense & optimization', group: 'external', x: 70, y: 182, w: 322 },
    // Internal column (right)
    { id: 'product', label: 'Product', group: 'internal', x: 610, y: 70, w: 120 },
    { id: 'sales', label: 'Sales', group: 'internal', x: 610, y: 126, w: 120 },
    { id: 'marketing', label: 'Marketing', group: 'internal', x: 610, y: 182, w: 120 },
];

// Node anchor (top-center of the dark card) every connector converges down to.
const TARGET = { x: 500, y: 330 };

function anchorOf(s: Source) {
    return { x: s.x + s.w / 2, y: s.y + CHIP_H };
}

function pathOf(s: Source) {
    const a = anchorOf(s);
    const dy = TARGET.y - a.y;
    return `M ${a.x} ${a.y} C ${a.x} ${a.y + dy * 0.45}, ${TARGET.x} ${TARGET.y - dy * 0.45}, ${TARGET.x} ${TARGET.y}`;
}

// Timing (ms) for one loop of the synthesis.
const LEAD = 500; // calm beat before the first signal fires
const STAGGER = 520; // gap between successive signals firing
const TRAVEL = 950; // time a pulse takes to reach the node
const FINAL_HOLD = 1700; // hold on the fully-charged node before resetting

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function SignalSynthesis() {
    const rootRef = useRef<HTMLDivElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
    const sourceRefs = useRef<(SVGGElement | null)[]>([]);
    const haloRef = useRef<SVGRectElement>(null);
    const nodeRef = useRef<SVGGElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const n = SOURCES.length;
        const lengths = pathRefs.current.map((p) => (p ? p.getTotalLength() : 0));

        const setFinalState = () => {
            sourceRefs.current.forEach((g) => g?.classList.add('is-lit'));
            pathRefs.current.forEach((p) => p?.classList.add('is-active'));
            dotRefs.current.forEach((d) => d && (d.style.opacity = '0'));
            if (haloRef.current) haloRef.current.style.opacity = '1';
            nodeRef.current?.classList.add('is-full');
        };

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setFinalState();
            return;
        }

        const cycle = LEAD + (n - 1) * STAGGER + TRAVEL + FINAL_HOLD;

        let raf = 0;
        let startTime = 0;
        let running = false;

        const draw = (now: number) => {
            if (!startTime) startTime = now;
            const elapsed = (now - startTime) % cycle;

            let arrived = 0;
            SOURCES.forEach((_, i) => {
                const sendAt = LEAD + i * STAGGER;
                const local = elapsed - sendAt;
                const g = sourceRefs.current[i];
                const path = pathRefs.current[i];
                const dot = dotRefs.current[i];

                if (local < 0) {
                    g?.classList.remove('is-lit');
                    path?.classList.remove('is-active');
                    if (dot) dot.style.opacity = '0';
                    return;
                }

                g?.classList.add('is-lit');
                path?.classList.add('is-active');

                const p = clamp(local / TRAVEL, 0, 1);
                if (p >= 1) {
                    arrived += 1;
                    if (dot) dot.style.opacity = '0';
                } else if (dot && path && lengths[i]) {
                    try {
                        const pt = path.getPointAtLength(easeInOut(p) * lengths[i]);
                        dot.setAttribute('cx', String(pt.x));
                        dot.setAttribute('cy', String(pt.y));
                        // fade in on launch, fade out as it lands
                        dot.style.opacity = String(clamp(Math.min(p * 6, (1 - p) * 6), 0, 1));
                    } catch {
                        /* getPointAtLength before layout — ignore this frame */
                    }
                }
            });

            // Node charge tracks how many signals have landed; gentle breathing
            // pulse once every source is in.
            const allIn = arrived >= n;
            const base = arrived / n;
            const breathe = allIn ? 0.92 + 0.08 * Math.sin(now / 260) : base;
            if (haloRef.current) haloRef.current.style.opacity = String(0.12 + 0.88 * breathe);
            nodeRef.current?.classList.toggle('is-full', allIn);

            if (running) raf = requestAnimationFrame(draw);
        };

        const start = () => {
            if (running) return;
            running = true;
            startTime = 0;
            raf = requestAnimationFrame(draw);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };

        // Only animate while the figure is on screen.
        const io = new IntersectionObserver(
            (entries) => (entries[0].isIntersecting ? start() : stop()),
            { threshold: 0 }
        );
        io.observe(root);

        return () => {
            stop();
            io.disconnect();
        };
    }, []);

    return (
        <div className="sig" ref={rootRef}>
            <div className="sig-stage">
                <svg className="sig-svg" viewBox="0 0 1000 480" role="img" aria-label="Diagram: external and internal signals converging into a cohesive 2-year B2B roadmap">
                    <defs>
                        <filter id="sigGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="14" />
                        </filter>
                        <linearGradient id="sigNodeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#23232c" />
                            <stop offset="1" stopColor="#0a0a0c" />
                        </linearGradient>
                    </defs>

                    {/* Column labels */}
                    <text className="sig-grouplabel" x="70" y="50">EXTERNAL — THE PEOPLE WHO PARK</text>
                    <text className="sig-grouplabel" x="610" y="50">INTERNAL — THE PEOPLE WHO SELL IT</text>

                    {/* Connectors */}
                    <g className="sig-paths">
                        {SOURCES.map((s, i) => (
                            <path
                                key={s.id}
                                ref={(el) => { pathRefs.current[i] = el; }}
                                className={`sig-path sig-path--${s.group}`}
                                d={pathOf(s)}
                            />
                        ))}
                    </g>

                    {/* Node halo (charges up as signals arrive) */}
                    <rect
                        ref={haloRef}
                        className="sig-node-halo"
                        x="346"
                        y="328"
                        width="308"
                        height="136"
                        rx="24"
                        filter="url(#sigGlow)"
                        style={{ opacity: 0.12 }}
                    />

                    {/* The converged-roadmap node */}
                    <g className="sig-node" ref={nodeRef}>
                        <rect className="sig-node-box" x="350" y="330" width="300" height="132" rx="22" />
                        {/* thin top highlight for depth */}
                        <line className="sig-node-sheen" x1="372" y1="331.5" x2="628" y2="331.5" />
                        <text className="sig-node-eyebrow" x="500" y="372">THE OUTCOME</text>
                        <text className="sig-node-title" x="500" y="407">A cohesive 2-year</text>
                        <text className="sig-node-title" x="500" y="432">B2B roadmap</text>
                    </g>

                    {/* Source chips */}
                    {SOURCES.map((s, i) => (
                        <g
                            key={s.id}
                            ref={(el) => { sourceRefs.current[i] = el; }}
                            className={`sig-source sig-source--${s.group}`}
                        >
                            <rect className="sig-chip" x={s.x} y={s.y} width={s.w} height={CHIP_H} rx={CHIP_H / 2} />
                            <text className="sig-chip-label" x={s.x + s.w / 2} y={s.y + CHIP_H / 2 + 5}>
                                {s.label}
                            </text>
                        </g>
                    ))}

                    {/* Travelling pulses (rendered last so they sit on top) */}
                    {SOURCES.map((s, i) => (
                        <circle
                            key={s.id}
                            ref={(el) => { dotRefs.current[i] = el; }}
                            className={`sig-dot sig-dot--${s.group}`}
                            r="5.5"
                            cx={anchorOf(s).x}
                            cy={anchorOf(s).y}
                            style={{ opacity: 0 }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}
