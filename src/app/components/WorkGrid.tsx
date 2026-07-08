'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CatAnimation from './CatAnimation';
import { ZoomInfoLogoLoop } from './ZoomInfoLogoLoop';
import { FleetLogoLoop } from './FleetLogoLoop';
import { TashviLogoLoop } from './TashviLogoLoop';
import { ArriveLogoMarquee } from './ArriveLogoMarquee';
import { analytics } from './GoogleAnalytics';
import { ExpandableChip } from './ExpandableChip';
import { ChipTrail, type ChipTrailHandle } from './ChipTrail';
import { PasswordGate } from './PasswordGate';

// V4 landing (WORK). Six case-study cards: squared gradient cover with the
// project title / subtitle / tag always visible below it.
const GRADIENTS = {
  zoominfo: 'linear-gradient(180deg, #BFF0FF 0%, #EBEFF9 100%)',
  arrive: 'linear-gradient(180deg, #FFCEFE 0%, #FFF0FF 100%)',
  tashvi: 'linear-gradient(180deg, #F8EDC7 0%, #EDF9EE 100%)',
  fleet: 'linear-gradient(180deg, #D6EBFE 0%, #D6E0DC 100%)',
  jnj: 'linear-gradient(180deg, #FEDBD3 0%, #FFF9ED 100%)',
  hypex: 'linear-gradient(180deg, #D6D7FE 0%, #F1F0FE 100%)',
};

// Entrance animation — matches the More page header (staggered rise + un-blur).
const introContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};
const introItem = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function AvailabilityStatus() {
  const [open, setOpen] = useState(false);
  const [touchMode, setTouchMode] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (max-width: 767px)');
    const update = () => setTouchMode(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const show = useCallback(() => {
    if (touchMode) return;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  }, [touchMode]);

  const hide = useCallback(() => {
    if (touchMode) return;
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  }, [touchMode]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!touchMode) return;

    if (open) {
      setOpen(false);
      return;
    }

    if ((e.target as HTMLElement).closest('.wg-status-dot')) {
      setOpen(true);
    }
  };

  return (
    <span
      className={`wg-status${open ? ' is-open' : ''}${touchMode ? ' is-touch' : ''}`}
      role="status"
      tabIndex={touchMode ? 0 : undefined}
      aria-expanded={open}
      aria-label="Currently looking for new roles"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (!touchMode) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      }}
    >
      <span className="wg-status-dot" aria-hidden="true" />
      <span className="wg-status-text" aria-hidden="true">
        Currently looking for new roles!
      </span>
    </span>
  );
}

function Meta({ title, sub, tag }: { title: string; sub: string; tag: string }) {
  return (
    <div className="wg-meta">
      <div className="wg-meta-row">
        <h3 className="wg-card-title">{title}</h3>
        <span className="wg-tag">{tag}</span>
      </div>
      <p className="wg-card-sub">{sub}</p>
    </div>
  );
}

