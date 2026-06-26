'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * "Mapping out user flow" — the end-to-end AI search journey, drawn as a flow
 * diagram. Three node types mirror the reference:
 *   - terminal (amber) → Start / End / toggle off
 *   - step (lavender)  → system/user steps
 *   - input (blue parallelogram) → user/AI inputs
 * Dashed connectors are loop-backs (revise prompt, toggle off → restart).
 *
 * The diagram is authored at a fixed viewBox and scrolls horizontally on
 * narrow viewports so the labels stay legible.
 */

const H = 46; // node height
const SK = 16; // parallelogram skew

type NodeType = 'terminal' | 'step' | 'input';

interface FlowNode {
    x: number;
    y: number;
    w: number;
    label: string;
    sub: string;
    type: NodeType;
}

const NODES: FlowNode[] = [
    { x: 40, y: 197, w: 116, label: 'Try AI CTA', sub: 'Start', type: 'terminal' },
    { x: 250, y: 110, w: 210, label: 'User types (Text Field)', sub: 'Input', type: 'input' },
    { x: 250, y: 197, w: 210, label: 'Suggestions (AI)', sub: 'Input', type: 'input' },
    { x: 250, y: 284, w: 210, label: 'Dismiss/Toggle', sub: 'Input', type: 'terminal' },
    { x: 480, y: 30, w: 220, label: 'Revises Prompt/Edit', sub: 'Input', type: 'input' },
    { x: 640, y: 197, w: 150, label: 'Search loads', sub: 'Step', type: 'step' },
    { x: 870, y: 197, w: 160, label: 'Reviews Results', sub: 'Step', type: 'step' },
    { x: 1130, y: 30, w: 250, label: 'Use suggested actions (AI)', sub: 'Future/Optional', type: 'step' },
    { x: 1130, y: 110, w: 245, label: 'Acts on Results (Manually)', sub: 'Step', type: 'step' },
    { x: 1470, y: 150, w: 250, label: 'Custom Follow-up (Text Field)', sub: 'Input', type: 'input' },
    { x: 1470, y: 240, w: 245, label: 'Suggested Follow-up (AI)', sub: 'Input', type: 'input' },
    { x: 1800, y: 197, w: 150, label: 'Search is refined', sub: 'Step', type: 'step' },
    { x: 2000, y: 197, w: 170, label: 'Turn off AI Search', sub: 'End', type: 'terminal' },
];

interface Edge {
    d: string;
    dashed?: boolean;
    arrow?: boolean;
}

const EDGES: Edge[] = [
    // Try AI CTA → three inputs
    { d: 'M156 220 H203 V133 H250', arrow: true },
    { d: 'M156 220 H250', arrow: true },
    { d: 'M156 220 H203 V307 H250', arrow: true },
    // inputs → Search loads
    { d: 'M460 133 H550 V220 H640', arrow: true },
    { d: 'M460 220 H640', arrow: true },
    // revise loop (dashed)
    { d: 'M355 110 V53 H480', dashed: true, arrow: true },
    { d: 'M700 53 H715 V197', dashed: true, arrow: true },
    // Search loads → Reviews Results
    { d: 'M790 220 H870', arrow: true },
    // Reviews → branch (use suggested is optional/dashed) + Acts
    { d: 'M1030 220 H1080 V53 H1130', dashed: true, arrow: true },
    { d: 'M1030 220 H1080 V133 H1130', arrow: true },
    // spine straight to the follow-up bus
    { d: 'M1030 220 H1420' },
    // branch nodes → bus
    { d: 'M1380 53 H1420' },
    { d: 'M1375 133 H1420' },
    // vertical bus
    { d: 'M1420 53 V263' },
    // bus → follow-ups
    { d: 'M1420 173 H1470', arrow: true },
    { d: 'M1420 263 H1470', arrow: true },
    // follow-ups → Search is refined
    { d: 'M1720 173 H1760 V220 H1800', arrow: true },
    { d: 'M1715 263 H1760 V220 H1800', arrow: true },
    // Search is refined → Turn off
    { d: 'M1950 220 H2000', arrow: true },
    // toggle off → restart (dashed loop)
    { d: 'M355 330 V395 H98 V243', dashed: true, arrow: true },
];

const FILL: Record<NodeType, string> = {
    terminal: '#FEF1C9',
    step: '#ECECFD',
    input: '#DEEAFB',
};
const STROKE: Record<NodeType, string> = {
    terminal: '#F2D58A',
    step: '#C3C2F5',
    input: '#B4CBEF',
};

