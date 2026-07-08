'use client';

import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDragScroll } from '../hooks/useDragScroll';

// V4 About — flat full-width layout from Figma (node 619-20021).
// Persona tabs swap the header line with a smooth animation.

// Link with a ↗ arrow and an underline that wipes in left→right on hover (v1 style)
function ExtLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={`ab-link ${className}`.trim()} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <svg className="ab-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

const TABS: { key: string; label: string; header: ReactNode }[] = [
  {
    key: 'all',
    label: 'For All',
    header: 'I’m a designer who cares about creating beautiful things that help people.',
  },
  {
    key: 'recruiters',
    label: 'Recruiters',
    header: (
      <>
        I’m a product designer with 5 years of experience across B2B SaaS, mobility, and healthcare,
        at companies large and small.
        <span className="ab-title-break">I’m actively looking for a new role.</span>
      </>
    ),
  },
  {
    key: 'design-leads',
    label: 'Design Leads',
    header: (
      <>
        I take pride in my craft, and love mentoring earlier career designers (currently mentoring
        through <ExtLink href="https://growth.aigany.org/amp/">AIGA NY</ExtLink>). I develop cross
        functional partnerships, and thrive in complex, ambiguous environments.
      </>
    ),
  },
  {
    key: 'fellow-designers',
    label: 'Designers',
    header:
      'I’m a systems thinker with a high bar for quality. From process to pixels, I’ll collaborate with you, learn from you, and help make something we’re proud of.',
  },
  {
    key: 'product-managers',
    label: 'Product Managers',
    header:
      'I bring end-to-end product acumen, from vision and strategy to discovery and delivery. I’ll partner closely with you to generate the highest impact possible.',
  },
  {
    key: 'engineers',
    label: 'Engineers',
    header: (
      <>
        I’m {'{highly_technical}'} and while (I’m ≠ engineer) I know my way /around &amp; can speak
        “fluently” with you; I built (<ExtLink href="https://arpitahluwalia.com">this.site</ExtLink>) from
        scratch + (<ExtLink href="https://tashvi.ai">this.one</ExtLink>) &amp;&amp; (
        <ExtLink href="https://www.unstableml.com">this.too</ExtLink>).
      </>
    ),
  },
];

const COMPACT_HEADER_TABS = new Set(['all', 'recruiters', 'design-leads']);

const INTRO = [
  {
    lead: 'I ask questions before diving into solutions.',
    body: 'I don’t wait for perfect briefs. I start with questions: What problem are we really solving? For whom? What’s actually possible given our constraints? What does success look like?\n\nThis approach turns ambiguous asks into clear direction. It gets product, eng, and design aligned from the start.',
  },
  {
    lead: 'I know how to operate in product-led organizations where design is still earning influence.',
    body: 'That means managing up and down, aligning stakeholders, and initiating design-led work without explicit mandate. I speak product and engineering fluently and frame decisions in terms of trade-offs and opportunity costs.\n\nGood design isn’t just “users love it” — it’s design that moves the business forward.',
  },
  {
    lead: 'I thrive in different contexts.',
    body: 'Lean startups meant tight budgets and immovable deadlines. B2B Enterprise meant complex design restrictions. Global platforms meant balancing regional nuance with scale.\n\nDifferent constraints surface different solutions. I look for patterns that transfer and stay flexible about what needs to be solved fresh.',
  },
];

const EXPERIENCE = [
  { year: '2026', org: 'Tashvi.ai', role: 'Co-founder & Design Lead' },
  { year: '2025', org: 'Arrive', role: 'Contract UX Researcher' },
  { year: '2023', org: 'ZoomInfo', role: 'UX/UI Designer III' },
  { year: '2022', org: 'Johnson & Johnson', role: 'Contract UX/UI Designer' },
  { year: '2021', org: 'HypeX', role: 'UI Designer' },
];
const LEADERSHIP = [
  { year: 'Present', org: 'AIGA NY', role: 'Mentor' },
  { year: '2025', org: 'Figma', role: 'Campus Leader' },
  { year: '2021', org: 'TEDxDrexelU', role: 'Vice-President' },
];
const COMMUNITY = [
  { year: '2026', org: 'PrabhKiSeva', role: 'Co-Founder' },
  { year: '2025', org: 'ArtMate', role: 'Co-Founder' },
];
const AWARDS = [
  { year: '2025', org: 'FigBuild', role: 'Winner' },
  { year: '2025', org: 'IDEO: AI x Design Thinking', role: 'Certificate' },
];

