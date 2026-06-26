'use client';

import { useState } from 'react';

/**
 * The end-to-end UX/UI process followed on this project, shown as a compact
 * accordion so it's present without overwhelming. Each phase collapses to a
 * number + name + one-line of deliverables; expanding reveals the detailed
 * steps and the phase's milestone.
 */

type Phase = {
    n: number;
    title: string;
    summary: string;
    milestone?: string;
    details: string[];
};

const PHASES: Phase[] = [
    {
        n: 1,
        title: 'Understand',
        summary: 'Goals, persona, workflow, requirements, assumptions, KPIs, KSFs',
        milestone: 'Present research & validate with senior stakeholders',
        details: [
            'Pre-kickoff: notify UX/UI leads of the upcoming project and check for dependencies across other features and products.',
            'Kickoff: align on scope, expectations, deadlines, resourcing, and committed delivery dates.',
            'Define goals, personas, workflows, high-level requirements, assumptions, KPIs and KSFs (design lead included).',
        ],
    },
    {
        n: 2,
        title: 'Map / References',
        summary: 'New vs. old flows, ZI platform, references, Muze design system',
        milestone: 'Muze / UXUI governance design review',
        details: [
            'Map the current vs. proposed experience and the relevant ZI platform patterns.',
            'Pull external references and inspiration for AI-driven search.',
            'Check Muze (the design system) for existing components before designing new ones.',
        ],
    },
    {
        n: 3,
        title: 'Ideate / Concept',
        summary: 'Sketch, prototype, review, test',
        milestone: 'PM, Dev & UX/UI signoff — CPO review in some cases',
        details: [
            'Run brainstorms/workshops with UX/UI leads, PM/owner, dev lead and stakeholders.',
            'Get concept approval from design lead, product, dev lead and main stakeholders.',
            'Align cross-team in #uxui_show_and_tell and with Muze governance; exec/CPO review for tier 1 & 2.',
        ],
    },
    {
        n: 4,
        title: 'Detailed Design',
        summary: 'UX + UI detailed design, user testing, handoff, review',
        milestone: 'UX & UI signoff, Muze design review',
        details: [
            'Create the UX detailed design; approve with UX lead, PM, UI team and dev in pre-grooming.',
            'Run an accessibility review; flag new global components so dev can scope them for the library.',
            'Create the UI detailed design; share in #designreview_before_dev for Muze/governance alignment.',
            'Hand off: prep the file, share with PM, leads and dev, and attach Figma links to the Jira ticket.',
        ],
    },
    {
        n: 5,
        title: 'QA',
        summary: 'Validate, map issues, re-validate',
        milestone: 'UI signoff before feature/project release',
        details: [
            'QA the built feature against the designs.',
            'Log and triage issues, then re-validate the fixes before release.',
        ],
    },
    {
        n: 6,
        title: 'Analyze',
        summary: 'Define UX/UI success metrics',
        details: [
            'Define and track UX/UI metrics post-launch with the PM and a data analyst.',
        ],
    },
];

function Chevron() {
    return (
        <svg className="zi-proc-chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function ZiDesignProcess() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="zi-proc">
            <div className="zi-proc-head">
                <span className="zi-proc-title">Design Process</span>
                <span className="zi-proc-sub">6 phases</span>
            </div>
            <ul className="zi-proc-list">
                {PHASES.map((p, i) => {
                    const isOpen = open === i;
                    return (
                        <li key={p.n} className={`zi-proc-item${isOpen ? ' is-open' : ''}`}>
                            <button
                                type="button"
                                className="zi-proc-row"
                                aria-expanded={isOpen}
                                onClick={() => setOpen(isOpen ? null : i)}
                            >
                                <span className="zi-proc-num">{p.n}</span>
                                <span className="zi-proc-info">
                                    <span className="zi-proc-name">{p.title}</span>
                                    <span className="zi-proc-summary">{p.summary}</span>
                                </span>
                                <Chevron />
                            </button>
                            <div className="zi-proc-detail-wrap">
                                <div className="zi-proc-detail">
                                    <ul className="zi-proc-steps">
                                        {p.details.map((d, j) => (
                                            <li key={j}>{d}</li>
                                        ))}
                                    </ul>
                                    {p.milestone && (
                                        <p className="zi-proc-milestone">
                                            <span className="zi-proc-milestone-label">Milestone</span>
                                            {p.milestone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
