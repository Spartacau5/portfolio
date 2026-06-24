'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const isVisible = useRef(false);

    useEffect(() => {
        // Track the pointer 1:1 — write the cursor's transform directly on each
        // move with no easing/lerp, so it stays locked to the real cursor with
        // zero perceptible lag. Transform-only writes are GPU-composited and cheap.
        const setPosition = (x: number, y: number) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            setPosition(e.clientX, e.clientY);

            if (!isVisible.current && cursorRef.current) {
                isVisible.current = true;
                cursorRef.current.classList.add('visible');
            }
        };

        const handleMouseLeave = () => {
            isVisible.current = false;
            if (cursorRef.current) {
                cursorRef.current.classList.remove('visible');
            }
        };

        const handleMouseEnter = (e: MouseEvent) => {
            setPosition(e.clientX, e.clientY);
            isVisible.current = true;
            if (cursorRef.current) {
                cursorRef.current.classList.add('visible');
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []); // Empty dependency - only runs once

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
        />
    );
}