export function WorkGrid() {
  const afterDesignerTrail = useRef<ChipTrailHandle>(null);
  const afterBrooklynTrail = useRef<ChipTrailHandle>(null);
  const [zoomGateOpen, setZoomGateOpen] = useState(false);

  return (
    <div className="wg-home">
      {/* Intro */}
      <motion.header className="wg-intro" variants={introContainer} initial="hidden" animate="show">
        <motion.h1 className="wg-title" variants={introItem}>Arpit Ahluwalia</motion.h1>
        <motion.p className="wg-subtitle" variants={introItem}>
          I&apos;m a
          <ExpandableChip
            label="UX designer"
            icon="❁"
            expandedText=" crafting intuitive, research-driven experiences"
            endSymbol="☺"
            onTrailBounce={(phase) => afterDesignerTrail.current?.bounce(phase)}
          />
          <ChipTrail ref={afterDesignerTrail}>
            based in
            <ExpandableChip
              label="Brooklyn, New York"
              icon="🗽"
              iconMono
              expandedText=" Go Knicks! ♕"
              endSymbol=""
              onTrailBounce={(phase) => afterBrooklynTrail.current?.bounce(phase)}
            />
            <ChipTrail ref={afterBrooklynTrail} className="wg-chip-trail--status">
              <AvailabilityStatus />
            </ChipTrail>
          </ChipTrail>
        </motion.p>
      </motion.header>

      {/* Cards */}
      <div className="wg-grid-wrap">
        <div className="wg-cat">
          <CatAnimation />
        </div>
        <div className="wg-grid">
        {/* ZoomInfo — locked; opens the password gate */}
        <article className="wg-card">
          <button
            type="button"
            className="wg-cover"
            style={{ background: GRADIENTS.zoominfo }}
            data-cursor-label="Locked · Enter password"
            aria-label="ZoomInfo case study — enter password to unlock"
            onClick={() => {
              analytics.trackCaseStudyView('ZoomInfo');
              setZoomGateOpen(true);
            }}
          >
            <div className="wg-cover-inner">
              <ZoomInfoLogoLoop />
            </div>
          </button>
          <Meta
            title="ZoomInfo"
            sub="Redesigned the core search experience for a Go-To-Market platform used by 35,000 enterprise customers."
            tag="UX/UI Design"
          />
        </article>

        {/* Arrive */}
        <article className="wg-card">
          <Link
            href="/work/arrive"
            className="wg-cover"
            style={{ background: GRADIENTS.arrive }}
            data-cursor-label="View Case Study"
            aria-label="Arrive case study"
            onClick={() => analytics.trackCaseStudyView('Arrive')}
          >
            <ArriveLogoMarquee />
          </Link>
          <Meta
            title="Arrive"
            sub="Transformed fragmented insights into a cohesive 2-year strategy for a $1B+ mobility company."
            tag="Research & Strategy"
          />
        </article>

        {/* Tashvi.ai */}
        <article className="wg-card">
          <a
            href="https://tashvi.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="wg-cover"
            style={{ background: GRADIENTS.tashvi }}
            data-cursor-label="View Website"
            aria-label="Tashvi.ai — view website"
            onClick={() => analytics.trackCaseStudyView('Tashvi')}
          >
            <div className="wg-cover-inner">
              <TashviLogoLoop />
            </div>
          </a>
          <Meta
            title="Tashvi.ai"
            sub="Built an AI-native platform that turns jewelry sketches into photorealistic renders within seconds."
            tag="UX Engineering"
          />
        </article>

        {/* Fleet Management — case study not yet published */}
        <article className="wg-card">
          <div
            className="wg-cover"
            style={{ background: GRADIENTS.fleet, cursor: 'default' }}
            data-cursor-label="Coming soon"
            role="img"
            aria-label="Fleet Management case study — coming soon"
          >
            <div className="wg-cover-inner">
              <FleetLogoLoop />
            </div>
          </div>
          <Meta
            title="Fleet Management"
            sub="Led the research and strategy that validated product-market fit for a parking-planner MVP."
            tag="UX/UI Design"
          />
        </article>

        {/* Johnson & Johnson */}
        <article className="wg-card">
          <Link
            href="/work/jnj"
            className="wg-cover"
            style={{ background: GRADIENTS.jnj }}
            data-cursor-label="View Case Study"
            aria-label="Johnson and Johnson case study"
            onClick={() => analytics.trackCaseStudyView('Johnson & Johnson')}
          >
            <div className="wg-jnj-stack">
              <Image
                src="/images/jnj-report.png"
                alt="J&J Health for Humanity Report"
                width={880}
                height={720}
                className="wg-jnj-back"
              />
              <Image
                src="/images/jnj-dei.png"
                alt="J&J Diversity, Equity & Inclusion Impact Review"
                width={840}
                height={620}
                className="wg-jnj-front"
              />
            </div>
          </Link>
          <Meta
            title="Johnson & Johnson"
            sub="Transformed complex global ESG and DEI data into an engaging, compliant visual experience for a Fortune 50 audience."
            tag="UX/UI Design"
          />
        </article>

        {/* HYPEX */}
        <article className="wg-card">
          <Link
            href="/work/hypex"
            className="wg-cover"
            style={{ background: GRADIENTS.hypex }}
            data-cursor-label="View Case Study"
            aria-label="HYPEX case study"
            onClick={() => analytics.trackCaseStudyView('HYPEX')}
          >
            <Image
              src="/images/hypex-mockup.png"
              alt="HYPEX"
              width={500}
              height={400}
              className="wg-cover-img"
            />
          </Link>
          <Meta
            title="HYPEX"
            sub="Led marketing and design efforts for an NFT-based trading game."
            tag="UI Design"
          />
        </article>
        </div>
      </div>

      <PasswordGate
        open={zoomGateOpen}
        onClose={() => setZoomGateOpen(false)}
        password="Alohomora"
        redirectTo="/work/zoominfo"
      />
    </div>
  );
}
