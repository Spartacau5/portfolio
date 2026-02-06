'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';

export default function ExpenseManagementPage() {
    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    const comingSoonAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">Expense Management: SAP Concur Integration</h1>
                <p className="case-study-company">Streamlining parking expense workflows for enterprise teams at Arrive</p>
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
                        <p className="meta-value">Aug - Oct 2025</p>
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
                            Conducted research to evaluate and shape an in-progress SAP Concur integration MVP, identifying opportunities to streamline parking expense submission, improve compliance, and reduce manual overhead for enterprise teams.
                        </p>
                        <p className="description-text">
                            This initiative aimed to bridge the gap between Arrive's parking platform and enterprise expense management workflows, enabling seamless reconciliation for corporate clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* Coming Soon Placeholder */}
            <section ref={comingSoonAnim.ref} className="case-study-content" style={{ textAlign: 'center', padding: '120px 0', ...fadeInUp(comingSoonAnim.isVisible) }}>
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
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="back-arrow" />
                    Back to Arrive
                </Link>
                <Link href="/work/arrive/vision-testing" className="back-link">
                    Next: Vision Testing Case Study
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
