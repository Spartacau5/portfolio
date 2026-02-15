'use client';

import { useState, useCallback, useEffect } from 'react';

interface LightboxProps {
    src: string | null;
    gallery: string[];
    onClose: () => void;
}

export function Lightbox({ src, gallery, onClose }: LightboxProps) {
    const [currentSrc, setCurrentSrc] = useState(src);

    // Sync with external src changes
    useEffect(() => {
        setCurrentSrc(src);
    }, [src]);

    const index = gallery.length > 0 && currentSrc ? gallery.indexOf(currentSrc) : -1;

    const goNext = useCallback(() => {
        if (gallery.length > 0 && index < gallery.length - 1) {
            setCurrentSrc(gallery[index + 1]);
        }
    }, [gallery, index]);

    const goPrev = useCallback(() => {
        if (gallery.length > 0 && index > 0) {
            setCurrentSrc(gallery[index - 1]);
        }
    }, [gallery, index]);

    useEffect(() => {
        if (!src) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [src, onClose, goNext, goPrev]);

    if (!src) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'zoom-out',
                padding: '40px',
                animation: 'lightboxFadeIn 0.2s ease',
            }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    fontSize: '32px',
                    cursor: 'pointer',
                    lineHeight: 1,
                    padding: '8px',
                    zIndex: 1,
                }}
                aria-label="Close"
            >
                &#x2715;
            </button>

            {/* Previous button */}
            {gallery.length > 1 && index > 0 && (
                <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '24px',
                        cursor: 'pointer',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    aria-label="Previous"
                >
                    &#x2039;
                </button>
            )}

            {/* Next button */}
            {gallery.length > 1 && index < gallery.length - 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '24px',
                        cursor: 'pointer',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    aria-label="Next"
                >
                    &#x203A;
                </button>
            )}

            <img
                src={currentSrc || ''}
                alt=""
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '90vw',
                    maxHeight: '85vh',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    cursor: 'default',
                }}
            />

            {/* Gallery counter */}
            {gallery.length > 1 && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#9ca3af',
                        fontSize: '13px',
                        cursor: 'default',
                    }}
                >
                    {index + 1} / {gallery.length}
                </div>
            )}
        </div>
    );
}

export function useLightbox() {
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const [lightboxGallery, setLightboxGallery] = useState<string[]>([]);

    const openLightbox = useCallback((src: string, gallery?: string[]) => {
        setLightboxSrc(src);
        setLightboxGallery(gallery || []);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxSrc(null);
        setLightboxGallery([]);
    }, []);

    return {
        lightboxSrc,
        lightboxGallery,
        openLightbox,
        closeLightbox,
    };
}
