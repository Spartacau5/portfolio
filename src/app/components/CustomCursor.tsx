'use client';

import { useEffect, useRef } from 'react';
import { subscribeChipCursor } from '../lib/chipCursor';

type CursorIcon = 'plus' | 'arrow' | 'lock';

function iconForLabel(label: string): CursorIcon {
  if (label.startsWith('Locked')) return 'lock';
  return 'arrow';
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const currentLabel = useRef<string | null>(null);
  const currentChip = useRef(false);

  useEffect(() => {
    return subscribeChipCursor((active) => {
      currentChip.current = active;
      cursorRef.current?.classList.toggle('is-chip', active);
      if (active) {
        cursorRef.current?.classList.remove('is-card');
        delete cursorRef.current?.dataset.cursorIcon;
        currentLabel.current = null;
      }
    });
  }, []);

  useEffect(() => {
    const setPosition = (x: number, y: number) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const applyCard = (label: string | null) => {
      if (label === currentLabel.current) return;
      currentLabel.current = label;
      const el = cursorRef.current;
      if (!el) return;

      if (label) {
        el.dataset.cursorIcon = iconForLabel(label);
        el.classList.add('is-card');
      } else {
        el.classList.remove('is-card');
        delete el.dataset.cursorIcon;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setPosition(e.clientX, e.clientY);

      if (!isVisible.current && cursorRef.current) {
        isVisible.current = true;
        cursorRef.current.classList.add('visible');
      }

      if (currentChip.current) {
        applyCard(null);
        return;
      }

      const target =
        (document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null) ??
        (e.target as HTMLElement | null);
      const labeled = target?.closest<HTMLElement>('[data-cursor-label]');
      applyCard(labeled?.dataset.cursorLabel ?? null);
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      cursorRef.current?.classList.remove('visible');
    };

    const handleMouseEnter = (e: MouseEvent) => {
      setPosition(e.clientX, e.clientY);
      isVisible.current = true;
      cursorRef.current?.classList.add('visible');
    };

    const handleClick = () => applyCard(null);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <div className="custom-cursor-inner">
        <svg
          className="cc-icon cc-icon--plus"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <svg
          className="cc-icon cc-icon--arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
        <svg
          className="cc-icon cc-icon--lock"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </div>
    </div>
  );
}
