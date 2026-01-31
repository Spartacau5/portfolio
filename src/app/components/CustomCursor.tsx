'use client';

import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Mouse position (actual)
        let mouseX = 0;
        let mouseY = 0;
        // Cursor position (with lag/resistance)
        let cursorX = 0;
        let cursorY = 0;
        // Resistance factor (lower = more resistance/lag)
        const resistance = 0.15;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Animation loop for smooth following
        const animate = () => {
            // Calculate the distance to move
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            // Apply resistance - cursor catches up gradually
            cursorX += dx * resistance;
            cursorY += dy * resistance;

            // Update cursor position
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            }

            requestAnimationFrame(animate);
        };

        // Start listening and animating
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        animate();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isVisible ? 'visible' : ''}`}
        />
    );
}
