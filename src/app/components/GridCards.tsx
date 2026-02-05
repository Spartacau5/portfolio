'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MusicPlayer } from './MusicPlayer';
import { PhotoCarousel } from './PhotoCarousel';
import { MicrosoftGraffiti } from './MicrosoftGraffiti';
import CatAnimation from './CatAnimation';

// Card data for focus state
const cardDescriptions: Record<string, { name: string; subtitle: string }> = {
  arrive: { name: 'Arrive', subtitle: 'Defining the future of mobility solutions' },
  zoominfo: { name: 'ZoomInfo', subtitle: 'Redesigned how sales & marketing teams hit their number worldwide' },
  jnj: { name: 'Johnson & Johnson', subtitle: 'Designed JnJ\'s 2021 Healthy for Humanity & DEI Reports' },
  hypex: { name: 'HYPEX', subtitle: 'Led marketing and design efforts for an NFT-based trading game' },
  mtsinai: { name: 'Mt Sinai', subtitle: 'Designed an incident reporting app for hospitals in Africa' },
  microsoft: { name: 'Microsoft', subtitle: "Collab on the future of education with Microsoft's Inclusive Design Team" },
};

export function GridCards() {
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [isZoominfoHovered, setIsZoominfoHovered] = useState(false);
  const [isMicrosoftHovered, setIsMicrosoftHovered] = useState(false);
  const [isArriveHovered, setIsArriveHovered] = useState(false);
  const arriveVideoRef = useRef<HTMLVideoElement>(null);

  const handleArriveHover = (isHovering: boolean) => {
    setIsArriveHovered(isHovering);
    if (arriveVideoRef.current) {
      if (isHovering) {
        arriveVideoRef.current.currentTime = 0;
        arriveVideoRef.current.play();
      } else {
        arriveVideoRef.current.pause();
      }
    }
  };

  return (
    <div className={`container home ${focusedCard ? 'has-focus' : ''}`}>
      <div className="grid-top-bar">
        <div className="view-controls-div">
          <Image src="/images/arrow.svg" alt="" width={16} height={16} className="list-icon" />
          <div className="caption-text-w-icon">Click around...</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Intro/Bio Card */}
        <div className={`card-wrapper col-span-1 lg:col-span-6 ${focusedCard && focusedCard !== 'bio' ? 'opacity-10' : ''}`}>
          {/* Cat Animation - positioned above the card */}
          <div className="cat-position-wrapper">
            <CatAnimation />
          </div>
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[20rem] lg:min-h-[25rem] flex flex-col transition-opacity duration-300">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 inline">Arpit Singh Ahluwalia</h2>
            <span className="text-xl lg:text-2xl text-gray-400"> – UX Designer and Strategist. Currently, learning at Parsons.</span>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="space-y-4 lg:space-y-5 text-gray-500 text-sm lg:text-base leading-relaxed">
            <p>I'm a UX Designer and Strategist with 4+ years of experience at companies like ZoomInfo and Johnson & Johnson.</p>

            <p>I thrive on figuring out the messy middle through research, translating discoveries into designs that actually work for people. I think strategically but execute quickly, always co-designing with real users along the process.</p>

            <p>When I'm not designing, I'm gaming, making music, or (now) vibe-coding. I'm looking for opportunities to collaborate with people who value thoughtful, human-centered work.</p>
          </div>
          </div>
        </div>

        {/* Arrive Logo Card */}
        <div className={`card-wrapper col-span-1 lg:col-span-6 h-full ${focusedCard && focusedCard !== 'arrive' ? 'opacity-10' : ''}`}>
          <div
            className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative h-full min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
            onMouseEnter={() => handleArriveHover(true)}
            onMouseLeave={() => handleArriveHover(false)}
          >
            {/* Default logo */}
            <Image
              src="/images/arrive-logo.png"
              alt="Arrive"
              width={192}
              height={48}
              className="w-28 lg:w-48 transition-opacity duration-300"
              style={{ opacity: isArriveHovered ? 0 : 1 }}
            />

            {/* Hover state - Video */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: isArriveHovered ? 1 : 0 }}
            >
              <video
                ref={arriveVideoRef}
                src="/images/visiontesting.webm"
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
              />
            </div>

            {/* Arrow Button - Bottom Left - Links to case study */}
            <Link
              href="/work/arrive"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('arrive')}
              onMouseLeave={() => setFocusedCard(null)}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          {/* Description text that appears on focus */}
          <div className={`card-focus-description ${focusedCard === 'arrive' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.arrive.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.arrive.subtitle}</span>
          </div>
        </div>

        {/* ZoomInfo Logo Card */}
        <div className={`card-wrapper col-span-1 lg:col-span-6 ${focusedCard && focusedCard !== 'zoominfo' ? 'opacity-10' : ''}`}>
          <div
            className="grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsZoominfoHovered(true)}
            onMouseLeave={() => setIsZoominfoHovered(false)}
          >
            {/* Default logo */}
            <Image
              src="/images/zoominfo-logo.png"
              alt="ZoomInfo"
              width={256}
              height={64}
              className="w-36 lg:w-64 transition-opacity duration-300"
              style={{ opacity: isZoominfoHovered ? 0 : 1 }}
            />

            {/* Hover video - covers entire card */}
            <video
              src="/images/zigif.mp4"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-300"
              style={{ opacity: isZoominfoHovered ? 1 : 0 }}
              autoPlay
              muted
              loop
              playsInline
            />

            {/* Arrow Button - Bottom Left */}
            <Link
              href="/work/zoominfo"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('zoominfo')}
              onMouseLeave={() => setFocusedCard(null)}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>

            {/* Sublabels that slide up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full transition-transform duration-500 ease-out">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-3">
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500 w-fit">Redesigned how sales & marketing teams hit their number worldwide</span>
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">UX/UI Designer</span>
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">Full-Time</span>
                </div>
              </div>
            </div>
          </div>
          {/* Description text that appears on focus */}
          <div className={`card-focus-description ${focusedCard === 'zoominfo' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.zoominfo.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.zoominfo.subtitle}</span>
          </div>
        </div>

        {/* Johnson & Johnson Logo Card */}
        <div className={`card-wrapper col-span-1 lg:col-span-6 ${focusedCard && focusedCard !== 'jnj' ? 'opacity-10' : ''}`}>
          <div className="jnj-card grid-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 relative min-h-[18rem] lg:min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer">
            <Image src="/images/jnj-logo.png" alt="Johnson & Johnson" width={320} height={80} className="jnj-logo w-44 lg:w-80" />

            {/* Arrow Button - Bottom Left */}
            <Link
              href="/work/jnj"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('jnj')}
              onMouseLeave={() => setFocusedCard(null)}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>

            {/* Sublabels that slide up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full transition-transform duration-500 ease-out">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-3">
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500 w-fit">Designed JnJ's 2021 Healthy for Humanity & DEI Reports</span>
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">UI Designer</span>
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">Contract</span>
                </div>
              </div>
            </div>
          </div>
          {/* Description text that appears on focus */}
          <div className={`card-focus-description ${focusedCard === 'jnj' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.jnj.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.jnj.subtitle}</span>
          </div>
        </div>

        {/* HYPEX Card */}
        <div className={`card-wrapper col-span-1 lg:col-span-6 home-hypex-card ${focusedCard && focusedCard !== 'hypex' ? 'opacity-10' : ''}`}>
          <div className="hypex-card grid-card bg-white rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative min-h-[16rem] lg:min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer">
            <Image src="/images/hypex-mockup.png" alt="HYPEX" width={400} height={400} className="w-full h-full object-contain relative z-10" />

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
              </div>
            </div>

            {/* Arrow Button - Bottom Left */}
            <Link
              href="/work/hypex"
              className="card-arrow-btn"
              onMouseEnter={() => setFocusedCard('hypex')}
              onMouseLeave={() => setFocusedCard(null)}
            >
              <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
            </Link>
          </div>
          {/* Description text that appears on focus */}
          <div className={`card-focus-description ${focusedCard === 'hypex' ? 'visible' : ''}`}>
            <span className="project-name">{cardDescriptions.hypex.name}</span>
            <span className="project-subtitle"> — {cardDescriptions.hypex.subtitle}</span>
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
        <div className={`col-span-1 lg:col-span-3 flex flex-col gap-4 transition-opacity duration-300 home-microsoft-twitter-stack ${focusedCard && focusedCard !== 'microsoft' ? 'opacity-20' : ''}`}>
          {/* Microsoft Card */}
          <div className={`card-wrapper flex-1 basis-1/2 ${focusedCard && focusedCard !== 'microsoft' ? 'opacity-10' : ''}`}>
            <div
              className={`microsoft-card grid-card h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer relative flex items-center justify-center min-h-[18rem] lg:min-h-[10rem] ${isMicrosoftHovered ? 'is-hovered' : ''}`}
              onMouseEnter={() => setIsMicrosoftHovered(true)}
              onMouseLeave={() => setIsMicrosoftHovered(false)}
            >
              {/* Animated graffiti background - individual vectors */}
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

              {/* Arrow Button - Bottom Left */}
              <Link
                href="/work/microsoft"
                className="card-arrow-btn"
                onMouseEnter={() => setFocusedCard('microsoft')}
                onMouseLeave={() => setFocusedCard(null)}
              >
                <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="card-arrow-icon" />
              </Link>
            </div>
            {/* Description text that appears on focus */}
            <div className={`card-focus-description microsoft-low ${focusedCard === 'microsoft' ? 'visible' : ''}`}>
              <span className="project-name">{cardDescriptions.microsoft.name}</span>
              <span className="project-subtitle"> — {cardDescriptions.microsoft.subtitle}</span>
            </div>
          </div>

          {/* Twitter Card - duplicated from About page */}
          <div className={`tile-twitter sm twitter about flex-1 basis-1/2 min-h-[18rem] lg:min-h-0 transition-opacity duration-300 ${focusedCard === 'microsoft' ? 'opacity-10' : ''}`}>
            <div className="small-app-flex">
              <div className="twtitter-top-div">
                <div className="twitter-top-flex">
                  <a
                    href="https://twitter.com/spartacau5"
                    className="twitter-info-div w-inline-block"
                    target="_blank"
                    rel="noreferrer"
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
                        @spartacau5
                      </div>
                    </div>
                  </a>

                  <div className="small-app-icon-div">
                    <a
                      href="https://twitter.com/spartacau5"
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
        <div className={`col-span-1 lg:col-span-3 flex flex-col gap-4 transition-opacity duration-300 home-photos-spotify-stack ${focusedCard ? 'opacity-5' : ''}`}>
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
