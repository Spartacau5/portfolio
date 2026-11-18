'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { LOGO, TAGLINE } from './kalshiCoverData';

/**
 * Kalshi work-card cover. A typographic film, ~7s per loop:
 *
 *   First pass   Huge wordmark starts part cropped and is pulled off to the left
 *                like an elastic band, then hands over to the loop at the logo.
 *
 *   Loop
 *   1. Marquee   The wordmark comes in from fully off-frame and runs straight through
 *                without stopping, gaining speed all the way out.
 *   2. Logo      The normal logo takes over as the marquee's tail leaves the frame.
 *   3. Tagline   Caret drops out from under the logo; the line writes on in one
 *                continuous move, growing from the centre.
 *   4. Out       Logo and tagline fade away.
 *   5. Green     A held beat of nothing but green before the next pass.
 *
 * Everything runs on GSAP timelines, in a single SVG scaled to the card, so it stays
 * sharp at every breakpoint. Timing below is in seconds.
 */

const GREEN = '#00D395';
const BLACK = '#000000';

// Scene matches the card's 16:11 cover; layout measured from the Figma frames.
const W = 640;
const H = 440;
const CX = W / 2;
const CY = 219;

const LOGO_W = 172;
const LOGO_S = LOGO_W / LOGO.width;
const LOGO_H = LOGO.height * LOGO_S;

const BIG_H = 196;
const BIG_S = BIG_H / LOGO.height;
const BIG_W = LOGO.width * BIG_S;
const BIG_Y = (H - BIG_H) / 2;
const BIG_START = 146;
const BIG_EXIT = -BIG_W - 60;

// Tagline is optically set to the exact width of the logo above it.
const TAG_S = LOGO_W / (TAGLINE.inkRight - TAGLINE.inkLeft);
const TAG_BASE = CY + LOGO_H / 2 + 22.5;
const TAG_LEFT = CX - LOGO_W / 2 - TAGLINE.inkLeft * TAG_S;
const TAG_INK_LEFT = TAG_LEFT + TAGLINE.inkLeft * TAG_S;
const CARET_H = TAGLINE.capHeight * TAG_S + 6;
const CARET_GAP = 2.5;
const TAG_INK_W = LOGO_W;

