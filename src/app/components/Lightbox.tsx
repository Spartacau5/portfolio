'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';

interface LightboxProps {
    src: string | null;
    gallery: string[];
    onClose: () => void;
}

function altFromSrc(src: string): string {
    const base = src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'image';
    return base.replace(/[-_]+/g, ' ').trim() || 'Portfolio image';
}

export function Lightbox({ src, gallery, onClose }: LightboxProps) {
    const [currentSrc, setCurrentSrc] = useState(src);

    useEffect(() => {
        setCurrentSrc(src);
    }, [src]);

    const index = gallery.length > 0 && currentSrc ? gallery.indexOf(currentSrc) : -1;
    const imageAlt = useMemo(
        () => (currentSrc ? altFromSrc(currentSrc) : 'Portfolio image'),
        [currentSrc]
    );

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
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [src, onClose, goNext, goPrev]);

    if (!src) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
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
            <button
                type="button"
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
                aria-label="Close image viewer"
            >
                &#x2715;
            </button>

            {gallery.length > 1 && index > 0 && (
                <button
                    type="button"
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
                        borderRadius: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    aria-label="Previous image"
                >
                    &#x2039;
                </button>
            )}

            {gallery.length > 1 && index < gallery.length - 1 && (
                <button
                    type="button"
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
                        borderRadius: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    aria-label="Next image"
                >
                    &#x203A;
                </button>
            )}

            <img
                src={currentSrc || ''}
                alt={imageAlt}
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '90vw',
                    maxHeight: '85vh',
                    objectFit: 'contain',
                    borderRadius: '0',
                    cursor: 'default',
                }}
            />

            {gallery.length > 1 && (
                <div
                    role="status"
                    aria-live="polite"
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
