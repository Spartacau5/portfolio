'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { enterChipCursor, leaveChipCursor } from '../lib/chipCursor';

type ExpandableChipProps = {
  label: string;
  icon: string;
  expandedText: string;
  /** shorter copy used at <=767px, where the full line would wrap awkwardly */
  expandedTextMobile?: string;
  endSymbol: string;
  iconMono?: boolean;
  onTrailBounce?: (phase: 'expand' | 'collapse') => void;
};

export type ExpandableChipHandle = {
  expand: () => void;
  collapse: () => void;
  isOpen: () => boolean;
};

const EXPAND_MS = 300;
const TYPE_BASE_MS = 40;
const TYPE_START_MS = 100;

export const ExpandableChip = forwardRef<ExpandableChipHandle, ExpandableChipProps>(
  function ExpandableChip(
    { label, icon, expandedText: expandedTextFull, expandedTextMobile, endSymbol, iconMono = false, onTrailBounce },
    ref,
  ) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const mq = window.matchMedia('(max-width: 767px)');
      const sync = () => setIsMobile(mq.matches);
      sync();
      mq.addEventListener('change', sync);
      return () => mq.removeEventListener('change', sync);
    }, []);
    const expandedText = isMobile && expandedTextMobile != null ? expandedTextMobile : expandedTextFull;

    const [open, setOpen] = useState(false);
    const [typed, setTyped] = useState('');
    const [done, setDone] = useState(false);
    const [width, setWidth] = useState<number | null>(null);
    const widthRef = useRef<number | null>(null);
    const openRef = useRef(false);
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
          const jitter = Math.floor(Math.random() * 18) - 4;
          timerRef.current = setTimeout(tick, TYPE_BASE_MS + jitter);
        } else {
          setDone(true);
        }
      };

      timerRef.current = setTimeout(tick, TYPE_START_MS);
    }, [clearTimer, expandedText]);

    const expand = useCallback(() => {
      if (openRef.current) return;
      openRef.current = true;
      onTrailBounce?.('expand');
      setOpen(true);
      applyLayout(true);
      timerRef.current = setTimeout(startTyping, EXPAND_MS);
    }, [applyLayout, onTrailBounce, startTyping]);

    const collapse = useCallback(() => {
      if (!openRef.current) return;
      openRef.current = false;
      onTrailBounce?.('collapse');
      clearTimer();
      setTyped('');
      setDone(false);
      indexRef.current = 0;
      setOpen(false);
      applyLayout(false);
    }, [applyLayout, clearTimer, onTrailBounce]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        collapse,
        isOpen: () => openRef.current,
      }),
      [collapse, expand],
    );

    const toggle = () => {
      if (openRef.current) {
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
  },
);
