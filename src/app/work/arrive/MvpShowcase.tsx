'use client';

import { useRef, useState } from 'react';

// Persona 3's video has audio, so it doesn't autoplay — instead it shows a big
// centered play button. Clicking it starts playback and reveals native controls.
function PlayableVideo({ src, className }: { src: string; className?: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);

    const start = () => {
        setStarted(true);
        ref.current?.play();
    };

    return (
        <div className={`arrive-mvp-video ${className ?? ''}`}>
            <video
                ref={ref}
                src={src}
                controls={started}
                playsInline
                preload="metadata"
                onPlay={() => setStarted(true)}
            />
            {!started && (
                <button className="arrive-mvp-play" onClick={start} aria-label="Play video">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export function MvpShowcase() {
    return (
        <section className="arrive-mvp-fullbleed">
            <div className="arrive-mvp">
                <div className="arrive-mvp-top">
                {/* Drivers — phone (autoplay loop) */}
                <article className="arrive-mvp-persona">
                        <div className="arrive-mvp-text">
                            <h3 className="arrive-mvp-title">
                                With drivers, we tested the <span className="arrive-mvp-accent">parking app.</span>
                            </h3>
                            <p className="arrive-mvp-lead">
                                Information provided to <strong>support real-time parking decisions</strong>,
                                answering questions like:
                            </p>
                            <ul className="arrive-mvp-list">
                                <li>Where can I park near the job site?</li>
                                <li>Will my van fit in the available spaces?</li>
                                <li>Is it safe to park there?</li>
                                <li>What will it cost?</li>
                            </ul>
                        </div>
                        <div className="arrive-mvp-video arrive-mvp-video-phone">
                            <video src="/images/mvp-driver.mp4" autoPlay loop muted playsInline />
                        </div>
                    </article>

                    {/* Dispatchers & fleet managers — tablet (autoplay loop) */}
                    <article className="arrive-mvp-persona">
                        <div className="arrive-mvp-text">
                            <h3 className="arrive-mvp-title">
                                With dispatchers &amp; fleet managers, we tested the{' '}
                                <span className="arrive-mvp-accent">Parking Planner app…</span>
                            </h3>
                            <p className="arrive-mvp-lead">
                                Information provided to <strong>help route effectively</strong>, answering
                                questions like:
                            </p>
                            <ul className="arrive-mvp-list">
                                <li>What are parking options near the job sites?</li>
                                <li>Are there better times of day to park in a given area?</li>
                                <li>Will drivers be likely to find parking in a given area?</li>
                            </ul>
                        </div>
                        <div className="arrive-mvp-video arrive-mvp-video-tablet">
                            <video src="/images/mvp-dispatcher.mp4" autoPlay loop muted playsInline />
                        </div>
                    </article>
                </div>

                {/* Business admins — laptop (click to play, has audio) */}
                <article className="arrive-mvp-persona arrive-mvp-persona-wide">
                    <div className="arrive-mvp-text">
                        <h3 className="arrive-mvp-title">
                            With Business Admins, we tested the{' '}
                            <span className="arrive-mvp-accent">B2B Self-Serve app…</span>
                        </h3>
                        <p className="arrive-mvp-lead">
                            Information provided to help <strong>optimize the fleet</strong>, answering
                            questions like:
                        </p>
                        <ul className="arrive-mvp-list">
                            <li>Do I need to invest in smaller vans to be able to park more effectively?</li>
                            <li>Is parking causing delays or inefficiencies?</li>
                            <li>Do I need to update our guidance to drivers on where and how to park?</li>
                        </ul>
                    </div>
                    <PlayableVideo src="/images/mvp-em.mp4" className="arrive-mvp-video-laptop" />
                </article>
            </div>
        </section>
    );
}
