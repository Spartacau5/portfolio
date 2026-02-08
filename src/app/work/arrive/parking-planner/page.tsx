'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp, AnimatedCounter, AnimatedBar } from '@/app/hooks/useScrollAnimation';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import PasswordProtect from '@/app/components/PasswordProtect';

export default function ParkingPlannerMVPPage() {
    // Scroll to top on mount
    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    // Scroll animation refs - each section needs its own ref
    const challengeAnim = useScrollAnimation();
    const myRoleAnim = useScrollAnimation();
    const recruitmentAnim = useScrollAnimation();
    const sampleAnim = useScrollAnimation();
    const methodsAnim = useScrollAnimation();
    const insightsHeaderAnim = useScrollAnimation();
    const insight1Anim = useScrollAnimation();
    const insight2Anim = useScrollAnimation();
    const insight3Anim = useScrollAnimation();
    const insight4Anim = useScrollAnimation();
    const insight5Anim = useScrollAnimation();
    const recommendationsAnim = useScrollAnimation();
    const reflectionAnim = useScrollAnimation();
    const artifactsAnim = useScrollAnimation();

    return (
        <PasswordProtect password="crafty123">
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '24px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', flexShrink: 0 }}></span>
                    UX Research Case Study
                </div>
                <h1 className="case-study-title">Parking Planner MVP</h1>
                <p className="case-study-company">De-risking a product bet through rapid generative research with drivers, dispatchers, and fleet managers</p>
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
                        <p className="meta-value">6 weeks</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Figma<br />Craigslist<br />Typeform<br />Grain.ai<br />Notion</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Overview */}
                    <div className="description-block">
                        <span className="meta-label">OVERVIEW</span>
                        <p className="description-text">
                            Arrive, a global mobility and parking platform, was exploring a new product direction: a Parking Planner tool designed to help fleet-based service companies (HVAC technicians, telecom installers, appliance repair crews) plan parking ahead of time.
                        </p>
                        <p className="description-text">
                            The hypothesis was that if dispatchers could assign parking recommendations alongside job assignments, and drivers could receive those recommendations in-app, fleets would experience fewer delays, fewer tickets, and more on-time arrivals.
                        </p>
                        <p className="description-text">
                            The product team had early concepts but no direct validation from the target users. Before investing in MVP development, they needed answers to fundamental questions. This research was meant to de-risk a significant product bet before engineering resources were committed.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="case-study-cta">
                        <a
                            href="https://www.figma.com/proto/iI0FkkDfReJGaEVDbXDbZA/Craft---My-Work?page-id=0%3A1&node-id=1-146972&viewport=-7534%2C-2171%2C0.43&t=GPZYh0lhQPCA1OTP-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A146972"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button primary"
                        >
                            View Final Pitch
                        </a>
                    </div>
                </div>
            </section>

            {/* The Challenge Section */}
            <section ref={challengeAnim.ref} className="case-study-content" style={fadeInUp(challengeAnim.isVisible)}>
                <h2 className="content-heading">The Challenge</h2>

                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Key Questions
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e', lineHeight: 1 }}>01</span>
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>Does parking cause enough pain to justify a new tool?</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e', lineHeight: 1 }}>02</span>
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>Would dispatchers actually use a planner?</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e', lineHeight: 1 }}>03</span>
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>What would it take for users to trust recommendations?</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Role Section */}
            <section ref={myRoleAnim.ref} className="case-study-content" style={fadeInUp(myRoleAnim.isVisible)}>
                <h2 className="content-heading">My Role</h2>
                <p className="section-subtitle" style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px' }}>
                    Embedded UX Researcher via Craft, partnering directly with Arrive's product team
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
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Recruitment Strategy</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Designed and executed multi-channel recruitment across US, Norway, Germany</p>
                    </div>
                    <div className="role-card" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                                <path d="M11 8v6" />
                                <path d="M8 11h6" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Research Design</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Built screeners, discussion guides, and synthesis frameworks</p>
                    </div>
                    <div className="role-card" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5" />
                                <path d="m17 10.5 4-2.5v8l-4-2.5" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Interview Facilitation</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Conducted 30-minute guided interviews across 3 persona types</p>
                    </div>
                    <div className="role-card" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', transition: 'all 0.2s' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3v18h18" />
                                <path d="m19 9-5 5-4-4-3 3" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Strategic Delivery</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Led 3 stakeholder readouts and final recommendations</p>
                    </div>
                </div>

                <p className="content-text" style={{ marginTop: '40px' }}>
                    I partnered directly with Leander, a product manager based in the Netherlands who oversaw EU markets. I collaborated closely with product designers on Craft's side who were iterating on concepts in parallel, and with Arrive's regional directors who were invested in the EU market potential.
                </p>
            </section>

            {/* Recruitment Strategy Section */}
            <section ref={recruitmentAnim.ref} className="case-study-content" style={fadeInUp(recruitmentAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Approach
                </div>
                <h2 className="content-heading">Recruitment Strategy</h2>
                <p className="section-subtitle" style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
                    Finding blue-collar field service workers in 5 weeks
                </p>

                <p className="content-text">
                    The target persona was hard to reach: blue-collar field service workers who park at multiple job sites daily, report to a dispatcher or fleet manager, and work in urban environments. Traditional research panels were unlikely to have strong coverage of this population.
                </p>

                <h3 className="content-subheading" style={{ marginTop: '48px' }}>Channel Evaluation</h3>

                {/* Channel Evaluation Table - Desktop */}
                <div className="channel-eval-desktop" style={{ margin: '24px 0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb' }}>
                                <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>Channel</th>
                                <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>Pros</th>
                                <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>Cons</th>
                                <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>Decision</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', fontWeight: 600 }}>Existing B2B Contacts</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>High relevance, context-rich</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Limited pool, compliance risk</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}><span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Skip</span></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', fontWeight: 600 }}>Fleet Manager Referrals</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Warm intro, better context</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Slow, dependent on third party</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}><span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Skip</span></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', fontWeight: 600 }}>Recruitment Platforms</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Quality participants</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>3-week lead time, limited persona</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}><span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Skip</span></td>
                            </tr>
                            <tr style={{ background: 'rgba(34, 197, 94, 0.08)' }}>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', fontWeight: 600 }}>Craigslist</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Fast, cheap, proven for persona</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Manual screening needed</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}><span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }}>Selected</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Channel Evaluation - Mobile stacked cards */}
                <div className="channel-eval-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>Existing B2B Contacts</span>
                            <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Skip</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
                            <span style={{ color: '#16a34a' }}>+</span> High relevance, context-rich<br/>
                            <span style={{ color: '#ef4444' }}>−</span> Limited pool, compliance risk
                        </div>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>Fleet Manager Referrals</span>
                            <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Skip</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
                            <span style={{ color: '#16a34a' }}>+</span> Warm intro, better context<br/>
                            <span style={{ color: '#ef4444' }}>−</span> Slow, dependent on third party
                        </div>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>Recruitment Platforms</span>
                            <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Skip</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
                            <span style={{ color: '#16a34a' }}>+</span> Quality participants<br/>
                            <span style={{ color: '#ef4444' }}>−</span> 3-week lead time, limited persona
                        </div>
                    </div>
                    <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '2px solid #22c55e', borderRadius: '12px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>Craigslist</span>
                            <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }}>Selected</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
                            <span style={{ color: '#16a34a' }}>+</span> Fast, cheap, proven for persona<br/>
                            <span style={{ color: '#ef4444' }}>−</span> Manual screening needed
                        </div>
                    </div>
                </div>

                {/* Callout */}
                <div style={{ padding: '24px 0', margin: '32px 0' }}>
                    <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: 1.7, fontStyle: 'italic' }}>
                        Previous Craft researchers had found success recruiting blue-collar drivers via Craigslist. Given the 5-week timeline, this was the right tradeoff between speed, cost, and targeting precision.
                    </p>
                </div>

                <h3 className="content-subheading" style={{ marginTop: '48px' }}>Execution</h3>

                <div className="recruitment-grid" style={{ display: 'grid', gap: '40px', marginTop: '24px' }}>
                    <div>
                        <img
                            src="/images/craigslist.png"
                            alt="Craigslist Campaign Posts"
                            style={{ width: '100%', borderRadius: '12px' }}
                        />
                        <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '16px' }}>
                            Posted targeted ads across 10 US cities: NYC, Boston, Chicago, LA, SF, Miami, Seattle, Houston, Philadelphia, Phoenix
                        </p>
                        <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '8px' }}>
                            Limitation: Craigslist had no meaningful reach in Germany or Norway, so recruitment was US-only. This geographic constraint is a caveat on the findings.
                        </p>
                    </div>

                    {/* Funnel */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '40px 20px' }}>
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', textAlign: 'center', width: '100%', minWidth: '180px' }}>
                            <div style={{ fontSize: '24px', fontWeight: 700 }}><AnimatedCounter end={250} duration={2000} suffix="+" /></div>
                            <div style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>Typeform responses</div>
                        </div>
                        <div style={{ fontSize: '20px', color: '#9ca3af' }}>↓</div>
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', textAlign: 'center', width: '85%', minWidth: '160px' }}>
                            <div style={{ fontSize: '24px', fontWeight: 700 }}><AnimatedCounter end={50} duration={1800} suffix="+" /></div>
                            <div style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>Met filter criteria</div>
                        </div>
                        <div style={{ fontSize: '20px', color: '#9ca3af' }}>↓</div>
                        <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '2px solid #22c55e', padding: '16px 24px', borderRadius: '8px', textAlign: 'center', width: '70%', minWidth: '140px' }}>
                            <div style={{ fontSize: '24px', fontWeight: 700, color: '#16a34a' }}><AnimatedCounter end={30} duration={1600} suffix="+" /></div>
                            <div style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>Completed Screeners</div>
                        </div>
                    </div>
                </div>

                {/* Typeform Screener Image */}
                <div style={{ margin: '32px 0' }}>
                    <img
                        src="/images/typeform.png"
                        alt="Typeform Screener Questions & Responses"
                        style={{ width: '100%', borderRadius: '12px' }}
                    />
                </div>

                <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '16px' }}>
                    Designed a Typeform Screener Survey to only target relevant personas
                </p>
            </section>

            {/* Sample Section */}
            <section ref={sampleAnim.ref} className="case-study-content" style={fadeInUp(sampleAnim.isVisible)}>
                <h2 className="content-heading">Who We Interviewed</h2>

                {/* Persona Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '48px', marginBottom: '48px' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', textAlign: 'center', ...fadeInUp(sampleAnim.isVisible, 0.1) }}>
                        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1, marginBottom: '8px', color: '#1f2937' }}>
                            <AnimatedCounter end={9} duration={1500} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Drivers</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Field technicians who park and complete service jobs</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', textAlign: 'center', ...fadeInUp(sampleAnim.isVisible, 0.2) }}>
                        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1, marginBottom: '8px', color: '#1f2937' }}>
                            <AnimatedCounter end={5} duration={1500} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Dispatchers</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Responsible for routing and scheduling</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', textAlign: 'center', ...fadeInUp(sampleAnim.isVisible, 0.3) }}>
                        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1, marginBottom: '8px', color: '#1f2937' }}>
                            <AnimatedCounter end={5} duration={1500} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Fleet Managers</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>Strategic decisions about fleet operations</p>
                    </div>
                </div>

                {/* Fleet Size Bars */}
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>Fleet Size</h3>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <span style={{ width: '200px', fontSize: '14px', color: '#4b5563' }}>Small (1-50 vehicles)</span>
                        <div style={{ flex: 1, height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                            <AnimatedBar width="79%" delay={0} />
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '14px' }}>15</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <span style={{ width: '200px', fontSize: '14px', color: '#4b5563' }}>Medium (51-500 vehicles)</span>
                        <div style={{ flex: 1, height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                            <AnimatedBar width="11%" delay={200} />
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '14px' }}>2</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <span style={{ width: '200px', fontSize: '14px', color: '#4b5563' }}>Large (501+ vehicles)</span>
                        <div style={{ flex: 1, height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                            <AnimatedBar width="11%" delay={400} />
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '14px' }}>2</span>
                    </div>
                </div>

                <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '16px' }}>
                    Deliberate oversampling of small fleets where product team believed the opportunity was largest
                </p>
            </section>

            {/* Methods Section */}
            <section ref={methodsAnim.ref} className="case-study-content" style={fadeInUp(methodsAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Methods
                </div>
                <h2 className="content-heading">Research Approach</h2>

                <p className="content-text">
                    I used semi-structured interviews combining workflow discovery and concept evaluation. Each session followed a consistent structure, with discussion guides iterated between rounds based on emerging patterns.
                </p>

                <h3 className="content-subheading" style={{ marginTop: '48px' }}>What We Tested</h3>

                {/* TODO: Add detailed feature lists per concept matching deck visuals (Parking Guidance features, Job Planner features, Parking Intelligence features) */}

                {/* Concept 1: Parking Planner (Drivers) */}
                <div style={{ margin: '40px 0 60px 0' }}>
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '16px', width: '100%' }}
                        height="500"
                        src="https://embed.figma.com/proto/iI0FkkDfReJGaEVDbXDbZA/Craft---My-Work?page-id=0%3A1&node-id=1-96793&viewport=-7534%2C-2171%2C0.43&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A96793&show-proto-sidebar=1&embed-host=share&scaling=scale-down"
                        allowFullScreen
                    />
                    <h4 style={{ fontSize: '20px', fontWeight: 600, marginTop: '20px', marginBottom: '8px' }}>Parking Planner (Drivers)</h4>
                    <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.6 }}>Recommended parking per job, in-app navigation, availability data, distance and cost tradeoffs</p>
                </div>

                {/* Concept 2: Parking Planner + Intelligence (Dispatchers) */}
                <div style={{ margin: '60px 0 40px 0' }}>
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '16px', width: '100%' }}
                        height="500"
                        src="https://embed.figma.com/proto/iI0FkkDfReJGaEVDbXDbZA/Craft---My-Work?page-id=0%3A1&node-id=1-94135&viewport=-23896%2C-13072%2C0.36&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A94135&show-proto-sidebar=1&embed-host=share&scaling=scale-down-width"
                        allowFullScreen
                    />
                    <h4 style={{ fontSize: '20px', fontWeight: 600, marginTop: '20px', marginBottom: '8px' }}>Parking Planner + Intelligence (Dispatchers)</h4>
                    <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.6 }}>Job-level recommendations, aggregate metrics, congestion patterns, cost trends</p>
                </div>

                <h3 className="content-subheading" style={{ marginTop: '48px' }}>Synthesis Process</h3>

                {/* Process Flow */}
                <div className="synthesis-flow" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', margin: '48px 0', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 120px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Live observation notes</div>
                    <span className="flow-arrow" style={{ color: '#9ca3af', fontSize: '20px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>→</span>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 120px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Clustered by theme</div>
                    <span className="flow-arrow" style={{ color: '#9ca3af', fontSize: '20px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>→</span>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 120px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cross-persona patterns</div>
                    <span className="flow-arrow" style={{ color: '#9ca3af', fontSize: '20px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>→</span>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', flex: '1 1 120px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Strategic framework</div>
                </div>

                {/* Research Brainspace Image */}
                <div style={{ margin: '32px 0' }}>
                    <img
                        src="/images/sharedspace.png"
                        alt="Research Brainspace (FigJam)"
                        style={{ width: '100%', borderRadius: '16px' }}
                    />
                    <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '16px' }}>
                        Shared research brainspace where internal Craft team members and external Arrive stakeholders could observe sessions and contribute notes in real time
                    </p>
                </div>
            </section>

            {/* TODO: Add core needs section for Driver/Dispatcher/Fleet Manager with persona-specific quotes from deck */}

            {/* Key Insights Header */}
            <section ref={insightsHeaderAnim.ref} className="case-study-content" style={{ paddingBottom: '0', ...fadeInUp(insightsHeaderAnim.isVisible) }}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Findings
                </div>
                <h2 className="content-heading">Key Insights</h2>
            </section>

            {/* Insight 1 */}
            <section ref={insight1Anim.ref} className="case-study-content insight-section" style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '40px', ...fadeInUp(insight1Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '16px' }}>01</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Parking is a real problem, but not the only problem</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Service drivers confirmed that finding parking near urban job sites is a consistent friction point. They described circling blocks, double-parking, feeding meters, and absorbing tickets as a cost of doing business. But parking existed within a broader context of fragmented workflows. Drivers were juggling Google Maps, SpotHero, Jobber, text messages, and phone calls. The desire was not just for parking help but for a single tool that handled routing, timing, parking, and client communication together.
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #22c55e', padding: '24px 32px', borderRadius: '0 12px 12px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', fontSynthesis: 'none', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        "I was waiting 20 minutes, then parking really far and having to walk with my technician & our equipment. It was really bad. So a 7:30am - 3:30pm day, we went back to the branch to exchange our vehicles and leave and it was 7:45 pm."
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Service Driver, Medium Fleet</p>
                </div>
            </section>

            {/* Insight 2 */}
            <section ref={insight2Anim.ref} className="case-study-content insight-section" style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '40px', ...fadeInUp(insight2Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '16px' }}>02</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Technical maturity predicts needs more than fleet size</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    The initial assumption was that fleet size would be the primary segmentation variable. Small fleets would have different needs than large fleets. This turned out to be incomplete. What actually predicted needs was technical maturity: how sophisticated a fleet's existing tooling was. Low-maturity fleets (using spreadsheets, Google Calendar, paper logs) had fundamentally different needs than high-maturity fleets (using Ignite, Fleetio, Samsara). A 30-vehicle fleet with no dedicated tools looked nothing like a 30-vehicle fleet with a full tech stack.
                </p>

                {/* Maturity Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '48px 0' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#f97316', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', color: '#f97316' }}>Low-Tech Maturity</div>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>Google Calendar, paper logs, spreadsheets</p>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>7 participants</p>
                        <p style={{ fontSize: '16px', fontWeight: 600 }}>Need: Full workflow tool</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#eab308', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', color: '#eab308' }}>Medium-Tech Maturity</div>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>One core tool (Jobber, ServiceTitan)</p>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>5 participants</p>
                        <p style={{ fontSize: '16px', fontWeight: 600 }}>Need: Parking guidance layer</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '32px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#22c55e', borderRadius: '16px 16px 0 0' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', color: '#22c55e' }}>High-Tech Maturity</div>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>Full tech stack (Ignite + Fleetio + Samsara)</p>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>7 participants</p>
                        <p style={{ fontSize: '16px', fontWeight: 600 }}>Need: Data enrichment only</p>
                    </div>
                </div>

                {/* Callout */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #22c55e', padding: '24px 32px', margin: '32px 0', borderRadius: '0 12px 12px 0' }}>
                    <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.7 }}>
                        This reframe changed the conversation from "how do we build this planner" to "who would actually use it, and in what form."
                    </p>
                </div>
            </section>

            {/* Insight 3 */}
            <section ref={insight3Anim.ref} className="case-study-content insight-section" style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '40px', ...fadeInUp(insight3Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '16px' }}>03</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Drivers carry the parking decision, regardless of planning</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Even when dispatchers attempted to plan parking in advance, the final responsibility landed on the driver. Dispatchers might suggest options or provide general guidance, but when the driver arrived at a job site and the recommended spot was taken, they had to figure it out themselves. This meant the driver experience was critical, but it also meant that a dispatcher-facing planner alone would not solve the problem.
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #22c55e', padding: '24px 32px', borderRadius: '0 12px 12px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', fontSynthesis: 'none', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        "One guy's got to go out and find the parking because they couldn't park anywhere at the job site. So that's all on them. They're big boys and girls out there. They can figure that out."
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Dispatcher, High-Tech Maturity, Small Fleet</p>
                </div>
            </section>

            {/* Insight 4 */}
            <section ref={insight4Anim.ref} className="case-study-content insight-section" style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '40px', ...fadeInUp(insight4Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '16px' }}>04</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Accuracy expectations varied by timing</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Users did not expect perfect accuracy for parking availability data, but they did expect accuracy to increase closer to the moment of parking. Trend-based data ("this area is typically 60% available at 10am") was seen as useful for planning. But if a driver was five minutes away from a job site, they expected near-real-time information or they would fall back to tools they already trusted, like SpotHero.
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', borderLeft: '4px solid #22c55e', padding: '24px 32px', borderRadius: '0 12px 12px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', fontSynthesis: 'none', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        "[If it's not accurate in real-time], I think it's adding value. I think the question is whether it's adding enough value. If I was in a bind and I was worried about parking and I didn't have any alternative options, I would give it a try. But if I didn't know it was completely accurate and I was in a rush, I'd probably use SpotHero."
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Service Driver</p>
                </div>
            </section>

            {/* Insight 5 */}
            <section ref={insight5Anim.ref} className="case-study-content insight-section" style={{ paddingTop: '40px', ...fadeInUp(insight5Anim.isVisible) }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '16px' }}>05</div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>There is likely no product-market fit for a parking planner alone</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    The research pointed toward a clear conclusion: a standalone Parking Planner was unlikely to achieve adoption. For low-maturity fleets, parking recommendations were only valuable bundled with job planning functionality. For medium and high-maturity fleets, the concept was only compelling as a data enrichment layer within their existing tools. This was not a failure of the concept but a clarification of where it could and could not fit.
                </p>

                <h4 style={{ fontSize: '18px', margin: '48px 0 24px' }}>Product-Market Fit Matrix</h4>

                {/* PMF Matrix - Desktop table */}
                <div className="pmf-matrix-desktop" style={{ margin: '48px 0' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)', background: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                            <div style={{ padding: '20px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280' }}></div>
                            <div style={{ padding: '20px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', textAlign: 'center' }}>Driver</div>
                            <div style={{ padding: '20px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', textAlign: 'center' }}>Dispatcher</div>
                            <div style={{ padding: '20px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', textAlign: 'center' }}>Fleet Manager</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb' }}>
                            <div style={{ padding: '24px 20px', fontSize: '14px', fontWeight: 600, background: '#f3f4f6', display: 'flex', alignItems: 'center' }}>Low-Tech</div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span></div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: '#22c55e', color: '#fff' }}>Job Planner</span></div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' }}>Intelligence</span></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb' }}>
                            <div style={{ padding: '24px 20px', fontSize: '14px', fontWeight: 600, background: '#f3f4f6', display: 'flex', alignItems: 'center' }}>Medium-Tech</div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span></div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span></div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' }}>Intelligence</span></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)' }}>
                            <div style={{ padding: '24px 20px', fontSize: '14px', fontWeight: 600, background: '#f3f4f6', display: 'flex', alignItems: 'center' }}>High-Tech</div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span></div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span></div>
                            <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' }}>Intelligence</span></div>
                        </div>
                    </div>
                </div>

                {/* PMF Matrix - Mobile stacked cards */}
                <div className="pmf-matrix-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '48px 0' }}>
                    {/* Low-Tech */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Low-Tech</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Driver</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Dispatcher</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: '#22c55e', color: '#fff' }}>Job Planner</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Fleet Manager</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' }}>Intelligence</span>
                            </div>
                        </div>
                    </div>
                    {/* Medium-Tech */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Medium-Tech</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Driver</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Dispatcher</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Fleet Manager</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' }}>Intelligence</span>
                            </div>
                        </div>
                    </div>
                    {/* High-Tech */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>High-Tech</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Driver</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Dispatcher</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(31, 41, 55, 0.1)', color: '#1f2937' }}>Parking Guidance</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Fleet Manager</span>
                                <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' }}>Intelligence</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', textAlign: 'center' }}>
                    Dark = Arrive standalone tool &nbsp;|&nbsp; Gray = Data enrichment into existing systems &nbsp;|&nbsp; Highlighted = Primary opportunity
                </p>
            </section>

            {/* Strategic Recommendations */}
            <section ref={recommendationsAnim.ref} className="case-study-content" style={fadeInUp(recommendationsAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Recommendations
                </div>
                <h2 className="content-heading">Strategic Paths Forward</h2>

                {/* Strategy Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', margin: '48px 0' }}>
                    {/* Path A */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#22c55e' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: '#16a34a' }}>Path A</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Low-Tech Maturity Focus</h3>
                        <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.7, marginBottom: '24px' }}>
                            Build a lightweight job planner with integrated parking intelligence. Target fleets that haven't adopted dedicated scheduling software, positioning as a full workflow tool.
                        </p>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#16a34a' }}>1</span>
                                <span>Survey fleets to size low-tech maturity opportunity</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#16a34a' }}>2</span>
                                <span>Validate willingness to pay</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#16a34a' }}>3</span>
                                <span>Supplement with EU interviews</span>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(234, 179, 8, 0.08)', borderLeft: '3px solid #eab308', padding: '16px 20px', borderRadius: '0 8px 8px 0', fontSize: '13px', color: '#6b7280' }}>
                            <strong style={{ color: '#ca8a04' }}>Risk:</strong> Response rates may limit ability to size the opportunity accurately
                        </div>
                    </div>

                    {/* Path B */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#22c55e' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: '#16a34a' }}>Path B</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Med/High-Tech Maturity Focus</h3>
                        <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.7, marginBottom: '24px' }}>
                            Browser-based plugin that enhances existing tools like Jobber with contextual parking suggestions. No workflow change required for users.
                        </p>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#16a34a' }}>1</span>
                                <span>Assess technical feasibility of plugin</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#16a34a' }}>2</span>
                                <span>Identify lightweight integration paths</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#16a34a' }}>3</span>
                                <span>Explore data enrichment partnerships</span>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(234, 179, 8, 0.08)', borderLeft: '3px solid #eab308', padding: '16px 20px', borderRadius: '0 8px 8px 0', fontSize: '13px', color: '#6b7280' }}>
                            <strong style={{ color: '#ca8a04' }}>Risk:</strong> Integration complexity may delay development or limit usefulness
                        </div>
                    </div>
                </div>

                {/* Outcome Box */}
                <div style={{ background: 'rgba(34, 197, 94, 0.05)', border: '2px solid #22c55e', borderRadius: '16px', padding: '32px 40px', marginTop: '48px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Outcome</div>
                    <p style={{ fontSize: '17px', color: '#1f2937', lineHeight: 1.7 }}>
                        The product team chose to pause MVP development pending further opportunity sizing. Rather than build a parking planner that lacked clear product-market fit, they redirected effort toward validating the low-maturity fleet hypothesis with quantitative research and exploring integration feasibility for the enrichment model.
                    </p>
                </div>
            </section>

            {/* Reflection */}
            <section ref={reflectionAnim.ref} className="case-study-content" style={fadeInUp(reflectionAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Reflection
                </div>

                <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: 1.5, fontStyle: 'italic', fontSynthesis: 'none', marginBottom: '48px', color: '#1f2937' }}>
                    "The most valuable contribution was the reframe around technical maturity. That shift changed the conversation from 'how do we build this planner' to 'who would actually use it, and in what form.'"
                </p>

                <p className="content-text">
                    This project was an exercise in navigating through compressed, ambiguous engagements where the goal is not to polish a feature but to answer higher-level strategic questions. I was responsible for the full research arc, from recruitment logistics to stakeholder alignment to final recommendations, and I had to make continuous judgment calls about tradeoffs between speed and rigor.
                </p>
                <p className="content-text">
                    The recruitment approach was unconventional. Craigslist is not a typical research channel, but it was the right tool for this persona and timeline. I documented risks, built in screener calls to validate quality, and was transparent about geographic limitations in the final findings.
                </p>
                <p className="content-text">
                    This is the kind of research I find most interesting: work that sits at the intersection of product strategy and user understanding, where the output is not a design recommendation but a clearer picture of where opportunity exists and where it does not.
                </p>
            </section>

            {/* Artifacts */}
            <section ref={artifactsAnim.ref} className="case-study-content" style={fadeInUp(artifactsAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Artifacts
                </div>
                <h2 className="content-heading">Project Artifacts</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginTop: '40px' }}>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <line x1="3" y1="9" x2="21" y2="9"/>
                                <line x1="3" y1="15" x2="21" y2="15"/>
                                <line x1="9" y1="3" x2="9" y2="21"/>
                                <line x1="15" y1="3" x2="15" y2="21"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Recruitment Strategy Matrix</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                <rect x="8" y="2" width="8" height="4" rx="1"/>
                                <line x1="8" y1="10" x2="16" y2="10"/>
                                <line x1="8" y1="14" x2="16" y2="14"/>
                                <line x1="8" y1="18" x2="12" y2="18"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Typeform Screener</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8a3 3 0 0 0-3-3H8l-4 4v3a3 3 0 0 0 3 3h1l2 5 2-5h3a3 3 0 0 0 3-3V8z"/>
                                <line x1="18" y1="8" x2="22" y2="4"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Craigslist Campaign</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 17h14v2H5z"/>
                                <path d="M6 17V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>
                                <circle cx="7.5" cy="17" r="2.5"/>
                                <circle cx="16.5" cy="17" r="2.5"/>
                                <path d="M5 11h1"/>
                                <path d="M18 11h1"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Driver Discussion Guide</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                                <path d="M4 11a8 8 0 0 0 16 0"/>
                                <path d="M12 19v3"/>
                                <path d="M8 22h8"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Dispatcher Discussion Guide</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="9"/>
                                <path d="M12 3c-1 2-2 4-2 6s1 4 2 6c1-2 2-4 2-6s-1-4-2-6z"/>
                                <path d="M3 12c2-1 4-2 6-2s4 1 6 2c-2 1-4 2-6 2s-4-1-6-2z"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Research Brainspace</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                <line x1="8" y1="11" x2="14" y2="11"/>
                                <line x1="11" y1="8" x2="11" y2="14"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Synthesis Framework</p>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                                <polyline points="7 10 10 7 13 11 17 7"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Stakeholder Presentations</p>
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
                <Link href="/work/arrive/expense-management" className="back-link">
                    Next: Expense Management Case Study
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
