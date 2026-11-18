'use client';

/**
 * HoverBuddy — Arpit's head appears beside the cursor and talks about whatever
 * you're hovering.
 *
 * Markup API (any element):
 *   data-buddy="…"         what he says when you hover it (re-speaks when it changes)
 *   data-buddy-badge="×8"  small counter pill on the bubble (pops when it changes)
 *   data-buddy-hint="…"    the greeting points visitors toward this element
 *   data-buddy-delay="380" only speak after the cursor rests this long (big targets like cards)
 *   data-buddy-avatar="…"  someone else's face pops in instead of Arpit's (e.g. a recommender)
 *   data-buddy-who="…"     their name, shown small at the top of the bubble
 *   data-buddy-width="380" wider bubble for this element (px)
 *   data-buddy-meta="…"    small right-aligned note beside the name (e.g. "My manager at ZoomInfo")
 *   data-buddy-color="#…"  backing color behind the cutout (Arpit's is peach)
 * In the text, **double asterisks** make bold (never wraps mid-phrase) and a
 * newline character breaks the line.
 *
 * Motion is modeled on Clicky (farzaa/clicky, OverlayWindow.swift): a spring
 * that trails the cursor, a bubble that pops from the buddy, and text that
 * streams in. Tuned calmer than Clicky's — no overshoot on the follow, and the
 * head appears *at* the cursor rather than flying to it.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'framer-motion';

const HEAD_SRC = '/images/buddy/arpit-head.png';

const HEAD = 44; // head diameter, px
const GAP_X = 14; // head offset from the cursor tip
const GAP_Y = 18;
const GAP_BOOST = 10; // extra room when the cursor dot grows (over [data-cursor-label])
const BUBBLE_MAX = 280; // matches .hb-bubble-inner max-width
const EDGE = 16;

// Follow spring, close to critical damping so it glides without ricocheting.
// SwiftUI spring(response .22, dampingFraction .88) → k = (2π/r)², c = 2ζ√k
const FOLLOW_K = 815;
const FOLLOW_C = 50;

const POP = { type: 'spring', stiffness: 420, damping: 32, mass: 0.9 } as const;
const BUBBLE_IN = { type: 'spring', stiffness: 460, damping: 36, delay: 0.05 } as const;
const RESIZE = { type: 'spring', stiffness: 520, damping: 42 } as const;

const HIDE_GRACE_MS = 140; // forgiveness when the pointer slips between targets
const TYPE_START_MS = 130; // let the box land before words appear
const CPS = 85; // characters per second for a fresh line (~0.7s for 60 chars)
const CPS_FAST = 150; // quicker for rapid follow-ups (e.g. pet streaks)

// Greeting on every full page load, once the cursor is known. First-time
// visitors get the full intro (hi → what I do → go hover the cat); anyone who's
// already seen it gets a short welcome back instead.
const GREET = true;
const GREET_DELAY_MS = 450;
const GREETING: { text: string; hold: number }[] = [
  { text: 'Hi, welcome to my website.', hold: 1300 },
  { text: 'I’ll pop in with more context wherever you go.', hold: 1500 },
];
const HINT_HOLD_MS = 3200;
const WELCOME_BACK = { text: 'Welcome back.', hold: 1400 };

// Remembered across visits (localStorage). If storage is blocked we just treat
// everyone as new, which only means the full intro plays again.
const VISITED_KEY = 'aa-buddy-visited';
function hasVisited(): boolean {
  try {
    return window.localStorage.getItem(VISITED_KEY) === '1';
  } catch {
    return false;
  }
}
function markVisited() {
  try {
    window.localStorage.setItem(VISITED_KEY, '1');
  } catch {
    /* storage blocked — they'll get the intro again next time, that's fine */
  }
}

type Line = {
  id: number;
  key: string;
  text: string;
  fast: boolean;
  avatar?: string;
  who?: string;
  meta?: string;
  color?: string;
  width?: number;
};
type Side = { x: 'right' | 'left'; y: 'below' | 'above' };

