'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';

export default function MicrosoftPage() {
    const scrollToPrototype = () => {
        const prototypeSection = document.getElementById('prototype-section');
        if (prototypeSection) {
            prototypeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll animation refs for each section
    const backgroundAnim = useScrollAnimation();
    const solutionAnim = useScrollAnimation();
    const researchAnim = useScrollAnimation();
    const problemsAnim = useScrollAnimation();
    const opportunityAnim = useScrollAnimation();
    const competitiveAnim = useScrollAnimation();
    const principlesAnim = useScrollAnimation();
    const prototypeAnim = useScrollAnimation();
    const takeawaysAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">Microsoft</h1>
                <p className="case-study-company">Designing an AI-Powered Assistant for Specialized Educators</p>
            </section>

            {/* Divider */}
            <hr className="case-study-divider" />

            {/* Meta + Description Grid */}
            <section className="case-study-meta-section">
                <div className="case-study-meta">
                    {/* My Role */}
                    <div className="meta-block">
                        <span className="meta-label">MY ROLE</span>
                        <p className="meta-value">UX Researcher<br />UI Designer</p>
                    </div>

                    {/* Team */}
                    <div className="meta-block">
                        <span className="meta-label">TEAM</span>
                        <p className="meta-value">Alana Rhodin<br />Yash Sonwaney<br />Azelia Shankar</p>
                    </div>

                    {/* Stakeholders */}
                    <div className="meta-block">
                        <span className="meta-label">STAKEHOLDERS</span>
                        <p className="meta-value">
                            <a href="https://www.linkedin.com/in/christina-mallon-019ab911/" target="_blank" rel="noopener noreferrer" className="meta-link">Christina Mallon</a><br />Head of Inclusive Design<br /><br />
                            <a href="https://www.linkedin.com/in/brycejohnson/" target="_blank" rel="noopener noreferrer" className="meta-link">Bryce Johnson</a><br />Principal Inclusive Designer
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value">January - May 2025</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Description */}
                    <div className="description-block">
                        <span className="meta-label">DESCRIPTION</span>
                        <p className="description-text">
                        A research and design project exploring how trustworthy AI can support specialized educators working with underserved student populations. The work focused on identifying systemic pain points in elementary education and translating them into ethical, scalable AI-driven interventions.
                        </p>
                    </div>

                    {/* Context */}
                    <div className="description-block">
                        <span className="meta-label">CONTEXT</span>
                        <p className="description-text">
                        Conducted as part of Parsons’ External Engagement Studio, a six-month, industry partnered graduate course. Our team worked directly with Microsoft mentors in a professional studio model, navigating ambiguity through iterative research, critique, and prototyping. The engagement emphasized real world constraints, cross-disciplinary collaboration, and production-level thinking.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="case-study-cta">
                        <a href="/Bridgit Final.pdf" target="_blank" rel="noopener noreferrer" className="cta-button primary">View Final Pitch</a>
                        <button className="cta-button secondary" onClick={scrollToPrototype}>View Final Prototype</button>
                    </div>
                </div>
            </section>

            {/* Background Section */}
            <section ref={backgroundAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(backgroundAnim.isVisible)}>
                <h2 className="content-heading">Background</h2>
                <p className="content-text">
                    Specialized educators including ESL teachers, speech pathologists, special education coordinators, face impossible demands. They juggle multiple classrooms, manage complex schedules, and serve students with different needs, all while drowning in administrative overhead.
                </p>
                <p className="content-text">
                    We conducted a 6-month mixed-methods study to understand how AI could support these underserved educators without compromising their expertise or agency.
                </p>
            </section>

            {/* Final Solution Section */}
            <section ref={solutionAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(solutionAnim.isVisible)}>
                <h2 className="content-heading">Final Solution</h2>
                <video
                    className="process-video"
                    controls
                    width="100%"
                >
                    <source src="/Final4Portfolio.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </section>

            {/* Research Section */}
            <section ref={researchAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(researchAnim.isVisible)}>
                <h2 className="content-heading">Research</h2>
                <p className="content-text">
                    Rather than assuming technology solutions, we led with foundational research to understand the human rhythms of teaching before designing any intervention. We moved systematically from raw educator voices to strategic business recommendations using a rigorous research continuum.
                </p>

                <h3 className="content-subheading">Primary Research Question</h3>
                <div className="research-question-box">
                    <p>How might we support elementary educators with an AI tool that reduces burden and enhances collaboration, without compromising agency or trust?</p>
                </div>

                <h3 className="content-subheading">Methods Used</h3>
                <div className="methods-grid">
                    {/* Literature Review */}
                    <div className="method-card">
                        <div className="method-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="6" width="24" height="32" rx="2" stroke="#111" strokeWidth="2"/>
                                <rect x="16" y="10" width="24" height="32" rx="2" fill="white" stroke="#111" strokeWidth="2"/>
                                <line x1="21" y1="18" x2="35" y2="18" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                                <line x1="21" y1="24" x2="35" y2="24" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                                <line x1="21" y1="30" x2="31" y2="30" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <span className="method-label">Literature Review</span>
                    </div>

                    {/* Stakeholder Interviews */}
                    <div className="method-card">
                        <div className="method-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="16" r="8" stroke="#111" strokeWidth="2"/>
                                <path d="M10 40C10 32.268 16.268 26 24 26C31.732 26 38 32.268 38 40" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M32 12L38 8M38 8V14M38 8H32" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="method-label">Stakeholder Interviews</span>
                    </div>

                    {/* Co-design Workshops */}
                    <div className="method-card">
                        <div className="method-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="14" r="6" stroke="#111" strokeWidth="2"/>
                                <circle cx="32" cy="14" r="6" stroke="#111" strokeWidth="2"/>
                                <circle cx="24" cy="28" r="6" stroke="#111" strokeWidth="2"/>
                                <path d="M8 38C8 33.582 11.582 30 16 30" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M32 30C36.418 30 40 33.582 40 38" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M18 42C18 38.686 20.686 36 24 36C27.314 36 30 38.686 30 42" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <span className="method-label">Co-design Workshops</span>
                    </div>

                    {/* Usability Testing */}
                    <div className="method-card">
                        <div className="method-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="6" y="8" width="36" height="24" rx="2" stroke="#111" strokeWidth="2"/>
                                <line x1="6" y1="32" x2="42" y2="32" stroke="#111" strokeWidth="2"/>
                                <path d="M20 40H28" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M24 32V40" stroke="#111" strokeWidth="2"/>
                                <circle cx="16" cy="20" r="4" stroke="#111" strokeWidth="2"/>
                                <path d="M26 16L32 22M32 16L26 22" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <span className="method-label">Usability Testing</span>
                    </div>
                </div>

                <h3 className="content-subheading">Participants</h3>
                <p className="content-text">
                    We conducted 15+ stakeholder interviews across NYC, CA, PA, and TX school districts to get an initial understanding of how the education system operates and to identify any shared pain points.
                </p>
                <Image src="/images/participants.png" alt="Research Participants" width={800} height={500} className="content-image" />

                <p className="content-text" style={{ marginTop: '2.5rem' }}>
                    We also facilitated Co-Design Workshops (7 sessions across 3 rounds, 60-75 minutes each) which ensured our solution was built with and for teachers every step of the process from ideation to prototype.
                </p>
                <div className="stacked-images">
                    <Image src="/images/codesign1.png" alt="Co-Design Workshop 1" width={800} height={500} className="content-image" />
                    <Image src="/images/codesign2.png" alt="Co-Design Workshop 2" width={800} height={500} className="content-image" />
                </div>
            </section>

            {/* Problems Identified Section */}
            <section ref={problemsAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(problemsAnim.isVisible)}>
                <h2 className="content-heading">Problems Identified</h2>
                <p className="content-text">
                    Our research revealed a system under immense strain. The data painted a clear picture, and the voices of educators, parents, and administrators brought it to life.
                </p>

                <div className="problem-insight">
                    <div className="insight-stat">
                        <span className="stat-number">15<span className="stat-unit">hours</span></span>
                        <p className="stat-description">Elementary teachers spend an average of 15 hours outside the classroom each week on planning and preparation, 12 of which are unpaid.</p>
                    </div>
                    <div className="insight-quote">
                        <div className="quote-icon-small">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12C5 8.686 7.686 6 11 6V8C8.791 8 7 9.791 7 12V13H11V18H5V12Z" fill="#3B82F6"/>
                                <path d="M13 12C13 8.686 15.686 6 19 6V8C16.791 8 15 9.791 15 12V13H19V18H13V12Z" fill="#3B82F6"/>
                            </svg>
                        </div>
                        <p className="quote-text">"I'm juggling six classrooms. My 'planning period' is 15-20 minutes long per classroom, and I usually don't have enough time as I would need."</p>
                        <span className="quote-attribution">- Speech Pathologist, NYC</span>
                    </div>
                </div>

                <div className="problem-insight">
                    <div className="insight-stat">
                        <span className="stat-number">40<span className="stat-unit">%</span></span>
                        <p className="stat-description">Teacher turnover rates at a 20-year high, with more than 40% of new teachers leaving the profession within their first five years.</p>
                    </div>
                    <div className="insight-quote">
                        <div className="quote-icon-small">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12C5 8.686 7.686 6 11 6V8C8.791 8 7 9.791 7 12V13H11V18H5V12Z" fill="#3B82F6"/>
                                <path d="M13 12C13 8.686 15.686 6 19 6V8C16.791 8 15 9.791 15 12V13H19V18H13V12Z" fill="#3B82F6"/>
                            </svg>
                        </div>
                        <p className="quote-text">"Teachers could use help communicating with parents. Inconsistent use of technology from the teachers is harming the kids."</p>
                        <span className="quote-attribution">- Mother of 3, CA</span>
                    </div>
                </div>

                <div className="standalone-quote">
                    <div className="quote-icon-small">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12C5 8.686 7.686 6 11 6V8C8.791 8 7 9.791 7 12V13H11V18H5V12Z" fill="#3B82F6"/>
                            <path d="M13 12C13 8.686 15.686 6 19 6V8C16.791 8 15 9.791 15 12V13H19V18H13V12Z" fill="#3B82F6"/>
                        </svg>
                    </div>
                    <h4 className="quote-category">The Bigger Question</h4>
                    <p className="quote-text">"How is this (AI in education) gonna happen? Where is the funding gonna come from? How are you gonna train the staff?"</p>
                    <span className="quote-attribution">- Elementary School Principal</span>
                </div>
            </section>

            {/* Opportunity Areas Section */}
            <section ref={opportunityAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(opportunityAnim.isVisible)}>
                <h2 className="content-heading">Opportunity Areas</h2>

                <div className="opportunity-grid">
                    <div className="opportunity-card">
                        <div className="opportunity-header">
                            <div className="opportunity-number">1</div>
                            <h3 className="opportunity-title">Productivity</h3>
                        </div>
                        <div className="opportunity-content">
                            <p className="opportunity-description">Teachers need a way to handle admin and planning tasks more efficiently.</p>
                            <p className="opportunity-quote">"One of the really annoying things that I had to do as a speech therapist in a school is make my own schedule...I feel that AI would be beneficial in helping the providers, the clinicians, [and] the teachers complete the documentation and their admin work."</p>
                        </div>
                        <div className="opportunity-image">
                            <Image src="/images/opportunity-1.svg" alt="Productivity" width={120} height={120} />
                        </div>
                    </div>

                    <div className="opportunity-card">
                        <div className="opportunity-header">
                            <div className="opportunity-number">2</div>
                            <h3 className="opportunity-title">Communication</h3>
                        </div>
                        <div className="opportunity-content">
                            <p className="opportunity-description">Teachers need a way to better communicate and collaborate.</p>
                            <p className="opportunity-quote">"Sometimes specialists and class teachers don't meet for weeks, it's very per-needs basis and this lack of communication can dampen the child's progress."</p>
                        </div>
                        <div className="opportunity-image">
                            <Image src="/images/opportunity-2.svg" alt="Communication" width={120} height={120} />
                        </div>
                    </div>

                    <div className="opportunity-card">
                        <div className="opportunity-header">
                            <div className="opportunity-number">3</div>
                            <h3 className="opportunity-title">Personalization</h3>
                        </div>
                        <div className="opportunity-content">
                            <p className="opportunity-description">Teachers need a way to easily create personalized learning plans.</p>
                            <p className="opportunity-quote">"How do you differentiate instruction for that range of kids? That is hugely time consuming for teachers...actually creating the lesson plans based on the kids needs. I think AI has a huge application there."</p>
                        </div>
                        <div className="opportunity-image">
                            <Image src="/images/opportunity-3.svg" alt="Personalization" width={120} height={120} />
                        </div>
                    </div>

                    <div className="opportunity-card">
                        <div className="opportunity-header">
                            <div className="opportunity-number">4</div>
                            <h3 className="opportunity-title">Student Achievement</h3>
                        </div>
                        <div className="opportunity-content">
                            <p className="opportunity-description">Teachers need support to address diverse learning needs and facilitating an equitable learning experience.</p>
                            <p className="opportunity-quote">"I look at my kindergarten students from 30 years ago - they were so ready for first grade. And not so much right now because they've taken play out of the kindergarten classroom. You can't put just AI instruction into a kindergarten classroom, they need play as part of their learning."</p>
                        </div>
                        <div className="opportunity-image">
                            <Image src="/images/opportunity-4.svg" alt="Student Achievement" width={120} height={120} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Competitive Research Section */}
            <section ref={competitiveAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={{ paddingBottom: '1rem', ...fadeInUp(competitiveAnim.isVisible) }}>
                <h2 className="content-heading">Competitive Research</h2>
                <p className="content-text">
                    We examined current AI education tools but we quickly found these platforms generalize and try to address foundational classroom needs, but not so much as specialized educators and their needs.
                </p>
                <Image src="/images/comp.png" alt="Competitive Research" width={1200} height={600} className="content-image" style={{ marginTop: '1.5rem', width: '100%', maxWidth: 'none' }} />
            </section>

            {/* Co-Design Principles Section */}
            <section ref={principlesAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={{ paddingBottom: '1rem', ...fadeInUp(principlesAnim.isVisible) }}>
                <h2 className="content-heading">Co-Design Principles</h2>
                <p className="content-text">
                    Now that we had a concept in mind, but we before we started designing we needed a guide to our process. So, we co-created principles that prioritize ethics, adaptability, and educator empowerment and set the foundation of the value we were trying to embody as a product and organization.
                </p>
                <Image src="/images/cdp.png" alt="Co-Design Principles" width={1200} height={600} className="content-image" style={{ marginTop: '1.5rem', width: '100%', maxWidth: 'none' }} />
            </section>

            {/* Final Prototype Section */}
            <section ref={prototypeAnim.ref as React.RefObject<HTMLElement>} id="prototype-section" className="case-study-content" style={fadeInUp(prototypeAnim.isVisible)}>
                <h2 className="content-heading">Final Prototype</h2>
                <div className="figma-embed-container">
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        width="100%"
                        height="600"
                        src="https://embed.figma.com/proto/C41mcAy9zcHvRYnNSftE7W/Microsoft---EES?page-id=331%3A7645&node-id=331-10477&viewport=263%2C139%2C0.16&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=331%3A10477&show-proto-sidebar=1&embed-host=share"
                        allowFullScreen>
                    </iframe>
                </div>

                <div className="key-enablements-section">
                    <h3 className="content-subheading">Key Enablements validated through Research</h3>
                    <div className="enablements-grid">
                        <div className="enablement-card">
                            <div className="enablement-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20 21C20 16.58 16.42 13 12 13C7.58 13 4 16.58 4 21" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className="enablement-text">Personalize instruction for every student.</p>
                        </div>
                        <div className="enablement-card">
                            <div className="enablement-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className="enablement-text">Easily coordinate with classroom teachers to manage student sessions and progress.</p>
                        </div>
                        <div className="enablement-card">
                            <div className="enablement-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17L12 22L22 17" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12L12 17L22 12" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className="enablement-text">Streamline administrative tasks with an AI assistant</p>
                        </div>
                        <div className="enablement-card">
                            <div className="enablement-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 18H12.01" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className="enablement-text">Enables communication & coordination on the go with mobile version</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Takeaways Section */}
            <section ref={takeawaysAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(takeawaysAnim.isVisible)}>
                <h2 className="content-heading">Takeaways</h2>
                <p className="content-text">
                    Strategic research drives business strategy not just validates design decisions. By starting with human needs rather than technology capabilities, we discovered underserved communities and built solutions that truly matter.
                </p>
                <p className="content-text">
                    The most impactful UX research doesn't just inform product decisions; it reframes entire problem spaces. This project demonstrated that systematic, human-centered research can fundamentally shift how organizations think about problems, leading to more meaningful and impactful solutions.
                </p>
                <video
                    className="process-video"
                    controls
                    width="100%"
                    style={{ marginTop: '1.5rem' }}
                >
                    <source src="/bridgit.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </section>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/" className="back-link">
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="back-arrow" />
                    Back to Home
                </Link>
                <Link href="/work/arrive" className="back-link">
                    Next: Arrive
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
