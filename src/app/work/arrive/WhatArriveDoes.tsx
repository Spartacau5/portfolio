'use client';

import { useState, useEffect } from 'react';

// Display order (matches the reference layout).
const PILLS = [
    'In-Dash & Voice Integration',
    'The Arrive Network',
    'Dynamic Pricing Engine',
    'Connected & Fleet Parking',
    'Demand Forecasting',
    'Integrated Payments',
    'Seamless Booking Flow',
    'Operator Revenue Optimization',
    'Multi-Modal Mobility',
    'White-Label & Partner APIs',
    'Smart City Integration',
    'Touchless Entry & Exit',
    'Real-time Parking Inventory',
    'Operator Data & Analytics',
];

// One chip per row animates, in highlight order — cascading top-to-bottom and
// zigzagging left/right across the rows. The other pills stay dim the whole time.
const HIGHLIGHT_SEQUENCE = [
    'In-Dash & Voice Integration',   // row 1 (left)
    'Dynamic Pricing Engine',        // row 2 (left)
    'Integrated Payments',           // row 3 (right)
    'Operator Revenue Optimization', // row 4 (right)
    'White-Label & Partner APIs',    // row 5 (right)
    'Smart City Integration',        // row 6 (left)
    'Real-time Parking Inventory',   // row 7 (left)
];

export function WhatArriveDoes() {
    // Highlights the first `litCount` pills of HIGHLIGHT_SEQUENCE, one by one,
    // holds on the last chip, then resets to 0 and loops.
    const [litCount, setLitCount] = useState(0);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (litCount >= HIGHLIGHT_SEQUENCE.length) {
            // All highlighted — pause on the last chip, then loop.
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
                {/* Frame crops the gif's built-in top/bottom whitespace */}
                <div className="arrive-split-gif-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/googlepay.gif"
                        alt="Arrive surfaced inside the Google Maps parking flow"
                        className="arrive-split-gif"
                    />
                </div>
            </div>
        </div>
    );
}
