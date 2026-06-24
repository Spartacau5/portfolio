'use client';

import { useEffect, useRef } from 'react';

/**
 * A muted, autoplaying clip that plays exactly once and then calls `onDone`.
 * Used by the looping work-card sequences (logo → video → logo).
 *
 * It is defensive about the many ways a browser can quietly stop a video so the
 * card loop can never freeze on a frame:
 *   - Forces playback on mount (the bare `autoPlay` attribute is sometimes
 *     dropped when the element mounts mid-crossfade).
 *   - A 400ms progress monitor: if the browser pauses the clip unexpectedly it
 *     resumes it; if playback truly stalls (no progress for ~3s) it hands back
 *     to the logo instead of sitting stuck.
 *   - `onEnded`/`onError` plus a hard duration ceiling all funnel through a
 *     single, idempotent finish so the loop always advances.
 *   - Optional `freezeBefore`: stop a couple frames before the very end so the
 *     crossfade starts from the last content frame, not a black tail frame.
 */
export function BrandLoopVideo({
    src,
    onDone,
    className = '',
    freezeBefore,
}: {
    src: string;
    onDone: () => void;
    className?: string;
    freezeBefore?: number;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    // Keep the latest onDone without re-running the effect (which would tear
    // down and rebuild the monitor on every parent render).
    const onDoneRef = useRef(onDone);
    onDoneRef.current = onDone;

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        let finished = false;
        let lastTime = -1;
        let stalledTicks = 0;
        let ceiling: ReturnType<typeof setTimeout> | undefined;

        const play = () => {
            const p = vid.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
        };

        const finish = () => {
            if (finished) return;
            finished = true;
            cleanup();
            onDoneRef.current();
        };

        const onEnded = () => finish();
        const onError = () => finish();
        const onTimeUpdate = () => {
            if (freezeBefore != null && vid.currentTime >= freezeBefore) {
                vid.pause();
                finish();
            }
        };

        // Progress monitor — the core fix for "the video randomly stops on a
        // frame". Runs every 400ms while the clip should be playing.
        const interval = setInterval(() => {
            if (finished) return;
            if (vid.ended) {
                finish();
                return;
            }
            // The browser paused it out from under us — resume.
            if (vid.paused) {
                play();
                return;
            }
            // Detect a real decode/buffer stall: currentTime isn't advancing.
            if (vid.currentTime === lastTime) {
                stalledTicks += 1;
                if (stalledTicks >= 8) finish(); // ~3.2s with no progress → bail to logo
                else play(); // nudge it
            } else {
                stalledTicks = 0;
                lastTime = vid.currentTime;
            }
        }, 400);

        const armCeiling = () => {
            const dur = Number.isFinite(vid.duration) && vid.duration > 0 ? vid.duration : 12;
            const cap = freezeBefore != null ? Math.min(freezeBefore, dur) : dur;
            ceiling = setTimeout(finish, (cap + 3) * 1000);
        };

        const cleanup = () => {
            clearInterval(interval);
            if (ceiling) clearTimeout(ceiling);
            vid.removeEventListener('ended', onEnded);
            vid.removeEventListener('error', onError);
            vid.removeEventListener('timeupdate', onTimeUpdate);
            vid.removeEventListener('loadedmetadata', armCeiling);
        };

        vid.addEventListener('ended', onEnded);
        vid.addEventListener('error', onError);
        vid.addEventListener('timeupdate', onTimeUpdate);

        try {
            vid.currentTime = 0;
        } catch {
            /* currentTime may throw before metadata loads; safe to ignore */
        }
        play();

        if (vid.readyState >= 1) armCeiling();
        else vid.addEventListener('loadedmetadata', armCeiling, { once: true });

        return cleanup;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, freezeBefore]);

    return (
        <video
            ref={videoRef}
            src={src}
            className={className}
            autoPlay
            muted
            playsInline
            preload="auto"
        />
    );
}
