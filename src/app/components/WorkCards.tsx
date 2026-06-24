'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MicrosoftGraffiti } from './MicrosoftGraffiti';
import { ZoomInfoLogoLoop } from './ZoomInfoLogoLoop';
import { analytics } from './GoogleAnalytics';

// Card hover descriptions — kept in sync with the home page cards.
const cardDescriptions: Record<string, { name: string; subtitle: string }> = {
    arrive: { name: 'Arrive', subtitle: 'Transformed fragmented insights into a cohesive 2-year strategy for a $1B+ mobility company.' },
    zoominfo: { name: 'ZoomInfo', subtitle: 'Redesigned the core search experience for a Go-To-Market platform used by 35,000 enterprise customers.' },
    jnj: { name: 'Johnson & Johnson', subtitle: 'Transformed complex global ESG and DEI data into an engaging, compliant visual experience for a Fortune 50 audience.' },
    hypex: { name: 'HYPEX', subtitle: 'Led marketing and design efforts for an NFT-based trading game' },
    microsoft: { name: 'Microsoft', subtitle: "Collab on the future of education with Microsoft's Inclusive Design Team" },
};

export function WorkCards() {
    const [isMicrosoftHovered, setIsMicrosoftHovered] = useState(false);
    const [isMicrosoftAuto, setIsMicrosoftAuto] = useState(false);
    const router = useRouter();
    const lastTapRef = useRef<Record<string, number>>({});
    const isTouchRef = useRef(false);

    // Auto-play the Microsoft card's hover animation in a loop: animate in,
    // hold ~2.6s, animate out, pause, repeat.
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let timer: ReturnType<typeof setTimeout>;
        let on = false;
        const tick = () => {
            on = !on;
            setIsMicrosoftAuto(on);
            timer = setTimeout(tick, on ? 2600 : 1500); // visible 2.6s, hidden 1.5s
        };
        timer = setTimeout(tick, 800);
        return () => clearTimeout(timer);
    }, []);

    // Active when hovered or while the auto-loop is in its "in" phase.
    const isMicrosoftActive = isMicrosoftHovered || isMicrosoftAuto;

    const handleCardClick = (e: React.MouseEvent, href: string) => {
        if (isTouchRef.current) {
            isTouchRef.current = false;
            return;
        }
        if ((e.target as HTMLElement).closest('.card-arrow-btn')) return;
        router.push(href);
    };

    const handleCardTouchEnd = (e: React.TouchEvent, cardKey: string, href: string) => {
        isTouchRef.current = true;
        const now = Date.now();
        const lastTap = lastTapRef.current[cardKey] || 0;
        if (now - lastTap < 300) {
            e.preventDefault();
            router.push(href);
            lastTapRef.current[cardKey] = 0;
        } else {
            lastTapRef.current[cardKey] = now;
        }
    };

    // Slick shared-element transition: the clicked card grows from its current
    // spot to fill the screen, then we navigate and dissolve the overlay to
    // reveal the case study's fullscreen hero video underneath. The overlay is a
    // raw <body> node (not React-managed) so it survives the route change.
    const expandAndNavigate = (cardEl: HTMLElement, href: string) => {
        const rect = cardEl.getBoundingClientRect();
        const overlay = document.createElement('div');
        overlay.className = 'arrive-expand-overlay';
        overlay.style.top = rect.top + 'px';
        overlay.style.left = rect.left + 'px';
        overlay.style.width = rect.width + 'px';
        overlay.style.height = rect.height + 'px';
        overlay.style.borderRadius = '24px';

        const EASE = 'cubic-bezier(0.66, 0, 0.34, 1)';
        const DUR = 620;
        overlay.style.transition =
            `top ${DUR}ms ${EASE}, left ${DUR}ms ${EASE}, width ${DUR}ms ${EASE}, ` +
            `height ${DUR}ms ${EASE}, border-radius ${DUR}ms ${EASE}`;

        // The hero video plays immediately so the card expands straight into the
        // case study — no static-logo intermediate.
        const video = document.createElement('video');
        video.src = '/images/arrive-hero.mp4';
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.className = 'arrive-expand-video';
        overlay.appendChild(video);

        document.body.appendChild(overlay);
        void video.play().catch(() => {});

        // Force a reflow so the starting rect is committed before we expand.
        void overlay.getBoundingClientRect();
        requestAnimationFrame(() => {
            overlay.style.top = '0px';
            overlay.style.left = '0px';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.borderRadius = '0px';
        });

        window.setTimeout(() => router.push(href), DUR);
        window.setTimeout(() => {
            overlay.style.transition = 'opacity 0.45s ease';
            overlay.style.opacity = '0';
            window.setTimeout(() => overlay.remove(), 500);
        }, DUR + 160);
    };

    const handleArriveClick = (e: React.MouseEvent) => {
        if (isTouchRef.current) {
            isTouchRef.current = false;
            return;
        }
        if ((e.target as HTMLElement).closest('.card-arrow-btn')) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            router.push('/work/arrive');
            return;
        }
        expandAndNavigate(e.currentTarget as HTMLElement, '/work/arrive');
    };

    return (
        <div className="container home">
            <div className="grid-top-bar">
                <div className="view-controls-div">
                    <Image src="/images/arrow.svg" alt="" width={16} height={16} className="list-icon" />
                    <div className="caption-text-w-icon">Hover around...</div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Row 1: Arrive + ZoomInfo */}
                {/* Arrive Logo Card */}
                <div className="card-wrapper col-span-1 lg:col-span-6">
                    <div
                        className="arrive-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
                        onClick={handleArriveClick}
                        onTouchEnd={(e) => handleCardTouchEnd(e, 'arrive', '/work/arrive')}
                    >
                        {/* Looping hero video with the white logo + tagline centered */}
                        <div className="arrive-card-media">
                            <video
                                src="/images/arrive-hero.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="arrive-card-video"
                            />
                            <div className="arrive-card-center">
                                <Image
                                    src="/images/arrive-logo.png"
                                    alt="Arrive"
                                    width={192}
                                    height={48}
                                    className="arrive-card-logo"
                                />
                                <div className="arrive-card-tagline">Making cities more liveable</div>
                            </div>
                        </div>
                        {/* Glassy category tags, top-right */}
                        <div className="card-tags">
                            <span className="card-tag">UX Research</span>
                        </div>
                        <p className="project-hover-text">{cardDescriptions.arrive.subtitle}</p>
                        <Link
                            href="/work/arrive"
                            className="card-arrow-btn"
                            onClick={() => analytics.trackCaseStudyView('Arrive')}
                        >
                            <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                        </Link>
                    </div>
                </div>

                {/* ZoomInfo Logo Card */}
                <div className="card-wrapper col-span-1 lg:col-span-6">
                    <div
                        className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
                        onClick={(e) => handleCardClick(e, '/work/zoominfo')}
                        onTouchEnd={(e) => handleCardTouchEnd(e, 'zoominfo', '/work/zoominfo')}
                    >
                        <ZoomInfoLogoLoop />
                        {/* Glassy category tag, top-right (dark variant for the light card) */}
                        <div className="card-tags">
                            <span className="card-tag card-tag--dark">UX/UI Design</span>
                        </div>
                        <p className="project-hover-text">{cardDescriptions.zoominfo.subtitle}</p>
                        <Link
                            href="/work/zoominfo"
                            className="card-arrow-btn"
                            onClick={() => analytics.trackCaseStudyView('ZoomInfo')}
                        >
                            <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                        </Link>
                    </div>
                </div>

                {/* Row 2: J&J + Microsoft stacked on left, HYPEX tall on right */}
                {/* Left Column: J&J + Microsoft stacked */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">
                    {/* Johnson & Johnson Logo Card */}
                    <div className="card-wrapper flex-1">
                        <div
                            className="jnj-card grid-card h-full bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[16rem] lg:min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer"
                            onClick={(e) => handleCardClick(e, '/work/jnj')}
                            onTouchEnd={(e) => handleCardTouchEnd(e, 'jnj', '/work/jnj')}
                        >
                            <Image src="/images/jnj-logo.png" alt="Johnson & Johnson" width={320} height={80} className="jnj-logo w-44 lg:w-72" />
                            <div className="card-tags">
                                <span className="card-tag card-tag--dark">UX/UI Design</span>
                            </div>
                            <p className="project-hover-text">{cardDescriptions.jnj.subtitle}</p>
                            <Link
                                href="/work/jnj"
                                className="card-arrow-btn"
                                onClick={() => analytics.trackCaseStudyView('Johnson & Johnson')}
                            >
                                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                            </Link>
                        </div>
                    </div>

                    {/* Microsoft Card */}
                    <div className="card-wrapper flex-1">
                        <div
                            className={`microsoft-card grid-card h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer relative flex items-center justify-center min-h-[16rem] lg:min-h-[20rem] ${isMicrosoftActive ? 'is-hovered' : ''}`}
                            onMouseEnter={() => setIsMicrosoftHovered(true)}
                            onMouseLeave={() => setIsMicrosoftHovered(false)}
                            onClick={(e) => handleCardClick(e, '/work/microsoft')}
                            onTouchEnd={(e) => handleCardTouchEnd(e, 'microsoft', '/work/microsoft')}
                        >
                            {/* Animated graffiti background */}
                            <div className="microsoft-bg-container">
                                <MicrosoftGraffiti isHovered={isMicrosoftActive} />
                            </div>

                            <div className="card-tags" style={{ zIndex: 20 }}>
                                <span className="card-tag card-tag--dark">UX Research</span>
                            </div>

                            {/* Logo with white background and animated text */}
                            <div className="microsoft-content relative z-10 flex flex-col items-center">
                                <div className="microsoft-logo-container">
                                    <Image src="/images/microsoft-full-logo.png" alt="Microsoft" width={128} height={28} className="w-32" />
                                </div>
                                <p className="microsoft-hover-text">Designed an AI-Powered Assistant for Specialized Educators.</p>
                            </div>

                            <Link
                                href="/work/microsoft"
                                className="card-arrow-btn"
                                onClick={() => analytics.trackCaseStudyView('Microsoft')}
                            >
                                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column: HYPEX Card - Full height to match J&J + Microsoft */}
                <div className="card-wrapper col-span-1 lg:col-span-6">
                    <div
                        className="hypex-card hypex-tall grid-card bg-white rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative flex items-center justify-center overflow-hidden group cursor-pointer"
                        onClick={(e) => handleCardClick(e, '/work/hypex')}
                        onTouchEnd={(e) => handleCardTouchEnd(e, 'hypex', '/work/hypex')}
                    >
                        <Image src="/images/hypex-mockup.png" alt="HYPEX" width={400} height={400} className="w-full h-full object-contain relative z-10" />

                        <div className="card-tags" style={{ zIndex: 20 }}>
                            <span className="card-tag card-tag--dark">UI Design</span>
                        </div>

                        {/* Marquee background effect */}
                        <div className="hypex-marquee-container">
                            <div className="hypex-marquee-wrapper">
                                {[...Array(18)].map((_, rowIndex) => (
                                    <div key={rowIndex} className={`hypex-marquee-row ${rowIndex % 2 === 0 ? 'left' : 'right'}`}>
                                        {[...Array(12)].map((_, i) => (
                                            <span key={i} className={`hypex-marquee-text ${i % 3 === 1 ? 'bold' : ''}`}>HYPEX</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description below the mockup, revealed on hover */}
                        <p className="project-hover-text hypex-hover-text">{cardDescriptions.hypex.subtitle}</p>

                        <Link
                            href="/work/hypex"
                            className="card-arrow-btn"
                            onClick={() => analytics.trackCaseStudyView('HypeX')}
                        >
                            <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
