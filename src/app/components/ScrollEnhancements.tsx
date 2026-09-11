'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clamp(v: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, v));
}

/** 0 when the element is still below the reading line, 1 when it has arrived. */
function approach(el: HTMLElement, vh: number) {
  const top = el.getBoundingClientRect().top;
  return clamp(1 - (top - vh * 0.2) / (vh * 0.5));
}

/** 0–1 progress through a tall pin (sticky runway). */
function pinProgress(el: HTMLElement, vh: number) {
  const r = el.getBoundingClientRect();
  const travel = r.height - vh;
  if (travel <= 0) return r.top < vh * 0.35 ? 1 : 0;
  return clamp(-r.top / travel);
}

type Nodes = {
  hairlines: HTMLElement[];
  quotes: HTMLElement[];
  gradeRoots: HTMLElement[];
  counts: { el: HTMLElement; to: number }[];
  galleryFigs: HTMLElement[];
  scrubs: { root: HTMLElement; track: HTMLElement }[];
  solLabel: HTMLElement | null;
  solHeads: HTMLElement[];
  vwVideos: HTMLElement[];
  vwSteps: HTMLElement[];
  vwLabel: HTMLElement | null;
};

export function ScrollEnhancements() {
  const pathname = usePathname();
  const nodesRef = useRef<Nodes | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const hairlines = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.case-study-divider, .arrive-cs-block:not(.arrive-cs-block--no-divider), .arrive-cs-info, .case-study-meta-section'
      )
    );
    hairlines.forEach((el) => el.classList.add('scroll-hairline'));

    const quotes = Array.from(
      document.querySelectorAll<HTMLElement>('.zi-quote, .ab-quote')
    );
    quotes.forEach((el) => el.classList.add('scroll-quote'));

    const gradeRoots = Array.from(document.querySelectorAll<HTMLElement>('.arrive-cs-impact'));

    const counts = Array.from(document.querySelectorAll<HTMLElement>('.scroll-count[data-to]')).map(
      (el) => ({ el, to: Number(el.dataset.to) || 0 })
    );

    const gallery = document.querySelector<HTMLElement>('.ab-gallery');
    const galleryFigs = gallery
      ? Array.from(gallery.querySelectorAll<HTMLElement>('figure'))
      : [];

    const scrubs = Array.from(document.querySelectorAll<HTMLElement>('.h-scrub')).flatMap((root) => {
      const track = root.querySelector<HTMLElement>('.h-scrub-track');
      return track ? [{ root, track }] : [];
    });

    const solLabel = document.querySelector<HTMLElement>('.zi-sol-sticky-label');
    const solHeads = Array.from(document.querySelectorAll<HTMLElement>('.zi-sol-subhead'));

    const vwVideos = Array.from(document.querySelectorAll<HTMLElement>('.vw-pin-video'));
    const vwSteps = Array.from(document.querySelectorAll<HTMLElement>('.vw--sticky .vw-step-block'));
    const vwLabel = document.querySelector<HTMLElement>('.vw-pin-label');

    nodesRef.current = {
      hairlines,
      quotes,
      gradeRoots,
      counts,
      galleryFigs,
      scrubs,
      solLabel,
      solHeads,
      vwVideos,
      vwSteps,
      vwLabel,
    };

    return () => {
      hairlines.forEach((el) => {
        el.classList.remove('scroll-hairline', 'is-drawn');
        el.style.removeProperty('--hair');
      });
      quotes.forEach((el) => {
        el.classList.remove('scroll-quote');
        el.style.removeProperty('--quote');
      });
      galleryFigs.forEach((el) => {
        el.style.transform = '';
      });
      scrubs.forEach(({ track }) => {
        track.style.transform = '';
      });
      nodesRef.current = null;
    };
  }, [pathname]);

  useLenis(() => {
    if (prefersReducedMotion()) return;
    const n = nodesRef.current;
    if (!n) return;
    const vh = window.innerHeight || 1;

    for (const el of n.hairlines) {
      const t = approach(el, vh);
      el.style.setProperty('--hair', t.toFixed(3));
      el.classList.toggle('is-drawn', t > 0.98);
    }

    for (const el of n.quotes) {
      const t = approach(el, vh);
      el.style.setProperty('--quote', t.toFixed(3));
    }

    for (const root of n.gradeRoots) {
      const t = approach(root, vh);
      root.style.setProperty('--grade', t.toFixed(3));
    }

    for (const { el, to } of n.counts) {
      const t = approach(el, vh);
      const nNow = Math.round(to * t);
      if (el.textContent !== String(nNow)) el.textContent = String(nNow);
    }

    if (n.galleryFigs.length) {
      const gallery = n.galleryFigs[0].parentElement;
      if (gallery) {
        const t = approach(gallery, vh);
        n.galleryFigs.forEach((fig, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          const x = (1 - t) * dir * 22;
          const y = (1 - t) * 14;
          fig.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        });
      }
    }

    for (const { root, track } of n.scrubs) {
      if (window.matchMedia('(max-width: 767px)').matches) {
        track.style.transform = '';
        continue;
      }
      const t = pinProgress(root, vh);
      const max = Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);
      track.style.transform = `translate3d(${(-t * max).toFixed(1)}px, 0, 0)`;
    }

    if (n.solLabel && n.solHeads.length) {
      const line = vh * 0.28;
      let current = n.solHeads[0];
      for (const head of n.solHeads) {
        if (head.getBoundingClientRect().top - line <= 0) current = head;
      }
      const next = current.textContent?.trim() ?? '';
      if (n.solLabel.textContent !== next) n.solLabel.textContent = next;
    }

    if (n.vwSteps.length && n.vwVideos.length) {
      const line = vh * 0.42;
      let idx = 0;
      n.vwSteps.forEach((step, i) => {
        if (step.getBoundingClientRect().top - line <= 0) idx = i;
      });
      n.vwVideos.forEach((vid, i) => vid.classList.toggle('is-active', i === idx));
      const label = n.vwSteps[idx]?.querySelector('.vw-step-heading')?.textContent?.trim();
      if (n.vwLabel && label && n.vwLabel.textContent !== label) n.vwLabel.textContent = label;
    }
  });

  return null;
}
