'use client';

import { useState, useEffect } from 'react';

// Display order (matches the reference layout).
const PILLS = [
    'Dynamic Routing API',
    'Global Network Management',
    'Predictive Mobility Algorithms',
    'Real-time Fleet Tracking',
    'Demand Forecasting',
    'Integrated Payments',
    'Seamless Booking Flow',
    'Optimized Asset Allocation',
    'Multi-model Integration',
    'Partnership APIs',
];

// Only this subset animates, in highlight order. The cascade lights each one
// white top-to-bottom and finishes on "Multi-model Integration". The other
// pills stay dim the whole time.
const HIGHLIGHT_SEQUENCE = [
    'Dynamic Routing API',
    'Real-time Fleet Tracking',
    'Demand Forecasting',
    'Optimized Asset Allocation',
    'Multi-model Integration',
];

export function WhatArriveDoes() {
    // Highlights the first `litCount` pills of HIGHLIGHT_SEQUENCE, one by one,
    // holds on the last chip, then resets to 0 and loops.
    const [litCount, setLitCount] = useState(0);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (litCount >= HIGHLIGHT_SEQUENCE.length) {
            // All highlighted — pause on "Multi-model Integration", then loop.
            timer = setTimeout(() => setLitCount(0), 2200);
        } else {
            timer = setTimeout(() => setLitCount((c) => c + 1), litCount === 0 ? 900 : 650);
        }
        return () => clearTimeout(timer);
    }, [litCount]);

    const litSet = new Set(HIGHLIGHT_SEQUENCE.slice(0, litCount));

    return (
        <div className="arrive-split">
            <div className="arrive-split-left">
                <h3 className="arrive-split-title">What Arrive does</h3>
                <div className="arrive-pills">
                    {PILLS.map((label) => (
                        <span key={label} className={`arrive-pill ${litSet.has(label) ? 'lit' : ''}`}>
                            {label}
                        </span>
                    ))}
                </div>
            </div>
            <div className="arrive-split-right">
                <h3 className="arrive-split-title dark">What you see</h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/googlepay.gif"
                    alt="Arrive surfaced inside the Google Maps parking flow"
                    className="arrive-split-gif"
                />
            </div>
        </div>
    );
}
