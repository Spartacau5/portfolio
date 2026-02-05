'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp, AnimatedCounter } from '@/app/hooks/useScrollAnimation';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';

export default function VisionTestingPage() {
    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    // Scroll animation refs
    const challengeAnim = useScrollAnimation();
    const visionFrameworkAnim = useScrollAnimation();
    const workshop1Anim = useScrollAnimation();
    const workshop2Anim = useScrollAnimation();
    const workshop3Anim = useScrollAnimation();
    const synthesisAnim = useScrollAnimation();
    const roleAnim = useScrollAnimation();
    const impactAnim = useScrollAnimation();
    const reflectionAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'rgba(31, 41, 55, 0.08)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#1f2937',
                    marginBottom: '32px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    Case Study — Phase 3 of 3
                </div>
                <h1 className="case-study-title">B2B Vision Testing</h1>
                <p className="case-study-company">
                    Three cross-functional workshops to align Product, Sales, and Leadership
                    on a unified two-year vision for Arrive for Business—transforming fragmented
                    perspectives into a shared, actionable product strategy.
                </p>
            </section>

            {/* Divider */}
            <hr className="case-study-divider" />

            {/* Meta + Description Grid */}
            <section className="case-study-meta-section">
                <div className="case-study-meta">
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value">Final 2 Months</p>
                    </div>
                    <div className="meta-block">
                        <span className="meta-label">WORKSHOPS</span>
                        <p className="meta-value">3 Sessions</p>
                    </div>
                    <div className="meta-block">
                        <span className="meta-label">PARTICIPANTS</span>
                        <p className="meta-value">Product<br />Sales<br />Leadership</p>
                    </div>
                    <div className="meta-block">
                        <span className="meta-label">MY ROLE</span>
                        <p className="meta-value">Workshop Design<br />& Facilitation</p>
                    </div>
                </div>

                <div className="case-study-description">
                    <div className="description-block">
                        <span className="meta-label">OVERVIEW</span>
                        <p className="description-text">
                            After months of Fleet Management and Expense Management research, Max (Head of B2B)
                            needed to consolidate insights into a unified two-year product vision—but the organization
                            lacked alignment on what Arrive for Business should become.
                        </p>
                        <p className="description-text">
                            I designed and facilitated a three-workshop sequence that brought together product managers,
                            sales representatives, and leadership to pressure-test an end-to-end future state, align on
                            success criteria, and prioritize what matters most to deliver customer and business value.
                        </p>
                    </div>
                </div>
            </section>

            {/* Challenge Section */}
            <section ref={challengeAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(challengeAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    The Challenge
                </div>
                <h2 className="content-heading">A Fragmented B2B Experience</h2>

                {/* Challenge Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '48px' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '24px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Fragmented Platform</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                            No cohesive end-to-end experience across EasyPark (EU) and ParkMobile (US).
                            Multiple products, multiple portals, no unified story.
                        </p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '24px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Siloed Product Managers</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                            Seven PMs owning different feature areas with varying priorities,
                            no shared understanding of the target experience.
                        </p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '24px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Inconsistent Sales Narrative</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                            Sales teams in US and EU telling different stories to prospects,
                            with no unified value proposition or demo flow.
                        </p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '24px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Leadership Uncertainty</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                            Executives needed clarity on investment priorities—what to build first,
                            what creates real customer value, what differentiates from competitors.
                        </p>
                    </div>
                </div>

                {/* Research Question */}
                <div style={{
                    background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '24px',
                    padding: '48px',
                    marginTop: '64px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #1f2937, transparent)' }}></div>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px', lineHeight: 1.4 }}>
                        How might the Arrive for Business product experience <span style={{ color: '#1f2937', fontWeight: 700 }}>evolve</span> to meet new market needs and exceed expectations over the next two years?
                    </h3>
                    <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.7 }}>
                        We needed to pressure-test an end-to-end future state, align on success criteria,
                        and prioritize what matters most to deliver customer and business value.
                    </p>
                </div>
            </section>

            {/* Vision Framework Section */}
            <section ref={visionFrameworkAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(visionFrameworkAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Vision Framework
                </div>
                <h2 className="content-heading">Four Core Moments</h2>
                <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px', maxWidth: '700px' }}>
                    Working with Max, we structured the two-year vision around four experience moments
                    that form a narrative storyboard—from first discovery to ongoing optimization.
                </p>

                {/* Vision Moments Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                    {/* Moment 1: Browse */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', position: 'relative', transition: 'all 0.2s' }}>
                        <span style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '24px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#1f2937',
                            background: 'white',
                            padding: '4px 12px',
                            borderRadius: '100px',
                            border: '1px solid #e5e7eb'
                        }}>01</span>
                        <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px', marginTop: '8px' }}>Browse</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: 1.6 }}>Help prospects understand breadth of offerings and find the right solution</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Marketing page with mobility cards, tolling, telematics
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Tailored navigation by business size
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Transparent pricing tiers
                            </span>
                        </div>
                    </div>

                    {/* Moment 2: Onboard */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', position: 'relative', transition: 'all 0.2s' }}>
                        <span style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '24px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#1f2937',
                            background: 'white',
                            padding: '4px 12px',
                            borderRadius: '100px',
                            border: '1px solid #e5e7eb'
                        }}>02</span>
                        <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px', marginTop: '8px' }}>Onboard</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: 1.6 }}>Simplify enterprise setup with flexible configuration options</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Contact details & payment settings
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Centralized vs decentralized billing
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Expense & telematics integrations
                            </span>
                        </div>
                    </div>

                    {/* Moment 3: Configure */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', position: 'relative', transition: 'all 0.2s' }}>
                        <span style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '24px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#1f2937',
                            background: 'white',
                            padding: '4px 12px',
                            borderRadius: '100px',
                            border: '1px solid #e5e7eb'
                        }}>03</span>
                        <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px', marginTop: '8px' }}>Configure</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: 1.6 }}>Enable deep configuration and service expansion post-portal entry</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Driver/vehicle upload (CSV, domain, Okta)
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Mobility cards with spending controls
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Unified dashboard
                            </span>
                        </div>
                    </div>

                    {/* Moment 4: Analyze */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', position: 'relative', transition: 'all 0.2s' }}>
                        <span style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '24px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#1f2937',
                            background: 'white',
                            padding: '4px 12px',
                            borderRadius: '100px',
                            border: '1px solid #e5e7eb'
                        }}>04</span>
                        <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px', marginTop: '8px' }}>Analyze</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: 1.6 }}>Provide insights and actionable intelligence to optimize fleet operations</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Interactive reporting dashboards
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Spend by category, abnormal behaviors
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#1f2937' }}>→</span>
                                Email reports to fleet managers
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workshop 1: Product */}
            <section ref={workshop1Anim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(workshop1Anim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Workshop 1
                </div>
                <h2 className="content-heading">Product Alignment & Ideation</h2>
                <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px', maxWidth: '700px' }}>
                    A two-day workshop sequence with 7 product managers—starting with brutal honesty
                    about the current state, then shifting to ownership and creative contribution.
                </p>

                {/* Workshop Card 1: Day 1 */}
                <div style={{
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '24px',
                    padding: '48px',
                    marginBottom: '32px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#1f2937' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Session 1: Letter Grade + Vision Review</h3>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Stockholm, In-Person · Max-led, I designed</p>
                        </div>
                        <span style={{ padding: '8px 16px', background: 'rgba(31, 41, 55, 0.08)', borderRadius: '100px', fontSize: '13px', color: '#1f2937', fontWeight: 500 }}>Day 1</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Activity</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Grade the Current Platform</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Asked 7 PMs to anonymously grade the current B2B platform.
                                Results surfaced the fragmentation problem clearly.
                            </p>
                        </div>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Activity</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Initial Storyboard Review</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Walked through Browse/Onboard/Configure/Analyze framework.
                                PMs claimed ownership over sections aligned with their domains.
                            </p>
                        </div>
                    </div>

                    {/* Starting Grades */}
                    <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginTop: '32px', border: '1px solid #e5e7eb' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', marginBottom: '16px', textAlign: 'center' }}>Starting Grades</p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {['C+', 'F', 'C-', 'C', 'D-', 'D+', 'D'].map((grade, i) => (
                                <span key={i} style={{
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444'
                                }}>{grade}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Workshop Card 2: Day 2 */}
                <div style={{
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '24px',
                    padding: '48px',
                    marginBottom: '32px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#1f2937' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Session 2: Mellow Four Sketching</h3>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Virtual, 60 minutes · I facilitated</p>
                        </div>
                        <span style={{ padding: '8px 16px', background: 'rgba(31, 41, 55, 0.08)', borderRadius: '100px', fontSize: '13px', color: '#1f2937', fontWeight: 500 }}>Day 2</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Activity</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Mellow 4's Exercise</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Fold paper into 4 sections. 5 minutes per sketch. Focus on WHAT to include,
                                not layout fidelity. Upload and tag sketches in FigJam.
                            </p>
                        </div>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Activity</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Discussion & Voting</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Shifted PMs from critique to ownership. Synthesized ideas into
                                Storyboard v2 for design to begin high-fidelity work.
                            </p>
                        </div>
                    </div>

                    {/* Grade Transformation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginTop: '32px', padding: '32px', background: 'white', borderRadius: '16px', flexWrap: 'wrap', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', marginBottom: '12px' }}>Starting Grades</p>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {['C+', 'F', 'C-', 'C', 'D-', 'D+', 'D'].map((grade, i) => (
                                    <span key={i} style={{
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        color: '#ef4444'
                                    }}>{grade}</span>
                                ))}
                            </div>
                        </div>
                        <span style={{ fontSize: '32px', color: '#1f2937' }}>→</span>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', marginBottom: '12px' }}>Post-Workshop Grades</p>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {['A', 'A', 'A', 'A', 'B+', 'B', 'B'].map((grade, i) => (
                                    <span key={i} style={{
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        color: '#22c55e'
                                    }}>{grade}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Workshop Card 3: Follow-up */}
                <div style={{
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '24px',
                    padding: '48px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#eab308' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Session 3: High-Fidelity Prototype Walkthrough</h3>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Virtual · I facilitated</p>
                        </div>
                        <span style={{ padding: '8px 16px', background: 'rgba(234, 179, 8, 0.15)', borderRadius: '100px', fontSize: '13px', color: '#ca8a04', fontWeight: 500 }}>Follow-up</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Activity</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Vision Prototype Review</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Design created high-fidelity prototype from Storyboard v2.
                                PMs added feedback via sticky notes: Valuable, Concerning, Missing.
                            </p>
                        </div>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Sections Reviewed</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Complete End-to-End Flow</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Browse · Onboard · Dashboard · Mobility Cards · Telematics ·
                                Tolling Automation · Expense Management · Analyze
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workshop 2: Sales Team */}
            <section ref={workshop2Anim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(workshop2Anim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Workshop 2
                </div>
                <h2 className="content-heading">Sales Team Alignment</h2>
                <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px', maxWidth: '700px' }}>
                    A cross-regional workshop with sales representatives from US and EU markets—defining
                    success criteria, prioritizing features, and validating the vision prototype.
                </p>

                {/* Sales Workshop Card */}
                <div style={{
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '24px',
                    padding: '48px',
                    marginBottom: '48px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#1f2937' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Sales Team Workshop</h3>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Virtual · December 11 · I facilitated</p>
                        </div>
                        <span style={{ padding: '8px 16px', background: 'rgba(31, 41, 55, 0.08)', borderRadius: '100px', fontSize: '13px', color: '#1f2937', fontWeight: 500 }}>US + EU Mix</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Participants</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Cross-Regional Team</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Marcus · Markus · Simon · Nathaniel · Nikita and leadership
                                from both US and EU markets.
                            </p>
                        </div>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Agenda</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Three-Part Structure</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                1. Success Criteria Definition<br />
                                2. Feature Prioritization<br />
                                3. Vision Prototype Walkthrough
                            </p>
                        </div>
                    </div>
                </div>

                {/* Success Criteria Section */}
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Success Criteria
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '32px' }}>What would be true if we delivered the best possible vision?</h3>

                {/* Criteria Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                    <div style={{ background: '#1f2937', borderRadius: '16px', padding: '28px', color: 'white' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Introduce flexibility to match mental models on employee onboarding</h4>
                        <p style={{ fontSize: '14px', opacity: 0.85, lineHeight: 1.6 }}>Onboarding open for the enterprise and opt-in for employees to sign up—adaptable to different configurations.</p>
                        <p style={{ marginTop: '16px', fontSize: '13px', opacity: 0.6 }}>— Emily Stuart</p>
                    </div>
                    <div style={{ background: '#1f2937', borderRadius: '16px', padding: '28px', color: 'white' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Meet customers where they are</h4>
                        <p style={{ fontSize: '14px', opacity: 0.85, lineHeight: 1.6 }}>Integrations across their ecosystem—seamlessly connect with the tools, platforms, and workflows customers already use.</p>
                        <p style={{ marginTop: '16px', fontSize: '13px', opacity: 0.6 }}>— Emily Stuart</p>
                    </div>
                    <div style={{ background: '#1f2937', borderRadius: '16px', padding: '28px', color: 'white' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Expand offerings beyond parking</h4>
                        <p style={{ fontSize: '14px', opacity: 0.85, lineHeight: 1.6 }}>Move into a true mobility solution with telematics, mobility cards, and adjacent capabilities that shift customers from viewing Arrive as a single tool to a holistic solution.</p>
                        <p style={{ marginTop: '16px', fontSize: '13px', opacity: 0.6 }}>— Emily Stuart</p>
                    </div>
                </div>

                {/* Additional Questions */}
                <div style={{ background: 'rgba(31, 41, 55, 0.05)', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Additional Questions Surfaced</h4>
                    <div style={{ marginBottom: '16px' }}>
                        <strong style={{ fontSize: '14px', color: '#1f2937' }}>Self-serve beyond onboarding</strong>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Complete all tasks in the service without requiring support from sales teams or customer service.</p>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <strong style={{ fontSize: '14px', color: '#1f2937' }}>Guidance without handholding</strong>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>What does contextual guidance look like without sales or support involvement?</p>
                    </div>
                    <div>
                        <strong style={{ fontSize: '14px', color: '#1f2937' }}>Full lifecycle consideration</strong>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>How do we support micro enterprises as they move into enterprise? How do we get smarter about retaining customers and reducing churn?</p>
                    </div>
                </div>
            </section>

            {/* Workshop 3: Sales Leadership */}
            <section ref={workshop3Anim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(workshop3Anim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Workshop 3
                </div>
                <h2 className="content-heading">Sales Leadership Refinement</h2>
                <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px', maxWidth: '700px' }}>
                    EU Sales Leadership reviewed and refined the criteria and priorities established
                    by the sales team—surfacing regional nuances and strategic considerations.
                </p>

                {/* Leadership Workshop Card */}
                <div style={{
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '24px',
                    padding: '48px',
                    marginBottom: '48px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#1f2937' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Sales Leadership Workshop</h3>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Virtual · December 11 · I facilitated</p>
                        </div>
                        <span style={{ padding: '8px 16px', background: 'rgba(31, 41, 55, 0.08)', borderRadius: '100px', fontSize: '13px', color: '#1f2937', fontWeight: 500 }}>EU Leadership</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Activity 1</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Criteria Expansion</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Leadership added two additional points to the Top 3 Criteria
                                identified by the sales team, emphasizing lifecycle and retention.
                            </p>
                        </div>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#1f2937', marginBottom: '12px', display: 'block' }}>Activity 2</span>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Priority Refinement</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                                Refined feature prioritization order, surfacing regional differences
                                in EV charging importance and parking restrictions value.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature Prioritization Pyramid */}
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Final Feature Prioritization
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '48px' }}>Aligned Priorities Across Product, Sales, and Leadership</h3>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                    {/* Must Be Included */}
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>Must Be Included</span>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {['Mobility Cards', 'EV Charging', 'Expense Mgmt Platform', 'Integrate with Fleet Software'].map((feature, i) => (
                                <span key={i} style={{ padding: '12px 20px', background: '#f9fafb', border: '2px solid #1f2937', borderRadius: '8px', fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>{feature}</span>
                            ))}
                        </div>
                    </div>

                    {/* Should Be Included */}
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>Should Be Included</span>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {['Generate Signup Link', 'Search your Domain', 'SSO', 'Telematics', 'Tolling Automation'].map((feature, i) => (
                                <span key={i} style={{ padding: '12px 20px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', color: '#4b5563' }}>{feature}</span>
                            ))}
                        </div>
                    </div>

                    {/* Nice to Include */}
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>Nice to Include</span>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {["Insights: Team's Parking Usage", 'Insights: Driver Activity'].map((feature, i) => (
                                <span key={i} style={{ padding: '12px 20px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', color: '#9ca3af' }}>{feature}</span>
                            ))}
                        </div>
                    </div>

                    {/* If Vision Achieved, Not Needed */}
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>If Vision Achieved, Not Needed</span>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {['CSV Driver/Vehicle Upload', 'Manual Upload', 'Email Insights'].map((feature, i) => (
                                <span key={i} style={{ padding: '12px 20px', background: 'transparent', border: '1px dashed #d1d5db', borderRadius: '8px', fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>{feature}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Regional Considerations */}
                <div style={{ background: 'rgba(31, 41, 55, 0.05)', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginTop: '48px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Regional Considerations Surfaced</h4>
                    <div style={{ marginBottom: '16px' }}>
                        <strong style={{ fontSize: '14px', color: '#1f2937' }}>1. EV Charging: EU vs. US</strong>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Higher priority in EU due to regulatory pressure and market expectations; lower immediate priority in US where EV fleet adoption is earlier stage.</p>
                    </div>
                    <div>
                        <strong style={{ fontSize: '14px', color: '#1f2937' }}>2. Setting Parking Restrictions: Value Perception</strong>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Different perspectives across regions and roles on how valuable and how broadly needed parking restrictions are for enterprise customers.</p>
                    </div>
                </div>
            </section>

            {/* Synthesis Section */}
            <section ref={synthesisAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(synthesisAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Synthesis
                </div>
                <h2 className="content-heading">Six Key Themes</h2>
                <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px', maxWidth: '700px' }}>
                    Across all three workshops, six consistent themes emerged—providing a clear
                    foundation for the vision and guiding principles for execution.
                </p>

                {/* Synthesis Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {[
                        { num: '01', title: 'Strong alignment and momentum around the vision', desc: 'The vision was consistently received as "ambitious yet achievable" across workshops and survey feedback. The end-to-end narrative helped teams see the product as a cohesive business journey.' },
                        { num: '02', title: 'Value beyond parking in broader mobility capabilities', desc: 'Mobility cards, telematics, and tolling automation were viewed as important capabilities that extend the offering beyond parking—supporting a shift toward a broader mobility platform.' },
                        { num: '03', title: 'Meet customers in their existing ecosystems', desc: 'Integrations were seen as essential to making Arrive feel embedded rather than another standalone tool. Connecting with expense, fleet, HRIS, and identity systems including SSO is critical.' },
                        { num: '04', title: 'Flexible, self-serve onboarding is critical', desc: 'Participants emphasized minimizing manual setup, supporting different enterprise configurations, and enabling employees to opt-in easily at scale.' },
                        { num: '05', title: 'Success must extend beyond onboarding to retention', desc: 'Leadership emphasized designing for the full customer lifecycle. Reducing churn, supporting growth from micro to enterprise, and being intentional about re-engagement.' },
                        { num: '06', title: 'Priorities and needs vary by market', desc: 'Some capabilities like EV charging and parking restrictions were prioritized differently across markets—highlighting the need for a thoughtful, market-aware approach.' },
                    ].map((item, i) => (
                        <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', transition: 'all 0.2s' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', marginBottom: '12px', display: 'block' }}>{item.num}</span>
                            <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>{item.title}</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Recommendations */}
                <div style={{ marginTop: '64px' }}>
                    <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                        Recommendations
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '32px' }}>Vision Refinements & Execution Considerations</h3>

                    <div style={{ marginBottom: '48px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ width: '32px', height: '3px', background: '#1f2937', borderRadius: '2px' }}></span>
                            Browse Experience
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderLeft: '3px solid #1f2937', borderRadius: '0 12px 12px 0', padding: '20px' }}>
                                <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Recommended Vision Change</h5>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>Highlight SSO capabilities—add into the story to get feedback from customers on enterprise authentication needs.</p>
                            </div>
                            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                                <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Primary Landing Page</h5>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>Localize copy by market. Showcase customer logos. Highlight industry-specific proof points.</p>
                            </div>
                            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                                <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Acquisition Funnel</h5>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>Evaluate phone number collection during sign-up. Surface estimated pricing earlier.</p>
                            </div>
                            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                                <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>User Management</h5>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>Detect and resolve duplicate accounts during sign-up. Provide clear way to connect or merge existing accounts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Role Section */}
            <section ref={roleAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(roleAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    My Contribution
                </div>
                <h2 className="content-heading">Workshop Design & Facilitation</h2>
                <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px', maxWidth: '700px' }}>
                    I designed and facilitated the complete workshop sequence, creating frameworks
                    and activities that transformed cross-functional perspectives into aligned action.
                </p>

                {/* Role Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Workshop Design</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Letter Grade exercise to surface baseline', "Mellow 4's sketching methodology", 'Success Criteria prompts', 'Feature prioritization pyramid framework', 'Vision prototype feedback structure', 'Post-workshop survey design (Typeform)'].map((item, i) => (
                                <li key={i} style={{ fontSize: '14px', color: '#6b7280', padding: '8px 0', borderBottom: i < 5 ? '1px solid #e5e7eb' : 'none' }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Facilitation</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Product Workshop Session 2 (virtual)', 'Product High-Fidelity Review (virtual)', 'Sales Team Workshop (virtual)', 'Sales Leadership Workshop (virtual)', 'Cross-regional coordination (US + EU)', 'Group breakout management'].map((item, i) => (
                                <li key={i} style={{ fontSize: '14px', color: '#6b7280', padding: '8px 0', borderBottom: i < 5 ? '1px solid #e5e7eb' : 'none' }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Synthesis & Delivery</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['FigJam board design and maintenance', 'Feedback categorization and synthesis', 'Feature prioritization consolidation', 'Stakeholder one-pager creation', 'Recommended vision changes documentation', 'Customer testing discussion guide drafts'].map((item, i) => (
                                <li key={i} style={{ fontSize: '14px', color: '#6b7280', padding: '8px 0', borderBottom: i < 5 ? '1px solid #e5e7eb' : 'none' }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section ref={impactAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(impactAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Impact
                </div>
                <h2 className="content-heading">Cross-Functional Alignment Achieved</h2>

                {/* Impact Box */}
                <div style={{
                    background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                    borderRadius: '24px',
                    padding: '64px',
                    marginTop: '48px',
                    border: '1px solid #e5e7eb'
                }}>
                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '32px', marginBottom: '48px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>
                                <AnimatedCounter end={3} duration={1500} />
                            </div>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>Workshops Designed & Facilitated</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>C→A</div>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>Product Team Transformation</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>
                                <AnimatedCounter end={6} duration={1500} />
                            </div>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>Aligned Themes Identified</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>
                                <AnimatedCounter end={15} duration={1500} suffix="+" />
                            </div>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>Features Prioritized</div>
                        </div>
                    </div>

                    {/* Quote */}
                    <div style={{ background: 'white', borderRadius: '16px', padding: '32px', position: 'relative', border: '1px solid #e5e7eb' }}>
                        <span style={{ position: 'absolute', top: '16px', left: '24px', fontSize: '64px', color: '#e5e7eb', fontFamily: 'Georgia, serif', lineHeight: 1 }}>"</span>
                        <p style={{ fontSize: '20px', fontStyle: 'italic', paddingLeft: '48px', marginBottom: '16px', lineHeight: 1.6, color: '#1f2937' }}>
                            The end-to-end narrative helped teams see the product as a cohesive business journey, creating momentum and alignment around a shared direction.
                        </p>
                        <span style={{ paddingLeft: '48px', color: '#9ca3af', fontSize: '14px' }}>— Workshop Synthesis</span>
                    </div>
                </div>

                {/* Outcomes Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '48px' }}>
                    {[
                        { num: 'Outcome 1', title: 'Unified Vision Document', desc: "A clear, actionable two-year product vision aligned across Product, Sales, and Leadership—ready for customer validation." },
                        { num: 'Outcome 2', title: 'Prioritized Feature Roadmap', desc: 'Consensus on what must be included, should be included, and can be deprioritized—with regional nuances documented.' },
                        { num: 'Outcome 3', title: 'Prototype Feedback Integration', desc: 'Detailed recommendations for vision changes and execution considerations, organized by product area for design.' },
                        { num: 'Outcome 4', title: 'Customer Testing Ready', desc: 'Discussion guides drafted to begin validating the vision with prospective and existing B2B customers externally.' },
                    ].map((item, i) => (
                        <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', transition: 'all 0.2s' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', marginBottom: '12px', display: 'block' }}>{item.num}</span>
                            <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>{item.title}</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reflection */}
            <section ref={reflectionAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(reflectionAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Reflection
                </div>

                <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: 1.5, fontStyle: 'italic', marginBottom: '48px', color: '#1f2937' }}>
                    "This project demonstrated how structured facilitation can transform fragmented perspectives into shared strategic direction—a capability as valuable as traditional research."
                </p>

                <p className="content-text">
                    Vision testing workshops are a different kind of research contribution. Instead of generating primary user insights, the goal is to synthesize existing knowledge, surface disagreements, and build alignment. The skill is in designing activities that create psychological safety while also creating pressure toward decisions.
                </p>
                <p className="content-text">
                    The grade transformation—from C/D/F to A/B across seven product managers—was not just about the vision itself improving. It was about the shift from passive criticism to active ownership. Once PMs contributed their own sketches and saw their ideas reflected in the prototype, they became advocates rather than skeptics.
                </p>
                <p className="content-text">
                    This project reinforced for me that facilitation is a research skill. Understanding group dynamics, designing for productive conflict, and creating artifacts that people want to reference—these are as important as interview technique or synthesis methodology.
                </p>
            </section>

            {/* Spacer before bottom nav */}
            <div style={{ height: '80px' }}></div>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/work/arrive" className="back-link">
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="back-arrow" />
                    Back to Arrive
                </Link>
                <Link href="/work/arrive/parking-planner" className="back-link">
                    Next: Parking Planner Case Study
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="right-arrow" />
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
    );
}