function NodeShape({ node }: { node: FlowNode }) {
    const { x, y, w, type } = node;
    const cx = x + w / 2;
    const cy = y + H / 2;
    const common = { fill: FILL[type], stroke: STROKE[type], strokeWidth: 1.5 };

    return (
        <g>
            {type === 'input' ? (
                <polygon
                    points={`${x + SK},${y} ${x + w},${y} ${x + w - SK},${y + H} ${x},${y + H}`}
                    {...common}
                />
            ) : (
                <rect x={x} y={y} width={w} height={H} rx={9} {...common} />
            )}
            <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={16}
                fill="#2b2f38"
            >
                {node.label}
            </text>
            <text x={x + 2} y={y + H + 18} fontSize={13} fill="#9aa3af">
                {node.sub}
            </text>
        </g>
    );
}

export function ZiUserFlow() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const drag = useRef({ active: false, startX: 0, startLeft: 0 });
    // Custom scrollbar geometry — a real DOM bar (not the native scrollbar), so
    // it respects `cursor: none` and the site's custom cursor shows over it.
    const [bar, setBar] = useState({ width: 0, left: 0, visible: false });

    const syncBar = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const { clientWidth, scrollWidth, scrollLeft } = el;
        if (scrollWidth <= clientWidth + 1) {
            setBar((b) => (b.visible ? { ...b, visible: false } : b));
            return;
        }
        const width = Math.max((clientWidth / scrollWidth) * clientWidth, 48);
        const maxThumb = clientWidth - width;
        const left = maxThumb * (scrollLeft / (scrollWidth - clientWidth));
        setBar({ width, left, visible: true });
    }, []);

    useEffect(() => {
        syncBar();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', syncBar, { passive: true });
        window.addEventListener('resize', syncBar);
        return () => {
            el.removeEventListener('scroll', syncBar);
            window.removeEventListener('resize', syncBar);
        };
    }, [syncBar]);

    // Drag-to-scroll on the diagram body (mouse only).
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse') return; // let touch use native panning
        const el = scrollRef.current;
        if (!el || el.scrollWidth <= el.clientWidth) return;
        drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
        el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!drag.current.active || !scrollRef.current) return;
        scrollRef.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
    };
    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!drag.current.active) return;
        drag.current.active = false;
        scrollRef.current?.releasePointerCapture?.(e.pointerId);
    };

    // Dragging the custom thumb maps 1:1 to scrollLeft.
    const onThumbDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const el = scrollRef.current;
        if (!el) return;
        const startX = e.clientX;
        const startScroll = el.scrollLeft;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const maxThumb = el.clientWidth - bar.width;
        const move = (ev: PointerEvent) => {
            if (maxThumb <= 0) return;
            el.scrollLeft = startScroll + ((ev.clientX - startX) / maxThumb) * maxScroll;
        };
        const up = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    };

    return (
        <div className="zi-flow">
        <div
            className="zi-flow-scroll"
            ref={scrollRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
        >
            <svg
                className="zi-flow-svg"
                viewBox="0 0 2210 420"
                role="img"
                aria-label="AI search user flow, from the Try AI CTA through search, results, follow-ups and the option to turn AI search off"
            >
                <defs>
                    <marker
                        id="ziFlowArrow"
                        viewBox="0 0 10 10"
                        markerWidth="7"
                        markerHeight="7"
                        refX="8"
                        refY="5"
                        orient="auto-start-reverse"
                    >
                        <path d="M0,0 L10,5 L0,10 z" fill="#A9B7CE" />
                    </marker>
                </defs>

                {EDGES.map((e, i) => (
                    <path
                        key={i}
                        d={e.d}
                        fill="none"
                        stroke="#C3CEDF"
                        strokeWidth={2}
                        strokeDasharray={e.dashed ? '7 6' : undefined}
                        markerEnd={e.arrow ? 'url(#ziFlowArrow)' : undefined}
                    />
                ))}

                {NODES.map((n) => (
                    <NodeShape key={n.label} node={n} />
                ))}
            </svg>
        </div>
        {bar.visible && (
            <div className="zi-flow-bar" aria-hidden="true">
                <div
                    className="zi-flow-bar-thumb"
                    style={{ width: bar.width, transform: `translateX(${bar.left}px)` }}
                    onPointerDown={onThumbDown}
                />
            </div>
        )}
        </div>
    );
}
