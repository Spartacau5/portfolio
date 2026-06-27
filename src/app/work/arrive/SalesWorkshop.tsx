'use client';

import { useEffect, useRef, useState } from 'react';

// What we did in the Sales Workshop, told as three activities. The visuals are
// hand-built so the page reads like a designed artifact rather than a FigJam
// screenshot dump: a convergence of success-criteria stickies into the top 3,
// a prioritization pyramid, and the three feedback lenses we captured against
// the live prototype.

const SUCCESS_TOP3 = [
    {
        n: '01',
        title: 'Flexible onboarding that matches mental models',
        body: 'Enterprise-wide setup, with opt-in sign-up for individual employees.',
    },
    {
        n: '02',
        title: 'Meet customers where they are',
        body: 'Fit the systems, tools, and workflows teams already live in.',
    },
    {
        n: '03',
        title: 'Expand the offering beyond parking',
        body: 'Integrations across their wider mobility & operations ecosystem.',
    },
];

// Candidate features the two groups sorted into the pyramid. Each card has a
// "bunched" start (a loose pile, top-left) and a "sorted" home in its tier —
// the animation interpolates between the two. Coordinates are % of the stage.
type Tier = 'must' | 'should' | 'nice';
interface Feature {
    title: string;
    tier: Tier;
    sx: number; // sorted x %
    sy: number; // sorted y %
}

const TIER_ACCENT: Record<Tier, string> = {
    must: '#6d2496',
    should: '#9c63b8',
    nice: '#cba6e0',
};

const FEATURES: Feature[] = [
    { title: 'Fleet software integration', tier: 'must', sx: 50, sy: 16 },
    { title: 'Mobility cards', tier: 'must', sx: 34, sy: 30 },
    { title: 'Expense management', tier: 'must', sx: 66, sy: 30 },
    { title: 'Telematics', tier: 'should', sx: 27, sy: 55 },
    { title: 'Tolling automation', tier: 'should', sx: 50, sy: 55 },
    { title: 'Parking restrictions', tier: 'should', sx: 73, sy: 55 },
    { title: 'Driver activity insights', tier: 'should', sx: 50, sy: 67 },
    { title: 'EV charging', tier: 'nice', sx: 30, sy: 84 },
    { title: 'CSV driver upload', tier: 'nice', sx: 50, sy: 84 },
    { title: 'Parking insights', tier: 'nice', sx: 70, sy: 84 },
];

// Bunched starting positions (% of stage) + a little rotation, so the cards
// read as a loose pile before they sort.
const BUNCHED: [number, number][] = [
    [17, 22], [33, 22], [17, 35], [33, 35], [17, 48],
    [33, 48], [17, 61], [33, 61], [17, 74], [33, 74],
];
const ROT = [-4, 3, -2, 5, -3, 2, -5, 4, -2, 3];

const FEEDBACK = [
    {
        key: 'valuable',
        label: 'Valuable',
        hint: 'What resonated',
        points: [
            'Anomaly & insight detection — “I know customers like this.”',
            'Auto-stop / auto-extend savings on parking fines.',
            'Receipts auto-sent to existing expense software.',
        ],
    },
    {
        key: 'concerning',
        label: 'Concerning',
        hint: 'What might not land',
        points: [
            'Onboarding flow may feel too long for self-serve drivers.',
            'Spend limits felt low-priority for the effort to build.',
            'When should drivers self-serve vs. talk to sales?',
        ],
    },
    {
        key: 'missing',
        label: 'Missing',
        hint: 'Where opportunity sits',
        points: [
            'A real way to limit or flag private parking usage.',
            'Emissions & sustainability metrics for fleets.',
            'Spend visibility per license plate / vehicle.',
        ],
    },
];

// Pyramid outline in a 1000×620 viewBox, drawn over the dark stage. The two
// divider lines sit at the must/should and should/nice boundaries.
const PY = { apex: [500, 48], left: [150, 572], right: [850, 572] };
const edgeX = (y: number, toX: number) =>
    PY.apex[0] + (toX - PY.apex[0]) * ((y - PY.apex[1]) / (PY.left[1] - PY.apex[1]));
