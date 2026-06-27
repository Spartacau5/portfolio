'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MusicPlayer } from './MusicPlayer';
import { PhotoCarousel } from './PhotoCarousel';
import { MicrosoftGraffiti } from './MicrosoftGraffiti';
import { ZoomInfoLogoLoop } from './ZoomInfoLogoLoop';
import { FleetLogoLoop } from './FleetLogoLoop';
import { TashviLogoLoop } from './TashviLogoLoop';
import CatAnimation from './CatAnimation';
import { analytics } from './GoogleAnalytics';

// Card data for focus state
const cardDescriptions: Record<string, { name: string; subtitle: string }> = {
  arrive: { name: 'Arrive', subtitle: 'Transformed fragmented insights into a cohesive 2-year strategy for a $1B+ mobility company.' },
  'fleet-management': { name: 'Fleet Management', subtitle: 'Led the research and strategy that validated product-market fit for a parking-planner MVP.' },
  zoominfo: { name: 'ZoomInfo', subtitle: 'Redesigned the core search experience for a Go-To-Market platform used by 35,000 enterprise customers.' },
  abx: { name: 'ABX', subtitle: 'Standardized a scalable, intuitive onboarding UX across 12 core features from 4 different enterprise products.' },
  jnj: { name: 'Johnson & Johnson', subtitle: 'Transformed complex global ESG and DEI data into an engaging, compliant visual experience for a Fortune 50 audience.' },
  tashvi: { name: 'Tashvi.ai', subtitle: 'Built an AI-native platform that turns jewelry sketches into photorealistic renders within seconds.' },
  offprint: { name: 'Offprint', subtitle: 'Shipped a Chrome extension that enables you to track and offset your AI carbon footprint.' },
  hypex: { name: 'HYPEX', subtitle: 'Led marketing and design efforts for an NFT-based trading game' },
  mtsinai: { name: 'Mt Sinai', subtitle: 'Designed an incident reporting app for hospitals in Africa' },
  microsoft: { name: 'Microsoft', subtitle: "Collab on the future of education with Microsoft's Inclusive Design Team" },
};