/** Split `**bold**` markup into runs; `plain` is what actually gets typed. */
function parseRich(text: string) {
  const runs = text.split('**').map((t, i) => ({ text: t, bold: i % 2 === 1 })).filter((r) => r.text);
  return { runs, plain: runs.map((r) => r.text).join('') };
}

const typeMs = (text: string) => TYPE_START_MS + (parseRich(text).plain.length / CPS) * 1000;

/** "down there to your right", relative to the cursor. */
function directionTo(el: HTMLElement, px: number, py: number): string {
  const r = el.getBoundingClientRect();
  if (r.bottom < 0) return 'a little further up the page';
  if (r.top > window.innerHeight) return 'a little further down the page';
  const dx = r.left + r.width / 2 - px;
  const dy = r.top + r.height / 2 - py;
  const h = dx > 90 ? 'to your right' : dx < -90 ? 'to your left' : '';
  const v = dy > 70 ? 'down there' : dy < -70 ? 'up there' : '';
  if (v && h) return `${v} ${h}`;
  if (v) return dy > 0 ? 'just below you' : 'just above you';
  if (h) return `right there ${h}`;
  return 'right under your cursor';
}

export function HoverBuddy() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [line, setLine] = useState<Line | null>(null);
  const [badge, setBadge] = useState<string | null>(null);
  const [talking, setTalking] = useState(false);
  const [side, setSide] = useState<Side>({ x: 'right', y: 'below' });
  const [headScope, animateHead] = useAnimate();
  const [bubbleScope, animateBubble] = useAnimate();

  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -200, y: -200, inside: false });
  const pos = useRef({ x: -200, y: -200, vx: 0, vy: 0 });
  const target = useRef({ x: -200, y: -200 });
  const raf = useRef<number | null>(null);
  const currentEl = useRef<HTMLElement | null>(null);
  const sideRef = useRef<Side>(side);
  const visibleRef = useRef(false);
  const hideTimer = useRef<number | null>(null);
  const pendingEl = useRef<HTMLElement | null>(null);
  const pendingTimer = useRef<number | null>(null);
  const gapBoost = useRef(0);
  const scriptTimers = useRef<number[]>([]);
  const scripting = useRef(false);
  const nextId = useRef(0);

  // Hover devices only — touch has no cursor to follow.
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const write = () => {
      const el = rootRef.current;
      if (el) el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };

    // Spring integration, only running while there's distance to cover.
    let last = 0;
    const step = (now: number) => {
      const dt = Math.min((now - (last || now)) / 1000, 1 / 30);
      last = now;
      const p = pos.current;
      const t = target.current;
      // two half-steps keep the stiff spring stable on slow frames
      for (let i = 0; i < 2; i++) {
        const h = dt / 2;
        p.vx += (FOLLOW_K * (t.x - p.x) - FOLLOW_C * p.vx) * h;
        p.vy += (FOLLOW_K * (t.y - p.y) - FOLLOW_C * p.vy) * h;
        p.x += p.vx * h;
        p.y += p.vy * h;
      }
      write();
      const settled =
        Math.abs(t.x - p.x) < 0.1 && Math.abs(t.y - p.y) < 0.1 &&
        Math.abs(p.vx) < 1 && Math.abs(p.vy) < 1;
      if (settled) {
        p.x = t.x; p.y = t.y; p.vx = 0; p.vy = 0;
        write();
        raf.current = null;
        last = 0;
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    const kick = () => {
      if (raf.current === null) raf.current = requestAnimationFrame(step);
    };

    const placeHead = (snap: boolean) => {
      const { x: px, y: py } = pointer.current;
      const s = sideRef.current;
      const gx = GAP_X + gapBoost.current;
      const gy = GAP_Y + gapBoost.current;
      target.current = {
        x: s.x === 'right' ? px + gx : px - gx - HEAD,
        y: s.y === 'below' ? py + gy : py - gy - HEAD,
      };
      if (snap) {
        pos.current = { ...target.current, vx: 0, vy: 0 };
        write();
      } else {
        kick();
      }
    };

    // Flip to the other side of the cursor near the viewport edge, with
    // hysteresis so it doesn't flicker on the threshold.
    const updateSide = () => {
      const { x: px, y: py } = pointer.current;
      const bubbleW = Number(currentEl.current?.dataset.buddyWidth) || BUBBLE_MAX;
      const need = GAP_X + HEAD + 10 + bubbleW + EDGE;
      const prev = sideRef.current;
      const sx =
        prev.x === 'right'
          ? px + need > window.innerWidth ? 'left' : 'right'
          : px + need + 40 < window.innerWidth ? 'right' : 'left';
      const sy =
        prev.y === 'below'
          ? py + GAP_Y + HEAD + EDGE > window.innerHeight ? 'above' : 'below'
          : py + GAP_Y + HEAD + EDGE + 30 < window.innerHeight ? 'below' : 'above';
      if (sx !== prev.x || sy !== prev.y) {
        sideRef.current = { x: sx, y: sy };
        setSide(sideRef.current);
      }
    };

    const clearHide = () => {
      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };

    const stopScript = () => {
      scriptTimers.current.forEach((t) => window.clearTimeout(t));
      scriptTimers.current = [];
      scripting.current = false;
    };

    const appear = () => {
      if (visibleRef.current) return;
      visibleRef.current = true;
      updateSide();
      placeHead(true); // appear right at the cursor — never fly in
    };

    const say = (el: HTMLElement, text: string) => {
      stopScript(); // whatever you hover beats the greeting
      markVisited(); // they've met the buddy for real, so next time it's "welcome back"
      currentEl.current = el;
      appear();
      const id = ++nextId.current;
      setLine({
        id,
        key: `el-${id}`,
        text,
        fast: false,
        avatar: el.dataset.buddyAvatar || undefined,
        who: el.dataset.buddyWho || undefined,
        meta: el.dataset.buddyMeta || undefined,
        color: el.dataset.buddyColor || undefined,
        width: Number(el.dataset.buddyWidth) || undefined,
      });
      setBadge(el.dataset.buddyBadge || null);
    };

    const cancelPending = () => {
      if (pendingTimer.current !== null) window.clearTimeout(pendingTimer.current);
      pendingTimer.current = null;
      pendingEl.current = null;
    };

    // Note: leaves any pending hover-intent alone, so moving card → card still
    // lets the next card speak once the old one lets go.
    const hide = () => {
      clearHide();
      stopScript();
      currentEl.current = null;
      visibleRef.current = false;
      setLine(null);
      setBadge(null);
    };

    const hitTest = () => {
      if (!pointer.current.inside) return;
      const hit = document.elementFromPoint(pointer.current.x, pointer.current.y);
      gapBoost.current = hit?.closest('[data-cursor-label]') ? GAP_BOOST : 0;
      const el = hit?.closest<HTMLElement>('[data-buddy]') ?? null;
      const text = el?.dataset.buddy?.trim();

      if (el && text) {
        if (el === currentEl.current) {
          clearHide();
          cancelPending();
          return;
        }
        const delay = Number(el.dataset.buddyDelay) || 0;
        if (!delay) {
          clearHide();
          cancelPending();
          say(el, text);
          return;
        }
        // Hover intent: wait for the cursor to rest before speaking.
        if (pendingEl.current !== el) {
          cancelPending();
          pendingEl.current = el;
          pendingTimer.current = window.setTimeout(() => {
            pendingTimer.current = null;
            pendingEl.current = null;
            const { x, y, inside } = pointer.current;
            const still = inside && document.elementFromPoint(x, y)?.closest('[data-buddy]') === el;
            const line = el.dataset.buddy?.trim();
            if (still && line) {
              clearHide();
              say(el, line);
            }
          }, delay);
        }
        // whatever was showing before lets go in the meantime
        if (currentEl.current && hideTimer.current === null) {
          hideTimer.current = window.setTimeout(hide, HIDE_GRACE_MS);
        }
        return;
      }
      cancelPending();
      if (currentEl.current && hideTimer.current === null) {
        hideTimer.current = window.setTimeout(hide, HIDE_GRACE_MS);
      }
    };

    // ---- Greeting: say hi wherever the cursor is, then point at the hint ----
    const runGreeting = () => {
      if (visibleRef.current || !pointer.current.inside) return; // already hovering something
      scripting.current = true;
      appear();

      const returning = hasVisited();
      const hintEl = returning ? null : document.querySelector<HTMLElement>('[data-buddy-hint]');
      let at = 0;
      const steps = (returning ? [WELCOME_BACK] : GREETING).map((g) => ({ ...g, text: () => g.text }));
      if (hintEl) {
        steps.push({
          text: () => {
            const { x, y } = pointer.current;
            return `Try hovering on ${hintEl.dataset.buddyHint}, ${directionTo(hintEl, x, y)}.`;
          },
          hold: HINT_HOLD_MS,
        } as (typeof steps)[number]);
      }

      steps.forEach((s, i) => {
        scriptTimers.current.push(
          window.setTimeout(() => {
            if (!scripting.current) return;
            const text = s.text();
            const id = ++nextId.current;
            setLine({ id, key: `greet-${i}`, text, fast: false });
            // once they've heard "I'll pop in…", they know the interaction
            if (!returning && i === 1) markVisited();
            if (i === steps.length - 1 && hintEl) {
              hintEl.classList.add('is-buddy-hinted');
              window.setTimeout(() => hintEl.classList.remove('is-buddy-hinted'), 1400);
            }
          }, at),
        );
        // the next line waits for this one to finish typing, then the hold
        at += typeMs(s.text()) + s.hold + 180;
      });
      scriptTimers.current.push(
        window.setTimeout(() => {
          if (scripting.current && !currentEl.current) hide();
        }, at),
      );
    };

    let greeted = !GREET;
    const onMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY, inside: true };
      hitTest();
      if (!greeted) {
        greeted = true;
        scriptTimers.current.push(window.setTimeout(runGreeting, GREET_DELAY_MS));
      }
      if (!visibleRef.current) return; // hidden: nothing to move
      updateSide();
      placeHead(false);
    };

    const onLeave = () => {
      pointer.current.inside = false;
      cancelPending();
      hide();
    };

    // Smooth scroll moves content under a still pointer.
    const onScroll = () => hitTest();

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('blur', onLeave);
    return () => {
      clearHide();
      cancelPending();
      stopScript();
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('blur', onLeave);
    };
  }, [enabled]);

  // When the hovered element changes what it wants to say (e.g. Billu just got
  // pet), say the new line in the same bubble — quicker, with a little hop.
  useEffect(() => {
    if (!line) return;
    const el = currentEl.current;
    if (!el) return;
    const mo = new MutationObserver(() => {
      setBadge(el.dataset.buddyBadge || null);
      const text = el.dataset.buddy?.trim();
      if (text && text !== line.text) {
        setLine({ ...line, id: ++nextId.current, text, fast: true });
      }
    });
    mo.observe(el, { attributes: true, attributeFilter: ['data-buddy', 'data-buddy-badge'] });
    return () => mo.disconnect();
  }, [line]);

  // The hop: head bounces and the bubble nudges when a follow-up line lands.
  useEffect(() => {
    if (!line?.fast || reduceMotion) return;
    if (headScope.current) {
      animateHead(headScope.current, { scale: [1, 1.16, 1], y: [0, -4, 0] }, { duration: 0.34, ease: 'easeOut' });
    }
    if (bubbleScope.current) {
      animateBubble(bubbleScope.current, { scale: [1, 1.035, 1] }, { duration: 0.28, ease: 'easeOut' });
    }
  }, [line, reduceMotion, animateHead, animateBubble, headScope, bubbleScope]);

  useEffect(() => {
    if (!line) setTalking(false);
  }, [line]);

  if (!enabled) return null;

  const onLeft = side.x === 'left';
  const above = side.y === 'above';
  const isTalking = talking && !reduceMotion;
  // The head grows out of the corner nearest the cursor.
  const headOrigin = `${onLeft ? '100%' : '0%'} ${above ? '100%' : '0%'}`;

  return (
    <div ref={rootRef} className="hb-root" aria-hidden="true">
      <AnimatePresence>
        {line && (
          <motion.div
            key={line.avatar ?? 'arpit'}
            className="hb-head-pop"
            style={{ transformOrigin: headOrigin }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.12 } }
                : { opacity: 0, scale: 0.6, transition: { duration: 0.16, ease: [0.4, 0, 1, 1], delay: 0.05 } }
            }
            transition={reduceMotion ? { duration: 0.15 } : POP}
          >
            <div ref={headScope} className="hb-head-bump">
              {/* Talking: a gentle side-to-side sway with a little bob, eases out when done. */}
              <motion.div
                className={line.avatar ? 'hb-head is-guest' : 'hb-head'}
                style={line.color ? { background: line.color } : undefined}
                animate={isTalking ? { rotate: [0, -6, 5, -4, 0], y: [0, -1.5, 0, -1, 0] } : { rotate: 0, y: 0 }}
                transition={
                  isTalking
                    ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' }
                    : { type: 'spring', stiffness: 260, damping: 20 }
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={line.avatar ?? HEAD_SRC} alt="" draggable={false} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`hb-bubble-anchor ${onLeft ? 'is-left' : 'is-right'}`}>
        <div
          ref={bubbleScope}
          className="hb-bubble-bump"
          style={{ transformOrigin: onLeft ? 'right center' : 'left center' }}
        >
          <AnimatePresence mode="wait">
            {line && (
              <Bubble
                key={line.key}
                line={line}
                onLeft={onLeft}
                reduceMotion={!!reduceMotion}
                onTalking={setTalking}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {line && badge && (
              <motion.span
                key={badge}
                className={`hb-badge ${onLeft ? 'is-left' : 'is-right'}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
                transition={{ type: 'spring', stiffness: 600, damping: 22 }}
              >
                {badge}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * One speech bubble. Every character is laid out up front (invisible until
 * revealed), so the box knows its final size immediately: it animates to that
 * size, then the words fade in one by one.
 */
function Bubble({
  line,
  onLeft,
  reduceMotion,
  onTalking,
}: {
  line: Line;
  onLeft: boolean;
  reduceMotion: boolean;
  onTalking: (talking: boolean) => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [typed, setTyped] = useState(0);
  const { runs, plain } = parseRich(line.text);
  const total = plain.length;

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Steady, time-based reveal (each character fades in via CSS).
  useEffect(() => {
    if (reduceMotion) {
      setTyped(total);
      return;
    }
    setTyped(0);
    let frame = 0;
    const cps = line.fast ? CPS_FAST : CPS;
    const start = performance.now() + (line.fast ? 40 : TYPE_START_MS);
    const tick = (now: number) => {
      const n = Math.max(0, Math.min(total, Math.floor(((now - start) / 1000) * cps)));
      setTyped(n);
      if (n < total) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [line, total, reduceMotion]);

  const done = typed >= total;
  useEffect(() => {
    onTalking(!done);
  }, [done, onTalking]);

  return (
    <motion.div
      className="hb-bubble"
      style={{ transformOrigin: onLeft ? 'right center' : 'left center' }}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, ...(size ? { width: size.w, height: size.h } : {}) }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1, ease: 'easeIn' } }}
      transition={
        reduceMotion
          ? { duration: 0.15 }
          : { ...BUBBLE_IN, width: RESIZE, height: RESIZE }
      }
    >
      <div
        ref={innerRef}
        className="hb-bubble-inner"
        style={line.width ? { maxWidth: line.width } : undefined}
      >
        {line.who && (
          <div className="hb-who">
            <span>{line.who}</span>
            {line.meta && <span className="hb-who-meta">{line.meta}</span>}
          </div>
        )}
        {(() => {
          let at = 0;
          return runs.map((run, r) => {
            const chars = Array.from(run.text).map((ch) => {
              const i = at++;
              if (ch === '\n') return <br key={`${line.id}-${i}`} />;
              return (
                <span key={`${line.id}-${i}`} className={i < typed ? 'hb-ch is-on' : 'hb-ch'}>
                  {ch}
                </span>
              );
            });
            return run.bold ? (
              <strong key={r} className="hb-strong">{chars}</strong>
            ) : (
              <span key={r}>{chars}</span>
            );
          });
        })()}
      </div>
    </motion.div>
  );
}