// Testimonials — split into two columns as in the Figma.
const QUOTES_LEFT = [
  {
    name: 'Or Mendels',
    role: 'Director of Product Design',
    url: 'https://www.linkedin.com/in/or-mendels-2b841672/',
    body: '“A standout team member who handles end-to-end processes seamlessly — from user research to detailed design. Truly a pleasure to collaborate with.”',
  },
  {
    name: 'Jeremy Agtarap',
    role: 'Product Marketing Manager',
    url: 'https://www.linkedin.com/in/jeremy-agtarap-09a09959',
    body: '“He made a genuinely complicated SMS process as easy as 1, 2, 3, always keeping the user’s end-to-end journey in mind. Any company would be lucky to have him.”',
  },
  {
    name: 'Vineet Kaushik',
    role: 'Sr. Software Engineer',
    url: 'https://www.linkedin.com/in/vineet-kaushik-4ba166236',
    body: '“He highlighted UX that greatly enhanced how users interact with what we built. Solid, dependable, and always ready to unblock the team.”',
  },
];
const QUOTES_RIGHT = [
  {
    name: 'Amir Kfir',
    role: 'UX Team Lead/Manager',
    url: 'https://www.linkedin.com/in/amirkfir',
    body: '“His commitment to quality and innovative problem-solving sets him apart. A superb designer with an incredible drive to learn.”',
  },
  {
    name: 'Kevin White',
    role: 'Sr. UX Designer',
    url: 'https://www.linkedin.com/in/kevinwhite1000',
    body: '“A remarkable ability to absorb feedback and navigate intricate user journeys. He delivers designs of outstanding quality with remarkable speed and efficiency.”',
  },
  {
    name: 'Emily Stuart',
    role: 'Sr. UX Researcher',
    url: 'https://www.linkedin.com/in/emilylaurenstuart',
    body: '“He came into a whirlwind of a complicated recruitment with no fear and full commitment. He shows up with great ideas and an entrepreneurial energy that makes him an asset to any team.”',
  },
];

const GALLERY: { cap: string; img: string; imgMobile?: string; url?: string; pos?: string }[] = [
  {
    cap: 'Mentoring designers at AIGA NY',
    img: '/images/gallery/aiga-mentor.webp',
    imgMobile: '/images/gallery/aiga-mentor-mobile.jpg',
    url: 'https://www.linkedin.com/posts/arpitahluwalia_aiga-aigany-aigamentor-share-7443379510911057920-MwWK/?utm_source=share&utm_medium=member_desktop&rcm=ACoAACTea-cBaGhvJbY2Ie6x3UbeUR0f3p5rW6Q',
  },
  {
    cap: 'Won Figma’s first national hackathon (1st of 54 teams)',
    img: '/images/photos/1745887158804.jpg',
    url: 'https://www.linkedin.com/posts/arpitahluwalia_figbuild-dreamscape-coherence-activity-7322781517967933440-gzva?utm_source=share&utm_medium=member_desktop&rcm=ACoAACTea-cBaGhvJbY2Ie6x3UbeUR0f3p5rW6Q',
    pos: '72% center', // right-of-middle
  },
  {
    cap: 'Curated a community of 1000+ designers at Parsons',
    img: '/images/gallery/figma-campus-leader.webp',
    url: 'https://www.instagram.com/p/DPK1mpMDal3/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==',
  },
  {
    cap: 'Organize monthly food donation drives since COVID',
    img: '/images/gallery/prabhkiseva.jpg',
    url: 'https://www.prabhkiseva.org/',
    pos: '25% center', // left-of-middle
  },
];

