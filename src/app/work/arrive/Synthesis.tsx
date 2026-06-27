'use client';

import { useState } from 'react';

// #6 — Synthesis. The capstone: how three workshops collapsed into one set of
// recommendations. The story to tell is the overlap — the same threads surfaced
// across Product, Sales, and Leadership — and that the *vision itself held up*;
// nearly every recommendation was executional, captured per flow as
// "Recommended vision changes" (mostly none) vs. "Keep in mind when executing".

// Where each thread surfaced across the three workshops — the overlap, made literal.
const WORKSHOPS = ['Product', 'Sales', 'Leadership'] as const;
type Mark = boolean;
const OVERLAP: { theme: string; marks: [Mark, Mark, Mark] }[] = [
    { theme: 'Flexible, self-serve onboarding', marks: [true, true, true] },
    { theme: 'Expand beyond parking into mobility', marks: [true, true, true] },
    { theme: 'Meet customers inside their existing tools', marks: [false, true, true] },
    { theme: 'EV charging (with regional nuance)', marks: [false, true, true] },
    { theme: 'Actionable insights over raw metrics', marks: [false, true, true] },
    { theme: 'Hard prioritization trade-offs', marks: [true, true, true] },
];

// The two debates, with how they finally resolved.
const RESOLUTIONS = [
    {
        key: 'ev',
        dir: 'up' as const,
        title: 'EV charging',
        verdict: 'Prioritized — with regional context',
        body: 'EU sales pushed it as a must-have on regulatory pressure and market expectations; the US saw lower urgency as adoption cooled. Rather than average the two out, we prioritized it as an EU differentiator, with customer research planned to scope it regionally.',
    },
    {
        key: 'parking',
        dir: 'down' as const,
        title: 'Setting parking restrictions',
        verdict: 'Deferred — pending customer research',
        body: 'Clear edge cases existed — curbing company-card misuse, or extreme pricing in dense cities like Paris — but day-to-day adoption looked low. Leadership chose not to make it a primary priority yet, folding it into upcoming customer research.',
    },
];

// Per-flow recommendations: vision changes (mostly none) vs. execution notes.
interface ExecGroup {
    head: string;
    points: string[];
}
interface Flow {
    key: string;
    label: string;
    changes: string[];
    execute: ExecGroup[];
}
const FLOWS: Flow[] = [
    {
        key: 'browse',
        label: 'Browse',
        changes: [],
        execute: [
            {
                head: 'Industry & package clarity',
                points: [
                    'Tailor the landing and value prop by industry and fleet size.',
                    'Spell out what each package includes — and who it’s best for.',
                ],
            },
            {
                head: 'Pricing transparency',
                points: [
                    'Make the good / better / best tiers legible at a glance.',
                    'Show physical vs. virtual card costs up front.',
                ],
            },
        ],
    },
    {
        key: 'onboard',
        label: 'Onboard',
        changes: [],
        execute: [
            {
                head: 'User management',
                points: [
                    'Accept more bulk formats (XLSX, HTML); ship a CSV template if AI parsing isn’t ready.',
                    'Add role-based admin setup — billing, permissions, departments & cost-centres.',
                    'Detect and handle dormant domain accounts in Domain Search.',
                ],
            },
            {
                head: 'Expense management (onboarding)',
                points: [
                    'Gate the Expense upsell by plan.',
                    'Support multiple billing accounts.',
                    'Preview the invoice structure during setup.',
                ],
            },
            {
                head: 'Enterprise sign-up clarity',
                points: ['Clarify what each sign-up option means in an enterprise context.'],
            },
        ],
    },
    {
        key: 'configure',
        label: 'Configure',
        changes: [],
        execute: [
            {
                head: 'Mobility cards',
                points: ['Communicate the full value — usable beyond ParkMobile, one consolidated invoice.'],
            },
            {
                head: 'Telematics',
                points: [
                    'Lead with “stress-free parking”; clarify Auto-Start / Auto-Extend.',
                    'Design provider selection for scale — search, pagination, admin control.',
                ],
            },
            {
                head: 'Tolling automation',
                points: [
                    'Unify CSV-upload enhancements across tolling workflows.',
                    'Reduce fragmentation across vehicle & user management.',
                ],
            },
            {
                head: 'Expense management',
                points: [
                    'Clarify who can connect during onboarding.',
                    'Design the connection model for future flexibility.',
                ],
            },
        ],
    },
    {
        key: 'analyze',
        label: 'Analyze',
        changes: [],
        execute: [
            {
                head: 'Dashboard insights',
                points: [
                    'Prioritize actionable insights over raw metrics.',
                    'Be cautious surfacing dormant-user metrics.',
                    'Adapt insight depth to customer size.',
                ],
            },
            {
                head: 'Core insights & reporting',
                points: [
                    'Offer report views by familiarity; add vehicle-level context to spend.',
                    'Flag anomalies to drive faster action.',
                ],
            },
            {
                head: 'Sustainability & long-term reporting',
                points: ['Surface sustainability & EV insights.', 'Enable executive / long-term reporting.'],
            },
            {
                head: 'Email insights',
                points: ['Add opt-in & cadence controls.', 'Trigger on meaningful user actions, not generic updates.'],
            },
        ],
    },
];

