'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Hook for scroll-triggered fade-in animations
export function useScrollAnimation(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false);
    const [element, setElement] = useState<HTMLElement | null>(null);

    // Callback ref - gets called when element mounts/unmounts
    const ref = useCallback((node: HTMLElement | null) => {
        setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [element, threshold]);

    return { ref, isVisible };
}

// Helper function to generate fade-in-up animation styles
export function fadeInUp(isVisible: boolean, delay = 0): React.CSSProperties {
    return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
    };
}

// Animated counter component for statistics
export function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number;
                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(easeOut * end));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return <div ref={ref}>{count}{suffix}</div>;
}

// Animated progress bar component
export function AnimatedBar({ width, delay = 0, color = '#22c55e' }: { width: string; delay?: number; color?: string }) {
    const [animatedWidth, setAnimatedWidth] = useState('0%');
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    setTimeout(() => {
                        setAnimatedWidth(width);
                    }, delay);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [width, delay, hasAnimated]);

    return (
        <div ref={ref} style={{ height: '100%', width: animatedWidth, background: color, borderRadius: '4px', transition: 'width 1s ease-out' }}></div>
    );
}