export function GridCards() {
  const [isMicrosoftHovered, setIsMicrosoftHovered] = useState(false);
  const [isMicrosoftAuto, setIsMicrosoftAuto] = useState(false);
  const router = useRouter();

  // Auto-play the Microsoft card's animation in a perfect loop: the graffiti
  // background draws in with the sub-text, holds ~4.5s, animates out, pauses,
  // and repeats forever.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let on = false;
    const tick = () => {
      on = !on;
      setIsMicrosoftAuto(on);
      timer = setTimeout(tick, on ? 4500 : 3200); // visible 4.5s, hidden 3.2s
    };
    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  // Active when hovered or while the auto-loop is in its "in" phase.
  const isMicrosoftActive = isMicrosoftHovered || isMicrosoftAuto;
  const lastTapRef = useRef<Record<string, number>>({});
  const isTouchRef = useRef(false);

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
  const expandAndNavigate = (cardEl: HTMLElement, href: string, videoSrc = '/images/arrive-hero.mp4') => {
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
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.className = 'arrive-expand-video';
    overlay.appendChild(video);

    // No logo during the fill — it only appears once the case study has loaded.
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

    // Navigate once the card has filled the screen, then dissolve into the
    // identical hero video on the case study page.
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
        {/* Intro/Bio Card */}
        <div className="card-wrapper col-span-1 lg:col-span-6">
          {/* Cat Animation - positioned above the card */}
          <div className="cat-position-wrapper">
            <CatAnimation />
          </div>
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative flex flex-col transition-opacity duration-300">
          <div>
            <h2 className="text-[0.85rem] lg:text-[1.25rem] font-bold text-gray-900 inline leading-relaxed">Arpit Ahluwalia</h2>
            <span className="text-[0.85rem] lg:text-[1.25rem] text-gray-400 leading-relaxed"> – Designing products from strategy to code.</span>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="space-y-4 text-gray-500 text-[0.75rem] lg:text-base leading-relaxed">
            <p>For 5+ years, I&apos;ve helped startups and enterprise teams turn complexity into intuitive products used by millions — blending user research, product strategy, and engineering to ship software people love.</p>

            <p>Recently, I co-founded an{' '}
              <a href="https://www.tashvi.ai" target="_blank" rel="noopener noreferrer" className="bio-link">
                AI jewelry-design platform
                <svg className="bio-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>{' '}
              (11,000+ users), leading design and engineering for gen-AI workflows.</p>

            <p>I&apos;ve also led UX research and product strategy for a{' '}
              <Link href="/work/arrive" className="bio-link">
                $1B+ global mobility brand
                <svg className="bio-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>, turning customer insights into clear roadmaps.</p>

            <p>Outside of work, I mentor designers at{' '}
              <a href="https://growth.aigany.org/amp/" target="_blank" rel="noopener noreferrer" className="bio-link">
                AIGA NY
                <svg className="bio-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>,{' '}
              <a href="https://open.spotify.com/artist/3b9yCm5iWBKNIDqq1utESQ" target="_blank" rel="noopener noreferrer" className="bio-link">
                make music
                <svg className="bio-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>, and{' '}
              <a href="https://forza.net/" target="_blank" rel="noopener noreferrer" className="bio-link">
                game
                <svg className="bio-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>. <em>Currently, looking for new roles!</em>
            </p>
          </div>
          </div>
        </div>

        {/* ZoomInfo Logo Card */}
        <div className="card-wrapper col-span-1 lg:col-span-6">
          <div
            className="zoominfo-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
            data-cursor-label="View Case Study"
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

        {/* Arrive Logo Card */}
        <div className="card-wrapper col-span-1 lg:col-span-6 h-full">
          <div
            className="arrive-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative h-full min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
            data-cursor-label="View Case Study"
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
              <span className="card-tag">Research &amp; Strategy</span>
            </div>
            {/* Description revealed at the bottom on hover */}
            <p className="project-hover-text">{cardDescriptions.arrive.subtitle}</p>

            {/* Arrow Button - Bottom Left - Links to case study */}
            <Link
              href="/work/arrive"
              className="card-arrow-btn"
              onClick={() => analytics.trackCaseStudyView('Arrive')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
        </div>

        {/* Fleet Management Logo Card */}
        <div className="card-wrapper col-span-1 lg:col-span-6 h-full">
          <div
            className="fleet-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative h-full min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-default"
            data-cursor-label="Coming soon"
          >
            {/* Looping Arrive logo -> parking-planner video -> logo sequence */}
            <FleetLogoLoop />
            {/* Glassy category tag, top-right (frosted variant, matching Tashvi) */}
            <div className="card-tags">
              <span className="card-tag card-tag--dark">UX/UI Design</span>
            </div>
            {/* Description revealed at the bottom on hover */}
            <p className="project-hover-text">{cardDescriptions['fleet-management'].subtitle}</p>

            {/* Locked - Bottom Left - case study not yet published, no navigation */}
            <span className="card-arrow-btn" aria-label="Case study locked">
              <Image src="/images/lock.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </span>
          </div>
        </div>

        {/* Tashvi.ai Card */}
        <div className="card-wrapper col-span-1 lg:col-span-6">
          <div
            className="tashvi-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
            data-cursor-label="View Website"
            onClick={(e) => { if ((e.target as HTMLElement).closest('.card-arrow-btn')) return; window.open('https://tashvi.ai/', '_blank'); }}
            onTouchEnd={() => { isTouchRef.current = true; window.open('https://tashvi.ai/', '_blank'); }}
          >
            <TashviLogoLoop />
            <div className="card-tags">
              <span className="card-tag card-tag--dark">UX Engineering</span>
            </div>
            <p className="project-hover-text">{cardDescriptions.tashvi.subtitle}</p>
            <a
              href="https://tashvi.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="card-arrow-btn"
              onClick={(e) => { e.stopPropagation(); analytics.trackCaseStudyView('Tashvi'); }}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </a>
          </div>
        </div>

        {/* Johnson & Johnson Logo Card */}
        <div className="card-wrapper col-span-1 lg:col-span-6">
          <div
            className="jnj-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
            data-cursor-label="View Case Study"
            onClick={(e) => handleCardClick(e, '/work/jnj')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'jnj', '/work/jnj')}
          >
            <Image src="/images/jnj-logo.png" alt="Johnson & Johnson" width={320} height={80} className="jnj-logo w-44 lg:w-80" />
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

        {/* HYPEX Card */}
        <div className="card-wrapper col-span-1 lg:col-span-6 home-hypex-card">
          <div
            className="hypex-card grid-card bg-white rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100 relative min-h-[16rem] lg:min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer"
            data-cursor-label="View Case Study"
            onClick={(e) => handleCardClick(e, '/work/hypex')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'hypex', '/work/hypex')}
          >
            <Image src="/images/hypex-mockup.png" alt="HYPEX" width={400} height={400} className="w-full h-full object-contain relative z-10" />
            <div className="card-tags" style={{ zIndex: 20 }}>
              <span className="card-tag card-tag--dark">UI Design</span>
            </div>

            {/* Marquee hover effect */}
            <div className="hypex-marquee-container">
              <div className="hypex-marquee-wrapper">
                {/* Row 1 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 2 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                </div>
                {/* Row 3 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 4 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 5 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                </div>
                {/* Row 6 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 7 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 8 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                </div>
                {/* Row 9 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 10 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 11 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                </div>
                {/* Row 12 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 13 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 14 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                </div>
                {/* Row 15 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 16 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
                {/* Row 17 - Left */}
                <div className="hypex-marquee-row left">
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                </div>
                {/* Row 18 - Right */}
                <div className="hypex-marquee-row right">
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text bold">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                  <span className="hypex-marquee-text">HYPEX</span>
                </div>
              </div>
            </div>

            {/* Description below the mockup, revealed on hover */}
            <p className="project-hover-text hypex-hover-text">{cardDescriptions.hypex.subtitle}</p>

            {/* Arrow Button - Bottom Left */}
            <Link
              href="/work/hypex"
              className="card-arrow-btn"
              onClick={() => analytics.trackCaseStudyView('HypeX')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
        </div>

        {/* Mount Sinai Card - HIDDEN FOR NOW
        <div className={`card-wrapper col-span-3 h-full ${focusedCard && focusedCard !== 'mtsinai' ? 'opacity-10' : ''}`}>
          <div className="grid-card bg-white rounded-3xl pt-8 px-4 pb-0 shadow-sm border border-gray-100 relative h-full min-h-[20rem] flex flex-col items-center overflow-hidden cursor-pointer">
            <img src="/images/mount-sinai-logo.png" alt="Mount Sinai" className="w-10 mb-1" />
            <h2 className="text-xl font-black text-gray-900 tracking-tight mb-0">MOUNT SINAI</h2>
            <p className="text-xs text-[#00b4b4] tracking-tight font-medium mb-2">Incident Reporting App</p>
            <button
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('mtsinai')}
              onMouseLeave={() => setFocusedCard(null)}
            >
              <img src="/images/arrow-angle.svg" alt="" className="card-arrow-icon" />
            </button>
            <img src="/images/mount-sinai-mockup.png" alt="Mount Sinai App" className="w-60 rounded-t-[2rem] shadow-2xl mt-4 -mb-24" />
          </div>
          <div className={`card-focus-description low ${focusedCard === 'mtsinai' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.mtsinai.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.mtsinai.subtitle}</span>
          </div>
        </div>
        */}

        {/* Two stacked placeholder divs */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 home-microsoft-twitter-stack">
          {/* Microsoft Card */}
          <div className="card-wrapper flex-1 basis-1/2">
            <div
              className={`microsoft-card grid-card h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer relative flex items-center justify-center min-h-[18rem] lg:min-h-[10rem] ${isMicrosoftActive ? 'is-hovered' : ''}`}
              data-cursor-label="View Case Study"
              onMouseEnter={() => setIsMicrosoftHovered(true)}
              onMouseLeave={() => setIsMicrosoftHovered(false)}
              onClick={(e) => handleCardClick(e, '/work/microsoft')}
              onTouchEnd={(e) => handleCardTouchEnd(e, 'microsoft', '/work/microsoft')}
            >
              {/* Animated graffiti background - individual vectors */}
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
                <div className="microsoft-subtext">
                  {/* Project description — crossfades in with the SVG background */}
                  <p className="microsoft-hover-text">Designed an AI-Powered Assistant for Specialized Educators.</p>
                </div>
              </div>

              {/* Arrow Button - Bottom Left */}
              <Link
                href="/work/microsoft"
                className="card-arrow-btn"
                onClick={() => analytics.trackCaseStudyView('Microsoft')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>

          {/* Twitter Card - duplicated from About page */}
          <div className="tile-twitter sm twitter about flex-1 basis-1/2 min-h-[18rem] lg:min-h-0">
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
                      <Image
                        src="/images/profilepic.png"
                        alt="Arpit Ahluwalia"
                        width={40}
                        height={40}
                        className="twitter-img"
                      />
                    </div>

                    <div className="twitter-name-div">
                      <div className="twitter-name" style={{ color: "rgb(0, 0, 0)" }}>
                        Arpit Ahluwalia
                      </div>
                      <div
                        className="twitter-handle"
                        style={{ color: "rgb(148, 148, 149)" }}
                      >
                        @HomeyBabaRB
                      </div>
                    </div>
                  </a>

                  <div className="small-app-icon-div">
                    <a
                      href="https://twitter.com/HomeyBabaRB"
                      className="app-icon-link w-inline-block"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src="/images/twitter-icon-min.png"
                        alt="Twitter"
                        width={56}
                        height={56}
                        className="small-tile-icon-hover"
                      />
                    </a>

                    <div
                      className="small-app-background"
                      style={{
                        transform:
                          "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d",
                      }}
                    />
                  </div>
                </div>

                <div className="tweet-div">
                  <div className="twitter-tweet" style={{ color: "rgb(0, 0, 0)" }}>
                    cooking up • prev{" "}
                    <a
                      href="https://madebycraft.co/about"
                      className="tweet-link"
                      style={{ color: "rgb(21, 133, 199)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @craft
                    </a>{" "}
                    <a
                      href="https://x.com/ZoomInfo"
                      className="tweet-link"
                      style={{ color: "rgb(21, 133, 199)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @zoominfo
                    </a>{" "}
                    <a
                      href="https://x.com/JNJNews?lang=en"
                      className="tweet-link"
                      style={{ color: "rgb(21, 133, 199)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @j&amp;j
                    </a>{" "}
                    <a
                      href="https://x.com/MountSinaiNYC"
                      className="tweet-link"
                      style={{ color: "rgb(21, 133, 199)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @mtsinai
                    </a>
                  </div>
                </div>
              </div>

              <a
                id="twitter-button"
                data-w-id="ad3c41ab-6071-5e6c-3932-6d9df03bfcd4"
                href="https://x.com/homeybabaRB"
                className="twitter-button w-inline-block"
                style={{
                  borderColor: "rgb(222, 222, 224)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                }}
                target="_blank"
                rel="noreferrer"
              >
                <div className="inner-button-flex">
                  <div className="button-text" style={{ color: "rgb(0, 0, 0)" }}>
                    Read mid tweets
                  </div>

                  <div className="arrow-icon-div">
                    <Image
                      src="/images/arrow-angle.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="arrow-icon"
                      style={{ opacity: 1 }}
                    />
                    <Image
                      src="/images/arrow-hover.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="arrow-icon-white"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Photos & Spotify Cards - Stacked vertically */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 home-photos-spotify-stack">
          <div className="flex-1 min-h-[18rem] lg:min-h-0">
            <PhotoCarousel />
          </div>
          <div className="flex-1 min-h-[16rem] lg:min-h-0">
            <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
}