function SynthesisBoard() {
    const [active, setActive] = useState(FLOWS[0].key);
    const flow = FLOWS.find((f) => f.key === active) ?? FLOWS[0];

    return (
        <div className="syn-board">
            <div className="fp-toggle syn-toggle" role="tablist" aria-label="Product flow">
                {FLOWS.map((f) => (
                    <button
                        key={f.key}
                        role="tab"
                        type="button"
                        aria-selected={f.key === active}
                        className={f.key === active ? 'is-on' : ''}
                        onClick={() => setActive(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <span className="syn-col-title">Keep in mind when executing</span>
            <div className="syn-exec-grid">
                {flow.execute.map((g) => (
                    <div key={g.head} className="syn-exec-card">
                        <h6 className="syn-exec-head">{g.head}</h6>
                        <ul className="syn-exec-list">
                            {g.points.map((p, i) => (
                                <li key={i}>{p}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Synthesis() {
    return (
        <div className="sw syn">
            <p className="sw-lead">
                With all three workshops behind us, I synthesized everything into a single source of
                truth — one refined vision, one prioritized backlog, and a flow-by-flow set of
                recommendations the design team could build against. What stood out most was the
                overlap: the same threads kept surfacing across Product, Sales, and Leadership.
            </p>

            {/* Overlap matrix — the same threads, across all three rooms */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">The through-line</span>
                    <h4 className="sw-act-title">The same threads surfaced in every room</h4>
                </header>
                <div className="syn-overlap">
                    <div className="syn-ov-row syn-ov-row--head">
                        <span className="syn-ov-theme" />
                        {WORKSHOPS.map((w) => (
                            <span key={w} className="syn-ov-ws">{w}</span>
                        ))}
                    </div>
                    {OVERLAP.map((row) => (
                        <div key={row.theme} className="syn-ov-row">
                            <span className="syn-ov-theme">{row.theme}</span>
                            {row.marks.map((m, i) => (
                                <span key={i} className="syn-ov-cell">
                                    <i className={`syn-ov-dot${m ? ' is-on' : ''}`} aria-hidden="true" />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* How the two debates finally resolved */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">Points of contention</span>
                    <h4 className="sw-act-title">The two calls we made — and why</h4>
                </header>
                <div className="lp-contention">
                    {RESOLUTIONS.map((r) => (
                        <article key={r.key} className={`lp-deb lp-deb--${r.dir}`}>
                            <header className="lp-deb-head">
                                <h5 className="lp-deb-title">{r.title}</h5>
                                <span className="lp-deb-move">
                                    <i className="lp-deb-arrow" aria-hidden="true" />
                                    {r.verdict}
                                </span>
                            </header>
                            <p className="lp-deb-resolution">{r.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* The recommendations board — vision changes vs. execution notes per flow */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">The deliverable</span>
                    <h4 className="sw-act-title">A flow-by-flow board for the design team</h4>
                </header>
                <p className="sw-act-desc">
                    The headline came first: across <strong>Browse, Onboard, Configure, and
                    Analyze</strong>, the vision itself needed almost no changes — so the board focused
                    on what to keep in mind when building it. Every reaction from all three workshops
                    was distilled per flow into clear, executional guidance for the design team.
                </p>
                <SynthesisBoard />
            </section>

            {/* Circulated company-wide */}
            <div className="syn-circulate">
                <span className="syn-circulate-label">Closing the loop</span>
                <p className="syn-circulate-body">
                    I packaged all of it — the synthesized vision, the prioritized backlog, and every
                    workshop board — into one document and circulated it company-wide, with links back
                    to each board. Every team we&apos;d pulled in could see their input reflected, and
                    the progress it had driven.
                </p>
                <a
                    className="syn-circulate-download"
                    href="/Participant-One-Pager.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 2.5v8m0 0L4.75 7.25M8 10.5l3.25-3.25M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download final readout
                </a>
            </div>
        </div>
    );
}
