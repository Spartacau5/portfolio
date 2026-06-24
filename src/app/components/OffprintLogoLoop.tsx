'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { BrandLoopVideo } from './BrandLoopVideo';

/**
 * Looping Offprint brand sequence for the work card.
 *
 *   1. On a white card, the title drops in, the icon spins/settles in, and the
 *      "Chrome Extension" subtitle rises in (sped up).
 *   2. Brief hold, then a slick crossfade into the product video.
 *   3. Video plays to the end, then crossfades back to the logo and the whole
 *      sequence loops.
 */

const LOGO_IN_DURATION = 1.25; // seconds for the slowest entrance element to finish
const HOLD_AFTER_IN = 900; // ms to rest on the settled lockup
const CROSSFADE = 0.5; // seconds for the logo <-> video transition

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_BACK = [0.34, 1.56, 0.64, 1] as const;

const logoCrossfade = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.04 },
};

const videoFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export function OffprintLogoLoop({ className = '' }: { className?: string }) {
    const reduceMotion = useReducedMotion();
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className={`absolute inset-0 ${className}`}>
            <AnimatePresence mode="sync" initial={false}>
                {showVideo ? (
                    <motion.div
                        key="video"
                        className="absolute inset-0"
                        variants={videoFade}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: CROSSFADE, ease: 'easeInOut' }}
                    >
                        <BrandLoopVideo
                            src="/images/offprint-loop.mp4"
                            className="h-full w-full rounded-3xl object-cover"
                            onDone={() => setShowVideo(false)}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="logo"
                        className="absolute inset-0 rounded-3xl overflow-hidden"
                        variants={logoCrossfade}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: CROSSFADE, ease: 'easeInOut' }}
                    >
                        <OffprintIn
                            reduceMotion={!!reduceMotion}
                            onComplete={() => setShowVideo(true)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function OffprintIn({
    reduceMotion,
    onComplete,
}: {
    reduceMotion: boolean;
    onComplete: () => void;
}) {
    // Play the intro once per mount, hold, then hand off to the video.
    useEffect(() => {
        if (reduceMotion) return; // static lockup, no looping for reduced motion
        const holdTimer = setTimeout(onComplete, LOGO_IN_DURATION * 1000 + HOLD_AFTER_IN);
        return () => clearTimeout(holdTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduceMotion]);

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5"
            style={{ backgroundColor: '#ffffff' }}
        >
            {/* Title drops in from above */}
            <motion.span
                className="offprint-card-title"
                initial={reduceMotion ? false : { opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.18 }}
            >
                Offprint
            </motion.span>

            {/* Icon spins + settles in */}
            <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.55, rotate: -120 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.85, ease: EASE_BACK }}
            >
                <Image
                    src="/images/offprint-logo.png"
                    alt="Offprint"
                    width={319}
                    height={319}
                    className="w-20 lg:w-28 object-contain"
                />
            </motion.div>

            {/* Subtitle rises in from below */}
            <motion.span
                className="offprint-card-subtitle"
                initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
            >
                Chrome Extension
            </motion.span>
        </motion.div>
    );
}
