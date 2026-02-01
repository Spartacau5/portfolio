'use client';

import Link from 'next/link';

export default function ArrivePage() {
    return (
        <div className="case-study-page">
            {/* Navigation */}
            <nav className="case-study-nav">
                <div className="nav-pill">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/about" className="nav-link">About</Link>
                    <Link href="/work/arrive" className="nav-link active">
                        <span className="nav-dot"></span>
                        Work
                    </Link>
                    <Link href="/contact" className="nav-link">Contact</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">Arrive</h1>
                <p className="case-study-company">Mobility Solutions</p>
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
                        <p className="meta-value">Product Team</p>
                        <p className="meta-value">Engineering Team</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value link">Figma</p>
                        <p className="meta-value link">Miro</p>
                        <p className="meta-value link">Notion</p>
                    </div>

                    {/* Timeline */}
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value link">2023–2024</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Description */}
                    <div className="description-block">
                        <span className="meta-label">DESCRIPTION</span>
                        <p className="description-text">
                            Defining the future of mobility solutions through user-centered research and design,
                            creating seamless experiences for urban transportation.
                        </p>
                    </div>

                    {/* Context */}
                    <div className="description-block">
                        <span className="meta-label">CONTEXT</span>
                        <p className="description-text">
                            I joined Arrive as a UX Researcher to help understand user needs and behaviors
                            in the mobility space. My role involved conducting user interviews, synthesizing
                            research findings, and translating insights into actionable design recommendations.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="case-study-cta">
                        <button className="cta-button primary">Read Case Study</button>
                        <button className="cta-button secondary">
                            Website
                            <img src="/images/arrow-angle.svg" alt="" className="cta-arrow" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Click around hint */}
            <div className="click-around-hint">
                <span className="hint-arrow">▶</span>
                <span className="hint-text">Click around...</span>
            </div>

            {/* Image Gallery Grid */}
            <section className="case-study-gallery">
                <div className="gallery-grid">
                    <div className="gallery-card large">
                        <img src="/images/arrive-logo.png" alt="Arrive" className="gallery-image contain" />
                    </div>
                    <div className="gallery-card">
                        <div className="placeholder-content">
                            <span className="placeholder-icon">⌘</span>
                            <span className="placeholder-dot">•</span>
                        </div>
                    </div>
                    <div className="gallery-card phone-mockup">
                        <div className="phone-frame">
                            <img src="/images/arrive-logo.png" alt="App Preview" className="phone-screen" />
                        </div>
                    </div>
                </div>

                <div className="gallery-grid secondary">
                    <div className="gallery-card calendar-card">
                        <span className="card-label">AVAILABILITY CALENDAR</span>
                        <h3 className="card-title">Monday, Nov 21st</h3>
                        <div className="calendar-mini">
                            <div className="calendar-row">
                                <span>Sun</span>
                                <span className="today">Mon 21</span>
                                <span className="highlight">Tue 22</span>
                                <span className="highlight">Wed 23</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                            </div>
                        </div>
                        <div className="duration-row">
                            <span className="duration-icon">⏱</span>
                            <span className="duration-text">60 minutes</span>
                        </div>
                    </div>
                    <div className="gallery-card preview-card">
                        <span className="card-label">AVAILABILITY PREVIEW</span>
                        <p className="preview-text">Here are some times I'm available this week (all PST):</p>
                        <ul className="time-list">
                            <li>Mon (Nov 21): 9 AM, 11 AM</li>
                            <li>Tue (Nov 22): 10 AM, 11 AM, 1 PM</li>
                            <li>Wed (Nov 23): 9 AM, 10 AM, 11 AM</li>
                        </ul>
                        <a href="#" className="book-link">or you can book some time here ↗</a>
                    </div>
                </div>
            </section>

            {/* Challenge Section */}
            <section className="case-study-content">
                <h2 className="content-heading">Challenge</h2>
                <p className="content-lead">
                    <strong>How might we create a way for people to share availability in plain-text format?</strong>
                </p>
                <p className="content-text">I was provided the following needs and constraints:</p>
                <ul className="content-list">
                    <li>a way for users to generate plain-text availability from a set of rules</li>
                    <li>must be accessible from anywhere on their computer at any time</li>
                    <li>interface must be able to scale past availability and support unrelated commands/actions</li>
                </ul>
            </section>

            {/* Constraints Section */}
            <section className="case-study-content">
                <h2 className="content-heading">Constraints</h2>
                <p className="content-text">
                    Working as the only designer at an early-stage startup while moving to a new city during the middle of a
                    pandemic brought its own set of personal and professional challenges. I'd be remiss to not mention that
                    here first and foremost.
                </p>
                <p className="content-text">
                    During my 2.5 years at CommandDot, I was all things design. This included design across the entire
                    product, research, ui/ux, branding, marketing, website design & development (thanks Webflow),
                    onboarding, dashboards, emails + an overwhelming amount of other shelved ideas that still live scattered
                    throughout my Figma files today.
                </p>
            </section>

            {/* Research Section */}
            <section className="case-study-content">
                <h2 className="content-heading">Research</h2>

                <h3 className="content-subheading">Interviews</h3>
                <p className="content-text">
                    After our team conducted a series of interviews, we were able to understand scheduler motivations and
                    the blockers/pain points that exist during the scheduling and booking experience.
                </p>

                <h3 className="content-subheading">Key user stories</h3>
                <p className="content-text italic">
                    As a scheduler, I want to share my availability without tabbing back-and-forth to my calendar.
                </p>
                <p className="content-text italic">
                    As a scheduler, I want to share my availability without manually typing it out.
                </p>
                <p className="content-text italic">
                    As a scheduler, I want a way to customize my availability based on my schedule and the person I'm meeting with.
                </p>
            </section>

            {/* Iterations Section */}
            <section className="case-study-content">
                <h2 className="content-heading">Iterations</h2>

                <h3 className="content-subheading">Command Line Interface to generate Plain-Text Availability</h3>
                <p className="content-text">
                    CommandDot was conceptualized as a Command Line Interface that can do a variety of tasks and actions
                    from anywhere on your computer—with the plan to quickly expand beyond availability-focused commands.
                </p>
                <p className="content-text">
                    With this being the case, I first designed a modern availability-focused CLI with room to grow beyond
                    scheduling. This first iteration of our user interface helped us begin testing and iterating.
                </p>
            </section>

            {/* Back to Home Link */}
            <div className="back-to-home">
                <Link href="/" className="back-link">
                    <img src="/images/arrow-angle.svg" alt="" className="back-arrow" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
