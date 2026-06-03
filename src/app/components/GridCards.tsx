'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { MicrosoftGraffiti } from './MicrosoftGraffiti';
import CatAnimation from './CatAnimation';
import { analytics } from './GoogleAnalytics';

// Card data for focus state
const cardDescriptions: Record<string, { name: string; subtitle: string }> = {
  parking: { name: 'B2B Parking Planner', subtitle: "Evaluated whether Arrive's B2B offering should expand from parking support to fleet planning tools" },
  vision: { name: 'B2B Product Vision Workshops', subtitle: 'Facilitated workshops to pressure-test a two-year B2B vision into aligned priorities' },
  aihomepage: { name: 'AI Homepage', subtitle: 'Reimagined the homepage around an AI-first experience' },
  zoominfo: { name: 'ZoomInfo', subtitle: 'Redesigned how sales & marketing teams hit their number worldwide' },
  jnj: { name: 'Johnson & Johnson', subtitle: 'Designed JnJ\'s 2021 Healthy for Humanity & DEI Reports' },
  tashvi: { name: 'Tashvi', subtitle: 'Designed and shipped an AI-native product from scratch' },
  hypex: { name: 'HYPEX', subtitle: 'Led marketing and design efforts for an NFT-based trading game' },
  microsoft: { name: 'Microsoft', subtitle: "Collab on the future of education with Microsoft's Inclusive Design Team" },
};

const navItems = [
  { name: 'Work', href: '/' },
  { name: 'More', href: '/more' },
  { name: 'About', href: '/about' },
];

