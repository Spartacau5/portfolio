'use client';

import { ZiZoomImage } from './ZiZoomImage';

/**
 * Reference moodboard for the "Gathering References" step — a balanced
 * 3-column layout of the AI search/chat experiences studied for inspiration.
 * Columns are explicit so the "Search results → conversational UI" example can
 * sit in the rightmost column. Each reference keeps its full, uncropped
 * screenshot with a short caption so the source is legible at a glance.
 */

interface Ref {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
}

const COLUMNS: Ref[][] = [
    [
        { src: '/images/zi-ref-chatgpt.png', alt: 'ChatGPT examples, capabilities and limitations screen', caption: 'ChatGPT — framing capabilities & limits', width: 872, height: 964 },
    ],
    [
        { src: '/images/zi-ref-jasper.png', alt: 'Jasper AI marketing landing page', caption: 'Jasper — on-brand AI content', width: 1728, height: 976 },
        { src: '/images/zi-ref-watson.png', alt: 'IBM Watson Assistant chat conversation', caption: 'IBM Watson Assistant — guided chat', width: 1217, height: 684 },
    ],
    [
        { src: '/images/zi-ref-bing.png', alt: 'Microsoft Bing AI chat answering a query', caption: 'Microsoft Bing — conversational answers', width: 1525, height: 744 },
        { src: '/images/zi-ref-google-results.png', alt: 'Google results annotated as conversational UI', caption: 'Search results → conversational UI', width: 854, height: 630 },
    ],
];

export function ZiReferenceCollage() {
    return (
        <div className="zi-ref-collage">
            {COLUMNS.map((col, i) => (
                <div key={i} className="zi-ref-col">
                    {col.map((r) => (
                        <figure key={r.src} className="zi-ref-item">
                            <ZiZoomImage
                                src={r.src}
                                alt={r.alt}
                                width={r.width}
                                height={r.height}
                                className="zi-ref-img"
                                sizes="(max-width: 720px) 100vw, 280px"
                            />
                            <figcaption className="zi-ref-cap">{r.caption}</figcaption>
                        </figure>
                    ))}
                </div>
            ))}
        </div>
    );
}
