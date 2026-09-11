'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import CatAnimation from '../components/CatAnimation';
import { ExpandableChip } from '../components/ExpandableChip';
import './present.css';

// Work-grid brand gradients, reused so cards read as the site's cards.
const GRAD = {
  zoominfo: 'linear-gradient(180deg, #BFF0FF 0%, #EBEFF9 100%)',
  arrive: 'linear-gradient(180deg, #FFCEFE 0%, #FFF0FF 100%)',
  tashvi: 'linear-gradient(180deg, #F8EDC7 0%, #EDF9EE 100%)',
  hypex: 'linear-gradient(180deg, #D6D7FE 0%, #F1F0FE 100%)',
};

// The one motion primitive: a line rises out of an overflow-hidden mask.
// M = inline (spans) for single text lines; Mb = block (divs) for stacks.
const M = ({ children }: { children: ReactNode }) => (
  <span className="pr-mask">
    <span className="pr-rise">{children}</span>
  </span>
);
const Mb = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className="pr-mask">
    <div className={`pr-rise ${className}`.trim()}>{children}</div>
  </div>
);

/*
 * /present — a standalone 6-slide "about me" intro deck.
 * One motion language: text rises out of masks, structural lines/rings
 * reveal on the same easing curve. Keyboard (arrows / space / home / end)
 * + click-to-advance, a slide counter, an ink playhead, reduced-motion
 * support. Self-contained: renders over the site chrome and hides it only
 * while mounted, touching no other route.
 */

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function PresentPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);
  const animatingRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const slides = Array.from(root.querySelectorAll<HTMLElement>('.pr-slide'));
    const total = slides.length;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const curEl = root.querySelector<HTMLElement>('#pr-cur');
    const totEl = root.querySelector<HTMLElement>('#pr-tot');
    const labelEl = root.querySelector<HTMLElement>('#pr-label');
    const playhead = root.querySelector<HTMLElement>('#pr-playhead');

    // Render the deck over the rest of the site only while it's mounted.
    document.documentElement.classList.add('pr-presenting');
    if (totEl) totEl.textContent = String(total).padStart(2, '0');

    const risesOf = (s: HTMLElement) =>
      Array.from(s.querySelectorAll<HTMLElement>('.pr-rise'));

    const chrome = () => {
      const i = idxRef.current;
      if (curEl) curEl.textContent = String(i + 1).padStart(2, '0');
      if (labelEl) labelEl.textContent = slides[i].dataset.label || '';
      if (playhead) playhead.style.width = ((i + 1) / total) * 100 + '%';
    };

    const canAnimate =
      typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';

    const maskOf = (r: HTMLElement) => {
      const m = r.parentElement;
      return m && m.classList.contains('pr-mask') ? m : null;
    };
    const reveal = (r: HTMLElement) => {
      r.style.transform = 'translateY(0)';
      r.style.opacity = '1';
      const mask = maskOf(r);
      if (mask) mask.style.overflow = 'visible';
    };
    const hide = (r: HTMLElement) => {
      r.style.transform = 'translateY(115%)';
      r.style.opacity = '1';
      const mask = maskOf(r);
      if (mask) mask.style.overflow = 'hidden';
    };

    const enter = (slide: HTMLElement) => {
      const rises = risesOf(slide);
      if (reduce || !canAnimate) {
        rises.forEach(reveal);
        return;
      }
      rises.forEach((r, k) => {
        r.style.opacity = '1';
        try {
          const a = r.animate(
            [{ transform: 'translateY(115%)' }, { transform: 'translateY(0)' }],
            { duration: 900, easing: EASE, delay: k * 55, fill: 'both' }
          );
          a.onfinish = () => reveal(r);
        } catch {
          reveal(r);
        }
      });
    };

    const show = (next: number) => {
      const i = idxRef.current;
      if (animatingRef.current || next === i || next < 0 || next >= total) return;
      animatingRef.current = true;
      const cur = slides[i];
      const nxt = slides[next];
      const dir = next > i ? 1 : -1;

      if (reduce) {
        cur.classList.remove('is-active');
        nxt.classList.add('is-active');
        idxRef.current = next;
        chrome();
        enter(nxt);
        animatingRef.current = false;
        return;
      }

      const outY = dir > 0 ? '-110%' : '110%';
      const rises = risesOf(cur);

      const swap = () => {
        cur.classList.remove('is-active');
        rises.forEach(hide);
        nxt.classList.add('is-active');
        idxRef.current = next;
        chrome();
        enter(nxt);
        window.setTimeout(() => {
          animatingRef.current = false;
        }, 560);
      };

      if (rises.length === 0) {
        swap();
        return;
      }

      let done = 0;
      rises.forEach((r, k) => {
        const a = r.animate(
          [
            { transform: 'translateY(0)', opacity: 1 },
            { transform: `translateY(${outY})`, opacity: 0 },
          ],
          { duration: 400, easing: EASE, delay: k * 24, fill: 'forwards' }
        );
        a.onfinish = () => {
          done += 1;
          if (done === rises.length) swap();
        };
      });
    };

    const next = () => show(idxRef.current + 1);
    const prev = () => show(idxRef.current - 1);

    const onInteractive = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      !!el.closest('a, button, input, textarea, .wg-chip--expandable, .pr-cat');

    const onKey = (e: KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'Enter') && onInteractive(e.target)) return;
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        show(0);
      } else if (e.key === 'End') {
        show(total - 1);
      }
    };

    const stage = root.querySelector<HTMLElement>('.pr-stage');
    const onClick = (e: MouseEvent) => {
      if (onInteractive(e.target)) return;
      if (window.getSelection()?.toString()) return;
      next();
    };

    window.addEventListener('keydown', onKey);
    stage?.addEventListener('click', onClick);

    // deterministic start: every line hidden below its mask, slide 0 active
    slides.forEach((s, si) => {
      s.classList.toggle('is-active', si === 0);
      risesOf(s).forEach(hide);
    });
    idxRef.current = 0;

    chrome();
    enter(slides[0]);

    const failsafe = window.setTimeout(() => {
      if (idxRef.current === 0) risesOf(slides[0]).forEach(reveal);
    }, 1500);

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener('keydown', onKey);
      stage?.removeEventListener('click', onClick);
      document.documentElement.classList.remove('pr-presenting');
    };
  }, []);

  const hi = Array.from({ length: 18 }, (_, i) => <span key={i}>Hi!</span>);

  return (
    <div className="pr-root" ref={rootRef} aria-label="Arpit Ahluwalia — walkthrough">
      <div className="pr-label" id="pr-label">Intro</div>
      <div className="pr-counter">
        <b id="pr-cur">01</b> / <span id="pr-tot">06</span>
      </div>

      <div className="pr-stage">
        {/* 1 — BILLU / INTRO */}
        <section className="pr-slide is-active" data-label="Intro">
          <div className="pr-split">
            <div className="pr-col">
              <div className="pr-eyebrow"><M>Hello 👋 nice to meet you</M></div>
              <h1 className="pr-h1"><M>Hi, I&apos;m <span className="pr-em">Arpit</span>.</M></h1>
              <div className="pr-mask">
                <div className="pr-rise pr-subtitle">
                  I&apos;m a
                  <ExpandableChip
                    label="UX designer"
                    icon="❁"
                    expandedText=" crafting intuitive, research-driven experiences"
                    endSymbol="☺"
                  />
                  based in
                  <ExpandableChip
                    label="Brooklyn, New York"
                    icon="🗽"
                    iconMono
                    expandedText=" Go Knicks! ♕"
                    endSymbol=""
                  />
                </div>
              </div>
              <div className="pr-hi" aria-hidden="true">
                <div className="pr-hi-track">{hi}{hi}</div>
              </div>
            </div>
          </div>
          <div className="pr-cat"><CatAnimation /></div>
        </section>

        {/* 2 — TIMELINE pt.1 */}
        <section className="pr-slide" data-label="The path so far">
          <div className="pr-eyebrow"><M>The path so far · school + work</M></div>
          <div className="pr-timeline">
            <div className="pr-tl-line" />
            <div className="pr-tl-row">
              <div className="pr-tl-item pr-tl-item--down">
                <div className="pr-tl-dot" />
                <div className="pr-tl-card">
                  <Mb>
                    <div className="pr-tl-year">2017 – 2021</div>
                    <div className="pr-tl-org">Drexel University</div>
                    <div className="pr-tl-role">BS in User Experience &amp; Interaction Design</div>
                  </Mb>
                </div>
              </div>
              <div className="pr-tl-item pr-tl-item--up">
                <div className="pr-tl-dot" />
                <div className="pr-tl-card">
                  <Mb>
                    <div className="pr-tl-year">2021 – 22</div>
                    <div className="pr-tl-org">eUnderdog</div>
                    <div className="pr-tl-role">Founding Product Lead</div>
                    <div className="pr-tl-cat">E-commerce</div>
                  </Mb>
                </div>
              </div>
              <div className="pr-tl-item pr-tl-item--down">
                <div className="pr-tl-dot" />
                <div className="pr-tl-card">
                  <Mb>
                    <div className="pr-tl-year">2021 – 22</div>
                    <div className="pr-tl-org">HypeX</div>
                    <div className="pr-tl-role">UI Designer</div>
                    <div className="pr-tl-cat">Web3.0 Gaming</div>
                  </Mb>
                </div>
              </div>
              <div className="pr-tl-item pr-tl-item--up">
                <div className="pr-tl-dot" />
                <div className="pr-tl-card">
                  <Mb>
                    <div className="pr-tl-year">2021 – 22</div>
                    <div className="pr-tl-org">Johnson &amp; Johnson</div>
                    <div className="pr-tl-role">UX/UI Design</div>
                    <div className="pr-tl-cat">Healthcare</div>
                  </Mb>
                </div>
              </div>
              <div className="pr-tl-item pr-tl-item--down">
                <div className="pr-tl-dot" />
                <div className="pr-tl-card">
                  <Mb>
                    <div className="pr-tl-year">2022 – 24</div>
                    <div className="pr-tl-org">ZoomInfo</div>
                    <div className="pr-tl-role">UX/UI Designer III</div>
                    <div className="pr-tl-cat">B2B SaaS (GTM)</div>
                  </Mb>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 — TIMELINE pt.2 */}
        <section className="pr-slide" data-label="…and now">
          <div className="pr-eyebrow"><M>…and now</M></div>
          <div className="pr-timeline">
            <div className="pr-tl-line" />
            <div className="pr-tl-row pr-tl-row--sparse">
              <div className="pr-tl-item pr-tl-item--down">
                <div className="pr-tl-dot" />
                <div className="pr-tl-card">
                  <Mb>
                    <div className="pr-tl-year">2024 – 2026</div>
                    <div className="pr-tl-org">Parsons School of Design | The New School</div>
                    <div className="pr-tl-role">MS in Strategic Design &amp; Management</div>
                    <div className="pr-tl-role">Minor in Impact Entrepreneurship</div>
                  </Mb>
                </div>
              </div>
              <div className="pr-tl-item pr-tl-item--down">
                <div className="pr-tl-dot" />
                <div className="pr-tl-card">
                  <Mb>
                    <div className="pr-tl-year">July – Dec 2025</div>
                    <div className="pr-tl-org">Craft</div>
                    <div className="pr-tl-role">UX Research &amp; Strategy</div>
                  </Mb>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 — CIRCLE / HOW I WORK */}
        <section className="pr-slide" data-label="How I work">
          <div className="pr-eyebrow pr-center"><M>How I work — end to end</M></div>
          <div className="pr-ring-wrap">
            <svg className="pr-ring" viewBox="0 0 400 400" aria-hidden="true">
              <circle cx="200" cy="200" r="180" />
            </svg>
            <div className="pr-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/profilepic.png" alt="Arpit avatar" />
            </div>
            <div className="pr-node pr-node--l"><span>Research &amp; Strategy</span></div>
            <div className="pr-node pr-node--r"><span>Dev</span></div>
            <div className="pr-node pr-node--b"><span>Design</span></div>
          </div>
        </section>

        {/* 5 — FREE TIME */}
        <section className="pr-slide" data-label="Beyond the screen">
          <div className="pr-split">
            <div className="pr-col">
              <Mb className="pr-ft-lead">In my free time, I…</Mb>
              <div className="pr-ft-list">
                <Mb className="pr-ft-item">produce music</Mb>
                <Mb className="pr-ft-item">build apps</Mb>
                <Mb className="pr-ft-item">click photos</Mb>
                <Mb className="pr-ft-item">design posters</Mb>
                <Mb className="pr-ft-item">game / stream</Mb>
                <Mb className="pr-ft-item">facilitate art meetups</Mb>
                <Mb className="pr-ft-item">spend the last Sunday of each month in Pottstown, PA</Mb>
              </div>
            </div>
            <div className="pr-collage">
              <div className="pr-tile pr-tile--wide">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/more/photography-art.webp" alt="Photography" />
              </div>
              <div className="pr-tile pr-tile--tall">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gallery/aiga-mentor.png" alt="Mentoring at AIGA NY" />
              </div>
              <div className="pr-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/present/tashvi-shot.jpg" alt="An app I built" />
              </div>
              <div className="pr-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gallery/prabhkiseva.jpg" alt="Community service" />
              </div>
              <div className="pr-tile pr-tile--wide">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gallery/figma-cl.png" alt="Figma Campus Leader community" />
              </div>
            </div>
          </div>
        </section>

        {/* 6 — CLOSE */}
        <section className="pr-slide pr-close-center" data-label="Close">
          <h2 className="pr-h2 pr-center pr-close-h">
            <M>That&apos;s a bit of my world.</M>
            <M><span className="pr-em">Questions?</span></M>
          </h2>
          <div className="pr-contact pr-center-flex">
            <M>
              <a href="mailto:arpit.ahluwalia1@gmail.com">arpit.ahluwalia1@gmail.com</a>
            </M>
            <M>
              <a href="https://www.linkedin.com/in/arpitahluwalia/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </M>
          </div>
        </section>
      </div>

      <div className="pr-track">
        <div className="pr-playhead" id="pr-playhead">
          <span className="pr-knob" />
        </div>
      </div>
      <div className="pr-hint">
        Press <kbd>→</kbd> to advance · <kbd>←</kbd> back
      </div>
    </div>
  );
}
