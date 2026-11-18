'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CatAnimation from './CatAnimation';
import { ZoomInfoLogoLoop } from './ZoomInfoLogoLoop';
import { TashviLogoLoop } from './TashviLogoLoop';
import { ArriveLogoMarquee } from './ArriveLogoMarquee';
import { KalshiCover } from './KalshiCover';
import { MeritonCover } from './MeritonCover';
import { StandardCharteredCover } from './StandardCharteredCover';
import { analytics } from './GoogleAnalytics';
import { SHOW_TASHVI } from '../lib/flags';
import { CARD_LINES, CARD_DELAY_MS, SITE_LINES } from '../lib/buddyLines';
import { ExpandableChip, type ExpandableChipHandle } from './ExpandableChip';
import { ChipTrail, type ChipTrailHandle } from './ChipTrail';
import { ScrollReveal } from './ScrollReveal';

// V4 landing (WORK). Case-study cards: squared gradient cover with the
// project title / subtitle / tag always visible below it.
const GRADIENTS = {
  zoominfo: 'linear-gradient(180deg, #BFF0FF 0%, #EBEFF9 100%)',
  arrive: 'linear-gradient(180deg, #FFCEFE 0%, #FFF0FF 100%)',
  tashvi: 'linear-gradient(180deg, #F8EDC7 0%, #EDF9EE 100%)',
  jnj: 'linear-gradient(180deg, #FEDBD3 0%, #FFF9ED 100%)',
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
      // Desktop hover: Arpit's hover buddy says it instead of the text pill.
      // Keyboard focus and touch still open the pill.
      data-buddy={touchMode ? undefined : SITE_LINES.available}
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
  const designerChip = useRef<ExpandableChipHandle>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const key = 'aa-chip-hint';
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      /* continue — still hint once this visit */
    }

    // Wait for the intro rise to settle, then open once so the chip reads as interactive.
    const timer = window.setTimeout(() => {
      if (designerChip.current?.isOpen()) {
        try { sessionStorage.setItem(key, '1'); } catch { /* ignore */ }
        return;
      }
      designerChip.current?.expand();
      try { sessionStorage.setItem(key, '1'); } catch { /* ignore */ }
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="wg-home">
      {/* Intro */}
      <motion.header className="wg-intro" variants={introContainer} initial="hidden" animate="show">
        <motion.h1 className="wg-title" variants={introItem}>
          <span data-buddy={SITE_LINES.name}>Arpit Ahluwalia</span>
        </motion.h1>
        <motion.p className="wg-subtitle" variants={introItem}>
          I&apos;m a
          <ExpandableChip
            ref={designerChip}
            label="Product Designer"
            icon="❁"
            expandedText=" turning complex problems into products people can actually use."
            expandedTextMobile=" turning complex problems into usable products."
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
        <motion.p className="wg-tagline" variants={introItem}>
          I design and build AI-powered experiences for complex enterprise workflows.
        </motion.p>
      </motion.header>

      {/* Cards */}
      <div className="wg-grid-wrap">
        <div className="wg-cat">
          <CatAnimation />
        </div>
        <div className="wg-grid">
        {/* Kalshi: case study not yet written, title line is placeholder */}
        <ScrollReveal as="article" className="wg-card" delay={0}>
          <div
            className="wg-cover"
            style={{ background: '#00D395', cursor: 'default' }}
            data-cursor-label="Locked — case study in progress"
          data-buddy={CARD_LINES.kalshi}
          data-buddy-delay={CARD_DELAY_MS}
          >
            <KalshiCover />
          </div>
          <Meta
            title="Kalshi"
            sub="Case study in progress."
            tag="Design Engineering"
          />
        </ScrollReveal>

        {/* Meriton: case study not yet written, title line is placeholder */}
        <ScrollReveal as="article" className="wg-card" delay={0.06}>
          <div
            className="wg-cover"
            style={{ background: '#FFFFFF', border: 'none', cursor: 'default' }}
            data-cursor-label="Locked — case study in progress"
          data-buddy={CARD_LINES.meriton}
          data-buddy-delay={CARD_DELAY_MS}
          >
            <MeritonCover />
            {/* The card's usual faint edge, on top so it sits over both white and orange. */}
            <span
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0, 0, 0, 0.05)', pointerEvents: 'none' }}
            />
          </div>
          <Meta
            title="Meriton"
            sub="Case study in progress."
            tag="Design Engineering"
          />
        </ScrollReveal>

        {/* Standard Chartered: case study not yet written, title line is placeholder */}
        <ScrollReveal as="article" className="wg-card" delay={0}>
          <div
            className="wg-cover"
            style={{ background: '#FFFFFF', cursor: 'default' }}
            data-cursor-label="Locked — case study in progress"
          data-buddy={CARD_LINES.standardChartered}
          data-buddy-delay={CARD_DELAY_MS}
          >
            <StandardCharteredCover />
          </div>
          <Meta
            title="Standard Chartered"
            sub="Case study in progress."
            tag="Design Engineering"
          />
        </ScrollReveal>

        {/* ZoomInfo */}
        <ScrollReveal as="article" className="wg-card" delay={0.06}>
          <Link
            href="/work/zoominfo"
            className="wg-cover"
            style={{ background: GRADIENTS.zoominfo }}
            data-cursor-label="View Case Study"
            data-buddy={CARD_LINES.zoominfo}
            data-buddy-delay={CARD_DELAY_MS}
            aria-label="ZoomInfo case study"
            onClick={() => analytics.trackCaseStudyView('ZoomInfo')}
          >
            <div className="wg-cover-inner">
              <ZoomInfoLogoLoop />
            </div>
          </Link>
          <Meta
            title="ZoomInfo"
            sub="Redesigned the core search experience for a Go-To-Market platform used by 35,000 enterprise customers."
            tag="UX/UI Design"
          />
        </ScrollReveal>

        {/* Arrive */}
        <ScrollReveal as="article" className="wg-card" delay={0}>
          <Link
            href="/work/arrive"
            className="wg-cover"
            style={{ background: GRADIENTS.arrive }}
            data-cursor-label="View Case Study"
            data-buddy={CARD_LINES.arrive}
            data-buddy-delay={CARD_DELAY_MS}
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
        </ScrollReveal>

        {/* Tashvi.ai */}
        {SHOW_TASHVI && (
        <ScrollReveal as="article" className="wg-card" delay={0}>
          <a
            href="https://tashvi.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="wg-cover"
            style={{ background: GRADIENTS.tashvi }}
            data-cursor-label="View Website"
            data-buddy={CARD_LINES.tashvi}
            data-buddy-delay={CARD_DELAY_MS}
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
        </ScrollReveal>
        )}

        {/* Johnson & Johnson */}
        <ScrollReveal as="article" className="wg-card" delay={0.06}>
          <Link
            href="/work/jnj"
            className="wg-cover"
            style={{ background: GRADIENTS.jnj }}
            data-cursor-label="View Case Study"
            data-buddy={CARD_LINES.jnj}
            data-buddy-delay={CARD_DELAY_MS}
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
        </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
