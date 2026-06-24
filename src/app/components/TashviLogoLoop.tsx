'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { BrandLoopVideo } from './BrandLoopVideo';

/**
 * Looping Tashvi brand sequence for the work card.
 *
 *   1. The Tashvi logo animates in (scales up + fades) and settles.
 *   2. Brief hold, then a slick crossfade into the product video.
 *   3. Video plays to the end, then crossfades back to the logo and the
 *      whole sequence loops.
 */

const LOGO_IN_DURATION = 0.9; // seconds for the logo to ease in
const HOLD_AFTER_IN = 1100; // ms to rest on the settled logo
const CROSSFADE = 0.55; // seconds for the logo <-> video transition

const crossfade = {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.04 },
};

// Full-bleed video fades on opacity only, so no white card edges peek through.
const videoFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export function TashviLogoLoop({ className = '' }: { className?: string }) {
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
                            src="/images/tashvi-loop.mp4"
                            className="h-full w-full rounded-3xl object-cover"
                            onDone={() => setShowVideo(false)}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="logo"
                        className="absolute inset-0 flex items-center justify-center p-6 lg:p-8"
                        variants={crossfade}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: CROSSFADE, ease: 'easeInOut' }}
                    >
                        <LogoIn
                            reduceMotion={!!reduceMotion}
                            onComplete={() => setShowVideo(true)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function LogoIn({
    reduceMotion,
    onComplete,
}: {
    reduceMotion: boolean;
    onComplete: () => void;
}) {
    // Play the intro once per mount, hold, then hand off to the video.
    useEffect(() => {
        if (reduceMotion) return; // static logo, no looping for reduced motion
        const holdTimer = setTimeout(onComplete, LOGO_IN_DURATION * 1000 + HOLD_AFTER_IN);
        return () => clearTimeout(holdTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduceMotion]);

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.78, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: LOGO_IN_DURATION, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
        >
            <Image
                src="/images/tashvi-logo-anim.png"
                alt="Tashvi.ai"
                width={3201}
                height={2218}
                priority
                className="w-28 lg:w-40 object-contain"
            />
        </motion.div>
    );
}
