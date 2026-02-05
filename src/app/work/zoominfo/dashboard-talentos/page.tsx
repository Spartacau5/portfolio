'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';

export default function DashboardTalentOSPage() {
    // Scroll animation refs
    const competitiveAnim = useScrollAnimation();
    const userFlowsAnim = useScrollAnimation();
    const uiInspirationAnim = useScrollAnimation();
    const highFidelityAnim = useScrollAnimation();
    const solutionAnim = useScrollAnimation();
    const takeawaysAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">Dashboard for TalentOS</h1>
                <p className="case-study-company">Real-time insights into workforce reductions at ZoomInfo</p>
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
                            <Image src="/images/talentos.avif" alt="TalentOS" width={80} height={24} className="team-logo" />
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value">Q1 2023</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Figma</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Context */}
                    <div className="description-block">
                        <span className="meta-label">OVERVIEW</span>
                        <p className="description-text">
                            The goal of this project was to create a filterable 'feed' for TalentOS - our talent acquisition platform, to display important recruitment data such as layoffs, hiring announcements, funding/IPO announcements, etc., equipping recruiters which new angles to poach top talent for their roles.
                        </p>
                        <p className="description-text">
                            We wanted to personalize the recruiter's experience and also integrate the plethora of Return to Office data we received from ZoomInfo's acquisition of Comparably, allowing recruiters to target talent from companies based on work from home policies.
                        </p>
                    </div>
                </div>
            </section>

            {/* Competitive Analysis - Tracker Section */}
            <section ref={competitiveAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(competitiveAnim.isVisible)}>
                <h2 className="content-heading">Competitive Analysis – Tracker</h2>
                <p className="content-text">
                    After receiving the PRD I started looking at online trackers to study from which were light-weight but had high usage numbers
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div>
                        <Image src="/images/tracker1.avif" alt="Layoffs.fyi tracker" width={600} height={400} className="content-image" style={{ borderRadius: '16px' }} />
                        <span className="image-caption" style={{ marginTop: '0.75rem', display: 'block' }}>Layoffs.fyi tracker</span>
                    </div>
                    <div>
                        <Image src="/images/tracker2.avif" alt="TalentTicker.com" width={600} height={400} className="content-image" style={{ borderRadius: '16px' }} />
                        <span className="image-caption" style={{ marginTop: '0.75rem', display: 'block' }}>TalentTicker.com</span>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <p className="content-text" style={{ marginBottom: '1rem' }}>
                        <strong>Quick Filters:</strong> The UX of these trackers was consistent with quick filters between layoffs, hiring and firing news, etc., It made for a fast UX which I wanted to adopt as well.
                    </p>
                    <p className="content-text" style={{ marginBottom: '1rem' }}>
                        <strong>Table-based layout to display more data:</strong> Most trackers also displayed the information using a table/sheet based layout which helps provide more information visually but could also lead to visual overload.
                    </p>
                    <p className="content-text" style={{ marginBottom: '1rem' }}>
                        <strong>Providing a legitimate source is key to reinforce trust:</strong> Highlighting the source of the news was key as recruiters would still have to double check information before reaching out to candidates about it. A win would be to reinforce that trust so eventually users stop fact-checking and have trust in ZoomInfo's data.
                    </p>
                    <p className="content-text">
                        <strong>Could provide advantage over competitors:</strong> At the time and to our knowledge, none of our competitors were planning around this feature and considering COVID's long-lasting impact on the job market, it made sense for us to invest and test this feature.
                    </p>
                </div>
            </section>

            {/* User Flows Section */}
            <section ref={userFlowsAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(userFlowsAnim.isVisible)}>
                <h2 className="content-heading">User Flows</h2>
                <div className="figma-embed-container" style={{ marginTop: '1.5rem' }}>
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        width="100%"
                        height="550"
                        src="https://embed.figma.com/design/Djyx9dG99sCwedoBtxheIp/TOS-Ticker-Q4-2022?node-id=39-2806&embed-host=share"
                        allowFullScreen
                    />
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h3 className="content-subheading">Version 1: Initial Design</h3>
                    <p className="content-text">
                        The first version of the user flow was designed as a foundational baseline, focusing on core functionality and initial hypotheses.
                    </p>

                    <h3 className="content-subheading" style={{ marginTop: '2rem' }}>Version 2: Validating with Internal Recruiters</h3>
                    <p className="content-text">
                        To validate the flow, I organized a focus group with our internal recruitment team—our ideal user persona. This involved significant effort: sending invites, scheduling sessions, preparing scripts, recording feedback, and collaborating with another designer for note-taking.
                    </p>
                    <p className="content-text">
                        The insights uncovered key friction points - job role wasn't as relevant, news more than a month old didn't make sense showing, etc., and better ideas such as adding a location search, and allowing users to change the frequency of alerts., leading to a refined second version.
                    </p>

                    <h3 className="content-subheading" style={{ marginTop: '2rem' }}>Version 3: Collaborative Refinement</h3>
                    <p className="content-text">
                        In the third iteration, I collaborated with my Product Manager to align the flow with business goals and technical constraints. This version provided the structure for mid-fidelity designs, ensuring a balance between user needs and platform objectives.
                    </p>
                </div>
            </section>

            {/* UI Inspiration Section */}
            <section ref={uiInspirationAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(uiInspirationAnim.isVisible)}>
                <h2 className="content-heading">UI Inspiration</h2>
                <div className="figma-embed-container" style={{ marginTop: '1.5rem' }}>
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        width="100%"
                        height="450"
                        src="https://embed.figma.com/design/Djyx9dG99sCwedoBtxheIp/TOS-Ticker-Q4-2022?node-id=109-18&embed-host=share"
                        allowFullScreen
                    />
                </div>
                <p className="content-text" style={{ marginTop: '1.5rem' }}>
                    For the UI, I drew inspiration from multiple sources. I analyzed our internal products to understand how they handle tables and similar components, ensuring consistency within our ecosystem. I also researched competitors to see how they've adopted similar features, identifying best practices and opportunities for differentiation. Additionally, I explored popular online trackers and general UI libraries, which provided creative ideas for refining the visual hierarchy and component interactions. This comprehensive approach ensured the interface was both intuitive and aligned with user expectations.
                </p>
            </section>

            {/* High-Fidelity Screens Section */}
            <section ref={highFidelityAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(highFidelityAnim.isVisible)}>
                <h2 className="content-heading">High-Fidelity Screens - Tracker</h2>
                <div className="figma-embed-container" style={{ marginTop: '1.5rem' }}>
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        width="100%"
                        height="450"
                        src="https://embed.figma.com/design/6qoFhYDgzPKdSE4xbObdVE/Dashboard?node-id=42-62408&embed-host=share"
                        allowFullScreen
                    />
                </div>
                <p className="content-text" style={{ marginTop: '1.5rem' }}>
                    The high-fidelity prototype brought the user flow to life with polished visuals and interactive elements, simulating the final product experience. It was designed to closely align with the platform's design system, ensuring consistency and scalability. This prototype was used for usability testing with internal stakeholders, allowing me to validate design decisions, gather actionable feedback, and make necessary refinements before development.
                </p>
            </section>

            {/* Final Solution Section */}
            <section ref={solutionAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(solutionAnim.isVisible)}>
                <h2 className="content-heading">Final Solution</h2>
                <div className="figma-embed-container" style={{ marginTop: '1.5rem' }}>
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        width="100%"
                        height="600"
                        src="https://embed.figma.com/proto/6qoFhYDgzPKdSE4xbObdVE/Dashboard?page-id=826%3A194431&node-id=826-255364&viewport=367%2C-10719%2C0.2&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=826%3A255364&embed-host=share&scaling=scale-down"
                        allowFullScreen
                    />
                </div>
                <p className="content-text" style={{ marginTop: '1.5rem' }}>
                    After tons of iterations, this was the final solution proposed to our senior stakeholders - a new dashboard for TalentOS
                </p>
            </section>

            {/* Takeaways Section */}
            <section ref={takeawaysAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(takeawaysAnim.isVisible)}>
                <h2 className="content-heading">Takeaways</h2>
                <p className="content-text">
                    This project was a testament to the value of thorough research and a well-structured design process. From organizing focus groups and analyzing competitor solutions to testing prototypes and refining multiple iterations, every stage was driven by user-centered insights and collaboration. The sheer volume of research, ideas shared, and iterations designed demonstrated a commitment to delivering a solution that met both user needs and business goals.
                </p>
                <p className="content-text">
                    Although product indecision ultimately halted this idea, the process and output were highly appreciated internally. The project not only highlighted the importance of thoughtful design but also showcased the potential of innovative, user-driven solutions—leaving a lasting impact on the team and reinforcing the value of UX within the organization.
                </p>
                <Image src="/images/feedback.webp" alt="Feedback" width={600} height={400} className="content-image" style={{ marginTop: '1.5rem', maxWidth: '600px' }} />
            </section>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/work/zoominfo" className="back-link">
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="back-arrow" />
                    Back to ZoomInfo
                </Link>
                <Link href="/work/jnj" className="back-link">
                    Next: Johnson & Johnson
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
