'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { MicrosoftGraffiti } from './MicrosoftGraffiti';
import CatAnimation from './CatAnimation';
import { analytics } from './GoogleAnalytics';

// Per-project writeup copy shown in the right column of each row.
const cardDescriptions: Record<
  string,
  { name: string; tag: string; subtitle: string; href: string; analyticsLabel: string }
> = {
  parking: {
    name: 'B2B Parking Planner',
    tag: 'ARRIVE · PRODUCT STRATEGY',
    subtitle: "Evaluated whether Arrive's B2B offering should expand from parking support to fleet planning tools",
    href: '/work/arrive/parking-planner',
    analyticsLabel: 'Arrive — B2B Parking Planner',
  },
  vision: {
    name: 'B2B Product Vision Workshops',
    tag: 'ARRIVE · PRODUCT VISION',
    subtitle: 'Facilitated workshops to pressure-test a two-year B2B vision into aligned priorities',
    href: '/work/arrive/vision-testing',
    analyticsLabel: 'Arrive — B2B Product Vision Workshops',
  },
  aihomepage: {
    name: 'AI Homepage',
    tag: 'ZOOMINFO · AI EXPERIENCE',
    subtitle: 'Reimagined the homepage around an AI-first experience',
    href: '/work/ai-homepage',
    analyticsLabel: 'AI Homepage',
  },
  zoominfo: {
    name: 'ZoomInfo',
    tag: 'ZOOMINFO · CASE STUDY',
    subtitle: 'Redesigned how sales & marketing teams hit their number worldwide',
    href: '/work/zoominfo',
    analyticsLabel: 'ZoomInfo',
  },
  jnj: {
    name: 'Johnson & Johnson',
    tag: 'JOHNSON & JOHNSON · BRAND & REPORTING',
    subtitle: "Designed JnJ's 2021 Healthy for Humanity & DEI Reports",
    href: '/work/jnj',
    analyticsLabel: 'Johnson & Johnson',
  },
  tashvi: {
    name: 'Tashvi',
    tag: 'TASHVI · 0→1 PRODUCT',
    subtitle: 'Designed and shipped an AI-native product from scratch',
    href: '/work/tashvi',
    analyticsLabel: 'Tashvi',
  },
  hypex: {
    name: 'HYPEX',
    tag: 'HYPEX · MARKETING & DESIGN',
    subtitle: 'Led marketing and design efforts for an NFT-based trading game',
    href: '/work/hypex',
    analyticsLabel: 'HypeX',
  },
  microsoft: {
    name: 'Microsoft',
    tag: 'MICROSOFT · INCLUSIVE DESIGN',
    subtitle: "Collab on the future of education with Microsoft's Inclusive Design Team",
    href: '/work/microsoft',
    analyticsLabel: 'Microsoft',
  },
};

const navItems = [
  { name: 'Work', href: '/' },
  { name: 'More', href: '/more' },
  { name: 'About', href: '/about' },
];

// Right-column writeup for a project row.
function Writeup({ cardKey }: { cardKey: keyof typeof cardDescriptions }) {
  const { name, tag, subtitle, href, analyticsLabel } = cardDescriptions[cardKey];
  return (
    <div className="project-writeup">
      <h2 className="project-writeup-title">{name}</h2>
      <p className="project-writeup-tag">{tag}</p>
      <p className="project-writeup-desc">{subtitle}</p>
      <Link
        href={href}
        className="project-writeup-cta"
        onClick={() => analytics.trackCaseStudyView(analyticsLabel)}
      >
        view case study
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

export function GridCards() {
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
    <div className="container home">
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
          </div>

          <div className="home-intro-media">
            <div className="home-intro-cat">
              <CatAnimation />
            </div>
            <Image
              src="/images/brooklynbridge.png"
              alt="Arpit sitting on the Brooklyn Bridge"
              width={294}
              height={402}
              priority
              className="home-intro-photo"
            />
          </div>
        </div>

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

      {/* Two-column rows: media on the left, writeup on the right */}
      <div className="projects-list">
        {/* Arrive — B2B Parking Planner */}
        <article className="project-row">
          <div className="project-media home-tile">
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
                onClick={() => analytics.trackCaseStudyView('Arrive — B2B Parking Planner')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>
          <Writeup cardKey="parking" />
        </article>

        {/* Arrive — B2B Product Vision Workshops */}
        <article className="project-row">
          <div className="project-media home-tile">
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
                onClick={() => analytics.trackCaseStudyView('Arrive — B2B Product Vision Workshops')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>
          <Writeup cardKey="vision" />
        </article>

        {/* AI Homepage */}
        <article className="project-row">
          <div className="project-media home-tile">
            <div
              className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative flex items-center justify-center overflow-hidden group cursor-pointer"
              onClick={(e) => handleCardClick(e, '/work/ai-homepage')}
              onTouchEnd={(e) => handleCardTouchEnd(e, 'aihomepage', '/work/ai-homepage')}
            >
              <video
                src="/images/ZoomInfoProject1Hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="ai-homepage-video"
              />
              <Link
                href="/work/ai-homepage"
                className="card-arrow-btn"
                onClick={() => analytics.trackCaseStudyView('AI Homepage')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>
          <Writeup cardKey="aihomepage" />
        </article>

        {/* ZoomInfo */}
        <article className="project-row">
          <div className="project-media home-tile">
            <div
              className="grid-card zoominfo-card rounded-3xl p-6 lg:p-8 shadow-sm border relative flex items-center justify-center overflow-hidden group cursor-pointer"
              onClick={(e) => handleCardClick(e, '/work/zoominfo')}
              onTouchEnd={(e) => handleCardTouchEnd(e, 'zoominfo', '/work/zoominfo')}
            >
              <Image
                src="/images/copilot_loader_v2.gif"
                alt="ZoomInfo Copilot"
                width={1400}
                height={469}
                unoptimized
                className="zoominfo-gif"
              />
              <Link
                href="/work/zoominfo"
                className="card-arrow-btn"
                onClick={() => analytics.trackCaseStudyView('ZoomInfo')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>
          <Writeup cardKey="zoominfo" />
        </article>

        {/* Johnson & Johnson */}
        <article className="project-row">
          <div className="project-media home-tile">
            <div
              className="jnj-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative flex items-center justify-center overflow-hidden group cursor-pointer"
              onClick={(e) => handleCardClick(e, '/work/jnj')}
              onTouchEnd={(e) => handleCardTouchEnd(e, 'jnj', '/work/jnj')}
            >
              <Image src="/images/jnj-logo.png" alt="Johnson & Johnson" width={320} height={80} className="jnj-logo w-44 lg:w-72" />
              <Link
                href="/work/jnj"
                className="card-arrow-btn"
                onClick={() => analytics.trackCaseStudyView('Johnson & Johnson')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>
          <Writeup cardKey="jnj" />
        </article>

        {/* Tashvi */}
        <article className="project-row">
          <div className="project-media home-tile">
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
                onClick={() => analytics.trackCaseStudyView('Tashvi')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>
          <Writeup cardKey="tashvi" />
        </article>

        {/* HYPEX */}
        <article className="project-row">
          <div className="project-media home-tile">
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
                onClick={() => analytics.trackCaseStudyView('HypeX')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>
          <Writeup cardKey="hypex" />
        </article>

        {/* Microsoft */}
        <article className="project-row">
          <div className="project-media home-tile">
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
                onClick={() => analytics.trackCaseStudyView('Microsoft')}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
          </div>
          <Writeup cardKey="microsoft" />
        </article>
      </div>
    </div>
  );
}