export function GridCards() {
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [isMicrosoftHovered, setIsMicrosoftHovered] = useState(false);
  const [isTashviHovered, setIsTashviHovered] = useState(false);
  const tashviVideoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const pathname = usePathname();
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

  // Reset Tashvi video when hover starts
  useEffect(() => {
    if (isTashviHovered && tashviVideoRef.current) {
      tashviVideoRef.current.currentTime = 0;
      tashviVideoRef.current.play();
    }
  }, [isTashviHovered]);

  return (
    <div className={`container home ${focusedCard ? 'has-focus' : ''}`}>
      {/* Intro / Hero */}
      <section className="home-intro">
        <div className="home-intro-top">
          <div className="home-intro-text">
            <h1 className="home-title">Arpit Singh Ahluwalia</h1>
            <p className="home-blurb">
              I dig into <strong>the why before the what</strong>, and I measure design by the{' '}
              <strong>outcomes it drives</strong>, not just how it looks. Design is my expertise but
              I own the whole journey from{' '}
              <strong className="home-journey">
                strategy
                <svg className="journey-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
                research
                <svg className="journey-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
                design
                <svg className="journey-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
                development
              </strong>.
            </p>
          </div>
          <div className="home-intro-cat">
            <CatAnimation />
          </div>
        </div>

        <hr className="home-intro-hr" />

        <p className="home-availability">
          Currently looking for a new challenge! Previously at{' '}
          <a href="https://arrive.com/en/newsroom/news/easypark-group-unifies-under-arrive-to-build-the-world-s-leading-global-mobility-platform" target="_blank" rel="noopener noreferrer" className="bio-link">
            Arrive
            <svg className="bio-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>,{' '}
          <Link href="/work/zoominfo" className="bio-link">
            ZoomInfo
            <svg className="bio-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>{' '}&amp;{' '}
          <Link href="/work/jnj" className="bio-link">
            JnJ
            <svg className="bio-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </p>

        {/* Nav pill - below the intro blurb */}
        <nav className="home-nav">
          <div className="home-nav-pill">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/' || pathname.startsWith('/work')
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`home-nav-item ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </section>

      {/* Uniform 2-column project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arrive — B2B Parking Planner */}
        <div className={`card-wrapper home-tile ${focusedCard && focusedCard !== 'parking' ? 'opacity-10' : ''}`}>
          <div
            className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={(e) => handleCardClick(e, '/work/arrive/parking-planner')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'parking', '/work/arrive/parking-planner')}
          >
            <video
              src="/images/ArriveLoop.mov"
              autoPlay
              muted
              loop
              playsInline
              className="arrive-loop-video"
            />
            <Link
              href="/work/arrive/parking-planner"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('parking')}
              onMouseLeave={() => setFocusedCard(null)}
              onClick={() => analytics.trackCaseStudyView('Arrive — B2B Parking Planner')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          <div className={`card-focus-description ${focusedCard === 'parking' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.parking.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.parking.subtitle}</span>
          </div>
        </div>

        {/* Arrive — B2B Product Vision Workshops */}
        <div className={`card-wrapper home-tile ${focusedCard && focusedCard !== 'vision' ? 'opacity-10' : ''}`}>
          <div
            className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={(e) => handleCardClick(e, '/work/arrive/vision-testing')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'vision', '/work/arrive/vision-testing')}
          >
            <video
              src="/images/vision1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="arrive-vision-video"
            />
            <Link
              href="/work/arrive/vision-testing"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('vision')}
              onMouseLeave={() => setFocusedCard(null)}
              onClick={() => analytics.trackCaseStudyView('Arrive — B2B Product Vision Workshops')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          <div className={`card-focus-description ${focusedCard === 'vision' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.vision.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.vision.subtitle}</span>
          </div>
        </div>

        {/* AI Homepage */}
        <div className={`card-wrapper home-tile ${focusedCard && focusedCard !== 'aihomepage' ? 'opacity-10' : ''}`}>
          <div
            className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={(e) => handleCardClick(e, '/work/ai-homepage')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'aihomepage', '/work/ai-homepage')}
          >
            <video
              src="/images/Zoominfolooper.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="ai-homepage-video"
            />
            <Link
              href="/work/ai-homepage"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('aihomepage')}
              onMouseLeave={() => setFocusedCard(null)}
              onClick={() => analytics.trackCaseStudyView('AI Homepage')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          <div className={`card-focus-description ${focusedCard === 'aihomepage' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.aihomepage.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.aihomepage.subtitle}</span>
          </div>
        </div>

        {/* ZoomInfo */}
        <div className={`card-wrapper home-tile ${focusedCard && focusedCard !== 'zoominfo' ? 'opacity-10' : ''}`}>
          <div
            className="grid-card zoominfo-card rounded-3xl p-6 lg:p-8 shadow-sm border relative flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={(e) => handleCardClick(e, '/work/zoominfo')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'zoominfo', '/work/zoominfo')}
          >
            <Image
              src="/images/ZoomInfoGIF.gif"
              alt="ZoomInfo"
              fill
              unoptimized
              className="zoominfo-gif"
            />
            <Link
              href="/work/zoominfo"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('zoominfo')}
              onMouseLeave={() => setFocusedCard(null)}
              onClick={() => analytics.trackCaseStudyView('ZoomInfo')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          <div className={`card-focus-description ${focusedCard === 'zoominfo' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.zoominfo.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.zoominfo.subtitle}</span>
          </div>
        </div>

        {/* Johnson & Johnson */}
        <div className={`card-wrapper home-tile ${focusedCard && focusedCard !== 'jnj' ? 'opacity-10' : ''}`}>
          <div
            className="jnj-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={(e) => handleCardClick(e, '/work/jnj')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'jnj', '/work/jnj')}
          >
            <Image src="/images/jnj-logo.png" alt="Johnson & Johnson" width={320} height={80} className="jnj-logo w-44 lg:w-72" />
            <Link
              href="/work/jnj"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('jnj')}
              onMouseLeave={() => setFocusedCard(null)}
              onClick={() => analytics.trackCaseStudyView('Johnson & Johnson')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          <div className={`card-focus-description ${focusedCard === 'jnj' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.jnj.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.jnj.subtitle}</span>
          </div>
        </div>

        {/* Tashvi */}
        <div className={`card-wrapper home-tile ${focusedCard && focusedCard !== 'tashvi' ? 'opacity-10' : ''}`}>
          <div
            className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative flex items-center justify-center overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsTashviHovered(true)}
            onMouseLeave={() => setIsTashviHovered(false)}
            onClick={(e) => handleCardClick(e, '/work/tashvi')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'tashvi', '/work/tashvi')}
          >
            <span
              className="tashvi-wordmark transition-opacity duration-300"
              style={{ opacity: isTashviHovered ? 0 : 1 }}
            >
              Tashvi
            </span>
            <video
              ref={tashviVideoRef}
              src="/images/tashvi1.mp4"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-300"
              style={{ opacity: isTashviHovered ? 1 : 0 }}
              muted
              loop
              playsInline
            />
            <Link
              href="/work/tashvi"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('tashvi')}
              onMouseLeave={() => setFocusedCard(null)}
              onClick={() => analytics.trackCaseStudyView('Tashvi')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          <div className={`card-focus-description ${focusedCard === 'tashvi' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.tashvi.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.tashvi.subtitle}</span>
          </div>
        </div>

        {/* HYPEX */}
        <div className={`card-wrapper home-tile ${focusedCard && focusedCard !== 'hypex' ? 'opacity-10' : ''}`}>
          <div
            className="hypex-card grid-card bg-white rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={(e) => handleCardClick(e, '/work/hypex')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'hypex', '/work/hypex')}
          >
            <Image src="/images/hypex-mockup.png" alt="HYPEX" width={400} height={400} className="w-full h-full object-contain relative z-10" />
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
              onClick={() => analytics.trackCaseStudyView('HypeX')}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          <div className={`card-focus-description ${focusedCard === 'hypex' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.hypex.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.hypex.subtitle}</span>
          </div>
        </div>

        {/* Microsoft */}
        <div className={`card-wrapper home-tile ${focusedCard && focusedCard !== 'microsoft' ? 'opacity-10' : ''}`}>
          <div
            className={`microsoft-card grid-card bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer relative flex items-center justify-center ${isMicrosoftHovered ? 'is-hovered' : ''}`}
            onMouseEnter={() => setIsMicrosoftHovered(true)}
            onMouseLeave={() => setIsMicrosoftHovered(false)}
            onClick={(e) => handleCardClick(e, '/work/microsoft')}
            onTouchEnd={(e) => handleCardTouchEnd(e, 'microsoft', '/work/microsoft')}
          >
            <div className="microsoft-bg-container">
              <MicrosoftGraffiti isHovered={isMicrosoftHovered} />
            </div>
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
              onClick={() => analytics.trackCaseStudyView('Microsoft')}
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
    </div>
  );
}