function Rows({ items }: { items: { year: string; org: string; role: string }[] }) {
  return (
    <div className="ab-rows">
      {items.map((r) => (
        <div className="ab-row" key={r.year + r.org}>
          <span className="ab-row-year">{r.year}</span>
          <span className="ab-row-org">{r.org}</span>
          <span className="ab-row-role">{r.role}</span>
        </div>
      ))}
    </div>
  );
}

// Each quote fades in on scroll; `row` staggers the reveal so rows don't all
// appear at once (left + right of the same row come in together).
const quoteFade = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  show: (row: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const, delay: row * 0.45 },
  }),
};

function Quote({
  name,
  role,
  url,
  body,
  row,
}: {
  name: string;
  role: string;
  url: string;
  body: string;
  row: number;
}) {
  return (
    <motion.article
      className="ab-quote"
      variants={quoteFade}
      custom={row}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -18% 0px' }}
    >
      <p className="ab-quote-body">{body}</p>
      <div className="ab-quote-attr">
        <ExtLink href={url} className="ab-quote-name">{name}</ExtLink>
        <span className="ab-quote-role">{role}</span>
      </div>
    </motion.article>
  );
}

// Intro columns fade in one-by-one, starting ~1s after the header / photo /
// filter have loaded.
const introCol = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as const, delay: 1.5 + i * 0.9 },
  }),
};

// Sections lower on the page fade in smoothly once scrolled into view.
const scrollFade = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const scrollFadeProps = {
  variants: scrollFade,
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  // Trigger later via a negative bottom margin (safe for tall sections, unlike a
  // high `amount` which can never be reached on mobile).
  viewport: { once: true, amount: 0.3, margin: '0px 0px -22% 0px' },
};

