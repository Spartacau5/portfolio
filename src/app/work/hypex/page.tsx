'use client';

import Link from 'next/link';
import { useScrollAnimation, fadeInUp } from '@/app/hooks/useScrollAnimation';

export default function HypexPage() {
    const scrollToChallenge = () => {
        const challengeSection = document.getElementById('challenge-section');
        if (challengeSection) {
            challengeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll animation refs
    const galleryAnim = useScrollAnimation();
    const challengeAnim = useScrollAnimation();
    const moodboardAnim = useScrollAnimation();
    const wireframeAnim = useScrollAnimation();

    return (
        <div className="case-study-page">
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
                        <a href="https://www.hypex.io" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                            Website
                            <img src="/images/arrow-angle.svg" alt="" className="cta-arrow" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Video Showcase */}
            <section ref={galleryAnim.ref as React.RefObject<HTMLElement>} className="case-study-gallery" style={fadeInUp(galleryAnim.isVisible)}>
                <div className="video-showcase">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="showcase-video"
                    >
                        <source src="/images/hypex.webm" type="video/webm" />
                    </video>
                </div>
                <div className="showcase-caption">First time using Blender after school!</div>
            </section>

            {/* Challenge Section */}
            <section ref={challengeAnim.ref as React.RefObject<HTMLElement>} id="challenge-section" className="case-study-content" style={fadeInUp(challengeAnim.isVisible)}>
                <h2 className="content-heading">Challenge</h2>
                <p className="content-text">
                    The team's expectation was for a progressive, cutting edge landing page which really delivers their vision and connects with their user persona of sneakerheads who get attracted to strong and trendy designs.
                </p>
                <p className="content-lead">
                    <strong>I was provided a rough mockup of the team's vision.</strong>
                </p>
                <div className="reference-images">
                    <img src="/images/reference1.avif" alt="Reference mockup 1" className="reference-image" />
                    <img src="/images/reference2.avif" alt="Reference mockup 2" className="reference-image" />
                </div>
                <p className="content-text">
                    The team shared with me their existing wireframes and it was a very basic skeleton which was put together by the CEO and their marketing team when they initially started back in early 2021.
                </p>
                <p className="content-text">
                    This gave me a simple base with ideas and some direction on art style to start off of, as it provided me with the content I had to display in the landing page and also some stylistic elements that they really wanted to keep such as the Nike AirMag.
                </p>
            </section>

            {/* Moodboard Section */}
            <section ref={moodboardAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(moodboardAnim.isVisible)}>
                <h2 className="content-heading">Moodboard</h2>
                <p className="content-text">
                    Right from the beginning, I wanted a clear vision of the team's expectations on how to visually represent HypeX to the world. I set out to create a Moodboard which took inspiration from the most followed crypto projects in the world at the time.
                </p>
                <div className="moodboard-image-container">
                    <img src="/images/moodboard.webp" alt="HypeX Moodboard" className="moodboard-image" />
                </div>
                <p className="content-text">
                    I noticed there was a lot of focus on environment design where a mixture of impressive elements come together to create a whole ecosystem which you get transported to instead of just a static web page. This inspired me to take that space galaxy vibe to another level of immersion using 3D elements mixed with 2D.
                </p>
            </section>

            {/* Wireframing Section */}
            <section ref={wireframeAnim.ref as React.RefObject<HTMLElement>} className="case-study-content" style={fadeInUp(wireframeAnim.isVisible)}>
                <h2 className="content-heading">Wireframing</h2>

                <h3 className="content-subheading">Low-Fidelity</h3>
                <p className="content-text">
                    I started with redesigning the old version I was provided (or v0 as I called it) into a low/mid-fidelity version to better understand the layout, structure and flow of the landing page.
                </p>

                <div className="lowfi-gallery">
                    <img src="/images/lowfi1.avif" alt="Low-fidelity wireframe 1" className="lowfi-main" />
                    <div className="lowfi-grid">
                        <img src="/images/lowfi2.avif" alt="Low-fidelity wireframe 2" className="lowfi-thumb" />
                        <img src="/images/lowfi3.avif" alt="Low-fidelity wireframe 3" className="lowfi-thumb" />
                        <img src="/images/lowfi4.avif" alt="Low-fidelity wireframe 4" className="lowfi-thumb" />
                        <img src="/images/lowfi5.avif" alt="Low-fidelity wireframe 5" className="lowfi-thumb" />
                    </div>
                </div>

                <h3 className="content-subheading">High Fidelity v1</h3>
                <p className="content-text">
                    Once the layout was approved, I designed a high fidelity version which our developers could adopt quickly since time was a major constraint.
                </p>
                <div className="highfi-image-container">
                    <img src="/images/highfi.webp" alt="High-fidelity design v1" className="highfi-image" />
                </div>

                <h3 className="content-subheading">Final Version</h3>
                <p className="content-text">
                    Once we satisfied investors with a basic version of what HypeX does, I designed a final version which hit that immersive space environment I wanted to achieve. Our young team of college developers worked hard to bring the designs to life using React components which you can check out at <a href="https://www.hypex.io" target="_blank" rel="noopener noreferrer" className="content-link">www.hypex.io</a>
                </p>
                <div className="highfi-image-container">
                    <img src="/images/finalhighfi.webp" alt="Final high-fidelity design" className="highfi-image" />
                </div>
            </section>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/" className="back-link">
                    <img src="/images/arrow-angle.svg" alt="" className="back-arrow" />
                    Back to Home
                </Link>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="back-link"
                >
                    Go to top
                    <img src="/images/arrow-angle.svg" alt="" className="top-arrow" />
                </button>
            </div>
        </div>
    );
}