const MARQUEE_FIRST = 2.1;
const MARQUEE_LOOP = 2.4; // further to travel: enters from off-frame
const GREEN_GAP = 1.2;
const LOGO_IN = 0.2;
const LOGO_LEAD = 0.12; // logo starts this long before the marquee finishes
const WRITE_ON = 0.7;

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function KalshiCover() {
  const root = useRef<SVGSVGElement>(null);

  useIsomorphicLayoutEffect(() => {
    const svg = root.current;
    if (!svg) return;

    const q = gsap.utils.selector(svg);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // The markup is the finished lockup, so reduced motion simply never animates it.
    if (reduce) return;

    gsap.registerPlugin(CustomEase);

    // Elastic pull: tension builds with barely any travel, then speed keeps climbing
    // every frame until it leaves.
    const pull = (p: number) => p ** 3;
    // Fly-through: creeps in from off-frame, then speed climbs all the way out.
    const sweep = (p: number) => 0.252 * p + 0.356 * p ** 2 + 0.392 * p ** 3;

    const ctx = gsap.context(() => {
      const big = q('[data-big]')[0];
      const logo = q('[data-logo]')[0];
      const tag = q('[data-tag]')[0];
      const tagLine = q('[data-tagline]')[0];
      const caret = q('[data-caret]')[0];
      const blur = q('[data-blur] feGaussianBlur')[0] as unknown as SVGFEGaussianBlurElement;
      const reveal = q('[data-reveal]')[0];

      // Directional motion blur, tied to the marquee's speed. The filter is only
      // attached while blurred, so the resting frames stay free and crisp.
      const motionBlur = { amount: 0 };
      const applyBlur = () => {
        const a = motionBlur.amount;
        blur.setAttribute('stdDeviation', `${a.toFixed(2)} 0`);
        if (a > 0.05) big.setAttribute('filter', 'url(#kalshi-motion-blur)');
        else big.removeAttribute('filter');
      };
      const clearBlur = () => {
        motionBlur.amount = 0;
        applyBlur();
      };

      // Empty stage: logo hidden, nothing revealed, caret dead centre and tucked up
      // behind the logo. Played at the top of every pass, so a pass never relies on
      // how the previous one rewound.
      const emptyStage = (target: gsap.core.Timeline, at: number) => {
        target.set(logo, { autoAlpha: 0 }, at);
        target.set(tag, { autoAlpha: 1 }, at);
        target.set(tagLine, { x: CX - TAG_INK_LEFT }, at);
        target.set(reveal, { attr: { width: 0 } }, at);
        target.set(caret, { x: TAG_INK_LEFT, y: -CARET_H - 8, autoAlpha: 0 }, at);
      };
      gsap.set(logo, { autoAlpha: 0 });
      gsap.set(tagLine, { x: CX - TAG_INK_LEFT });
      gsap.set(reveal, { attr: { width: 0 } });
      gsap.set(caret, { x: TAG_INK_LEFT, y: -CARET_H - 8, autoAlpha: 0 });

      const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { immediateRender: false } });

      emptyStage(tl, 0.001);
      let t = 0.002;

      // 1. Marquee
      tl.set(big, { autoAlpha: 1, x: W + 8 }, t);
      tl.to(big, { x: BIG_EXIT, duration: MARQUEE_LOOP, ease: sweep }, t);
      tl.fromTo(motionBlur, { amount: 0 }, { amount: 14, duration: MARQUEE_LOOP, ease: 'power4.in', onUpdate: applyBlur }, t);
      t += MARQUEE_LOOP;
      tl.set(big, { autoAlpha: 0 }, t);
      tl.call(clearBlur, [], t);

      // 2. Logo. It arrives as the marquee's tail clears the frame.
      tl.fromTo(logo, { autoAlpha: 0 }, { autoAlpha: 1, duration: LOGO_IN, ease: 'power1.out' }, t - LOGO_LEAD);
      const handover = t - LOGO_LEAD + LOGO_IN;
      t += 0.45;

      // 3. Tagline. Caret, reveal and centring all share one tween shape, so the
      // line opens as a single gesture.
      tl.set(caret, { autoAlpha: 1 }, t);
      tl.to(caret, { y: 0, duration: 0.4, ease: 'power3.out' }, t);
      t += 0.2;
      const write = { duration: WRITE_ON, ease: 'power2.inOut' };
      tl.to(tagLine, { x: 0, ...write }, t);
      tl.to(reveal, { attr: { width: TAG_INK_W + 1 }, ...write }, t);
      tl.to(caret, { x: TAG_INK_LEFT + TAG_INK_W + CARET_GAP, ...write }, t);
      t += WRITE_ON;

      // Hold on the finished line. The caret eases out first.
      tl.to(caret, { autoAlpha: 0, duration: 0.25, ease: 'power1.inOut' }, t + 0.15);
      t += 1.7;

      // 4. Out
      tl.to([logo, tag], { autoAlpha: 0, duration: 0.55, ease: 'power2.inOut' }, t);
      t += 0.55;

      // 5. Green. An empty tween just holds the timeline open.
      tl.to({}, { duration: GREEN_GAP }, t);

      // First pass only: the cropped, elastic start. It plays the same logo fade as
      // the loop, then hands over at the moment that fade finishes.
      gsap.set(big, { x: BIG_START, autoAlpha: 1 });
      const first = gsap.timeline({ paused: true });
      first.to(big, { x: BIG_EXIT, duration: MARQUEE_FIRST, ease: pull }, 0.3);
      first.to(motionBlur, { amount: 14, duration: MARQUEE_FIRST, ease: 'power4.in', onUpdate: applyBlur }, 0.3);
      first.set(big, { autoAlpha: 0 }, 0.3 + MARQUEE_FIRST);
      first.call(clearBlur, [], 0.3 + MARQUEE_FIRST);
      first.fromTo(
        logo,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: LOGO_IN, ease: 'power1.out', immediateRender: false },
        0.3 + MARQUEE_FIRST - LOGO_LEAD,
      );
      let active: gsap.core.Timeline = first;
      first.eventCallback('onComplete', () => {
        active = tl;
        tl.time(handover, true).play();
      });

      // Only run while the card is on screen.
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) active.play();
          else active.pause();
        },
        { threshold: 0.15 },
      );
      io.observe(svg);

      return () => io.disconnect();
    }, svg);

    return () => ctx.revert();
  }, []);

  const lockupX = CX - LOGO_W / 2;
  const lockupY = CY - LOGO_H / 2;
  const logoPath = (
    <path d={LOGO.d} transform={`translate(${lockupX - LOGO.x * LOGO_S} ${lockupY}) scale(${LOGO_S})`} fillRule="evenodd" />
  );

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Kalshi. Trade on anything."
    >
      <defs>
        <filter id="kalshi-motion-blur" data-blur x="-20%" y="0" width="140%" height="100%">
          <feGaussianBlur stdDeviation="0 0" />
        </filter>
        <clipPath id="kalshi-tag-clip">
          <rect x="0" y={CY + LOGO_H / 2 + 2} width={W} height="60" />
        </clipPath>
        <clipPath id="kalshi-tag-reveal">
          <rect data-reveal x={TAG_INK_LEFT} y={TAG_BASE - 30} width={TAG_INK_W + 1} height="60" />
        </clipPath>
      </defs>

      <rect width={W} height={H} fill={GREEN} />

      <g fill={BLACK}>
        <g data-big style={{ visibility: 'hidden' }}>
          <path d={LOGO.d} transform={`translate(${-LOGO.x * BIG_S} ${BIG_Y}) scale(${BIG_S})`} fillRule="evenodd" />
        </g>

        <g data-logo>{logoPath}</g>

        <g clipPath="url(#kalshi-tag-clip)">
          <g data-tag>
            <g data-tagline>
              <g clipPath="url(#kalshi-tag-reveal)">
                {TAGLINE.glyphs.map((g, i) =>
                  g.d ? (
                    <path key={i} d={g.d} transform={`translate(${TAG_LEFT + g.x * TAG_S} ${TAG_BASE}) scale(${TAG_S})`} />
                  ) : null,
                )}
              </g>
              <g data-caret style={{ visibility: 'hidden' }}>
                <rect y={TAG_BASE - TAGLINE.capHeight * TAG_S - 3} width="1.6" height={CARET_H} />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
