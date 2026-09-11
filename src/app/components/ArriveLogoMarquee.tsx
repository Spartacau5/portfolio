'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

// The eight B2B mobility brands Arrive assembled — scrolling marquee that
// replaces the old looping hero video on the Arrive work card.
const BRANDS = [
  { src: '/images/partners/easypark.png', alt: 'EasyPark', w: 180, h: 34 },
  { src: '/images/partners/parkmobile.png', alt: 'ParkMobile', w: 150, h: 34 },
  { src: '/images/partners/ringgo.png', alt: 'RingGo', w: 120, h: 34 },
  { src: '/images/partners/flowbird.png', alt: 'Flowbird', w: 140, h: 34 },
  { src: '/images/partners/parkopedia.webp', alt: 'Parkopedia', w: 180, h: 42 },
  { src: '/images/partners/yellowbrick.png', alt: 'Yellowbrick', w: 170, h: 42 },
  { src: '/images/partners/yourparkingspace.png', alt: 'YourParkingSpace', w: 240, h: 50 },
  { src: '/images/partners/parkimeter.png', alt: 'Parkimeter', w: 140, h: 34 },
];

export function ArriveLogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useLenis((lenis) => {
    velocityRef.current = lenis.velocity;
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    const tick = () => {
      const boost = Math.min(Math.abs(velocityRef.current), 48) * 0.06;
      offsetRef.current += 0.38 + boost;
      const loopWidth = track.scrollWidth / 2;
      if (loopWidth > 0 && offsetRef.current >= loopWidth) {
        offsetRef.current -= loopWidth;
      }
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const loop = [...BRANDS, ...BRANDS];
  return (
    <div className="wg-marquee" aria-label="Arrive brands">
      <div ref={trackRef} className="wg-marquee-track wg-marquee-track--lenis">
        {loop.map((b, i) => (
          <Image
            key={`${b.alt}-${i}`}
            src={b.src}
            alt={i < BRANDS.length ? b.alt : ''}
            width={b.w}
            height={b.h}
            style={{ height: b.h }}
            aria-hidden={i >= BRANDS.length}
          />
        ))}
      </div>
    </div>
  );
}
