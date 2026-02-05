'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import { analytics } from '@/app/components/GoogleAnalytics';

export default function JnJPage() {
    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    const scrollToChallenge = () => {
        const challengeSection = document.getElementById('challenge-section');
        if (challengeSection) {
            challengeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll animation refs
    const processAnim = useScrollAnimation();
    const audienceAnim = useScrollAnimation();
    const iaAnim = useScrollAnimation();
    const wireframeAnim = useScrollAnimation();
    const takeawaysAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">Johnson & Johnson</h1>
                <p className="case-study-company">Annual Reports Design</p>
            </section>

            {/* Divider */}
            <hr className="case-study-divider" />

            {/* Meta + Description Grid */}
            <section className="case-study-meta-section">
                <div className="case-study-meta">
                    {/* My Role */}
                    <div className="meta-block">
                        <span className="meta-label">MY ROLE</span>
                        <p className="meta-value">UI Designer<br />Communication Designer</p>
                    </div>

                    {/* Timeline */}
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value">Oct 2021 - Feb 2022</p>
                    </div>

                    {/* Team */}
                    <div className="meta-block">
                        <span className="meta-label">TEAM</span>
                        <p className="meta-value">
                            <a href="https://www.linkedin.com/in/christopher-holewski-06745b59/" target="_blank" rel="noopener noreferrer" className="meta-link">Christopher Holewski</a><br />Design Lead
                        </p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Adobe XD</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Context Only */}
                    <div className="description-block">
                        <span className="meta-label">CONTEXT</span>
                        <p className="description-text">
                            This project was in collaboration with an incredible design agency <a href="https://www.jkcommsagency.com/" target="_blank" rel="noopener noreferrer" className="content-link">JK Design</a>, for their long-term client: Johnson & Johnson. The goal was to design Johnson & Johnson's <a href="https://healthforhumanityreport.jnj.com/2024/" target="_blank" rel="noopener noreferrer" className="content-link">Health for Humanity Report</a> and <a href="https://www.jnj.com/inclusion" target="_blank" rel="noopener noreferrer" className="content-link">Diversity, Equity, and Inclusion Report</a> for the year 2021 in order to highlight their commitment to global health and inclusion.
                        </p>
                        <p className="description-text">
                            I led the entire redesign with minor UX enhancements for this project, working closely with a design lead from JK.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="case-study-cta">
                        <button className="cta-button primary" onClick={() => { analytics.trackClick('Read Case Study', 'J&J'); scrollToChallenge(); }}>Read Case Study</button>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section ref={processAnim.ref as React.RefObject<HTMLElement>} id="challenge-section" className="case-study-content" style={fadeInUp(processAnim.isVisible)}>
                <h2 className="content-heading">Process</h2>
                <p className="content-text">
                    To start with, I wanted to learn the context for these reports and go through previous years reports to understand what works well and more importantly what doesn't.
                </p>

                <h3 className="content-subheading-large">2020 Site Review</h3>
                <p className="content-text">
                    I started with evaluating the 2020 digital reports and preparing a blueprint for the new websites. During this phase I also compiled recommendations resulting from benchmarking of composite peer-set companies.
                </p>
                <div className="stacked-images">
                    <Image src="/images/2020hp.webp" alt="2020 Health for Humanity Report" width={800} height={500} className="stacked-image" />
                    <Image src="/images/2020nav.webp" alt="2020 Navigation Review" width={800} height={500} className="stacked-image" />
                </div>

                <h3 className="content-subheading">Areas of Improvements</h3>

                <div className="improvement-grid">
                    {/* Visual Impact */}
                    <div className="improvement-card">
                        <div className="improvement-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="6" y="10" width="36" height="28" rx="2" />
                                <circle cx="18" cy="22" r="4" />
                                <path d="M6 32l10-8 6 4 14-12" />
                                <path d="M32 38l8-10" />
                            </svg>
                        </div>
                        <span className="improvement-number">01</span>
                        <h4 className="improvement-title">Visual Impact</h4>
                        <p className="improvement-description">
                            Bold photography, fun icons, and eye-catching infographics. Videos and animated elements like scrolling effects to make everything feel dynamic.
                        </p>
                    </div>

                    {/* Site Navigation */}
                    <div className="improvement-card">
                        <div className="improvement-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="6" y="6" width="36" height="8" rx="2" />
                                <rect x="6" y="18" width="16" height="24" rx="2" />
                                <rect x="26" y="18" width="16" height="24" rx="2" />
                                <path d="M10 10h4M18 10h4M26 10h4" strokeWidth="2" />
                            </svg>
                        </div>
                        <span className="improvement-number">02</span>
                        <h4 className="improvement-title">Site Navigation</h4>
                        <p className="improvement-description">
                            Simplified UX with seamless navigation, avoiding hidden pages. Report hub communicates information in simple, digestible ways.
                        </p>
                    </div>

                    {/* Overall Experience */}
                    <div className="improvement-card">
                        <div className="improvement-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="24" cy="24" r="18" />
                                <path d="M24 14v10l7 7" />
                                <path d="M12 24h4M32 24h4M24 12v4M24 32v4" strokeWidth="1" />
                            </svg>
                        </div>
                        <span className="improvement-number">03</span>
                        <h4 className="improvement-title">Overall Experience</h4>
                        <p className="improvement-description">
                            Increased responsiveness, unique hero images for global representation, report archive, and future-proof URL strategy.
                        </p>
                    </div>
                </div>

                <h3 className="content-subheading-large">Competitive Research</h3>
                <p className="content-text">
                    After researching both online and print versions of reports by 15 companies, I compiled key takeaways and recommendations to discuss with my project lead. The themes of a simplified navigation, visually-appealing graphics, and a strong narrative guiding the report, remained consistent and validated our existing research.
                </p>

                <div className="image-slider">
                    <Image src="/images/comp1.webp" alt="Competitive research 1" width={400} height={300} className="slider-image" />
                    <Image src="/images/comp2.webp" alt="Competitive research 2" width={400} height={300} className="slider-image" />
                    <Image src="/images/comp3.webp" alt="Competitive research 3" width={400} height={300} className="slider-image" />
                    <Image src="/images/comp4.webp" alt="Competitive research 4" width={400} height={300} className="slider-image" />
                    <Image src="/images/comp5.webp" alt="Competitive research 5" width={400} height={300} className="slider-image" />
                    <Image src="/images/comp6.webp" alt="Competitive research 6" width={400} height={300} className="slider-image" />
                    <Image src="/images/comp7.webp" alt="Competitive research 7" width={400} height={300} className="slider-image" />
                    <Image src="/images/comp8.webp" alt="Competitive research 8" width={400} height={300} className="slider-image" />
                </div>

                <h3 className="content-subheading">Key Takeaways</h3>

                <p className="content-text">
                    <strong>1. Insight-Centered Storytelling</strong>
                </p>
                <p className="content-text">
                    Highlight key insights with impactful data visualizations and interactive elements like timelines or comparison graphs to keep users engaged.
                </p>

                <p className="content-text bold-title">
                    <strong>2. Intuitive and Accessible Navigation</strong>
                </p>
                <p className="content-text">
                    Use a simple structure with sticky navigation and accessibility features like font adjustments, dark mode, and screen reader options.
                </p>

                <p className="content-text bold-title">
                    <strong>3. Dynamic Layouts</strong>
                </p>
                <p className="content-text">
                    Keep users engaged with varied page layouts, animations, and parallax scrolling, while offering deeper content via downloadable reports.
                </p>

                <p className="content-text bold-title">
                    <strong>4. Simple, Focused Homepage</strong>
                </p>
                <p className="content-text">
                    Direct users to high-priority sections like highlights or featured articles with a clean, uncluttered design.
                </p>
            </section>

            {/* Understanding our Audiences Section */}
            <section ref={audienceAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(audienceAnim.isVisible)}>
                <h2 className="content-heading">Understanding our Audiences</h2>
                <p className="content-text">
                    After understanding the UI requirements, I connected with stakeholders from JnJ to better understand the target user types for these type of reports and I learnt a lot more than I initially thought this would intended/designed for.
                </p>

                <div className="audience-grid">
                    {/* Investors */}
                    <div className="audience-card">
                        <div className="audience-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="24" cy="14" r="8" />
                                <path d="M12 42v-4c0-6 5-10 12-10s12 4 12 10v4" />
                                <circle cx="36" cy="36" r="8" />
                                <path d="M36 32v8M33 36h6" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 className="audience-title">Investors</h3>
                        <p className="audience-description">
                            Looking for metrics and performance data to determine the quality of J&J as an investment. Also interested in content related to the CEO and strategy for future performance indicators.
                        </p>
                    </div>

                    {/* Policy Makers */}
                    <div className="audience-card">
                        <div className="audience-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M24 4l18 10v4H6v-4L24 4z" />
                                <rect x="10" y="18" width="4" height="20" />
                                <rect x="22" y="18" width="4" height="20" />
                                <rect x="34" y="18" width="4" height="20" />
                                <rect x="6" y="38" width="36" height="4" />
                            </svg>
                        </div>
                        <h3 className="audience-title">Policy Makers</h3>
                        <p className="audience-description">
                            Reviewing J&J's performance on specific issues and comparing them to other players in the industry. Policy makers may use this information to influence new policies or better understand trends in sustainability.
                        </p>
                    </div>

                    {/* Non-Profits */}
                    <div className="audience-card">
                        <div className="audience-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M24 42s-16-10-16-22c0-6 4-12 10-12 4 0 6 3 6 3s2-3 6-3c6 0 10 6 10 12 0 12-16 22-16 22z" />
                                <circle cx="18" cy="26" r="3" />
                                <circle cx="30" cy="26" r="3" />
                                <circle cx="24" cy="18" r="3" />
                            </svg>
                        </div>
                        <h3 className="audience-title">Non-Profits</h3>
                        <p className="audience-description">
                            Interested in partnering with J&J, this audience may be looking at the site to determine what issues J&J focuses on to see if they are a natural partner.
                        </p>
                    </div>

                    {/* Ranking Bodies */}
                    <div className="audience-card">
                        <div className="audience-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M10 8l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" />
                                <path d="M24 8l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" />
                                <path d="M38 8l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" />
                                <circle cx="16" cy="36" r="6" />
                                <rect x="26" y="30" width="16" height="3" rx="1" />
                                <rect x="26" y="36" width="12" height="3" rx="1" />
                                <rect x="26" y="42" width="14" height="3" rx="1" />
                            </svg>
                        </div>
                        <h3 className="audience-title">Ranking Bodies</h3>
                        <p className="audience-description">
                            For ranking bodies who don't request performance data in advance, this audience would be looking to pull data to rank J&J on their scale.
                        </p>
                    </div>

                    {/* Future Employees */}
                    <div className="audience-card">
                        <div className="audience-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="20" cy="14" r="8" />
                                <path d="M8 42v-4c0-6 5-10 12-10s12 4 12 10v4" />
                                <circle cx="38" cy="14" r="8" />
                                <path d="M38 10v8M34 14h8" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 className="audience-title">Future Employees</h3>
                        <p className="audience-description">
                            People considering joining J&J want to know what they stand for and what issues they are championing. They want to understand their values and see if they align with their own.
                        </p>
                    </div>

                    {/* General Population */}
                    <div className="audience-card">
                        <div className="audience-icon">
                            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="24" cy="12" r="6" />
                                <circle cx="10" cy="18" r="5" />
                                <circle cx="38" cy="18" r="5" />
                                <path d="M16 42v-3c0-5 4-8 8-8s8 3 8 8v3" />
                                <path d="M4 42v-2c0-4 3-6 6-6s6 2 6 6v2" />
                                <path d="M32 42v-2c0-4 3-6 6-6s6 2 6 6v2" />
                            </svg>
                        </div>
                        <h3 className="audience-title">General Population</h3>
                        <p className="audience-description">
                            This audience can include people from academia analyzing the report, as well as members of the media looking to report on J&J's successes or failures.
                        </p>
                    </div>
                </div>
            </section>

            {/* Developing Information Architecture Section */}
            <section ref={iaAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(iaAnim.isVisible)}>
                <h2 className="content-heading">Developing Information Architecture</h2>
                <p className="content-text">
                    From our research on past microsites and competitors, I designed 2 versions of the information architecture with simplified navigation, clear language, and intuitive groupings that aligned with user expectations. Since 2020 was a big year in healthcare in terms of COVID and J&J's frontline involvement in developing a vaccine, we wanted to highlight that work and stories but also not take away from all the other important global initiatives they focused on that year including work towards solving HIV, TB, Ebola and more.
                </p>

                <div className="captioned-images">
                    <div className="captioned-image">
                        <Image src="/images/v1.webp" alt="Information Architecture Version A" width={600} height={400} className="stacked-image" />
                        <span className="image-caption">Version A</span>
                    </div>
                    <div className="captioned-image">
                        <Image src="/images/v2.webp" alt="Information Architecture Version B" width={600} height={400} className="stacked-image" />
                        <span className="image-caption">Version B</span>
                    </div>
                </div>

                <p className="content-text">
                    I conducted a quick A/B test with internal designers of JK and stakeholders at J&J to evaluate which version they resonated with. For the navigation, the consensus (8/11) was around <strong>version B</strong> as it had simpler, more accessible language and had equal weight for each nav item. Interestingly, stakeholders preferred the version which didn't focus too heavily on COVID as its own section. We wanted the content and impact to speak the story for itself instead of giving it too much visual hierarchy as its own section in the nav.
                </p>
            </section>

            {/* Wireframing Section */}
            <section ref={wireframeAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(wireframeAnim.isVisible)}>
                <h2 className="content-heading">Wireframing</h2>
                <p className="content-text">
                    I completed pixel-perfect mid-fidelity designs for both mobile and desktop screens, covering every page in the main navigation. These designs were handed off to the team at JK for high-fidelity polish, ensuring a smooth transition in the design process. I then collaborated closely with JK's designers, providing ongoing graphic support and ensuring the visual direction aligned with the project goals. This iterative process ensured a cohesive and polished final product.
                </p>

                {/* Health For Humanity Report Prototype */}
                <div className="prototype-block">
                    <h3 className="prototype-title"><strong>2021 Health For Humanity Report</strong> Mid-Fidelity Prototype</h3>
                    <div className="prototype-embed-grid">
                        <div className="prototype-desktop">
                            <iframe
                                src="https://xd.adobe.com/embed/32ce8e2d-3443-4736-b743-aecdc1b273fc-679d/"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="prototype-mobile">
                            <iframe
                                src="https://xd.adobe.com/embed/38894a35-5e3c-4a2c-8f54-4b4cffcb4c11-6dda/"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                </div>

                {/* Diversity, Equity & Inclusion Report Prototype */}
                <div className="prototype-block">
                    <h3 className="prototype-title"><strong>2021 Diversity, Equity, & Inclusion Report</strong> Mid-Fidelity Prototype</h3>
                    <div className="prototype-embed-grid">
                        <div className="prototype-desktop">
                            <iframe
                                src="https://xd.adobe.com/embed/81907f3e-ea06-4a1a-a5d0-0249b45315f5-d4c3/"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="prototype-mobile">
                            <iframe
                                src="https://xd.adobe.com/embed/1a4e4a38-288d-4741-8bd7-d9f7158846d7-4f1d/"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Takeaways Section */}
            <section ref={takeawaysAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(takeawaysAnim.isVisible)}>
                <h2 className="content-heading">Takeaways</h2>
                <p className="content-text">
                    Working on Johnson & Johnson's website as a fresh graduate was an incredible experience. It was one of my first large-scale projects for a major company, with high expectations and standards. I enjoyed conducting impactful user research, including competitive analysis and A/B testing, and designing the information architecture. Through mid-fidelity designs, I decided the entire hierarchy and layout for the reports, receiving positive validation through constant feedback from the talented designers at JK and J&J. Ultimately, the final prototype for both websites was well received and approved for development, which was very satisfying as I lived up to the team's high standards and contributed to the success of the project.
                </p>
            </section>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/" className="back-link">
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="back-arrow" />
                    Back to Home
                </Link>
                <Link href="/work/hypex" className="back-link">
                    Next: HYPEX
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
