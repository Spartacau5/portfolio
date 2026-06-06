'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import { WhatArriveDoes } from './WhatArriveDoes';
import { ArriveHero } from './ArriveHero';
import { MvpShowcase } from './MvpShowcase';
import { VisionWalkthrough } from './VisionWalkthrough';
import { PreviewModal, type PreviewContent } from './PreviewModal';

// Source line. Renders identically whether or not it's clickable; when given an
// onClick it's a button (resets its own chrome in CSS) that opens the preview.
function BlockSource({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    if (!onClick) {
        return <span className="arrive-cs-block-source">{children}</span>;
    }
    return (
        <button type="button" className="arrive-cs-block-source" onClick={onClick}>
            {children}
        </button>
    );
}

export default function ArrivePage() {
    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    // Preview modal state — null when closed.
    const [preview, setPreview] = useState<PreviewContent | null>(null);

    return (
        <>
        <div className="case-study-page arrive-cs">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero — fills the screen on load, shrinks into place on scroll */}
            <ArriveHero />

            {/* Intro */}
            <section className="arrive-cs-intro">
                <p className="arrive-cs-lead">
                    As external consultants, my team and I utilized strategic research to transform
                    fragmented divisional goals into a cohesive 2-year enterprise roadmap for a $1B+
                    mobility platform.
                </p>

                <div className="arrive-cs-meta">
                    <span className="arrive-cs-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 8.5V6.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4.5" />
                            <path d="M3 9.5h18M8 3v3M16 3v3" />
                            <circle cx="17" cy="16.5" r="4.5" />
                            <path d="M17 14.8v1.7l1.3.9" />
                        </svg>
                        July – Dec 2025
                    </span>
                    <span className="arrive-cs-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
                            <circle cx="10" cy="8" r="3.2" />
                            <path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 5a3.2 3.2 0 0 1 0 6.2" />
                        </svg>
                        Emily S, Kieran E, Bri W
                    </span>
                </div>
            </section>

            {/* What Arrive does / What you see — animated capability card */}
            <section className="arrive-cs-section arrive-cs-section--card">
                <WhatArriveDoes />
            </section>

            {/* Biz Context */}
            <section className="arrive-cs-block arrive-cs-block--no-divider">
                <h2 className="arrive-cs-block-label">Context</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Arrive has shown rapid growth acquiring 6 major mobility companies in a short
                        span of 4 years.
                    </p>
                    <BlockSource
                        onClick={() =>
                            setPreview({
                                type: 'browser',
                                url: 'https://arrive.com/en/about/about-us#brands',
                            })
                        }
                    >
                        Company acquisition timeline, 2021–2024
                    </BlockSource>
                </div>
            </section>

            {/* The Problem */}
            <section className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Problem</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        With this growth came confusion, lack of clarity and disalignment between
                        different companies, sectors, and markets.
                    </p>
                    <div className="arrive-cs-block-figure">
                        <Image
                            src="/images/grade-platform-before.png"
                            alt="Senior product leadership grading the platform"
                            width={2112}
                            height={895}
                            className="arrive-cs-block-figure-img"
                        />
                    </div>
                </div>
            </section>

            {/* Strategy */}
            <section className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Strategy</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Collect feedback externally and internally to create alignment between what
                        leadership thinks, what sales+product hear every day and what customers
                        actually want.
                    </p>
                    <p className="arrive-cs-block-text">
                        The goal was to craft an end-to-end future state experience which prioritizes
                        what matters most to deliver customer and business value.
                    </p>
                </div>
            </section>

            {/* Process */}
            <section className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Process</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        <strong>Phase 1:</strong> Conducted 30+ interviews with prospective and existing
                        customers across different user segments to understand customer wants and needs.
                    </p>
                    <p className="arrive-cs-block-text">
                        <strong>Phase 2:</strong> Synthesized insights and developed a 2-year vision for
                        internal reaction.
                    </p>
                    <p className="arrive-cs-block-text">
                        <strong>Phase 3:</strong> Facilitated 3 workshops with product managers, sales
                        executives and sales leaders across the US and EU to evaluate and refine the
                        vision.
                    </p>
                </div>
            </section>
        </div>

        {/* MVP testing showcase — full-bleed; lives outside the case-study
            column so its max-width / overflow clipping don't apply */}
        <MvpShowcase />

        <div className="case-study-page arrive-cs">
            {/* Solution */}
            <section className="arrive-cs-block arrive-cs-outcomes">
                <h2 className="arrive-cs-block-label">Solution</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        A strong B2B vision for where Arrive goes in the next 2 years, which created
                        shared excitement and alignment — to share with new business, and to retain
                        old business and reduce churn.
                    </p>
                </div>
            </section>

            {/* Vision walkthrough — numbered steps with animated timelines */}
            <VisionWalkthrough />

            {/* Impact */}
            <section className="arrive-cs-block arrive-cs-impact">
                <h2 className="arrive-cs-block-label">Impact</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Our 6-month collaboration not only earned trust and long-term business for
                        Craft, but also transformed a tech-led company into a product-led one — driven
                        by research, feedback loops, and iterative sprints. We taught their PMs and
                        sales teams how to build feedback loops with their customers and get better at
                        their jobs.
                    </p>
                    <div className="arrive-cs-block-figure">
                        <Image
                            src="/images/grade-platform-after.png"
                            alt="Senior product leadership grading the vision"
                            width={2112}
                            height={895}
                            className="arrive-cs-block-figure-img"
                        />
                    </div>
                </div>
            </section>


            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/" className="back-link">
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="back-arrow" />
                    Back to Home
                </Link>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="back-link"
                >
                    Go to top
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="top-arrow" />
                </button>
            </div>

        </div>

        {/* Media preview modal (browser / image / video) */}
        <PreviewModal content={preview} onClose={() => setPreview(null)} />
        </>
    );
}
