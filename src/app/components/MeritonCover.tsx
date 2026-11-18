'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { RAY, TRIANGLE, DISC, WORD } from './meritonCoverData';

/**
 * Meriton work-card cover, "Aperture". The camera starts inside the mark's disc, so
 * the card is solid orange, and the whole film is one continuous move, ~8s:
 *
 *   1. Pull-back   Zooms out while turning. White gaps open between the rays like a
 *                  shutter until the mark lands.
 *   2. Last piece  The mark's detached triangle travels in along its own axis and
 *                  fills the empty 12th slot.
 *   3. Ripple      That arrival travels round the rays, nearest first.
 *   4. Name        The mark slides left and "Meriton" comes out from behind it.
 *   5. Push-in     The name retracts and the camera flies back through the disc,
 *                  which is orange frame 0 again, so the loop has no cut.
 *
 * Zoom is interpolated in log space so it reads at a constant perceived rate.
 * Timing below is in seconds.
 */

const ORANGE = '#EE582C';
const GREY = '#555657';

// Scene matches the card's 16:11 cover.
const W = 640;
const H = 440;
const CX = W / 2;
const CY = H / 2;

// Final lockup, with the logo's own proportions.
const MARK_R = 45;
const MARK_S = MARK_R / 100;
const WORD_W = 204;
const WORD_S = WORD_W / WORD.inkWidth;
const GAP = 16;
const LOCKUP_W = MARK_R * 2 + GAP + WORD_W;
const MARK_X = CX - LOCKUP_W / 2 + MARK_R;
const WORD_X = MARK_X + MARK_R + GAP;
const WORD_BASE = CY + 20.5;
// How far the word sits back so its right end, including the (R), starts hidden behind
// the centred mark.
const WORD_TUCK = WORD_X + WORD_W + 18 - (CX + MARK_R);

const ZOOM_IN = 36; // enough for the disc to overfill the card
const TURN_IN = -120;
const TURN_OUT = 100;
const TRIANGLE_FAR = 800; // past the card edge, at every zoom

const PULL_BACK = 1.9;
const HOLD = 1.7;
const PUSH_IN = 1.25;

// Slot 270 (the left) holds the triangle; the rest are rays.
const RAY_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30).filter((a) => a !== 270);

const markTransform = (x: number, rot: number, scale: number) =>
  `translate(${x.toFixed(3)} ${CY}) rotate(${rot.toFixed(3)}) scale(${scale.toFixed(5)})`;

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function MeritonCover() {
  const root = useRef<SVGSVGElement>(null);

  useIsomorphicLayoutEffect(() => {
    const svg = root.current;
    if (!svg) return;

    // The markup is the finished lockup, so reduced motion simply never animates it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const q = gsap.utils.selector(svg);

    const ctx = gsap.context(() => {
      const mark = q('[data-mark]')[0];
      const word = q('[data-word]')[0];
      const clip = q('[data-word-clip]')[0];
      const tri = q('[data-tri]')[0];
      const rays = q('[data-ray]').map((el) => ({ el, stretch: 1 }));

      // One camera. `pull` 0 is inside the disc, 1 is landed; `name` slides the mark
      // and brings the word out together.
      const cam = { pull: 0, turn: TURN_IN, name: 0 };
      const render = () => {
        const scale = MARK_S * Math.exp(Math.log(ZOOM_IN) * (1 - cam.pull));
        const x = CX + (MARK_X - CX) * cam.name;
        mark.setAttribute('transform', markTransform(x, cam.turn, scale));
        word.setAttribute('transform', `translate(${(-WORD_TUCK * (1 - cam.name)).toFixed(3)} 0)`);
        clip.setAttribute('x', (x + MARK_R + 3).toFixed(3));
        // Rays stretch from the hub, which is the origin of their own rotated group.
        rays.forEach((ray) => ray.el.setAttribute('transform', `scale(1 ${ray.stretch.toFixed(4)})`));
      };

      gsap.set(tri, { y: -TRIANGLE_FAR });
      render();

      const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { immediateRender: false }, onUpdate: render });

      // Back to orange frame 0, regardless of how the last pass rewound.
      tl.set(cam, { pull: 0, turn: TURN_IN, name: 0 }, 0.001);
      tl.set(tri, { y: -TRIANGLE_FAR }, 0.001);
      tl.set(rays, { stretch: 1 }, 0.001);
      let t = 0.35;

      // 1. Pull-back
      tl.to(cam, { pull: 1, turn: 0, duration: PULL_BACK, ease: 'M0,0 C0.36,0 0.18,1 1,1' }, t);
      t += PULL_BACK + 0.08;

      // 2. Last piece
      tl.to(tri, { y: 0, duration: 0.5, ease: 'power2.in' }, t);
      t += 0.5;

      // 3. Ripple, from the slot it just filled, both ways round the mark.
      RAY_ANGLES.forEach((angle, i) => {
        const steps = Math.min(Math.abs(angle - 270), 360 - Math.abs(angle - 270)) / 30;
        const at = t + steps * 0.04;
        tl.to(rays[i], { stretch: 1.1, duration: 0.15, ease: 'power2.out' }, at);
        tl.to(rays[i], { stretch: 1, duration: 0.42, ease: 'power2.inOut' }, at + 0.15);
      });
      t += 0.62;

      // 4. Name
      tl.to(cam, { name: 1, duration: 0.95, ease: 'power3.inOut' }, t);
      t += 0.95 + HOLD;

      // 5. Push-in. The camera sets off as the name finishes tucking away.
      tl.to(cam, { name: 0, duration: 0.75, ease: 'power3.inOut' }, t);
      t += 0.6;
      tl.to(cam, { pull: 0, turn: TURN_OUT, duration: PUSH_IN, ease: 'power3.in' }, t);
      t += PUSH_IN;

      // Hold on solid orange so the wrap happens somewhere nothing can show.
      tl.to({}, { duration: 0.15 }, t);

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

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Meriton"
    >
      <defs>
        <clipPath id="meriton-word-clip">
          <rect data-word-clip x={MARK_X + MARK_R + 3} y="0" width={W} height={H} />
        </clipPath>
      </defs>

      <rect width={W} height={H} fill="#FFFFFF" />

      <g clipPath="url(#meriton-word-clip)">
        <g data-word fill={GREY}>
          <g transform={`translate(${WORD_X} ${WORD_BASE}) scale(${WORD_S})`}>
            <path d={WORD.d} />
            <path d={WORD.registered} />
          </g>
        </g>
      </g>

      <g data-mark transform={markTransform(MARK_X, 0, MARK_S)} fill={ORANGE}>
        {RAY_ANGLES.map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <g data-ray>
              <path d={RAY} />
            </g>
          </g>
        ))}
        <circle cx={DISC.cx} cy={DISC.cy} r={DISC.r} />
        <g transform="rotate(270)">
          <g data-tri>
            <path d={TRIANGLE} stroke={ORANGE} strokeWidth="3" strokeLinejoin="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}
