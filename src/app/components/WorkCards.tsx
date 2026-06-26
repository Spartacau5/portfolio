'use client';

import Image from 'next/image';
import { OffprintLogoLoop } from './OffprintLogoLoop';
import { MusicPlayer } from './MusicPlayer';
import { IMessageChat } from './IMessageChat';
import { analytics } from './GoogleAnalytics';

// Card hover descriptions for the Play page cards.
const cardDescriptions: Record<string, { name: string; subtitle: string }> = {
    abx: { name: 'ABX', subtitle: 'Standardized a scalable, intuitive onboarding UX across 12 core features from 4 different enterprise products.' },
    offprint: { name: 'Offprint', subtitle: 'Shipped a Chrome extension that enables you to track and offset your AI carbon footprint.' },
};

export function WorkCards() {
    return (
        <div className="container home">
            <div className="grid-top-bar">
                <div className="view-controls-div">
                    <Image src="/images/arrow.svg" alt="" width={16} height={16} className="list-icon" />
                    <div className="caption-text-w-icon">Hover around...</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Row 1: ABX (Onboarding Framework) + Offprint */}

                {/* ABX — Onboarding Framework (coming soon) */}
                <div className="card-wrapper col-span-1 lg:col-span-6">
                    <div
                        className="abx-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-default"
                        data-cursor-label="Coming soon"
                    >
                        <div className="abx-card-bg" aria-hidden="true" />
                        <div className="card-tags" style={{ zIndex: 20 }}>
                            <span className="card-tag card-tag--dark">Design Systems</span>
                        </div>
                        <p className="project-hover-text">{cardDescriptions.abx.subtitle}</p>
                        {/* Locked - case study not yet published, no navigation */}
                        <span className="card-arrow-btn" aria-label="Case study locked">
                            <Image src="/images/lock.svg" alt="" width={16} height={16} className="card-arrow-icon" />
                        </span>
                    </div>
                </div>

                {/* Offprint Card */}
                <div className="card-wrapper col-span-1 lg:col-span-6">
                    <div
                        className="offprint-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
                        data-cursor-label="Try Extension"
                        onClick={(e) => { if ((e.target as HTMLElement).closest('.card-arrow-btn')) return; window.open('https://chromewebstore.google.com/detail/offprint/noolmimnjfhhnkibgledocngcgbkmojl', '_blank'); }}
                    >
                        <OffprintLogoLoop />
                        <div className="card-tags">
                            <span className="card-tag card-tag--dark">UX Engineering</span>
                        </div>
                        <p className="project-hover-text offprint-hover-text">{cardDescriptions.offprint.subtitle}</p>
                        <a
                            href="https://chromewebstore.google.com/detail/offprint/noolmimnjfhhnkibgledocngcgbkmojl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-arrow-btn offprint-arrow-btn"
                            onClick={(e) => { e.stopPropagation(); analytics.trackCaseStudyView('Offprint'); }}
                        >
                            <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon offprint-arrow-icon" />
                        </a>
                    </div>
                </div>

                {/* Row 2: Twitter + Spotify side by side (left) · Chat (right) — natural sizes */}
                <div className="col-span-1 lg:col-span-12 play-personal-row">
                    <div className="play-ts-group">
                    {/* Twitter Card */}
                    <div className="tile-twitter sm twitter about">
                        <div className="small-app-flex">
                            <div className="twtitter-top-div">
                                <div className="twitter-top-flex">
                                    <a
                                        href="https://twitter.com/HomeyBabaRB"
                                        className="twitter-info-div w-inline-block"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => analytics.trackSocialClick('Twitter')}
                                    >
                                        <div className="twitter-avi-div">
                                            <Image src="/images/profilepic.png" alt="Arpit Ahluwalia" width={40} height={40} className="twitter-img" />
                                        </div>
                                        <div className="twitter-name-div">
                                            <div className="twitter-name" style={{ color: 'rgb(0, 0, 0)' }}>Arpit Ahluwalia</div>
                                            <div className="twitter-handle" style={{ color: 'rgb(148, 148, 149)' }}>@HomeyBabaRB</div>
                                        </div>
                                    </a>
                                    <div className="small-app-icon-div">
                                        <a href="https://twitter.com/HomeyBabaRB" className="app-icon-link w-inline-block" target="_blank" rel="noreferrer">
                                            <Image src="/images/twitter-icon-min.png" alt="Twitter" width={56} height={56} className="small-tile-icon-hover" />
                                        </a>
                                        <div
                                            className="small-app-background"
                                            style={{ transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}
                                        />
                                    </div>
                                </div>
                                <div className="tweet-div">
                                    <div className="twitter-tweet" style={{ color: 'rgb(0, 0, 0)' }}>
                                        cooking up • prev{' '}
                                        <a href="https://madebycraft.co/about" className="tweet-link" style={{ color: 'rgb(21, 133, 199)' }} target="_blank" rel="noreferrer">@craft</a>{' '}
                                        <a href="https://x.com/ZoomInfo" className="tweet-link" style={{ color: 'rgb(21, 133, 199)' }} target="_blank" rel="noreferrer">@zoominfo</a>{' '}
                                        <a href="https://x.com/JNJNews?lang=en" className="tweet-link" style={{ color: 'rgb(21, 133, 199)' }} target="_blank" rel="noreferrer">@j&amp;j</a>{' '}
                                        <a href="https://x.com/MountSinaiNYC" className="tweet-link" style={{ color: 'rgb(21, 133, 199)' }} target="_blank" rel="noreferrer">@mtsinai</a>
                                    </div>
                                </div>
                            </div>
                            <a
                                href="https://x.com/homeybabaRB"
                                className="twitter-button w-inline-block"
                                style={{ borderColor: 'rgb(222, 222, 224)', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="inner-button-flex">
                                    <div className="button-text" style={{ color: 'rgb(0, 0, 0)' }}>Read mid tweets</div>
                                    <div className="arrow-icon-div">
                                        <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="arrow-icon" style={{ opacity: 1 }} />
                                        <Image src="/images/arrow-hover.svg" alt="" width={16} height={16} className="arrow-icon-white" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Spotify / Apple Music Card */}
                    <MusicPlayer />
                    </div>

                    {/* Contact chat */}
                    <IMessageChat />
                </div>
            </div>
        </div>
    );
}
