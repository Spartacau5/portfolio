'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';

export default function ZoominfoPage() {
    const scrollToPrototype = () => {
        const prototypeSection = document.getElementById('prototype-section');
        if (prototypeSection) {
            prototypeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll animation ref
    const projectsAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">ZoomInfo</h1>
                <p className="case-study-company">Redesigning how sales & marketing teams hit their number worldwide</p>
            </section>

            {/* Divider */}
            <hr className="case-study-divider" />

            {/* Meta + Description Grid */}
            <section className="case-study-meta-section">
                <div className="case-study-meta">
                    {/* My Role */}
                    <div className="meta-block">
                        <span className="meta-label">MY ROLE</span>
                        <p className="meta-value">UX/UI Designer II</p>
                    </div>

                    {/* Team */}
                    <div className="meta-block">
                        <span className="meta-label">TEAM</span>
                        <div className="team-logos">
                            <Image src="/images/salesos.avif" alt="SalesOS" width={80} height={24} className="team-logo" />
                            <Image src="/images/talentos.avif" alt="TalentOS" width={80} height={24} className="team-logo" />
                            <Image src="/images/reachout.avif" alt="ReachOut" width={80} height={24} className="team-logo" />
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value">May 2022 - Apr 2024</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Figma<br />Amplitude<br />Confluence<br />JIRA</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Context */}
                    <div className="description-block">
                        <span className="meta-label">CONTEXT</span>
                        <p className="description-text">
                            During my time at ZoomInfo, I designed across multiple products supporting go to market strategies for over 25,000 companies worldwide.
                        </p>
                        <p className="description-text">
                            I began by improving the Search UX for TalentOS, the recruiter platform, working closely with integrated products like Comparably and ReachOut. After being promoted to Lead Designer, I led the integration of SMS into recruiter prospecting, redesigned the Projects feature to streamline workflows, and introduced advanced organizational tools. These efforts reduced prospecting friction and improved workflow efficiency by approximately 22%.
                        </p>
                        <p className="description-text">
                            I also contributed to high impact initiatives across SalesOS, ZoomInfo's flagship product, including a major login redesign and AI integrations for ZI Copilot, as well as features for Extension and Chorus. During this period, ZoomInfo's quarterly revenue exceeded $300M in Q1 2023, reflecting the scale and impact of the work.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="case-study-cta">
                        <button className="cta-button primary" onClick={scrollToPrototype}>View Work</button>
                    </div>
                </div>
            </section>

            {/* Key Projects Section */}
            <section ref={projectsAnim.ref as React.RefObject<HTMLElement>} id="prototype-section" className="case-study-content" style={fadeInUp(projectsAnim.isVisible)}>
                <h2 className="content-heading">Key Projects</h2>

                <div className="project-cards-grid">
                    {/* Job Description Parser Card */}
                    <div className="project-card-wrapper">
                        <div className="project-card has-video">
                            <div className="project-card-video">
                                <iframe
                                    src="https://www.youtube.com/embed/UXdk2DeAh64?si=12OTRLFAm7nKsFp4"
                                    title="Job Description Parser"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        <div className="project-card-info">
                            <Link href="/work/zoominfo/job-description-parser" className="project-card-title-link">
                                Job Description Parser
                            </Link>
                            <p className="project-card-subtext">
                                Led the UX design for ZoomInfo's Job Description Parser, automating candidate searches to enhance recruiter efficiency.
                            </p>
                        </div>
                    </div>

                    {/* Dashboard for TalentOS Card */}
                    <div className="project-card-wrapper">
                        <Link href="/work/zoominfo/dashboard-talentos" className="project-card has-image">
                            <Image src="/images/dashboard.avif" alt="Dashboard for TalentOS" width={600} height={400} className="project-card-image" />
                        </Link>
                        <div className="project-card-info">
                            <Link href="/work/zoominfo/dashboard-talentos" className="project-card-title-link">
                                Dashboard for TalentOS
                            </Link>
                            <p className="project-card-subtext">
                                Designed a dashboard for real-time insights into workforce reductions, aiming to enhance market intelligence and support users in navigating dynamic industry shifts.
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
