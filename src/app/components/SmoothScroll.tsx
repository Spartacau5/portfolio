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

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <>
      {enabled && <ReactLenis root options={OPTIONS} />}
      {enabled && <LenisBehaviors />}
      {children}
    </>
  );
}
