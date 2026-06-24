'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { BrandLoopVideo } from './BrandLoopVideo';

/**
 * Looping ZoomInfo brand sequence for the work card.
 *
 *   1. Mark starts centered, alone.
 *   2. Mark slides left while the "zoominfo" wordmark reveals in from its
 *      right (the lockup stays optically centered the whole time).
 *   3. Brief hold on the full lockup, then a slick crossfade into the
 *      product video.
 *   4. Video plays to the end, then crossfades back to the start and the
 *      whole sequence loops.
 */

const MARK_BIG_SCALE = 1.4; // how big the mark appears before settling
const MARK_BIG_HOLD = 700; // ms the mark stays big before settling
const MARK_SETTLE_DURATION = 0.55; // seconds for the mark to ease back to normal
const REVEAL_DURATION = 1.4; // seconds for the wordmark to reveal
const HOLD_AFTER_REVEAL = 900; // ms to rest on the full lockup
const CROSSFADE = 0.55; // seconds for the logo <-> video transition
const VIDEO_END_TIME = 8.1; // seconds — freeze before the end (clip is 8.27s @ 60fps)

const crossfade = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.04 },
};

// Full-bleed video fades on opacity only, so no white card edges peek through.
const videoFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export function ZoomInfoLogoLoop({ className = '' }: { className?: string }) {
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
                            src="/images/zoominfo-loop.mp4"
                            className="h-full w-full rounded-3xl object-cover"
                            freezeBefore={VIDEO_END_TIME}
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
                        <LogoReveal
                            reduceMotion={!!reduceMotion}
                            onComplete={() => setShowVideo(true)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function LogoReveal({
    reduceMotion,
    onComplete,
}: {
    reduceMotion: boolean;
    onComplete: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [fullWidth, setFullWidth] = useState(0);
    const controls = useAnimationControls();
    const markControls = useAnimationControls();

    const measure = () => {
        if (contentRef.current) setFullWidth(contentRef.current.offsetWidth);
    };

    useLayoutEffect(() => {
        measure();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Play the reveal once per mount, hold, then hand off to the video.
    useEffect(() => {
        if (fullWidth === 0) return;

        if (reduceMotion) {
            markControls.set({ scale: 1 });
            controls.set({ width: fullWidth, opacity: 1 });
            return; // static full lockup, no looping for reduced motion
        }

        let cancelled = false;
        let holdTimer: ReturnType<typeof setTimeout>;

        (async () => {
            controls.set({ width: 0, opacity: 0 });
            // 1. Mark comes in large and holds at that size for a beat.
            markControls.set({ scale: MARK_BIG_SCALE });
            await new Promise((r) => {
                holdTimer = setTimeout(r, MARK_BIG_HOLD);
            });
            if (cancelled) return;
            // 2. Mark eases smoothly back down to its normal size.
            await markControls.start({
                scale: 1,
                transition: { duration: MARK_SETTLE_DURATION, ease: [0.4, 0, 0.2, 1] },
            });
            if (cancelled) return;
            // 3. Then the wordmark reveals in from the right.
            await controls.start({
                width: fullWidth,
                opacity: 1,
                transition: { duration: REVEAL_DURATION, ease: [0.65, 0, 0.35, 1] },
            });
            if (cancelled) return;
            holdTimer = setTimeout(() => {
                if (!cancelled) onComplete();
            }, HOLD_AFTER_REVEAL);
        })();

        return () => {
            cancelled = true;
            clearTimeout(holdTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullWidth, reduceMotion]);

    return (
        <div className="flex items-center justify-center">
            {/* Mark — pops in big then settles; shifts left as the wordmark grows */}
            <motion.div className="shrink-0" animate={markControls} style={{ scale: MARK_BIG_SCALE }}>
                <Image
                    src="/images/zoominfo-mark.png"
                    alt="ZoomInfo"
                    width={1054}
                    height={1054}
                    priority
                    className="h-10 w-10 lg:h-[70px] lg:w-[70px]"
                />
            </motion.div>

            {/* Wordmark — width animates 0 -> full, revealing it left-to-right */}
            <motion.div className="overflow-hidden" style={{ width: 0 }} animate={controls}>
                <div ref={contentRef} className="flex w-max items-center">
                    {/* gap between mark and wordmark, collapses with the clip */}
                    <span className="w-2.5 lg:w-4 shrink-0" aria-hidden="true" />
                    <Image
                        src="/images/zoominfo-wordmark.png"
                        alt=""
                        width={2548}
                        height={492}
                        priority
                        onLoad={measure}
                        className="h-[18px] w-auto max-w-none lg:h-8 shrink-0"
                    />
                </div>
            </motion.div>
        </div>
    );
}
