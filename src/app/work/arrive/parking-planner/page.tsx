'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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

    // Lightbox state with gallery support
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const [lightboxGallery, setLightboxGallery] = useState<string[]>([]);
    const [showFeatureList, setShowFeatureList] = useState(false);
    const [showMarketFit, setShowMarketFit] = useState(false);
    const featureWrapRef = useRef<HTMLDivElement>(null);
    const marketWrapRef = useRef<HTMLDivElement>(null);

    // Parking Plugin (Med/High Tech) hover states
    const [showFeatureListPlugin, setShowFeatureListPlugin] = useState(false);
    const [showMarketFitPlugin, setShowMarketFitPlugin] = useState(false);
    const featureWrapRefPlugin = useRef<HTMLDivElement>(null);
    const marketWrapRefPlugin = useRef<HTMLDivElement>(null);

    // Metrics and Insights hover states
    const [showMarketFitMetrics, setShowMarketFitMetrics] = useState(false);
    const marketWrapRefMetrics = useRef<HTMLDivElement>(null);

    // Driver App Enhancements hover states
    const [showFeatureListDriver, setShowFeatureListDriver] = useState(false);
    const [showMarketFitDriver, setShowMarketFitDriver] = useState(false);
    const featureWrapRefDriver = useRef<HTMLDivElement>(null);
    const marketWrapRefDriver = useRef<HTMLDivElement>(null);

    // Close popups on outside tap (mobile)
    useEffect(() => {
        const handleTouch = (e: TouchEvent) => {
            if (showFeatureList && featureWrapRef.current && !featureWrapRef.current.contains(e.target as Node)) {
                setShowFeatureList(false);
            }
            if (showMarketFit && marketWrapRef.current && !marketWrapRef.current.contains(e.target as Node)) {
                setShowMarketFit(false);
            }
            if (showFeatureListPlugin && featureWrapRefPlugin.current && !featureWrapRefPlugin.current.contains(e.target as Node)) {
                setShowFeatureListPlugin(false);
            }
            if (showMarketFitPlugin && marketWrapRefPlugin.current && !marketWrapRefPlugin.current.contains(e.target as Node)) {
                setShowMarketFitPlugin(false);
            }
            if (showMarketFitMetrics && marketWrapRefMetrics.current && !marketWrapRefMetrics.current.contains(e.target as Node)) {
                setShowMarketFitMetrics(false);
            }
            if (showFeatureListDriver && featureWrapRefDriver.current && !featureWrapRefDriver.current.contains(e.target as Node)) {
                setShowFeatureListDriver(false);
            }
            if (showMarketFitDriver && marketWrapRefDriver.current && !marketWrapRefDriver.current.contains(e.target as Node)) {
                setShowMarketFitDriver(false);
            }
        };
        document.addEventListener('touchstart', handleTouch);
        return () => document.removeEventListener('touchstart', handleTouch);
    }, [showFeatureList, showMarketFit, showFeatureListPlugin, showMarketFitPlugin, showMarketFitMetrics, showFeatureListDriver, showMarketFitDriver]);
    const closeLightbox = useCallback(() => { setLightboxSrc(null); setLightboxGallery([]); }, []);

    const openLightbox = useCallback((src: string, gallery?: string[]) => {
        setLightboxSrc(src);
        setLightboxGallery(gallery || []);
    }, []);

    const lightboxIndex = lightboxGallery.length > 0 && lightboxSrc ? lightboxGallery.indexOf(lightboxSrc) : -1;
    const goNext = useCallback(() => {
        if (lightboxGallery.length > 0 && lightboxIndex < lightboxGallery.length - 1) {
            setLightboxSrc(lightboxGallery[lightboxIndex + 1]);
        }
    }, [lightboxGallery, lightboxIndex]);
    const goPrev = useCallback(() => {
        if (lightboxGallery.length > 0 && lightboxIndex > 0) {
            setLightboxSrc(lightboxGallery[lightboxIndex - 1]);
        }
    }, [lightboxGallery, lightboxIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (!lightboxSrc) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxSrc, closeLightbox, goNext, goPrev]);

    // Scroll animation refs - each section needs its own ref
    const challengeAnim = useScrollAnimation();
    const myRoleAnim = useScrollAnimation();
    const recruitmentAnim = useScrollAnimation();
    const sampleAnim = useScrollAnimation();
    const methodsAnim = useScrollAnimation();
    const insightsHeaderAnim = useScrollAnimation();
    const insight1Anim = useScrollAnimation();
    const conceptVideoAnim = useScrollAnimation();
    const insight2Anim = useScrollAnimation();
    const conceptPluginAnim = useScrollAnimation();
    const conceptMetricsAnim = useScrollAnimation();
    const insight3Anim = useScrollAnimation();
    const conceptDriverAnim = useScrollAnimation();
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
                <h1 className="case-study-title">Parking Planner MVP</h1>
                <p className="case-study-company">Rapid research to validate a product expansion into a new user segment</p>
            </section>

            {/* Dispatcher + Driver Video Preview */}
            <div className="pp-video-preview" style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '2rem',
                padding: '3rem',
                background: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #e5e7eb',
                margin: '1rem auto 2rem',
                maxWidth: '870px'
            }}>
                <video
                    className="pp-dispatcher-video"
                    src="/images/dispatcher.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        width: '65%',
                        maxWidth: '550px',
                        borderRadius: '24px',
                        border: '8px solid #000000',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)'
                    }}
                />
                <video
                    className="pp-driver-video"
                    src="/images/driver-mvp.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        width: '24.2%',
                        maxWidth: '200px',
                        borderRadius: '12px',
                        borderRight: '2px solid #000000',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)'
                    }}
                />
            </div>

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

                    {/* Methods */}
                    <div className="meta-block">
                        <span className="meta-label">METHODS</span>
                        <p className="meta-value">User interviews, concept testing</p>
                    </div>

                    {/* Scope */}
                    <div className="meta-block">
                        <span className="meta-label">SCOPE</span>
                        <p className="meta-value">US + EU fleets</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <div className="pp-tools-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', justifyContent: 'start', gap: '12px 16px', marginTop: '8px' }}>
                            <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className="tool-icon-link">
                                <Image src="/images/figma-logo.svg" alt="Figma" width={100} height={28} style={{ height: '24px', width: 'auto' }} />
                                <span className="tool-tooltip">Figma</span>
                            </a>
                            <a href="https://www.notion.so/" target="_blank" rel="noopener noreferrer" className="tool-icon-link">
                                <Image src="/images/notion-logo.svg" alt="Notion" width={100} height={28} style={{ height: '24px', width: 'auto' }} />
                                <span className="tool-tooltip">Notion</span>
                            </a>
                            <a href="https://www.typeform.com/" target="_blank" rel="noopener noreferrer" className="tool-icon-link">
                                <Image src="/images/typeform-icon.svg" alt="Typeform" width={28} height={28} style={{ height: '22px', width: 'auto' }} />
                                <span className="tool-tooltip">Typeform</span>
                            </a>
                            <a href="https://grain.com/" target="_blank" rel="noopener noreferrer" className="tool-icon-link">
                                <Image src="/images/grain-icon.svg" alt="Grain" width={28} height={28} style={{ height: '22px', width: 'auto' }} />
                                <span className="tool-tooltip">Grain</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Overview */}
                    <div className="description-block">
                        <span className="meta-label">OVERVIEW</span>
                        <p className="description-text">
                            Arrive, a global mobility and parking platform, was exploring a new product direction: a Parking Planner to help fleet-based service companies (HVAC technicians, telecom installers, appliance repair crews) plan parking ahead of time.
                        </p>
                        <p className="description-text">
                            The hypothesis: if dispatchers could assign parking recommendations alongside jobs, and drivers received them in-app, fleets would see fewer delays, fewer tickets, and more on-time arrivals.
                        </p>
                        <p className="description-text">
                            The product team had early concepts but no direct validation from the target users. Before committing engineering resources, they needed answers to fundamental questions.
                        </p>
                    </div>

                    {/* What I Did */}
                    <div className="description-block">
                        <span className="meta-label">WHAT I DID</span>
                        <p className="description-text" style={{ fontWeight: 600 }}>
                            Lead the end-to-end research to inform a build or no-build decision.
                        </p>
                        <p className="description-text" style={{ marginTop: '0.5rem' }}>
                            I was responsible for recruitment strategy, screener design, conducting all 19 interviews, synthesis, and presenting strategic recommendations to Arrive's leadership.
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
                            See Final Presentation
                        </a>
                    </div>
                </div>
            </section>

            {/* Research Questions Section */}
            <section ref={challengeAnim.ref} className="case-study-content" style={fadeInUp(challengeAnim.isVisible)}>
                <h2 className="content-heading">Research Questions</h2>

                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="rq-row" style={{ display: 'flex', alignItems: 'baseline', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#6b7280', lineHeight: 1.4 }}>01</span>
                            <span className="rq-text" style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>Does parking cause enough pain to justify a new tool?</span>
                        </div>
                        <div className="rq-row" style={{ display: 'flex', alignItems: 'baseline', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#6b7280', lineHeight: 1.4 }}>02</span>
                            <span className="rq-text" style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>Would dispatchers actually use a planner?</span>
                        </div>
                        <div className="rq-row" style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
                            <span style={{ fontSize: '24px', fontWeight: 700, color: '#6b7280', lineHeight: 1.4 }}>03</span>
                            <span className="rq-text" style={{ fontSize: '20px', fontWeight: 400, color: '#1f2937', lineHeight: 1.4 }}>What would it take for users to trust recommendations?</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Process Section */}
            <section ref={myRoleAnim.ref} className="case-study-content" style={fadeInUp(myRoleAnim.isVisible)}>
                <h2 className="content-heading">Research Process</h2>

                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px 32px' }}>
                    {/* Timeline */}
                    <div className="research-timeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', position: 'relative' }}>
                        {/* Connecting line */}
                        <div className="timeline-connector" style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', height: '2px', background: '#e5e7eb', zIndex: 0 }} />

                        {/* Phase 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #16a34a', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#16a34a', marginBottom: '6px' }}>1</div>
                            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>Recruit</h3>
                            <span style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>Week 1–2</span>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, padding: '0 8px', margin: 0, paddingBottom: '16px' }}>Screener design, Craigslist outreach across 10 US cities, 250+ responses filtered</p>
                        </div>

                        {/* Phase 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #16a34a', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#16a34a', marginBottom: '6px' }}>2</div>
                            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>Interview</h3>
                            <span style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>Week 2–4</span>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, padding: '0 8px', margin: 0 }}>19 interviews across drivers, dispatchers, and fleet managers</p>
                        </div>

                        {/* Phase 3 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #16a34a', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#16a34a', marginBottom: '6px' }}>3</div>
                            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>Synthesize</h3>
                            <span style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>Week 4–5</span>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, padding: '0 8px', margin: 0 }}>Clustered findings by persona, built technical maturity framework</p>
                        </div>

                        {/* Phase 4 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #16a34a', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#16a34a', marginBottom: '6px' }}>4</div>
                            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>Recommend</h3>
                            <span style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>Week 6</span>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, padding: '0 8px', margin: 0 }}>Final readout with two strategic paths forward</p>
                        </div>
                    </div>
                </div>

                <p className="content-text" style={{ marginTop: '40px' }}>
                    I partnered directly with a product manager from Netherlands who was leading this initiative in the EU. I also collaborated closely with regional directors from Arrive who were invested in this MVP's potential, apart from internally working with designers from Craft to rapidly update testing concepts.
                </p>
            </section>

            {/* Recruitment Strategy Section */}
            <section ref={recruitmentAnim.ref} className="case-study-content" style={fadeInUp(recruitmentAnim.isVisible)}>
                <h2 className="content-heading">Recruitment Strategy</h2>
                <p className="section-subtitle" style={{ fontSize: '18px', color: '#6b7280', marginBottom: '16px' }}>
                    Challenge: Finding blue-collar field service workers in 5 weeks
                </p>

                <p className="content-text" style={{ marginBottom: '24px' }}>
                    The target persona was hard to reach, blue-collar field service workers who park at multiple job sites daily, report to a dispatcher or fleet manager, and work in urban environments. Traditional research panels were unlikely to have strong coverage of this population.
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
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}><span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}>Skip</span></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', fontWeight: 600 }}>Fleet Manager Referrals</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Warm intro, better context</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Slow, dependent on third party</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}><span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}>Skip</span></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', fontWeight: 600 }}>Recruitment Platforms</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>Quality participants</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '14px' }}>3-week lead time, limited persona</td>
                                <td style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}><span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}>Skip</span></td>
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
                            <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}>Skip</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
                            <span style={{ color: '#16a34a' }}>+</span> High relevance, context-rich<br/>
                            <span style={{ color: '#ef4444' }}>−</span> Limited pool, compliance risk
                        </div>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>Fleet Manager Referrals</span>
                            <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}>Skip</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
                            <span style={{ color: '#16a34a' }}>+</span> Warm intro, better context<br/>
                            <span style={{ color: '#ef4444' }}>−</span> Slow, dependent on third party
                        </div>
                    </div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>Recruitment Platforms</span>
                            <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}>Skip</span>
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
                <div style={{ padding: '12px 0', margin: '8px 0' }}>
                    <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: 1.7, fontStyle: 'italic' }}>
                        Note — Previous Craft researchers had found success recruiting blue-collar drivers via Craigslist. Given the 5-week timeline, this was the right tradeoff between speed, cost, and targeting precision.
                    </p>
                </div>

                <h3 className="content-subheading" style={{ marginTop: '48px' }}>Execution</h3>

                <div className="recruitment-grid" style={{ display: 'grid', gap: '40px', marginTop: '24px' }}>
                    <div>
                        <img
                            src="/images/craigslist.png"
                            alt="Craigslist Campaign Posts"
                            style={{ width: '100%', borderRadius: '12px', cursor: 'zoom-in' }}
                            onClick={() => setLightboxSrc('/images/craigslist.png')}
                        />
                        <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '6px' }}>
                            Posted targeted ads across 10 US cities: NYC, Boston, Chicago, LA, SF, Miami, Seattle, Houston, Philadelphia, Phoenix
                        </p>
                        <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '8px' }}>
                            Limitation: Craigslist had no meaningful reach in Germany or Norway, so recruitment was US-only. This geographic constraint is a caveat on the findings.
                        </p>
                    </div>

                    {/* Funnel */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '0 20px' }}>
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
                <div style={{ marginTop: '32px' }}>
                    <img
                        src="/images/typeform.png"
                        alt="Typeform Screener Questions & Responses"
                        style={{ width: '100%', borderRadius: '12px', cursor: 'zoom-in' }}
                        onClick={() => setLightboxSrc('/images/typeform.png')}
                    />
                </div>

                <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '6px' }}>
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
                <h2 className="content-heading">What We Tested</h2>

                {/* Concept 1: Parking Guidance (Drivers) */}
                <div className="concept-block" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start', margin: '24px 0 60px 0' }}>
                    {/* Left: Copy */}
                    <div>
                        <h4 className="concept-heading" style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                            Drivers saw <span style={{ color: '#16a34a' }}>parking guidance.</span>
                        </h4>
                        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>
                            Information provided to <strong style={{ color: '#374151' }}>support real-time parking decisions</strong>, answering questions like:
                        </p>

                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>Where can I park near the job site?</li>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>Will my van fit in the available spaces?</li>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>Is it safe to park there?</li>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>What will it cost?</li>
                        </ul>
                    </div>

                    {/* Right: 3 phone mockups */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <img src="/images/Jobs1.png" alt="Driver app - My Jobs view" style={{ flex: 1, width: '33%', borderRadius: '12px', cursor: 'zoom-in' }} onClick={() => openLightbox('/images/Jobs1.png', ['/images/Jobs1.png', '/images/Jobs2.png', '/images/Jobs3.png'])} />
                        <img src="/images/Jobs2.png" alt="Driver app - Job detail with parking" style={{ flex: 1, width: '33%', borderRadius: '12px', cursor: 'zoom-in' }} onClick={() => openLightbox('/images/Jobs2.png', ['/images/Jobs1.png', '/images/Jobs2.png', '/images/Jobs3.png'])} />
                        <img src="/images/Jobs3.png" alt="Driver app - Parking spot detail" style={{ flex: 1, width: '33%', borderRadius: '12px', cursor: 'zoom-in' }} onClick={() => openLightbox('/images/Jobs3.png', ['/images/Jobs1.png', '/images/Jobs2.png', '/images/Jobs3.png'])} />
                    </div>
                </div>

                {/* Concept 2: Parking Planner + Intelligence (Dispatchers) */}
                <div className="concept-block concept-block-reverse" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px', alignItems: 'start', margin: '60px 0 40px 0' }}>
                    {/* Left: Overlapping planning images */}
                    <div className="concept-block-media" style={{ position: 'relative', minHeight: '420px' }}>
                        <img
                            src="/images/planning1.png"
                            alt="Parking Planner - Table view"
                            style={{ width: '90%', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1, cursor: 'zoom-in' }}
                            onClick={() => openLightbox('/images/planning1.png', ['/images/planning1.png', '/images/planning2.png'])}
                        />
                        <img
                            src="/images/planning2.png"
                            alt="Parking Planner - Detail view"
                            style={{ width: '70%', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', position: 'absolute', bottom: '0', right: '0', zIndex: 2, cursor: 'zoom-in' }}
                            onClick={() => openLightbox('/images/planning2.png', ['/images/planning1.png', '/images/planning2.png'])}
                        />
                    </div>

                    {/* Right: Copy */}
                    <div className="concept-block-text">
                        <h4 className="concept-heading" style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                            Dispatchers & fleet managers saw <span style={{ color: '#16a34a' }}>Parking Planning...</span>
                        </h4>
                        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>
                            Information provided to <strong style={{ color: '#374151' }}>help route effectively</strong>, answering questions like:
                        </p>

                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>What are parking options near the job sites?</li>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>Are there better times of day to park in a given area?</li>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>Will drivers be likely to find parking in a given area?</li>
                        </ul>
                    </div>
                </div>

                {/* Concept 3: Parking Intelligence (Fleet Managers) */}
                <div className="concept-block" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start', margin: '60px 0 40px 0' }}>
                    {/* Left: Copy */}
                    <div>
                        <h4 className="concept-heading" style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                            ...and <span style={{ color: '#16a34a' }}>Parking Intelligence.</span>
                        </h4>
                        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>
                            Information provided to help <strong style={{ color: '#374151' }}>optimize the fleet</strong>, answering questions like:
                        </p>

                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>Do I need to invest in smaller vans to be able to park more effectively?</li>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>Is parking causing delays or inefficiencies?</li>
                            <li style={{ fontSize: '14px', color: '#6b7280' }}>Do I need to update our guidance to drivers on where and how to park?</li>
                        </ul>
                    </div>

                    {/* Right: Intelligence dashboard image */}
                    <img
                        src="/images/intelligence.png"
                        alt="Parking Intelligence Dashboard"
                        style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', cursor: 'zoom-in' }}
                        onClick={() => openLightbox('/images/intelligence.png')}
                    />
                </div>

            </section>

            {/* Synthesis Process Section */}
            <section className="case-study-content">
                <h2 className="content-heading">Synthesis Process</h2>

                {/* Process Flow */}
                <div className="synthesis-flow" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', alignItems: 'center', margin: '24px 0 48px', gap: '12px' }}>
                    <div className="synthesis-box synthesis-box-1" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Live observation notes</div>
                    <span className="flow-arrow flow-arrow-1" style={{ color: '#9ca3af', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
                    <div className="synthesis-box synthesis-box-2" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Clustered by theme</div>
                    <span className="flow-arrow flow-arrow-2" style={{ color: '#9ca3af', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↓</span>
                    <div className="synthesis-box synthesis-box-3" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cross-persona patterns</div>
                    <span className="flow-arrow flow-arrow-3" style={{ color: '#9ca3af', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
                    <div className="synthesis-box synthesis-box-4" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px 24px', borderRadius: '8px', fontSize: '14px', color: '#4b5563', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Strategic framework</div>
                </div>

                {/* Research Brainspace Image */}
                <div style={{ margin: '32px 0' }}>
                    <img
                        src="/images/sharedspace.png"
                        alt="Research Brainspace (FigJam)"
                        style={{ width: '100%', borderRadius: '16px', cursor: 'zoom-in' }}
                        onClick={() => setLightboxSrc('/images/sharedspace.png')}
                    />
                    <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '6px' }}>
                        Shared research brainspace where internal Craft team members and external Arrive stakeholders could observe sessions and contribute notes in real time
                    </p>
                </div>
            </section>

            {/* Key Reframe */}
            <section className="case-study-content" style={{ background: 'rgba(34, 197, 94, 0.06)', border: '1px solid rgba(34, 197, 94, 0.15)', borderRadius: '16px', padding: '40px' }}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Key Reframe
                </div>
                <h2 className="content-heading" style={{ marginBottom: '16px' }}>
                    Technical maturity drives needs, <span style={{ color: '#16a34a' }}>not fleet size alone.</span>
                </h2>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.7 }}>
                    The initial assumption was that fleet size would be the primary segmentation variable. This turned out to be incomplete. What actually predicted needs was <strong style={{ color: '#374151' }}>technical maturity:</strong> how sophisticated a fleet's existing tooling was. A 30-vehicle fleet with no dedicated tools looked nothing like a 30-vehicle fleet with a full tech stack.
                </p>
            </section>

            {/* Three Segments */}
            <section className="case-study-content">
                <h2 className="content-heading" style={{ marginBottom: '32px' }}>Three Segments Emerged</h2>

                <div className="pp-three-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    {/* Segment 1: Low-Tech + Participants */}
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Low-Technical Maturity</h4>
                        <div style={{ height: '3px', background: '#16a34a', marginBottom: '20px' }} />
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '20px' }}>
                            Fleets who currently use low tech and/or manual processes for scheduling, routing and communication.
                        </p>
                        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px' }}>
                            Ex. Google Calendar/Outlook, paper logs, etc
                        </p>
                        <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Participants (N=7)</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', minWidth: '80px' }}>Small (1–50)</span>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>4 Drivers</span>
                                        <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>3 Dispatchers</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Segment 2: Medium-Tech + Participants */}
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Medium-Technical Maturity</h4>
                        <div style={{ height: '3px', background: '#16a34a', marginBottom: '20px' }} />
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '20px' }}>
                            Fleets who rely on at least one core tool for scheduling and routing
                        </p>
                        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px' }}>
                            Ex. Jobber, ServiceTitan, etc
                        </p>
                        <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Participants (N=5)</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', minWidth: '80px' }}>Small (1–50)</span>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>3 Drivers</span>
                                        <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>1 Dispatcher</span>
                                        <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>1 Fleet Mgr</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Segment 3: High-Tech + Participants */}
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>High-Technical Maturity</h4>
                        <div style={{ height: '3px', background: '#16a34a', marginBottom: '20px' }} />
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '20px' }}>
                            Fleets who have a full suite of tools to manage their day-to-day
                        </p>
                        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px' }}>
                            Ex. Ignite (Scheduling & Routing) + Fleetio (Fleet Logistics) + Samsara (GPS)
                        </p>
                        <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Participants (N=7)</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', minWidth: '80px' }}>Small (1–50)</span>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>2 Drivers</span>
                                        <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>1 Dispatcher</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', minWidth: '80px' }}>Med (50–500)</span>
                                    <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>2 Fleet Mgrs</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', minWidth: '80px' }}>Large (500+)</span>
                                    <span style={{ fontSize: '11px', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 500, border: '1px solid #e5e7eb' }}>2 Fleet Mgrs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Needs */}
            <section className="case-study-content">
                <h2 className="content-heading" style={{ marginBottom: '32px' }}>Core Needs</h2>

                <div className="pp-three-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    {/* Driver + Quote */}
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Driver</h4>
                        <div style={{ height: '3px', background: '#16a34a', marginBottom: '20px' }} />
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Find parking at a given job site</p>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>
                            Drivers carry the final responsibility for parking, even when a plan exists. They need a simple, trustworthy way to find legal, safe, & nearby parking under pressure.
                        </p>
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <span style={{ color: '#22c55e', fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>&ldquo;</span>
                            <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: 1.7, fontStyle: 'italic', margin: '8px 0 16px' }}>
                                <span style={{ color: '#16a34a', fontWeight: 500 }}>[Dispatchers] tell us to either look at Spot Hero or just use our best judgment to park in places</span> and feed meters and they realize that we're gonna get some tickets if there's no parking they can provide or availability on the spot.
                            </p>
                            <p style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Driver, Medium Tech Maturity, Small-Sized (1-50)
                            </p>
                        </div>
                    </div>

                    {/* Dispatcher + Quote */}
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Dispatcher</h4>
                        <div style={{ height: '3px', background: '#16a34a', marginBottom: '20px' }} />
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Support drivers getting to job sites & parking</p>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>
                            Dispatchers need simple, reliable tools to assign work, adjust plans, & communicate quickly, without extra systems getting in the way. Parking only becomes their issue, if drivers struggle.
                        </p>
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <span style={{ color: '#22c55e', fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>&ldquo;</span>
                            <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: 1.7, fontStyle: 'italic', margin: '8px 0 16px' }}>
                                They communicate to me immediately and tell me if parking is not available anymore. So I use Google Maps and look around. <span style={{ color: '#16a34a', fontWeight: 500 }}>If I can't find a solution, I tell them to look around</span>, if there is a garage or underground parking that they can access. And then they do that.
                            </p>
                            <p style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Dispatcher, Low Tech Maturity, Small-Sized (1-50)
                            </p>
                        </div>
                    </div>

                    {/* Fleet Manager + Quote */}
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Fleet Manager</h4>
                        <div style={{ height: '3px', background: '#16a34a', marginBottom: '20px' }} />
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Optimize fleet operations</p>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>
                            Fleet managers care about reducing job delays, costs, and inefficiencies at scale. They won't use a parking tool directly but will support it if it clearly improves operational KPIs.
                        </p>
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                            <span style={{ color: '#22c55e', fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>&ldquo;</span>
                            <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: 1.7, fontStyle: 'italic', margin: '8px 0 16px' }}>
                                I do like that average walking distance to the job site. It would help me justify in some cases purchasing a smaller van to run the the area because we just can't access [the job site] and it's taken us <span style={{ color: '#16a34a', fontWeight: 500 }}>way too long</span>.
                            </p>
                            <p style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Fleet Manager, High Tech Maturity, Medium-Sized (50-500)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Potential Product-Market Fit */}
            <section className="case-study-content">
                <h2 className="content-heading" style={{ marginBottom: '40px' }}>Potential Product-Market Fit</h2>

                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
                    {/* Header Row */}
                    <div className="pmf-illustration-grid" style={{ display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb' }}>
                        <div style={{ padding: '16px 20px' }} />
                        <div style={{ padding: '16px 20px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                            <p style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Driver</p>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>Responsible for parking decisions</p>
                        </div>
                        <div style={{ padding: '16px 20px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                            <p style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Dispatcher</p>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>Looking to simplify, not complicate job planning</p>
                        </div>
                        <div style={{ padding: '16px 20px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                            <p style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Fleet Manager</p>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>Will support tools that improve KPIs or integrate into existing report systems</p>
                        </div>
                    </div>

                    {/* Low-Tech Row */}
                    <div className="pmf-illustration-grid" style={{ display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '140px' }}>
                        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', background: '#f3f4f6' }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Low-Tech</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>&#9989;</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Arrive Tool</span>
                            </div>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>&#9888;&#65039;</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Arrive Tool</span>
                            </div>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, background: '#374151', color: '#fff' }}>Lightweight Job Planner</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb', background: '#f3f4f6' }} />
                    </div>

                    {/* Medium-Tech Row */}
                    <div className="pmf-illustration-grid" style={{ display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '140px' }}>
                        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', background: '#f3f4f6' }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Medium-Tech</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>&#9989;</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Arrive Tool</span>
                            </div>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>&#9888;&#65039;</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Data Enrichment</span>
                            </div>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>&#9888;&#65039;</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Data Enrichment</span>
                            </div>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                        </div>
                    </div>

                    {/* High-Tech Row */}
                    <div className="pmf-illustration-grid" style={{ display: 'grid', gridTemplateColumns: '140px repeat(3, 1fr)', minHeight: '140px' }}>
                        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', background: '#f3f4f6' }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>High-Tech</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>&#9989;</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Arrive Tool</span>
                            </div>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>&#9888;&#65039;</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Data Enrichment</span>
                            </div>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                        </div>
                        <div style={{ padding: '24px 20px', borderLeft: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>&#9888;&#65039;</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>Data Enrichment</span>
                            </div>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                        </div>
                    </div>
                </div>

            </section>

            {/* Insight 1 - Low Technical Maturity */}
            <section ref={insight1Anim.ref} className="case-study-content insight-section" style={{ paddingBottom: '24px', ...fadeInUp(insight1Anim.isVisible) }}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Key Low Technical Maturity Learning
                </div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Low technical maturity fleets may find value in parking guidance for dispatchers, but only with the <span style={{ color: '#16a34a' }}>ability to take action.</span></h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Without any dedicated tools in place today, low-maturity fleets could benefit from a solution that allows them to plan beyond just parking. <strong>Parking alone is not sufficient data to add value, but with job planning it <em>might</em> be.</strong>
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', padding: '24px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', fontSynthesis: 'none', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        "This information is helpful for me because maybe the client had scheduled maintenance at 10am so when I look for the available parking I could consult with the client. Maybe <span style={{ color: '#16a34a', fontWeight: 600 }}>we reschedule to a later time</span> depending on the availability of the next parking."
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Dispatcher, Low-Tech Maturity, Small (1-50)</p>
                </div>

                {/* TBD Callout */}
                <div style={{ background: '#f3f4f6', borderRadius: '12px', padding: '16px 24px', margin: '0 0 24px', border: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, margin: 0 }}>
                        <strong style={{ color: '#111827' }}>* To be determined:</strong> The reason why they haven't adopted dedicated tools already. Could be budget constraints, tech comfortability or lack of desire to change workflows.
                    </p>
                </div>
            </section>

            {/* Concept Recommendation Section */}
            <section ref={conceptVideoAnim.ref} className="case-study-content" style={{ paddingTop: '16px', ...fadeInUp(conceptVideoAnim.isVisible) }}>
                {/* Labels row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', textTransform: 'uppercase', margin: 0 }}>
                        Strategic Recommendation
                    </div>
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }}>LOW TECHNICAL MATURITY</span>
                </div>

                {/* Header + Subtext */}
                <h3 style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
                    Lightweight Job Planner w/ Parking Optimization
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '32px' }}>
                    A simple scheduling and routing tool for dispatchers with integrated parking insights.
                </p>

                {/* Video - full width */}
                <video
                    src="/images/rec1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        width: '100%',
                        borderRadius: '16px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        marginBottom: '32px',
                    }}
                />

                {/* Recommendation Box */}
                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px 28px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '8px' }}>RECOMMENDATION</div>
                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, margin: 0 }}>
                        Only pursue if it can fully replace existing manual workflows (e.g. spreadsheets); it&apos;s unlikely users will adopt this as an additional tool. Strong need to evaluate MVP scope and user willingness to switch.
                    </p>
                </div>

                {/* Hover Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    {/* Feature List Button + Hover Card */}
                    <div
                        ref={featureWrapRef}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setShowFeatureList(true)}
                        onMouseLeave={() => setShowFeatureList(false)}
                    >
                        <a className="cta-button primary" style={{ cursor: 'pointer' }} onClick={() => { setShowFeatureList(prev => !prev); setShowMarketFit(false); }}>Feature List</a>
                        {showFeatureList && (
                            <div className="pp-popup-container" style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: 0,
                                width: '480px',
                                paddingBottom: '12px',
                                zIndex: 100,
                            }}>
                                <div style={{
                                    maxHeight: '70vh',
                                    overflowY: 'auto',
                                    background: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '16px',
                                    padding: '24px 32px 32px',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                                    animation: 'lightboxFadeIn 0.15s ease',
                                }}>
                                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>Features</h3>

                                    {/* JOB INPUT */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>JOB INPUT</h4>
                                        <div style={{ borderTop: '1px solid #16a34a', marginBottom: '12px' }} />
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Manually enter job list (job, name, location, day, time, driver)</p>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>View job routes visually on a map</p>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Agenda view of the day for drag-and-drop scheduling</p>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Reorder and reassign jobs</p>
                                        </div>
                                    </div>

                                    {/* PARKING INTELLIGENCE */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>PARKING INTELLIGENCE</h4>
                                        <div style={{ borderTop: '1px solid #16a34a', marginBottom: '12px' }} />
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Surface optimal parking options per job</p>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0, marginBottom: '8px' }}>Parking suggestions consider:</p>
                                            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Proximity to job</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Cost</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>EV Charging</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Likelihood of finding a spot (based on trend data)</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Garage vs. street parking (e.g. height clearance)</li>
                                            </ul>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0, marginBottom: '8px' }}>Actionable insights when availability is low (e.g. &lt;50%)</p>
                                            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Flag job for schedule adjustment</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Drop off worker first, search for parking second</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Add buffer time for parking</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Reschedule to a less congested time</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* DRIVER VIEW */}
                                    <div>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>DRIVER VIEW</h4>
                                        <div style={{ borderTop: '1px solid #16a34a', marginBottom: '12px' }} />
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>View Job list with associated parking recommendations</p>
                                        </div>
                                        <div style={{ padding: '12px 0' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Receive real-time schedule updates</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Potential Market Fit Button + Hover Card */}
                    <div
                        ref={marketWrapRef}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setShowMarketFit(true)}
                        onMouseLeave={() => setShowMarketFit(false)}
                    >
                        <a className="cta-button primary" style={{ cursor: 'pointer' }} onClick={() => { setShowMarketFit(prev => !prev); setShowFeatureList(false); }}>Potential Market Fit</a>
                        {showMarketFit && (
                            <div className="pp-popup-container" style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: 0,
                                width: '620px',
                                paddingBottom: '12px',
                                zIndex: 100,
                            }}>
                            <div style={{
                                background: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '16px',
                                padding: '24px 32px 32px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                                animation: 'lightboxFadeIn 0.15s ease',
                            }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Parking Optimization</h3>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Potential product-market fit across personas and technical maturity</p>

                                {/* Matrix Table */}
                                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                    {/* Header Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                                        <div style={{ padding: '12px 16px' }} />
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Driver</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Responsible for parking decisions</p>
                                        </div>
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Dispatcher</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Looking to simplify, not complicate job planning</p>
                                        </div>
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Fleet Manager</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Will support tools that improve KPIs or integrate into existing report systems</p>
                                        </div>
                                    </div>

                                    {/* Low-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Low-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(5, 150, 105, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#059669', color: '#fff' }}>Lightweight Job Planner</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: '#f9fafb' }} />
                                    </div>

                                    {/* Medium-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Medium-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                    </div>

                                    {/* High-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>High-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Warning callouts */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '14px', flexShrink: 0 }}>&#9888;&#65039;</span>
                        <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>Need to define the <strong>minimum</strong> needed for an adoptable MVP.</p>
                    </div>
                    <div style={{ flex: 1, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '14px', flexShrink: 0 }}>&#9888;&#65039;</span>
                        <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>Unclear if <strong>Low Technical Maturity</strong> audience is large enough to pursue this direction</p>
                    </div>
                </div>
            </section>

            {/* Insight 2 - Medium & High Technical Maturity */}
            <section ref={insight2Anim.ref} className="case-study-content insight-section" style={{ paddingBottom: '24px', ...fadeInUp(insight2Anim.isVisible) }}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Key Medium &amp; High Technical Maturity Learning
                </div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Medium &amp; high technical maturity fleets likely <span style={{ color: '#16a34a' }}>require data enrichment</span> to find value in parking intelligence.</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Because the onus is typically on the driver today to find parking, fleets that already have tooling in place are unlikely to adopt an additional tool for parking alone. While the insights were viewed as valuable, they were <strong>only valuable as an additional input within existing systems.</strong>
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', padding: '24px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', fontSynthesis: 'none', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        &ldquo;I don&apos;t think our Ignite program&apos;s going anywhere. But I do think this parking intelligence would <span style={{ color: '#16a34a', fontWeight: 600 }}>be an addition to what we have going on</span>...added to [service drivers&apos;] schedule and their regular routine.&rdquo;
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Fleet Manager, High Tech Maturity, Medium-Sized (50-500)</p>
                </div>
            </section>

            {/* Strategic Recommendation - Parking Plugin (Med/High Tech) */}
            <section ref={conceptPluginAnim.ref} className="case-study-content" style={{ paddingTop: '16px', ...fadeInUp(conceptPluginAnim.isVisible) }}>
                {/* Labels row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', textTransform: 'uppercase', margin: 0 }}>
                        Strategic Recommendation
                    </div>
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }}>MED/HIGH TECHNICAL MATURITY</span>
                </div>

                {/* Header + Subtext */}
                <h3 style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
                    Parking Plugin
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '32px' }}>
                    A browser-based layer that enhances existing job planning tools (like Jobber) with smart, contextual parking suggestions. No workflow change required.
                </p>

                {/* Video - full width */}
                <video
                    src="/images/rec2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        width: '100%',
                        borderRadius: '16px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        marginBottom: '32px',
                    }}
                />

                {/* Recommendation Box */}
                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px 28px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '8px' }}>RECOMMENDATION</div>
                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, margin: 0 }}>
                        The dispatcher plugin has potential value, but should only be prioritized now if it&apos;s low-lift and widely compatible.
                    </p>
                </div>

                {/* Hover Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    {/* Feature List Button + Hover Card */}
                    <div
                        ref={featureWrapRefPlugin}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setShowFeatureListPlugin(true)}
                        onMouseLeave={() => setShowFeatureListPlugin(false)}
                    >
                        <a className="cta-button primary" style={{ cursor: 'pointer' }} onClick={() => { setShowFeatureListPlugin(prev => !prev); setShowMarketFitPlugin(false); }}>Feature List</a>
                        {showFeatureListPlugin && (
                            <div className="pp-popup-container" style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: 0,
                                width: '480px',
                                paddingBottom: '12px',
                                zIndex: 100,
                            }}>
                                <div style={{
                                    maxHeight: '70vh',
                                    overflowY: 'auto',
                                    background: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '16px',
                                    padding: '24px 32px 32px',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                                    animation: 'lightboxFadeIn 0.15s ease',
                                }}>
                                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>Features</h3>

                                    {/* JOB SYNC */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>JOB SYNC</h4>
                                        <div style={{ borderTop: '1px solid #16a34a', marginBottom: '12px' }} />
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Pull jobs from job planning tool (address, time, assigned driver)</p>
                                        </div>
                                    </div>

                                    {/* PARKING INTELLIGENCE ENGINE */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>PARKING INTELLIGENCE ENGINE</h4>
                                        <div style={{ borderTop: '1px solid #16a34a', marginBottom: '12px' }} />
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Surface optimal parking options for each job</p>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0, marginBottom: '8px' }}>Parking recs for each job taking into account:</p>
                                            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Proximity to job</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Cost</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>EV Charging</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Real Time Availability</li>
                                                <li style={{ fontSize: '13px', color: '#6b7280' }}>Security amenities (cameras, staffed garages)</li>
                                            </ul>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Display actionable insights (e.g. &ldquo;Parking is challenging&rdquo;, &ldquo;More parking available in the morning&rdquo;)</p>
                                        </div>
                                    </div>

                                    {/* PLANNING WORKFLOW */}
                                    <div>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>PLANNING WORKFLOW</h4>
                                        <div style={{ borderTop: '1px solid #16a34a', marginBottom: '12px' }} />
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Share parking suggestions to driver (via external tool e.g. messenger)</p>
                                        </div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Prepay for parking</p>
                                        </div>
                                        <div style={{ padding: '12px 0' }}>
                                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Reorder and Reassign Jobs based on insights (external tool)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Potential Market Fit Button + Hover Card */}
                    <div
                        ref={marketWrapRefPlugin}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setShowMarketFitPlugin(true)}
                        onMouseLeave={() => setShowMarketFitPlugin(false)}
                    >
                        <a className="cta-button primary" style={{ cursor: 'pointer' }} onClick={() => { setShowMarketFitPlugin(prev => !prev); setShowFeatureListPlugin(false); }}>Potential Market Fit</a>
                        {showMarketFitPlugin && (
                            <div className="pp-popup-container" style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: 0,
                                width: '620px',
                                paddingBottom: '12px',
                                zIndex: 100,
                            }}>
                            <div style={{
                                background: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '16px',
                                padding: '24px 32px 32px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                                animation: 'lightboxFadeIn 0.15s ease',
                            }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Parking Plugin</h3>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Potential product-market fit across personas and technical maturity</p>

                                {/* Matrix Table */}
                                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                    {/* Header Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                                        <div style={{ padding: '12px 16px' }} />
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Driver</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Responsible for parking decisions</p>
                                        </div>
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Dispatcher</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Looking to simplify, not complicate job planning</p>
                                        </div>
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Fleet Manager</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Will support tools that improve KPIs or integrate into existing report systems</p>
                                        </div>
                                    </div>

                                    {/* Low-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Low-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(5, 150, 105, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#059669', color: '#fff' }}>Lightweight Job Planner</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: '#f9fafb' }} />
                                    </div>

                                    {/* Medium-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Medium-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                    </div>

                                    {/* High-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>High-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Strategic Recommendation - Metrics and Insights (Med/High Tech) */}
            <section ref={conceptMetricsAnim.ref} className="case-study-content" style={{ paddingTop: '0px', ...fadeInUp(conceptMetricsAnim.isVisible) }}>
                {/* Header + Subtext */}
                <h3 style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
                    Metrics and Insights
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '32px' }}>
                    Surface actionable parking data and ROI metrics to inform planning and drive better scheduling decisions.
                </p>

                {/* Image - full width */}
                <img
                    src="/images/use3.png"
                    alt="Metrics and Insights Dashboard"
                    style={{
                        width: '100%',
                        borderRadius: '16px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        marginBottom: '32px',
                        cursor: 'zoom-in',
                    }}
                    onClick={() => setLightboxSrc('/images/use3.png')}
                />

                {/* Recommendation Box */}
                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px 28px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '8px' }}>RECOMMENDATION</div>
                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, margin: 0 }}>
                        Save for Post-MVP and use adoption to identify metrics users are most interested in. Explore data enrichment opportunities into existing tools or as an extension of the plugin/planner.
                    </p>
                </div>

                {/* Hover Button */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div
                        ref={marketWrapRefMetrics}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setShowMarketFitMetrics(true)}
                        onMouseLeave={() => setShowMarketFitMetrics(false)}
                    >
                        <a className="cta-button primary" style={{ cursor: 'pointer' }} onClick={() => { setShowMarketFitMetrics(prev => !prev); }}>Potential Market Fit</a>
                        {showMarketFitMetrics && (
                            <div className="pp-popup-container" style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: 0,
                                width: '620px',
                                paddingBottom: '12px',
                                zIndex: 100,
                            }}>
                            <div style={{
                                background: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '16px',
                                padding: '24px 32px 32px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                                animation: 'lightboxFadeIn 0.15s ease',
                            }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Metrics and Insights</h3>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Potential product-market fit across personas and technical maturity</p>

                                {/* Matrix Table */}
                                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                    {/* Header Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                                        <div style={{ padding: '12px 16px' }} />
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Driver</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Responsible for parking decisions</p>
                                        </div>
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Dispatcher</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Looking to simplify, not complicate job planning</p>
                                        </div>
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Fleet Manager</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Will support tools that improve KPIs or integrate into existing report systems</p>
                                        </div>
                                    </div>

                                    {/* Low-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Low-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(5, 150, 105, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#059669', color: '#fff' }}>Lightweight Job Planner</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: '#f9fafb' }} />
                                    </div>

                                    {/* Medium-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Medium-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                    </div>

                                    {/* High-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>High-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Insight 3 - Key Driver Learning */}
            <section ref={insight3Anim.ref} className="case-study-content insight-section" style={{ paddingBottom: '24px', ...fadeInUp(insight3Anim.isVisible) }}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Key Driver Learning
                </div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', maxWidth: '800px' }}>Drivers are the decision-makers for real time parking.</h3>
                <p className="content-text" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                    Even with pre-planning, the responsibility of parking falls on the driver. Whether the day starts with a clear plan, or even if a dispatcher helps scout options in real-time, <strong>the final call (and the frustration) is always theirs.</strong>
                </p>

                {/* Quote Card */}
                <div style={{ background: '#f9fafb', padding: '24px 0', margin: '40px 0' }}>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', fontSynthesis: 'none', color: '#1f2937', marginBottom: '16px', lineHeight: 1.7 }}>
                        &ldquo;One guy&apos;s got to go out and find the parking because they couldn&apos;t park anywhere at the job site. So that&apos;s all on them. They&apos;re big boys and girls out there. <span style={{ color: '#16a34a', fontWeight: 600 }}>They can figure that out.</span>&rdquo;
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Dispatcher, High Tech Maturity, Small (1-50)</p>
                </div>
            </section>

            {/* Strategic Recommendation - Driver App Enhancements */}
            <section ref={conceptDriverAnim.ref} className="case-study-content" style={{ paddingTop: '16px', ...fadeInUp(conceptDriverAnim.isVisible) }}>
                {/* Labels row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', textTransform: 'uppercase', margin: 0 }}>
                        Strategic Recommendation
                    </div>
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }}>DRIVER</span>
                </div>

                {/* Header + Subtext */}
                <h3 style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
                    Driver App Enhancements
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '32px' }}>
                    Enhance the EasyPark experience with fleet-ready results tailored to driver preferences and job schedules
                </p>

                {/* Phone Mockups - 4 columns */}
                <div className="concept-block pp-phone-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>INTEGRATE SCHEDULE</div>
                        <img src="/images/use5.png" alt="Integrate Schedule" style={{ width: '100%', borderRadius: '12px', cursor: 'zoom-in' }} onClick={() => openLightbox('/images/use5.png', ['/images/use5.png', '/images/use6.png', '/images/use7.png'])} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>&nbsp;</div>
                        <img src="/images/use6.png" alt="My Jobs View" style={{ width: '100%', borderRadius: '12px', cursor: 'zoom-in' }} onClick={() => openLightbox('/images/use6.png', ['/images/use5.png', '/images/use6.png', '/images/use7.png'])} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>CUSTOMIZE RESULTS</div>
                        <img src="/images/use7.png" alt="Customize Parking Results" style={{ width: '100%', borderRadius: '12px', cursor: 'zoom-in' }} onClick={() => openLightbox('/images/use7.png', ['/images/use5.png', '/images/use6.png', '/images/use7.png'])} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '12px' }}>ENHANCE PARKING RESULTS</div>
                        <video
                            src="/images/rec3.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ width: '100%', borderRadius: '12px' }}
                        />
                    </div>
                </div>

                {/* Recommendation Box */}
                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px 28px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '8px' }}>RECOMMENDATION</div>
                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, margin: 0, marginBottom: '12px' }}>
                        Consider using the driver app to evaluate reliability of the data and long-term value.
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li style={{ fontSize: '13px', color: '#6b7280' }}>Explore calendar/job tool connections</li>
                        <li style={{ fontSize: '13px', color: '#6b7280' }}>Define technical feasibility</li>
                        <li style={{ fontSize: '13px', color: '#6b7280' }}>Solve for data constraints</li>
                    </ul>
                </div>

                {/* Hover Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    {/* Feature List Button + Hover Card */}
                    <div
                        ref={featureWrapRefDriver}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setShowFeatureListDriver(true)}
                        onMouseLeave={() => setShowFeatureListDriver(false)}
                    >
                        <a className="cta-button primary" style={{ cursor: 'pointer' }} onClick={() => { setShowFeatureListDriver(prev => !prev); setShowMarketFitDriver(false); }}>Feature List</a>
                        {showFeatureListDriver && (
                            <div className="pp-popup-container" style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: 0,
                                width: '480px',
                                paddingBottom: '12px',
                                zIndex: 100,
                            }}>
                                <div style={{
                                    maxHeight: '70vh',
                                    overflowY: 'auto',
                                    background: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '16px',
                                    padding: '24px 32px 32px',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                                    animation: 'lightboxFadeIn 0.15s ease',
                                }}>
                                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>Features</h3>

                                    <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}><strong>Schedule Sync:</strong> Pull jobs from calendar, app integration, or job planner</p>
                                    </div>
                                    <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Surface optimal parking options for each job</p>
                                    </div>
                                    <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Filter results based on drivers preferences</p>
                                    </div>
                                    <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <p style={{ fontSize: '14px', color: '#374151', margin: 0, marginBottom: '8px' }}>Parking details:</p>
                                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <li style={{ fontSize: '13px', color: '#6b7280' }}>Proximity to job</li>
                                            <li style={{ fontSize: '13px', color: '#6b7280' }}>Cost</li>
                                            <li style={{ fontSize: '13px', color: '#6b7280' }}>EV Charging</li>
                                            <li style={{ fontSize: '13px', color: '#6b7280' }}>Real time and trend data availability</li>
                                            <li style={{ fontSize: '13px', color: '#6b7280' }}>Security amenities (cameras, staffed garages)</li>
                                        </ul>
                                    </div>
                                    <div style={{ padding: '12px 0' }}>
                                        <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}><strong>Feedback Prompt:</strong> Was this helpful? or Found better spot?</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Potential Market Fit Button + Hover Card */}
                    <div
                        ref={marketWrapRefDriver}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setShowMarketFitDriver(true)}
                        onMouseLeave={() => setShowMarketFitDriver(false)}
                    >
                        <a className="cta-button primary" style={{ cursor: 'pointer' }} onClick={() => { setShowMarketFitDriver(prev => !prev); setShowFeatureListDriver(false); }}>Potential Market Fit</a>
                        {showMarketFitDriver && (
                            <div className="pp-popup-container" style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: 0,
                                width: '620px',
                                paddingBottom: '12px',
                                zIndex: 100,
                            }}>
                            <div style={{
                                background: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '16px',
                                padding: '24px 32px 32px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                                animation: 'lightboxFadeIn 0.15s ease',
                            }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Driver App Enhancements</h3>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Potential product-market fit across personas and technical maturity</p>

                                {/* Matrix Table */}
                                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                    {/* Header Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                                        <div style={{ padding: '12px 16px' }} />
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Driver</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Responsible for parking decisions</p>
                                        </div>
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Dispatcher</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Looking to simplify, not complicate job planning</p>
                                        </div>
                                        <div style={{ padding: '12px 16px', textAlign: 'center', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Fleet Manager</p>
                                            <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>Will support tools that improve KPIs or integrate into existing report systems</p>
                                        </div>
                                    </div>

                                    {/* Low-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Low-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(5, 150, 105, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#059669', color: '#fff' }}>Lightweight Job Planner</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: '#f9fafb' }} />
                                    </div>

                                    {/* Medium-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Medium-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                    </div>

                                    {/* High-Tech Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 1fr)', minHeight: '100px' }}>
                                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', background: '#f9fafb' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>High-Tech</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb', background: 'rgba(234, 179, 8, 0.12)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9989;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>EASYPARK TOOL</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Guidance</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                        <div style={{ padding: '16px', borderLeft: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '12px' }}>&#9888;&#65039;</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b7280', textTransform: 'uppercase' }}>DATA ENRICHMENT</span>
                                            </div>
                                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#374151', color: '#fff' }}>Parking Intelligence</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Strategic Recommendations */}
            <section ref={recommendationsAnim.ref} className="case-study-content" style={fadeInUp(recommendationsAnim.isVisible)}>
                <div className="section-label" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Recommendations
                </div>
                <h2 className="content-heading">Two Paths Forward</h2>
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '0' }}>
                    Based on the research, I presented two strategic options to leadership - each targeting a different segment with different investment levels.
                </p>

                {/* Strategy Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', margin: '48px 0' }}>
                    {/* Path A */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: '#16a34a' }}>Path A</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Low-Tech Maturity Focus</h3>
                        <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.7, marginBottom: '24px' }}>
                            Build a lightweight job planner with integrated parking intelligence. Target fleets that haven't adopted dedicated scheduling software, positioning as a full workflow tool.
                        </p>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(107, 114, 128, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#6b7280' }}>1</span>
                                <span>Survey fleets to size low-tech maturity opportunity</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(107, 114, 128, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#6b7280' }}>2</span>
                                <span>Validate willingness to pay</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(107, 114, 128, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#6b7280' }}>3</span>
                                <span>Supplement with EU interviews</span>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(234, 179, 8, 0.08)', borderLeft: '3px solid #eab308', padding: '16px 20px', borderRadius: '0 8px 8px 0', fontSize: '13px', color: '#6b7280' }}>
                            <strong style={{ color: '#ca8a04' }}>Risk:</strong> Response rates may limit ability to size the opportunity accurately
                        </div>
                    </div>

                    {/* Path B */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: '#16a34a' }}>Path B</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Med/High-Tech Maturity Focus</h3>
                        <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.7, marginBottom: '24px' }}>
                            Browser-based plugin that enhances existing tools like Jobber with contextual parking suggestions. No workflow change required for users.
                        </p>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(107, 114, 128, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#6b7280' }}>1</span>
                                <span>Assess technical feasibility of plugin</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(107, 114, 128, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#6b7280' }}>2</span>
                                <span>Identify lightweight integration paths</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '14px', color: '#4b5563' }}>
                                <span style={{ width: '20px', height: '20px', background: 'rgba(107, 114, 128, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#6b7280' }}>3</span>
                                <span>Explore data enrichment partnerships</span>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(234, 179, 8, 0.08)', borderLeft: '3px solid #eab308', padding: '16px 20px', borderRadius: '0 8px 8px 0', fontSize: '13px', color: '#6b7280' }}>
                            <strong style={{ color: '#ca8a04' }}>Risk:</strong> Integration complexity may delay development or limit usefulness
                        </div>
                    </div>
                </div>

                {/* Outcome */}
                <div style={{ marginTop: '80px' }}>
                    <h2 className="content-heading">Outcome</h2>
                    <p className="content-text">
                        Rather than build a parking planner that lacked clear product-market fit, leadership paused development. The research gave them something more valuable: a new segmentation framework, confidence to hold off on engineering, and two validated directions to pursue.
                    </p>
                </div>
            </section>

            {/* Reflection */}
            <section ref={reflectionAnim.ref} className="case-study-content" style={fadeInUp(reflectionAnim.isVisible)}>
                <h2 className="content-heading">Reflection</h2>

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

            {/* Lightbox Overlay */}
            {lightboxSrc && (
                <div
                    onClick={closeLightbox}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: 'rgba(0, 0, 0, 0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'zoom-out',
                        padding: '40px',
                        animation: 'lightboxFadeIn 0.2s ease',
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                            background: 'none',
                            border: 'none',
                            color: '#9ca3af',
                            fontSize: '32px',
                            cursor: 'pointer',
                            lineHeight: 1,
                            padding: '8px',
                            zIndex: 1,
                        }}
                        aria-label="Close"
                    >
                        &#x2715;
                    </button>

                    {/* Previous button */}
                    {lightboxGallery.length > 1 && lightboxIndex > 0 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: '#fff',
                                fontSize: '24px',
                                cursor: 'pointer',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            aria-label="Previous"
                        >
                            &#x2039;
                        </button>
                    )}

                    {/* Next button */}
                    {lightboxGallery.length > 1 && lightboxIndex < lightboxGallery.length - 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            style={{
                                position: 'absolute',
                                right: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: '#fff',
                                fontSize: '24px',
                                cursor: 'pointer',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            aria-label="Next"
                        >
                            &#x203A;
                        </button>
                    )}

                    <img
                        src={lightboxSrc}
                        alt=""
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '85vh',
                            objectFit: 'contain',
                            borderRadius: '12px',
                            cursor: 'default',
                        }}
                    />

                    {/* Gallery counter */}
                    {lightboxGallery.length > 1 && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: '#9ca3af',
                                fontSize: '13px',
                                cursor: 'default',
                            }}
                        >
                            {lightboxIndex + 1} / {lightboxGallery.length}
                        </div>
                    )}
                </div>
            )}
        </PasswordProtect>
    );
}
