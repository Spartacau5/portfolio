import type Lenis from 'lenis';

/** Matches `.arrive-cs-accordion-item` / case-study `scroll-margin-top`. */
export const HEADER_SCROLL_OFFSET = -110;

export function scrollToTop(lenis?: Lenis | null, immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate, force: immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToTarget(
  lenis: Lenis | null | undefined,
  target: number | string | HTMLElement,
  opts?: { immediate?: boolean; offset?: number }
) {
  const immediate = opts?.immediate ?? false;
  const offset = opts?.offset ?? 0;
  if (lenis) {
    lenis.scrollTo(target, { immediate, force: immediate, offset });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
}
