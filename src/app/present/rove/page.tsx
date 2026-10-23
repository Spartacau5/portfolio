'use client';

import { useEffect, useRef } from 'react';
import CatAnimation from '../../components/CatAnimation';
import { SHOW_TASHVI } from '../../lib/flags';
import FilmBeats from './FilmBeats';
import '../present.css';
import './rove.css';

/*
 * /present/rove — the deck for Rove's content lead conversation.
 * Same engine and look as /present; the case shifts from "designer"
 * to "the person who makes the content that sells the product."
 * Keyboard (arrows / space / home / end / pgup / pgdn) + click-to-advance.
 */

const GRAD = {
  zoominfo: 'linear-gradient(180deg, #BFF0FF 0%, #EBEFF9 100%)',
  tashvi: 'linear-gradient(180deg, #F8EDC7 0%, #EDF9EE 100%)',
  arrive: 'linear-gradient(180deg, #FFCEFE 0%, #FFF0FF 100%)',
  fleet: 'linear-gradient(180deg, #D6EBFE 0%, #D6E0DC 100%)',
  jnj: 'linear-gradient(180deg, #FEDBD3 0%, #FFF9ED 100%)',
  hypex: 'linear-gradient(180deg, #D6D7FE 0%, #F1F0FE 100%)',
};

