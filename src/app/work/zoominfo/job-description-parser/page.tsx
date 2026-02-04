'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';

export default function JobDescriptionParserPage() {
    // Scroll animation refs
    const demoAnim = useScrollAnimation();
    const processAnim = useScrollAnimation();
    const solutionAnim = useScrollAnimation();
    const takeawaysAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">Job Description Parser</h1>
                <p className="case-study-company">Automating candidate searches to enhance recruiter efficiency. </p>
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
                        <p className="meta-value">Q3 2022</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Figma<br />Amplitude</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Context */}
                    <div className="description-block">
                        <span className="meta-label">OVERVIEW</span>
                        <p className="description-text">
                            As the sole UX designer responsible for developing a highly impactful feature at ZoomInfo, I had the unique challenge of creating an intuitive and seamless experience for the Candidate Search with Job Description Parser. This feature aims to simplify the recruitment process by allowing users to match job descriptions with potential candidates, leveraging intelligent parsing of job requirements.
                        </p>
                        <p className="description-text">
                            Throughout the design process, I worked to ensure that the interface was not only functional but also user-friendly, keeping the end-users' needs at the forefront of the solution. In this case study, I will walk you through the design journey, challenges faced, and the strategies employed to deliver a streamlined feature that enhances recruiter efficiency.
                        </p>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section ref={demoAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(demoAnim.isVisible)}>
                <h2 className="content-heading">Feature Demo</h2>
                <div className="figma-embed-container">
                    <iframe
                        width="100%"
                        height="450"
                        src="https://www.youtube.com/embed/UXdk2DeAh64?si=12OTRLFAm7nKsFp4"
                        title="Job Description Parser Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </section>

            {/* Process Section */}
            <section ref={processAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={{ borderTop: 'none', paddingTop: '1.5rem', ...fadeInUp(processAnim.isVisible) }}>
                <h2 className="content-heading">Process</h2>

                <h3 className="content-subheading">Understanding the Problem</h3>
                <p className="content-text">
                    The goal of this feature was simple - we wanted recruiters to be able to copy and paste a resume into TalentOS and let the system create a search automatically.
                </p>
                <p className="content-text">
                    The biggest challenge for this project was the timeline. We were given only 3 weeks to conceptualize, design, research, test, and develop this feature to make it in time for the quarterly release. This was an incredibly daunting task but with the guidance of an incredible team around me we had to get it done. Given the fast pace of this project, I started with a very basic version of a PRD provided by my PM with the following requirements.
                </p>

                <h3 className="content-subheading" style={{ marginTop: '2.5rem' }}>Competitive Analysis</h3>
                <p className="content-text">
                    Apart an early draft of a PRD, I researched into what our competitors had iterated with their own version of this feature, if at all.
                </p>
                <Image src="/images/seekout.avif" alt="Seekout's JD Parser" width={800} height={450} className="content-image" style={{ marginTop: '1.5rem' }} />
                <span className="image-caption" style={{ marginTop: '0.75rem', display: 'block' }}>Seekout's JD Parser</span>
                <div style={{ marginTop: '1.5rem' }}>
                    <p className="content-text" style={{ marginBottom: '1rem' }}><strong>The simpler the better:</strong> Most parsers followed a very simple text-based UI to mimic the feel of Resumes and PDF's. The idea is for the back-end functionality to shine than UI to distract.</p>
                    <p className="content-text"><strong>Space to improve Static UX:</strong> Most of these parsers are very static and made the entire UX of waiting for results to load feel longer since there was a dropoff in satisfaction whilst the results parsed from a JD.</p>
                </div>

                <h3 className="content-subheading" style={{ marginTop: '2.5rem' }}>A/B Testing the entry point</h3>
                <p className="content-text">
                    One of the biggest pieces was determining where to put the trigger CTA in the application. Since we wanted users to start their flow using this feature, it made sense to position it front and center but also not too obvious to distract regular users from their usual workflows.
                </p>
                <p className="content-text">
                    To begin with, I designed some alternatives. After multiple rounds of feedback with my UX Manager, and PM, we narrowed down our options to 2.
                </p>

                <Image src="/images/cta1.avif" alt="Version A - CTA as the starting filter" width={800} height={450} className="content-image" style={{ marginTop: '1.5rem' }} />
                <span className="image-caption" style={{ marginTop: '0.75rem', display: 'block' }}>Version A - CTA as the starting filter in the left panel</span>
                <p className="content-text" style={{ marginTop: '1rem' }}>
                    Version A wanted to keep this as its own filter since that was our most used area and the product had a track record of users not even exploring CTA's outside of this panel. This was a PM-led approach which went against UX principles and logic but we had to entertain this option.
                </p>

                <Image src="/images/cta2.avif" alt="Version B - CTA on top next to search bar" width={800} height={450} className="content-image" style={{ marginTop: '2.5rem' }} />
                <span className="image-caption" style={{ marginTop: '0.75rem', display: 'block' }}>Version B - CTA on top next to search bar</span>
                <p className="content-text" style={{ marginTop: '1rem' }}>
                    Version B was the UX-backed choice as this was a search functionality which made sense to be in or around the search bar section.
                </p>

                <h3 className="content-subheading" style={{ marginTop: '2.5rem' }}>Focus Group with internal recruiters</h3>
                <p className="content-text">
                    To quickly move past this impasse, I reached out to a team of 7 internal recruiters to get agile feedback over preference quickly.
                </p>

                <div className="recruiter-feedback-grid" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {/* Version A Feedback */}
                    <div style={{ background: '#fafafa', borderRadius: '16px', padding: '1.5rem' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '1.25rem', textAlign: 'center' }}>Feedback for Version A</h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Patrick */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: '#fff' }}>P</div>
                                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', marginTop: '0.35rem' }}>Patrick</p>
                                </div>
                                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', fontStyle: 'italic' }}>
                                    "The filter really blends in with the other filters but for me it should stand out a bit as it's a bit different and more powerful than other filters."
                                </p>
                            </div>

                            {/* Margaret */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: '#fff' }}>M</div>
                                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginTop: '0.35rem' }}>Margaret</p>
                                </div>
                                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', fontStyle: 'italic' }}>
                                    "I feel people tend to associate this with search and so I would look at the extreme top for the CTA."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Version B Feedback */}
                    <div style={{ background: '#fafafa', borderRadius: '16px', padding: '1.5rem' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '1.25rem', textAlign: 'center' }}>Feedback for Version B</h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Amy */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: '#fff' }}>A</div>
                                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginTop: '0.35rem' }}>Amy</p>
                                </div>
                                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', fontStyle: 'italic' }}>
                                    "I like having all my search features in one spot so it makes more sense for me to have it in the filters."
                                </p>
                            </div>

                            {/* Patrick */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: '#fff' }}>P</div>
                                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', marginTop: '0.35rem' }}>Patrick</p>
                                </div>
                                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', fontStyle: 'italic' }}>
                                    "On second thought, it makes more sense in the left-hand column. If this becomes part of my workflow, it would be step 1 of my process."
                                </p>
                            </div>

                            {/* Margaret */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: '#fff' }}>M</div>
                                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginTop: '0.35rem' }}>Margaret</p>
                                </div>
                                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', fontStyle: 'italic' }}>
                                    "I agree, I start my searches with the left-hand side as it's all right there."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="content-text" style={{ marginTop: '1.5rem' }}>
                    <strong>5 out of 7 recruiters preferred Version B over A</strong> as they resonated with the sentiment that it would be a search-related feature independent from filters and would act as its own unique starting point for the search flow.
                </p>
            </section>

            {/* Final Solution Section */}
            <section ref={solutionAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(solutionAnim.isVisible)}>
                <h2 className="content-heading">Final Solution</h2>
                <p className="content-text">
                    Given the tight 3-week timeline for the project, I adopted a rapid iteration approach. I quickly developed a lightweight, high-fidelity prototype that captured the core functionality of the job description parser. This enabled me to conduct early validation and usability testing with our internal focus group. The feedback gathered during these sessions was instrumental in refining the design, ensuring it aligned with user needs and business goals within the constrained timeframe.
                </p>
                <div className="figma-embed-container" style={{ marginTop: '1.5rem' }}>
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        width="100%"
                        height="600"
                        src="https://embed.figma.com/proto/TApUYPgJrqbQgDTZzsJ2lU/Job-Description-Parser?page-id=705%3A66784&node-id=272-12371&viewport=1059%2C45%2C0.16&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=272%3A12371&embed-host=share&scaling=scale-down-width"
                        allowFullScreen
                    />
                </div>
            </section>

            {/* Takeaways Section */}
            <section ref={takeawaysAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(takeawaysAnim.isVisible)}>
                <h2 className="content-heading">Takeaways</h2>
                <p className="content-text">
                    Having one of my first projects being released and receiving positive feedback from our customers was an incredible feeling.
                </p>
                <p className="content-text">
                    I also believe this initiative showcases rapid collaborative effort and synergy amongst cross-functional groups, and the incorporation of swift and budget-friendly user studies within the blueprint of product design. I had the opportunity to test and validate my solutions quickly with the focus groups and it was deemed really effective. So much so that it set a precedence of using focus groups for research in ZoomInfo.
                </p>
                <Image src="/images/slack.webp" alt="Slack feedback" width={600} height={400} className="content-image" style={{ marginTop: '1.5rem', maxWidth: '600px' }} />
            </section>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/work/zoominfo" className="back-link">
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="back-arrow" />
                    Back to ZoomInfo
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
