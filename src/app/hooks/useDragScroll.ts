'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Pointer-driven horizontal drag scrolling for overflow strips.
 *
 * Drag only engages after the pointer moves past a small threshold, so a plain
 * click (no movement) is never captured — it falls through to the button/link
 * underneath. A drag that did move suppresses the click that follows it.
 */
export function useDragScroll<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const THRESHOLD = 5; // px of movement before it counts as a drag
    let pending = false;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let pointerId = -1;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pending = true;
      dragging = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      pointerId = e.pointerId;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pending) return;
      const dx = e.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < THRESHOLD) return;
        // Cross the threshold → begin dragging and capture the pointer.
        dragging = true;
        el.setPointerCapture(pointerId);
        el.classList.add('is-dragging');
      }
      el.scrollLeft = startScroll - dx;
    };

    const endDrag = (e: PointerEvent) => {
      if (!pending) return;
      pending = false;
      if (dragging) {
        el.classList.remove('is-dragging');
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        // Swallow the click that fires right after a real drag so it doesn't
        // select a tab.
        const suppress = (ev: Event) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        el.addEventListener('click', suppress, { capture: true, once: true });
        window.setTimeout(() => el.removeEventListener('click', suppress, true), 0);
      }
      dragging = false;
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', endDrag);
      el.removeEventListener('pointercancel', endDrag);
    };
  }, []);

  return ref as RefObject<T>;
}
