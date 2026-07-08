'use client';

import Image from 'next/image';

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
  // Track is duplicated so the -50% translate loops seamlessly.
  const loop = [...BRANDS, ...BRANDS];
  return (
    <div className="wg-marquee" aria-label="Arrive brands">
      <div className="wg-marquee-track">
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