export default function About() {
  const [active, setActive] = useState('all');
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);
  const tabsRef = useDragScroll<HTMLDivElement>();
  const header = TABS.find((t) => t.key === active)?.header ?? TABS[0].header;

  // When a tab sitting near an edge is clicked, nudge the strip so it AND the
  // next/previous option come fully into view.
  const scrollTabIntoView = useCallback(
    (btn: HTMLElement) => {
      const c = tabsRef.current;
      if (!c) return;
      const cRect = c.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      const edge = 40; // how close to the edge counts as "going out of focus"
      const gap = 20; // breathing room past the revealed neighbour
      let delta = 0;
      if (bRect.right > cRect.right - edge) {
        // Clicked tab is near the right edge → reveal it + the whole next option.
        const next = btn.nextElementSibling as HTMLElement | null;
        const targetRight = next ? next.getBoundingClientRect().right : bRect.right;
        delta = targetRight - cRect.right + gap;
      } else if (bRect.left < cRect.left + edge) {
        // Near the left edge → reveal it + the whole previous option.
        const prev = btn.previousElementSibling as HTMLElement | null;
        const targetLeft = prev ? prev.getBoundingClientRect().left : bRect.left;
        delta = targetLeft - cRect.left - gap;
      }
      if (delta !== 0) c.scrollBy({ left: delta, behavior: 'smooth' });
    },
    [tabsRef]
  );

  const updateTabFades = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 4) {
      setFadeLeft(false);
      setFadeRight(false);
      return;
    }
    setFadeLeft(el.scrollLeft > 4);
    setFadeRight(el.scrollLeft < maxScroll - 4);
  }, [tabsRef]);

  useLayoutEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    updateTabFades();

    const onScroll = () => updateTabFades();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTabFades);

    const ro = new ResizeObserver(updateTabFades);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTabFades);
      ro.disconnect();
    };
  }, [tabsRef, updateTabFades]);

  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      <div className="ab-home">
        {/* Persona tabs — single-line scroll strip with edge fade + drag */}
        <motion.div
          className="ab-tabs-wrap"
          data-fade-left={fadeLeft || undefined}
          data-fade-right={fadeRight || undefined}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.33 }}
        >
          <div
            ref={tabsRef}
            className="ab-tabs"
            role="tablist"
            aria-label="Audience"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={t.key === active}
                className={`ab-tab${t.key === active ? ' is-active' : ''}`}
                onClick={(e) => {
                  setActive(t.key);
                  scrollTabIntoView(e.currentTarget);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Header + photo — direct grid children so the photo can align to the
            top of the filter regardless of how many rows the tabs wrap to.
            The slot handles the on-load entrance (matching Work/More); the inner
            AnimatePresence handles the quick blur-swap when a tab is picked. */}
        <motion.div
          className="ab-title-slot"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.19 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={active}
              className={`ab-title${COMPACT_HEADER_TABS.has(active) ? ' ab-title--compact' : ''}`}
              data-tab={active}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {header}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
        <motion.div
          className="ab-photo-frame"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.19 }}
        >
          <Image
            src="/images/about-hero.png"
            alt="Arpit Ahluwalia"
            width={422}
            height={473}
            className="ab-photo"
            priority
          />
        </motion.div>

        {/* 3-column intro — reveals one-by-one on first scroll */}
        <section className="ab-intro">
          {INTRO.map((c, i) => (
            <motion.div
              key={c.lead}
              custom={i}
              variants={introCol}
              initial="hidden"
              animate="show"
            >
              <p className="ab-intro-lead">{c.lead}</p>
              <p className="ab-intro-body">{c.body}</p>
            </motion.div>
          ))}
        </section>

        {/* Experience / Leadership — fade in together on scroll */}
        <motion.section className="ab-cols" {...scrollFadeProps}>
          <div>
            <h2 className="ab-h2">Experience</h2>
            <Rows items={EXPERIENCE} />
          </div>
          <div>
            <h2 className="ab-h2">Leadership</h2>
            <Rows items={LEADERSHIP} />
          </div>
        </motion.section>

        {/* Community / Awards — fade in together on scroll */}
        <motion.section className="ab-cols" {...scrollFadeProps}>
          <div>
            <h2 className="ab-h2">Community</h2>
            <Rows items={COMMUNITY} />
          </div>
          <div>
            <h2 className="ab-h2">Awards &amp; Certifications</h2>
            <Rows items={AWARDS} />
          </div>
        </motion.section>

        {/* Gallery — fade in on scroll */}
        <motion.section className="ab-gallery" {...scrollFadeProps}>
          {GALLERY.map((g) => {
            const shots = (
              <>
                <Image
                  src={g.img}
                  alt={g.cap}
                  width={640}
                  height={853}
                  className={`ab-shot${g.imgMobile ? ' ab-shot--desktop' : ''}`}
                  style={g.pos ? { objectPosition: g.pos } : undefined}
                />
                {g.imgMobile && (
                  <Image
                    src={g.imgMobile}
                    alt={g.cap}
                    width={1280}
                    height={800}
                    className="ab-shot ab-shot--mobile"
                  />
                )}
              </>
            );
            return (
              <figure key={g.cap}>
                {g.url ? (
                  <a className="ab-shot-link" href={g.url} target="_blank" rel="noopener noreferrer">
                    {shots}
                  </a>
                ) : (
                  shots
                )}
                <figcaption className="ab-cap">
                  {g.url ? (
                    <a className="ab-link" href={g.url} target="_blank" rel="noopener noreferrer">
                      {g.cap}
                      <svg className="ab-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    g.cap
                  )}
                </figcaption>
              </figure>
            );
          })}
        </motion.section>

        {/* Testimonials — each quote fades in on scroll, staggered by row */}
        <section className="ab-quotes">
          <div className="ab-qcol">
            {QUOTES_RIGHT.map((q, i) => (
              <Quote key={q.name} row={i} {...q} />
            ))}
          </div>
          <div className="ab-qcol">
            {QUOTES_LEFT.map((q, i) => (
              <Quote key={q.name} row={i} {...q} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
