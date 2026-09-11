'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

const MEDIA_SELECTOR = [
  '.case-study-page .arrive-cs-block-figure',
  '.case-study-page .zi-handoff-figure',
  '.case-study-page .zi-states-full-img',
  '.case-study-page .stacked-image',
  '.case-study-page .video-showcase',
  '.case-study-page .moodboard-image-container',
  '.case-study-page .highfi-image-container',
  '.case-study-page .reference-images',
  '.ab-photo-frame',
  '.ab-shot-link',
].join(', ');

const SECTION_SELECTOR = [
  '.case-study-page .arrive-cs-intro',
  '.case-study-page .arrive-cs-block',
  '.case-study-page .zi-insight',
  '.case-study-page .vw-step-block',
  '.case-study-page .case-study-hero',
  '.case-study-page .case-study-meta-section',
  '.case-study-page .case-study-content',
  '.case-study-page .case-study-gallery',
].join(', ');

const STANDALONE_SELECTOR = '.case-study-page .zi-design-header';

const PART_SELECTOR = [
  '.arrive-cs-header',
  '.arrive-cs-title',
  '.arrive-cs-lead',
  '.arrive-cs-meta-item',
  '.arrive-cs-block-label',
  '.zi-sol-subhead',
  '.arrive-cs-method',
  '.arrive-cs-info-block',
  '.arrive-cs-block-text',
  '.arrive-cs-block-stat',
  '.arrive-cs-accordion-item',
  '.case-study-title',
  '.case-study-company',
  '.cs-tag',
  '.meta-block',
  '.description-block',
  '.case-study-cta',
  '.content-heading',
  '.content-subheading',
  '.content-subheading-large',
  '.content-lead',
  '.content-text',
  '.lowfi-gallery',
  '.zi-insight-title',
  '.zi-insight-body',
  '.vw-step-heading',
  '.vw-timeline',
].join(', ');

const TEXT_CLASSES = ['arrive-cs-block-text', 'content-text'];
const SECTION_FADE_SKIP = [
  'arrive-cs-title',
  'arrive-cs-lead',
  'arrive-cs-block-label',
  'zi-sol-subhead',
  'case-study-title',
  'case-study-company',
  'content-heading',
  'content-subheading',
  'content-subheading-large',
  'content-lead',
  'arrive-cs-block-text',
  'content-text',
];

const MAX_PARTS = 7;
const STAGGER_MS = 70;

function hasClass(el: Element, names: readonly string[]) {
  return names.some((name) => el.classList.contains(name));
}

function pickParts(section: HTMLElement) {
  const hasSectionFade =
    section.style.opacity !== '' || section.style.transform.includes('translateY');

  const candidates = Array.from(section.querySelectorAll<HTMLElement>(PART_SELECTOR)).filter(
    (el) =>
      !el.classList.contains('scroll-reveal-part') &&
      !el.classList.contains('scroll-reveal-media') &&
      !el.closest('.scroll-reveal-media') &&
      !el.closest('.cs-side-nav') &&
      !el.closest('.arrive-cs-accordion-panel')
  );

  const picked: HTMLElement[] = [];
  let seenText = false;

  for (const el of candidates) {
    if (hasClass(el, TEXT_CLASSES)) {
      if (seenText) continue;
      seenText = true;
    }
    if (hasSectionFade && hasClass(el, SECTION_FADE_SKIP)) continue;
    if (picked.some((parent) => parent.contains(el))) continue;
    picked.push(el);
    if (picked.length >= MAX_PARTS) break;
  }

  return picked;
}

