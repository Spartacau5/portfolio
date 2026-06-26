'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

/**
 * An inline image with an expand control. Clicking it (or the badge) opens a
 * full-screen lightbox showing the entire image, uncropped (fit to viewport).
 * Close by clicking the backdrop, the ✕, or pressing Escape. The lightbox loads
 * the original file at full resolution so detailed screenshots stay legible.
 */

interface Props {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    sizes?: string;
    quality?: number;
    unoptimized?: boolean;
}

export function ZiZoomImage({ src, alt, width, height, className, sizes, quality, unoptimized }: Props) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    return (
        <>
            <button
                type="button"
                className="zi-zoom-trigger"
                onClick={() => setOpen(true)}
                aria-label={`Expand image: ${alt}`}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={sizes}
                    quality={quality}
                    unoptimized={unoptimized}
                    className={className}
                />
                <span className="zi-zoom-badge" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                </span>
            </button>

            {mounted && open &&
                createPortal(
                    <div
                        className="zi-lightbox"
                        role="dialog"
                        aria-modal="true"
                        aria-label={alt}
                        onClick={() => setOpen(false)}
                    >
                        <button
                            type="button"
                            className="zi-lightbox-close"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={src}
                            alt={alt}
                            className="zi-lightbox-img"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>,
                    document.body
                )}
        </>
    );
}
