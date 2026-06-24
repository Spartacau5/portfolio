'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Annotated, looping walkthrough of the old SalesOS homepage for the Problem
 * section.
 *
 *   step 0 — the bare screenshot.
 *   step 1 — a purple wash over the center feed + a "low usage" note.
 *   step 2 — a purple wash over both side rails + "redundant widgets" notes.
 *
 * Then it loops, slowly. Regions are expressed as percentages of the image so
 * they track the responsive width.
 */

const REGIONS = {
    feed: { left: '24.8%', top: '6.5%', width: '49.8%', height: '92.5%' },
    left: { left: '2%', top: '7.5%', width: '21.4%', height: '89.5%' },
    right: { left: '75%', top: '7.5%', width: '24%', height: '89.5%' },
};

const HOLD = [2600, 3600, 3600]; // ms each step rests before advancing
const FADE = 0.7; // s crossfade between steps

function Note({ text }: { text: string }) {
    return (
        <div className="zi-anno-note">
            <span className="zi-anno-note-chip">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H18a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.5.5H6a2 2 0 0 1-2-2V5.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M8 8.5h7M8 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Note
            </span>
            <span className="zi-anno-note-text">{text}</span>
            <span className="zi-anno-note-caret" aria-hidden="true" />
        </div>
    );
}

export function ZiProblemAnimation() {
    const reduce = useReducedMotion();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (reduce) return; // static screenshot for reduced motion
        const t = setTimeout(() => setStep((s) => (s + 1) % 3), HOLD[step]);
        return () => clearTimeout(t);
    }, [step, reduce]);

    const show = (s: number) => ({ opacity: step === s ? 1 : 0 });

    return (
        <div className="zi-anno">
            <Image
                src="/images/zi-ai-homepage.png"
                alt="Old SalesOS homepage — a low-usage feed flanked by redundant widget rails"
                width={1472}
                height={1138}
                className="zi-anno-img"
            />

            {/* Step 1 — center feed */}
            <motion.div className="zi-anno-hl" style={REGIONS.feed} initial={false} animate={show(1)} transition={{ duration: FADE }} />
            <motion.div
                className="zi-anno-note-wrap"
                style={{ left: '49.7%', top: '1.5%' }}
                initial={false}
                animate={{ opacity: step === 1 ? 1 : 0, y: step === 1 ? 0 : 8 }}
                transition={{ duration: FADE }}
            >
                <Note text="A feed with low usage" />
            </motion.div>

            {/* Step 2 — both side rails */}
            <motion.div className="zi-anno-hl" style={REGIONS.left} initial={false} animate={show(2)} transition={{ duration: FADE }} />
            <motion.div className="zi-anno-hl" style={REGIONS.right} initial={false} animate={show(2)} transition={{ duration: FADE }} />
            <motion.div
                className="zi-anno-note-wrap"
                style={{ left: '12.7%', top: '2%' }}
                initial={false}
                animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : 8 }}
                transition={{ duration: FADE }}
            >
                <Note text="Redundant widgets" />
            </motion.div>
            <motion.div
                className="zi-anno-note-wrap"
                style={{ left: '80%', top: '2%' }}
                initial={false}
                animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : 8 }}
                transition={{ duration: FADE }}
            >
                <Note text="Redundant widgets" />
            </motion.div>
        </div>
    );
}
