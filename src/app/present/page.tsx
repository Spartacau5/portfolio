'use client';

import { useEffect, useRef } from 'react';
import CatAnimation from '../components/CatAnimation';
import './present.css';

/*
 * /present — recruiter walkthrough. Eight slides, one hero (ZoomInfo).
 * Slides are cues for Arpit to talk over, not a document to read.
 * Keyboard (arrows / space / home / end / pgup / pgdn) + click-to-advance.
 * Everything is scoped to .pr-root / pr- so it never restyles the site.
 */

const GRAD = {
  zoominfo: 'linear-gradient(180deg, #BFF0FF 0%, #EBEFF9 100%)',
  tashvi: 'linear-gradient(180deg, #F8EDC7 0%, #EDF9EE 100%)',
};

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function PresentPage() {
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
    // videos marked data-clip="mid" loop a 6s window from the middle
    const clipMid = (v: HTMLVideoElement) => {
      if (v.dataset.clip !== 'mid' || v.dataset.clipped) return;
      v.dataset.clipped = '1';
      const apply = () => {
        const d = v.duration;
        if (!isFinite(d) || d < 8) return;
        const a = d / 2 - 3;
        const b = d / 2 + 3;
        v.currentTime = a;
        v.addEventListener('timeupdate', () => {
          if (v.currentTime >= b) v.currentTime = a;
        });
      };
      if (v.readyState >= 1) apply();
      else v.addEventListener('loadedmetadata', apply, { once: true });
    };

    const enter = (slide: HTMLElement) => {
      const items = insOf(slide);
      videosOf(slide).forEach((v) => {
        clipMid(v);
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

    window.addEventListener('keydown', onKey);
    stage?.addEventListener('click', onClick);

    // optional deep link: /present#3 opens on slide 3
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
      document.documentElement.classList.remove('pr-presenting');
    };
  }, []);

  return (
    <div className="pr-root is-start" ref={rootRef} aria-label="Arpit Ahluwalia walkthrough">
      {/* chrome */}
      <div className="pr-chrome pr-chrome--tl" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pr-mark" src="/images/present/face.png" alt="" />
      </div>
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
            <p className="pr-lede pr-in">Senior product designer · 5+ years in enterprise.</p>
            <p className="pr-spec pr-in">Product designer first. Also hands-on with</p>
            <ul className="pr-tags pr-in">
              <li className="pr-tag">AI development</li>
              <li className="pr-tag">UX engineering</li>
              <li className="pr-tag">Interaction design</li>
              <li className="pr-tag">Product management &amp; research</li>
            </ul>
          </div>

          {/* Billu sits on the rule; hover stretches him, click still advances */}
          <div className="pr-who-foot pr-in">
            <div className="pr-cat">
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
                <span className="pr-step-role">MS, Strategic Design &amp; Management · just graduated</span>
                <ul className="pr-minitags">
                  <li className="pr-minitag--ink">AI</li>
                </ul>
              </div>
              <div className="pr-step">
                <span className="pr-step-sub">2025 – 26</span>
                <span className="pr-step-org">Arrive</span>
                <span className="pr-step-role">Contract product design · via Craft · mobility</span>
              </div>
              <div className="pr-step">
                <span className="pr-step-org">Tashvi.ai</span>
                <span className="pr-step-role">Co-founder &amp; Design Lead · conversational AI product</span>
              </div>
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

        {/* 03 — ZOOMINFO · HERO */}
        <section className="pr-slide pr-slide--zi" data-label="ZoomInfo · SalesOS">
          <div className="pr-zi-copy">
            <div className="pr-eyebrow pr-in">ZoomInfo · SalesOS redesign</div>
            <h2 className="pr-h2 pr-in">The homepage became a conversation.</h2>
            <ol className="pr-cues">
              <li className="pr-cue pr-in">
                <span className="pr-cue-n">01</span>
                <span>Nobody used the old homepage. Too much on it, too little that mattered.</span>
              </li>
              <li className="pr-cue pr-in">
                <span className="pr-cue-n">02</span>
                <span>One instruction: “Describe your perfect contact or company list.”</span>
              </li>
              <li className="pr-cue pr-in">
                <span className="pr-cue-n">03</span>
                <span>Chat lives in the work. Refine inline, don’t bounce between tools.</span>
              </li>
            </ol>
            <div className="pr-stat pr-in">
              <span className="pr-stat-n">13<span className="pr-stat-of">/15</span></span>
              <span className="pr-stat-k">testers preferred the new homepage</span>
            </div>
          </div>

          <div className="pr-zi-media">
            <figure className="pr-frame pr-frame--zi-home pr-in" style={{ background: GRAD.zoominfo }}>
              <video
                className="pr-shot pr-shot--wide"
                src="/images/zi-new-search.mp4"
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/zi-new-homepage.png"
                aria-label="SalesOS: old search, then the new AI homepage toggled on"
              />
              <figcaption className="pr-cap">Old search → new AI homepage · shipped</figcaption>
            </figure>
            <figure className="pr-frame pr-frame--zi-chat pr-in" style={{ background: GRAD.zoominfo }}>
              <video
                className="pr-shot"
                src="/images/chatdrawer.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="SalesOS chat drawer over search results"
              />
              <figcaption className="pr-cap">Chat over results · explored</figcaption>
            </figure>
          </div>
        </section>

        {/* 04 — TASHVI (same hierarchy as the hero, shorter talk) */}
        <section className="pr-slide pr-slide--zi pr-slide--tashvi" data-label="Tashvi.ai">
          <div className="pr-zi-copy">
            <div className="pr-eyebrow pr-in">Tashvi.ai · Co-founder &amp; Design Lead</div>
            <h2 className="pr-h2 pr-in">Built from zero to one. Shipped to real users.</h2>
            <ol className="pr-cues">
              <li className="pr-cue pr-in">
                <span className="pr-cue-n">01</span>
                <span>AI-native platform for jewelers. A sketch becomes a photorealistic render, refined through conversation.</span>
              </li>
              <li className="pr-cue pr-in">
                <span className="pr-cue-n">02</span>
                <span>My role: design lead and UX engineer. Designed it, built the front end, shipped it, scaled it.</span>
              </li>
              <li className="pr-cue pr-in">
                <span className="pr-cue-n">03</span>
                <span>The conversational LLM layer: describe, refine, trust the output. ZoomInfo’s problem, from the builder’s side.</span>
              </li>
            </ol>
            <a className="pr-live pr-in" href="https://tashvi.ai/" target="_blank" rel="noopener noreferrer">
              Live at tashvi.ai
            </a>
          </div>

          <div className="pr-zi-media pr-zi-media--single">
            <figure className="pr-frame pr-frame--tashvi pr-in" style={{ background: GRAD.tashvi }}>
              <video
                className="pr-shot pr-shot--tashvi"
                src="/images/present/tashvi-demo.mp4"
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Tashvi.ai, conversational render studio"
              />
              <figcaption className="pr-cap">Tashvi.ai · live · conversational render studio</figcaption>
            </figure>
          </div>
        </section>

        {/* 05 — NOW */}
        <section className="pr-slide pr-slide--now" data-label="Now">
          <div className="pr-now-head">
            <div className="pr-eyebrow pr-in">Now · currently working on</div>
            <h2 className="pr-h2 pr-in">Two live engagements.</h2>
          </div>
          <div className="pr-now-grid">
            <div className="pr-now pr-in">
              <span className="pr-now-org">Standard Chartered</span>
              <span className="pr-now-cue">
                Global bank. I’m designing tools that make relationship managers’ days more efficient: less prep, less admin, more time with clients.
              </span>
              <div className="pr-now-point">
                <span className="pr-now-k">The conversational piece</span>
                <span className="pr-now-cue">
                  A pre- and post-meeting agent the RM talks to: talking points, what to lead with, the house view, live market context before they walk in, and the follow-ups after.
                </span>
              </div>
            </div>
            <div className="pr-now pr-in">
              <span className="pr-now-org">Meriton</span>
              <span className="pr-now-cue">
                Accounts-payable platform. I’m connecting sales, FinOps and developers so the AP ecosystem is easier to run and maintain.
              </span>
              <div className="pr-now-point">
                <span className="pr-now-k">The conversational piece</span>
                <span className="pr-now-cue">
                  An audit-and-efficiency agent: “this invoice doesn’t match. Who do I reach out to, and what’s the context?” Answers in the work, with the trail behind them.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — HOW I TREAT CONVERSATIONAL AI */}
        <section className="pr-slide pr-slide--tenets" data-label="How I treat it">
          <ol className="pr-tenets">
            <li className="pr-tenet pr-in">
              <span className="pr-tenet-n">01</span>
              <span className="pr-tenet-w">Trust</span>
              <span className="pr-tenet-s">Show the why. People won’t rely on it blindly.</span>
            </li>
            <li className="pr-tenet pr-in">
              <span className="pr-tenet-n">02</span>
              <span className="pr-tenet-w">Context</span>
              <span className="pr-tenet-s">Answers in the work. Less chair-swivel.</span>
            </li>
            <li className="pr-tenet pr-in">
              <span className="pr-tenet-n">03</span>
              <span className="pr-tenet-w">Human in the loop</span>
              <span className="pr-tenet-s">Safeguards where the stakes are.</span>
            </li>
          </ol>
        </section>

        {/* 07 — OUTSIDE WORK */}
        <section className="pr-slide pr-slide--out" data-label="Outside work">
          <div className="pr-out-copy">
            <ul className="pr-out-list">
              <li className="pr-out-item pr-in">
                <span className="pr-out-line">I run a nonprofit.</span>
                <span className="pr-out-k">PrabhKiSeva · Co-founder</span>
              </li>
              <li className="pr-out-item pr-in">
                <span className="pr-out-line">I mentor young designers.</span>
                <span className="pr-out-k">AIGA NY</span>
              </li>
              <li className="pr-out-item pr-in">
                <span className="pr-out-line">I DJ.</span>
                <span className="pr-out-k">On Spotify as @RagoBeats</span>
              </li>
            </ul>
          </div>
          <div className="pr-out-photos">
            <div className="pr-out-stack">
              <figure className="pr-photo pr-photo--wide pr-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gallery/prabhkiseva.jpg" alt="PrabhKiSeva" />
              </figure>
              <figure className="pr-photo pr-photo--video pr-in">
                <video
                  src="/images/present/dj-loop.mp4"
                  data-clip="mid"
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="DJ set"
                />
              </figure>
            </div>
            <figure className="pr-photo pr-photo--tall pr-in">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/gallery/aiga-mentor.png" alt="AIGA NY 2026 Mentor" />
            </figure>
          </div>
        </section>

        {/* 08 — THANK YOU */}
        <section className="pr-slide pr-slide--qs" data-label="Thank you">
          <div className="pr-qs-head">
            <h2 className="pr-h2 pr-in">Thank you.</h2>
            <p className="pr-lede pr-lede--faint pr-in">That’s a bit of me.</p>
          </div>
          <div className="pr-qs-wrap">
            <div className="pr-eyebrow pr-in">Questions I had</div>
            <ol className="pr-qs">
              <li className="pr-q pr-in">
                <span className="pr-q-n">01</span>
                <span>The client and the industry</span>
              </li>
              <li className="pr-q pr-in">
                <span className="pr-q-n">02</span>
                <span>The role: scope, responsibilities, timeline</span>
              </li>
              <li className="pr-q pr-in">
                <span className="pr-q-n">03</span>
                <span>The engagement: rate, contract type</span>
              </li>
            </ol>
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
