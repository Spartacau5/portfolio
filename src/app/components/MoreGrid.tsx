'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CatAnimation from './CatAnimation';
import { MusicPlayer } from './MusicPlayer';
import { analytics } from './GoogleAnalytics';

// V4 MORE page. Header + subtext animate in smoothly on entry (rise + blur
// clear), then a mixed 2/3-column grid of experiments, community & play.

const GRAD = {
  offprint: 'linear-gradient(180deg, #E7ECF3 0%, #F5F7FA 100%)',
  ekko: 'linear-gradient(180deg, #E7E0FF 0%, #F4F0FF 100%)',
  sinai: 'linear-gradient(180deg, #BFF0FF 0%, #EBEFF9 100%)',
  microsoft: 'linear-gradient(180deg, #F8F3C7 0%, #EBEFF9 100%)',
  avatars: 'linear-gradient(180deg, #FEDBD3 0%, #FFF9ED 100%)',
  photo: 'linear-gradient(180deg, #E9ECEF 0%, #F5F6F8 100%)',
};

const YT_SHORT = 'Iuxt6Z8Trxs';
const YT_CHANNEL = 'https://www.youtube.com/@BrownPostMalone/featured';

const introContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};
const introItem = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Header removed — subtext sits on the left, tag on the right.
function Meta({ sub, tag }: { title?: string; sub: string; tag?: string }) {
  return (
    <div className="mg-meta">
      <div className="mg-meta-row">
        <p className="mg-card-sub">{sub}</p>
        {tag && <span className="mg-tag">{tag}</span>}
      </div>
    </div>
  );
}

