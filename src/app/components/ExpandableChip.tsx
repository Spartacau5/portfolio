'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { enterChipCursor, leaveChipCursor } from '../lib/chipCursor';

type ExpandableChipProps = {
  label: string;
  icon: string;
  expandedText: string;
  endSymbol: string;
  iconMono?: boolean;
  onTrailBounce?: (phase: 'expand' | 'collapse') => void;
};

const EXPAND_MS = 300;
const TYPE_BASE_MS = 60;

export function ExpandableChip({
  label,
  icon,
  expandedText,
  endSymbol,
  iconMono = false,
  onTrailBounce,
}: ExpandableChipProps) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const widthRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);
  const collapsedMeasureRef = useRef<HTMLSpanElement>(null);
  const expandedMeasureRef = useRef<HTMLSpanElement>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const setChipWidth = useCallback((next: number | null) => {
    widthRef.current = next;
    setWidth(next);
  }, []);

  const applyLayout = useCallback(
    (isOpen: boolean) => {
      const el = isOpen ? expandedMeasureRef.current : collapsedMeasureRef.current;
      const nextWidth = el ? Math.ceil(el.getBoundingClientRect().width) : null;
      if (nextWidth == null) return;

      const prev = widthRef.current;
      if (prev != null && nextWidth > prev) onTrailBounce?.('expand');
      if (prev != null && nextWidth < prev) onTrailBounce?.('collapse');
      setChipWidth(nextWidth);
    },
    [onTrailBounce, setChipWidth],
  );

  useLayoutEffect(() => {
    applyLayout(open);
  }, [applyLayout, expandedText, endSymbol, icon, label, open]);

  const startTyping = useCallback(() => {
    clearTimer();
    setTyped('');
    setDone(false);
    indexRef.current = 0;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || expandedText.length === 0) {
      setTyped(expandedText);
      setDone(true);
      return;
    }

    const tick = () => {
      indexRef.current += 1;
      setTyped(expandedText.slice(0, indexRef.current));

      if (indexRef.current < expandedText.length) {
        const jitter = Math.floor(Math.random() * 36) - 8;
        timerRef.current = setTimeout(tick, TYPE_BASE_MS + jitter);
      } else {
        setDone(true);
      }
    };

    timerRef.current = setTimeout(tick, 120);
  }, [clearTimer, expandedText]);

  const expand = useCallback(() => {
    onTrailBounce?.('expand');
    setOpen(true);
    applyLayout(true);
    timerRef.current = setTimeout(startTyping, EXPAND_MS);
  }, [applyLayout, onTrailBounce, startTyping]);

  const collapse = useCallback(() => {
    onTrailBounce?.('collapse');
    clearTimer();
    setTyped('');
    setDone(false);
    indexRef.current = 0;
    setOpen(false);
    applyLayout(false);
  }, [applyLayout, clearTimer, onTrailBounce]);

  const toggle = () => {
    if (open) {
      collapse();
      return;
    }
    expand();
  };

  useEffect(() => () => clearTimer(), [clearTimer]);

  const renderIcon = () => (
    <span className={`wg-chip-icon${iconMono ? ' wg-chip-icon--mono' : ''}`} aria-hidden="true">
      {icon}
    </span>
  );

  return (
    <>
      <button
        type="button"
        data-cursor-chip=""
        className={`wg-chip wg-chip--expandable${open ? ' is-open' : ''}${done ? ' is-complete' : ''}`}
        style={width != null ? { width } : undefined}
        onClick={toggle}
        onMouseEnter={enterChipCursor}
        onMouseLeave={leaveChipCursor}
        aria-expanded={open}
        aria-label={open ? `${label}${expandedText}${endSymbol}` : label}
      >
        <span className="wg-chip-head">
          <span className="wg-chip-label">{label}</span>
          {renderIcon()}
        </span>
        {open && (
          <span className="wg-chip-extra">
            <span className="wg-chip-typed">{typed}</span>
            {done && (
              <span className="wg-chip-end" aria-hidden="true">
                {endSymbol}
              </span>
            )}
          </span>
        )}
      </button>

      <span className="wg-chip-measures" aria-hidden="true">
        <span ref={collapsedMeasureRef} className="wg-chip-measure">
          <span className="wg-chip-head">
            <span className="wg-chip-label">{label}</span>
            {renderIcon()}
          </span>
        </span>

        <span ref={expandedMeasureRef} className="wg-chip-measure">
          <span className="wg-chip-head">
            <span className="wg-chip-label">{label}</span>
            {renderIcon()}
          </span>
          <span className="wg-chip-extra wg-chip-extra--measure">
            <span className="wg-chip-typed">
              {expandedText}
              <span className="wg-chip-end">{endSymbol}</span>
            </span>
          </span>
        </span>
      </span>
    </>
  );
}