// one tile per product: the walkthrough loops, the name and industry caption it
// center: crop from the middle instead of the top (for clips whose subject isn't a UI header)
const WORK: { name: string; field: string; grad: string; video?: string; stills?: string[]; center?: boolean }[] = [
  {
    name: 'ZoomInfo · SalesOS',
    field: 'B2B SaaS · AI search',
    grad: GRAD.zoominfo,
    video: '/images/zi-new-search.mp4',
  },
  {
    name: 'ZoomInfo · TalentOS',
    field: 'Recruiting · candidate SMS',
    grad: GRAD.zoominfo,
    video: '/images/present/zi-sms.mp4',
  },
  {
    name: 'Arrive · ParkMobile',
    field: 'Mobility · fleet onboarding',
    grad: GRAD.arrive,
    video: '/images/arrive-vision2.mp4',
    center: true,
  },
  {
    name: 'EasyPark',
    field: 'Mobility · parking planner MVP',
    grad: GRAD.fleet,
    video: '/images/parking-planner.mp4',
  },
  {
    name: 'Johnson & Johnson',
    field: 'Healthcare · ESG reporting',
    grad: GRAD.jnj,
    stills: ['/images/jnj-report.png', '/images/jnj-dei.png'],
  },
  {
    name: 'HYPEX',
    field: 'Web3 gaming · launch visuals',
    grad: GRAD.hypex,
    video: '/images/present/hypex.mp4',
    center: true,
  },
];

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function RovePresentPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);
  const busyRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const slides = Array.from(root.querySelectorAll<HTMLElement>('.pr-slide'));
    const total = slides.length;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canAnimate = typeof Element.prototype.animate === 'function';

    const curEl = root.querySelector<HTMLElement>('#pr-cur');
    const totEl = root.querySelector<HTMLElement>('#pr-tot');
    const playhead = root.querySelector<HTMLElement>('#pr-playhead');

    document.documentElement.classList.add('pr-presenting');
    if (totEl) totEl.textContent = String(total).padStart(2, '0');

    const insOf = (s: HTMLElement) => Array.from(s.querySelectorAll<HTMLElement>('.pr-in'));
    const videosOf = (s: HTMLElement) => Array.from(s.querySelectorAll<HTMLVideoElement>('video'));

    const chrome = () => {
      const i = idxRef.current;
      if (curEl) curEl.textContent = String(i + 1).padStart(2, '0');
      if (playhead) playhead.style.transform = `scaleX(${(i + 1) / total})`;
      root.classList.toggle('is-start', i === 0);
    };

    const settle = (el: HTMLElement) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    };

    // the one motion: a slide's cues settle in, staggered, on a single curve
    const enter = (slide: HTMLElement) => {
      const items = insOf(slide);
      videosOf(slide).forEach((v) => {
        v.play().catch(() => {});
      });
      if (reduce || !canAnimate) {
        items.forEach(settle);
        return;
      }
      items.forEach((el, k) => {
        el.style.opacity = '0';
        try {
          const a = el.animate(
            [
              { opacity: 0, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 720, easing: EASE, delay: 80 + k * 60, fill: 'both' }
          );
          a.onfinish = () => settle(el);
        } catch {
          settle(el);
        }
      });
    };

    const leave = (slide: HTMLElement) => {
      videosOf(slide).forEach((v) => v.pause());
    };

    const show = (next: number) => {
      const i = idxRef.current;
      if (busyRef.current || next === i || next < 0 || next >= total) return;
      busyRef.current = true;
      const cur = slides[i];
      const nxt = slides[next];

      const swap = () => {
        cur.classList.remove('is-active');
        leave(cur);
        nxt.classList.add('is-active');
        idxRef.current = next;
        chrome();
        enter(nxt);
        window.setTimeout(() => {
          busyRef.current = false;
        }, reduce ? 0 : 420);
      };

      if (reduce || !canAnimate) {
        swap();
        return;
      }

      try {
        const a = cur.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 220,
          easing: 'ease-out',
          fill: 'forwards',
        });
        a.onfinish = () => {
          a.cancel();
          swap();
        };
      } catch {
        swap();
      }
    };

    const nextSlide = () => show(idxRef.current + 1);
    const prevSlide = () => show(idxRef.current - 1);

    const onInteractive = (el: EventTarget | null) =>
      el instanceof HTMLElement && !!el.closest('a, button, input, textarea');

    const onKey = (e: KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'Enter') && onInteractive(e.target)) return;
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter'].indexOf(e.key) !== -1) {
        e.preventDefault();
        nextSlide();
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].indexOf(e.key) !== -1) {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        show(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        show(total - 1);
      }
    };

    const stage = root.querySelector<HTMLElement>('.pr-stage');
    const onClick = (e: MouseEvent) => {
      if (onInteractive(e.target)) return;
      if (window.getSelection()?.toString()) return;
      nextSlide();
    };

    // the face mark top-left is a home button: click restarts from slide 1
    const mark = root.querySelector<HTMLElement>('.pr-chrome--tl');
    const onMark = (e: MouseEvent) => {
      e.stopPropagation();
      show(0);
    };

    window.addEventListener('keydown', onKey);
    stage?.addEventListener('click', onClick);
    mark?.addEventListener('click', onMark);

    // optional deep link: /present/rove#3 opens on slide 3
    const hashN = parseInt(window.location.hash.replace('#', ''), 10);
    const start = hashN >= 1 && hashN <= total ? hashN - 1 : 0;
    slides.forEach((s, si) => {
      s.classList.toggle('is-active', si === start);
      if (si !== start) leave(s);
    });
    idxRef.current = start;
    chrome();
    enter(slides[start]);

    return () => {
      window.removeEventListener('keydown', onKey);
      stage?.removeEventListener('click', onClick);
      mark?.removeEventListener('click', onMark);
      document.documentElement.classList.remove('pr-presenting');
    };
  }, []);

  return (
    <div className="pr-root is-start" ref={rootRef} aria-label="Arpit Ahluwalia for Rove">
      {/* chrome */}
      <button type="button" className="pr-chrome pr-chrome--tl" title="Back to start" aria-label="Back to start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pr-mark" src="/images/present/face.png" alt="" />
      </button>
      <div className="pr-chrome pr-chrome--tr">
        <b id="pr-cur">01</b>
        <span className="pr-chrome-dim">/</span>
        <span id="pr-tot" className="pr-chrome-dim">08</span>
      </div>

      <div className="pr-stage">
        {/* 01 — WHO */}
        <section className="pr-slide pr-slide--who is-active" data-label="Who">
          <div className="pr-who-top">
            <h1 className="pr-h1 pr-in">Arpit Ahluwalia</h1>
            <p className="pr-lede pr-in">I design products, and the stories that sell them.</p>
            <p className="pr-spec pr-in">5+ years in enterprise and startups. Hands-on with</p>
            <ul className="pr-tags pr-in">
              <li className="pr-tag">Product marketing</li>
              <li className="pr-tag">Scripts &amp; storyboards</li>
              <li className="pr-tag">Motion &amp; demos</li>
              <li className="pr-tag">Client-facing delivery</li>
            </ul>
          </div>

          <div className="pr-who-foot">
            <div className="pr-cat pr-in">
              <CatAnimation trigger="hover" hideTooltip />
            </div>
          </div>
        </section>

        {/* 02 — TIMELINE */}
        <section className="pr-slide pr-slide--path" data-label="The path">
          <ol className="pr-path">
            <li className="pr-col pr-in">
              <span className="pr-step-year">2017 – 21</span>
              <div className="pr-step">
                <span className="pr-step-org">Drexel</span>
                <span className="pr-step-role">BS, UX &amp; Interaction Design</span>
              </div>
            </li>

            <li className="pr-col pr-in">
              <span className="pr-step-year">2021 – 22 · in parallel</span>
              <div className="pr-step">
                <span className="pr-step-org">Johnson &amp; Johnson</span>
                <span className="pr-step-role">Contract UX/UI · healthcare</span>
              </div>
              <div className="pr-step">
                <span className="pr-step-org">HypeX</span>
                <span className="pr-step-role">Contract UX/UI · Web3.0 gaming</span>
              </div>
              <div className="pr-step">
                <span className="pr-step-org pr-step-org--bold">eUnderdog</span>
                <span className="pr-step-role">Founding Product Lead · full-time · e-commerce</span>
              </div>
            </li>

            <li className="pr-col pr-in">
              <span className="pr-step-year">2022 – 24</span>
              <div className="pr-step">
                <span className="pr-step-org">ZoomInfo</span>
                <span className="pr-step-role">UX/UI Designer III · B2B SaaS, GTM</span>
                <ul className="pr-minitags">
                  <li>Conversational AI</li>
                  <li>LLM search</li>
                  <li>Natural language</li>
                  <li>Enterprise</li>
                </ul>
              </div>
            </li>

            <li className="pr-col pr-in">
              <span className="pr-step-year">2024 – 26</span>
              <div className="pr-step">
                <span className="pr-step-org pr-step-org--bold">Parsons</span>
                <span className="pr-step-role">MS, Strategic Design &amp; Management</span>
                <ul className="pr-minitags">
                  <li className="pr-minitag--ink">AI</li>
                </ul>
              </div>
              <div className="pr-step">
                <span className="pr-step-sub">2025 – 26</span>
                <span className="pr-step-org">Arrive</span>
                <span className="pr-step-role">Contract product design · via Craft · mobility</span>
              </div>
              {SHOW_TASHVI && (
              <div className="pr-step">
                <span className="pr-step-org">Tashvi.ai</span>
                <span className="pr-step-role">Co-founder &amp; Design Lead · conversational AI product</span>
              </div>
              )}
            </li>

            <li className="pr-col pr-col--now pr-in">
              <span className="pr-step-year">Now · 2026</span>
              <div className="pr-step">
                <span className="pr-step-org pr-step-org--bold">Standard Chartered</span>
                <span className="pr-step-role">Conversational AI to make relationship managers more efficient</span>
              </div>
              <div className="pr-step">
                <span className="pr-step-org pr-step-org--bold">Meriton</span>
                <span className="pr-step-role">Conversational layer connecting sales, FinOps and developers around accounts payable</span>
              </div>
            </li>
          </ol>
        </section>

        {/* 03 — PRODUCTS */}
        <section className="pr-slide rv-slide--work" data-label="Products">
          <div className="pr-eyebrow pr-in">Product design · six products, five industries</div>
          <div className="rv-work">
            {WORK.map((w) => (
              <figure key={w.name} className="pr-frame rv-work-tile pr-in" style={{ background: w.grad }}>
                <div className="rv-work-media">
                  {w.video ? (
                    <video
                      className={`pr-shot${w.center ? ' rv-work-shot--center' : ''}`}
                      src={w.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`${w.name} walkthrough`}
                    />
                  ) : (
                    <div className="rv-work-stills">
                      {w.stills?.map((src) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={src} className="pr-shot" src={src} alt="" />
                      ))}
                    </div>
                  )}
                </div>
                <figcaption className="rv-work-cap">
                  <span className="rv-work-name">{w.name}</span>
                  <span className="pr-cap">{w.field}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 04 — NOW */}
        <section className="pr-slide pr-slide--now" data-label="Now">
          <div className="pr-now-head">
            <div className="pr-eyebrow pr-in">Now · 2026</div>
            <h2 className="pr-h2 pr-in">What I’m building now.</h2>
          </div>
          <div className="pr-now-grid">
            <div className="pr-now pr-in">
              <span className="pr-now-k">Standard Chartered</span>
              <span className="pr-now-what">An AI co-advisor for relationship managers.</span>
              <span className="pr-now-cue">
                I designed meeting preparation, live-call assistance, and post-meeting workflows.
              </span>
              <span className="pr-now-status">Prototype secured approval for a 15-user pilot.</span>
            </div>
            <div className="pr-now pr-in">
              <span className="pr-now-k">Meriton / Mars</span>
              <span className="pr-now-what">An agentic accounts-payable experience in Microsoft Teams.</span>
              <span className="pr-now-cue">
                I own the UX across invoice exceptions, purchase-order matching, and cross-team review.
              </span>
              <span className="pr-now-status">POC in progress.</span>
            </div>
            <div className="pr-now pr-in">
              <span className="pr-now-k">Vaapsi</span>
              <span className="pr-now-what">An ecommerce platform spanning brand and product experience.</span>
              <span className="pr-now-cue">
                I lead design with a Netherlands-based founder and an India-based engineering team.
              </span>
              <span className="pr-now-status">Design and frontend development.</span>
            </div>
          </div>
        </section>

        {/* 05 — HOW I MAKE CONTENT */}
        <section className="pr-slide rv-slide--flow" data-label="Process">
          <div className="pr-eyebrow pr-in">Process · videos, writing, collateral</div>
          <h2 className="pr-h2 pr-h2--section pr-in">How I make content.</h2>
          <ol className="rv-flow">
            {[
              ['Idea', 'One audience, one problem, one takeaway.', 'One-line brief'],
              ['Hook', 'The first three seconds decide the rest.', 'Hook options'],
              ['Script', 'Storyboard it before anything gets made.', 'Script + boards'],
              ['Collateral', 'Frames, type and motion as one system.', 'Design kit'],
              ['Execute', 'Record, animate, edit, write the post.', 'Final cuts'],
              ['Test', 'Ship variants. Keep what holds attention.', 'What to repeat'],
            ].map(([k, s, out], i) => (
              <li key={k} className="rv-step pr-in">
                <span className="pr-cue-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="rv-step-k">{k}</span>
                <span className="rv-step-s">{s}</span>
                <span className="rv-step-out">{out}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 06 — TASHVI PRODUCT FILM */}
        {SHOW_TASHVI && (
        <section className="pr-slide pr-slide--zi rv-slide--film" data-label="Tashvi · launch film">
          <FilmBeats grad={GRAD.tashvi} />
        </section>
        )}

        {/* 07 — WHERE AI FITS */}
        <section className="pr-slide pr-slide--tenets rv-slide--ai" data-label="AI">
          <div className="pr-eyebrow pr-in">Where AI fits</div>
          <h2 className="pr-h2 pr-h2--section pr-in">Faster drafts. My judgment.</h2>
          <ol className="pr-tenets">
            <li className="pr-tenet pr-in">
              <span className="pr-tenet-n">01</span>
              <span className="pr-tenet-w">Explore</span>
              <span className="pr-tenet-s">Dozens of angles and hooks in minutes, so the idea stage goes wide.</span>
            </li>
            <li className="pr-tenet pr-in">
              <span className="pr-tenet-n">02</span>
              <span className="pr-tenet-w">Make</span>
              <span className="pr-tenet-s">Frames, renders and variations generated, then designed into one system.</span>
            </li>
            <li className="pr-tenet pr-in">
              <span className="pr-tenet-n">03</span>
              <span className="pr-tenet-w">Edit</span>
              <span className="pr-tenet-s">Nothing ships without a human pass for voice and accuracy.</span>
            </li>
          </ol>
        </section>

        {/* 08 — THANK YOU */}
        <section className="pr-slide pr-slide--qs pr-slide--thanks" data-label="Thank you">
          <div className="pr-qs-head">
            <h2 className="pr-h2 pr-in">Thank you.</h2>
            <p className="pr-lede pr-lede--faint pr-in">I’d love to talk about where I can add the most value at Rove.</p>
          </div>
        </section>
      </div>

      {/* progress */}
      <div className="pr-track" aria-hidden="true">
        <div className="pr-playhead" id="pr-playhead" />
      </div>
    </div>
  );
}
