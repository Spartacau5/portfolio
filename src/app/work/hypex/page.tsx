'use client';

import Link from 'next/link';
import { Header } from '../../components/Header';

export default function HypexPage() {
    const scrollToChallenge = () => {
        const challengeSection = document.getElementById('challenge-section');
        if (challengeSection) {
            challengeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="case-study-page">
            {/* Navigation - Using shared Header component */}
            <Header />

            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero Section */}
            <section className="case-study-hero">
                <h1 className="case-study-title">HYPEX</h1>
                <p className="case-study-company">NFT Trading Game</p>
            </section>

            {/* Divider */}
            <hr className="case-study-divider" />

            {/* Meta + Description Grid */}
            <section className="case-study-meta-section">
                <div className="case-study-meta">
                    {/* My Role */}
                    <div className="meta-block">
                        <span className="meta-label">MY ROLE</span>
                        <p className="meta-value">UI Designer</p>
                    </div>

                    {/* Team */}
                    <div className="meta-block">
                        <span className="meta-label">TEAM</span>
                        <p className="meta-value">Yin Chang, Founder</p>
                    </div>

                    {/* Tools */}
                    <div className="meta-block">
                        <span className="meta-label">TOOLS</span>
                        <p className="meta-value">Figma</p>
                        <p className="meta-value">Photoshop</p>
                        <p className="meta-value">After Effects</p>
                        <p className="meta-value">Blender</p>
                    </div>

                    {/* Timeline */}
                    <div className="meta-block">
                        <span className="meta-label">TIMELINE</span>
                        <p className="meta-value">Sept 2021 - Feb 2022</p>
                    </div>
                </div>

                <div className="case-study-description">
                    {/* Context Only */}
                    <div className="description-block">
                        <span className="meta-label">CONTEXT</span>
                        <p className="description-text">
                            I was hired as a UI Designer on contract by HypeX - an NFT-based startup based in Irvine, California. I spent 4 months as the sole designer of the team, responsible for designing the landing page for HypeX - explaining their product and plans for the future to their advisors, investors and community.
                        </p>
                        <p className="description-text">
                            I worked closely with the CEO, product head and other investors to fully understand HypeX's style and vision. I used Figma to design all the different versions of the UI working with the front-end developer on the team. I also helped design a ton of visuals ranging from social media posts, motion graphics videos and also designed their pop-up booth at Decentralized Miami - one of the biggest startup events for crypto-based projects.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="case-study-cta">
                        <button className="cta-button primary" onClick={scrollToChallenge}>Read Case Study</button>
                        <a href="https://hypex.gg" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                            Website
                            <img src="/images/arrow-angle.svg" alt="" className="cta-arrow" />
                        </a>
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
                        <img src="/images/hypex-mockup.png" alt="HYPEX" className="gallery-image contain" />
                    </div>
                    <div className="gallery-card">
                        <div className="placeholder-content">
                            <span className="placeholder-icon">🎮</span>
                        </div>
                    </div>
                    <div className="gallery-card">
                        <div className="placeholder-content">
                            <span className="placeholder-icon">🃏</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge Section */}
            <section id="challenge-section" className="case-study-content">
                <h2 className="content-heading">Challenge</h2>
                <p className="content-lead">
                    <strong>How might we create an engaging NFT trading experience that appeals to both crypto enthusiasts and casual gamers?</strong>
                </p>
                <p className="content-text">The project presented several key challenges:</p>
                <ul className="content-list">
                    <li>Creating a visual identity that stands out in the crowded NFT space</li>
                    <li>Designing intuitive trading mechanics for users unfamiliar with blockchain</li>
                    <li>Building marketing campaigns that educate while entertaining</li>
                </ul>
            </section>

            {/* Constraints Section */}
            <section className="case-study-content">
                <h2 className="content-heading">Constraints</h2>
                <p className="content-text">
                    Working on HYPEX during the NFT boom meant operating in a rapidly evolving landscape.
                    Market trends shifted quickly, and user expectations were constantly changing.
                </p>
                <p className="content-text">
                    As the sole designer, I had to balance speed with quality, often iterating on designs
                    in real-time based on community feedback and market conditions.
                </p>
            </section>

            {/* Research Section */}
            <section className="case-study-content">
                <h2 className="content-heading">Research</h2>

                <h3 className="content-subheading">Market Analysis</h3>
                <p className="content-text">
                    I conducted extensive research into existing NFT games and trading platforms,
                    identifying patterns that resonated with users and opportunities for differentiation.
                </p>

                <h3 className="content-subheading">Key Insights</h3>
                <p className="content-text italic">
                    Users wanted a seamless onboarding experience that didn't require deep crypto knowledge.
                </p>
                <p className="content-text italic">
                    Visual appeal and card aesthetics were primary drivers of purchase decisions.
                </p>
                <p className="content-text italic">
                    Community features and social proof significantly impacted user engagement.
                </p>
            </section>

            {/* Iterations Section */}
            <section className="case-study-content">
                <h2 className="content-heading">Iterations</h2>

                <h3 className="content-subheading">Brand Identity Development</h3>
                <p className="content-text">
                    The HYPEX brand went through multiple iterations, evolving from a more traditional
                    gaming aesthetic to a bold, futuristic look that captured the energy of the NFT space.
                </p>
                <p className="content-text">
                    The final identity featured vibrant gradients, dynamic typography, and a distinctive
                    visual language that set HYPEX apart from competitors.
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
