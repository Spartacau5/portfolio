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
                <p className="case-study-company">Defining the future of mobility solutions</p>
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

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Figma<br />Craigslist<br />Typeform<br />Grain.ai<br />Notion</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Context */}
                    <div className="description-block">
                        <span className="meta-label">CONTEXT</span>
                        <p className="description-text">
                            This project represents a six-month embedded research engagement conducted through Craft, in partnership with Arrive, a mobility technology company operating across consumer and enterprise parking solutions.
                        </p>
                        <p className="description-text">
                            As a UX Researcher with a design background, I worked closely with Arrive's product designers, product managers, sales leadership, and enterprise customers to support the company's expansion into B2B offerings. Rather than focusing on a single feature or workflow, my work spanned multiple initiatives aimed at clarifying product direction, de-risking new opportunities, and aligning teams around real operational needs.
                        </p>
                        <p className="description-text">
                            Across this engagement, I contributed to three core initiatives: defining Arrive's long-term B2B vision, exploring an integrated expense management opportunity, and validating a Fleet Management MVP concept. Together, these projects highlight how research can guide strategy, inform design decisions, and support cross-functional alignment in complex B2B environments.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="case-study-cta">
                        <button className="cta-button primary" onClick={scrollToPrototype}>View Work</button>
                    </div>
                </div>
            </section>

            {/* Key Projects Section */}
            <section id="prototype-section" ref={projectsAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(projectsAnim.isVisible)}>
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
                                Fleet Management: Parking Planner MVP
                            </Link>
                            <p className="project-card-subtext">
                                Used mixed-methods research to determine whether building a parking planner for dispatchers and fleet managers was a viable next step in Arrive's B2B strategy.
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
