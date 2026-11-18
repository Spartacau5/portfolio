'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import type { LenisOptions } from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { scrollToTarget, scrollToTop } from '../lib/lenisScroll';
import 'lenis/dist/lenis.css';

// Editorial glide — noticeable weight, still interruptible.
const OPTIONS: LenisOptions = {
  lerp: 0.08,
  duration: 1.4,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.1,
  syncTouch: false,
  allowNestedScroll: true,
  autoRaf: true,
  anchors: false,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
};

function LenisBehaviors() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    scrollToTop(lenis, true);
  }, [pathname, lenis]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const skip = (e.target as HTMLElement | null)?.closest?.('.skip-link');
      if (!skip) return;
      const href = skip.getAttribute('href');
      if (!href?.startsWith('#')) return;
      e.preventDefault();
      scrollToTarget(lenis, href, { immediate: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);

  return null;
}

// Lenis only runs where it adds something: a mouse/trackpad (smooth wheel) with
// motion allowed. Touch devices scroll natively (syncTouch is off anyway), and
// keeping Lenis attached there made iOS touch-scroll stick and refuse to return
// to the top.
const SMOOTH_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(SMOOTH_QUERY);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <>
      {enabled && <ReactLenis root options={OPTIONS} />}
      {/* Always on: scroll-to-top on navigation + skip link, with native fallbacks */}
      <LenisBehaviors />
      {children}
    </>
  );
}
