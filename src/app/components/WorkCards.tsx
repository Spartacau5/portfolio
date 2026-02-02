'use client';

import { useState } from 'react';
import Link from 'next/link';

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

    return (
        <div className={`container home ${focusedCard ? 'has-focus' : ''}`}>
            <div className="grid-top-bar">
                <div className="view-controls-div">
                    <img src="/images/arrow.svg" loading="lazy" alt="" className="list-icon" />
                    <div className="caption-text-w-icon">Look around...</div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                {/* Row 1: Arrive + ZoomInfo */}
                {/* Arrive Logo Card */}
                <div className={`card-wrapper col-span-6 ${focusedCard && focusedCard !== 'arrive' ? 'opacity-10' : ''}`}>
                    <div className="grid-card bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer">
                        <img src="/images/arrive-logo.png" alt="Arrive" className="w-48" />
                        <Link
                            href="/work/arrive"
                            className="card-arrow-btn"
                            onMouseEnter={() => setFocusedCard('arrive')}
                            onMouseLeave={() => setFocusedCard(null)}
                        >
                            <img src="/images/arrow-angle.svg" alt="" className="card-arrow-icon" />
                        </Link>
                    </div>
                    <div className={`card-focus-description ${focusedCard === 'arrive' ? 'visible' : ''}`}>
                        <span className="project-name">{cardDescriptions.arrive.name}</span>
                        <span className="project-subtitle"> — {cardDescriptions.arrive.subtitle}</span>
                    </div>
                </div>

                {/* ZoomInfo Logo Card */}
                <div className={`card-wrapper col-span-6 ${focusedCard && focusedCard !== 'zoominfo' ? 'opacity-10' : ''}`}>
                    <div
                        className="grid-card bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer"
                        onMouseEnter={() => setIsZoominfoHovered(true)}
                        onMouseLeave={() => setIsZoominfoHovered(false)}
                    >
                        <img
                            src="/images/zoominfo-logo.png"
                            alt="ZoomInfo"
                            className="w-64 transition-opacity duration-300"
                            style={{ opacity: isZoominfoHovered ? 0 : 1 }}
                        />
                        <img
                            src="/images/zigif.gif"
                            alt="ZoomInfo Demo"
                            className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-300"
                            style={{ opacity: isZoominfoHovered ? 1 : 0 }}
                        />
                        <Link
                            href="/work/zoominfo"
                            className="card-arrow-btn"
                            onMouseEnter={() => setFocusedCard('zoominfo')}
                            onMouseLeave={() => setFocusedCard(null)}
                        >
                            <img src="/images/arrow-angle.svg" alt="" className="card-arrow-icon" />
                        </Link>
                    </div>
                    <div className={`card-focus-description ${focusedCard === 'zoominfo' ? 'visible' : ''}`}>
                        <span className="project-name">{cardDescriptions.zoominfo.name}</span>
                        <span className="project-subtitle"> — {cardDescriptions.zoominfo.subtitle}</span>
                    </div>
                </div>

                {/* Row 2: J&J + Microsoft stacked on left, HYPEX tall on right */}
                {/* Left Column: J&J + Microsoft stacked */}
                <div className="col-span-6 flex flex-col gap-4">
                    {/* Johnson & Johnson Logo Card */}
                    <div className={`card-wrapper flex-1 ${focusedCard && focusedCard !== 'jnj' ? 'opacity-10' : ''}`}>
                        <div className="grid-card h-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer">
                            <img src="/images/jnj-logo.png" alt="Johnson & Johnson" className="w-64" />
                            <Link
                                href="/work/jnj"
                                className="card-arrow-btn"
                                onMouseEnter={() => setFocusedCard('jnj')}
                                onMouseLeave={() => setFocusedCard(null)}
                            >
                                <img src="/images/arrow-angle.svg" alt="" className="card-arrow-icon" />
                            </Link>
                        </div>
                        <div className={`card-focus-description ${focusedCard === 'jnj' ? 'visible' : ''}`}>
                            <span className="project-name">{cardDescriptions.jnj.name}</span>
                            <span className="project-subtitle"> — {cardDescriptions.jnj.subtitle}</span>
                        </div>
                    </div>

                    {/* Microsoft Card */}
                    <div className={`card-wrapper flex-1 ${focusedCard && focusedCard !== 'microsoft' ? 'opacity-10' : ''}`}>
                        <div className="grid-card h-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer">
                            <img src="/images/microsoft-full-logo.png" alt="Microsoft" className="w-40" />
                            <Link
                                href="/work/microsoft"
                                className="card-arrow-btn"
                                onMouseEnter={() => setFocusedCard('microsoft')}
                                onMouseLeave={() => setFocusedCard(null)}
                            >
                                <img src="/images/arrow-angle.svg" alt="" className="card-arrow-icon" />
                            </Link>
                        </div>
                        <div className={`card-focus-description ${focusedCard === 'microsoft' ? 'visible' : ''}`}>
                            <span className="project-name">{cardDescriptions.microsoft.name}</span>
                            <span className="project-subtitle"> — {cardDescriptions.microsoft.subtitle}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: HYPEX Card - Full height to match J&J + Microsoft */}
                <div className={`card-wrapper col-span-6 ${focusedCard && focusedCard !== 'hypex' ? 'opacity-10' : ''}`}>
                    <div className="hypex-card grid-card bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative flex items-center justify-center overflow-hidden group cursor-pointer" style={{ height: 'calc(40rem + 1rem + 4px)' }}>
                        <img src="/images/hypex-mockup.png" alt="HYPEX" className="w-full h-full object-contain relative z-10" />

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
                            <img src="/images/arrow-angle.svg" alt="" className="card-arrow-icon" />
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
