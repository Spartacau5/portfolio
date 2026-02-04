'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// Frame order: cat1 through cat13 (note: cat6 doesn't exist)
const frameSequence = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13];

export default function CatAnimation() {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<NodeJS.Timeout | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

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

    const playAnimation = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        let frame = 0;

        const animate = () => {
            frame++;
            if (frame >= frameSequence.length) {
                // Loop back to beginning for a smooth cycle
                frame = 0;
                setCurrentFrame(frame);
                setIsAnimating(false);
                return;
            }
            setCurrentFrame(frame);
            animationRef.current = setTimeout(animate, 130); // 130ms per frame for smoother feel
        };

        animationRef.current = setTimeout(animate, 130);
    }, [isAnimating]);

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
            style={{
                cursor: 'pointer',
                width: '220px',
                height: '62px',
                overflow: 'hidden',
                position: 'relative',
            }}
            title="Pet my cat Billu!"
        >
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
