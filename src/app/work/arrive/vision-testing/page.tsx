'use client';

import Link from 'next/link';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';

export default function VisionTestingPage() {
    const comingSoonAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">Arrive for Business: Vision Testing</h1>
                <p className="case-study-company">Aligning product strategy through cross-functional validation at Arrive</p>
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
                        <p className="meta-value">June - Aug 2025</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Figma<br />Miro<br />Notion<br />Grain.ai</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Overview */}
                    <div className="description-block">
                        <span className="meta-label">OVERVIEW</span>
                        <p className="description-text">
                            Led cross-functional vision testing workshops with sales and leadership to evaluate, prioritize, and refine Arrive's two-year B2B product vision based on customer-facing insights.
                        </p>
                        <p className="description-text">
                            This initiative helped align stakeholders around a shared understanding of market opportunities and informed strategic decisions about product investment priorities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Coming Soon Placeholder */}
            <section ref={comingSoonAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={{ textAlign: 'center', padding: '120px 0', ...fadeInUp(comingSoonAnim.isVisible) }}>
                <p style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '2px', color: '#9ca3af', textTransform: 'uppercase' }}>
                    Coming Soon
                </p>
                <p style={{ fontSize: '18px', color: '#6b7280', marginTop: '16px' }}>
                    Full case study details are currently being prepared.
                </p>
            </section>

            {/* Spacer before bottom nav */}
            <div style={{ height: '80px' }}></div>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/work/arrive" className="back-link">
                    <img src="/images/arrow-angle.svg" alt="" className="back-arrow" />
                    Back to Arrive
                </Link>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="back-link"
                >
                    Go to top
                    <img src="/images/arrow-angle.svg" alt="" className="top-arrow" />
                </button>
            </div>
        </div>
    );
}
