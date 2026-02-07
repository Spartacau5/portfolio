'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import { analytics } from '@/app/components/GoogleAnalytics';

export default function ArrivePage() {
    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    const projectsAnim = useScrollAnimation();

    const scrollToPrototype = () => {
        const prototypeSection = document.getElementById('prototype-section');
        if (prototypeSection) {
            prototypeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">Arrive</h1>
                <p className="case-study-company">6-month embedded research engagement shaping B2B product strategy</p>
            </section>

            {/* Divider */}
            <hr className="case-study-divider" />

            {/* Meta + Description Grid */}
            <section className="case-study-meta-section">
                <div className="case-study-meta">
                    {/* My Role */}
                    <div className="meta-block">
                        <span className="meta-label">MY ROLE</span>
                        <p className="meta-value">UX Researcher</p>
                    </div>

                    {/* Team */}
                    <div className="meta-block">
                        <span className="meta-label">TEAM</span>
                        <p className="meta-value">2 researchers<br />2 designers<br />1 engagement manager</p>
                    </div>

                    {/* Timeline */}
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value">June - Dec 2025</p>
                    </div>

                    {/* Scope */}
                    <div className="meta-block">
                        <span className="meta-label">SCOPE</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="meta-value" style={{ margin: 0 }}>US</span>
                                <span style={{ color: '#d1d5db' }}>—</span>
                                <a href="https://parkmobile.io/" target="_blank" rel="noopener noreferrer" className="tool-icon-link">
                                    <Image src="/images/parkmobile-logo.png" alt="ParkMobile" width={100} height={24} style={{ height: '18px', width: 'auto' }} />
                                    <span className="tool-tooltip">ParkMobile</span>
                                </a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="meta-value" style={{ margin: 0 }}>EU</span>
                                <span style={{ color: '#d1d5db' }}>—</span>
                                <a href="https://www.easypark.com/en-is" target="_blank" rel="noopener noreferrer" className="tool-icon-link">
                                    <Image src="/images/easypark-logo.png" alt="EasyPark" width={100} height={24} style={{ height: '22px', width: 'auto' }} />
                                    <span className="tool-tooltip">EasyPark</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="case-study-description">
                    {/* Context */}
                    <div className="description-block">
                        <span className="meta-label">CONTEXT</span>
                        <p className="description-text">
                            A six-month embedded engagement with <a href="https://arrive.com/en" target="_blank" rel="noopener noreferrer" className="content-link">Arrive<svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>, a mobility company expanding from consumer parking into enterprise solutions. I joined through <a href="https://www.madebycraft.co" target="_blank" rel="noopener noreferrer" className="content-link">Craft<svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a> to help Arrive&apos;s B2B team figure out what to build, and get internal alignment on how to get there.
                        </p>
                        <p className="description-text">
                            I worked across product, design, sales leadership, and enterprise customers on three connected initiatives. Each built on the last: starting with evaluating a strategic pivot through testing an MVP concept, evolving into strategic research for future state of B2B integrations, and ending with cross-functional workshops that aligned the organization around a strong 2-year product vision.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="case-study-cta">
                        <button className="cta-button primary" onClick={scrollToPrototype}>View Work</button>
                    </div>
                </div>
            </section>

            {/* Key Projects Section */}
            <section id="prototype-section" ref={projectsAnim.ref} className="case-study-content" style={fadeInUp(projectsAnim.isVisible)}>
                <h2 className="content-heading">Key Projects</h2>

                <div className="project-cards-grid" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {/* Project 1: Parking Planner for Dispatchers */}
                    <div className="project-card-wrapper">
                        <Link href="/work/arrive/parking-planner" className="project-card has-image fleet-management-card" style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            gap: '2rem',
                            padding: '3rem 2rem',
                            background: '#f5f5f5',
                            borderRadius: '24px',
                            minHeight: '400px'
                        }}>
                            {/* Dispatcher Video - Tablet style (larger) */}
                            <video
                                src="/images/dispatcher.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{
                                    width: '60%',
                                    maxWidth: '500px',
                                    borderRadius: '12px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                                }}
                            />
                            {/* Driver MVP Video - Phone style (smaller) */}
                            <video
                                src="/images/driver-mvp.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{
                                    width: '20%',
                                    maxWidth: '150px',
                                    borderRadius: '12px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                                }}
                            />
                        </Link>
                        <div className="project-card-info">
                            <Link href="/work/arrive/parking-planner" className="project-card-title-link">
                                B2B Parking Planner
                                <svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </Link>
                            <p className="project-card-subtext">
                                Evaluated whether Arrive's B2B offering should expand from parking support to fleet planning tools, based on research across US and EU.
                            </p>
                        </div>
                    </div>

                    {/* Project 2: Expense Management */}
                    <div className="project-card-wrapper">
                        <Link href="/work/arrive/expense-management" className="project-card has-image arrive-sapconcur-card" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0',
                            padding: '3rem 2rem',
                            background: '#f5f5f5',
                            borderRadius: '24px',
                            minHeight: '400px'
                        }}>
                            <Image src="/images/arrive-logo.png" alt="Arrive" width={150} height={48} className="arrive-logo" style={{ height: '48px', width: 'auto' }} />
                            <span className="collab-x" style={{ fontSize: '28px', fontWeight: '300', color: '#9ca3af', margin: '1rem 1.5rem 0 1.5rem' }}>×</span>
                            <Image src="/images/sapconcur.svg" alt="SAP Concur" width={200} height={48} className="sapconcur-logo" style={{ height: '70px', width: 'auto', marginTop: '0.75rem' }} />
                        </Link>
                        <div className="project-card-info">
                            <Link href="/work/arrive/expense-management" className="project-card-title-link">
                                Expense Management: SAP Concur Integration
                                <svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </Link>
                            <p className="project-card-subtext">
                                Conducted research to evaluate and shape an in-progress SAP Concur integration MVP, identifying opportunities to streamline parking expense submission, improve compliance, and reduce manual overhead for enterprise teams.
                            </p>
                        </div>
                    </div>

                    {/* Project 3: B2B Vision Testing */}
                    <div className="project-card-wrapper">
                        <Link href="/work/arrive/vision-testing" className="project-card has-image" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0',
                            background: '#f5f5f5',
                            borderRadius: '24px',
                            minHeight: '400px',
                            overflow: 'hidden'
                        }}>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '24px'
                                }}
                            >
                                <source src="/images/visiontesting.webm" type="video/webm" />
                            </video>
                        </Link>
                        <div className="project-card-info">
                            <Link href="/work/arrive/vision-testing" className="project-card-title-link">
                                Arrive for Business: Vision Testing
                                <svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </Link>
                            <p className="project-card-subtext">
                                Led cross-functional vision testing workshops with sales and leadership to evaluate, prioritize, and refine Arrive's two-year B2B product vision based on customer-facing insights.
                            </p>
                        </div>
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
    );
}