export function MoreGrid() {
  return (
    <div className="mg-home">
      {/* Animated intro */}
      <motion.header
        className="mg-intro"
        variants={introContainer}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="mg-title" variants={introItem}>
          I spend time with my communities, building tools with AI and curating my next DJ set.
        </motion.h1>
        <motion.p className="mg-sub" variants={introItem}>
          Currently building
          <a
            href="https://tashvi.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="mg-sub-chip"
          >
            a tool for designing jewelry with AI
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </motion.p>
      </motion.header>

      {/* Mixed grid — 4 rows */}
      <div className="wg-grid-wrap">
        <div className="wg-cat">
          <CatAnimation />
        </div>
        <div className="mg-grid">
        {/* Row 1 — two wide */}
        <article className="mg-card mg-span-3">
          <a
            href="https://www.unstableml.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mg-cover"
            style={{ background: GRAD.avatars }}
            data-cursor-label="View Website"
            aria-label="UnstableML — view website"
            onClick={() => analytics.trackCaseStudyView('UnstableML')}
          >
            <div className="mg-cover-inner mg-cover-inner--contain">
              <video src="/images/more/ai-avatars-opt.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
            </div>
          </a>
          <Meta title="UnstableML" sub="Designed an AI workflow enabling content creators to generate AI avatars." tag="AI Tool" />
        </article>

        <article className="mg-card mg-span-3">
          <a
            href="https://chromewebstore.google.com/detail/offprint/noolmimnjfhhnkibgledocngcgbkmojl"
            target="_blank"
            rel="noopener noreferrer"
            className="mg-cover"
            style={{ background: GRAD.offprint }}
            data-cursor-label="View Website"
            aria-label="Offprint — view Chrome extension"
            onClick={() => analytics.trackCaseStudyView('Offprint')}
          >
            <div className="mg-cover-inner">
              <video src="/images/offprint-loop.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
            </div>
          </a>
          <Meta title="Offprint" sub="Built a Chrome extension to track and offset your AI carbon footprint." tag="AI Tool" />
        </article>

        {/* Row 2 — three columns */}
        <article className="mg-card mg-span-2">
          <div
            className="mg-cover mg-cover--bleed mg-cover--plain mg-cover--square mg-cover--light"
            data-cursor-label="Coming soon"
            style={{ cursor: 'default' }}
          >
            <Image
              src="/images/more/sinai-cover.png"
              alt="Mount Sinai incident reporting app"
              width={1200}
              height={900}
              className="mg-bleed"
            />
          </div>
          <Meta title="Mount Sinai" sub="Designed the UI for an incident-reporting app for hospitals in Africa." tag="UI Design" />
        </article>

        <article className="mg-card mg-span-2">
          <a
            href="https://github.com/Spartacau5/studybuddy"
            target="_blank"
            rel="noopener noreferrer"
            className="mg-cover mg-cover--bleed mg-cover--square"
            data-cursor-label="View Website"
            aria-label="Study Buddy — view on GitHub"
            onClick={() => analytics.trackCaseStudyView('Study Buddy')}
          >
            <video className="mg-bleed" src="/images/more/study-buddy.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          </a>
          <Meta title="Study Buddy" sub="Built a study companion which helps you avoid distractions." tag="AI Tool" />
        </article>

        <article className="mg-card mg-span-2">
          <Link
            href="/work/microsoft"
            className="mg-cover mg-cover--bleed mg-cover--square mg-cover--light"
            data-cursor-label="View Case Study"
            aria-label="Microsoft case study"
            onClick={() => analytics.trackCaseStudyView('Microsoft')}
          >
            <Image
              src="/images/more/microsoft-cover.png"
              alt="Microsoft × Parsons AI Assistant concept"
              width={1200}
              height={900}
              className="mg-bleed"
            />
          </Link>
          <Meta title="Microsoft" sub="A collaboration with Microsoft's Inclusive Design team on the future of education." tag="UX/UI Design" />
        </article>

        {/* Row 3 — two wide (AI experiments) */}
        <article className="mg-card mg-span-3">
          <a
            href="/documents/ekko-final-presentation-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mg-cover"
            style={{ background: GRAD.ekko }}
            data-cursor-label="View PDF"
            aria-label="Ekko — view presentation PDF"
            onClick={() => analytics.trackCaseStudyView('Ekko')}
          >
            <div className="mg-cover-inner">
              <Image src="/images/more/ekko.jpg" alt="Ekko dashboard" width={1200} height={760} />
            </div>
          </a>
          <Meta title="Ekko" sub="An AI copilot enabling nonprofits to do more with less." tag="Strategy Capstone" />
        </article>

        <article className="mg-card mg-span-3">
          <a
            href="https://github.com/Spartacau5/arpitTrash"
            target="_blank"
            rel="noopener noreferrer"
            className="mg-cover mg-cover--bleed mg-cover--light"
            data-cursor-label="View Website"
            aria-label="AI Waste Detector — view on GitHub"
            onClick={() => analytics.trackCaseStudyView('AI Waste Detector')}
          >
            <video
              className="mg-bleed mg-bleed--zoom"
              src="/images/more/trash-detector.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </a>
          <Meta title="AI Waste Detector" sub="Built an AI waste detector to help you recycle." tag="AI Tool" />
        </article>

        {/* Row 4 — photography · music · gaming */}
        <article className="mg-card mg-span-2">
          <a
            href="https://www.behance.net/gallery/72438781/PHTO141-Black-White-Photography-Powelton"
            target="_blank"
            rel="noopener noreferrer"
            className="mg-cover mg-cover--bleed mg-cover--tall mg-cover--light"
            data-cursor-label="View Website"
            aria-label="Photography and art — view on Behance"
            onClick={() => analytics.trackSocialClick('Behance')}
          >
            <Image
              src="/images/more/photography-art.webp"
              alt="Black and white photography from Powelton Village"
              width={1200}
              height={900}
              className="mg-bleed"
            />
          </a>
          <Meta title="Photography & Art" sub="Some photography and art I create." />
        </article>

        <article className="mg-card mg-span-2">
          <div
            className="mg-cover mg-cover--music mg-cover--plain mg-cover--tall"
            style={{ cursor: 'default' }}
            data-cursor-label="Coming soon"
            role="region"
            aria-label="Raga Beats music player"
          >
            <MusicPlayer fill />
          </div>
          <Meta title="Raga Beats" sub="I've been producing music for a decade with my childhood friend." />
        </article>

        <article className="mg-card mg-span-2">
          <div className="mg-cover mg-cover--bleed mg-cover--plain mg-cover--tall">
            <iframe
              className="mg-yt"
              src={`https://www.youtube.com/embed/${YT_SHORT}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_SHORT}&playsinline=1&modestbranding=1&rel=0`}
              title="Gaming channel"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
            <a
              className="mg-yt-hit"
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gaming channel on YouTube"
              data-cursor-label="View Website"
              onClick={() => analytics.trackSocialClick('YouTube')}
            />
          </div>
          <Meta title="Gaming" sub="Occasional streams. Top 0.3% COD player. Two-time Elden Lord." />
        </article>
        </div>
      </div>
    </div>
  );
}
