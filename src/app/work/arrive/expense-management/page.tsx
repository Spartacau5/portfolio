'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp, AnimatedCounter } from '@/app/hooks/useScrollAnimation';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import PasswordProtect from '@/app/components/PasswordProtect';

export default function ExpenseManagementPage() {
    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    // Scroll animation refs
    const contextAnim = useScrollAnimation();
    const pivotAnim = useScrollAnimation();
    const myRoleAnim = useScrollAnimation();
    const approachAnim = useScrollAnimation();
    const sampleAnim = useScrollAnimation();
    const deliveryAnim = useScrollAnimation();
    const frameworkAnim = useScrollAnimation();
    const insightsHeaderAnim = useScrollAnimation();
    const insight1Anim = useScrollAnimation();
    const insight2Anim = useScrollAnimation();
    const insight3Anim = useScrollAnimation();
    const insight4Anim = useScrollAnimation();
    const insight5Anim = useScrollAnimation();
    const recommendationsAnim = useScrollAnimation();
    const impactAnim = useScrollAnimation();
    const reflectionAnim = useScrollAnimation();
    const artifactsAnim = useScrollAnimation();

    return (
        <PasswordProtect password="crafty123">
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '24px', textTransform: 'uppercase' }}>
                    UX Research Case Study
                </div>
                <h1 className="case-study-title">Future-State Expense Management</h1>
                <p className="case-study-company">Transforming a tactical integration validation into a strategic vision that reshaped EasyPark&apos;s enterprise product roadmap</p>
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

                    {/* Timeline */}
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value">3 months</p>
                    </div>

                    {/* Team */}
                    <div className="meta-block">
                        <span className="meta-label">TEAM</span>
                        <p className="meta-value">2 researchers<br />1 designer<br />1 engagement manager</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Figma<br />Grain.ai<br />Notion<br />FigJam</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Overview */}
                    <div className="description-block">
                        <span className="meta-label">OVERVIEW</span>
                        <p className="description-text">
                            EasyPark is a leading provider of smart parking solutions focused on simplifying urban mobility and corporate fleet management. Their B2B offering removes administrative burdens associated with parking expenses for both drivers and financial administrators.
                        </p>
                        <p className="description-text">
                            However, EasyPark&apos;s model was almost &quot;too simple.&quot; They billed enterprises in aggregate, meaning drivers didn&apos;t need to submit individual expenses. While this reduced friction for drivers, it conflicted with how large enterprises operate—requiring transaction-level visibility for auditing, compliance, approvals, cost allocation, and policy enforcement.
                        </p>
                        <p className="description-text">
                            This created a strategic tension: EasyPark optimized for simplicity through centralized billing, while enterprises required granular control, traceability, and integration into existing financial systems.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="case-study-cta">
                        <a
                            href="https://www.figma.com/proto/iI0FkkDfReJGaEVDbXDbZA/Craft---My-Work?page-id=0%3A1&node-id=1-148668&viewport=-7534%2C-2171%2C0.43&t=GPZYh0lhQPCA1OTP-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A148668"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button primary"
                        >
                            View Final Debrief
                        </a>
                    </div>
                </div>
            </section>

            {/* The Challenge Section */}
            <section ref={contextAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(contextAnim.isVisible)}>
                <h2 className="content-heading">The Challenge</h2>

                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Key Questions
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937', lineHeight: 1 }}>01</span>
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>Is Concur integration truly a gating factor for enterprise adoption?</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937', lineHeight: 1 }}>02</span>
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>What is the minimal viable integration required to unlock value?</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937', lineHeight: 1 }}>03</span>
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>How should parking expenses align with corporate policy?</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937', lineHeight: 1 }}>04</span>
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>What must be automated versus configurable?</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Strategic Pivot Section */}
            <section ref={pivotAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={{ paddingTop: 0, ...fadeInUp(pivotAnim.isVisible) }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.05), rgba(107, 114, 128, 0.05))', border: '1px solid rgba(31, 41, 55, 0.15)', borderRadius: '16px', padding: '40px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#1f2937', marginBottom: '12px', textTransform: 'uppercase' }}>
                        The Strategic Pivot
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#111' }}>From Integration Validation to Future-State Vision</h3>
                    <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.7 }}>
                        Initially, research focused on validating the SAP Concur integration MVP. But as the build progressed, we identified a strategic opportunity: while the integration was being developed, we could explore the broader future state of expense management and test that vision with users. This pivot made the project significantly more valuable than EasyPark initially imagined—and that&apos;s where I came in to lead the effort.
                    </p>
                </div>
            </section>

            {/* My Role Section */}
            <section ref={myRoleAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(myRoleAnim.isVisible)}>
                <h2 className="content-heading">My Role</h2>
                <p className="section-subtitle" style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px' }}>
                    Leading the future-state expense management research while the MVP build was underway
                </p>

                {/* Role Cards Grid */}
                <div className="role-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px' }}>
                    <div className="role-card" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                                <path d="M9 12h6" />
                                <path d="M9 16h6" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Research Design</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Designed discussion guides for concept evaluation and discovery with admins and drivers</p>
                    </div>
                    <div className="role-card" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Recruitment & Logistics</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Helped sales with outreach, managed incentives, recordings, and PII confidentiality</p>
                    </div>
                    <div className="role-card" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3v18h18" />
                                <path d="m19 9-5 5-4-4-3 3" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Stakeholder Updates</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Created topline updates, communicated between Arrive and Craft leadership</p>
                    </div>
                    <div className="role-card" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Executive Debrief</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Led final presentation to senior B2B leadership across EU and US markets</p>
                    </div>
                </div>

                <p className="content-text" style={{ marginTop: '40px' }}>
                    I joined at a pivotal moment: the Concur MVP build was underway, but there was an opportunity to validate whether the end-state expense management direction actually met admin and driver needs—and identify opportunities beyond the initial integration scope. I was responsible for synthesizing insights from complex enterprise workflows into actionable product recommendations while keeping both Arrive&apos;s product/leadership and Craft&apos;s teams aligned and satisfied with quality and pace.
                </p>
            </section>

            {/* Research Approach Section */}
            <section ref={approachAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(approachAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Approach
                </div>
                <h2 className="content-heading">Concept Evaluation & Discovery</h2>

                <p className="content-text">
                    The work expanded beyond simply validating Concur integration. We tested the integration concept itself, admin self-service portal improvements, end-state expense management workflows, reporting needs, policy controls, setup complexity, bulk administrative capabilities, and HRIS/system integration expectations.
                </p>

                {/* Process Flow */}
                <div className="synthesis-flow" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', margin: '48px 0', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 100px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Background & Role</div>
                    <span className="flow-arrow" style={{ color: '#9ca3af', fontSize: '20px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>→</span>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 100px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>EasyPark Usage</div>
                    <span className="flow-arrow" style={{ color: '#9ca3af', fontSize: '20px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>→</span>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 100px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Expense Systems</div>
                    <span className="flow-arrow" style={{ color: '#9ca3af', fontSize: '20px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>→</span>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 100px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Concept Walkthrough</div>
                    <span className="flow-arrow" style={{ color: '#9ca3af', fontSize: '20px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>→</span>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 100px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Feature Prioritization</div>
                </div>

                <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', textAlign: 'center' }}>
                    45-minute 1:1 concept evaluation interviews combining discovery and prototype feedback
                </p>
            </section>

            {/* Sample Section */}
            <section ref={sampleAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(sampleAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Sample
                </div>
                <h2 className="content-heading">Who We Interviewed</h2>

                {/* Persona Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '48px', marginTop: '48px' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden', ...fadeInUp(sampleAnim.isVisible, 0.1) }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#1f2937' }}></div>
                        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1, marginBottom: '8px', color: '#1f2937' }}>
                            <AnimatedCounter end={9} duration={1500} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Business Admins</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Managing expense workflows, approvals, and policy compliance at key B2B growth targets</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden', ...fadeInUp(sampleAnim.isVisible, 0.2) }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#6b7280' }}></div>
                        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1, marginBottom: '8px', color: '#6b7280' }}>
                            <AnimatedCounter end={4} duration={1500} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Service Drivers</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>End users who park for work and submit expenses through corporate systems</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden', ...fadeInUp(sampleAnim.isVisible, 0.3) }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#9ca3af' }}></div>
                        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1, marginBottom: '8px', color: '#9ca3af' }}>
                            <AnimatedCounter end={1} duration={1500} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Business Owner</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Decision-maker perspective on expense management value and adoption</p>
                    </div>
                </div>

                {/* Callout */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #1f2937', padding: '24px 32px', borderRadius: '0 12px 12px 0' }}>
                    <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                        Participants included enterprise customers such as Siemens Healthcare and Runforce, some of whom were willing to pilot the integration. All participants were US-based due to recruitment constraints.
                    </p>
                </div>
            </section>

            {/* Progressive Delivery Section */}
            <section ref={deliveryAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(deliveryAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Delivery
                </div>
                <h2 className="content-heading">Progressive Stakeholder Updates</h2>
                <p className="section-subtitle" style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px' }}>
                    Bi-weekly sprint shareouts kept leadership aligned as insights emerged
                </p>

                {/* Delivery Timeline */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '48px 0' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#e5e7eb', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Mid-Research</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>ELT Progress Update</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>N=5 interviews complete. Early signals on integration value, admin expectations, and driver concerns about company buy-in.</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#9ca3af', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Research Complete</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Topline Summary</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>N=14 complete. Five key findings crystallized around control, scalability, reporting, onboarding, and ecosystem potential.</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#1f2937', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Final Debrief</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Future State Debrief</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>Executive presentation to senior B2B leadership across EU and US. Strategic framework, recommendations, and phased roadmap.</p>
                    </div>
                </div>
            </section>

            {/* Framework Section */}
            <section ref={frameworkAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(frameworkAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Framework
                </div>
                <h2 className="content-heading">What Admins Need</h2>
                <p className="section-subtitle" style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px' }}>
                    A successful experience simplifies admin work while allowing them to take action when needed
                </p>

                {/* Framework Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', margin: '48px 0' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px 32px', textAlign: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#1f2937', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(31, 41, 55, 0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>⚡</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#1f2937' }}>Flexibility</h3>
                        <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>Different expensing options depending on company needs. Some want monthly invoicing, others want real-time integration.</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px 32px', textAlign: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#6b7280', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(107, 114, 128, 0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>🛡️</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#6b7280' }}>Control</h3>
                        <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>Oversight and ability to take action related to integration status, user management, and adoption tracking.</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px 32px', textAlign: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#9ca3af', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(156, 163, 175, 0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>🔗</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#9ca3af' }}>Alignment</h3>
                        <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>Fit smoothly into existing processes and systems—Concur, HRIS, ERP—without creating new workflows.</p>
                    </div>
                </div>
            </section>

            {/* Key Insights Header */}
            <section ref={insightsHeaderAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={{ paddingBottom: '0', ...fadeInUp(insightsHeaderAnim.isVisible) }}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Findings
                </div>
                <h2 className="content-heading">Key Insights</h2>
            </section>

            {/* Insight 1 */}
            <section ref={insight1Anim.ref as React.RefObject<HTMLElement>} className="case-study-content insight-section" style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '40px', ...fadeInUp(insight1Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>01</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Integrations will not be for everyone—retaining monthly invoicing is important</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Admins were split: 5 of 14 preferred consolidated monthly invoices for easier financial oversight and alignment with existing workflows. 9 of 14 valued auto-sent receipts to Concur for a seamless experience. But many didn&apos;t see enough value to justify extra fees, and some wanted the ability to start with invoices and shift to integration once EasyPark demonstrated reliability.
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #1f2937', padding: '24px 32px', borderRadius: '0 12px 12px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        &quot;Just because we&apos;ve never seen it yet, we probably would want to see the invoice first sent to the inbox. But if there&apos;s a way going down the road to have it sent through Concur, it might be easier to have those auto receipts. So if that works out, we will definitely switch to that.&quot;
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Business Admin</p>
                </div>

                {/* Recommendation */}
                <div style={{ background: 'rgba(31, 41, 55, 0.05)', border: '1px solid rgba(31, 41, 55, 0.15)', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Recommendation</div>
                    <p style={{ fontSize: '15px', color: '#1f2937', lineHeight: 1.6, margin: 0 }}>
                        Proceed with allowing for optionality between monthly invoices and integrations. Bake integration costs into the one-time business account subscription fee.
                    </p>
                </div>
            </section>

            {/* Insight 2 */}
            <section ref={insight2Anim.ref as React.RefObject<HTMLElement>} className="case-study-content insight-section" style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '40px', ...fadeInUp(insight2Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>02</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Admins expected baseline user controls as must-haves</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    11 of 13 admins used Concur and had clear expectations: bulk user upload and removal, visibility into connection status, and reminders to prompt employees who haven&apos;t connected. 8 of 13 preferred subscription fees managed at the account level rather than by individual drivers.
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #6b7280', padding: '24px 32px', borderRadius: '0 12px 12px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        &quot;If I had to manually add more than 10 people, that would be very detailed and very time consuming.&quot;
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Business Admin</p>
                </div>

                {/* Recommendation */}
                <div style={{ background: 'rgba(31, 41, 55, 0.05)', border: '1px solid rgba(31, 41, 55, 0.15)', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Recommendation</div>
                    <p style={{ fontSize: '15px', color: '#1f2937', lineHeight: 1.6, margin: 0 }}>
                        Consider baseline user control functionalities as must-haves within the admin experience. Proceed with admins controlling aggregated subscription fees as the standard offering.
                    </p>
                </div>
            </section>

            {/* Insight 3 */}
            <section ref={insight3Anim.ref as React.RefObject<HTMLElement>} className="case-study-content insight-section" style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '40px', ...fadeInUp(insight3Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>03</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Parking insights were valued, but not enough to warrant a new workflow</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Admins were delighted by parking-specific insights like over-spenders, vehicle utilization, and monthly spikes—data not surfaced in Concur. However, most (7 of 14) preferred accessing this data in existing systems (Concur, NetSuite) rather than logging into EasyPark&apos;s portal. Some suggested email digests as a lightweight alternative.
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #9ca3af', padding: '24px 32px', borderRadius: '0 12px 12px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        &quot;I know you have that dashboard on your portal, but if there&apos;s any way I&apos;ll get an email [of insights] at the end of the week/month, and it&apos;ll give me the highlights of like here&apos;s where you spent more. If it just did that automatically versus me having to go and hunt it out...&quot;
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Business Admin</p>
                </div>
            </section>

            {/* Insight 4 */}
            <section ref={insight4Anim.ref as React.RefObject<HTMLElement>} className="case-study-content insight-section" style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '40px', ...fadeInUp(insight4Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>04</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Expense integrations may be an entry into companies&apos; broader ecosystems</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    8 of 14 participants surfaced ideas for broader integrations: HRIS like ADP/BambooHR to automatically add/remove employees, Outlook for compliance reminders, ERP systems like NetSuite/Dynamics for expense allocation, and Waze for navigation. These were nice-to-haves, but signaled that Concur could be an entry point into deeper ecosystem integration.
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #1f2937', padding: '24px 32px', borderRadius: '0 12px 12px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        &quot;If there&apos;s a way that the system can talk to our HR Information System... so if somebody gets deleted in ADP, it would be really cool if it also got deleted in ParkMobile so we didn&apos;t have to remember to go in and get rid of that person.&quot;
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Business Admin</p>
                </div>
            </section>

            {/* Insight 5 */}
            <section ref={insight5Anim.ref as React.RefObject<HTMLElement>} className="case-study-content insight-section" style={{ paddingTop: '40px', ...fadeInUp(insight5Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>05</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Drivers wanted simple and frictionless—but doubted company buy-in</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Drivers rated auto-send to Concur as game-changing, saving time and reducing mental load. But they also surfaced concerns that their companies would not pay for something that &quot;simply makes my life better.&quot; The value proposition needed to speak to admin and company needs, not just driver convenience.
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #6b7280', padding: '24px 32px', borderRadius: '0 12px 12px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        &quot;As an employee, I really want it to be as simple and frictionless as possible. I like the idea that I&apos;m going to be able to bring in my receipts.&quot;
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>B2B Driver</p>
                </div>
            </section>

            {/* Strategic Recommendations */}
            <section ref={recommendationsAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(recommendationsAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Recommendations
                </div>
                <h2 className="content-heading">Proposed Roadmap Adjustments</h2>

                {/* Roadmap */}
                <div style={{ display: 'flex', gap: '16px', margin: '48px 0', overflowX: 'auto', paddingBottom: '16px' }}>
                    <div style={{ flex: '1', minWidth: '160px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>Phase 1</div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Proof of Concept</h4>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>No changes needed</p>
                    </div>
                    <div style={{ flex: '1', minWidth: '160px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>Phase 2</div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>MVP</h4>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>No changes needed</p>
                    </div>
                    <div style={{ flex: '1', minWidth: '160px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>Phase 3</div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Core Foundations</h4>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>Web dashboard: Manual user upload & removal, bulk upload, connection status visibility</p>
                    </div>
                    <div style={{ flex: '1', minWidth: '160px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>Phase 4</div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Refinement</h4>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>Reminder functionality, basic usage metrics, email digest reporting</p>
                    </div>
                    <div style={{ flex: '1', minWidth: '160px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>Phase 5</div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Expansion</h4>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>HRIS, ERP, and workflow system integrations</p>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section ref={impactAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(impactAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Impact
                </div>
                <h2 className="content-heading">Outcomes & Impact</h2>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px', margin: '48px 0' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', fontWeight: 800, color: '#1f2937', lineHeight: 1, marginBottom: '8px' }}>
                            <AnimatedCounter end={4} duration={1500} />
                        </div>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Pilot signups from interviews</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', fontWeight: 800, color: '#1f2937', lineHeight: 1, marginBottom: '8px' }}>
                            <AnimatedCounter end={5} duration={1500} />
                        </div>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Phase roadmap defined</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                        <div style={{ fontSize: '36px', fontWeight: 800, color: '#1f2937', lineHeight: 1, marginBottom: '8px' }}>EU+US</div>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Leadership alignment</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', fontWeight: 800, color: '#1f2937', lineHeight: 1, marginBottom: '8px' }}>→</div>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Led to B2B Vision work</p>
                    </div>
                </div>

                {/* Stakeholder Quote */}
                <div style={{ background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.05), rgba(107, 114, 128, 0.05))', border: '1px solid rgba(31, 41, 55, 0.15)', borderRadius: '16px', padding: '40px', margin: '48px 0' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Stakeholder Reception</div>
                    <p style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', lineHeight: 1.5, marginBottom: '16px' }}>
                        &quot;I must say that I&apos;m really impressed, and I&apos;m really shocked because, honestly, I told Marcus I think one year ago that it&apos;s over, and then suddenly you just came and said we can have a Concur integration. We&apos;ll try to help you. So I&apos;m impressed. 100% impressed.&quot;
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>— Senior Stakeholder, Onsite Sprint</p>
                </div>

                <p className="content-text">
                    The final debrief was presented to senior B2B leadership across EU and US markets. It was received extremely well and was instrumental in securing additional research work—directly leading to the B2B Vision Testing initiative.
                </p>

                {/* Connection Banner */}
                <Link href="/work/arrive/vision-testing" style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px 40px', display: 'flex', alignItems: 'center', gap: '24px', margin: '48px 0', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(31, 41, 55, 0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>🔗</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>This Led To</div>
                            <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', color: '#111' }}>B2B Vision Testing & Alignment</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>The success of this work earned trust that led to the broader B2B Vision initiative—reimagining the entire self-service experience by gathering compelling priorities from customers, sales, and product leaders.</p>
                        </div>
                        <span style={{ color: '#1f2937', fontSize: '24px' }}>→</span>
                    </div>
                </Link>
            </section>

            {/* Reflection */}
            <section ref={reflectionAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(reflectionAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Reflection
                </div>
                <h2 className="content-heading">What This Project Demonstrates</h2>

                <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: 1.5, fontStyle: 'italic', marginBottom: '48px', color: '#1f2937' }}>
                    &quot;The pivot from tactical integration validation to strategic future-state vision made this project exponentially more valuable than originally scoped.&quot;
                </p>

                <p className="content-text">
                    This project demonstrates my ability to step into an ongoing initiative, absorb complex technical and market context quickly, and lead research that directly influences roadmap and executive alignment. I joined when the Concur MVP was already being built, but identified an opportunity to expand scope in a way that benefited everyone.
                </p>
                <p className="content-text">
                    The work required constant coordination—between Arrive&apos;s product and leadership teams in EU and US, and Craft&apos;s product and leadership teams—keeping both parties satisfied with quality and pace. I managed the full research arc from discussion guide design through progressive stakeholder updates to final executive debrief.
                </p>
                <p className="content-text">
                    Most importantly, this research wasn&apos;t just about validating features. It was about understanding how EasyPark needed to position itself within enterprise financial ecosystems—and that strategic clarity is what made the findings valuable enough to earn expanded scope into the B2B Vision Testing initiative.
                </p>
            </section>

            {/* Artifacts */}
            <section ref={artifactsAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(artifactsAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Artifacts
                </div>
                <h2 className="content-heading">Project Artifacts</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginTop: '40px' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Research Board</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <rect x="8" y="2" width="8" height="4" rx="1" />
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Discussion Guides</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Topline Update</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10" />
                                <line x1="12" y1="20" x2="12" y2="4" />
                                <line x1="6" y1="20" x2="6" y2="14" />
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>ELT Progress Update</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Future State Debrief</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                <polyline points="2 17 12 22 22 17" />
                                <polyline points="2 12 12 17 22 12" />
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Journey Maps</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                <line x1="12" y1="18" x2="12.01" y2="18" />
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Concept Prototypes</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Competitor Analysis</p>
                    </div>
                </div>
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
                    Next: B2B Vision Testing
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
        </PasswordProtect>
    );
}
