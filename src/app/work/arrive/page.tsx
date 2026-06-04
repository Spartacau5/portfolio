'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import PasswordProtect from '@/app/components/PasswordProtect';
import { WhatArriveDoes } from './WhatArriveDoes';

export default function ArrivePage() {
    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    return (
        <PasswordProtect password="crafty123" storageKey="arrive-auth">
        <div className="case-study-page arrive-cs">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero — looping video background with the Arrive logo in white */}
            <div className="arrive-cs-hero">
                <video
                    src="/images/arrive-hero.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="arrive-cs-hero-video"
                />
                <Image
                    src="/images/arrive-logo.png"
                    alt="Arrive"
                    width={320}
                    height={80}
                    className="arrive-cs-hero-logo"
                />
            </div>

            {/* Intro */}
            <section className="arrive-cs-intro">
                <h1 className="arrive-cs-title">Making cities more liveable</h1>
                <p className="arrive-cs-lead">
                    Transformed fragmented divisional goals into a cohesive 2-year enterprise roadmap
                    for a $1B+ mobility company. As part of a consultant team of 5 from Craft, I
                    utilized strategic user research to align sales, operations, and product teams on
                    future-state B2B features.
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
            <section className="arrive-cs-section">
                <WhatArriveDoes />
            </section>

            {/* Biz Context */}
            <section className="arrive-cs-section">
                <h2 className="arrive-cs-heading">Biz Context</h2>
                <p className="arrive-cs-text">
                    Arrive has shown rapid growth acquiring major mobility companies in a short span
                </p>
                <div className="arrive-cs-media" />
            </section>

            {/* The Problem */}
            <section className="arrive-cs-section">
                <h2 className="arrive-cs-heading">The Problem</h2>
                <p className="arrive-cs-text">
                    With this growth came confusion, lack of clarity and disalignment between
                    different companies, sectors, and markets
                </p>
                <div className="arrive-cs-stat">
                    <span className="arrive-cs-grade">C+</span>
                    <p className="arrive-cs-stat-label">
                        Avg. Grade Letter assigned to platform by senior product leadership
                    </p>
                </div>
            </section>

            {/* Strategy */}
            <section className="arrive-cs-section">
                <h2 className="arrive-cs-heading">Strategy</h2>
                <p className="arrive-cs-text">
                    Alignment between what customers want, what leadership thinks and what
                    sales/product is hearing every day
                </p>
                <p className="arrive-cs-text">
                    Alignment behind a shared vision which considers all and is made for all.
                </p>
            </section>

            {/* Research */}
            <section className="arrive-cs-section arrive-cs-research">
                {/* Drivers — image left */}
                <div className="arrive-cs-row">
                    <div className="arrive-cs-media" />
                    <div className="arrive-cs-row-text">
                        <p className="arrive-cs-row-title">Heard from Drivers: the ones who park every day</p>
                        <ul className="arrive-cs-list">
                            <li>Managed recruitment, usability testing, compensation for 25+ Drivers interviews recruited via UserTesting and even Craigslist.</li>
                        </ul>
                    </div>
                </div>

                {/* Fleet Managers — image right */}
                <div className="arrive-cs-row reverse">
                    <div className="arrive-cs-row-text">
                        <p className="arrive-cs-row-title">Heard from Fleet Managers: the ones who manage teams and coordinate for their drivers</p>
                        <p className="arrive-cs-row-note">10+ Enterprise Biz Admins</p>
                    </div>
                    <div className="arrive-cs-media" />
                </div>

                {/* Own teams — image left */}
                <div className="arrive-cs-row">
                    <div className="arrive-cs-media" />
                    <div className="arrive-cs-row-text">
                        <p className="arrive-cs-row-title">Heard from our own teams: The ones who think about these problems and how to solve them every day</p>
                        <ul className="arrive-cs-list">
                            <li>Facilitated 3 workshops to synthesize product, sales and sales leadership knowledge</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Outcomes */}
            <section className="arrive-cs-section">
                <h2 className="arrive-cs-heading">Outcomes</h2>
                <p className="arrive-cs-text">
                    A strong B2B vision for where Arrive goes in the next 2 years which created shared
                    excitement and alignment. To share with new biz, and to retain old biz (reduce churn)
                </p>
                <div className="arrive-cs-media arrive-cs-media-tall">
                    <span className="arrive-cs-media-label">B2B Vision Walkthrough</span>
                </div>
            </section>

            {/* 4 Pillars */}
            <section className="arrive-cs-section">
                <h2 className="arrive-cs-heading">4 Pillars</h2>
                <div className="arrive-cs-pillars">
                    {['Browse', 'Onboard', 'Configuration', 'Analyze'].map((pillar) => (
                        <div key={pillar} className="arrive-cs-pillar">
                            <span className="arrive-cs-media-label">{pillar}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Impact */}
            <section className="arrive-cs-section">
                <h2 className="arrive-cs-heading">Impact</h2>
                <p className="arrive-cs-text">
                    Our 6-month collaboration not only earned trust, long term biz for Craft but also
                    transformed a tech-led company into a product-led company driven by research,
                    feedback loops, and iterative sprints. We taught their PMs, Sales how to talk and
                    make feedback loops with their customers and become better at their job
                </p>
                <div className="arrive-cs-stat">
                    <span className="arrive-cs-grade">A</span>
                    <p className="arrive-cs-stat-label">
                        Avg. Grade Letter assigned to vision by senior product leadership
                    </p>
                    <p className="arrive-cs-stat-note">12 Enterprise Pilot Sign-ups for new vision</p>
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
        </PasswordProtect>
    );
}
