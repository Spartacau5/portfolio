'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import { WhatArriveDoes } from './WhatArriveDoes';
import { ArriveHero } from './ArriveHero';
import { VisionWalkthrough } from './VisionWalkthrough';
import { SignalSynthesis } from './SignalSynthesis';
import { VisionReactions } from './VisionReactions';
import { PreviewModal, type PreviewContent } from './PreviewModal';
import { CaseStudyNav, type CaseStudyNavItem } from '@/app/components/CaseStudyNav';

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

const NAV_ITEMS: CaseStudyNavItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'process', label: 'Process' },
    { id: 'solution', label: 'Solution' },
    { id: 'impact', label: 'Impact' },
];

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

            {/* Sticky section nav — reveals once the hero docks (see CSS). */}
            <CaseStudyNav items={NAV_ITEMS} />

            {/* Intro */}
            <section className="arrive-cs-intro">
                {/* Section header — eyebrow tag + title */}
                <header className="arrive-cs-header">
                    <p className="arrive-cs-eyebrow">Craft X Arrive &bull; Contract</p>
                    <h1 className="arrive-cs-heading">The future of mobility solutions</h1>
                </header>

                <p className="arrive-cs-lead">
                    As external consultants, my team and I utilized strategic research to transform
                    fragmented divisional goals into a cohesive 2-year enterprise roadmap for a $1B+
                    mobility platform.
                </p>

                {/* Project meta — Role / Timeline / Team / Skills */}
                <div className="arrive-cs-info">
                    <div className="arrive-cs-info-block">
                        <span className="arrive-cs-info-label">ROLE</span>
                        <p className="arrive-cs-info-value">UX Researcher &amp; Strategist</p>
                    </div>
                    <div className="arrive-cs-info-block">
                        <span className="arrive-cs-info-label">TIMELINE</span>
                        <p className="arrive-cs-info-value">July – Dec 2025</p>
                    </div>
                    <div className="arrive-cs-info-block">
                        <span className="arrive-cs-info-label">TEAM</span>
                        <p className="arrive-cs-info-value">2 Researchers, 2 Designers</p>
                    </div>
                    <div className="arrive-cs-info-block">
                        <span className="arrive-cs-info-label">SKILLS</span>
                        <p className="arrive-cs-info-value">
                            User Research, Strategy, Interviewing, Workshop Facilitation
                        </p>
                    </div>
                </div>
            </section>

            {/* What Arrive does / What you see — animated capability card */}
            <section className="arrive-cs-section arrive-cs-section--card">
                <WhatArriveDoes />
            </section>

            {/* Biz Context */}
            <section id="overview" className="arrive-cs-block arrive-cs-block--no-divider">
                <h2 className="arrive-cs-block-label">Context</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Arrive (formerly EasyPark Group) is a leading global mobility platform —
                        parent of EasyPark, ParkMobile, Flowbird, RingGo, and Parkopedia — across
                        90+ countries and 20,000+ cities. It had shown rapid growth acquiring 6
                        major mobility companies in a short span of 4 years.
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
            <section id="problem" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Problem</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        With this growth came confusion, lack of clarity and disalignment between
                        different companies, sectors, and markets. They didn&apos;t have a clear
                        roadmap of where their B2B business was heading. They had the technology and
                        the market, but what they didn&apos;t have was a product practice: the
                        feedback loops, rapid research, and design-led discovery that turns a hunch
                        into the right bet. So Arrive partnered with{' '}
                        <a
                            href="https://www.madebycraft.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="content-link"
                        >
                            Craft
                            <svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </a>
                        , a strategic digital research &amp; design agency, to pressure-test where
                        its B2B business should go — and that&apos;s where I came in.
                    </p>
                    <p className="arrive-cs-figure-caption">
                        Before we started, I asked Arrive&apos;s product team to grade their existing
                        B2B platform
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
            <section id="strategy" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Strategy</h2>
                <div className="arrive-cs-block-body">
                    {/* Methodology — two kinds of signal converging into one strategy */}
                    <figure className="arrive-cs-method">
                        <h3 className="arrive-cs-method-title">
                            Combine internal insights with external signals into one strategy.
                        </h3>
                        <SignalSynthesis />
                        <figcaption className="arrive-cs-method-note">
                            The vision was only credible because it triangulated two kinds of truth —
                            what customers do, and what the people closest to them know. I gathered
                            both, then distilled them into one picture the whole org could react to.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* Process */}
            <section id="process" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Process</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        I ran 3 structured workshops across the US and EU to develop, evaluate and
                        refine Arrive&apos;s 2-year business product vision — pressure testing an
                        end-to-end future state experience, aligning on success criteria, and
                        prioritizing what matters most to deliver customer and business value.
                    </p>
                    <p className="arrive-cs-block-text">
                        <strong>#1 Product Workshop:</strong> Worked with product managers to stress
                        test the vision against what was technically feasible and where the roadmap
                        was already heading, surfacing the bets worth making first.
                    </p>
                    <p className="arrive-cs-block-text">
                        <strong>#2 Sales Workshop:</strong> Brought in sales executives — closest to
                        the customer every day — to gut check the vision against real objections,
                        deal blockers, and the value props that actually move business.
                    </p>
                    <p className="arrive-cs-block-text">
                        <strong>#3 Sales Leadership Workshop:</strong> Aligned sales leaders on
                        priorities and trade-offs, securing buy-in on the direction and the success
                        criteria the org would be measured against.
                    </p>
                </div>
            </section>

            {/* Solution */}
            <section id="solution" className="arrive-cs-block arrive-cs-outcomes">
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
            <section id="impact" className="arrive-cs-block arrive-cs-impact">
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

                    {/* Internal reactions when the B2B vision was shared */}
                    <VisionReactions />
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
