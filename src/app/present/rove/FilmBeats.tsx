'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Tashvi launch film with its script laid out as beats.
 * The beat under the playhead lights up; clicking a beat seeks the film.
 * Buttons are skipped by the deck's click-to-advance, so seeking never
 * changes slides.
 */

const BEATS = [
  { t: 0, k: 'Hook', s: '“Designing jewelry shouldn’t take hours. Or days.”' },
  { t: 6, k: 'Pain', s: '“Endless iterations. Slow workflows. Creative blocks.”' },
  { t: 13, k: 'Turn', s: '“What if an idea became a finished design, instantly?”' },
  { t: 17, k: 'Reveal', s: '“Meet Tashvi. AI that designs with jewelers.”' },
  { t: 22, k: 'Proof', s: 'One prompt, a render, variations, edits in place.' },
  { t: 50, k: 'Promise', s: '“From concept to creation, faster than ever.”' },
  { t: 56, k: 'Payoff', s: '“Less time on revisions. More time creating.”' },
  { t: 60, k: 'CTA', s: '“Start designing smarter with Tashvi AI.”' },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function FilmBeats({ grad }: { grad: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      let i = 0;
      for (let k = 0; k < BEATS.length; k++) if (v.currentTime >= BEATS[k].t) i = k;
      setActive((prev) => (prev === i ? prev : i));
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  const seek = (t: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = t;
    v.play().catch(() => {});
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <>
      <div className="pr-zi-copy">
        <div className="pr-eyebrow pr-in">Tashvi.ai · product film</div>
        <h2 className="pr-h2 pr-in">64 seconds. One story.</h2>
        <ol className="rv-beats pr-in">
          {BEATS.map((b, i) => (
            <li key={b.k}>
              <button
                type="button"
                className={`rv-beat${i === active ? ' is-on' : ''}`}
                onClick={() => seek(b.t)}
                aria-label={`Jump to ${b.k} at ${fmt(b.t)}`}
              >
                <span className="rv-beat-t">{fmt(b.t)}</span>
                <span className="rv-beat-k">{b.k}</span>
                <span className="rv-beat-s">{b.s}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="pr-zi-media pr-zi-media--single">
        <figure className="pr-frame rv-film pr-in" style={{ background: grad }}>
          <video
            ref={videoRef}
            className="pr-shot rv-film-shot"
            src="/images/present/tashvi-copilot.mp4"
            poster="/images/present/tashvi-copilot-poster.jpg"
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Tashvi.ai product film"
          />
          <button type="button" className="rv-sound" onClick={toggleSound} aria-pressed={!muted}>
            {muted ? 'Sound off' : 'Sound on'}
          </button>
          <figcaption className="pr-cap">Tashvi.ai · product film · click a beat to jump</figcaption>
        </figure>
      </div>
    </>
  );
}
