'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    // Use refs to persist values across renders without causing re-runs
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const isVisible = useRef(false);
    const animationId = useRef<number>(0);

    useEffect(() => {
        const resistance = 0.15;

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;

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
            // Snap cursor to entry point
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
            cursorPos.current.x = e.clientX;
            cursorPos.current.y = e.clientY;

            isVisible.current = true;
            if (cursorRef.current) {
                cursorRef.current.classList.add('visible');
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        const animate = () => {
            const dx = mousePos.current.x - cursorPos.current.x;
            const dy = mousePos.current.y - cursorPos.current.y;

            cursorPos.current.x += dx * resistance;
            cursorPos.current.y += dy * resistance;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
            }

            animationId.current = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        animationId.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(animationId.current);
        };
    }, []); // Empty dependency - only runs once

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
        />
    );
}
