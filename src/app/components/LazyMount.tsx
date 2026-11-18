'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Renders `children` only once the slot scrolls near the viewport, so heavy
 * below-the-fold media (autoplay videos, YouTube/Spotify embeds) doesn't
 * compete with what the visitor can actually see on load.
 *
 * The wrapper fills its parent, so it can sit inside fixed-size covers without
 * changing layout. Once mounted, children stay mounted.
 */
export function LazyMount({
  children,
  margin = '600px 0px',
  className,
}: {
  children: ReactNode;
  /** how far ahead of the viewport to start loading */
  margin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, show]);

  return (
    <div ref={ref} className={className} style={{ position: 'absolute', inset: 0 }}>
      {show ? children : null}
    </div>
  );
}
