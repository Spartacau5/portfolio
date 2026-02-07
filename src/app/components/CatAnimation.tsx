'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { analytics } from './GoogleAnalytics';

// Frame order: cat1 through cat13 (note: cat6 doesn't exist)
const frameSequence = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13];

export default function CatAnimation() {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<NodeJS.Timeout | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [petCount, setPetCount] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Load pet count from API on mount
    useEffect(() => {
        fetch('/api/cat-counter')
            .then(res => res.json())
            .then(data => setPetCount(data.count))
            .catch(() => setPetCount(0));
    }, []);

    // Preload all images
    useEffect(() => {
        const preloadImages = async () => {
            const promises = frameSequence.map((num) => {
                return new Promise<void>((resolve) => {
                    const img = new window.Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                    img.src = `/images/cat${num}.svg`;
                });
            });
            await Promise.all(promises);
            setImagesLoaded(true);
        };
        preloadImages();
    }, []);

    // Visual-only animation (no pet count increment)
    const playAnimationVisual = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        let frame = 0;

        const animate = () => {
            frame++;
            if (frame >= frameSequence.length) {
                frame = 0;
                setCurrentFrame(frame);
                setIsAnimating(false);
                return;
            }
            setCurrentFrame(frame);
            animationRef.current = setTimeout(animate, 130);
        };

        animationRef.current = setTimeout(animate, 130);
    }, [isAnimating]);

    const playAnimation = useCallback(() => {
        if (isAnimating) return;

        // Track the pet in Google Analytics
        analytics.trackCatPet();

        // Increment counter via API
        fetch('/api/cat-counter', { method: 'POST' })
            .then(res => res.json())
            .then(data => setPetCount(data.count))
            .catch(() => {});

        playAnimationVisual();
    }, [isAnimating, playAnimationVisual]);

    // Auto-play animation once per session on first visit
    useEffect(() => {
        if (!imagesLoaded) return;
        const hasPlayed = sessionStorage.getItem('cat-animation-played');
        if (!hasPlayed) {
            sessionStorage.setItem('cat-animation-played', 'true');
            // Small delay so the page settles before animation starts
            const timer = setTimeout(() => {
                playAnimationVisual();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [imagesLoaded, playAnimationVisual]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, []);

    const frameNumber = frameSequence[currentFrame];

    return (
        <div
            className="cat-animation-container"
            onClick={playAnimation}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                cursor: 'pointer',
                width: '220px',
                height: '62px',
                overflow: 'visible',
                position: 'relative',
            }}
        >
            {/* Tooltip */}
            <div
                className="cat-tooltip"
                style={{
                    position: 'absolute',
                    top: '-20px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: 'none',
                }}
            >
                Pet my cat Billu!{petCount !== null && ` (${petCount.toLocaleString()} pets)`}
            </div>

            {/* SVG with cropped viewBox to show only the cat */}
            <svg
                viewBox="260 625 400 110"
                width="220"
                height="60"
                style={{
                    display: 'block',
                    opacity: imagesLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <image
                    href={`/images/cat${frameNumber}.svg`}
                    x="0"
                    y="0"
                    width="1694"
                    height="820"
                />
            </svg>
        </div>
    );
}