const DIV1 = 322; // must / should
const DIV2 = 462; // should / nice

// Activity 2 — the backlog "flies" from a loose pile into its sorted tiers when
// the stage scrolls into view. A replay control re-runs the sort.
function FeaturePrioritization() {
    const stageRef = useRef<HTMLDivElement>(null);
    const [sorted, setSorted] = useState(false);

    useEffect(() => {
        const el = stageRef.current;
        if (!el) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setSorted(true);
            return;
        }

        let timer: number;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    timer = window.setTimeout(() => setSorted(true), 500);
                    io.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => {
            io.disconnect();
            window.clearTimeout(timer);
        };
    }, []);

    const replay = () => {
        setSorted(false);
        window.setTimeout(() => setSorted(true), 650);
    };

    return (
        <div className="fp">
            <div ref={stageRef} className={`fp-stage${sorted ? ' is-sorted' : ''}`}>
                <svg className="fp-pyramid" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
                    <polygon
                        className="fp-pyramid-outline"
                        points={`${PY.apex[0]},${PY.apex[1]} ${PY.right[0]},${PY.right[1]} ${PY.left[0]},${PY.left[1]}`}
                    />
                    <line className="fp-pyramid-div" x1={edgeX(DIV1, PY.left[0])} y1={DIV1} x2={edgeX(DIV1, PY.right[0])} y2={DIV1} />
                    <line className="fp-pyramid-div" x1={edgeX(DIV2, PY.left[0])} y1={DIV2} x2={edgeX(DIV2, PY.right[0])} y2={DIV2} />
                </svg>

                {/* Tier labels — bottom-aligned to sit just above each divider
                    line (DIV1 ≈ 51.9%, DIV2 ≈ 74.5%, base ≈ 92.3%) */}
                <span className="fp-tier-label" style={{ top: '51.9%' }}>Must be included</span>
                <span className="fp-tier-label" style={{ top: '74.5%' }}>Should be included</span>
                <span className="fp-tier-label" style={{ top: '92.3%' }}>Nice to include</span>

                {FEATURES.map((f, i) => (
                    <div
                        key={f.title}
                        className="fp-card"
                        style={
                            {
                                '--bx': `${BUNCHED[i][0]}%`,
                                '--by': `${BUNCHED[i][1]}%`,
                                '--sx': `${f.sx}%`,
                                '--sy': `${f.sy}%`,
                                '--r': `${ROT[i]}deg`,
                                '--d': `${i * 0.05}s`,
                                '--accent': TIER_ACCENT[f.tier],
                            } as React.CSSProperties
                        }
                    >
                        <span className="fp-card-title">{f.title}</span>
                    </div>
                ))}
            </div>

            <button type="button" className="fp-replay" onClick={replay}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2v3h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Replay the sort
            </button>
        </div>
    );
}