type MediaNode = HTMLElement & { _parallaxEl?: HTMLElement | null };

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function CaseStudyMotion() {
  const pathname = usePathname();
  const nodesRef = useRef<MediaNode[]>([]);

  useEffect(() => {
    let cancelled = false;
    let mediaIo: IntersectionObserver | null = null;
    let partIo: IntersectionObserver | null = null;
    const boundMedia: MediaNode[] = [];
    const boundParts: HTMLElement[] = [];

    const bindFooter = () => {
      const footer = document.querySelector<HTMLElement>('.site-footer');
      if (!footer || footer.classList.contains('scroll-reveal-footer')) return;
      footer.classList.add('scroll-reveal-footer');
      if (prefersReducedMotion()) {
        footer.classList.add('is-revealed');
        return;
      }
      const footerIo = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          footer.classList.add('is-revealed');
          footerIo.disconnect();
        },
        { threshold: 0.2 }
      );
      footerIo.observe(footer);
    };

    const bindMedia = () => {
      const found = Array.from(document.querySelectorAll<MediaNode>(MEDIA_SELECTOR)).filter(
        (node) => !node.classList.contains('scroll-reveal-media')
      );
      if (!found.length) return;

      if (prefersReducedMotion()) {
        found.forEach((node) => node.classList.add('is-revealed'));
        return;
      }

      if (!mediaIo) {
        mediaIo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const node = entry.target as MediaNode;
              node.classList.add('is-revealed');
              mediaIo?.unobserve(node);
            });
          },
          { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
        );
      }

      found.forEach((node) => {
        node.classList.add('scroll-reveal-media');
        const media = node.matches('img, video')
          ? node
          : node.querySelector<HTMLElement>('img, video');
        node._parallaxEl = media;
        boundMedia.push(node);
        mediaIo?.observe(node);
      });

      nodesRef.current = [...nodesRef.current, ...found];
    };

    const bindParts = () => {
      if (prefersReducedMotion()) return;

      if (!partIo) {
        partIo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const node = entry.target as HTMLElement;
              node.classList.add('is-revealed');
              partIo?.unobserve(node);
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
      }

      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR).forEach((section) => {
        if (section.dataset.revealBound === 'true') return;
        section.dataset.revealBound = 'true';

        pickParts(section).forEach((el, i) => {
          el.classList.add('scroll-reveal-part');
          el.style.setProperty('--reveal-delay', `${i * STAGGER_MS}ms`);
          boundParts.push(el);
          partIo?.observe(el);
        });
      });

      document.querySelectorAll<HTMLElement>(STANDALONE_SELECTOR).forEach((el) => {
        if (el.classList.contains('scroll-reveal-part')) return;
        el.classList.add('scroll-reveal-part');
        boundParts.push(el);
        partIo?.observe(el);
      });

      document.querySelectorAll<HTMLElement>('.case-study-page').forEach((page) => {
        page.classList.add('cs-parts-ready');
      });
    };

    const bind = () => {
      if (cancelled) return;
      bindFooter();
      bindMedia();
      bindParts();
    };

    bind();
    const retry = window.setTimeout(bind, 200);
    const late = window.setTimeout(bind, 500);

    return () => {
      cancelled = true;
      window.clearTimeout(retry);
      window.clearTimeout(late);
      mediaIo?.disconnect();
      partIo?.disconnect();
      boundMedia.forEach((node) => {
        node.classList.remove('scroll-reveal-media', 'is-revealed');
        if (node._parallaxEl) node._parallaxEl.style.transform = '';
      });
      boundParts.forEach((el) => {
        el.classList.remove('scroll-reveal-part', 'is-revealed');
        el.style.removeProperty('--reveal-delay');
      });
      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR).forEach((section) => {
        delete section.dataset.revealBound;
      });
      document.querySelectorAll<HTMLElement>('.case-study-page').forEach((page) => {
        page.classList.remove('cs-parts-ready');
      });
      nodesRef.current = [];
    };
  }, [pathname]);

  useLenis(() => {
    if (prefersReducedMotion()) return;
    const vh = window.innerHeight || 1;
    for (const node of nodesRef.current) {
      if (!node.classList.contains('is-revealed') || !node._parallaxEl) continue;
      const rect = node.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const t = (mid - vh / 2) / vh;
      const y = Math.max(-14, Math.min(14, t * -18));
      node._parallaxEl.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    }
  });

  return null;
}
