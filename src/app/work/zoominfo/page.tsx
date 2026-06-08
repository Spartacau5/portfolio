'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import { ZoominfoHero } from './ZoominfoHero';

export default function ZoominfoPage() {
    useScrollDepthTracking();
    useTimeOnPage();

    return (
        <>
        <div className="case-study-page arrive-cs">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero — fills screen on load, shrinks into place on scroll */}
            <ZoominfoHero />

            {/* Intro */}
            <section className="arrive-cs-intro">
                <p className="arrive-cs-lead">
                    As UX/UI Designer II, I designed across 3 products to support go-to-market
                    strategies for over 25,000 companies worldwide — eventually leading design
                    for TalentOS after promotion to Lead Designer.
                </p>

                <div className="arrive-cs-meta">
                    <span className="arrive-cs-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 8.5V6.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4.5" />
                            <path d="M3 9.5h18M8 3v3M16 3v3" />
                            <circle cx="17" cy="16.5" r="4.5" />
                            <path d="M17 14.8v1.7l1.3.9" />
                        </svg>
                        May 2022 – Apr 2024
                    </span>
                    <span className="arrive-cs-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
                            <circle cx="10" cy="8" r="3.2" />
                            <path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 5a3.2 3.2 0 0 1 0 6.2" />
                        </svg>
                        UX/UI Designer II → Lead Designer
                    </span>
                </div>
            </section>

            {/* Context */}
            <section className="arrive-cs-block arrive-cs-block--no-divider">
                <h2 className="arrive-cs-block-label">Context</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        ZoomInfo is a global B2B intelligence platform that helps sales and
                        marketing teams identify, target, and engage with the right prospects.
                        Over 2 years, I embedded across 3 products: TalentOS (recruiting
                        intelligence), SalesOS (the flagship platform), and ReachOut (Chrome
                        extension) — working closely with PMs, engineering, and data teams
                        throughout.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                        <Image src="/images/salesos.avif" alt="SalesOS" width={90} height={28} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                        <Image src="/images/talentos.avif" alt="TalentOS" width={90} height={28} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                        <Image src="/images/reachout.avif" alt="ReachOut" width={90} height={28} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                    </div>
                </div>
            </section>

            {/* Problem */}
            <section className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Problem</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Products were growing fast but unevenly. Recruiter workflows in
                        TalentOS were fragmented, prospecting lacked SMS integration, and
                        SalesOS needed deeper AI capabilities to stay competitive. High user
                        friction was driving low feature adoption across the suite.
                    </p>
                </div>
            </section>

            {/* Strategy */}
            <section className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Strategy</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Anchor every design decision in user research and usage data.
                        Work cross-functionally to reduce friction in core workflows —
                        from search UX to prospecting flows — while maintaining visual
                        and interaction consistency across all three products.
                    </p>
                </div>
            </section>

            {/* Process */}
            <section className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Process</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        <strong>Phase 1:</strong> Improved Search UX for TalentOS — working
                        with integrated products Comparably and ReachOut to streamline how
                        recruiters discover and surface candidates.
                    </p>
                    <p className="arrive-cs-block-text">
                        <strong>Phase 2:</strong> Promoted to Lead Designer. Led the
                        integration of SMS into recruiter prospecting, redesigned the
                        Projects feature to streamline team workflows, and introduced
                        advanced organizational tooling.
                    </p>
                    <p className="arrive-cs-block-text">
                        <strong>Phase 3:</strong> Contributed to high-impact SalesOS
                        initiatives — a major login redesign, AI integrations for ZI
                        Copilot, and new features for Extension and Chorus.
                    </p>
                </div>
            </section>
        </div>

        {/* TalentOS product showcase — full-bleed */}
        <div style={{
            background: '#0d1b2a',
            padding: '4rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
        }}>
            <p style={{
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0,
                fontFamily: 'Graphik, sans-serif',
            }}>
                TalentOS — Recruiter Prospecting
            </p>
            <video
                src="/images/Zoominfotalentos.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{
                    width: '100%',
                    maxWidth: '960px',
                    borderRadius: '16px',
                    display: 'block',
                    boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5)',
                }}
            />
        </div>

        <div className="case-study-page arrive-cs">
            {/* Solution */}
            <section className="arrive-cs-block arrive-cs-block--no-divider arrive-cs-outcomes">
                <h2 className="arrive-cs-block-label">Solution</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        A research-driven, cross-product approach that reduced prospecting
                        friction and improved workflow efficiency by approximately 22%,
                        while building a more consistent design language across the suite.
                    </p>
                    <div className="arrive-cs-block-figure" style={{ marginTop: '0.75rem' }}>
                        <Image
                            src="/images/dashboard.avif"
                            alt="Dashboard for TalentOS — real-time workforce intelligence"
                            width={900}
                            height={560}
                            style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
                        />
                    </div>
                </div>
            </section>

            {/* Impact */}
            <section className="arrive-cs-block arrive-cs-impact">
                <h2 className="arrive-cs-block-label">Impact</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Our design work contributed to ZoomInfo&apos;s strongest revenue period —
                        quarterly revenue exceeded $300M in Q1 2023, reflecting the scale
                        and adoption of the improvements shipped across all three products.
                    </p>
                    <p className="arrive-cs-block-text">
                        Beyond the numbers, the work established a model for cross-product
                        design collaboration at ZoomInfo and set a higher bar for how
                        research informed every product decision made on the team.
                    </p>
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
        </>
    );
}
