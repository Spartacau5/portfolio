'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { BLUE, BLUE_DROP, GREEN, GREEN_DROP, WORD } from './standardCharteredCoverData';

/**
 * Standard Chartered work-card cover, "Crosscurrent". On white, ~7s:
 *
 *   1. Currents   The blue and green ribbons flow in from off-card in opposite
 *                 directions, passing each other on parallel lanes.
 *   2. Settle     Their tails retract along the same line into the logo's round end
 *                 caps, leaving the exact mark.
 *   3. Teardrops  Grow out from their points, closing the weave.
 *   4. Name       The mark slides left as the two lines of the wordmark rise in.
 *   5. Out        Name fades, teardrops withdraw, and each ribbon runs out towards
 *                 its point, back to white.
 *
 * Each ribbon is two pieces sharing one travel value: a plain stroke for the stretch
 * outside the logo, and the real logo shape revealed through a stroke mask inside it.
 * The stroke matches the ribbon's width and round cap, so the join can't be seen.
 * Timing below is in seconds.
 */

const BLUE_C = '#0473EA';
const GREEN_C = '#38D200';
const GREY = '#525355';

// Scene matches the card's 16:11 cover; the logo's own box is 280 x 110.
const W = 640;
const H = 440;
const SCALE = 1.2;
const LOGO_X = (W - 280 * SCALE) / 2;
const LOGO_Y = (H - 110 * SCALE) / 2;
const MARK_CX = 34; // centre of the mark within the logo box
const CENTRE_DX = (W / 2 - LOGO_X) / SCALE - MARK_CX; // shift that centres the mark alone

const RIBBON_W = 19.85;
const REVEAL_W = 34; // mask stroke: wider than the ribbon, so the logo's own edge shows
const OFF_CARD = 420; // tail length, enough to start outside the card from anywhere

const hyp = (a: number, b: number) => Math.sqrt(a * a + b * b);

// Blue: in from the top right, along the upper arm, round the bend, down the lower arm.
const BLUE_CAP: [number, number] = [40.71, 9.96];
const BLUE_BEND: [number, number] = [6.88, 32.07];
const BLUE_END: [number, number] = [78, 79];
const BLUE_IN: [number, number] = [BLUE_CAP[0] + 0.837 * OFF_CARD, BLUE_CAP[1] - 0.547 * OFF_CARD];
const BLUE_LEN =
  hyp(BLUE_BEND[0] - BLUE_CAP[0], BLUE_BEND[1] - BLUE_CAP[1]) + hyp(BLUE_END[0] - BLUE_BEND[0], BLUE_END[1] - BLUE_BEND[1]);

// Green: in from the bottom right, straight up its one arm, towards the left.
const GREEN_CAP: [number, number] = [59.1, 99.57];
const GREEN_END: [number, number] = [-12, 53.3];
const GREEN_IN: [number, number] = [GREEN_CAP[0] + 0.838 * OFF_CARD, GREEN_CAP[1] + 0.546 * OFF_CARD];
const GREEN_LEN = hyp(GREEN_END[0] - GREEN_CAP[0], GREEN_END[1] - GREEN_CAP[1]);