export function SalesWorkshop() {
    return (
        <div className="sw">
            <p className="sw-lead">
                I then moved onto getting the Sales team&apos;s reactions to the vision walkthrough —
                the people closest to the customer every day. The goal wasn&apos;t to present; it was
                to pressure-test. I asked them to react through three lenses across three structured
                activities.
            </p>

            {/* Framing question */}
            <figure className="sw-hmw">
                <span className="sw-hmw-eyebrow">The question that framed the day</span>
                <p className="sw-hmw-q">
                    How might the Arrive for Business product experience evolve to meet new market
                    needs and exceed expectations over the next two years?
                </p>
            </figure>

            {/* Activity 1 — Success criteria converging to the top 3 */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">Activity 1</span>
                    <h4 className="sw-act-title">Define what “great” looks like</h4>
                </header>
                <p className="sw-act-desc">
                    I opened with a prompt — <em>“Two years from now, if we delivered the best possible
                    version of our vision, what would be true?”</em> The room filled with success
                    criteria, which we clustered and voted down to a top three. I wanted to learn from
                    their raw and unfiltered ideas/insights first before shifting the conversation to
                    the guided vision.
                </p>

                <div className="sw-converge">
                    <div className="sw-stickies" aria-hidden="true">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <span key={i} className="sw-sticky" />
                        ))}
                    </div>
                    <div className="sw-converge-arrow" aria-hidden="true">
                        <span>distilled to</span>
                    </div>
                    <ol className="sw-top3">
                        {SUCCESS_TOP3.map((c) => (
                            <li key={c.n} className="sw-top3-card">
                                <div>
                                    <p className="sw-top3-title">{c.title}</p>
                                    <p className="sw-top3-body">{c.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Activity 2 — Prioritization pyramid */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">Activity 2</span>
                    <h4 className="sw-act-title">Prioritize the feature set</h4>
                </header>
                <p className="sw-act-desc">
                    Split into two groups, the team sorted a backlog of candidate features into a
                    priority pyramid — forcing trade-offs between what the two-year vision must have and
                    what could wait. Watch where each feature landed.
                </p>

                <FeaturePrioritization />
            </section>

            {/* Activity 3 — Walk the prototype, capture feedback */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">Activity 3</span>
                    <h4 className="sw-act-title">Walk the vision & gather feedback</h4>
                </header>
                <p className="sw-act-desc">
                    I walked the group through the full prototype end to end, then gave them time to
                    react individually before a group discussion — capturing every signal in three
                    buckets.
                </p>

                <div className="sw-feedback">
                    {FEEDBACK.map((col) => (
                        <div key={col.key} className={`sw-fb sw-fb--${col.key}`}>
                            <div className="sw-fb-head">
                                <p className="sw-fb-label">{col.label}</p>
                            </div>
                            <p className="sw-fb-hint">{col.hint}</p>
                            <ul className="sw-fb-list">
                                {col.points.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

/* ============================================================================
   #5 — Workshop with Sales Leadership (NA + EU)

   Same three activities as the Sales workshop, but leadership reacted to what
   Sales had already produced rather than starting blank. The visuals are built
   to make that overlap legible: inherited criteria + the two leadership added,
   and a prioritization board that toggles between "Sales' board" and
   "Leadership's revisions".
============================================================================ */

// Activity 1 — the three criteria carried over from Sales, plus the two
// leadership added on top.
const LEAD_INHERITED = [
    'Flexible onboarding that matches enterprise mental models',
    'Meet customers inside the tools & ecosystems they already use',
    'Expand beyond parking into a true mobility solution',
];
const LEAD_ADDED = [
    {
        title: 'Self-serve beyond onboarding',
        body: 'Let customers complete every task themselves — without leaning on sales or support.',
    },
    {
        title: 'Designed for the full lifecycle',
        body: 'From micro to enterprise: get smarter about retention, churn, and when to re-approach.',
    },
];

// Activity 2 — the same backlog from the Sales board, with each card's "sales"
// home and its "lead" home after leadership reacted. Coordinates are % of the
// (square) stage. `move` flags the cards leadership relocated.
interface LeadFeature {
    title: string;
    sx: number;
    sy: number;
    lx: number;
    ly: number;
    move?: 'up' | 'down' | 'tray';
    tag?: string;
}
const LEAD_FEATURES: LeadFeature[] = [
    { title: 'Fleet software integration', sx: 50, sy: 13, lx: 50, ly: 13 },
    { title: 'Mobility cards', sx: 34, sy: 23, lx: 34, ly: 23 },
    { title: 'Expense management', sx: 66, sy: 23, lx: 66, ly: 23 },
    { title: 'Telematics', sx: 27, sy: 44, lx: 27, ly: 44 },
    { title: 'Tolling automation', sx: 50, sy: 44, lx: 50, ly: 44 },
    { title: 'Parking restrictions', sx: 73, sy: 44, lx: 62, ly: 84, move: 'down', tag: 'De-prioritized' },
    { title: 'Driver activity insights', sx: 50, sy: 53, lx: 50, ly: 53 },
    { title: 'EV charging', sx: 32, sy: 63, lx: 50, ly: 32, move: 'up', tag: 'EU must-have' },
    { title: 'CSV driver upload', sx: 50, sy: 63, lx: 38, ly: 84, move: 'tray' },
    { title: 'Parking insights', sx: 68, sy: 63, lx: 68, ly: 63 },
];

// Square stage pyramid (1000×1000 viewBox, stretched to fill).
const LPY = { apex: [500, 70], left: [150, 650], right: [850, 650] };
const lEdgeX = (y: number, toX: number) =>
    LPY.apex[0] + (toX - LPY.apex[0]) * ((y - LPY.apex[1]) / (LPY.left[1] - LPY.apex[1]));
const LDIV1 = 360; // must / should
const LDIV2 = 560; // should / nice

function LeadershipPrioritization() {
    const stageRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<'sales' | 'lead'>('sales');

    useEffect(() => {
        const el = stageRef.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setView('lead');
            return;
        }
        let timer: number;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    timer = window.setTimeout(() => setView('lead'), 800);
                    io.disconnect();
                }
            },
            { threshold: 0.35 }
        );
        io.observe(el);
        return () => {
            io.disconnect();
            window.clearTimeout(timer);
        };
    }, []);

    const sales = view === 'sales';

    return (
        <div className="fp lp">
            <div className="fp-toggle" role="tablist" aria-label="Whose board to show">
                <button type="button" role="tab" aria-selected={sales} className={sales ? 'is-on' : ''} onClick={() => setView('sales')}>
                    Sales&rsquo; board
                </button>
                <button type="button" role="tab" aria-selected={!sales} className={!sales ? 'is-on' : ''} onClick={() => setView('lead')}>
                    Leadership&rsquo;s revisions
                </button>
            </div>

            <div ref={stageRef} className="fp-stage fp-stage--tall">
                <svg className="fp-pyramid" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
                    <polygon
                        className="fp-pyramid-outline"
                        points={`${LPY.apex[0]},${LPY.apex[1]} ${LPY.right[0]},${LPY.right[1]} ${LPY.left[0]},${LPY.left[1]}`}
                    />
                    <line className="fp-pyramid-div" x1={lEdgeX(LDIV1, LPY.left[0])} y1={LDIV1} x2={lEdgeX(LDIV1, LPY.right[0])} y2={LDIV1} />
                    <line className="fp-pyramid-div" x1={lEdgeX(LDIV2, LPY.left[0])} y1={LDIV2} x2={lEdgeX(LDIV2, LPY.right[0])} y2={LDIV2} />
                </svg>

                <span className="lp-tier-label" style={{ top: '23%' }}>Must</span>
                <span className="lp-tier-label" style={{ top: '49%' }}>Should</span>
                <span className="lp-tier-label" style={{ top: '61%' }}>Nice</span>

                {/* Leadership's new bucket */}
                <span className="lp-tray-label">If the vision is achieved — not needed</span>
                <div className={`lp-tray${sales ? '' : ' is-active'}`} aria-hidden="true" />

                {LEAD_FEATURES.map((f, i) => {
                    const x = sales ? f.sx : f.lx;
                    const y = sales ? f.sy : f.ly;
                    const hot = !sales && f.move ? ` is-${f.move}` : '';
                    return (
                        <div
                            key={f.title}
                            className={`fp-card lp-card${hot}`}
                            style={
                                {
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transitionDelay: `${i * 0.04}s`,
                                    '--r': '0deg',
                                    '--accent': '#cba6e0',
                                } as React.CSSProperties
                            }
                        >
                            <span className="fp-card-title">{f.title}</span>
                            {hot && f.tag && <span className="fp-card-tag">{f.tag}</span>}
                        </div>
                    );
                })}
            </div>

            <p className="fp-caption">
                Toggle between the two boards to see what leadership kept, moved, and set aside.
            </p>
        </div>
    );
}

const LEAD_FEEDBACK = [
    {
        key: 'valuable',
        label: 'Valuable',
        hint: 'What resonated',
        points: [
            '“Customers love this view!” — driver activity & unusual-parking insights.',
            'Auto-stop savings landed as a clear, sellable upsell.',
            'Domain search & self-serve onboarding — “Love it!”',
        ],
    },
    {
        key: 'concerning',
        label: 'Concerning',
        hint: 'What might not land',
        points: [
            'Duplicate-account handling during onboarding.',
            'Billing & permissions for large orgs — departments, cost-centres, multiple BAs.',
            'Spend/time limits per category to honor car policies (no weekend tolling/fuel).',
        ],
    },
    {
        key: 'missing',
        label: 'Missing',
        hint: 'Where opportunity sits',
        points: [
            'EV charging absent from the core structure (EU).',
            'SSO capability for enterprise sign-in.',
            'An official yearly report — carbon & sustainability goals achieved.',
        ],
    },
];

export function SalesLeadershipWorkshop() {
    const critRef = useRef<HTMLDivElement>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = critRef.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setRevealed(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setRevealed(true);
                    io.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div className="sw">
            <p className="sw-lead">
                Finally, I took the vision to Sales leadership across North America and Europe. Rather
                than start from a blank page, I put what the Sales team had already identified in front
                of them — and asked leadership to react to it, refine it, and resolve the places where
                the two regions saw things differently.
            </p>

            {/* Activity 1 — react to & extend Sales' success criteria */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">Activity 1</span>
                    <h4 className="sw-act-title">Pressure-test the success criteria</h4>
                </header>
                <p className="sw-act-desc">
                    I opened with the same prompt to get them in the headspace — but instead of asking
                    them to write their own, I showed them what Sales had landed on and asked them to
                    add, edit, or refine. Leadership endorsed the existing three and added two of their
                    own.
                </p>

                <div className="lp-criteria" ref={critRef}>
                    <div className="lp-crit-col">
                        <span className="lp-crit-tag">Carried over from Sales</span>
                        <ul className="lp-crit-list">
                            {LEAD_INHERITED.map((c) => (
                                <li key={c} className="lp-crit lp-crit--kept">{c}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="lp-crit-plus" aria-hidden="true">+</div>
                    <div className="lp-crit-col">
                        <span className="lp-crit-tag lp-crit-tag--new">Added by leadership</span>
                        <ul className={`lp-crit-list${revealed ? ' is-revealed' : ''}`}>
                            {LEAD_ADDED.map((c, i) => (
                                <li
                                    key={c.title}
                                    className="lp-crit lp-crit--new"
                                    style={{ transitionDelay: `${i * 0.12}s` }}
                                >
                                    <span className="lp-crit-badge">New</span>
                                    <span className="lp-crit-title">{c.title}</span>
                                    <span className="lp-crit-body">{c.body}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Activity 2 — react to Sales' prioritization */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">Activity 2</span>
                    <h4 className="sw-act-title">React to the prioritization</h4>
                </header>
                <p className="sw-act-desc">
                    Instead of re-running the exercise, I showed leadership the Sales board and asked for
                    their reaction. They largely agreed — then added a new bucket,{' '}
                    <em>“if the vision is achieved, not needed,”</em> and moved a few onboarding
                    utilities into it.
                </p>

                <LeadershipPrioritization />
            </section>

            {/* Activity 3 — walkthrough feedback */}
            <section className="sw-act">
                <header className="sw-act-head">
                    <span className="sw-act-num">Activity 3</span>
                    <h4 className="sw-act-title">Walk the vision & gather feedback</h4>
                </header>
                <p className="sw-act-desc">
                    As in the earlier workshops, I walked leadership through the full prototype, then
                    captured every reaction against the same three lenses.
                </p>

                <div className="sw-feedback">
                    {LEAD_FEEDBACK.map((col) => (
                        <div key={col.key} className={`sw-fb sw-fb--${col.key}`}>
                            <div className="sw-fb-head">
                                <p className="sw-fb-label">{col.label}</p>
                            </div>
                            <p className="sw-fb-hint">{col.hint}</p>
                            <ul className="sw-fb-list">
                                {col.points.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
