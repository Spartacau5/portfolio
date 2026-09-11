'use client';

import Image from 'next/image';
import { useLenis } from 'lenis/react';
import { scrollToTop } from '../lib/lenisScroll';

export function ScrollToTopButton() {
  const lenis = useLenis();

  return (
    <button
      type="button"
      onClick={() => scrollToTop(lenis)}
      className="back-link"
    >
      Go to top
      <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="top-arrow" aria-hidden="true" />
    </button>
  );
}