const DASH_GAP = 3000;

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function StandardCharteredCover() {
  const root = useRef<SVGSVGElement>(null);

  useIsomorphicLayoutEffect(() => {
    const svg = root.current;
    if (!svg) return;

    // The markup is the finished lockup, so reduced motion simply never animates it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const q = gsap.utils.selector(svg);

    const ctx = gsap.context(() => {
      const logo = q('[data-logo]')[0];
      const name = q('[data-name]')[0];
      const line1 = q('[data-line="1"]')[0];
      const line2 = q('[data-line="2"]')[0];
      // Each teardrop grows from its point.
      const blueDrop = { el: q('[data-drop="blue"]')[0], x: 28.002, y: 99.685, size: 0 };
      const greenDrop = { el: q('[data-drop="green"]')[0], x: 39.523, y: 32.046, size: 0 };

      const blue = {
        tail: q('[data-tail="blue"]')[0],
        reveal: q('[data-reveal="blue"]')[0],
        len: BLUE_LEN,
        head: 0, // how far the leading end has travelled, from off-card
        end: 0, // how far the trailing end has travelled
      };
      const green = {
        tail: q('[data-tail="green"]')[0],
        reveal: q('[data-reveal="green"]')[0],
        len: GREEN_LEN,
        head: 0,
        end: 0,
      };

      // A dash from `from` to `to` along a path, hidden when empty so a round cap
      // can't leave a stray dot behind.
      const dash = (el: Element, from: number, to: number) => {
        const length = to - from;
        if (length <= 0.01) {
          el.setAttribute('visibility', 'hidden');
          return;
        }
        el.setAttribute('visibility', 'visible');
        el.setAttribute('stroke-dasharray', `${length.toFixed(2)} ${DASH_GAP}`);
        el.setAttribute('stroke-dashoffset', (-from).toFixed(2));
      };

      const stage = { slide: 0 };
      const render = () => {
        [blue, green].forEach((r) => {
          dash(r.tail, Math.min(r.end, OFF_CARD), Math.min(r.head, OFF_CARD));
          dash(r.reveal, Math.max(r.end - OFF_CARD, 0), Math.max(r.head - OFF_CARD, 0));
        });
        const dx = CENTRE_DX * (1 - stage.slide);
        logo.setAttribute('transform', `translate(${(LOGO_X + dx * SCALE).toFixed(3)} ${LOGO_Y}) scale(${SCALE})`);
        [blueDrop, greenDrop].forEach((d) => {
          d.el.setAttribute('transform', `translate(${d.x} ${d.y}) scale(${d.size.toFixed(4)}) translate(${-d.x} ${-d.y})`);
        });
      };

      gsap.set([line1, line2], { y: 34 });
      render();

      const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { immediateRender: false }, onUpdate: render });

      // Empty white stage, regardless of how the last pass rewound.
      tl.set([blue, green], { head: 0, end: 0 }, 0.001);
      tl.set(stage, { slide: 0 }, 0.001);
      tl.set([blueDrop, greenDrop], { size: 0 }, 0.001);
      tl.set([line1, line2], { y: 34 }, 0.001);
      tl.set(name, { autoAlpha: 1 }, 0.001);
      let t = 0.2;

      // 1. Currents
      const FLOW = 1.45;
      tl.to(blue, { head: OFF_CARD + BLUE_LEN, duration: FLOW, ease: 'power2.inOut' }, t);
      tl.to(green, { head: OFF_CARD + GREEN_LEN, duration: FLOW, ease: 'power2.inOut' }, t + 0.14);

      // 2. Settle. Tails start once the heads are well into the mark.
      const SETTLE = 1.05;
      tl.to(blue, { end: OFF_CARD, duration: SETTLE, ease: 'power3.inOut' }, t + 0.6);
      tl.to(green, { end: OFF_CARD, duration: SETTLE, ease: 'power3.inOut' }, t + 0.74);
      t += 0.74 + SETTLE - 0.12;

      // 3. Teardrops
      tl.to(greenDrop, { size: 1, duration: 0.55, ease: 'power3.out' }, t);
      tl.to(blueDrop, { size: 1, duration: 0.55, ease: 'power3.out' }, t + 0.09);
      t += 0.5;

      // 4. Name
      tl.to(stage, { slide: 1, duration: 0.9, ease: 'power3.inOut' }, t);
      tl.to(line1, { y: 0, duration: 0.72, ease: 'power3.out' }, t + 0.26);
      tl.to(line2, { y: 0, duration: 0.72, ease: 'power3.out' }, t + 0.34);
      t += 0.34 + 0.72 + 1.5;

      // 5. Out
      tl.to(name, { autoAlpha: 0, duration: 0.38, ease: 'power2.inOut' }, t);
      t += 0.2;
      tl.to(stage, { slide: 0, duration: 0.7, ease: 'power3.inOut' }, t);
      tl.to([blueDrop, greenDrop], { size: 0, duration: 0.36, ease: 'power2.in' }, t);
      tl.to(blue, { end: OFF_CARD + BLUE_LEN, duration: 0.82, ease: 'power2.inOut' }, t + 0.14);
      tl.to(green, { end: OFF_CARD + GREEN_LEN, duration: 0.82, ease: 'power2.inOut' }, t + 0.2);
      t += 1.02;

      // White beat before the next pass.
      tl.to({}, { duration: 0.45 }, t);

      // Only run while the card is on screen.
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tl.play();
          else tl.pause();
        },
        { threshold: 0.15 },
      );
      io.observe(svg);

      return () => io.disconnect();
    }, svg);

    return () => ctx.revert();
  }, []);

  const pts = (...p: [number, number][]) => p.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('');

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Standard Chartered"
    >
      <defs>
        {/* The logo's own coordinates. Each mask is one wide stroke along a ribbon. */}
        <mask id="sc-blue-mask" maskUnits="userSpaceOnUse" x="-30" y="-30" width="140" height="170">
          <path
            data-reveal="blue"
            d={pts(BLUE_CAP, BLUE_BEND, BLUE_END)}
            fill="none"
            stroke="#fff"
            strokeWidth={REVEAL_W}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
        <mask id="sc-green-mask" maskUnits="userSpaceOnUse" x="-30" y="-30" width="140" height="170">
          <path
            data-reveal="green"
            d={pts(GREEN_CAP, GREEN_END)}
            fill="none"
            stroke="#fff"
            strokeWidth={REVEAL_W}
            strokeLinecap="round"
          />
        </mask>
        {/* Static windows the two wordmark lines rise through. */}
        <clipPath id="sc-line-1">
          <rect x="90" y="17" width="200" height="34.4" />
        </clipPath>
        <clipPath id="sc-line-2">
          <rect x="90" y="51.4" width="200" height="34" />
        </clipPath>
        {/* Keeps each line to its own half of the compound wordmark path. */}
        <clipPath id="sc-glyphs-1">
          <rect x="90" y="17" width="200" height="34.4" />
        </clipPath>
        <clipPath id="sc-glyphs-2">
          <rect x="90" y="51.4" width="200" height="34" />
        </clipPath>
      </defs>

      <rect width={W} height={H} fill="#FFFFFF" />

      <g data-logo transform={`translate(${LOGO_X} ${LOGO_Y}) scale(${SCALE})`}>
        <path
          data-tail="green"
          d={pts(GREEN_IN, GREEN_CAP)}
          fill="none"
          stroke={GREEN_C}
          strokeWidth={RIBBON_W}
          strokeLinecap="round"
          visibility="hidden"
        />
        <path
          data-tail="blue"
          d={pts(BLUE_IN, BLUE_CAP)}
          fill="none"
          stroke={BLUE_C}
          strokeWidth={RIBBON_W}
          strokeLinecap="round"
          visibility="hidden"
        />

        <path d={GREEN} fill={GREEN_C} mask="url(#sc-green-mask)" />
        <path d={BLUE} fill={BLUE_C} mask="url(#sc-blue-mask)" />
        <g data-drop="green">
          <path d={GREEN_DROP} fill={GREEN_C} />
        </g>
        <g data-drop="blue">
          <path d={BLUE_DROP} fill={BLUE_C} />
        </g>

        <g data-name fill={GREY}>
          <g clipPath="url(#sc-line-1)">
            <g data-line="1">
              <path d={WORD} clipPath="url(#sc-glyphs-1)" />
            </g>
          </g>
          <g clipPath="url(#sc-line-2)">
            <g data-line="2">
              <path d={WORD} clipPath="url(#sc-glyphs-2)" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
