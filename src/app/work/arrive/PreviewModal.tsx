'use client';

import { useEffect } from 'react';

// A single preview can be a live mini-browser, a still image, or a video.
export type PreviewContent =
    | { type: 'browser'; url: string }
    | { type: 'image'; src: string; alt?: string }
    | { type: 'video'; src: string };

interface PreviewModalProps {
    content: PreviewContent | null;
    onClose: () => void;
}

export function PreviewModal({ content, onClose }: PreviewModalProps) {
    // Close on Escape, and lock background scroll while open.
    useEffect(() => {
        if (!content) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [content, onClose]);

    if (!content) return null;

    const isBrowser = content.type === 'browser';

    return (
        <div className="preview-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div
                className={`preview-modal ${isBrowser ? 'preview-modal--browser' : 'preview-modal--media'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="preview-close" onClick={onClose} aria-label="Close preview">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                {content.type === 'browser' && (
                    <>
                        {/* Minimalist browser chrome — just the address bar */}
                        <div className="preview-chrome">
                            <span className="preview-url">{content.url}</span>
                        </div>
                        <div className="preview-viewport">
                            <iframe
                                src={content.url}
                                title="Embedded page preview"
                                className="preview-iframe"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </>
                )}

                {content.type === 'image' && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={content.src} alt={content.alt ?? ''} className="preview-media" />
                )}

                {content.type === 'video' && (
                    <video src={content.src} className="preview-media" controls autoPlay playsInline />
                )}
            </div>
        </div>
    );
}
