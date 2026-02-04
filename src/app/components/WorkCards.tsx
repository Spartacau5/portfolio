'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MicrosoftGraffiti } from './MicrosoftGraffiti';

// Card data for focus state
const cardDescriptions: Record<string, { name: string; subtitle: string }> = {
    arrive: { name: 'Arrive', subtitle: 'Defining the future of mobility solutions' },
    zoominfo: { name: 'ZoomInfo', subtitle: 'Redesigned how sales & marketing teams hit their number worldwide' },
    jnj: { name: 'Johnson & Johnson', subtitle: 'Designed JnJ\'s 2021 Healthy for Humanity & DEI Reports' },
    hypex: { name: 'HYPEX', subtitle: 'Led marketing and design efforts for an NFT-based trading game' },
    microsoft: { name: 'Microsoft', subtitle: "Collab on the future of education with Microsoft's Inclusive Design Team" },
};

export function WorkCards() {
    const [focusedCard, setFocusedCard] = useState<string | null>(null);
    const [isZoominfoHovered, setIsZoominfoHovered] = useState(false);
    const [isMicrosoftHovered, setIsMicrosoftHovered] = useState(false);
    const [isArriveHovered, setIsArriveHovered] = useState(false);

    return (
        <div className={`container home ${focusedCard ? 'has-focus' : ''}`}>
            <div className="grid-top-bar">
                <div className="view-controls-div">
                    <Image src="/images/arrow.svg" alt="" width={16} height={16} className="list-icon" />
                    <div className="caption-text-w-icon">Look around...</div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Row 1: Arrive + ZoomInfo */}
                {/* Arrive Logo Card */}
                <div className={`card-wrapper col-span-1 lg:col-span-6 ${focusedCard && focusedCard !== 'arrive' ? 'opacity-10' : ''}`}>
                    <div
                        className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[16rem] lg:min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer"
                        onMouseEnter={() => setIsArriveHovered(true)}
                        onMouseLeave={() => setIsArriveHovered(false)}
                    >
                        {/* Default logo */}
                        <Image
                            src="/images/arrive-logo.png"
                            alt="Arrive"
                            width={192}
                            height={48}
                            className="w-48 transition-opacity duration-300"
                            style={{ opacity: isArriveHovered ? 0 : 1 }}
                        />

                        {/* Hover state - Videos side by side */}
                        <div
                            className="absolute inset-0 flex items-center justify-center gap-4 p-6 transition-opacity duration-300"
                            style={{ opacity: isArriveHovered ? 1 : 0 }}
                        >
                            <video
                                src="/images/dispatcher.mp4"
                                className="h-[80%] max-h-[240px] rounded-lg shadow-lg object-contain"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            <video
                                src="/images/driver-mvp.mp4"
                                className="h-[80%] max-h-[240px] rounded-lg shadow-lg object-contain"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>

                        <Link
                            href="/work/arrive"
                            className="card-arrow-btn"
                            onMouseEnter={() => setFocusedCard('arrive')}
                            onMouseLeave={() => setFocusedCard(null)}
                        >
                            <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                        </Link>
                    </div>
                    <div className={`card-focus-description ${focusedCard === 'arrive' ? 'visible' : ''}`}>
                        <span className="project-name">{cardDescriptions.arrive.name}</span>
                        <span className="project-subtitle"> — {cardDescriptions.arrive.subtitle}</span>
                    </div>
                </div>

                {/* ZoomInfo Logo Card */}
                <div className={`card-wrapper col-span-1 lg:col-span-6 ${focusedCard && focusedCard !== 'zoominfo' ? 'opacity-10' : ''}`}>
                    <div
                        className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[16rem] lg:min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer"
                        onMouseEnter={() => setIsZoominfoHovered(true)}
                        onMouseLeave={() => setIsZoominfoHovered(false)}
                    >
                        <Image
                            src="/images/zoominfo-logo.png"
                            alt="ZoomInfo"
                            width={256}
                            height={64}
                            className="w-64 transition-opacity duration-300"
                            style={{ opacity: isZoominfoHovered ? 0 : 1 }}
                        />
                        <video
                            src="/images/zigif.mp4"
                            className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-300"
                            style={{ opacity: isZoominfoHovered ? 1 : 0 }}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <Link
                            href="/work/zoominfo"
                            className="card-arrow-btn"
                            onMouseEnter={() => setFocusedCard('zoominfo')}
                            onMouseLeave={() => setFocusedCard(null)}
                        >
                            <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                        </Link>
                    </div>
                    <div className={`card-focus-description ${focusedCard === 'zoominfo' ? 'visible' : ''}`}>
                        <span className="project-name">{cardDescriptions.zoominfo.name}</span>
                        <span className="project-subtitle"> — {cardDescriptions.zoominfo.subtitle}</span>
                    </div>
                </div>

                {/* Row 2: J&J + Microsoft stacked on left, HYPEX tall on right */}
                {/* Left Column: J&J + Microsoft stacked */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">
                    {/* Johnson & Johnson Logo Card */}
                    <div className={`card-wrapper flex-1 ${focusedCard && focusedCard !== 'jnj' ? 'opacity-10' : ''}`}>
                        <div className="jnj-card grid-card h-full bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[16rem] lg:min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer">
                            <Image src="/images/jnj-logo.png" alt="Johnson & Johnson" width={256} height={64} className="jnj-logo w-64" />
                            <Link
                                href="/work/jnj"
                                className="card-arrow-btn"
                                onMouseEnter={() => setFocusedCard('jnj')}
                                onMouseLeave={() => setFocusedCard(null)}
                            >
                                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                            </Link>
                        </div>
                        <div className={`card-focus-description ${focusedCard === 'jnj' ? 'visible' : ''}`}>
                            <span className="project-name">{cardDescriptions.jnj.name}</span>
                            <span className="project-subtitle"> — {cardDescriptions.jnj.subtitle}</span>
                        </div>
                    </div>

                    {/* Microsoft Card */}
                    <div className={`card-wrapper flex-1 ${focusedCard && focusedCard !== 'microsoft' ? 'opacity-10' : ''}`}>
                        <div
                            className={`microsoft-card grid-card h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer relative flex items-center justify-center min-h-[16rem] lg:min-h-[20rem] ${isMicrosoftHovered ? 'is-hovered' : ''}`}
                            onMouseEnter={() => setIsMicrosoftHovered(true)}
                            onMouseLeave={() => setIsMicrosoftHovered(false)}
                        >
                            {/* Animated graffiti background */}
                            <div className="microsoft-bg-container">
                                <MicrosoftGraffiti isHovered={isMicrosoftHovered} />
                            </div>

                            {/* Logo with white background and animated text */}
                            <div className="microsoft-content relative z-10 flex flex-col items-center">
                                <div className="microsoft-logo-container">
                                    <Image src="/images/microsoft-full-logo.png" alt="Microsoft" width={128} height={28} className="w-32" />
                                </div>
                                <p className="microsoft-hover-text">Designing an AI-Powered Assistant for Specialized Educators</p>
                            </div>

                            <Link
                                href="/work/microsoft"
                                className="card-arrow-btn"
                                onMouseEnter={() => setFocusedCard('microsoft')}
                                onMouseLeave={() => setFocusedCard(null)}
                            >
                                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                            </Link>
                        </div>
                        <div className={`card-focus-description ${focusedCard === 'microsoft' ? 'visible' : ''}`}>
                            <span className="project-name">{cardDescriptions.microsoft.name}</span>
                            <span className="project-subtitle"> — {cardDescriptions.microsoft.subtitle}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: HYPEX Card - Full height to match J&J + Microsoft */}
                <div className={`card-wrapper col-span-1 lg:col-span-6 ${focusedCard && focusedCard !== 'hypex' ? 'opacity-10' : ''}`}>
                    <div className="hypex-card hypex-tall grid-card bg-white rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative flex items-center justify-center overflow-hidden group cursor-pointer">
                        <Image src="/images/hypex-mockup.png" alt="HYPEX" width={400} height={400} className="w-full h-full object-contain relative z-10" />

                        {/* Marquee hover effect */}
                        <div className="hypex-marquee-container">
                            <div className="hypex-marquee-wrapper">
                                {[...Array(12)].map((_, rowIndex) => (
                                    <div key={rowIndex} className={`hypex-marquee-row ${rowIndex % 2 === 0 ? 'left' : 'right'}`}>
                                        {[...Array(12)].map((_, i) => (
                                            <span key={i} className={`hypex-marquee-text ${i % 3 === 1 ? 'bold' : ''}`}>HYPEX</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/work/hypex"
                            className="card-arrow-btn"
                            onMouseEnter={() => setFocusedCard('hypex')}
                            onMouseLeave={() => setFocusedCard(null)}
                        >
                            <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                        </Link>
                    </div>
                    <div className={`card-focus-description ${focusedCard === 'hypex' ? 'visible' : ''}`}>
                        <span className="project-name">{cardDescriptions.hypex.name}</span>
                        <span className="project-subtitle"> — {cardDescriptions.hypex.subtitle}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
